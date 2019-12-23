import {Component, Input, OnInit            } from '@angular/core';
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
  eventTypesArrForSelect = [];
  unitsArr = [];
  fuelTypesArr = [];
  dataSubmit = {};
  dataObservationSumbit = {};
  checkedEstatus = false;
  deshabiliarEstatus = false;
  checkedEditClonated = true;
  headObservaciones = ['#', 'Nombre', 'Observaciones', 'Fecha de ultima modificación'];
  observationsArr: Array<any>;
  isAddObvsDisabled = false;

  isShotSectionVisible = false;
  isRejectSectionVisible = false;
  isRunbackSectionVisible = false;
  isStopSectionVisible = false;
  isDieselSectionVisible = false;
  isDefaultSectionsVisible = false;
  isNormalOperationSectionVisible = false;

  optionsSelectEnabled = true;

  isShotControlsEnabled = true;
  isRejectControlsEnabled = true;
  isRunbackControlsEnabled = true;
  isStopControlsEnabled = true;
  isDieselControlsEnabled = true;
  isNormalOperationControlsEnabled = true;

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
  selectedFuelType

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
      this.submittedData = false;
      this.eventForm = this.formBuilder.group({
          eventTypeControl: [null, null],
          unitControl: [ null, null],
          fuelTypeControl: [ null, null],
          flameOffDateShot: ['', Validators.required],
          flameOffTimeShot: ['', Validators.required],
          fsnlDateShot: ['', Validators.required],
          fsnlTimeShot: ['', Validators.required],
          chargeShot: ['', Validators.required],
          dateReject: ['', Validators.required],
          timeReject: ['', Validators.required],
          chargeReject: ['', Validators.required],
          startDateRunback: ['', Validators.required],
          startTimeRunback: ['', Validators.required],
          endDateRunback: ['', Validators.required],
          endTimeRunback: ['', Validators.required],
          chargeBeforeRunback: ['', Validators.required],
          chargeAfterRunback: ['', Validators.required],
          flameOffDateStop: ['', Validators.required],
          flameOffTimeStop: ['', Validators.required],
          fsnlDateStop: ['', Validators.required],
          fsnlTimeStop: ['', Validators.required],
          chargeStop: ['', Validators.required],
          startDateDiesel: ['', Validators.required],
          startTimeDiesel: ['', Validators.required],
          endDateDiesel: ['', Validators.required],
          endTimeDiesel: ['', Validators.required],
          startDateNormal: ['', Validators.required],
          startTimeNormal: ['', Validators.required],
          endDateNormal: ['', Validators.required],
          endTimeNormal: ['', Validators.required],
          description: ['', Validators.required],
          observations: [{ value: '', disabled: this.isAddObvsDisabled }, Validators.required]
      });
      this.selectControlsEnabled(false);
      this.shotControlsEnabled(false);
      this.rejectControlsEnabled(false);
      this.runbackConstrolsEnabled(false);
      this.stopControlsEnabled(false);
      this.dieselControlsEnabled(false);
      this.normalOperationControlsEnabled(false);
      this.defaultConstrolsEnabled(false);
      this.getCatalogs();

      this.selectedEventType = undefined;
      this.selectedUnit = undefined;
      this.selectedFuelType = undefined;

      this.accion = this.eventType.action;
      this.seccion = this.eventType.section;

      if (this.accion === 'editar') {
          this.eventForm.controls.eventTypeControl.disable();
          this.selectControlsEnabled(true);
          this.deshabiliarEstatus = false;
          this.disabledSave = true;
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
              case 'DIESEL': this.dieselControlsEnabled(this.accion === 'ver' ? false : true);
                             this.defaultConstrolsEnabled(this.accion === 'ver' ? false : true);
                             this.isDieselSectionVisible = true;
                             this.isDefaultSectionsVisible = true;
                             break;
              case 'OPERACIÓN NORMAL': this.normalOperationControlsEnabled(this.accion === 'ver' ? false : true);
                                       this.defaultConstrolsEnabled(this.accion === 'ver' ? false : true);
                                       this.isNormalOperationSectionVisible = true;
                                       this.isDefaultSectionsVisible = true;
                                       break;
          }
          this.obtenerDatosConfiguracionEvento(true, this.eventType.id);
      }
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

                              debugger;
                              this.getObservations(this.eventType.id);

                              switch (element.idtypeevent) {
                                  case 1: this.flameOffDate = this.datePipe.transform(this.getTimeLocale(element.dateinit) , 'yyyy-MM-dd');
                                      this.flameOffTime = this.datePipe.transform(this.getTimeLocale(element.dateinit) , 'HH:mm:ss');
                                      this.fsnlDate = this.datePipe.transform(this.getTimeLocale(element.dateend) , 'yyyy-MM-dd');
                                      this.fsnlTime = this.datePipe.transform(this.getTimeLocale(element.dateend) , 'HH:mm:ss');
                                      this.eventForm.controls['flameOffDateShot'].setValue(this.flameOffDate)
                                      this.eventForm.controls['flameOffTimeShot'].setValue(this.flameOffTime);
                                      this.eventForm.controls['fsnlDateShot'].setValue(this.fsnlDate);
                                      this.eventForm.controls['fsnlTimeShot'].setValue(this.fsnlTime);
                                      this.eventForm.controls['chargeShot'].setValue(element.chargebeforeshot);
                                      break;
                                  case 952: this.rejectDate = this.datePipe.transform(this.getTimeLocale(element.dateinit) , 'yyyy-MM-dd');
                                      this.rejectTime = this.datePipe.transform(this.getTimeLocale(element.dateinit) , 'HH:mm:ss');
                                      this.eventForm.controls['dateReject'].setValue(this.rejectDate);
                                      this.eventForm.controls['timeReject'].setValue(this.rejectTime);
                                      this.eventForm.controls['chargeReject'].setValue(element.chargebeforereject);
                                      break;
                                  case 953: this.startDate = this.datePipe.transform(this.getTimeLocale(element.dateinit) , 'yyyy-MM-dd');
                                      this.startTime = this.datePipe.transform(this.getTimeLocale(element.dateinit) , 'HH:mm:ss');
                                      this.endDate = this.datePipe.transform(this.getTimeLocale(element.dateend) , 'yyyy-MM-dd');
                                      this.endTime = this.datePipe.transform(this.getTimeLocale(element.dateend) , 'HH:mm:ss');
                                      this.eventForm.controls['startDateRunback'].setValue(this.startDate);
                                      this.eventForm.controls['startTimeRunback'].setValue(this.startTime);
                                      this.eventForm.controls['endDateRunback'].setValue(this.endDate);
                                      this.eventForm.controls['endTimeRunback'].setValue(this.endTime);
                                      this.eventForm.controls['chargeBeforeRunback'].setValue(element.chargebeforerunback);
                                      this.eventForm.controls['chargeAfterRunback'].setValue(element.chargeafterrunback);
                                      break;
                                  case 954: this.flameOffDate = this.datePipe.transform(this.getTimeLocale(element.dateinit) , 'yyyy-MM-dd');
                                      this.flameOffTime = this.datePipe.transform(this.getTimeLocale(element.dateinit) , 'HH:mm:ss');
                                      this.fsnlDate = this.datePipe.transform(this.getTimeLocale(element.dateend) , 'yyyy-MM-dd');
                                      this.fsnlTime = this.datePipe.transform(this.getTimeLocale(element.dateend) , 'HH:mm:ss');
                                      this.eventForm.controls['flameOffDateStop'].setValue(this.flameOffDate);
                                      this.eventForm.controls['flameOffTimeStop'].setValue(this.flameOffTime);
                                      this.eventForm.controls['fsnlDateStop'].setValue(this.fsnlDate);
                                      this.eventForm.controls['fsnlTimeStop'].setValue(this.fsnlTime);
                                      this.eventForm.controls['chargeStop'].setValue(element.chargebeforestop);
                                      break;
                                  case 955: this.startDate = this.datePipe.transform(this.getTimeLocale(element.dateinit) , 'yyyy-MM-dd');
                                      this.startTime = this.datePipe.transform(this.getTimeLocale(element.dateinit) , 'HH:mm:ss');
                                      this.endDate = this.datePipe.transform(this.getTimeLocale(element.dateend) , 'yyyy-MM-dd');
                                      this.endTime = this.datePipe.transform(this.getTimeLocale(element.dateend) , 'HH:mm:ss');
                                      this.eventForm.controls['startDateDiesel'].setValue(this.startDate);
                                      this.eventForm.controls['startTimeDiesel'].setValue(this.startTime);
                                      this.eventForm.controls['endDateDiesel'].setValue(this.endDate);
                                      this.eventForm.controls['endTimeDiesel'].setValue(this.endTime);
                                      break;
                                  case 956: this.startDate = this.datePipe.transform(this.getTimeLocale(element.dateinit) , 'yyyy-MM-dd');
                                      this.startTime = this.datePipe.transform(this.getTimeLocale(element.dateinit) , 'HH:mm:ss');
                                      this.endDate = this.datePipe.transform(this.getTimeLocale(element.dateend) , 'yyyy-MM-dd');
                                      this.endTime = this.datePipe.transform(this.getTimeLocale(element.dateend) , 'HH:mm:ss');
                                      this.eventForm.controls['startDateNormal'].setValue(this.startDate);
                                      this.eventForm.controls['startTimeNormal'].setValue(this.startTime);
                                      this.eventForm.controls['endDateNormal'].setValue(this.endDate);
                                      this.eventForm.controls['endTimeNormal'].setValue(this.endTime);
                                      break;
                              }
                              this.eventForm.controls['description'].setValue(element.description);
                              this.eventForm.controls['observations'].setValue(element.observations);
                              this.checkedEstatus = element.active;
                          }
                      }

                      if (!putData) {

                          debugger;
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
                          this.dataSubmit['observations'] = this.eventForm.controls['observations'].value;

                          switch (this.dataSubmit['idtypeevent']) {
                              case 1: this.flameOffDate = this.eventForm.controls['flameOffDateShot'].value;
                                  this.flameOffTime = this.eventForm.controls['flameOffTimeShot'].value;
                                  this.fsnlDate = this.eventForm.controls['fsnlDateShot'].value;
                                  this.fsnlTime = this.eventForm.controls['fsnlTimeShot'].value;
                                  this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.flameOffDate + 'T' + this.flameOffTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                                  this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.fsnlDate + 'T' + this.fsnlTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                                  this.dataSubmit['chargebeforeshot'] = this.eventForm.controls['chargeShot'].value;
                                  break;
                              case 952: this.rejectDate = this.eventForm.controls['dateReject'].value;
                                  this.rejectTime = this.eventForm.controls['timeReject'].value;
                                  this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.rejectDate + 'T' + this.rejectTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                                  this.dataSubmit['dateend'] = this.dataSubmit['dateinit'];
                                  this.dataSubmit['chargebeforereject'] = this.eventForm.controls['chargeReject'].value;
                                  break;
                              case 953: this.startDate = this.eventForm.controls['startDateRunback'].value;
                                  this.startTime = this.eventForm.controls['startTimeRunback'].value;
                                  this.endDate = this.eventForm.controls['endDateRunback'].value;
                                  this.endTime = this.eventForm.controls['endTimeRunback'].value;
                                  this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.startDate + 'T' + this.startTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                                  this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.endDate + 'T' + this.endTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                                  this.dataSubmit['chargebeforerunback'] = this.eventForm.controls['chargeBeforeRunback'].value;
                                  this.dataSubmit['chargeafterrunback'] = this.eventForm.controls['chargeAfterRunback'].value;
                                  break;
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
                              case 956: this.startDate = this.eventForm.controls['startDateNormal'].value;
                                  this.startTime = this.eventForm.controls['startTimeNormal'].value;
                                  this.endDate = this.eventForm.controls['endDateNormal'].value;
                                  this.endTime = this.eventForm.controls['endTimeNormal'].value;
                                  this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.startDate + 'T' + this.startTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                                  this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.endDate + 'T' + this.endTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                                  break;
                          }

                          this.dataSubmit['active'] = this.checkedEstatus;
                          this.dataSubmit['id'] = this.eventType.id;
                          this.dataSubmit['order'] = this.eventType.id;
                          this.dataSubmit['save'] = false;

                          this.efhService.setEvent(this.dataSubmit)
                              .subscribe(
                                  dataBack => {
                                      debugger;
                                      if (this.accion === 'nuevo') {
                                          this.toastr.successToastr('El evento fue creada con éxito.', '¡Se ha logrado!');
                                      }
                                      if (this.accion === 'editar') {
                                          this.toastr.successToastr('El evento fue actualizado con éxito.', '¡Se ha logrado!');
                                      }
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
                                      }
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
           this.dataSubmit['idtypefuel'] = this.eventForm.controls['fuelTypeControl'].value;
           this.dataSubmit['idunit'] = this.eventForm.controls['unitControl'].value;
           this.dataSubmit['description'] = this.eventForm.controls['description'].value;
           this.dataSubmit['active'] = this.checkedEstatus;

           if (this.isShotSectionVisible) {
              this.flameOffDate = this.eventForm.controls['flameOffDateShot'].value;
              this.flameOffTime = this.eventForm.controls['flameOffTimeShot'].value;
              this.fsnlDate = this.eventForm.controls['fsnlDateShot'].value;
              this.fsnlTime = this.eventForm.controls['fsnlTimeShot'].value;
              this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.flameOffDate + ' ' + this.flameOffTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
              this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.fsnlDate + ' ' + this.fsnlTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
              this.dataSubmit['chargebeforeshot'] = parseFloat(this.eventForm.controls['chargeShot'].value);

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
          }

           if (this.accion === 'nuevo') {
              this.dataSubmit['save'] = true;
          }

           this.efhService.setEvent(this.dataSubmit)
              .subscribe(
                  dataBack => {
                      debugger;
                      if (this.accion === 'nuevo') {
                          this.toastr.successToastr('El evento fue creada con éxito.', '¡Se ha logrado!');
                      }
                      if (this.accion === 'editar') {
                          this.toastr.successToastr('El evento fue actualizado con éxito.', '¡Se ha logrado!');
                      }
                      const idEvent = dataBack['code'];
                      for (const comment of this.observationsArr) {
                          this.dataObservationSumbit['ideventconfig'] = idEvent;
                          this.dataObservationSumbit['observation'] = comment.observacion;
                          this.dataObservationSumbit['dateobservation'] = comment.fecha_modificacion;
                          this.efhService.saveObservation(this.dataSubmit).subscribe(
                              data => {
                                  debugger;
                                  const response = 'exito';
                              },
                              error => {
                                  debugger;
                                  this.toastr.errorToastr(Constants.ERROR_SAVE, 'Lo siento,');
                              }
                          );
                      }
                  },
                  errorData => {
                      this.toastr.errorToastr(Constants.ERROR_SAVE, 'Lo siento,');
                  }
              );
      }
  }

  getCatalogs() {
    this.catalogoMaestroService.getCatalogoIndividual('typeEvent')
        .subscribe(
            data => {
              this.resultService = data;
              let i = 0;
              for (const element of this.resultService) {
                if (element.active === true && element.code !== 'VACÍO') {
                  i += 1;
                  const obj            = {};
                  // @ts-ignore
                  obj.order       = i;
                  // @ts-ignore
                  obj.id          = element.id;
                  // @ts-ignore
                  obj.name        = element.code;
                  // @ts-ignore
                  obj.description = element.description;
                  /*if (element.code !== 'OPERACIÓN CON DIESEL' && this.globalService.aguila) {
                    this.eventTypesArrForSelect.push(obj);
                  }*/
                  this.eventTypesArr.push(obj);
                }
              }
            },
            errorData => {
              this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
            }
        );

    this.catalogoMaestroService.getCatalogoIndividual('typeFuel')
        .subscribe(
            data => {
              this.resultService = data;
              let i = 0;
              for (const element of this.resultService) {
                if (element.active === true) {
                  i += 1;
                  const obj            = {};
                  // @ts-ignore
                  obj.order       = i;
                  // @ts-ignore
                  obj.id          = element.id;
                  // @ts-ignore
                  obj.name        = element.code;
                  // @ts-ignore
                  obj.description = element.description;
                  this.fuelTypesArr.push(obj);
                }
              }
            },
            errorData => {
              this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
            }
        );

    this.catalogoMaestroService.getCatalogoIndividual('unit')
        .subscribe(
            data => {
              this.resultService = data;
              let i = 0;
              for (const element of this.resultService) {
                if (element.active === true) {
                  i += 1;
                  const obj            = {};
                  // @ts-ignore
                  obj.order       = i;
                  // @ts-ignore
                  obj.id          = element.id;
                  // @ts-ignore
                  obj.name        = element.code;
                  // @ts-ignore
                  obj.description = element.description;
                  this.unitsArr.push(obj);
                }
              }
            },
            errorData => {
              this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
            }
        );
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

  enableControls(selected) {
      this.selectControlsEnabled(true);
      this.resetSections();
      // console.log(selected.value.id + ' | ' + selected.value.name)
      switch (selected.value) {
          case 1: this.shotControlsEnabled(true);
                  this.defaultConstrolsEnabled(true);
                  this.isShotSectionVisible = true;
                  this.isDefaultSectionsVisible = true;
                  break;
          case 952: this.rejectControlsEnabled(true);
                    this.defaultConstrolsEnabled(true);
                    this.isRejectSectionVisible = true;
                    this.isDefaultSectionsVisible = true;
                    break;
          case 953: this.runbackConstrolsEnabled(true);
                    this.defaultConstrolsEnabled(true);
                    this.isRunbackSectionVisible = true;
                    this.isDefaultSectionsVisible = true;
                    break;
          case 954: this.stopControlsEnabled(true);
                    this.defaultConstrolsEnabled(true);
                    this.isStopSectionVisible = true;
                    this.isDefaultSectionsVisible = true;
                    break;
          case 955: this.dieselControlsEnabled(true);
                    this.defaultConstrolsEnabled(true);
                    this.isDieselSectionVisible = true;
                    this.isDefaultSectionsVisible = true;
                    break;
          case 956: this.normalOperationControlsEnabled(true);
                    this.defaultConstrolsEnabled(true);
                    this.isNormalOperationSectionVisible = true;
                    this.isDefaultSectionsVisible = true;
                    break;
      }

  }

  resetSections() {
      this.isShotSectionVisible = false;
      this.isRejectSectionVisible = false;
      this.isRunbackSectionVisible = false;
      this.isStopSectionVisible = false;
      this.isDieselSectionVisible = false;
      this.isNormalOperationSectionVisible = false;
      this.isDefaultSectionsVisible = false;
      this.shotControlsEnabled(false);
      this.rejectControlsEnabled(false);
      this.stopControlsEnabled(false);
      this.runbackConstrolsEnabled(false);
      this.dieselControlsEnabled(false);
      this.normalOperationControlsEnabled(false);
      this.defaultConstrolsEnabled(false);
  }

  disableSections() {
      this.shotControlsEnabled(false);
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
      this.submittedData = true;
      if ((this.isShotSectionVisible && this.eventForm.controls['chargeShot'].invalid)
          || (this.isShotSectionVisible && this.eventForm.controls['flameOffDateShot'].invalid)
          || (this.isShotSectionVisible && this.eventForm.controls['flameOffTimeShot'].invalid)
          || (this.isShotSectionVisible && this.eventForm.controls['fsnlDateShot'].invalid)
          || (this.isShotSectionVisible && this.eventForm.controls['fsnlTimeShot'].invalid)
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
          || this.eventForm.controls['observations'].invalid) {
          this.toastr.errorToastr('Todos los campos son obligatorios, verifique.', 'Lo siento,');
          return;
      }

      if (this.isShotSectionVisible
          && this.compareDate(this.datePipe.transform(new Date(this.eventForm.controls['flameOffDateShot'].value + ' ' + this.eventForm.controls['flameOffTimeShot'].value), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'),
              this.datePipe.transform(new Date(this.eventForm.controls['fsnlDateShot'].value + ' ' + this.eventForm.controls['fsnlTimeShot'].value), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'))) {
          this.toastr.errorToastr('Fecha-Hora FlameOff debe ser menor a Fecha-Hora Fsnl, verifique', 'Lo siento,');
          return;
      }

      if (this.isRunbackSectionVisible
          && this.compareDate(this.datePipe.transform(new Date(this.eventForm.controls['startDateRunback'].value + ' ' + this.eventForm.controls['startTimeRunback'].value), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'),
              this.datePipe.transform(new Date(this.eventForm.controls['endDateRunback'].value + ' ' + this.eventForm.controls['endTimeRunback'].value), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'))) {
          this.toastr.errorToastr('Fecha-Hora Inicio debe ser menor a Fecha-Hora Fin, verifique', 'Lo siento,');
          return;
      }

      if (this.isStopSectionVisible
          && this.compareDate(this.datePipe.transform(new Date(this.eventForm.controls['flameOffDateStop'].value + ' ' + this.eventForm.controls['flameOffTimeStop'].value), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'),
              this.datePipe.transform(new Date(this.eventForm.controls['fsnlDateStop'].value + ' ' + this.eventForm.controls['fsnlTimeStop'].value), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'))) {
          this.toastr.errorToastr('Fecha-Hora FlameOff debe ser menor a Fecha-Hora Fsnl, verifique', 'Lo siento,');
          return;
      }

      if (this.isDieselSectionVisible
          && this.compareDate(this.datePipe.transform(new Date(this.eventForm.controls['startDateDiesel'].value + ' ' + this.eventForm.controls['startTimeDiesel'].value), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'),
              this.datePipe.transform(new Date(this.eventForm.controls['endDateDiesel'].value + ' ' + this.eventForm.controls['endTimeDiesel'].value), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'))) {
          this.toastr.errorToastr('Fecha-Hora Inicio debe ser menor a Fecha-Hora Fin, verifique', 'Lo siento,');
          return;
      }

      if (this.isNormalOperationSectionVisible
          && this.compareDate(this.datePipe.transform(new Date(this.eventForm.controls['startDateNormal'].value + ' ' + this.eventForm.controls['startTimeNormal'].value), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'),
              this.datePipe.transform(new Date(this.eventForm.controls['endDateNormal'].value + ' ' + this.eventForm.controls['endTimeNormal'].value), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'))) {
          this.toastr.errorToastr('Fecha-Hora Inicio debe ser menor a Fecha-Hora Fin, verifique', 'Lo siento,');
          return;
      }

      debugger;

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
          this.eventForm.controls.fsnlDateShot.enable();
          this.eventForm.controls.fsnlTimeShot.enable();
          this.eventForm.controls.chargeShot.enable();
      } else {
          this.eventForm.controls.flameOffDateShot.disable();
          this.eventForm.controls.flameOffTimeShot.disable();
          this.eventForm.controls.fsnlDateShot.disable();
          this.eventForm.controls.fsnlTimeShot.disable();
          this.eventForm.controls.chargeShot.disable();
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
          this.eventForm.controls.observations.enable();
      } else {
          this.eventForm.controls.description.disable();
          this.eventForm.controls.observations.disable();
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

      if (same) { return false; }

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
  }

  resuelveDS(comenta) {
      this.observationsArr.push(
            new Comment(comenta.idUsr, comenta.nombre, comenta.observacion, comenta.fecha_modificacion, true));
  }

  getObservations(idEventConfig: number) {
      this.efhService.getObservations(idEventConfig).subscribe(
          data => {
              debugger;
              this.resultService = data;
              let i = 0;
              for (const element of this.resultService) {
                  this.observationsArr.push(new Comment(element.id, 'tester', element.observation, new Date(element.dateobservation), true));
              }
          }
      );
  }

  addObservation() {
      const obser = this.eventForm.controls.observations.value;
      this.eventForm.controls.observations.setValue('');
      this.observationsArr.push(new Comment('1', 'tester', obser, new Date(), false));
  }

  /*
  saveObservation(idEventConfig: number) {
      const obser = this.eventForm.controls.observations.value;
      this.efhService.saveObservation(idEventConfig, obser).subscribe(
          comenta => {
              this.observationsArr.push(new Comentario(comenta.idUsr, comenta.nombre, comenta.observacion, comenta.fecha_modificacion));
          }
      );
  }*/

}
