import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe                           } from '@angular/common';
import { IndicatorType                      } from '../../../../models/IndicatorType';
import { GlobalService                      } from '../../../../../core/globals/global.service';
import { Constants                          } from '../../../../../core/globals/Constants';
import { CatalogoMaestroService             } from '../../../../../core/services/catalogo-maestro.service';
import { ToastrManager                      } from 'ng6-toastr-notifications';
import { ConfirmationDialogService          } from '../../../../../core/services/confirmation-dialog.service';
import { EventService                       } from '../../../../../core/services/event.service';
import { EfhService                         } from '../../../../../core/services/efh.service';
import {EventMessage} from '../../../../../core/models/EventMessage';

@Component({
  selector: 'app-efh-edit-indicator',
  templateUrl: './efhEditIndicator.component.html',
  styleUrls: ['./efhEditIndicator.component.scss'],
  providers: [DatePipe]
})
export class EfhEditIndicatorComponent implements OnInit {

  @Input() accion: string;
  @Input() seccion: string;
  titulo:string;
  indicatorType: IndicatorType;
  indicatorForm: FormGroup;
  dataSubmit = {};
  submittedData = false;
  observationsArr: Array<any>;
  result;
  indicatorTypesArr = [];
  unitsArr = [];
  fuelTypesArr = [];
  fuelTypesForSelect = [];
  checkedEstatus = false;
  deshabiliarEstatus = false;
  headObservaciones = ['#', 'Nombre', 'Observaciones', 'Fecha de ultima modificación', 'Visible', 'Editar', 'Eliminar'];
  defaultCharge;
  defaultCharge2;
  currentYear = new Date().getFullYear();
  initDate = (this.currentYear - 1) + '-01-01';
  typeDocuments = ['Documentos'];
  idFuelType;

  isShotSectionVisible = false;
  isStartSectionVisible = false;
  isRejectSectionVisible = false;
  isRunbackSectionVisible = false;
  isStSectionVisible = false; // false
  isDieselSectionVisible = false;
  isDefaultSectionsVisible = false; // false
  isNormalOperationSectionVisible = false;

  optionsSelectEnabled = false;

  stopDatesValidation = false;
  chargeValidation = false;
  charge2Validation = false;
  isWithFuel = false;

  isInputsControlsEnabled = true;
  isDefaultControlsEnabled = true;
  disabledSave = true;
  isAddObvsDisabled = true;

  dateStartApplication;
  timeStartApplication;
  dateEndApplication;
  timeEndApplication;
  efhiCost;
  maxiumLoad;
  equivalenFuelFactor;
  equivalenWithOutFuelFactor;
  isEfhiSelected = false;
  isMaxiumLoadSelected = false;
  isEqWithOutFuelFactorSelected = false;
  isEqFuelFactorSelected = false;
  indicatorDatesValidation = false;

  isInputSectionVisible = false;
  isMaxiumLoadControlsEnabled = false;
  isWithOutfuelControlsEnabled = false;
  isWithFuelControlsEnabled = false;

  selectedIndicatorType;
  selectedUnit;
  selectedFuelType;

  constructor(
      private formBuilder: FormBuilder,
      private catalogoMaestroService: CatalogoMaestroService,
      private datePipe: DatePipe,
      public  toastr: ToastrManager,
      public  globalService: GlobalService,
      private confirmationDialogService: ConfirmationDialogService,
      private eventService: EventService,
      private efhService: EfhService) {
    this.indicatorForm = this.formBuilder.group({});
    this.observationsArr = [];
  }

  get f() { return this.indicatorForm.controls; }

  ngOnInit() {
    this.titulo = 'Agregar Configuracion de Indicadores';
    this.submittedData = false;
    this.indicatorForm = this.formBuilder.group({
      indicatorTypeControl: [null, null],
      unitControl: [ null, null],
      fuelTypeControl: [ null, null],
      dateStartApplication: ['', Validators.required],
      timeStartApplication: ['00:00:00', Validators.required],
      dateEndApplication: ['', Validators.required],
      timeEndApplication: ['00:00:00', Validators.required],
      efhiCost: ['', Validators.required],
      maxiumLoad: ['', Validators.required],
      equivalenFuelFactor: ['', Validators.required],
      equivalenWithOutFuelFactor: ['', Validators.required],
      description: ['', Validators.required],
      // observations: [{ value: '', disabled: this.isAddObvsDisabled }, Validators.required],
      file: [null, Validators.required]
    });
    this.selectControlsEnabled(false);
    this.inputsControlsEnabled(false);
    this.defaultConstrolsEnabled(false);

    this.indicatorTypesArr = this.indicatorType.indicatorTypesArr.filter(indicator => indicator.active);
    this.indicatorTypesArr.sort((a, b) => a.name.localeCompare(b.name));
    this.unitsArr = this.indicatorType.unitsArr.filter(unit => unit.active);
    this.unitsArr.sort((a, b) => a.name.localeCompare(b.name));
    this.fuelTypesArr = this.indicatorType.fuelTypesArr.filter(fuel => fuel.active);
    this.fuelTypesArr.sort((a, b) => a.name.localeCompare(b.name));
    this.fuelTypesForSelect = this.fuelTypesArr;
    for (let fuelType of this.fuelTypesArr) {
      if(fuelType.name.trim() === 'SIN COMBUSTIBLE'){
        this.idFuelType = fuelType.id;
      }
    }

    this.selectedIndicatorType = undefined;
    this.selectedUnit = undefined;
    this.selectedFuelType = undefined;

    this.accion = this.indicatorType.action;
    this.seccion = this.indicatorType.section;

    if (this.accion === 'editar') {
      this.indicatorForm.controls.indicatorTypeControl.disable();
      this.selectControlsEnabled(true);
      this.deshabiliarEstatus = false;
      this.disabledSave = false;
      this.titulo = 'Editar / Configuración de Indicadores';
    } else if (this.accion === 'ver') {
      this.deshabiliarEstatus = true;
      this.isAddObvsDisabled = true;
      this.indicatorForm.controls.indicatorTypeControl.disable();
      this.titulo = 'Consultar / Configuración de Indicadores';
    } else {
      this.checkedEstatus = true;
      this.deshabiliarEstatus = false;
      this.titulo = 'Agregar / Configuración de Indicadores';
    }

    if (this.accion === 'editar' || this.accion === 'ver') {
      this.resetSections();

      switch (this.seccion) {
        case 'COSTO EFHI$': this.inputsControlsEnabled(this.accion === 'ver' ? false : true);
          this.defaultConstrolsEnabled(this.accion === 'ver' ? false : true);
          this.isInputSectionVisible = true;
          this.isEfhiSelected = true;
          this.isDefaultSectionsVisible = true;
          this.isWithFuel = true;
          break;
        case 'FACTOR EQUIVALENTE DE COMBUSTIBLE': this.withFuelControlsEnabled(this.accion === 'ver' ? false : true);
          this.defaultConstrolsEnabled(this.accion === 'ver' ? false : true);
          this.isInputSectionVisible = true;
          this.isEqFuelFactorSelected = true;
          this.isDefaultSectionsVisible = true;
          this.isWithFuel = true;
          break;
        case 'FACTOR EQUIVALENTE SIN COMBUSTIBLE': this.withOutfuelControlsEnabled(this.accion === 'ver' ? false : true);
          this.defaultConstrolsEnabled(this.accion === 'ver' ? false : true);
          this.isInputSectionVisible = true;
          this.isEqWithOutFuelFactorSelected = true;
          this.isDefaultSectionsVisible = true;
          this.isWithFuel = true;
          break;
        case 'MÁXIMA CARGA': this.maxiumLoadControlsEnabled(this.accion === 'ver' ? false : true);
          this.defaultConstrolsEnabled(this.accion === 'ver' ? false : true);
          this.isInputSectionVisible = true;
          this.isMaxiumLoadSelected = true;
          this.isDefaultSectionsVisible = true;
          this.isWithFuel = true;
          break;
      }
      this.obtenerDatosConfiguracionIndicator(true, this.indicatorType.id);
    }
  }

  obtenerDatosConfiguracionIndicator(putData, id) {
    if (id !== 0) {
      this.efhService.getIndicator(id)
          .subscribe(
              dataBack => {
                this.result = dataBack;

                for (let element of this.result) {
                  if (this.indicatorType.id === element.id && putData) {
                    this.selectedIndicatorType = this.indicatorTypesArr.find(x => x.id === element.idtypeindicator).id;
                    this.selectedUnit = this.unitsArr.find(x => x.id === element.idunit).id;
                    this.selectedFuelType = this.fuelTypesArr.find(x => x.id === element.idtypefuel).id;

                    // this.getObservations(this.eventType.id);

                    switch (element.idtypeindicator) {
                      case 1: this.dateStartApplication = this.datePipe.transform(new Date(element.dateinit) , 'yyyy-MM-dd');
                        this.timeStartApplication = this.datePipe.transform(new Date(element.dateinit) , 'HH:mm:ss');
                        this.dateEndApplication = this.datePipe.transform(new Date(element.dateend) , 'yyyy-MM-dd');
                        this.timeEndApplication = this.datePipe.transform(new Date(element.dateend) , 'HH:mm:ss');
                        this.efhiCost = element.value;
                        this.indicatorForm.controls['dateStartApplication'].setValue(this.dateStartApplication)
                        this.indicatorForm.controls['timeStartApplication'].setValue(this.timeStartApplication);
                        this.indicatorForm.controls['dateEndApplication'].setValue(this.dateEndApplication);
                        this.indicatorForm.controls['timeEndApplication'].setValue(this.timeEndApplication);
                        this.indicatorForm.controls['efhiCost'].setValue(this.efhiCost);
                        break;
                      case 2: this.dateStartApplication = this.datePipe.transform(this.getTimeLocale(element.dateinit) , 'yyyy-MM-dd');
                        this.timeStartApplication = this.datePipe.transform(this.getTimeLocale(element.dateinit) , 'HH:mm:ss');
                        this.dateEndApplication = this.datePipe.transform(this.getTimeLocale(element.dateend) , 'yyyy-MM-dd');
                        this.timeEndApplication = this.datePipe.transform(this.getTimeLocale(element.dateend) , 'HH:mm:ss');
                        this.equivalenFuelFactor = element.value;
                        this.indicatorForm.controls['dateStartApplication'].setValue(this.dateStartApplication)
                        this.indicatorForm.controls['timeStartApplication'].setValue(this.timeStartApplication);
                        this.indicatorForm.controls['dateEndApplication'].setValue(this.dateEndApplication);
                        this.indicatorForm.controls['timeEndApplication'].setValue(this.timeEndApplication);
                        this.indicatorForm.controls['equivalenFuelFactor'].setValue(this.equivalenFuelFactor);
                        break;
                      case 4: this.dateStartApplication = this.datePipe.transform(new Date(element.dateinit) , 'yyyy-MM-dd');
                        this.timeStartApplication = this.datePipe.transform(new Date(element.dateinit) , 'HH:mm:ss');
                        this.dateEndApplication = this.datePipe.transform(new Date(element.dateend) , 'yyyy-MM-dd');
                        this.timeEndApplication = this.datePipe.transform(new Date(element.dateend) , 'HH:mm:ss');
                        this.equivalenFuelFactor = element.value;
                        this.indicatorForm.controls['dateStartApplication'].setValue(this.dateStartApplication)
                        this.indicatorForm.controls['timeStartApplication'].setValue(this.timeStartApplication);
                        this.indicatorForm.controls['dateEndApplication'].setValue(this.dateEndApplication);
                        this.indicatorForm.controls['timeEndApplication'].setValue(this.timeEndApplication);
                        this.indicatorForm.controls['equivalenFuelFactor'].setValue(this.equivalenFuelFactor);
                        break;
                      case 5: this.dateStartApplication = this.datePipe.transform(new Date(element.dateinit) , 'yyyy-MM-dd');
                        this.timeStartApplication = this.datePipe.transform(new Date(element.dateinit) , 'HH:mm:ss');
                        this.dateEndApplication = this.datePipe.transform(new Date(element.dateend) , 'yyyy-MM-dd');
                        this.timeEndApplication = this.datePipe.transform(new Date(element.dateend) , 'HH:mm:ss');
                        this.equivalenWithOutFuelFactor = element.value
                        this.indicatorForm.controls['dateStartApplication'].setValue(this.dateStartApplication)
                        this.indicatorForm.controls['timeStartApplication'].setValue(this.timeStartApplication);
                        this.indicatorForm.controls['dateEndApplication'].setValue(this.dateEndApplication);
                        this.indicatorForm.controls['timeEndApplication'].setValue(this.timeEndApplication);
                        this.indicatorForm.controls['equivalenWithOutFuelFactor'].setValue(this.equivalenWithOutFuelFactor);
                        break;
                      case 3: this.dateStartApplication = this.datePipe.transform(new Date(element.dateinit) , 'yyyy-MM-dd');
                        this.timeStartApplication = this.datePipe.transform(new Date(element.dateinit) , 'HH:mm:ss');
                        this.dateEndApplication = this.datePipe.transform(new Date(element.dateend) , 'yyyy-MM-dd');
                        this.timeEndApplication = this.datePipe.transform(new Date(element.dateend) , 'HH:mm:ss');
                        this.maxiumLoad = element.value;
                        this.indicatorForm.controls['dateStartApplication'].setValue(this.dateStartApplication)
                        this.indicatorForm.controls['timeStartApplication'].setValue(this.timeStartApplication);
                        this.indicatorForm.controls['dateEndApplication'].setValue(this.dateEndApplication);
                        this.indicatorForm.controls['timeEndApplication'].setValue(this.timeEndApplication);
                        this.indicatorForm.controls['maxiumLoad'].setValue(this.maxiumLoad);
                        break;
                    }
                    this.indicatorForm.controls['description'].setValue(element.description);
                    this.checkedEstatus = element.active;
                  }
                }

                if (!putData) {
                  if (this.indicatorForm.controls['indicatorTypeControl'].value === null) {
                    this.dataSubmit['idtypeindicator'] = this.selectedIndicatorType;
                  } else {
                    this.dataSubmit['idtypeindicator'] = this.indicatorForm.controls['indicatorTypeControl'].value;
                  }

                  if(this.indicatorForm.controls['fuelTypeControl'].value === null && this.isWithFuel) {
                    this.dataSubmit['idtypefuel'] = this.selectedFuelType;
                  }
                  if (this.indicatorForm.controls['fuelTypeControl'].value === null && !this.isWithFuel) {
                    this.dataSubmit['idtypefuel'] = this.selectedFuelType;
                  }
                  if(this.indicatorForm.controls['fuelTypeControl'].value != null && !this.isWithFuel) {
                    this.dataSubmit['idtypefuel'] = this.idFuelType;
                  } else {
                    this.dataSubmit['idtypefuel'] = this.indicatorForm.controls['fuelTypeControl'].value;
                  }

                  if (this.indicatorForm.controls['unitControl'].value === null) {
                    this.dataSubmit['idunit'] = this.selectedUnit;
                  } else {
                    this.dataSubmit['idunit'] = this.indicatorForm.controls['unitControl'].value;
                  }

                  this.dataSubmit['description'] = this.indicatorForm.controls['description'].value;
                  // this.dataSubmit['observations'] = this.eventForm.controls['observations'].value;

                  switch (this.dataSubmit['idtypeindicator']) {
                    case 1: this.dateStartApplication = this.indicatorForm.controls['dateStartApplication'].value;
                      this.timeStartApplication = this.indicatorForm.controls['timeStartApplication'].value;
                      this.dateEndApplication = this.indicatorForm.controls['dateEndApplication'].value;
                      this.timeEndApplication = this.indicatorForm.controls['timeEndApplication'].value;
                      this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.dateStartApplication + 'T' + this.timeStartApplication), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                      this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.dateEndApplication + 'T' + this.timeEndApplication), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                      this.dataSubmit['value'] = this.indicatorForm.controls['efhiCost'].value;
                      break;
                    case 2:
                    case 4: this.dateStartApplication = this.indicatorForm.controls['dateStartApplication'].value;
                      this.timeStartApplication = this.indicatorForm.controls['timeStartApplication'].value;
                      this.dateEndApplication = this.indicatorForm.controls['dateEndApplication'].value;
                      this.timeEndApplication = this.indicatorForm.controls['timeEndApplication'].value;
                      this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.dateStartApplication + 'T' + this.timeStartApplication), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                      this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.dateEndApplication + 'T' + this.timeEndApplication), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                      this.dataSubmit['value'] = this.indicatorForm.controls['equivalenFuelFactor'].value;
                      break;
                    case 5: this.dateStartApplication = this.indicatorForm.controls['dateStartApplication'].value;
                      this.timeStartApplication = this.indicatorForm.controls['timeStartApplication'].value;
                      this.dateEndApplication = this.indicatorForm.controls['dateEndApplication'].value;
                      this.timeEndApplication = this.indicatorForm.controls['timeEndApplication'].value;
                      this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.dateStartApplication + 'T' + this.timeStartApplication), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                      this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.dateEndApplication + 'T' + this.timeEndApplication), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                      this.dataSubmit['value'] = this.indicatorForm.controls['equivalenWithOutFuelFactor'].value;
                      break;
                    case 3: this.dateStartApplication = this.indicatorForm.controls['dateStartApplication'].value;
                      this.timeStartApplication = this.indicatorForm.controls['timeStartApplication'].value;
                      this.dateEndApplication = this.indicatorForm.controls['dateEndApplication'].value;
                      this.timeEndApplication = this.indicatorForm.controls['timeEndApplication'].value;
                      this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.dateStartApplication + 'T' + this.timeStartApplication), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                      this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.dateEndApplication + 'T' + this.timeEndApplication), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                      this.dataSubmit['value'] = this.indicatorForm.controls['maxiumLoad'].value;
                      break;
                  }

                  this.dataSubmit['active'] = this.checkedEstatus;
                  this.dataSubmit['id'] = this.indicatorType.id;
                  this.dataSubmit['order'] = this.indicatorType.id;
                  this.dataSubmit['save'] = false;

                  this.efhService.setIndicator(this.dataSubmit)
                      .subscribe(
                          dataBack => {

                            if (dataBack['code'] === -100) {
                              this.toastr.errorToastr('No es posible actualizar, existe un indicador activo que se empalma', 'Lo siento,');
                            } else {
                              if (this.accion === 'nuevo') {
                                this.toastr.successToastr('El indicador fue creado con éxito.', '¡Se ha logrado!');
                              }
                              if (this.accion === 'editar') {
                                this.toastr.successToastr('El indicador fue actualizado con éxito.', '¡Se ha logrado!');
                              }

                              if (this.isInputSectionVisible && this.isEqFuelFactorSelected) {
                                this.withFuelControlsEnabled(false);
                              } else if (this.isInputSectionVisible && this.isEqWithOutFuelFactorSelected) {
                                this.withOutfuelControlsEnabled(false);
                              } else if (this.isInputSectionVisible && this.isMaxiumLoadSelected) {
                                this.maxiumLoadControlsEnabled(false);
                              } else if (this.isInputSectionVisible && this.isEfhiSelected) {
                                this.inputsControlsEnabled(false);
                              }

                              this.selectControlsEnabled(false);
                              this.defaultConstrolsEnabled(false);
                              this.deshabiliarEstatus = true;
                              this.isAddObvsDisabled = true;
                              this.disabledSave = true;
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
      if(this.isWithFuel) {
        this.dataSubmit['idtypefuel'] = this.indicatorForm.controls['fuelTypeControl'].value;
      } else {
        this.dataSubmit['idtypefuel'] = this.idFuelType;
      }
      this.dataSubmit['idtypeindicator'] = this.indicatorForm.controls['indicatorTypeControl'].value;
      this.dataSubmit['idunit'] = this.indicatorForm.controls['unitControl'].value;
      this.dataSubmit['description'] = this.indicatorForm.controls['description'].value;
      this.dataSubmit['active'] = this.checkedEstatus;

      if (this.isInputSectionVisible && this.isEqFuelFactorSelected) {
        this.dateStartApplication = this.indicatorForm.controls['dateStartApplication'].value;
        this.timeStartApplication = this.indicatorForm.controls['timeStartApplication'].value;
        this.dateEndApplication = this.indicatorForm.controls['dateEndApplication'].value;
        this.timeEndApplication = this.indicatorForm.controls['timeEndApplication'].value;
        this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.dateStartApplication + 'T' + this.timeStartApplication), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
        this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.dateEndApplication + 'T' + this.timeEndApplication), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
        this.dataSubmit['value'] = this.indicatorForm.controls['equivalenFuelFactor'].value;
      } else if (this.isInputSectionVisible && this.isEqWithOutFuelFactorSelected) {
        this.dateStartApplication = this.indicatorForm.controls['dateStartApplication'].value;
        this.timeStartApplication = this.indicatorForm.controls['timeStartApplication'].value;
        this.dateEndApplication = this.indicatorForm.controls['dateEndApplication'].value;
        this.timeEndApplication = this.indicatorForm.controls['timeEndApplication'].value;
        this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.dateStartApplication + 'T' + this.timeStartApplication), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
        this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.dateEndApplication + 'T' + this.timeEndApplication), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
        this.dataSubmit['value'] = this.indicatorForm.controls['equivalenWithOutFuelFactor'].value;
      } else if (this.isInputSectionVisible && this.isMaxiumLoadSelected) {
        this.dateStartApplication = this.indicatorForm.controls['dateStartApplication'].value;
        this.timeStartApplication = this.indicatorForm.controls['timeStartApplication'].value;
        this.dateEndApplication = this.indicatorForm.controls['dateEndApplication'].value;
        this.timeEndApplication = this.indicatorForm.controls['timeEndApplication'].value;
        this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.dateStartApplication + 'T' + this.timeStartApplication), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
        this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.dateEndApplication + 'T' + this.timeEndApplication), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
        this.dataSubmit['value'] = this.indicatorForm.controls['maxiumLoad'].value;
      } else if (this.isInputSectionVisible && this.isEfhiSelected) {
        this.dateStartApplication = this.indicatorForm.controls['dateStartApplication'].value;
        this.timeStartApplication = this.indicatorForm.controls['timeStartApplication'].value;
        this.dateEndApplication = this.indicatorForm.controls['dateEndApplication'].value;
        this.timeEndApplication = this.indicatorForm.controls['timeEndApplication'].value;
        this.dataSubmit['dateinit'] = this.datePipe.transform(new Date(this.dateStartApplication + 'T' + this.timeStartApplication), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
        this.dataSubmit['dateend'] = this.datePipe.transform(new Date(this.dateEndApplication + 'T' + this.timeEndApplication), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
        this.dataSubmit['value'] = this.indicatorForm.controls['efhiCost'].value;
      }

      if (this.accion === 'nuevo') {
        this.dataSubmit['save'] = true;
      }
      this.efhService.setIndicator(this.dataSubmit)
          .subscribe(
              dataBack => {
                if (this.accion === 'nuevo') {
                  this.toastr.successToastr('El indicador fue creada con éxito.', '¡Se ha logrado!');
                }
                if (this.accion === 'editar') {
                  this.toastr.successToastr('El indicador fue actualizado con éxito.', '¡Se ha logrado!');
                }

                if (this.isInputSectionVisible && this.isEqFuelFactorSelected) {
                  this.withFuelControlsEnabled(false);
                } else if (this.isInputSectionVisible && this.isEqWithOutFuelFactorSelected) {
                  this.withOutfuelControlsEnabled(false);
                } else if (this.isInputSectionVisible && this.isMaxiumLoadSelected) {
                  this.maxiumLoadControlsEnabled(false);
                } else if (this.isInputSectionVisible && this.isEfhiSelected) {
                  this.inputsControlsEnabled(false);
                }

                this.selectControlsEnabled(false);
                this.defaultConstrolsEnabled(false);
                this.deshabiliarEstatus = true;
                this.isAddObvsDisabled = true;
                this.disabledSave = true;

                const idIndicator = dataBack['code'];
                this.efhService.accionComments.next('savenewcommentsevent|' + idIndicator);

                this.indicatorType.id = idIndicator;
              },
              errorData => {
                this.toastr.errorToastr(Constants.ERROR_SAVE, 'Lo siento,');
              }
          );
    }
  }

  enableControls(selected) {
    this.selectControlsEnabled(true);
    this.resetSections();
    this.fuelTypesArr = this.fuelTypesForSelect;
    switch (selected.value) {
      case 1: this.inputsControlsEnabled(true);
        this.defaultConstrolsEnabled(true);
        this.isInputSectionVisible = true;
        this.isDefaultSectionsVisible = true;
        this.isEfhiSelected = true;
        this.isWithFuel = true;
        break;
      case 2: this.withFuelControlsEnabled(true);
        this.defaultConstrolsEnabled(true);
        this.isInputSectionVisible = true;
        this.isDefaultSectionsVisible = true;
        this.isEqFuelFactorSelected = true;
        this.isWithFuel = true;
        break;
      case 4: this.withFuelControlsEnabled(true);
        this.defaultConstrolsEnabled(true);
        this.isInputSectionVisible = true;
        this.isDefaultSectionsVisible = true;
        this.isEqFuelFactorSelected = true;
        this.isWithFuel = true;
        break;
      case 5: this.withOutfuelControlsEnabled(true);
        this.defaultConstrolsEnabled(true);
        this.isInputSectionVisible = true;
        this.isDefaultSectionsVisible = true;
        this.isEqWithOutFuelFactorSelected = true;
        this.isWithFuel = false;
        break;
      case 3: this.maxiumLoadControlsEnabled(true);
        this.defaultConstrolsEnabled(true);
        this.isInputSectionVisible = true;
        this.isDefaultSectionsVisible = true;
        this.isMaxiumLoadSelected = true;
        this.isWithFuel = true;
        break;
    }
  }

  resetSections() {
    this.isInputSectionVisible = false;
    this.isDefaultSectionsVisible = false;
    this.isEfhiSelected = false;
    this.isEqFuelFactorSelected = false;
    this.isEqWithOutFuelFactorSelected = false;
    this.isMaxiumLoadSelected = false;
    this.isWithFuel = false;
    this.inputsControlsEnabled(false);
    this.defaultConstrolsEnabled(false);
    this.maxiumLoadControlsEnabled(false);
    this.withOutfuelControlsEnabled(false);
    this.withFuelControlsEnabled(false);
  }

  onSubmit() {
    this.submittedData = true;

    if ((this.isInputSectionVisible && this.indicatorForm.controls['dateStartApplication'].invalid)
        || (this.isInputSectionVisible && this.indicatorForm.controls['timeStartApplication'].invalid)
        || (this.isEqFuelFactorSelected && this.indicatorForm.controls['equivalenFuelFactor'].invalid)
        || (this.isEqWithOutFuelFactorSelected && this.indicatorForm.controls['equivalenWithOutFuelFactor'].invalid)
        || (this.isMaxiumLoadSelected && this.indicatorForm.controls['maxiumLoad'].invalid)
        || (this.isEfhiSelected && this.indicatorForm.controls['efhiCost'].invalid)
        || this.indicatorForm.controls['description'].invalid
        || (this.selectedUnit === undefined || this.selectedUnit === null)
        || (this.selectedFuelType === undefined && this.isWithFuel || this.selectedFuelType === null && this.isWithFuel)) {
      this.toastr.errorToastr('Verifique los campos.', 'Lo siento,');
      return;
    }

    if ((this.isInputSectionVisible && this.indicatorForm.controls['dateEndApplication'].invalid)
        || (this.isInputSectionVisible && this.indicatorForm.controls['timeEndApplication'].invalid)){
      this.dateEndApplication = '2099-12-31';
      this.timeEndApplication = '00:00:00';
      this.indicatorForm.controls['dateEndApplication'].setValue(this.dateEndApplication);
      this.indicatorForm.controls['timeEndApplication'].setValue(this.timeEndApplication);
    }

    if (this.isInputSectionVisible
        && this.compareDate(this.datePipe.transform(new Date(this.indicatorForm.controls['dateStartApplication'].value + ' ' + this.indicatorForm.controls['timeStartApplication'].value), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'),
            this.datePipe.transform(new Date(this.indicatorForm.controls['dateEndApplication'].value + ' ' + this.indicatorForm.controls['timeEndApplication'].value), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS'))) {
      this.toastr.errorToastr('Fecha-Hora Inicio debe ser menor a Fecha-Hora Fin, verifique', 'Lo siento,');
      this.indicatorDatesValidation = true;
      return;
    }

    if (this.accion === 'editar') {
      this.obtenerDatosConfiguracionIndicator(false, this.indicatorType.id);
    } else {
      this.obtenerDatosConfiguracionIndicator(false, 0);
    }
  }

  inputsControlsEnabled(flag) {
    this.isInputsControlsEnabled = flag;
    if (flag) {
      this.indicatorForm.controls.dateStartApplication.enable();
      this.indicatorForm.controls.timeStartApplication.enable();
      this.indicatorForm.controls.dateEndApplication.enable();
      this.indicatorForm.controls.timeEndApplication.enable();
      this.indicatorForm.controls.efhiCost.enable();
    } else {
      this.indicatorForm.controls.dateStartApplication.disable();
      this.indicatorForm.controls.timeStartApplication.disable();
      this.indicatorForm.controls.dateEndApplication.disable();
      this.indicatorForm.controls.timeEndApplication.disable();
      this.indicatorForm.controls.efhiCost.disable();
    }
  }

  maxiumLoadControlsEnabled(flag) {
    this.isMaxiumLoadControlsEnabled = flag;
    if (flag) {
      this.indicatorForm.controls.dateStartApplication.enable();
      this.indicatorForm.controls.timeStartApplication.enable();
      this.indicatorForm.controls.dateEndApplication.enable();
      this.indicatorForm.controls.timeEndApplication.enable();
      this.indicatorForm.controls.maxiumLoad.enable();
    } else {
      this.indicatorForm.controls.dateStartApplication.disable();
      this.indicatorForm.controls.timeStartApplication.disable();
      this.indicatorForm.controls.dateEndApplication.disable();
      this.indicatorForm.controls.timeEndApplication.disable();
      this.indicatorForm.controls.maxiumLoad.disable();
    }
  }

  withOutfuelControlsEnabled(flag) {
    this.isWithOutfuelControlsEnabled = flag;
    if (flag) {
      this.indicatorForm.controls.dateStartApplication.enable();
      this.indicatorForm.controls.timeStartApplication.enable();
      this.indicatorForm.controls.dateEndApplication.enable();
      this.indicatorForm.controls.timeEndApplication.enable();
      this.indicatorForm.controls.equivalenWithOutFuelFactor.enable();
    } else {
      this.indicatorForm.controls.dateStartApplication.disable();
      this.indicatorForm.controls.timeStartApplication.disable();
      this.indicatorForm.controls.dateEndApplication.disable();
      this.indicatorForm.controls.timeEndApplication.disable();
      this.indicatorForm.controls.equivalenWithOutFuelFactor.disable();
    }
  }

  withFuelControlsEnabled(flag) {
    this.isWithFuelControlsEnabled = flag;
    if (flag) {
      this.indicatorForm.controls.dateStartApplication.enable();
      this.indicatorForm.controls.timeStartApplication.enable();
      this.indicatorForm.controls.dateEndApplication.enable();
      this.indicatorForm.controls.timeEndApplication.enable();
      this.indicatorForm.controls.equivalenFuelFactor.enable();
    } else {
      this.indicatorForm.controls.dateStartApplication.disable();
      this.indicatorForm.controls.timeStartApplication.disable();
      this.indicatorForm.controls.dateEndApplication.disable();
      this.indicatorForm.controls.timeEndApplication.disable();
      this.indicatorForm.controls.equivalenFuelFactor.disable();
    }
  }

  selectControlsEnabled(flag) {
    this.optionsSelectEnabled = flag;
    if (flag) {
      this.indicatorForm.controls.unitControl.enable();
      this.indicatorForm.controls.fuelTypeControl.enable();
    } else {
      this.indicatorForm.controls.unitControl.disable();
      this.indicatorForm.controls.fuelTypeControl.disable();
    }
  }

  defaultConstrolsEnabled(flag) {
    this.isDefaultControlsEnabled = flag;
    if (flag) {
      this.indicatorForm.controls.description.enable();
    } else {
      this.indicatorForm.controls.description.disable();
    }
  }

  resetAuxVariables() {
    this.dateStartApplication = null;
    this.timeStartApplication = null;
    this.dateEndApplication = null;
    this.timeEndApplication = null;
    this.efhiCost = null;
    this.maxiumLoad = null;
    this.equivalenFuelFactor = null;
    this.equivalenWithOutFuelFactor = null;
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

  regresar() {
    this.efhService.getDocuments(2, this.indicatorType.id, this.typeDocuments[1]).subscribe(
        docto => {

          if ( docto.length > 0) {
            this.eventService.sendChangePage(new EventMessage(4, {} , 'Efh.addIndicadorComponent'));
          } else {
            this.toastr.errorToastr(Constants.ERROR_SAVE_DOCUMENT, 'Lo siento,');
          }
        }
    );
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
  }

}
