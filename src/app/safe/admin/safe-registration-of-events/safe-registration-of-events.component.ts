/* tslint:disable:indent */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
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

@Component({
	selector: 'app-safe-registration-of-events',
	templateUrl: './safe-registration-of-events.component.html',
	styleUrls: ['./safe-registration-of-events.component.scss']
})
export class SafeRegistrationOfEventsComponent implements OnInit {
	templateConfiguration: BinnacleEventConfigurationDTO;
	formobservationsComments: FormGroup;
	fileUploadForm: FormGroup;
	formNewEvent: FormGroup;

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
	lstEventStatusAll: IdLabel[] = [];
	lstApprovalStatusAll: IdLabel[] = [];

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
	lstApprovalStatus: IdLabel[] = [];
	tempOrder = 3;
	tableObservationsComments = [
		{order:1,name: this.getNameUser(), observation: 'algo', dateUptade: moment(new Date()).format('YYYY-MM-DD'), visible: true},
		{order:2,name: this.getNameUser(), observation: ' algo 2', dateUptade: moment(new Date()).format('YYYY-MM-DD'), visible: false}
	];
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
	constructor(
		private formBuilder: FormBuilder,
		public globalService: GlobalService,
		public toastr: ToastrManager,
		public eventService: EventService,
		private securityService: SecurityService,
		private confirmationDialogService: ConfirmationDialogService,
		private masterCatalogService: MasterCatalogService,
		private binnacleService: BinnacleService
	) { }


	ngOnInit() {
		this.loadCatalog();
		this.fileUploadForm = this.formBuilder.group({
			file: new FormControl(null, [Validators.required, requiredFileType('zip')]),
		});
		this.formobservationsComments = this.formBuilder.group({
			observationsComments: [{ value: null, disabled: false }, [Validators.minLength(4),Validators.maxLength(2000)]]
		});
		this.formNewEvent = this.formBuilder.group(
			{
				binnacleEventID: ['', null],
				dateTimeStart : [{ value: null, disabled: false }, Validators.required],
				dateTimeEnd   : [{ value: null, disabled: false }, Validators.required],
				eventsClassificationId   : [{ value: null, disabled: false }, Validators.required],
				eventsId: [{ value: null, disabled: false }, Validators.required],
				fuelsId : [{ value: null, disabled: true }, Validators.required],
				powerMw: [{ value: null, disabled: true }, [Validators.required, Validators.pattern(/(^-?\d+$|^-?\d+\.\d+$)/)]],
				unitsId: [{ value: null, disabled: true }, Validators.required],
				impactContractsId: [{ value: null, disabled: true }, Validators.required],
				realsCcdvId: [{ value: null, disabled: true }, Validators.required],
				toleranceBandsId: [{ value: null, disabled: true }, Validators.required],
				marketTypesId: [{ value: null, disabled: true }, Validators.required],
				mwOffered: [{ value: null, disabled: true }, [Validators.required, Validators.pattern(/(^-?\d+$|^-?\d+\.\d+$)/)]],
				relatedServicesId: [{ value: null, disabled: true }, Validators.required],
				licenseNumber: [{ value: null, disabled: true }, [Validators.required]],
				equipmentId: [{ value: null, disabled: true }, Validators.required],
				initialCharge: [{ value: null, disabled: true }, [Validators.required, Validators.pattern(/(^-?\d+$|^-?\d+\.\d+$)/)]],
				finalCharge: [{ value: null, disabled: true }, [Validators.required, Validators.pattern(/(^-?\d+$|^-?\d+\.\d+$)/)]],
				mwPowerLoss: [{ value: null, disabled: true }, [Validators.required, Validators.pattern(/(^-?\d+$|^-?\d+\.\d+$)/)]],
				workOrderId: [{ value: null, disabled: true }, Validators.required],
				licenseDescription: [{ value: null, disabled: true }, [Validators.required,Validators.minLength(4),Validators.maxLength(2000)]],
				operatorPlantOpen: [{ value: null, disabled: false }, Validators.required],
				operatorCenaceOpen: [{ value: null, disabled: false }, Validators.required],
				operatorPlantClose: [{ value: null, disabled: false }, Validators.required],
				operatorCenaceClose: [{ value: null, disabled: false }, Validators.required],
				sourceEvent: [{ value: null, disabled: false }, Validators.required],
				eventStatus: [{ value: null, disabled: false }, Validators.required],
				approvalStatus: [{ value: null, disabled: false }, Validators.required],
				eventActivated: [{ value: true, disabled: false }]
			}
		);
		this.setTableObservationsCommentsSelectionChecked();
	}
	setTableObservationsCommentsSelectionChecked() {
		this.tableObservationsCommentsSelection.select(...this.tableObservationsComments.filter(e=>e.visible===true));
	}
	getTableObservationsCommentsSelectionChecked() {
		const seleccionados = this.tableObservationsCommentsSelection.selected;
	}

	loadSelect(selectCombo: Array<any>, catalog: Array<MaestroOpcionDTO>) {
		if (catalog !== null) {
			catalog.forEach((element: MaestroOpcionDTO) => {
				selectCombo.push({id: element.maestroOpcionId, label: element.opcion.codigo, maestroOpcionId: element.maestroOpcionId});
			});
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
		}
		return listPaso;
	}

	onBuildEventAssociated(event) {
		this.lstEvents = [];
		this.loadSelect(this.lstEvents, this.lstEventsDTO.filter(a => a.opcionPadreId === event.value));
	}
	onBuildTemplate(event) {
		console.dir(event);
		this.binnacleService.obtenTemplate(event.value).subscribe(
			(data: BinnacleEventConfigurationDTO) => {
				console.dir(data);
				if (data !== null) {
					this.templateConfiguration = data;
					if (this.templateConfiguration.disabledFuelsId) {
						this.formNewEvent.controls.fuelsId.disable();
					} else {
						this.formNewEvent.controls.fuelsId.enable();
					}
					this.lstFuels = this.loadSelectTemplate(this.lstFuelsAll, this.templateConfiguration.fuelsId);

					if (this.templateConfiguration.disabledConceptoLicencia) {
						this.formNewEvent.controls.licenseDescription.disable();
					} else {
						this.formNewEvent.controls.licenseDescription.enable();
					}
					if (this.templateConfiguration.conceptoLicencia !==  null) {
						this.formNewEvent.controls.licenseDescription.value(this.templateConfiguration.conceptoLicencia);
					}

					if (this.templateConfiguration.disabledEquipmentId) {
						this.formNewEvent.controls.equipmentId.disable();
					} else {
						this.formNewEvent.controls.equipmentId.enable();
					}
					this.lstEquipment = this.loadSelectTemplate(this.lstEquipmentAll, this.templateConfiguration.equipmentId);

					if (this.templateConfiguration.disabledFinalCharge) {
						this.formNewEvent.controls.finalCharge.disable();
					} else {
						this.formNewEvent.controls.finalCharge.enable();
					}
					if (this.templateConfiguration.finalCharge !==  null) {
						this.formNewEvent.controls.finalCharge.value(this.templateConfiguration.finalCharge);
					}

					if (this.templateConfiguration.disabledInitialCharge) {
						this.formNewEvent.controls.initialCharge.disable();
					} else {
						this.formNewEvent.controls.initialCharge.enable();
					}
					if (this.templateConfiguration.initialCharge !==  null) {
						this.formNewEvent.controls.initialCharge.value(this.templateConfiguration.initialCharge);
					}

					if (this.templateConfiguration.disabledImpactContractsId) {
						this.formNewEvent.controls.impactContractsId.disable();
					} else {
						this.formNewEvent.controls.impactContractsId.enable();
					}
					this.lstEquipment = this.loadSelectTemplate(this.lstEquipmentAll, this.templateConfiguration.impactContractsId);

					if (this.templateConfiguration.disabledLicenseNumber) {
						this.formNewEvent.controls.licenseNumber.disable();
					} else {
						this.formNewEvent.controls.licenseNumber.enable();
					}
					if (this.templateConfiguration.licenseNumber !==  null) {
						this.formNewEvent.controls.licenseNumber.value(this.templateConfiguration.licenseNumber);
					}

					if (this.templateConfiguration.disabledMarketTypesId) {
						this.formNewEvent.controls.marketTypesId.disable();
					} else {
						this.formNewEvent.controls.marketTypesId.enable();
					}
					this.lstMarketTypes = this.loadSelectTemplate(this.lstMarketTypesAll, this.templateConfiguration.marketTypesId);

					if (this.templateConfiguration.disabledMwOffered) {
						this.formNewEvent.controls.mwOffered.disable();
					} else {
						this.formNewEvent.controls.mwOffered.enable();
					}
					if (this.templateConfiguration.mwOffered !==  null) {
						this.formNewEvent.controls.mwOffered.value(this.templateConfiguration.mwOffered);
					}

					if (this.templateConfiguration.disabledMwPowerLoss) {
						this.formNewEvent.controls.mwPowerLoss.disable();
					} else {
						this.formNewEvent.controls.mwPowerLoss.enable();
					}
					if (this.templateConfiguration.mwPowerLoss !==  null) {
						this.formNewEvent.controls.mwPowerLoss.value(this.templateConfiguration.mwPowerLoss);
					}

					if (this.templateConfiguration.disabledPowerMw) {
						this.formNewEvent.controls.powerMw.disable();
					} else {
						this.formNewEvent.controls.powerMw.enable();
					}
					if (this.templateConfiguration.powerMw !==  null) {
						this.formNewEvent.controls.powerMw.value(this.templateConfiguration.powerMw);
					}

					if (this.templateConfiguration.disabledRealsCcdvId) {
						this.formNewEvent.controls.realsCcdvId.disable();
					} else {
						this.formNewEvent.controls.realsCcdvId.enable();
					}
					this.lstRealsCcdv = this.loadSelectTemplate(this.lstRealsCcdvAll, this.templateConfiguration.realsCcdvId);

					if (this.templateConfiguration.disabledRelatedServicesId) {
						this.formNewEvent.controls.relatedServicesId.disable();
					} else {
						this.formNewEvent.controls.relatedServicesId.enable();
					}
					this.lstSelatedServices = this.loadSelectTemplate(this.lstSelatedServicesAll, this.templateConfiguration.relatedServicesId);

					if (this.templateConfiguration.disabledToleranceBandsId) {
						this.formNewEvent.controls.toleranceBandsId.disable();
					} else {
						this.formNewEvent.controls.toleranceBandsId.enable();
					}
					this.lstToleranceBands = this.loadSelectTemplate(this.lstToleranceBandsAll, this.templateConfiguration.toleranceBandsId);

					console.log(this.templateConfiguration.disabledUnitsId);
					if (this.templateConfiguration.disabledUnitsId) {
						this.formNewEvent.controls.unitsId.disable();
					} else {
						this.formNewEvent.controls.unitsId.enable();
					}
					this.lstUnits = this.loadSelectTemplate(this.lstUnitsAll, this.templateConfiguration.unitsId);

					if (this.templateConfiguration.disabledWorkOrderId) {
						this.formNewEvent.controls.workOrderId.disable();
					} else {
						this.formNewEvent.controls.workOrderId.enable();
					}
					if (this.templateConfiguration.workOrderId !==  null) {
						this.formNewEvent.controls.workOrderId.value(this.templateConfiguration.workOrderId);
					}
				} else {
					this.toastr.warningToastr('El template para el evento: ' + event.label  + ': Aun no es Configurado.', 'Advertencia!');
				}
			},
			errorData => {
				this.toastr.errorToastr(errorData.error.message, 'Error!');
			});
	}


	loadCatalog() {
		const names = ['CLASIFICA EVENTO', 'EVENTO', 'COMBUSTIBLE', 'UNIDAD', 'CONTRATO IMPACTADO', 'REAL/CCDV', 'BANDA TOLERANCIA',
		'TIPO MERCADO MEM', 'SERVICIOS CONEXOS MEM', 'EQUIPO', 'ORDEN TRABAJO'];
		this.masterCatalogService.listCatalog(names).subscribe(data  => {
			this.loadSelect(this.lstEventClassification, data['CLASIFICA EVENTO']);
			this.lstEventClassificationDTO = data['CLASIFICA EVENTO'];
			this.lstEventsDTO = data['EVENTO'];
			this.loadSelect(this.lstFuelsAll, data['COMBUSTIBLE']);
			this.loadSelect(this.lstUnitsAll, data['UNIDAD']);
			this.loadSelect(this.lstImpactContractsAll, data['CONTRATO IMPACTADO']);
			this.loadSelect(this.lstRealsCcdvAll, data['REAL/CCDV']);
			this.loadSelect(this.lstToleranceBandsAll, data['BANDA TOLERANCIA']);
			this.loadSelect(this.lstMarketTypesAll, data['TIPO MERCADO MEM']);
			this.loadSelect(this.lstSelatedServicesAll, data['SERVICIOS CONEXOS MEM']);
			this.loadSelect(this.lstEquipmentAll, data['EQUIPO']);
			this.loadSelect(this.lstWorkOrderAll, data['ORDEN TRABAJO']);
		});
	}
	onSubmitFormNewEvent(v) {
		const casas = moment(v.datetimelocal);
		const dsa = casas.format('YYYY-MM-DD HH:mm:ss');
		this.addBlock(1, '');
		this.binnacleService.saveBinnacle(v).subscribe(
			data => {
				this.toastr.successToastr('Guardado Completo', 'Exito!.');
				this.addBlock(2, '');
			},
			errorData => {
				this.addBlock(2, '');
				this.toastr.errorToastr(errorData.error.message, 'Error!');
			});
	}
	btnClickBack() {
	}
	BtnAddObservationsComments() {
		const observation = this.formobservationsComments.get('observationsComments').value;
		if (observation != null && observation !== '') {
			this.tableObservationsComments = this.tableObservationsComments.concat({
				order:this.tempOrder, name: this.getNameUser(), observation, dateUptade: moment(new Date()).format('YYYY-MM-DD'), visible: true
			});
			this.tempOrder ++;
			this.formobservationsComments.get('observationsComments').setValue('');
		}
		this.getTableObservationsCommentsSelectionChecked();
	}

	btnUploadFile() {
		const file = this.fileUploadForm.get('file').value;
	}
	btnFinish() {
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
}
