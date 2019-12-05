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
  dataSubmit = {};
  checkedEstatus = false;
  deshabiliarEstatus = false;
  checkedEditClonated = true;

  isShotSectionVisible = true;
  isRejectSectionVisible = true;
  isRunbackSectionVisible = true;
  isStopSectionVisible = true;
  isDieselSectionVisible = false;

  optionsSelectEnabled = true;

  isShotControlsEnabled = true;
  isRejectControlsEnabled = true;
  isRunbackControlsEnabled = true;
  isStopControlsEnabled = true;
  isDieselControlsEnabled = true;

  isDefaultControlsEnabled = true;
  disabledSave = false;
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

  ngOnInit() {
      this.submittedData = false;
      this.eventForm = this.formBuilder.group({
          eventTypeControl: [null, null],
          unitControl: [ null, null],
          fuelTypeControl: [ null, null],
          flameOffDateShot: [null, null],
          flameOffTimeShot: [null, null],
          fsnlDateShot: [null, null],
          fsnlTimeShot: [null, null],
          chargeShot: [null , null],
          dateReject: [null, null],
          timeReject: [null, null],
          chargeReject: [null, null],
          startDateRunback: [null, null],
          startTimeRunback: [null, null],
          endDateRunback: [null, null],
          endTimeRunback: [null, null],
          chargeBeforeRunback: [null, null],
          chargeAfterRunback: [null, null],
          flameOffDateStop: [null, null],
          flameOffTimeStop: [null, null],
          fsnlDateStop: [null, null],
          fsnlTimeStop: [null, null],
          chargeStop: [null, null],
          startDateDiesel: [null, null],
          startTimeDiesel: [null, null],
          endDateDiesel: [null, null],
          endTimeDiesel: [null, null],
          description: [null, null],
          observations: [null, null]
      });
      this.selectControlsEnabled(false);
      this.shotControlsEnabled(false);
      this.rejectControlsEnabled(false);
      this.runbackConstrolsEnabled(false);
      this.stopControlsEnabled(false);
      this.dieselControlsEnabled(false);
      this.defaultConstrolsEnabled(false);
      this.getCatalogs();

      this.accion = this.eventType.action;
      this.seccion = this.eventType.section;

      if (this.accion === 'editar') {
          this.deshabiliarEstatus = false;
          this.disabledSave = true;
          this.titulo = 'Editar / Configuración de Eventos';
      } else if (this.accion === 'ver') {
          this.deshabiliarEstatus = true;
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
                              break;
              case 'RECHAZO': this.rejectControlsEnabled(this.accion === 'ver' ? false : true);
                              this.defaultConstrolsEnabled(this.accion === 'ver' ? false : true);
                              this.isRejectSectionVisible = true;
                              break;
              case 'RUNBACK': this.runbackConstrolsEnabled(this.accion === 'ver' ? false : true);
                              this.defaultConstrolsEnabled(this.accion === 'ver' ? false : true);
                              this.isRunbackSectionVisible = true;
                              break;
              case 'PARO': this.stopControlsEnabled(this.accion === 'ver' ? false : true);
                           this.defaultConstrolsEnabled(this.accion === 'ver' ? false : true);
                           this.isStopSectionVisible = true;
                           break;
              case 'DIESEL': this.dieselControlsEnabled(this.accion === 'ver' ? false : true);
                             this.defaultConstrolsEnabled(this.accion === 'ver' ? false : true);
                             this.isDieselSectionVisible = true;
                             break;
          }
          this.obtenerDatosConfiguracionEvento(true, this.eventType.id);
      }
  }

  obtenerDatosConfiguracionEvento(putData, id) {
      // if (id !== 0) {
          this.efhService.getEvent(id)
              .subscribe(
                  dataBack => {
                      this.result = dataBack;
                      for (let element of this.result) {
                          if (this.eventType.id === element.id && putData) {
                              switch (element.idtypeevent) {
                                  case 1: this.flameOffDate = this.datePipe.transform(new Date(element.dateinit) , 'dd/MM/yyyy');
                                      this.flameOffTime = this.datePipe.transform(new Date(element.dateinit) , 'HH:mm:ss');
                                      this.fsnlDate = this.datePipe.transform(new Date(element.datefsnl) , 'dd/MM/yyyy');
                                      this.fsnlTime = this.datePipe.transform(new Date(element.datefsnl) , 'HH:mm:ss');
                                      this.eventForm.controls['flameOffDateShot'].setValue(this.flameOffDate);
                                      this.eventForm.controls['flameOffTimeShot'].setValue(this.flameOffTime);
                                      this.eventForm.controls['fsnlDateShot'].setValue(this.fsnlDate);
                                      this.eventForm.controls['fsnlTimeShot'].setValue(this.fsnlTime);
                                      this.eventForm.controls['chargeShot'].setValue(element.chargebeforeshot);
                                      break;
                                  case 952: this.rejectDate = this.datePipe.transform(new Date(element.dateinit) , 'dd/MM/yyyy');
                                      this.rejectTime = this.datePipe.transform(new Date(element.dateinit) , 'HH:mm:ss');
                                      this.eventForm.controls['dateReject'].setValue(this.rejectDate);
                                      this.eventForm.controls['timeReject'].setValue(this.rejectTime);
                                      this.eventForm.controls['chargeReject'].setValue(element.chargebeforereject);
                                      break;
                                  case 953: this.startDate = this.datePipe.transform(new Date(element.dateinit) , 'dd/MM/yyyy');
                                      this.startTime = this.datePipe.transform(new Date(element.dateinit) , 'HH:mm:ss');
                                      this.endDate = this.datePipe.transform(new Date(element.dateend) , 'dd/MM/yyyy');
                                      this.endTime = this.datePipe.transform(new Date(element.dateend) , 'HH:mm:ss');
                                      this.eventForm.controls['startDateRunback'].setValue(this.startDate);
                                      this.eventForm.controls['startTimeRunback'].setValue(this.startTime);
                                      this.eventForm.controls['endDateRunback'].setValue(this.endDate);
                                      this.eventForm.controls['endTimeRunback'].setValue(this.endTime);
                                      this.eventForm.controls['chargeBeforeRunback'].setValue(element.chargebeforerunback);
                                      this.eventForm.controls['chargeAfterRunback'].setValue(element.chargeafterrunback);
                                      break;
                                  case 954: this.flameOffDate = this.datePipe.transform(new Date(element.dateinit) , 'dd/MM/yyyy');
                                      this.flameOffTime = this.datePipe.transform(new Date(element.dateinit) , 'HH:mm:ss');
                                      this.fsnlDate = this.datePipe.transform(new Date(element.datefsnl) , 'dd/MM/yyyy');
                                      this.fsnlTime = this.datePipe.transform(new Date(element.datefsnl) , 'HH:mm:ss');
                                      this.eventForm.controls['flameOffDateStop'].setValue(this.flameOffDate);
                                      this.eventForm.controls['flameOffTimeStop'].setValue(this.flameOffTime);
                                      this.eventForm.controls['fsnlDateStop'].setValue(this.fsnlDate);
                                      this.eventForm.controls['fsnlTimeStop'].setValue(this.fsnlTime);
                                      this.eventForm.controls['chargeStop'].setValue(element.chargebeforestop);
                                      break;
                                  case 955: this.startDate = this.datePipe.transform(new Date(element.dateinit) , 'dd/MM/yyyy');
                                      this.startTime = this.datePipe.transform(new Date(element.dateinit) , 'HH:mm:ss');
                                      this.endDate = this.datePipe.transform(new Date(element.dateend) , 'dd/MM/yyyy');
                                      this.endTime = this.datePipe.transform(new Date(element.dateend) , 'HH:mm:ss');
                                      this.eventForm.controls['startDateDiesel'].setValue(this.startDate);
                                      this.eventForm.controls['startTimeDiesel'].setValue(this.startTime);
                                      this.eventForm.controls['endDateDiesel'].setValue(this.endDate);
                                      this.eventForm.controls['endTimeDiesel'].setValue(this.endTime);
                                      break;
                              }
                              this.eventForm.controls['description'].setValue(element.description);
                              this.eventForm.controls['observations'].setValue(element.observations);
                              this.checkedEstatus = element.active;
                          }
                      }

                      this.dataSubmit['idtypeevent'] = this.eventForm.controls['idtypeevent'].value;
                      this.dataSubmit['idtypefuel'] = this.eventForm.controls['idtypefuel'].value;
                      this.dataSubmit['idunit'] = this.eventForm.controls['idunit'].value;
                      this.dataSubmit['description'] = this.eventForm.controls['description'].value;
                      this.dataSubmit['observations'] = this.eventForm.controls['observations'].value;

                      switch (this.eventForm.controls['idtypeevent'].value) {
                          case 1: this.flameOffDate = this.eventForm.controls['flameOffDateShot'].value;
                              this.flameOffTime = this.eventForm.controls['flameOffTimeShot'].value;
                              this.fsnlDate = this.eventForm.controls['fsnlDateShot'].value;
                              this.fsnlTime = this.eventForm.controls['fsnlTimeShot'].value;
                              this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.flameOffDate + 'T' + this.flameOffTime), 'ddMMyyyyHHmmssSSS');
                              this.dataSubmit['datefsnl'] = this.datePipe.transform(new Date(this.fsnlDate + 'T' + this.fsnlTime), 'ddMMyyyyHHmmssSSS');
                              this.dataSubmit['chargebeforeshot'] = this.eventForm.controls['chargeShot'].value;
                              break;
                          case 952: this.rejectDate = this.eventForm.controls['dateReject'].value;
                              this.rejectTime = this.eventForm.controls['timeReject'].value;
                              this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.rejectDate + 'T' + this.rejectTime), 'ddMMyyyyHHmmssSSS');
                              this.dataSubmit['chargebeforereject'] = this.eventForm.controls['chargeReject'].value;
                              break;
                          case 953: this.startDate = this.eventForm.controls['startDateRunback'].value;
                              this.startTime = this.eventForm.controls['startTimeRunback'].value;
                              this.endDate = this.eventForm.controls['endDateRunback'].value;
                              this.endTime = this.eventForm.controls['endTimeRunback'].value;
                              this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.startDate + 'T' + this.startTime), 'ddMMyyyyHHmmssSSS');
                              this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.endDate + 'T' + this.endTime), 'ddMMyyyyHHmmssSSS');
                              this.dataSubmit['chargebeforerunback'] = this.eventForm.controls['chargeBeforeRunback'].value;
                              this.dataSubmit['chargeafterrunback'] = this.eventForm.controls['chargeAfterRunback'].value;
                              break;
                          case 954: this.flameOffDate = this.eventForm.controls['flameOffDateStop'].value;
                              this.flameOffTime = this.eventForm.controls['flameOffTimeStop'].value;
                              this.fsnlDate = this.eventForm.controls['fsnlDateStop'].value;
                              this.fsnlTime = this.eventForm.controls['fsnlTimeStop'].value;
                              this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.flameOffDate + 'T' + this.flameOffTime), 'ddMMyyyyHHmmssSSS');
                              this.dataSubmit['datefsnl'] = this.datePipe.transform(new Date(this.fsnlDate + 'T' + this.fsnlTime), 'ddMMyyyyHHmmssSSS');
                              this.dataSubmit['chargebeforestop'] = this.eventForm.controls['chargeStop'].value;
                              break;
                          case 955: this.startDate = this.eventForm.controls['startDateDiesel'].value;
                              this.startTime = this.eventForm.controls['startTimeDiesel'].value;
                              this.endDate = this.eventForm.controls['endDateDiesel'].value;
                              this.endTime = this.eventForm.controls['endTimeDiesel'].value;
                              this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.startDate + 'T' + this.startTime), 'ddMMyyyyHHmmssSSS');
                              this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.endDate + 'T' + this.endTime), 'ddMMyyyyHHmmssSSS');
                              break;
                      }

                      this.dataSubmit['active'] = this.checkedEstatus;

                      /*
                      if (this.accion === 'nuevo') {
                          this.dataSubmit['save'] = true;
                      } */
                      if (this.accion === 'editar') {
                          this.dataSubmit['id'] = this.eventType.id;
                          this.dataSubmit['order'] = this.eventType.id;
                          this.dataSubmit['save'] = false;
                      }

                      this.efhService.setEvent(this.dataSubmit, this.globalService.aguila)
                          .subscribe(
                              dataBack => {
                                  if (this.accion === 'nuevo') {
                                      this.toastr.successToastr('El evento fue creada con éxito.', '¡Se ha logrado!');
                                  }
                                  if (this.accion === 'editar') {
                                      this.toastr.successToastr('El evento fue actualizado con éxito.', '¡Se ha logrado!');
                                  }
                              }
                          );
                  },
                  errorData => {
                      this.toastr.errorToastr(Constants.ERROR_SAVE, 'Lo siento,');
                  }
              );
      //} else {
/*
          debugger;
          this.dataSubmit['idtypeevent'] = this.eventForm.controls['idtypeevent'].value;
          this.dataSubmit['idtypefuel'] = this.eventForm.controls['idtypefuel'].value;
          this.dataSubmit['idunit'] = this.eventForm.controls['idunit'].value;
          this.dataSubmit['description'] = this.eventForm.controls['description'].value;
          this.dataSubmit['observations'] = this.eventForm.controls['observations'].value;
          this.dataSubmit['active'] = this.checkedEstatus;

          if (this.isShotSectionVisible) {
              this.flameOffDate = this.eventForm.controls['flameOffDateShot'].value;
              this.flameOffTime = this.eventForm.controls['flameOffTimeShot'].value;
              this.fsnlDate = this.eventForm.controls['fsnlDateShot'].value;
              this.fsnlTime = this.eventForm.controls['fsnlTimeShot'].value;
              this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.flameOffDate + 'T' + this.flameOffTime), 'ddMMyyyyHHmmssSSS');
              this.dataSubmit['datefsnl'] = this.datePipe.transform(new Date(this.fsnlDate + 'T' + this.fsnlTime), 'ddMMyyyyHHmmssSSS');
              this.dataSubmit['chargebeforeshot'] = this.eventForm.controls['chargeShot'].value;
          } else if (this.isRejectSectionVisible) {
              this.rejectDate = this.eventForm.controls['dateReject'].value;
              this.rejectTime = this.eventForm.controls['timeReject'].value;
              this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.rejectDate + 'T' + this.rejectTime), 'ddMMyyyyHHmmssSSS');
              this.dataSubmit['chargebeforereject'] = this.eventForm.controls['chargeReject'].value;
          } else if (this.isRunbackSectionVisible) {
              this.startDate = this.eventForm.controls['startDateRunback'].value;
              this.startTime = this.eventForm.controls['startTimeRunback'].value;
              this.endDate = this.eventForm.controls['endDateRunback'].value;
              this.endTime = this.eventForm.controls['endTimeRunback'].value;
              this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.startDate + 'T' + this.startTime), 'ddMMyyyyHHmmssSSS');
              this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.endDate + 'T' + this.endTime), 'ddMMyyyyHHmmssSSS');
              this.dataSubmit['chargebeforerunback'] = this.eventForm.controls['chargeBeforeRunback'].value;
              this.dataSubmit['chargeafterrunback'] = this.eventForm.controls['chargeAfterRunback'].value;
          } else if (this.isStopSectionVisible) {
              this.flameOffDate = this.eventForm.controls['flameOffDateStop'].value;
              this.flameOffTime = this.eventForm.controls['flameOffTimeStop'].value;
              this.fsnlDate = this.eventForm.controls['fsnlDateStop'].value;
              this.fsnlTime = this.eventForm.controls['fsnlTimeStop'].value;
              this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.flameOffDate + 'T' + this.flameOffTime), 'ddMMyyyyHHmmssSSS');
              this.dataSubmit['datefsnl'] = this.datePipe.transform(new Date(this.fsnlDate + 'T' + this.fsnlTime), 'ddMMyyyyHHmmssSSS');
              this.dataSubmit['chargebeforestop'] = this.eventForm.controls['chargeStop'].value;
          } else if (this.isDieselSectionVisible) {
              this.startDate = this.eventForm.controls['startDateDiesel'].value;
              this.startTime = this.eventForm.controls['startTimeDiesel'].value;
              this.endDate = this.eventForm.controls['endDateDiesel'].value;
              this.endTime = this.eventForm.controls['endTimeDiesel'].value;
              this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.startDate + 'T' + this.startTime), 'ddMMyyyyHHmmssSSS');
              this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.endDate + 'T' + this.endTime), 'ddMMyyyyHHmmssSSS');
          }

          if (this.accion === 'nuevo') {
              this.dataSubmit['save'] = true;
          }

          this.efhService.setEvent(this.dataSubmit, this.globalService.aguila)
              .subscribe(
                  dataBack => {
                      if (this.accion === 'nuevo') {
                          this.toastr.successToastr('El evento fue creada con éxito.', '¡Se ha logrado!');
                      }
                      if (this.accion === 'editar') {
                          this.toastr.successToastr('El evento fue actualizado con éxito.', '¡Se ha logrado!');
                      }
                  },
                  errorData => {
                      this.toastr.errorToastr(Constants.ERROR_SAVE, 'Lo siento,');
                  }
              );
      }*/
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
                  if (element.code === 'DIESEL') {
                        this.isDieselSectionVisible = true;
                   }
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
      this.defaultConstrolsEnabled(true);
      this.disableSections();
      // console.log(selected.value.id + ' | ' + selected.value.name)
      switch (selected.value.id) {
          case 1: this.shotControlsEnabled(true);
                  break;
          case 952: this.rejectControlsEnabled(true);
                    break;
          case 953: this.runbackConstrolsEnabled(true);
                    break;
          case 954: this.stopControlsEnabled(true);
                    break;
          case 955: this.dieselControlsEnabled(true);
                    break;
      }

  }

  resetSections() {
      this.isShotSectionVisible = false;
      this.isRejectSectionVisible = false;
      this.isRunbackSectionVisible = false;
      this.isStopSectionVisible = false;
      this.isDieselSectionVisible = false;

      this.shotControlsEnabled(false);
      this.rejectControlsEnabled(false);
      this.stopControlsEnabled(false);
      this.runbackConstrolsEnabled(false);
      this.dieselControlsEnabled(false);
  }

  disableSections() {
      this.shotControlsEnabled(false);
      this.rejectControlsEnabled(false);
      this.stopControlsEnabled(false);
      this.runbackConstrolsEnabled(false);
      this.dieselControlsEnabled(false);
  }

  regresar() {
    this.eventService.sendChangePage(new EventMessage(4, {} , 'Efh.Agregar eventos'));
  }

  onSubmit() {
      this.submittedData = true;
      if (this.eventForm.invalid) {
          this.toastr.errorToastr('Todos los campos son obligatorios, verifique.', 'Lo siento,');
          return;
      }
      this.obtenerDatosConfiguracionEvento(false, 0);
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

}
