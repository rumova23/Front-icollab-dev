/* tslint:disable:indent */
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators, AbstractControl, FormArray} from '@angular/forms';
import * as moment from 'moment';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { IdLabel } from 'src/app/core/models/IdLabel';
import { SecurityService } from 'src/app/core/services/security.service';
import { requiredFileType } from 'src/app/core/helpers/requiredFileType';
import {MasterCatalogService} from '../../services/master-catalog.service';
import {MaestroOpcionDTO} from '../../../compliance/models/maestro-opcion-dto';
import {forEach} from '@angular/router/src/utils/collection';
import {Combo} from '../../../compliance/models/Combo';
import { SelectionModel } from '@angular/cdk/collections';
import {EventMessage} from '../../../core/models/EventMessage';
import {EventBlocked} from '../../../core/models/EventBlocked';
import {EventService} from '../../../core/services/event.service';
import {BinnacleService} from '../../services/binnacle.service';
import {BinnacleEventConfigurationDTO} from '../../models/binnacle-event-configuration-dto';
import { CatalogType } from 'src/app/compliance/models/CatalogType';
import {BinnacleEventDTO} from '../../models/binnacle-event-dto';
import {EstatusMaestroService} from '../../../core/services/estatus-maestro.service';
import {EntidadEstatusDTO} from '../../../compliance/models/entidad-estatus-dto';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import {NoteDTO} from '../../models/note-dto';
import {Constants} from '../../../core/globals/Constants';
import {BearerDTO} from '../../models/bearer-dto';

@Component({
	selector: 'app-safe-registration-of-events',
	templateUrl: './safe-registration-of-events.component.html',
	styleUrls: ['./safe-registration-of-events.component.scss']
})
export class SafeRegistrationOfEventsComponent implements OnInit {
	hours: IdLabel[] =  new Array(24).fill(0).map((_valor, indice) => ({id: (indice < 10 ? '0' : '') + indice, label: (indice < 10 ? '0' : '') + indice}));
	minutes: IdLabel[] =  new Array(60).fill(0).map((_valor, indice) => ({id: (indice < 10 ? '0' : '') + indice, label: (indice < 10 ? '0' : '') + indice}));

	i = 0;
	catalogType: any;
	actionPage = '';
	templateConfiguration: BinnacleEventConfigurationDTO;
	formobservationsComments: FormGroup;
	fileUploadForm: FormGroup;
	formNewEvent: FormGroup;
	formTemp: FormGroup;

	file: any;

	lstRequired: Array<string>;



	lstEventClassification: IdLabel[] = [];
	lstEventClassificationDTO: Array<MaestroOpcionDTO>;
	lstEventsDTO: Array<MaestroOpcionDTO>;
	lstEvents: IdLabel[] = [];

	lstFuelsAll: IdLabel[] = [];
	lstUnitsAll: IdLabel[] = [];
	lstImpactContractsAll: IdLabel[] = [];
	lstRealsCcdvAll: IdLabel[] = [];
	lstToleranceBandsAll: IdLabel[] = [];
	lstMarketTypesAll: IdLabel[] = [];
	lstSelatedServicesAll: IdLabel[] = [];
	lstEquipmentAll: IdLabel[] = [];
	lstWorkOrderAll: IdLabel[] = [];
	lstOperatorPlantOpenAll: IdLabel[] = [];
	lstOperatorPlantCloseAll: IdLabel[] = [];
	lstSourceEventAll: IdLabel[] = [];

	lstFuels: IdLabel[] = [];
	lstUnits: IdLabel[] = [];
	lstImpactContracts: IdLabel[] = [];
	lstRealsCcdv: IdLabel[] = [];
	lstToleranceBands: IdLabel[] = [];
	lstMarketTypes: IdLabel[] = [];
	lstSelatedServices: IdLabel[] = [];
	lstEquipment: IdLabel[] = [];
	lstOperatorPlantOpen: IdLabel[] = [];
	lstOperatorPlantClose: IdLabel[] = [];
	lstSourceEvent: IdLabel[] = [];

	lstEventStatus: IdLabel[] = [];
	lstEventStatusAll: IdLabel[] = [];

	lstApprovalStatus: IdLabel[] = [];
	lstApprovalStatusAll: IdLabel[] = [];
	eventStatus: string;
	approvalStatus: string;
	statusTerminado: number;
	formValid: boolean;

	tempOrder = 3;
	tableObservationsComments = [];

	newNotes: Array<NoteDTO> = [];
	newFiles: Array<BearerDTO> = [];
	files: Array<BearerDTO> = [];
	tablaColumnsLabels = [
		{ key: 'order', label: '#' },
		{ key: 'name', label: 'Nombre' },
		{ key: 'observation', label: 'Observaciones' },
		{ key: 'dateUptade', label: 'Fecha de Ultima Modificación' },
		{ key: 'visible', label: 'Visible' },
	];
	tableColumnsDisplay = [
		'order',
		'name',
		'observation',
		'dateUptade',
		'sys_checkbox',
		'sys_edit',
		'sys_delete',
	];
	tableObservationsCommentsSelection: SelectionModel<any> = new SelectionModel<any>(true, []);
	progress;
	disabledSubmit = true;
	disabledBtnFinish = true;
	disabledToRefuse = false;
	disabledToAccept = false;
	submitted = false;
	mapLabel: Map<string, string>;
	constructor(
		private formBuilder: FormBuilder,
		public globalService: GlobalService,
		public toastr: ToastrManager,
		public eventService: EventService,
		private securityService: SecurityService,
		private datePipe: DatePipe,
		private confirmationDialogService: ConfirmationDialogService,
		private masterCatalogService: MasterCatalogService,
		private binnacleService: BinnacleService,
		private estatusMaestroService: EstatusMaestroService
	) {
		this.loadCatalog();
	}

	ngOnInit() {
		console.dir(this.catalogType);
		this.mapLabel = new Map();
		this.mapLabel.set('binnacleEventID', 'Id');
		this.mapLabel.set('dateTimeStart', 'Fecha Inicial');
		this.mapLabel.set('dateTimeEnd', 'Fecha Final');
		this.mapLabel.set('eventsClassificationId', 'Clasificación de Eventos');
		this.mapLabel.set('eventsId', 'Eventos');
		this.mapLabel.set('fuelsId', 'Combustible');
		this.mapLabel.set('powerMw', 'Potencia MW');
		this.mapLabel.set('unitsId', 'Unidad');
		this.mapLabel.set('impactContractsId', 'Contrato Impactado');
		this.mapLabel.set('realsCcdvId', 'Real-CCDV');
		this.mapLabel.set('toleranceBandsId', 'Banda de Tolerancia');
		this.mapLabel.set('marketTypesId', 'Tipo de Mercado');
		this.mapLabel.set('mwOffered', 'MW Ofertados');
		this.mapLabel.set('relatedServicesId', 'Servicios Conexos');
		this.mapLabel.set('licenseNumber', '# Licencia');
		this.mapLabel.set('equipmentId', 'Equipo');
		this.mapLabel.set('initialCharge', 'Carga Inicial');
		this.mapLabel.set('finalCharge', 'Carga Final');
		this.mapLabel.set('mwPowerLoss', '(-) Perdida Potencia MW');
		this.mapLabel.set('workOrderId', 'Orden de Trabajo');
		this.mapLabel.set('licenseDescription', 'Descripción / Concepto de la Licencia');
		this.mapLabel.set('plantOperatorOpened', 'Nombre(s)/Apellidos(s) Operador Planta Abrió');
		this.mapLabel.set('cenaceOperatorOpened', 'Nombre(s)/Apellidos(s) Operador CENACE Abrió');
		this.mapLabel.set('plantOperatorClosed', 'Nombre(s)/Apellidos(s) Operador Planta Cerro');
		this.mapLabel.set('cenaceOperatorClosed', 'Nombre(s)/Apellidos(s) Operador CENACE Cerro');
		this.mapLabel.set('sourceEventId', 'Fuente del Evento');
		this.lstRequired = [];
		switch (this.catalogType.action) {
			case 'nuevo':
				this.actionPage = 'Add';
				break;
			case 'editar':
				this.actionPage = 'Edit';
				break;
			case 'ver':
				this.actionPage = 'See';
				break;
		}

		this.fileUploadForm = this.formBuilder.group({
			file: new FormControl(null),
		});
		this.formobservationsComments = this.formBuilder.group({
			observationsComments: [{ value: null, disabled: false }, [Validators.minLength(4), Validators.maxLength(2000)]]
		});
		this.formTemp = this.formBuilder.group(
			{
				dateTimeStart: [{ value: new Date(), disabled: false }, Validators.required],
				dateTimeEnd: [{ value: new Date(), disabled: false }, Validators.required],
				ha: [{ value: '00', disabled: false }, Validators.required],
				ma: [{ value: '00', disabled: false }, Validators.required],
				hb: [{ value: '00', disabled: false }, Validators.required],
				mb: [{ value: '00', disabled: false }, Validators.required]
			}
		);
		this.formNewEvent = this.formBuilder.group(
			{
				binnacleEventID: ['', null],
				dateTimeStart : [{ value: null, disabled: false }, Validators.required],
				dateTimeEnd   : [{ value: null, disabled: false }],
				eventsClassificationId   : [{ value: null, disabled: false }, Validators.required],
				eventsId: [{ value: null, disabled: false }, Validators.required],
				fuelsId : [{ value: null, disabled: true }],
				powerMw: [{ value: null, disabled: true }],
				unitsId: [{ value: null, disabled: true }],
				impactContractsId: [{ value: null, disabled: true }],
				realsCcdvId: [{ value: null, disabled: true }],
				toleranceBandsId: [{ value: null, disabled: true }],
				marketTypesId: [{ value: null, disabled: true }],
				mwOffered: [{ value: null, disabled: true }],
				relatedServicesId: [{ value: null, disabled: true }],
				licenseNumber: [{ value: null, disabled: true }],
				equipmentId: [{ value: null, disabled: true }],
				initialCharge: [{ value: null, disabled: true }],
				finalCharge: [{ value: null, disabled: true }],
				mwPowerLoss: [{ value: null, disabled: true }],
				workOrderId: [{ value: null, disabled: true }],
				licenseDescription: [{ value: null, disabled: true }],
				plantOperatorOpened: [{ value: null, disabled: true }],
				cenaceOperatorOpened: [{ value: null, disabled: true }],
				plantOperatorClosed: [{ value: null, disabled: true }],
				cenaceOperatorClosed: [{ value: null, disabled: true }],
				sourceEventId: [{ value: null, disabled: true }],
				estatusEvento: [{ value: null, disabled: true }],
				estatusEventoId: [],
				estatusAprobacionId: [],
				estatusAprobacion: [{ value: null, disabled: true }],
				eventActivated: [{ value: true, disabled: true }]
			}
		);
		this.setTableObservationsCommentsSelectionChecked();
	}
	setTableObservationsCommentsSelectionChecked() {
		this.tableObservationsCommentsSelection.select(...this.tableObservationsComments.filter(e => e.visible === true));
	}
	getTableObservationsCommentsSelectionChecked() {
		const seleccionados = this.tableObservationsCommentsSelection.selected;
	}
	onChangeDateTimeStart() {
		// dateTimeStart: "2020-07-25T20:28"
		const dateTimeStart = this.datePipe.transform(new Date(this.formTemp.get('dateTimeStart').value) , 'yyyy-MM-dd') + 'T' + this.formTemp.get('ha').value + ':' + this.formTemp.get('ma').value;
		this.formNewEvent.get('dateTimeStart').setValue(dateTimeStart);
	}
	onChangeDateTimeEnd() {
		// dateTimeStart: "2020-07-25T20:28"
		const dateTimeStart = this.datePipe.transform(new Date(this.formTemp.get('dateTimeEnd').value) , 'yyyy-MM-dd') + 'T' + this.formTemp.get('hb').value + ':' + this.formTemp.get('mb').value;
		this.formNewEvent.get('dateTimeEnd').setValue(dateTimeStart);
	}
	loadSelect(selectCombo: Array<any>, catalog: Array<MaestroOpcionDTO>) {
		if (catalog !== null) {
			catalog.forEach((element: MaestroOpcionDTO) => {
				selectCombo.push({id: element.maestroOpcionId, label: element.opcion.codigo, maestroOpcionId: element.maestroOpcionId});
			});
			selectCombo.sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()));
		}
	}

	loadSelectTemplate(selectCombo: Array<any>, opciones: Array<number>) {
		const listPaso = [];
		if (opciones !== null) {
			opciones.forEach(option => {
				selectCombo.forEach( element => {
					if (element.id === option) {
						listPaso.push(element);
					}
				});
			});
			listPaso.sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()));
		}
		return listPaso;
	}

	onBuildEventAssociated(event) {
		this.lstEvents = [];
		this.loadSelect(this.lstEvents, this.lstEventsDTO.filter(a => a.opcionPadreId === event.value));
	}
	onBuildTemplate(event) {
		if (event == null) {
			return;
		}
		this.binnacleService.obtenTemplate(this.formNewEvent.controls.eventsClassificationId.value, event).subscribe(
			(data: BinnacleEventConfigurationDTO) => {
				if (data !== null) {
					this.templateConfiguration = data;

					if (this.templateConfiguration.disabledFuelsId) {
						this.formNewEvent.controls.fuelsId.disable();
					} else {
						this.formNewEvent.controls.fuelsId.enable();
						if (this.templateConfiguration.requiredFuelsId) {
							this.lstRequired.push('fuelsId');
							this.formNewEvent.controls.fuelsId.setValidators(Validators.required);
						}
					}
					this.lstFuels = this.loadSelectTemplate(this.lstFuelsAll, this.templateConfiguration.fuelsId);

					if (this.templateConfiguration.disabledLicenseDescription) {
						this.formNewEvent.controls.licenseDescription.disable();
					} else {
						this.formNewEvent.controls.licenseDescription.enable();
						if (this.templateConfiguration.requiredLicenseDescription) {
							this.lstRequired.push('licenseDescription');
							this.formNewEvent.controls.licenseDescription.setValidators([Validators.required, Validators.minLength(4), Validators.maxLength(2000)]);
						}

					}
					if (this.templateConfiguration.licenseDescription !==  null) {
						this.formNewEvent.controls.licenseDescription.setValue(this.templateConfiguration.licenseDescription);
					}

					if (this.templateConfiguration.disabledEquipmentId) {
						this.formNewEvent.controls.equipmentId.disable();
					} else {
						this.formNewEvent.controls.equipmentId.enable();
						if (this.templateConfiguration.requiredEquipmentId) {
							this.lstRequired.push('equipmentId');
							this.formNewEvent.controls.equipmentId.setValidators(Validators.required);
						}
					}
					this.lstEquipment = this.loadSelectTemplate(this.lstEquipmentAll, this.templateConfiguration.equipmentId);

					if (this.templateConfiguration.disabledFinalCharge) {
						this.formNewEvent.controls.finalCharge.disable();
					} else {
						this.formNewEvent.controls.finalCharge.enable();
						if (this.templateConfiguration.requiredFinalCharge) {
							this.lstRequired.push('finalCharge');
							this.formNewEvent.controls.finalCharge.setValidators([Validators.required, Validators.pattern(/(^-?\d+$|^-?\d+\.\d+$)/)]);
							const arrayValidator = [];
							arrayValidator.push(Validators.required);
							arrayValidator.push(Validators.pattern(/(^-?\d+$|^-?\d+\.\d+$)/));
							if (this.templateConfiguration.finalChargeLimitLower !== null) {
								arrayValidator.push(Validators.min(this.templateConfiguration.finalChargeLimitLower));
							}
							if (this.templateConfiguration.finalChargeLimitUpper !== null) {
								arrayValidator.push(Validators.max(this.templateConfiguration.finalChargeLimitUpper));
							}
							this.formNewEvent.controls.finalCharge.setValidators(arrayValidator);
						}
					}
					if (this.templateConfiguration.finalCharge !==  null) {
						this.formNewEvent.controls.finalCharge.value(this.templateConfiguration.finalCharge);
					}

					if (this.templateConfiguration.disabledInitialCharge) {
						this.formNewEvent.controls.initialCharge.disable();
					} else {
						this.formNewEvent.controls.initialCharge.enable();
						if (this.templateConfiguration.requiredInitialCharge) {
							this.lstRequired.push('initialCharge');
							const arrayValidator = [];
							arrayValidator.push(Validators.required);
							arrayValidator.push(Validators.pattern(/(^-?\d+$|^-?\d+\.\d+$)/));
							if (this.templateConfiguration.initialChargeLimitLower !== null) {
								arrayValidator.push(Validators.min(this.templateConfiguration.initialChargeLimitLower));
							}
							if (this.templateConfiguration.initialChargeLimitUpper !== null) {
								arrayValidator.push(Validators.max(this.templateConfiguration.initialChargeLimitUpper));
							}
							this.formNewEvent.controls.initialCharge.setValidators(arrayValidator);
						}
					}
					if (this.templateConfiguration.initialCharge !==  null) {
						this.formNewEvent.controls.initialCharge.value(this.templateConfiguration.initialCharge);
					}


					if (this.templateConfiguration.disabledImpactContractsId) {
						this.formNewEvent.controls.impactContractsId.disable();
					} else {
						this.formNewEvent.controls.impactContractsId.enable();
						if (this.templateConfiguration.requiredImpactContractsId) {
							this.lstRequired.push('impactContractsId');
							this.formNewEvent.controls.impactContractsId.setValidators(Validators.required);
						}
					}
					this.lstImpactContracts = this.loadSelectTemplate(this.lstImpactContractsAll, this.templateConfiguration.impactContractsId);

					if (this.templateConfiguration.disabledLicenseNumber) {
						this.formNewEvent.controls.licenseNumber.disable();
					} else {
						this.formNewEvent.controls.licenseNumber.enable();
						if (this.templateConfiguration.requiredLicenseNumber) {
							this.lstRequired.push('licenseNumber');
							this.formNewEvent.controls.licenseNumber.setValidators([Validators.required]);
						}
					}
					if (this.templateConfiguration.licenseNumber !==  null) {
						this.formNewEvent.controls.licenseNumber.value(this.templateConfiguration.licenseNumber);
					}

					if (this.templateConfiguration.disabledMarketTypesId) {
						this.formNewEvent.controls.marketTypesId.disable();
					} else {
						this.formNewEvent.controls.marketTypesId.enable();
						if (this.templateConfiguration.requiredMarketTypesId) {
							this.lstRequired.push('marketTypesId');
							this.formNewEvent.controls.marketTypesId.setValidators(Validators.required);
						}
					}
					this.lstMarketTypes = this.loadSelectTemplate(this.lstMarketTypesAll, this.templateConfiguration.marketTypesId);

					if (this.templateConfiguration.disabledMwOffered) {
						this.formNewEvent.controls.mwOffered.disable();
					} else {
						this.formNewEvent.controls.mwOffered.enable();
						if (this.templateConfiguration.requiredMwOffered) {
							this.lstRequired.push('mwOffered');
							const arrayValidator = [];
							arrayValidator.push(Validators.required);
							arrayValidator.push(Validators.pattern(/(^-?\d+$|^-?\d+\.\d+$)/));
							if (this.templateConfiguration.mwOfferedLimitLower !== null) {
								arrayValidator.push(Validators.min(this.templateConfiguration.mwOfferedLimitLower));
							}
							if (this.templateConfiguration.mwOfferedLimitUpper !== null) {
								arrayValidator.push(Validators.max(this.templateConfiguration.mwOfferedLimitUpper));
							}
							this.formNewEvent.controls.mwOffered.setValidators(arrayValidator);
						}
					}
					if (this.templateConfiguration.mwOffered !==  null) {
						this.formNewEvent.controls.mwOffered.value(this.templateConfiguration.mwOffered);
					}

					if (this.templateConfiguration.disabledMwPowerLoss) {
						this.formNewEvent.controls.mwPowerLoss.disable();
					} else {
						this.formNewEvent.controls.mwPowerLoss.enable();
						if (this.templateConfiguration.requiredMwPowerLoss) {
							this.lstRequired.push('mwPowerLoss');
							const arrayValidator = [];
							arrayValidator.push(Validators.required);
							arrayValidator.push(Validators.pattern(/(^-?\d+$|^-?\d+\.\d+$)/));
							if (this.templateConfiguration.mwPowerLossLimitLower !== null) {
								arrayValidator.push(Validators.min(this.templateConfiguration.mwPowerLossLimitLower));
							}
							if (this.templateConfiguration.mwPowerLossLimitUpper !== null) {
								arrayValidator.push(Validators.max(this.templateConfiguration.mwPowerLossLimitUpper));
							}
							this.formNewEvent.controls.mwPowerLoss.setValidators(arrayValidator);
						}
					}
					if (this.templateConfiguration.mwPowerLoss !==  null) {
						this.formNewEvent.controls.mwPowerLoss.value(this.templateConfiguration.mwPowerLoss);
					}

					if (this.templateConfiguration.disabledPowerMw) {
						this.formNewEvent.controls.powerMw.disable();
					} else {
						this.formNewEvent.controls.powerMw.enable();
						if (this.templateConfiguration.requiredPowerMw) {
							this.lstRequired.push('powerMw');
							const arrayValidator = [];
							arrayValidator.push(Validators.required);
							arrayValidator.push(Validators.pattern(/(^-?\d+$|^-?\d+\.\d+$)/));
							if (this.templateConfiguration.powerMwLimitLower !== null) {
								arrayValidator.push(Validators.min(this.templateConfiguration.powerMwLimitLower));
							}
							if (this.templateConfiguration.powerMwLimitUpper !== null) {
								arrayValidator.push(Validators.max(this.templateConfiguration.powerMwLimitUpper));
							}
							this.formNewEvent.controls.powerMw.setValidators(arrayValidator);
						}
					}
					if (this.templateConfiguration.powerMw !==  null) {
						this.formNewEvent.controls.powerMw.value(this.templateConfiguration.powerMw);
					}

					if (this.templateConfiguration.disabledRealsCcdvId) {
						this.formNewEvent.controls.realsCcdvId.disable();
					} else {
						this.formNewEvent.controls.realsCcdvId.enable();
						if (this.templateConfiguration.requiredRealsCcdvId) {
							this.lstRequired.push('realsCcdvId');
							this.formNewEvent.controls.realsCcdvId.setValidators(Validators.required);
						}
					}
					this.lstRealsCcdv = this.loadSelectTemplate(this.lstRealsCcdvAll, this.templateConfiguration.realsCcdvId);

					if (this.templateConfiguration.disabledRelatedServicesId) {
						this.formNewEvent.controls.relatedServicesId.disable();
					} else {
						this.formNewEvent.controls.relatedServicesId.enable();
						if (this.templateConfiguration.requiredRelatedServicesId) {
							this.lstRequired.push('relatedServicesId');
							this.formNewEvent.controls.relatedServicesId.setValidators(Validators.required);
						}
					}
					this.lstSelatedServices = this.loadSelectTemplate(this.lstSelatedServicesAll, this.templateConfiguration.relatedServicesId);

					if (this.templateConfiguration.disabledToleranceBandsId) {
						this.formNewEvent.controls.toleranceBandsId.disable();
					} else {
						this.formNewEvent.controls.toleranceBandsId.enable();
						if (this.templateConfiguration.requiredToleranceBandsId) {
							this.lstRequired.push('toleranceBandsId');
							this.formNewEvent.controls.toleranceBandsId.setValidators(Validators.required);
						}
					}
					this.lstToleranceBands = this.loadSelectTemplate(this.lstToleranceBandsAll, this.templateConfiguration.toleranceBandsId);

					if (this.templateConfiguration.disabledUnitsId) {
						this.formNewEvent.controls.unitsId.disable();
					} else {
						this.formNewEvent.controls.unitsId.enable();
						if (this.templateConfiguration.requiredUnitsId) {
							this.lstRequired.push('unitsId');
							this.formNewEvent.controls.unitsId.setValidators(Validators.required);
						}
					}
					this.lstUnits = this.loadSelectTemplate(this.lstUnitsAll, this.templateConfiguration.unitsId);

					if (this.templateConfiguration.disabledWorkOrderId) {
						this.formNewEvent.controls.workOrderId.disable();
					} else {
						this.formNewEvent.controls.workOrderId.enable();
						if (this.templateConfiguration.requiredWorkOrderId) {
							this.lstRequired.push('workOrderId');
							this.formNewEvent.controls.workOrderId.setValidators([Validators.required, Validators.minLength(4), Validators.maxLength(500)]);
						}
					}
					if (this.templateConfiguration.workOrderId !==  null) {
						this.formNewEvent.controls.workOrderId.setValue(this.templateConfiguration.workOrderId);
					}

					if (this.templateConfiguration.disabledCenaceOperatorOpened) {
						this.formNewEvent.controls.cenaceOperatorOpened.disable();
					} else {
						this.formNewEvent.controls.cenaceOperatorOpened.enable();
						if (this.templateConfiguration.requiredCenaceOperatorOpened) {
							this.lstRequired.push('cenaceOperatorOpened');
							this.formNewEvent.controls.cenaceOperatorOpened.setValidators(Validators.required);
						}
					}
					if (this.templateConfiguration.cenaceOperatorOpened !==  null) {
						this.formNewEvent.controls.cenaceOperatorOpened.setValue(this.templateConfiguration.cenaceOperatorOpened);
					}

					if (this.templateConfiguration.disabledCenaceOperatorClosed) {
						this.formNewEvent.controls.cenaceOperatorClosed.disable();
					} else {
						this.formNewEvent.controls.cenaceOperatorClosed.enable();
						if (this.templateConfiguration.requiredCenaceOperatorClosed) {
							this.lstRequired.push('cenaceOperatorClosed');
							this.formNewEvent.controls.cenaceOperatorClosed.setValidators(Validators.required);
						}
					}
					if (this.templateConfiguration.cenaceOperatorClosed !==  null) {
						this.formNewEvent.controls.cenaceOperatorClosed.setValue(this.templateConfiguration.cenaceOperatorClosed);
					}

					if (this.templateConfiguration.disabledSourceEventId) {
						this.formNewEvent.controls.sourceEventId.disable();
					} else {
						this.formNewEvent.controls.sourceEventId.enable();
						if (this.templateConfiguration.requiredSourceEventId) {
							this.lstRequired.push('sourceEventId');
							this.formNewEvent.controls.sourceEventId.setValidators(Validators.required);
						}
					}
					this.lstSourceEvent = this.loadSelectTemplate(this.lstSourceEventAll, this.templateConfiguration.sourceEventId);
					this.disabledBtnFinish = false;
					this.disabledSubmit = false;
				} else {
					this.ngOnInit();
					this.disabledBtnFinish = true;
					this.disabledSubmit = true;
					this.toastr.warningToastr('El template para el evento: ' + event.label  + ': Aun no es Configurado.', 'Advertencia!');
				}
			},
			errorData => {
				this.ngOnInit();
				this.disabledBtnFinish = true;
				this.disabledSubmit = true;
				this.toastr.errorToastr(errorData.error.message, 'Error!');
			},
			() => {
				console.log('RTC');
			});
	}
	loadCatalogStatus(entidad: string, lstStatus: IdLabel[]) {
		this.estatusMaestroService.getCatalogoEntidad(entidad).subscribe((data: Array<EntidadEstatusDTO>)  => {
			data.forEach((element: EntidadEstatusDTO) => {
				lstStatus.push({id: element.entidadEstatusId, label: element.estatus.nombre});
			});
		}, errorData => {
				return '';
			});
	}
	isStatus(nameStatus: string, idEstatus: number, lstEntidadEstaus: IdLabel[]) {
		let returnValue = false;
		lstEntidadEstaus.forEach((element: IdLabel) => {
			if (element.label === nameStatus) {
				if (element.id === idEstatus) {
					returnValue = true;
				}
			}
		});
		return returnValue;
	}
	getIdEstatusEvent(nameStatus: string, lstEntidadEstaus: IdLabel[]) {
		let returnValue: string | number;
		lstEntidadEstaus.forEach(element => {
			if (element.label === nameStatus) {
				returnValue = element.id;
			}
		});
		return returnValue;
	}
	loadCatalog() {
		const names = ['CLASIFICA EVENTO', 'EVENTO', 'COMBUSTIBLE', 'UNIDAD', 'CONTRATO IMPACTADO', 'REAL-CCDV', 'BANDA TOLERANCIA',
		'TIPO MERCADO MEM', 'SERVICIOS CONEXOS MEM', 'EQUIPO', 'FUENTE EVENTO'];
		this.masterCatalogService.listCatalog(names).subscribe(data  => {
			this.loadSelect(this.lstEventClassification, data['CLASIFICA EVENTO']);
			this.lstEventClassificationDTO = data['CLASIFICA EVENTO'];
			this.lstEventsDTO = data['EVENTO'];
			this.loadSelect(this.lstFuelsAll, data['COMBUSTIBLE']);
			this.loadSelect(this.lstUnitsAll, data['UNIDAD']);
			this.loadSelect(this.lstImpactContractsAll, data['CONTRATO IMPACTADO']);
			this.loadSelect(this.lstRealsCcdvAll, data['REAL-CCDV']);
			this.loadSelect(this.lstToleranceBandsAll, data['BANDA TOLERANCIA']);
			this.loadSelect(this.lstMarketTypesAll, data['TIPO MERCADO MEM']);
			this.loadSelect(this.lstSelatedServicesAll, data['SERVICIOS CONEXOS MEM']);
			this.loadSelect(this.lstEquipmentAll, data['EQUIPO']);
			this.loadSelect(this.lstSourceEventAll, data['FUENTE EVENTO']);
		},
		errorData => {
			this.addBlock(2, '');
			this.toastr.errorToastr(errorData.error.message, 'Error!');
		},
		() => {
			if (this.catalogType.action === 'editar') {
				if (this.catalogType.element.estatusEvento === 'Evento Cerrado' || this.catalogType.element.estatusEvento === 'Evento Terminado') {
					this.commonDisabled();
					this.disabledSubmit = true;
					this.disabledBtnFinish = true;
					if (this.catalogType.element.estatusAprobacion === 'Evento Aprobado') {
						this.disabledToAccept = true;
					}
				} else {
					this.commonEnabled();
				}
				if (this.catalogType.element.observations !== null) {
					this.catalogType.element.observations.forEach( (obs: NoteDTO) => {
						this.tableObservationsComments = this.tableObservationsComments.concat({
							order: this.tempOrder, name: obs.usuario, observation: obs.note, dateUptade: obs.updateString, visible: obs.visible
						});
						this.tempOrder ++;
					});
				}

				this.files = this.catalogType.element.bearers;
			}
			if (this.catalogType.action === 'ver') {
				if (this.catalogType.element.observations !== null) {
					this.catalogType.element.observations.forEach( (obs: NoteDTO) => {
						this.tableObservationsComments = this.tableObservationsComments.concat({
							order: this.tempOrder, name: obs.usuario, observation: obs.note, dateUptade: obs.updateString, visible: obs.visible
						});
						this.tempOrder ++;
					});
				}

				this.files = this.catalogType.element.bearers;
				this.disabledSubmit = true;
				this.disabledBtnFinish = true;
				this.commonDisabled();
			}
			this.loadCatalogStatus('TX_BINNACLE_EVENT', this.lstApprovalStatus);
			this.loadCatalogStatus('TX_BINNACLE_EVENT_II', this.lstEventStatus);
		});
	}
	isValidDates() {
		let returValue = true;
		const a = this.datePipe.transform(new Date(this.formTemp.get('dateTimeStart').value) , 'yyyy-MM-dd') + 'T' + this.formTemp.get('ha').value + ':' + this.formTemp.get('ma').value;
		const b = this.datePipe.transform(new Date(this.formTemp.get('dateTimeEnd').value) , 'yyyy-MM-dd') + 'T' + this.formTemp.get('hb').value + ':' + this.formTemp.get('mb').value;
		const comparation = moment(a).toDate().getTime() - moment(b).toDate().getTime();
		if (comparation >= 0) {
			returValue = false;
		}
		return returValue;
	}
	commonDisabled() {
		this.onBuildTemplate(this.catalogType.element.eventsId);
		this.formNewEvent.patchValue(this.catalogType.element);
		this.formTemp.patchValue(this.catalogType.element);
		this.formTemp.controls.dateTimeStart.patchValue(new Date(this.catalogType.element.dateTimeStart));
		this.formTemp.controls.dateTimeEnd.patchValue(new Date(this.catalogType.element.dateTimeEnd));

		this.formNewEvent.controls.dateTimeStart.patchValue(moment(this.catalogType.element.dateTimeStart).format('YYYY-MM-DDTHH:mm:ss'));
		this.formNewEvent.controls.dateTimeEnd.patchValue(moment(this.catalogType.element.dateTimeEnd).format('YYYY-MM-DDTHH:mm:ss'));
		this.loadSelect(this.lstEvents, this.lstEventsDTO.filter(a => a.opcionPadreId === this.catalogType.element.eventsClassificationId));
		setTimeout(() => this.formNewEvent.disable(), 2000);
		setTimeout(() => this.fileUploadForm.disable(), 2000);
		setTimeout(() => this.formobservationsComments.disable(), 2000);
		setTimeout(() => this.formTemp.disable(), 2000);
	}
	commonEnabled() {
		this.onBuildTemplate(this.catalogType.element.eventsId);
		this.formNewEvent.patchValue(this.catalogType.element);
		this.formTemp.patchValue(this.catalogType.element);
		this.formTemp.controls.dateTimeStart.patchValue(new Date(this.catalogType.element.dateTimeStart));
		this.formTemp.controls.dateTimeEnd.patchValue(new Date(this.catalogType.element.dateTimeEnd));
		this.formNewEvent.controls.dateTimeStart.patchValue(moment(this.catalogType.element.dateTimeStart).format('YYYY-MM-DDTHH:mm:ss'));
		this.formNewEvent.controls.dateTimeEnd.patchValue(moment(this.catalogType.element.dateTimeEnd).format('YYYY-MM-DDTHH:mm:ss'));
		this.loadSelect(this.lstEvents, this.lstEventsDTO.filter(a => a.opcionPadreId === this.catalogType.element.eventsClassificationId));
		this.formNewEvent.controls.eventsClassificationId.disable();
		this.formNewEvent.controls.eventsId.disable();
		this.formNewEvent.controls.estatusAprobacionId.enable();
	}
	onSubmitFormNewEvent() {
		let mensaje = '';
		let controlValid = true;
		if (this.formNewEvent.controls.eventsClassificationId.value == null) {
			mensaje += 'La clasificacion de evento es requerida.';
			controlValid = false;
		} else {
			if (this.formNewEvent.controls.eventsId.value == null) {
				mensaje += ' El evento es requerido.';
				controlValid = false;
			}
		}

		if (!controlValid) {
			controlValid = true;
			this.toastr.warningToastr(mensaje, 'Advertencia!.');
			return;
		}
		this.formValid = true;
		if (this.formNewEvent.controls.plantOperatorOpened.value !== null) {
			this.formNewEvent.controls.plantOperatorOpened.patchValue(JSON.parse(localStorage.getItem('user')).username);
		}

		this.onSubmit();
	}
	onSubmit() {
		this.onChangeDateTimeStart();
		this.onChangeDateTimeEnd();
		if (!this.isValidDates()) {
			this.toastr.errorToastr('La fecha de inicio, debe ser menor a la fecha final del evento', 'Error!');
			return;
		}
		this.formNewEvent.enable();
		this.addBlock(1, '');
		const binnacle: BinnacleEventDTO = this.formNewEvent.value;
		binnacle.observations = this.newNotes;
		binnacle.bearers = this.newFiles;
		this.binnacleService.saveBinnacle(binnacle).subscribe(
			data => {
				this.toastr.successToastr('Guardado Completo', 'Exito!');
				this.formNewEvent.disable();
				this.addBlock(2, '');
			},
			errorData => {
				this.addBlock(2, '');
				this.toastr.errorToastr(errorData.error.message, 'Error!');
			}, () => {
				const type = {};
				this.eventService.sendChangePage(
					new EventMessage(null, type, 'Safe.SafeListOfEventsComponent')
				);
			});
	}
	btnClickBack() {
		const type = {};
		this.eventService.sendChangePage(
			new EventMessage(null, type, 'Safe.SafeListOfEventsComponent')
		);
	}

	BtnAddObservationsComments() {
		const observation = this.formobservationsComments.get('observationsComments').value;
		if (observation != null && observation !== '') {
			this.tableObservationsComments = this.tableObservationsComments.concat({
				order: this.tempOrder, name: this.getNameUser(), observation, dateUptade: moment(new Date()).format('YYYY-MM-DD'), visible: true
			});
			const noteDTO: NoteDTO = new NoteDTO();
			noteDTO.note = observation;
			noteDTO.visible = true
			this.newNotes.push(noteDTO);

			this.tempOrder ++;
			this.formobservationsComments.get('observationsComments').setValue('');

			const observations: Array<NoteDTO> = [];
		}
		this.getTableObservationsCommentsSelectionChecked();
	}

	btnUploadFile() {
		const value = this.fileUploadForm.value;
		const reader = new FileReader();
		reader.onloadend = (e) => {
			const fileBearer: BearerDTO = new BearerDTO();
			this.file = reader.result;
			this.file = this.file.replace(/^data:(.*;base64,)?/, '');
			this.file = this.file.trim();
			fileBearer.bearerData = this.file;
			fileBearer.bearerName = value.file.name;
			const splitName: string[] = fileBearer.bearerName.split('.');
			fileBearer.bearerContentType = this.getContentType(splitName[1]);
			this.newFiles.push(fileBearer);
			this.files.push(fileBearer);
		}
		reader.readAsDataURL(value.file);
	}

	getContentType(extencion) {
		let contentType = '';
		switch (extencion) {
			case'aac':
				contentType =  'audio/aac';
				break;
			case'abw':
				contentType =  'application/x-abiword';
				break;
			case'arc':
				contentType =  'application/octet-stream';
				break;
			case'avi':
				contentType =  'video/x-msvideo';
				break;
			case'azw':
				contentType =  'application/vnd.amazon.ebook';
				break;
			case'bin':
				contentType =  'application/octet-stream';
				break;
			case'bz':
				contentType =  'application/x-bzip';
				break;
			case'bz2':
				contentType =  'application/x-bzip2';
				break;
			case'csh':
				contentType =  'application/x-csh';
				break;
			case'css':
				contentType =  'text/css';
				break;
			case'csv':
				contentType =  'text/csv';
				break;
			case'doc':
				contentType =  'application/msword';
				break;
			case'epub':
				contentType =  'application/epub+zip';
				break;
			case'gif':
				contentType =  'image/gif';
				break;
			case'htm':
			case'html':
				contentType =  'text/html';
				break;
			case'ico':
				contentType =  'image/x-icon';
				break;
			case'ics':
				contentType =  'text/calendar';
				break;
			case'jar':
				contentType =  'application/java-archive';
				break;
			case'jpeg':
			case'jpg':
				contentType =  'image/jpeg';
				break;
			case'js':
				contentType =  'application/javascript';
				break;
			case'json':
				contentType =  'application/json';
				break;
			case'mid':
				contentType =  'audio/midi';
				break;
			case'mpeg':
				contentType =  'video/mpeg';
				break;
			case'mpkg':
				contentType =  'application/vnd.apple.installer+xml';
				break;
			case'odp':
				contentType =  'application/vnd.oasis.opendocument.presentation';
				break;
			case'ods':
				contentType =  'application/vnd.oasis.opendocument.spreadsheet';
				break;
			case'odt':
				contentType =  'application/vnd.oasis.opendocument.text';
				break;
			case'oga':
				contentType =  'audio/ogg';
				break;
			case'ogv':
				contentType =  'video/ogg';
				break;
			case'':
				contentType =  '';
				break;
			case'ogx':
				contentType =  '';
				break;
			case'':
				contentType =  'application/ogg';
				break;
			case'pdf':
				contentType =  'application/pdf';
				break;
			case'ppt':
				contentType =  'application/vnd.ms-powerpoint';
				break;
			case'rar':
				contentType =  'application/x-rar-compressed';
				break;
			case'rtf':
				contentType =  'application/rtf';
				break;
			case'sh':
				contentType =  'application/x-sh';
				break;
			case'svg':
				contentType =  'image/svg+xml';
				break;
			case'':
				contentType =  'swf';
				break;
			case'':
				contentType =  'application/x-shockwave-flash';
				break;
			case'tar':
				contentType =  'application/x-tar';
				break;
			case'tif':
			case'tiff':
				contentType =  'image/tiff';
				break;
			case'ttf':
				contentType =  'font/ttf';
				break;
			case'vsd':
				contentType =  'application/vnd.visio';
				break;
			case'wav':
				contentType =  'audio/x-wav';
				break;
			case'weba':
				contentType =  'audio/webm';
				break;
			case'webm':
				contentType =  'video/webm';
				break;
			case'webp':
				contentType =  'image/webp';
				break;
			case'woff':
				contentType =  'font/woff';
				break;
			case'woff2':
				contentType =  'font/woff2';
				break;
			case'xhtml':
				contentType =  'application/xhtml+xml';
				break;
			case'xls':
				contentType =  'application/vnd.ms-excel';
				break;
			case'xml':
				contentType =  'application/xml';
				break;
			case'xul':
				contentType =  'application/vnd.mozilla.xul+xml';
				break;
			case'zip':
				contentType =  'application/zip';
				break;
			case'gp':
				contentType =  'video/3gpp';
				break;
			case'3g2':
				contentType =  'video/3gpp2';
				break;
			case'7z':
				contentType =  'application/x-7z-compressed';
		}

		return contentType;
	}

	btnFinish() {
		const labelArray: Array<string> = [];
		this.formValid = true;
		this.lstRequired.forEach(field => {
			if ( this.formNewEvent.controls[field].value == null) {
				labelArray.push('El campo: ' + this.mapLabel.get(field) + '. Es requerido.');
				this.formValid = false;
			} else {
				if ( typeof(this.formNewEvent.controls[field].value) === 'string') {
					if (this.formNewEvent.controls[field].value.trim().length <= 0) {
						labelArray.push('El campo: ' + this.mapLabel.get(field) + '. Es requerido.');
						this.formValid = false;
					}
				}
			}
		});

		if (this.formValid) {
			this.formNewEvent.controls.estatusEventoId.patchValue(this.getIdEstatusEvent('Evento Terminado', this.lstEventStatus));
			this.formNewEvent.controls.plantOperatorClosed.patchValue(JSON.parse(localStorage.getItem('user')).username);
			this.onSubmit();
		} else {
			labelArray.forEach(label => {
				this.toastr.warningToastr(label, 'Notificacion!');
			});
			return;
		}
	}
	tableRowEdit(element) {
	}
	tableRowDelete(element) {
		this.confirmationDialogService.confirm(
			'Confirmación',
			'¿Está seguro de eliminar el Registro?'
		)
		.then((confirmed) => {
			if ( confirmed ) {
				this.tableObservationsComments = this.tableObservationsComments.filter(
					e => e !== element
				);
			}
		})
		.catch(() => {});
	}
	downloadFile() {
	}
	getNameUser() {
		return this.securityService.getNameUser() + ' ' + this.securityService.getLastNameUser();
	}
	private addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1,
			new EventBlocked(type, msg)));
	}
	btnChangeStatus(statusName: string) {
		this.binnacleService.changeStatus(statusName, this.catalogType.element.binnacleEventID).subscribe(data  => {
			this.toastr.successToastr('Cambio de Estatus Correcto: ' + statusName, 'Exito!.');
		}, errorData => {
			console.dir(errorData);
			this.toastr.errorToastr(errorData.error.message, 'Error!');
		}, () => {
			const type = {};
			this.eventService.sendChangePage(
			new EventMessage(null, type, 'Safe.SafeListOfEventsComponent')
			);
		});
	}
}
