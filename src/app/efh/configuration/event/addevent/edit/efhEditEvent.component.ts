import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogoMaestroService              } from '../../../../../core/services/catalogo-maestro.service';
import { DatePipe                            } from '@angular/common';
import { EventMessage                        } from '../../../../../core/models/EventMessage';
import { EventService                       } from 'src/app/core/services/event.service';
import { ToastrManager                       } from 'ng6-toastr-notifications';
import { GlobalService                       } from '../../../../../core/globals/global.service';
import { Constants} from '../../../../../core/globals/Constants';
import { EventType} from '../../../../models/EventType';
import { EfhService} from '../../../../../core/services/efh.service';
import {ConfirmationDialogService} from '../../../../../core/services/confirmation-dialog.service';
import {EventBlocked} from '../../../../../core/models/EventBlocked';
import { IdLabel } from 'src/app/core/models/IdLabel';

@Component({
  selector: 'app-efh-edit-event',
  templateUrl: './efhEditEvent.component.html',
  styleUrls: ['./efhEditEvent.component.scss'],
  providers: [DatePipe]
})
export class EfhEditEventComponent implements OnInit {
  @Input() accion: string;
  @Input() seccion: string;
  titulo: string;
  subtitulo: string;
  eventType: EventType;
  eventForm: FormGroup;
  formTemp: FormGroup;
  resultService;
  result;
  eventTypesArr = [];
  unitsArr = [];
  fuelTypesArr = [];
  fuelTypesForSelect = [];
  dataSubmit = {};
  checkedEstatus = false;
  checkedStopProgrammed = true;
  deshabiliarEstatus = false;
  isAddObvsDisabled = true;
  defaultCharge;
  defaultCharge2;
  currentYear = new Date().getFullYear();
  initDate = (this.currentYear - 1) + '-01-01';

  isShotSectionVisible = false;
  isStartSectionVisible = false;
  isRejectSectionVisible = false;
  isRunbackSectionVisible = false;
  isStopSectionVisible = false;
  isDieselSectionVisible = false;
  isDefaultSectionsVisible = false;
  isNormalOperationSectionVisible = false;
  isShotStartSectionVisible = false;
  isStopStartSectionVisible = false;

  optionsSelectEnabled = true;

  shotStartDatesValidation = false;
  runbackDatesValidation = false;
  stopStartDatesValidation = false;
  dieselDatesValidation = false;
  normalDatesValidation = false;

  chargeValidation = false;
  charge2Validation = false;

  isDefaultControlsEnabled = true;
  disabledSave = true;
  submittedData = false;

  flameOffDate;
  flameOffTime;
  fsnlDate;
  fsnlTime;
  rejectDate;
  rejectTime;
  startDate;
  startTime;
  endDate;
  endTime;

  selectedEventType;
  selectedUnit;
  selectedFuelType;

  hours:   IdLabel[] =  new Array(24).fill(0).map((_valor, indice) => ({id: (indice < 10 ? '0' : '') + indice, label: (indice < 10 ? '0' : '') + indice}));
  minutes: IdLabel[] =  new Array(60).fill(0).map((_valor, indice) => ({id: (indice < 10 ? '0' : '') + indice, label: (indice < 10 ? '0' : '') + indice}));
  seconds: IdLabel[] =  new Array(60).fill(0).map((_valor, indice) => ({id: (indice < 10 ? '0' : '') + indice, label: (indice < 10 ? '0' : '') + indice}));
  
  constructor(
      private catalogoMaestroService: CatalogoMaestroService,
      private efhService: EfhService,
      private formBuilder: FormBuilder,
      public  toastr: ToastrManager,
      public  globalService: GlobalService,
      private confirmationDialogService: ConfirmationDialogService,
      private eventService: EventService,
      private datePipe: DatePipe) {
    this.eventForm = this.formBuilder.group({});
  }

  get f() { return this.eventForm.controls; }

  ngOnInit() {
      this.submittedData = false;
      
      this.eventForm = this.formBuilder.group({
          eventTypeControl: [null, null],
          unitControl: [ null, Validators.required],
          fuelTypeControl: [ null, Validators.required],
          flameOffDateShot: ['', Validators.required],
          flameOffTimeShot: ['00:00:00', Validators.required],
          chargeShot: ['', Validators.required],
          flameOffDateStart: ['', Validators.required],
          flameOffTimeStart: ['00:00:00', Validators.required],
          fsnlDateStart: ['', Validators.required],
          fsnlTimeStart: ['00:00:00', Validators.required],
          dateReject: ['', Validators.required],
          timeReject: ['00:00:00', Validators.required],
          chargeReject: ['', Validators.required],
          startDateRunback: ['', Validators.required],
          startTimeRunback: ['00:00:00', Validators.required],
          endDateRunback: ['', Validators.required],
          endTimeRunback: ['00:00:00', Validators.required],
          chargeBeforeRunback: ['', Validators.required],
          chargeAfterRunback: ['', Validators.required],
          flameOffDateStop: ['', Validators.required],
          flameOffTimeStop: ['00:00:00', Validators.required],
          fsnlDateStop: ['', Validators.required],
          fsnlTimeStop: ['00:00:00', Validators.required],
          chargeStop: ['', Validators.required],
          startDateDiesel: ['', Validators.required],
          startTimeDiesel: ['00:00:00', Validators.required],
          endDateDiesel: ['', Validators.required],
          endTimeDiesel: ['00:00:00', Validators.required],
          startDateNormal: ['', Validators.required],
          startTimeNormal: ['00:00:00', Validators.required],
          endDateNormal: ['', Validators.required],
          endTimeNormal: ['00:00:00', Validators.required],
          description: [''],
          // observations: [{ value: '', disabled: this.isAddObvsDisabled }, Validators.required],
          file: [null, Validators.required]
      });

      this.formTemp = this.formBuilder.group(
            {
                dateTimeStart: [{ value: new Date(), disabled: false }],
                dateTimeEnd: [{ value: new Date(), disabled: false }],
                statusElement: [ { value: this.checkedEstatus, disabled: this.deshabiliarEstatus }],
                ha: [{ value: '00', disabled: false }],
                ma: [{ value: '00', disabled: false }],
                sa: [{ value: '00', disabled: false }],
                hb: [{ value: '00', disabled: false }],
                mb: [{ value: '00', disabled: false }],
                sb: [{ value: '00', disabled: false }],
                hc: [{ value: '00', disabled: false }],
                mc: [{ value: '00', disabled: false }],
                sc: [{ value: '00', disabled: false }]
            });

      this.defaultControlsEnabled(false);

      this.eventTypesArr = this.eventType.eventTypesArr.filter(event => event.active);
      this.eventTypesArr.sort((a, b) => a.name.localeCompare(b.name));
      this.unitsArr = this.eventType.unitsArr.filter(unit => unit.active);
      this.unitsArr.sort((a, b) => a.name.localeCompare(b.name));
      this.fuelTypesArr = this.eventType.fuelTypesArr.filter(fuel => fuel.active);
      this.fuelTypesArr.sort((a, b) => a.name.localeCompare(b.name));
      this.fuelTypesForSelect = this.fuelTypesArr;

      this.selectedEventType = undefined;
      this.selectedUnit = undefined;
      this.selectedFuelType = undefined;

      this.accion = this.eventType.action;
      this.seccion = this.eventType.section;

      if (this.accion === 'editar') {
          this.deshabiliarEstatus = false;
          this.formTemp.controls.statusElement.enable();
          this.disabledSave = false;
          this.subtitulo = 'Editar / Configuración de Eventos';
          this.titulo = 'Configuración / Eventos / Agregar Eventos / Editar';
      } else if (this.accion === 'ver') {
          this.deshabiliarEstatus = true;
          this.formTemp.controls.statusElement.disable();
          this.isAddObvsDisabled = true;
          this.subtitulo = 'Consultar / Configuración de Eventos';
          this.titulo = 'Configuración / Eventos / Agregar Eventos / Consultar';
      } else {
          this.checkedEstatus = true;
          this.formTemp.controls.statusElement.setValue(this.checkedEstatus);
          this.deshabiliarEstatus = false;
          this.formTemp.controls.statusElement.enable();
          this.disabledSave = false;
          this.subtitulo = 'Agregar / Configuración de Eventos';
          this.titulo = 'Configuración / Eventos / Agregar Eventos / Agregar';
          this.eventForm.controls['eventTypeControl'].enable();
      }

      if (this.accion === 'editar' || this.accion === 'ver') {
          this.resetSections();
          this.defaultControlsEnabled(this.accion === 'ver' ? false : true);
          switch (this.seccion) {
              case 'DISPARO / ARRANQUE': this.isShotStartSectionVisible = true;
                              this.isDefaultSectionsVisible = true;
                              break;
              case 'RECHAZO DE CARGA': this.isRejectSectionVisible = true;
                                       this.isDefaultSectionsVisible = true;
                                       break;
              case 'RUNBACK': this.isRunbackSectionVisible = true;
                              this.isDefaultSectionsVisible = true;
                              break;
              case 'PARO / ARRANQUE': this.isStopStartSectionVisible = true;
                           this.isDefaultSectionsVisible = true;
                           break;
              case 'OPERACIÓN CON DIESEL': this.isDieselSectionVisible = true;
                                           this.isDefaultSectionsVisible = true;
                                           break;
              case 'OPERACIÓN': this.isNormalOperationSectionVisible = true;
                                this.isDefaultSectionsVisible = true;
                                break;
          }
          this.obtenerDatosConfiguracionEvento(true, this.eventType.id);
      }
  }

  async delay(ms: number) {
      await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("sleep finished"));
  }

  obtenerDatosConfiguracionEvento(putData, id) {
       if (id !== 0) {
           this.efhService.getEvent(id)
              .subscribe(
                  dataBack => {
                      this.result = dataBack;

                      for (let element of this.result) {
                          if (this.eventType.id === element.id && putData) {
                              this.selectedEventType = this.eventTypesArr.find(x => x.id === element.idtypeevent).id;
                              this.eventForm.controls.eventTypeControl.setValue(this.selectedEventType);
                              this.selectedUnit = this.unitsArr.find(x => x.id === element.idunit).id;
                              this.eventForm.controls.unitControl.setValue(this.selectedUnit);
                              this.selectedFuelType = this.fuelTypesArr.find(x => x.id === element.idtypefuel).id;
                              this.eventForm.controls.fuelTypeControl.setValue(this.selectedFuelType);
                              this.eventForm.controls['eventTypeControl'].disable();

                              switch (element.idtypeevent) {
                                  case 13451:
                                  case 8001:
                                      this.eventForm.controls['flameOffDateShot'].setValue(this.datePipe.transform(new Date(element.dateinit) , 'yyyy-MM-dd'));
                                      this.setTimeA(element.dateinit);
                                      this.eventForm.controls['flameOffDateStart'].setValue(this.datePipe.transform(new Date(element.datestart) , 'yyyy-MM-dd'));
                                      this.setTimeB(element.datestart);
                                      this.eventForm.controls['fsnlDateStart'].setValue(this.datePipe.transform(new Date(element.dateend) , 'yyyy-MM-dd'));
                                      this.setTimeC(element.dateend);
                                      this.eventForm.controls['chargeShot'].setValue(element.chargebeforeshot);
                                      break;
                                  case 2:
                                  case 952:
                                      this.eventForm.controls['dateReject'].setValue(this.datePipe.transform(new Date(element.dateinit) , 'yyyy-MM-dd'));
                                      this.setTimeA(element.dateinit);
                                      this.eventForm.controls['chargeReject'].setValue(element.chargebeforereject);
                                      break;
                                  case 4956:
                                  case 953:
                                      this.eventForm.controls['startDateRunback'].setValue(this.datePipe.transform(new Date(element.dateinit) , 'yyyy-MM-dd'));
                                      this.setTimeA(element.dateinit);
                                      this.eventForm.controls['endDateRunback'].setValue(this.datePipe.transform(new Date(element.dateend) , 'yyyy-MM-dd'));
                                      this.setTimeB(element.dateend);
                                      this.eventForm.controls['chargeBeforeRunback'].setValue(element.chargebeforerunback);
                                      this.eventForm.controls['chargeAfterRunback'].setValue(element.chargeafterrunback);
                                      break;
                                  case 8051:
                                  case 13501:
                                      this.eventForm.controls['flameOffDateStop'].setValue(this.datePipe.transform(new Date(element.dateinit) , 'yyyy-MM-dd'));
                                      this.setTimeA(element.dateinit);
                                      this.eventForm.controls['flameOffDateStart'].setValue(this.datePipe.transform(new Date(element.datestart) , 'yyyy-MM-dd'));
                                      this.setTimeB(element.datestart);
                                      this.eventForm.controls['fsnlDateStart'].setValue(this.datePipe.transform(new Date(element.dateend) , 'yyyy-MM-dd'));
                                      this.setTimeC(element.dateend);
                                      this.eventForm.controls['chargeStop'].setValue(element.chargebeforestop);
                                      break;
                                  case 955:
                                      this.eventForm.controls['startDateDiesel'].setValue(this.datePipe.transform(new Date(element.dateinit) , 'yyyy-MM-dd'));
                                      this.setTimeA(element.dateinit);
                                      this.eventForm.controls['endDateDiesel'].setValue(this.datePipe.transform(new Date(element.dateend) , 'yyyy-MM-dd'));
                                      this.setTimeB(element.dateend);
                                      break;
                                  case 4955:
                                  case 956:
                                      this.eventForm.controls['startDateNormal'].setValue(this.datePipe.transform(new Date(element.dateinit) , 'yyyy-MM-dd'));
                                      this.setTimeA(element.dateinit);
                                      this.eventForm.controls['endDateNormal'].setValue(this.datePipe.transform(new Date(element.dateend) , 'yyyy-MM-dd'));
                                      this.setTimeB(element.dateend);
                                      break;
                              }
                              this.eventForm.controls['description'].setValue(element.description);
                              this.checkedEstatus = element.active;
                              this.formTemp.controls.statusElement.setValue(this.checkedEstatus);
                              this.checkedStopProgrammed = element.programmed;
                          }
                      }

                      if (!putData) {

                          if (this.eventForm.controls['eventTypeControl'].value === null) {
                              this.dataSubmit['idtypeevent'] = this.selectedEventType;
                          } else {
                              this.dataSubmit['idtypeevent'] = this.eventForm.controls['eventTypeControl'].value;
                          }

                          if (this.eventForm.controls['fuelTypeControl'].value === null) {
                              this.dataSubmit['idtypefuel'] = this.selectedFuelType;
                          } else {
                              this.dataSubmit['idtypefuel'] = this.eventForm.controls['fuelTypeControl'].value;
                          }

                          if (this.eventForm.controls['unitControl'].value === null) {
                              this.dataSubmit['idunit'] = this.selectedUnit;
                          } else {
                              this.dataSubmit['idunit'] = this.eventForm.controls['unitControl'].value;
                          }

                          this.dataSubmit['description'] = this.eventForm.controls['description'].value;

                          switch (this.dataSubmit['idtypeevent']) {
                              case 13451:
                              case 8001:
                                  this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.datePipe.transform(this.eventForm.controls['flameOffDateShot'].value, 'yyyy-MM-dd') + 'T' + this.getTimeA()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                                  this.dataSubmit['datestart'] = this.datePipe.transform(new Date(this.datePipe.transform(this.eventForm.controls['flameOffDateStart'].value, 'yyyy-MM-dd') + 'T' + this.getTimeB()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                                  this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.datePipe.transform(this.eventForm.controls['fsnlDateStart'].value, 'yyyy-MM-dd') + 'T' + this.getTimeC()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                                  this.dataSubmit['chargebeforeshot'] = parseFloat(this.eventForm.controls['chargeShot'].value);
                                  break;
                              case 2:
                              case 952:
                                  this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.datePipe.transform(this.eventForm.controls['dateReject'].value, 'yyyy-MM-dd') + 'T' + this.getTimeA()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                                  this.dataSubmit['dateend'] = this.dataSubmit['dateinit'];
                                  this.dataSubmit['chargebeforereject'] = parseFloat(this.eventForm.controls['chargeReject'].value);
                                  break;
                              case 4956:
                              case 953:
                                  this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.datePipe.transform(this.eventForm.controls['startDateRunback'].value, 'yyyy-MM-dd') + 'T' + this.getTimeA()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                                  this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.datePipe.transform(this.eventForm.controls['endDateRunback'].value, 'yyyy-MM-dd') + 'T' + this.getTimeB()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                                  this.dataSubmit['chargebeforerunback'] = this.eventForm.controls['chargeBeforeRunback'].value;
                                  this.dataSubmit['chargeafterrunback'] = this.eventForm.controls['chargeAfterRunback'].value;
                                  break;
                              case 8051:
                              case 13501:
                                  this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.datePipe.transform(this.eventForm.controls['flameOffDateStop'].value, 'yyyy-MM-dd') + 'T' + this.getTimeA()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                                  this.dataSubmit['datestart'] = this.datePipe.transform(new Date(this.datePipe.transform(this.eventForm.controls['flameOffDateStart'].value, 'yyyy-MM-dd') + 'T' + this.getTimeB()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                                  this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.datePipe.transform(this.eventForm.controls['fsnlDateStart'].value, 'yyyy-MM-dd') + 'T' + this.getTimeC()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                                  this.dataSubmit['chargebeforestop'] = this.eventForm.controls['chargeStop'].value;
                                  break;
                              case 955:
                                  this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.datePipe.transform(this.eventForm.controls['startDateDiesel'].value, 'yyyy-MM-dd') + 'T' + this.getTimeA()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                                  this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.datePipe.transform(this.eventForm.controls['endDateDiesel'].value, 'yyyy-MM-dd') + 'T' + this.getTimeB()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                                  break;
                              case 4955:
                              case 956:
                                  this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.datePipe.transform(this.eventForm.controls['startDateNormal'].value, 'yyyy-MM-dd') + 'T' + this.getTimeA()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                                  this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.datePipe.transform(this.eventForm.controls['endDateNormal'].value, 'yyyy-MM-dd') + 'T' + this.getTimeB()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                                  break;
                          }

                          this.dataSubmit['active'] = this.checkedEstatus;
                          this.dataSubmit['programmed'] = this.checkedStopProgrammed;
                          this.dataSubmit['id'] = this.eventType.id;
                          this.dataSubmit['order'] = this.eventType.id;
                          this.dataSubmit['save'] = false;

                          this.efhService.setEvent(this.dataSubmit)
                              .subscribe(
                                  dataBack => {

                                      if (dataBack['code'] === -100) {
                                          this.toastr.errorToastr('No es posible actualizar, existe un evento activo que se empalma', 'Lo siento,');
                                      } else {
                                          if (this.accion === 'nuevo') {
                                              this.toastr.successToastr('El evento fue creada con éxito.', '¡Se ha logrado!');
                                          }
                                          if (this.accion === 'editar') {
                                              this.toastr.successToastr('El evento fue actualizado con éxito.', '¡Se ha logrado!');
                                          }

                                          this.defaultControlsEnabled(false);
                                          this.deshabiliarEstatus = true;                                          
                                          this.formTemp.controls.statusElement.disable();
                                          this.isAddObvsDisabled = true;
                                          this.disabledSave = true;
                                      }
                                  },
                                  errorData => {
                                      this.toastr.errorToastr(Constants.ERROR_SAVE, 'Lo siento,');
                                      this.addBlock(2, null);
                                  }
                              ).add(() => {
                              this.addBlock(2, null);
                              });
                      }
                  },
                  errorData => {
                      this.toastr.errorToastr(Constants.ERROR_SAVE, 'Lo siento,');
                      this.addBlock(2, null);
                  }
              );
      } else {
           this.dataSubmit['idtypeevent'] = this.eventForm.controls['eventTypeControl'].value;
           this.dataSubmit['idunit'] = this.eventForm.controls['unitControl'].value;
           this.dataSubmit['description'] = this.eventForm.controls['description'].value;
           this.dataSubmit['active'] = this.checkedEstatus;
           this.dataSubmit['programmed'] = this.checkedStopProgrammed;
           this.dataSubmit['idtypefuel'] = this.fuelTypesArr.find(x => x.name === 'GAS').id;

           if (this.isShotStartSectionVisible) {
               this.dataSubmit['dateinit'] = this.datePipe.transform(new Date( this.datePipe.transform(this.eventForm.controls['flameOffDateShot'].value, 'yyyy-MM-dd') + 'T' + this.getTimeA()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
               this.dataSubmit['datestart'] = this.datePipe.transform(new Date( this.datePipe.transform(this.eventForm.controls['flameOffDateStart'].value, 'yyyy-MM-dd') + 'T' + this.getTimeB()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
               this.dataSubmit['dateend'] = this.datePipe.transform(new Date( this.datePipe.transform(this.eventForm.controls['fsnlDateStart'].value, 'yyyy-MM-dd') + 'T' + this.getTimeC()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
               this.dataSubmit['chargebeforeshot'] = parseFloat(this.eventForm.controls['chargeShot'].value);
           } else if (this.isStopStartSectionVisible) {
               this.dataSubmit['dateinit'] = this.datePipe.transform(new Date( this.datePipe.transform(this.eventForm.controls['flameOffDateStop'].value, 'yyyy-MM-dd') + 'T' + this.getTimeA()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
               this.dataSubmit['datestart'] = this.datePipe.transform(new Date( this.datePipe.transform(this.eventForm.controls['flameOffDateStart'].value, 'yyyy-MM-dd') + 'T' + this.getTimeB()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
               this.dataSubmit['dateend'] = this.datePipe.transform(new Date( this.datePipe.transform(this.eventForm.controls['fsnlDateStart'].value, 'yyyy-MM-dd') + 'T' + this.getTimeC()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
               this.dataSubmit['chargebeforestop'] = this.eventForm.controls['chargeStop'].value;
           } else if (this.isRejectSectionVisible) {
              this.dataSubmit['dateinit'] = this.datePipe.transform(new Date( this.datePipe.transform(this.eventForm.controls['dateReject'].value, 'yyyy-MM-dd') + 'T' + this.getTimeA()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
              this.dataSubmit['dateend'] = this.dataSubmit['dateinit'];
              this.dataSubmit['chargebeforereject'] = parseFloat(this.eventForm.controls['chargeReject'].value);
          } else if (this.isRunbackSectionVisible) {
              this.dataSubmit['dateinit'] = this.datePipe.transform(new Date( this.datePipe.transform(this.eventForm.controls['startDateRunback'].value, 'yyyy-MM-dd') + 'T' + this.getTimeA()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
              this.dataSubmit['dateend'] = this.datePipe.transform(new Date( this.datePipe.transform(this.eventForm.controls['endDateRunback'].value, 'yyyy-MM-dd') + 'T' + this.getTimeB()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
              this.dataSubmit['chargebeforerunback'] = this.eventForm.controls['chargeBeforeRunback'].value;
              this.dataSubmit['chargeafterrunback'] = this.eventForm.controls['chargeAfterRunback'].value;
          } else if (this.isDieselSectionVisible) {
               this.dataSubmit['dateinit'] = this.datePipe.transform(new Date( this.datePipe.transform(this.eventForm.controls['startDateDiesel'].value, 'yyyy-MM-dd') + 'T' + this.getTimeA()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
               this.dataSubmit['dateend'] = this.datePipe.transform(new Date( this.datePipe.transform(this.eventForm.controls['endDateDiesel'].value, 'yyyy-MM-dd') + 'T' + this.getTimeB()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
          } else if (this.isNormalOperationSectionVisible) {
               this.dataSubmit['dateinit'] = this.datePipe.transform(new Date( this.datePipe.transform(this.eventForm.controls['startDateNormal'].value, 'yyyy-MM-dd') + 'T' + this.getTimeA()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
               this.dataSubmit['dateend'] = this.datePipe.transform(new Date( this.datePipe.transform(this.eventForm.controls['endDateNormal'].value, 'yyyy-MM-dd') + 'T' + this.getTimeB()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
               this.dataSubmit['idtypefuel'] = this.eventForm.controls['fuelTypeControl'].value;
          }

           if (this.accion === 'nuevo') {
              this.dataSubmit['save'] = true;
          }

           this.efhService.setEvent(this.dataSubmit)
              .subscribe(
                  dataBack => {
                      if (this.accion === 'nuevo') {
                          this.toastr.successToastr('El evento fue creada con éxito.', '¡Se ha logrado!');
                      }
                      if (this.accion === 'editar') {
                          this.toastr.successToastr('El evento fue actualizado con éxito.', '¡Se ha logrado!');
                      }

                      this.defaultControlsEnabled(false);
                      this.deshabiliarEstatus = true;                      
                      this.formTemp.controls.statusElement.disable();
                      this.isAddObvsDisabled = true;
                      this.disabledSave = true;

                      const idEvent = dataBack['code'];
                      this.efhService.accionComments.next('savenewcommentsevent|' + idEvent);

                      this.eventType.id = idEvent;
                  },
                  errorData => {
                      this.toastr.errorToastr(Constants.ERROR_SAVE, 'Lo siento,');
                      this.addBlock(2, null);
                  }
              ).add(() => {
                this.addBlock(2, null);
              });
      }
  }

  changeCheck() {
    if (this.checkedEstatus) {
      this.checkedEstatus = false;
    } else {
      this.checkedEstatus = true;
    }
    this.formTemp.controls.statusElement.setValue(this.checkedEstatus);
    if (this.accion === 'editar') {
      this.disabledSave = false;
    }
  }

  changeCheckStopProgrammed() {
    if (this.checkedStopProgrammed) {
        this.checkedStopProgrammed = false;
    } else {
        this.checkedStopProgrammed = true;
    }

    if (this.accion === 'editar') {
        this.disabledSave = false;
    }
  }

  enableControls(selected) {
      this.submittedData = false;
      this.selectControlsEnabled(true);
      this.resetSections();
      this.fuelTypesArr = this.fuelTypesForSelect;
      switch (selected.value) {
          case 13451:
          case 8001: this.defaultControlsEnabled(true);
                     this.isShotStartSectionVisible = true;
                     this.isDefaultSectionsVisible = true;
                     break;
          case 2:
          case 952: this.defaultControlsEnabled(true);
                    this.isRejectSectionVisible = true;
                    this.isDefaultSectionsVisible = true;
                    break;
          case 4956:
          case 953: this.defaultControlsEnabled(true);
                    this.isRunbackSectionVisible = true;
                    this.isDefaultSectionsVisible = true;
                    break;
          case 8051:
          case 13501: this.defaultControlsEnabled(true);
                      this.isStopStartSectionVisible = true;
                      this.isDefaultSectionsVisible = true;
                      break;
          case 955: this.defaultControlsEnabled(true);
                    this.isDieselSectionVisible = true;
                    this.isDefaultSectionsVisible = true;
                    this.fuelTypesArr = [];
                    this.selectedFuelType = undefined;
                    this.fuelTypesArr.push(this.fuelTypesForSelect.find(x => x.name === 'DIESEL'));
                    break;
          case 4955: this.defaultControlsEnabled(true);
                     this.isNormalOperationSectionVisible = true;
                     this.isDefaultSectionsVisible = true;
                     this.fuelTypesArr = [];
                     this.selectedFuelType = undefined;
                     this.fuelTypesArr.push(this.fuelTypesForSelect.find(x => x.name === 'GAS'));
                     break;
          case 956: this.defaultControlsEnabled(true);
                    this.isNormalOperationSectionVisible = true;
                    this.isDefaultSectionsVisible = true;
                    // this.fuelTypesArr = this.eventType.fuelTypesArr;
                    this.fuelTypesArr = this.fuelTypesForSelect;
                    this.selectedFuelType = undefined;
                    break;
      }

  }

  resetSections() {
      this.isShotSectionVisible = false;
      this.isStartSectionVisible = false;
      this.isRejectSectionVisible = false;
      this.isRunbackSectionVisible = false;
      this.isStopSectionVisible = false;
      this.isDieselSectionVisible = false;
      this.isNormalOperationSectionVisible = false;
      this.isDefaultSectionsVisible = false;
      this.isShotStartSectionVisible = false;
      this.isStopStartSectionVisible = false;
      this.defaultControlsEnabled(false);
  }

  regresar() {
    this.eventService.sendChangePage(new EventMessage(4, {} , 'Efh.Agregar eventos'));
  }

  private addBlock(type, msg): void {
    this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
  }

  onSubmit() {
      this.addBlock(1, 'Cargando...');
      this.submittedData = true;
      if ((this.isShotStartSectionVisible && this.eventForm.controls['chargeShot'].invalid)
          || (this.isShotStartSectionVisible && this.eventForm.controls['flameOffDateShot'].invalid)
          || (this.isShotStartSectionVisible && this.eventForm.controls['flameOffDateStart'].invalid)
          || (this.isShotStartSectionVisible && this.eventForm.controls['fsnlDateStart'].invalid)
          || (this.isRejectSectionVisible && this.eventForm.controls['chargeReject'].invalid)
          || (this.isRejectSectionVisible && this.eventForm.controls['dateReject'].invalid)
          || (this.isRejectSectionVisible && this.eventForm.controls['timeReject'].invalid)
          || (this.isRunbackSectionVisible && this.eventForm.controls['startDateRunback'].invalid)
          || (this.isRunbackSectionVisible && this.eventForm.controls['startTimeRunback'].invalid)
          || (this.isRunbackSectionVisible && this.eventForm.controls['endDateRunback'].invalid)
          || (this.isRunbackSectionVisible && this.eventForm.controls['endTimeRunback'].invalid)
          || (this.isRunbackSectionVisible && this.eventForm.controls['chargeBeforeRunback'].invalid)
          || (this.isRunbackSectionVisible && this.eventForm.controls['chargeAfterRunback'].invalid)
          || (this.isStopStartSectionVisible && this.eventForm.controls['flameOffDateStop'].invalid)
          || (this.isStopStartSectionVisible && this.eventForm.controls['flameOffDateStart'].invalid)
          || (this.isStopStartSectionVisible && this.eventForm.controls['fsnlDateStop'].invalid)
          || (this.isStopStartSectionVisible && this.eventForm.controls['chargeStop'].invalid)
          || (this.isDieselSectionVisible && this.eventForm.controls['startDateDiesel'].invalid)
          || (this.isDieselSectionVisible && this.eventForm.controls['startTimeDiesel'].invalid)
          || (this.isDieselSectionVisible && this.eventForm.controls['endDateDiesel'].invalid)
          || (this.isDieselSectionVisible && this.eventForm.controls['endTimeDiesel'].invalid)
          || (this.isNormalOperationSectionVisible && this.eventForm.controls['startDateNormal'].invalid)
          || (this.isNormalOperationSectionVisible && this.eventForm.controls['startTimeNormal'].invalid)
          || (this.isNormalOperationSectionVisible && this.eventForm.controls['endDateNormal'].invalid)
          || (this.isNormalOperationSectionVisible && this.eventForm.controls['endTimeNormal'].invalid)
          || (this.selectedUnit === undefined || this.selectedUnit === null)
          || (this.isNormalOperationSectionVisible && (this.selectedFuelType === undefined || this.selectedFuelType === null)) ) {
              debugger
          this.toastr.errorToastr('Todos los campos son obligatorios, verifique.', 'Lo siento,');
          this.addBlock(2, null);
          return;
      }

      if (this.isRunbackSectionVisible
          && this.compareDate(this.datePipe.transform(new Date(this.datePipe.transform(this.eventForm.controls['startDateRunback'].value, 'yyyy-MM-dd') + ' ' + this.getTimeA()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'),
              this.datePipe.transform(new Date(this.datePipe.transform(this.eventForm.controls['endDateRunback'].value, 'yyyy-MM-dd') + ' ' + this.getTimeB()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'))) {
          this.toastr.errorToastr('Fecha inicio debe ser menor a Fecha fin, verifique', 'Lo siento,');
          this.runbackDatesValidation = true;
          this.addBlock(2, null);
          return;
      }

      if (this.isStopStartSectionVisible
          && this.compareDate(this.datePipe.transform(new Date(this.datePipe.transform(this.eventForm.controls['flameOffDateStop'].value, 'yyyy-MM-dd') + ' ' + this.getTimeA()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'),
              this.datePipe.transform(new Date(this.datePipe.transform(this.eventForm.controls['flameOffDateStart'].value, 'yyyy-MM-dd') + ' ' + this.getTimeB()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'))) {
          this.toastr.errorToastr('Fecha de Paro debe ser menor a Fecha de Arranque, verifique', 'Lo siento,');
          this.stopStartDatesValidation = true;
          this.addBlock(2, null);
          return;
      } else if (this.isStopStartSectionVisible
          && this.compareDate(this.datePipe.transform(new Date(this.datePipe.transform(this.eventForm.controls['flameOffDateStart'].value, 'yyyy-MM-dd') + ' ' + this.getTimeB()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'),
              this.datePipe.transform(new Date(this.datePipe.transform(this.eventForm.controls['fsnlDateStart'].value, 'yyyy-MM-dd') + ' ' + this.getTimeC()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'))) {
          this.toastr.errorToastr('Fecha de Arranque debe ser menor a FSNL, verifique', 'Lo siento,');
          this.stopStartDatesValidation = true;
          this.addBlock(2, null);
          return;
      }

      if (this.isDieselSectionVisible
          && this.compareDate(this.datePipe.transform(new Date(this.datePipe.transform(this.eventForm.controls['startDateDiesel'].value, 'yyyy-MM-dd') + ' ' + this.getTimeA()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'),
              this.datePipe.transform(new Date(this.datePipe.transform(this.eventForm.controls['endDateDiesel'].value, 'yyyy-MM-dd') + ' ' + this.getTimeB()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'))) {
          this.toastr.errorToastr('Fecha inicio debe ser menor a Fecha fin, verifique', 'Lo siento,');
          this.dieselDatesValidation = true;
          this.addBlock(2, null);
          return;
      }

      if (this.isNormalOperationSectionVisible
          && this.compareDate(this.datePipe.transform(new Date(this.datePipe.transform(this.eventForm.controls['startDateNormal'].value, 'yyyy-MM-dd') + ' ' + this.getTimeA()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'),
              this.datePipe.transform(new Date(this.datePipe.transform(this.eventForm.controls['endDateNormal'].value, 'yyyy-MM-dd') + ' ' + this.getTimeB()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'))) {
          this.toastr.errorToastr('Fecha inicio de Operación debe ser menor a Fecha fin, verifique', 'Lo siento,');
          this.normalDatesValidation = true;
          this.addBlock(2, null);
          return;
      }

      if (this.isShotStartSectionVisible
          && this.compareDate(this.datePipe.transform(new Date(this.datePipe.transform(this.eventForm.controls['flameOffDateShot'].value, 'yyyy-MM-dd') + ' ' + this.getTimeA()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'),
              this.datePipe.transform(new Date(this.datePipe.transform(this.eventForm.controls['flameOffDateStart'].value, 'yyyy-MM-dd') + ' ' + this.getTimeB()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'))) {
          this.toastr.errorToastr('Fecha de Disparo debe ser menor a Fecha de Arranque, verifique', 'Lo siento,');
          this.shotStartDatesValidation = true;
          this.addBlock(2, null);
          return;
      } else if (this.isStopStartSectionVisible
          && this.compareDate(this.datePipe.transform(new Date(this.datePipe.transform(this.eventForm.controls['flameOffDateStart'].value, 'yyyy-MM-dd') + ' ' + this.getTimeB()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'),
              this.datePipe.transform(new Date(this.datePipe.transform(this.eventForm.controls['fsnlDateStart'].value, 'yyyy-MM-dd') + ' ' + this.getTimeC()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'))) {
          this.toastr.errorToastr('Fecha de Arranque debe ser menor a FSNL, verifique', 'Lo siento,');
          this.shotStartDatesValidation = true;
          this.addBlock(2, null);
          return;
      }

      if (this.accion === 'editar') {
          this.obtenerDatosConfiguracionEvento(false, this.eventType.id);
      } else {
          this.obtenerDatosConfiguracionEvento(false, 0);
      }
  }

  getTimeA(): string {
      return this.formTemp.controls.ha.value + ':' + this.formTemp.controls.ma.value + ':' + this.formTemp.controls.sa.value;
  }

  getTimeB(): string {
      return this.formTemp.controls.hb.value + ':' + this.formTemp.controls.mb.value + ':' + this.formTemp.controls.sb.value;
  }

  getTimeC(): string {
      return this.formTemp.controls.hc.value + ':' + this.formTemp.controls.mc.value + ':' + this.formTemp.controls.sc.value;
  }

  setTimeA(dateToTransform: string) {
      const time = this.datePipe.transform(new Date(dateToTransform) , 'HH:mm:ss');
      this.formTemp.controls.ha.setValue(time.split(':')[0]);
      this.formTemp.controls.ma.setValue(time.split(':')[1]);
      this.formTemp.controls.sa.setValue(time.split(':')[2]);
  }

  setTimeB(dateToTransform: string) {
      const time = this.datePipe.transform(new Date(dateToTransform) , 'HH:mm:ss');
      this.formTemp.controls.hb.setValue(time.split(':')[0]);
      this.formTemp.controls.mb.setValue(time.split(':')[1]);
      this.formTemp.controls.sb.setValue(time.split(':')[2]);
  }

  setTimeC(dateToTransform: string) {
      const time = this.datePipe.transform(new Date(dateToTransform) , 'HH:mm:ss');
      this.formTemp.controls.hc.setValue(time.split(':')[0]);
      this.formTemp.controls.mc.setValue(time.split(':')[1]);
      this.formTemp.controls.sc.setValue(time.split(':')[2]);
  }

  selectControlsEnabled(flag) {
      this.optionsSelectEnabled = flag;
      if (flag) {
          this.eventForm.controls.unitControl.enable();
          this.eventForm.controls.fuelTypeControl.enable();
      } else {
          this.eventForm.controls.unitControl.disable();
          this.eventForm.controls.fuelTypeControl.disable();
      }
  }

  defaultControlsEnabled(flag) {
      if (flag) {
          this.eventForm.enable();
          this.formTemp.enable();
      } else {
          this.eventForm.disable();
          this.formTemp.disable();
      }
  }

  resetAuxVariables() {
      this.flameOffDate = null;
      this.flameOffTime = null;
      this.fsnlDate = null;
      this.fsnlTime = null;
      this.rejectDate = null;
      this.rejectTime = null;
      this.startDate = null;
      this.startTime = null;
      this.endDate = null;
      this.endTime = null;
  }

  compareDate(date1: string, date2: string): boolean {
      let d1 = new Date(date1);
      let d2 = new Date(date2);

      // Check if the dates are equal
      let same = d1.getTime() === d2.getTime();

      if (same) { return true; }

        // Check if the first is greater than second
      if (d1 > d2) { return true; }

        // Check if the first is less than second
      if (d1 < d2) { return false; }

  }

  getTimeLocale(dateString: string): Date {
      const toConvertDate = new Date(dateString);
      const offsetTimeZone = toConvertDate.getTimezoneOffset() * 60000;
      return new Date(toConvertDate.getTime() + offsetTimeZone);
  }

  enableSaveButton() {
      // this.disabledSave = false;
      this.isAddObvsDisabled = false;
  }

  isNumeric(link) {
      this.chargeValidation = false;
      if ( isNaN( Number(this.defaultCharge)) || 0 === Number(this.defaultCharge) ) {
        link.value = this.defaultCharge;
      }
      if (link.value < 0) {
        this.toastr.warningToastr('Carga debe ser mayor o igual a 0', 'Verifica carga');
        this.chargeValidation = true;
      }
      if (link.value > 200) {
        this.toastr.warningToastr('Carga debe ser menor o igual a 200', 'Verifica carga');
        this.chargeValidation = true;
      }
  }

  isNumeric2(link) {
        this.charge2Validation = false;
        if ( isNaN( Number(this.defaultCharge2)) || 0 === Number(this.defaultCharge2) ) {
            link.value = this.defaultCharge2;
        }
        if (link.value < 0) {
            this.toastr.warningToastr('Carga debe ser mayor o igual a 0', 'Verifica carga final');
            this.charge2Validation = true;
        }
        if (link.value > 200) {
            this.toastr.warningToastr('Carga debe ser menor o igual a 200', 'Verifica carga final');
            this.charge2Validation = true;
        }
  }

}
