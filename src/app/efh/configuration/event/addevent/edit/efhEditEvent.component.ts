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
import {Comment} from '../../../../models/Comment';
import {MatSnackBar} from '@angular/material';

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
  eventType: EventType;
  eventForm: FormGroup;
  resultService;
  result;
  eventTypesArr = [];
  unitsArr = [];
  fuelTypesArr = [];
  fuelTypesForSelect = [];
  dataSubmit = {};
  dataObservationSumbit = {};
  checkedEstatus = false;
  checkedStopProgrammed = true;
  deshabiliarEstatus = false;
  headObservaciones = ['#', 'Nombre', 'Observaciones', 'Fecha de ultima modificación', 'Visible', 'Editar', 'Eliminar'];
  observationsArr: Array<any>;
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

  optionsSelectEnabled = true;

  isShotControlsEnabled = true;
  isStartControlsEnabled = true;
  isRejectControlsEnabled = true;
  isRunbackControlsEnabled = true;
  isStopControlsEnabled = true;
  isDieselControlsEnabled = true;
  isNormalOperationControlsEnabled = true;

  startDatesValidation = false;
  runbackDatesValidation = false;
  stopDatesValidation = false;
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
    this.observationsArr = [];
  }

  get f() { return this.eventForm.controls; }

  ngOnInit() {
      debugger;
      this.submittedData = false;
      this.eventForm = this.formBuilder.group({
          eventTypeControl: [null, null],
          unitControl: [ null, null],
          fuelTypeControl: [ null, null],
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
          description: ['', Validators.required],
          // observations: [{ value: '', disabled: this.isAddObvsDisabled }, Validators.required],
          file: [null, Validators.required]
      });
      this.selectControlsEnabled(false);
      this.shotControlsEnabled(false);
      this.startControlsEnabled(false);
      this.rejectControlsEnabled(false);
      this.runbackConstrolsEnabled(false);
      this.stopControlsEnabled(false);
      this.dieselControlsEnabled(false);
      this.normalOperationControlsEnabled(false);
      this.defaultConstrolsEnabled(false);

      this.eventTypesArr = this.eventType.eventTypesArr.filter(event => event.active);
      this.eventTypesArr.sort((a, b) => a.name.localeCompare(b.name));
      this.unitsArr = this.eventType.unitsArr.filter(unit => unit.active);
      this.unitsArr.sort((a, b) => a.name.localeCompare(b.name));
      this.fuelTypesArr = this.eventType.fuelTypesArr.filter(fuel => fuel.active);
      this.fuelTypesArr.sort((a, b) => a.name.localeCompare(b.name));
      this.fuelTypesForSelect = this.fuelTypesArr;

      // debugger;
      // this.getCatalogs();

      this.selectedEventType = undefined;
      this.selectedUnit = undefined;
      this.selectedFuelType = undefined;

      this.accion = this.eventType.action;
      this.seccion = this.eventType.section;

      if (this.accion === 'editar') {
          this.eventForm.controls.eventTypeControl.disable();
          this.selectControlsEnabled(true);
          this.deshabiliarEstatus = false;
          this.disabledSave = false;
          this.titulo = 'Editar / Configuración de Eventos';
      } else if (this.accion === 'ver') {
          this.deshabiliarEstatus = true;
          this.isAddObvsDisabled = true;
          this.eventForm.controls.eventTypeControl.disable();
          this.titulo = 'Consultar / Configuración de Eventos';
      } else {
          this.checkedEstatus = true;
          this.deshabiliarEstatus = false;
          this.titulo = 'Agregar / Configuración de Eventos';
      }

      if (this.accion === 'editar' || this.accion === 'ver') {
          this.resetSections();
          switch (this.seccion) {
              case 'DISPARO': this.shotControlsEnabled(this.accion === 'ver' ? false : true);
                              this.defaultConstrolsEnabled(this.accion === 'ver' ? false : true);
                              this.isShotSectionVisible = true;
                              this.isDefaultSectionsVisible = true;
                              break;
              case 'ARRANQUE': this.startControlsEnabled(this.accion === 'ver' ? false : true);
                               this.defaultConstrolsEnabled(this.accion === 'ver' ? false : true);
                               this.isStartSectionVisible = true;
                               this.isDefaultSectionsVisible = true;
                               break;
              case 'RECHAZO DE CARGA': this.rejectControlsEnabled(this.accion === 'ver' ? false : true);
                                       this.defaultConstrolsEnabled(this.accion === 'ver' ? false : true);
                                       this.isRejectSectionVisible = true;
                                       this.isDefaultSectionsVisible = true;
                                       break;
              case 'RUNBACK': this.runbackConstrolsEnabled(this.accion === 'ver' ? false : true);
                              this.defaultConstrolsEnabled(this.accion === 'ver' ? false : true);
                              this.isRunbackSectionVisible = true;
                              this.isDefaultSectionsVisible = true;
                              break;
              case 'PARO': this.stopControlsEnabled(this.accion === 'ver' ? false : true);
                           this.defaultConstrolsEnabled(this.accion === 'ver' ? false : true);
                           this.isStopSectionVisible = true;
                           this.isDefaultSectionsVisible = true;
                           break;
              case 'OPERACIÓN CON DIESEL': this.dieselControlsEnabled(this.accion === 'ver' ? false : true);
                                           this.defaultConstrolsEnabled(this.accion === 'ver' ? false : true);
                                           this.isDieselSectionVisible = true;
                                           this.isDefaultSectionsVisible = true;
                                           break;
              case 'OPERACIÓN': this.normalOperationControlsEnabled(this.accion === 'ver' ? false : true);
                                this.defaultConstrolsEnabled(this.accion === 'ver' ? false : true);
                                this.isNormalOperationSectionVisible = true;
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
                              this.selectedUnit = this.unitsArr.find(x => x.id === element.idunit).id;
                              this.selectedFuelType = this.fuelTypesArr.find(x => x.id === element.idtypefuel).id;

                              // this.getObservations(this.eventType.id);

                              debugger;

                              switch (element.idtypeevent) {
                                  case 1: this.flameOffDate = this.datePipe.transform(new Date(element.dateinit) , 'yyyy-MM-dd');
                                      this.flameOffTime = this.datePipe.transform(new Date(element.dateinit) , 'HH:mm:ss');
                                      this.eventForm.controls['flameOffDateShot'].setValue(this.flameOffDate)
                                      this.eventForm.controls['flameOffTimeShot'].setValue(this.flameOffTime);
                                      this.eventForm.controls['chargeShot'].setValue(element.chargebeforeshot);
                                      break;
                                  case 4953:
                                  case 4954: this.flameOffDate = this.datePipe.transform(new Date(element.dateinit) , 'yyyy-MM-dd');
                                      this.flameOffTime = this.datePipe.transform(new Date(element.dateinit) , 'HH:mm:ss');
                                      this.fsnlDate = this.datePipe.transform(new Date(element.dateend) , 'yyyy-MM-dd');
                                      this.fsnlTime = this.datePipe.transform(new Date(element.dateend) , 'HH:mm:ss');
                                      this.eventForm.controls['flameOffDateStart'].setValue(this.flameOffDate)
                                      this.eventForm.controls['flameOffTimeStart'].setValue(this.flameOffTime);
                                      this.eventForm.controls['fsnlDateStart'].setValue(this.fsnlDate);
                                      this.eventForm.controls['fsnlTimeStart'].setValue(this.fsnlTime);
                                      break;
                                  case 2:
                                  case 952: this.rejectDate = this.datePipe.transform(new Date(element.dateinit) , 'yyyy-MM-dd');
                                      this.rejectTime = this.datePipe.transform(new Date(element.dateinit) , 'HH:mm:ss');
                                      this.eventForm.controls['dateReject'].setValue(this.rejectDate);
                                      this.eventForm.controls['timeReject'].setValue(this.rejectTime);
                                      this.eventForm.controls['chargeReject'].setValue(element.chargebeforereject);
                                      break;
                                  case 4956:
                                  case 953: this.startDate = this.datePipe.transform(new Date(element.dateinit) , 'yyyy-MM-dd');
                                      this.startTime = this.datePipe.transform(new Date(element.dateinit) , 'HH:mm:ss');
                                      this.endDate = this.datePipe.transform(new Date(element.dateend) , 'yyyy-MM-dd');
                                      this.endTime = this.datePipe.transform(new Date(element.dateend) , 'HH:mm:ss');
                                      this.eventForm.controls['startDateRunback'].setValue(this.startDate);
                                      this.eventForm.controls['startTimeRunback'].setValue(this.startTime);
                                      this.eventForm.controls['endDateRunback'].setValue(this.endDate);
                                      this.eventForm.controls['endTimeRunback'].setValue(this.endTime);
                                      this.eventForm.controls['chargeBeforeRunback'].setValue(element.chargebeforerunback);
                                      this.eventForm.controls['chargeAfterRunback'].setValue(element.chargeafterrunback);
                                      break;
                                  case 4957:
                                  case 954: this.flameOffDate = this.datePipe.transform(new Date(element.dateinit) , 'yyyy-MM-dd');
                                      this.flameOffTime = this.datePipe.transform(new Date(element.dateinit) , 'HH:mm:ss');
                                      this.fsnlDate = this.datePipe.transform(new Date(element.dateend) , 'yyyy-MM-dd');
                                      this.fsnlTime = this.datePipe.transform(new Date(element.dateend) , 'HH:mm:ss');
                                      this.eventForm.controls['flameOffDateStop'].setValue(this.flameOffDate);
                                      this.eventForm.controls['flameOffTimeStop'].setValue(this.flameOffTime);
                                      this.eventForm.controls['fsnlDateStop'].setValue(this.fsnlDate);
                                      this.eventForm.controls['fsnlTimeStop'].setValue(this.fsnlTime);
                                      this.eventForm.controls['chargeStop'].setValue(element.chargebeforestop);
                                      break;
                                  case 955: this.startDate = this.datePipe.transform(new Date(element.dateinit) , 'yyyy-MM-dd');
                                      this.startTime = this.datePipe.transform(new Date(element.dateinit) , 'HH:mm:ss');
                                      this.endDate = this.datePipe.transform(new Date(element.dateend) , 'yyyy-MM-dd');
                                      this.endTime = this.datePipe.transform(new Date(element.dateend) , 'HH:mm:ss');
                                      this.eventForm.controls['startDateDiesel'].setValue(this.startDate);
                                      this.eventForm.controls['startTimeDiesel'].setValue(this.startTime);
                                      this.eventForm.controls['endDateDiesel'].setValue(this.endDate);
                                      this.eventForm.controls['endTimeDiesel'].setValue(this.endTime);
                                      break;
                                  case 4955:
                                  case 956: this.startDate = this.datePipe.transform(new Date(element.dateinit) , 'yyyy-MM-dd');
                                      this.startTime = this.datePipe.transform(new Date(element.dateinit) , 'HH:mm:ss');
                                      this.endDate = this.datePipe.transform(new Date(element.dateend) , 'yyyy-MM-dd');
                                      this.endTime = this.datePipe.transform(new Date(element.dateend) , 'HH:mm:ss');
                                      this.eventForm.controls['startDateNormal'].setValue(this.startDate);
                                      this.eventForm.controls['startTimeNormal'].setValue(this.startTime);
                                      this.eventForm.controls['endDateNormal'].setValue(this.endDate);
                                      this.eventForm.controls['endTimeNormal'].setValue(this.endTime);
                                      break;
                              }
                              this.eventForm.controls['description'].setValue(element.description);
                              // this.eventForm.controls['observations'].setValue(element.observations);
                              this.checkedEstatus = element.active;
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
                          // this.dataSubmit['observations'] = this.eventForm.controls['observations'].value;

                          switch (this.dataSubmit['idtypeevent']) {
                              case 1: this.flameOffDate = this.eventForm.controls['flameOffDateShot'].value;
                                  this.flameOffTime = this.eventForm.controls['flameOffTimeShot'].value;
                                  this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.flameOffDate + 'T' + this.flameOffTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                                  this.dataSubmit['dateend'] = this.dataSubmit['dateinit'];
                                  this.dataSubmit['chargebeforeshot'] = this.eventForm.controls['chargeShot'].value;
                                  break;
                              case 4953:
                              case 4954: this.flameOffDate = this.eventForm.controls['flameOffDateStart'].value;
                                  this.flameOffTime = this.eventForm.controls['flameOffTimeStart'].value;
                                  this.fsnlDate = this.eventForm.controls['fsnlDateStart'].value;
                                  this.fsnlTime = this.eventForm.controls['fsnlTimeStart'].value;
                                  this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.flameOffDate + 'T' + this.flameOffTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                                  this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.fsnlDate + 'T' + this.fsnlTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                                  break;
                              case 2:
                              case 952: this.rejectDate = this.eventForm.controls['dateReject'].value;
                                  this.rejectTime = this.eventForm.controls['timeReject'].value;
                                  this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.rejectDate + 'T' + this.rejectTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                                  this.dataSubmit['dateend'] = this.dataSubmit['dateinit'];
                                  this.dataSubmit['chargebeforereject'] = this.eventForm.controls['chargeReject'].value;
                                  break;
                              case 4956:
                              case 953: this.startDate = this.eventForm.controls['startDateRunback'].value;
                                  this.startTime = this.eventForm.controls['startTimeRunback'].value;
                                  this.endDate = this.eventForm.controls['endDateRunback'].value;
                                  this.endTime = this.eventForm.controls['endTimeRunback'].value;
                                  this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.startDate + 'T' + this.startTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                                  this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.endDate + 'T' + this.endTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                                  this.dataSubmit['chargebeforerunback'] = this.eventForm.controls['chargeBeforeRunback'].value;
                                  this.dataSubmit['chargeafterrunback'] = this.eventForm.controls['chargeAfterRunback'].value;
                                  break;
                              case 4957:
                              case 954: this.flameOffDate = this.eventForm.controls['flameOffDateStop'].value;
                                  this.flameOffTime = this.eventForm.controls['flameOffTimeStop'].value;
                                  this.fsnlDate = this.eventForm.controls['fsnlDateStop'].value;
                                  this.fsnlTime = this.eventForm.controls['fsnlTimeStop'].value;
                                  this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.flameOffDate + 'T' + this.flameOffTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                                  this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.fsnlDate + 'T' + this.fsnlTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                                  this.dataSubmit['chargebeforestop'] = this.eventForm.controls['chargeStop'].value;
                                  break;
                              case 955: this.startDate = this.eventForm.controls['startDateDiesel'].value;
                                  this.startTime = this.eventForm.controls['startTimeDiesel'].value;
                                  this.endDate = this.eventForm.controls['endDateDiesel'].value;
                                  this.endTime = this.eventForm.controls['endTimeDiesel'].value;
                                  this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.startDate + 'T' + this.startTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                                  this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.endDate + 'T' + this.endTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                                  break;
                              case 4955:
                              case 956: this.startDate = this.eventForm.controls['startDateNormal'].value;
                                  this.startTime = this.eventForm.controls['startTimeNormal'].value;
                                  this.endDate = this.eventForm.controls['endDateNormal'].value;
                                  this.endTime = this.eventForm.controls['endTimeNormal'].value;
                                  this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.startDate + 'T' + this.startTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                                  this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.endDate + 'T' + this.endTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
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

                                          if (this.isShotSectionVisible) {
                                              this.shotControlsEnabled(false);
                                          } else if (this.isRejectSectionVisible) {
                                              this.rejectControlsEnabled(false);
                                          } else if (this.isRunbackSectionVisible) {
                                              this.runbackConstrolsEnabled(false);
                                          } else if (this.isStopSectionVisible) {
                                              this.stopControlsEnabled(false);
                                          } else if (this.isDieselSectionVisible) {
                                              this.dieselControlsEnabled(false);
                                          } else if (this.isNormalOperationSectionVisible) {
                                              this.normalOperationControlsEnabled(false);
                                          } else if (this.isStartSectionVisible) {
                                              this.startControlsEnabled(false);
                                          }

                                          this.selectControlsEnabled(false);
                                          this.defaultConstrolsEnabled(false);
                                          this.deshabiliarEstatus = true;
                                          this.isAddObvsDisabled = true;
                                          this.disabledSave = true;
                                      }

                                      /*
                                      for (const comment of this.observationsArr) {
                                          if (comment.saved === false) {
                                              this.dataObservationSumbit['ideventconfig'] = this.eventType.id;
                                              this.dataObservationSumbit['observation'] = comment.observacion;
                                              this.dataObservationSumbit['dateobservation'] = comment.fecha_modificacion;
                                              this.efhService.saveObservation(this.dataObservationSumbit).subscribe(
                                                  dataBack => {
                                                      const status = 'exito';
                                                  }
                                              );
                                          }
                                      } */
                                  },
                                  errorData => {
                                      this.toastr.errorToastr(Constants.ERROR_SAVE, 'Lo siento,');
                                  }
                              );
                      }
                  },
                  errorData => {
                      this.toastr.errorToastr(Constants.ERROR_SAVE, 'Lo siento,');
                  }
              );
      } else {
           this.dataSubmit['idtypeevent'] = this.eventForm.controls['eventTypeControl'].value;
           this.dataSubmit['idunit'] = this.eventForm.controls['unitControl'].value;
           this.dataSubmit['description'] = this.eventForm.controls['description'].value;
           this.dataSubmit['active'] = this.checkedEstatus;
           this.dataSubmit['programmed'] = this.checkedStopProgrammed;
           this.dataSubmit['idtypefuel'] = this.fuelTypesArr.find(x => x.name === 'GAS').id;

           if (this.isShotSectionVisible) {
               this.flameOffDate = this.eventForm.controls['flameOffDateShot'].value;
               this.flameOffTime = this.eventForm.controls['flameOffTimeShot'].value;
               this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.flameOffDate + ' ' + this.flameOffTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
               this.dataSubmit['dateend'] = this.dataSubmit['dateinit'];
               this.dataSubmit['chargebeforeshot'] = parseFloat(this.eventForm.controls['chargeShot'].value);
           } else if (this.isStartSectionVisible) {
               this.flameOffDate = this.eventForm.controls['flameOffDateStart'].value;
               this.flameOffTime = this.eventForm.controls['flameOffTimeStart'].value;
               this.fsnlDate = this.eventForm.controls['fsnlDateStart'].value;
               this.fsnlTime = this.eventForm.controls['fsnlTimeStart'].value;
               this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.flameOffDate + ' ' + this.flameOffTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
               this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.fsnlDate + 'T' + this.fsnlTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
           } else if (this.isRejectSectionVisible) {
              this.rejectDate = this.eventForm.controls['dateReject'].value;
              this.rejectTime = this.eventForm.controls['timeReject'].value;
              this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.rejectDate + 'T' + this.rejectTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
              this.dataSubmit['dateend'] = this.dataSubmit['dateinit'];
              this.dataSubmit['chargebeforereject'] = parseFloat(this.eventForm.controls['chargeReject'].value);
          } else if (this.isRunbackSectionVisible) {
              this.startDate = this.eventForm.controls['startDateRunback'].value;
              this.startTime = this.eventForm.controls['startTimeRunback'].value;
              this.endDate = this.eventForm.controls['endDateRunback'].value;
              this.endTime = this.eventForm.controls['endTimeRunback'].value;
              this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.startDate + 'T' + this.startTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
              this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.endDate + 'T' + this.endTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
              this.dataSubmit['chargebeforerunback'] = this.eventForm.controls['chargeBeforeRunback'].value;
              this.dataSubmit['chargeafterrunback'] = this.eventForm.controls['chargeAfterRunback'].value;
          } else if (this.isStopSectionVisible) {
              this.flameOffDate = this.eventForm.controls['flameOffDateStop'].value;
              this.flameOffTime = this.eventForm.controls['flameOffTimeStop'].value;
              this.fsnlDate = this.eventForm.controls['fsnlDateStop'].value;
              this.fsnlTime = this.eventForm.controls['fsnlTimeStop'].value;
              this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.flameOffDate + 'T' + this.flameOffTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
              this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.fsnlDate + 'T' + this.fsnlTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
              this.dataSubmit['chargebeforestop'] = this.eventForm.controls['chargeStop'].value;
          } else if (this.isDieselSectionVisible) {
               this.startDate = this.eventForm.controls['startDateDiesel'].value;
               this.startTime = this.eventForm.controls['startTimeDiesel'].value;
               this.endDate = this.eventForm.controls['endDateDiesel'].value;
               this.endTime = this.eventForm.controls['endTimeDiesel'].value;
               this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.startDate + 'T' + this.startTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
               this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.endDate + 'T' + this.endTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
          } else if (this.isNormalOperationSectionVisible) {
               this.startDate = this.eventForm.controls['startDateNormal'].value;
               this.startTime = this.eventForm.controls['startTimeNormal'].value;
               this.endDate = this.eventForm.controls['endDateNormal'].value;
               this.endTime = this.eventForm.controls['endTimeNormal'].value;
               this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.startDate + 'T' + this.startTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
               this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.endDate + 'T' + this.endTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
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

                      if (this.isShotSectionVisible) {
                          this.shotControlsEnabled(false);
                      } else if (this.isRejectSectionVisible) {
                          this.rejectControlsEnabled(false);
                      } else if (this.isRunbackSectionVisible) {
                          this.runbackConstrolsEnabled(false);
                      } else if (this.isStopSectionVisible) {
                          this.stopControlsEnabled(false);
                      } else if (this.isDieselSectionVisible) {
                          this.dieselControlsEnabled(false);
                      } else if (this.isNormalOperationSectionVisible) {
                          this.normalOperationControlsEnabled(false);
                      } else if (this.isStartSectionVisible) {
                          this.startControlsEnabled(false);
                      }

                      this.selectControlsEnabled(false);
                      this.defaultConstrolsEnabled(false);
                      this.deshabiliarEstatus = true;
                      this.isAddObvsDisabled = true;
                      this.disabledSave = true;

                      const idEvent = dataBack['code'];
                      this.efhService.accionComments.next('savenewcommentsevent|' + idEvent);

                      this.eventType.id = idEvent;
                      // Saving Observations
                      /*
                      for (const comment of this.observationsArr) {
                          this.dataObservationSumbit['ideventconfig'] = idEvent;
                          this.dataObservationSumbit['observation'] = comment.observacion;
                          this.dataObservationSumbit['dateobservation'] = comment.fecha_modificacion;
                          this.efhService.saveObservation(this.dataObservationSumbit).subscribe(
                              data => {
                                  const response = 'exito';
                              }
                          );
                      }*/

                      // Saving Files
                      // this.efhService.accionFiles.next('savenewfilesevent|' + idEvent);
                  },
                  errorData => {
                      this.toastr.errorToastr(Constants.ERROR_SAVE, 'Lo siento,');
                  }
              );
      }
  }

  changeCheck() {
    if (this.checkedEstatus) {
      this.checkedEstatus = false;
    } else {
      this.checkedEstatus = true;
    }

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
      this.selectControlsEnabled(true);
      this.resetSections();
      this.fuelTypesArr = this.fuelTypesForSelect;
      // console.log(selected.value.id + ' | ' + selected.value.name)
      switch (selected.value) {
          case 1: this.shotControlsEnabled(true);
                  this.defaultConstrolsEnabled(true);
                  this.isShotSectionVisible = true;
                  this.isDefaultSectionsVisible = true;
                  break;
          case 4953:
          case 4954: this.startControlsEnabled(true);
                     this.defaultConstrolsEnabled(true);
                     this.isStartSectionVisible = true;
                     this.isDefaultSectionsVisible = true;
                     break;
          case 2:
          case 952: this.rejectControlsEnabled(true);
                    this.defaultConstrolsEnabled(true);
                    this.isRejectSectionVisible = true;
                    this.isDefaultSectionsVisible = true;
                    break;
          case 4956:
          case 953: this.runbackConstrolsEnabled(true);
                    this.defaultConstrolsEnabled(true);
                    this.isRunbackSectionVisible = true;
                    this.isDefaultSectionsVisible = true;
                    break;
          case 4957:
          case 954: this.stopControlsEnabled(true);
                    this.defaultConstrolsEnabled(true);
                    this.isStopSectionVisible = true;
                    this.isDefaultSectionsVisible = true;
                    break;
          case 955: this.dieselControlsEnabled(true);
                    this.defaultConstrolsEnabled(true);
                    this.isDieselSectionVisible = true;
                    this.isDefaultSectionsVisible = true;
                    this.fuelTypesArr = [];
                    this.selectedFuelType = undefined;
                    this.fuelTypesArr.push(this.fuelTypesForSelect.find(x => x.name === 'DIESEL'));
                    break;
          case 4955: this.normalOperationControlsEnabled(true);
                     this.defaultConstrolsEnabled(true);
                     this.isNormalOperationSectionVisible = true;
                     this.isDefaultSectionsVisible = true;
                     this.fuelTypesArr = [];
                     this.selectedFuelType = undefined;
                     this.fuelTypesArr.push(this.fuelTypesForSelect.find(x => x.name === 'GAS'));
                     break;
          case 956: this.normalOperationControlsEnabled(true);
                    this.defaultConstrolsEnabled(true);
                    this.isNormalOperationSectionVisible = true;
                    this.isDefaultSectionsVisible = true;
                    this.fuelTypesArr = [];
                    this.selectedFuelType = undefined;
                    this.fuelTypesArr.push(this.fuelTypesForSelect.find(x => x.name === 'GAS'));
                    this.fuelTypesArr.push(this.fuelTypesForSelect.find(x => x.name === 'DIESEL'));
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
      this.shotControlsEnabled(false);
      this.startControlsEnabled(false);
      this.rejectControlsEnabled(false);
      this.stopControlsEnabled(false);
      this.runbackConstrolsEnabled(false);
      this.dieselControlsEnabled(false);
      this.normalOperationControlsEnabled(false);
      this.defaultConstrolsEnabled(false);
  }

  disableSections() {
      this.shotControlsEnabled(false);
      this.startControlsEnabled(false);
      this.rejectControlsEnabled(false);
      this.stopControlsEnabled(false);
      this.runbackConstrolsEnabled(false);
      this.dieselControlsEnabled(false);
      this.normalOperationControlsEnabled(false);
      this.defaultConstrolsEnabled(false);
  }

  regresar() {
    this.eventService.sendChangePage(new EventMessage(4, {} , 'Efh.Agregar eventos'));
  }

  onSubmit() {
      debugger;
      this.submittedData = true;
      if ((this.isShotSectionVisible && this.eventForm.controls['chargeShot'].invalid)
          || (this.isShotSectionVisible && this.eventForm.controls['flameOffDateShot'].invalid)
          || (this.isShotSectionVisible && this.eventForm.controls['flameOffTimeShot'].invalid)
          || (this.isStartSectionVisible && this.eventForm.controls['flameOffDateStart'].invalid)
          || (this.isStartSectionVisible && this.eventForm.controls['flameOffTimeStart'].invalid)
          || (this.isStartSectionVisible && this.eventForm.controls['fsnlDateStart'].invalid)
          || (this.isStartSectionVisible && this.eventForm.controls['fsnlTimeStart'].invalid)
          || (this.isRejectSectionVisible && this.eventForm.controls['chargeReject'].invalid)
          || (this.isRejectSectionVisible && this.eventForm.controls['dateReject'].invalid)
          || (this.isRejectSectionVisible && this.eventForm.controls['timeReject'].invalid)
          || (this.isRunbackSectionVisible && this.eventForm.controls['startDateRunback'].invalid)
          || (this.isRunbackSectionVisible && this.eventForm.controls['startTimeRunback'].invalid)
          || (this.isRunbackSectionVisible && this.eventForm.controls['endDateRunback'].invalid)
          || (this.isRunbackSectionVisible && this.eventForm.controls['endTimeRunback'].invalid)
          || (this.isRunbackSectionVisible && this.eventForm.controls['chargeBeforeRunback'].invalid)
          || (this.isRunbackSectionVisible && this.eventForm.controls['chargeAfterRunback'].invalid)
          || (this.isStopSectionVisible && this.eventForm.controls['flameOffDateStop'].invalid)
          || (this.isStopSectionVisible && this.eventForm.controls['flameOffTimeStop'].invalid)
          || (this.isStopSectionVisible && this.eventForm.controls['fsnlDateStop'].invalid)
          || (this.isStopSectionVisible && this.eventForm.controls['fsnlTimeStop'].invalid)
          || (this.isStopSectionVisible && this.eventForm.controls['chargeStop'].invalid)
          || (this.isDieselSectionVisible && this.eventForm.controls['startDateDiesel'].invalid)
          || (this.isDieselSectionVisible && this.eventForm.controls['startTimeDiesel'].invalid)
          || (this.isDieselSectionVisible && this.eventForm.controls['endDateDiesel'].invalid)
          || (this.isDieselSectionVisible && this.eventForm.controls['endTimeDiesel'].invalid)
          || (this.isNormalOperationSectionVisible && this.eventForm.controls['startDateNormal'].invalid)
          || (this.isNormalOperationSectionVisible && this.eventForm.controls['startTimeNormal'].invalid)
          || (this.isNormalOperationSectionVisible && this.eventForm.controls['endDateNormal'].invalid)
          || (this.isNormalOperationSectionVisible && this.eventForm.controls['endTimeNormal'].invalid)
          || this.eventForm.controls['description'].invalid
          // || this.observationsArr.length === 0
          || (this.selectedUnit === undefined || this.selectedUnit === null)
          || (this.isNormalOperationSectionVisible && (this.selectedFuelType === undefined || this.selectedFuelType === null)) ) {
          this.toastr.errorToastr('Todos los campos son obligatorios, verifique.', 'Lo siento,');
          return;
      }

      if (this.isRunbackSectionVisible
          && this.compareDate(this.datePipe.transform(new Date(this.eventForm.controls['startDateRunback'].value + ' ' + this.eventForm.controls['startTimeRunback'].value), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'),
              this.datePipe.transform(new Date(this.eventForm.controls['endDateRunback'].value + ' ' + this.eventForm.controls['endTimeRunback'].value), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'))) {
          this.toastr.errorToastr('Fecha-Hora Inicio debe ser menor a Fecha-Hora Fin, verifique', 'Lo siento,');
          this.runbackDatesValidation = true;
          return;
      }

      if (this.isStopSectionVisible
          && this.compareDate(this.datePipe.transform(new Date(this.eventForm.controls['flameOffDateStop'].value + ' ' + this.eventForm.controls['flameOffTimeStop'].value), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'),
              this.datePipe.transform(new Date(this.eventForm.controls['fsnlDateStop'].value + ' ' + this.eventForm.controls['fsnlTimeStop'].value), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'))) {
          this.toastr.errorToastr('Fecha-Hora FlameOff debe ser menor a Fecha-Hora Fsnl, verifique', 'Lo siento,');
          this.stopDatesValidation = true;
          return;
      }

      if (this.isDieselSectionVisible
          && this.compareDate(this.datePipe.transform(new Date(this.eventForm.controls['startDateDiesel'].value + ' ' + this.eventForm.controls['startTimeDiesel'].value), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'),
              this.datePipe.transform(new Date(this.eventForm.controls['endDateDiesel'].value + ' ' + this.eventForm.controls['endTimeDiesel'].value), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'))) {
          this.toastr.errorToastr('Fecha-Hora Inicio debe ser menor a Fecha-Hora Fin, verifique', 'Lo siento,');
          this.dieselDatesValidation = true;
          return;
      }

      if (this.isNormalOperationSectionVisible
          && this.compareDate(this.datePipe.transform(new Date(this.eventForm.controls['startDateNormal'].value + ' ' + this.eventForm.controls['startTimeNormal'].value), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'),
              this.datePipe.transform(new Date(this.eventForm.controls['endDateNormal'].value + ' ' + this.eventForm.controls['endTimeNormal'].value), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'))) {
          this.toastr.errorToastr('Fecha-Hora Inicio debe ser menor a Fecha-Hora Fin, verifique', 'Lo siento,');
          this.normalDatesValidation = true;
          return;
      }

      if (this.isStartSectionVisible
          && this.compareDate(this.datePipe.transform(new Date(this.eventForm.controls['flameOffDateStart'].value + ' ' + this.eventForm.controls['flameOffTimeStart'].value), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'),
              this.datePipe.transform(new Date(this.eventForm.controls['fsnlDateStart'].value + ' ' + this.eventForm.controls['fsnlTimeStart'].value), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'))) {
          this.toastr.errorToastr('Fecha-Hora FlameOff debe ser menor a Fecha-Hora Fsnl, verifique', 'Lo siento,');
          this.startDatesValidation = true;
          return;
      }

      if (this.accion === 'editar') {
          this.obtenerDatosConfiguracionEvento(false, this.eventType.id);
      } else {
          this.obtenerDatosConfiguracionEvento(false, 0);
      }
  }

  shotControlsEnabled(flag) {
      this.isShotControlsEnabled = flag;
      if (flag) {
          this.eventForm.controls.flameOffDateShot.enable();
          this.eventForm.controls.flameOffTimeShot.enable();
          this.eventForm.controls.chargeShot.enable();
      } else {
          this.eventForm.controls.flameOffDateShot.disable();
          this.eventForm.controls.flameOffTimeShot.disable();
          this.eventForm.controls.chargeShot.disable();
      }
  }

  startControlsEnabled(flag) {
       this.isStartControlsEnabled = flag;
       if (flag) {
          this.eventForm.controls.flameOffDateStart.enable();
          this.eventForm.controls.flameOffTimeStart.enable();
          this.eventForm.controls.fsnlDateStart.enable();
          this.eventForm.controls.fsnlTimeStart.enable();
       } else {
          this.eventForm.controls.flameOffDateStart.disable();
          this.eventForm.controls.flameOffTimeStart.disable();
          this.eventForm.controls.fsnlDateStart.disable();
          this.eventForm.controls.fsnlTimeStart.disable();
       }
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

  rejectControlsEnabled(flag) {
      this.isRejectControlsEnabled = flag;
      if (flag) {
          this.eventForm.controls.dateReject.enable();
          this.eventForm.controls.timeReject.enable();
          this.eventForm.controls.chargeReject.enable();
      } else {
          this.eventForm.controls.dateReject.disable();
          this.eventForm.controls.timeReject.disable();
          this.eventForm.controls.chargeReject.disable();
      }
  }

  runbackConstrolsEnabled(flag) {
      this.isRunbackControlsEnabled = flag;
      if (flag) {
          this.eventForm.controls.startDateRunback.enable();
          this.eventForm.controls.startTimeRunback.enable();
          this.eventForm.controls.endDateRunback.enable();
          this.eventForm.controls.endTimeRunback.enable();
          this.eventForm.controls.chargeBeforeRunback.enable();
          this.eventForm.controls.chargeAfterRunback.enable();
      } else {
          this.eventForm.controls.startDateRunback.disable();
          this.eventForm.controls.startTimeRunback.disable();
          this.eventForm.controls.endDateRunback.disable();
          this.eventForm.controls.endTimeRunback.disable();
          this.eventForm.controls.chargeBeforeRunback.disable();
          this.eventForm.controls.chargeAfterRunback.disable();
      }
  }

  stopControlsEnabled(flag) {
      this.isStopControlsEnabled = flag;
      if (flag) {
          this.eventForm.controls.flameOffDateStop.enable();
          this.eventForm.controls.flameOffTimeStop.enable();
          this.eventForm.controls.fsnlDateStop.enable();
          this.eventForm.controls.fsnlTimeStop.enable();
          this.eventForm.controls.chargeStop.enable();
      } else {
          this.eventForm.controls.flameOffDateStop.disable();
          this.eventForm.controls.flameOffTimeStop.disable();
          this.eventForm.controls.fsnlDateStop.disable();
          this.eventForm.controls.fsnlTimeStop.disable();
          this.eventForm.controls.chargeStop.disable();
      }
  }

  dieselControlsEnabled(flag) {
      this.isDieselControlsEnabled = flag;
      if (flag) {
          this.eventForm.controls.startDateDiesel.enable();
          this.eventForm.controls.startTimeDiesel.enable();
          this.eventForm.controls.endDateDiesel.enable();
          this.eventForm.controls.endTimeDiesel.enable();
      } else {
          this.eventForm.controls.startDateDiesel.disable();
          this.eventForm.controls.startTimeDiesel.disable();
          this.eventForm.controls.endDateDiesel.disable();
          this.eventForm.controls.endTimeDiesel.disable();
      }
  }

  normalOperationControlsEnabled(flag) {
      this.isNormalOperationControlsEnabled = flag;
      if (flag) {
          this.eventForm.controls.startDateNormal.enable();
          this.eventForm.controls.startTimeNormal.enable();
          this.eventForm.controls.endDateNormal.enable();
          this.eventForm.controls.endTimeNormal.enable();
      } else {
          this.eventForm.controls.startDateNormal.disable();
          this.eventForm.controls.startTimeNormal.disable();
          this.eventForm.controls.endDateNormal.disable();
          this.eventForm.controls.endTimeNormal.disable();
      }
  }

  defaultConstrolsEnabled(flag) {
      this.isDefaultControlsEnabled = flag;
      if (flag) {
          this.eventForm.controls.description.enable();
          // this.eventForm.controls.observations.enable();
      } else {
          this.eventForm.controls.description.disable();
          // this.eventForm.controls.observations.disable();
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
      this.disabledSave = false;
      this.isAddObvsDisabled = false;
  }
/*
  getObservations(idEventConfig: number) {
      this.efhService.getObservations(idEventConfig).subscribe(
          data => {
              this.resultService = data;
              for (const element of this.resultService) {
                  this.observationsArr.push(new Comment(element.id, '', 'tester', element.observation, new Date(element.dateobservation), true, true));
              }
          }
      );
  }

  addObservation() {
      const obser = this.eventForm.controls.observations.value;
      if (obser === null || obser === '') {
          this.toastr.errorToastr('No se puede agregar una observación vacía', 'Lo siento,');
      } else {
          this.eventForm.controls.observations.setValue('');
          this.observationsArr.push(new Comment('1', '', 'tester', obser, new Date(), true, false));
          this.isAddObvsDisabled = true;
      }
  }
*/
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
