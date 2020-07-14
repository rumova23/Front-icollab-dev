/* tslint:disable:indent no-string-literal */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IdLabel } from '../../../../core/models/IdLabel';
import { MaestroOpcionDTO } from '../../../../compliance/models/maestro-opcion-dto';
import { GlobalService } from '../../../../core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EventService } from '../../../../core/services/event.service';
import { SecurityService } from '../../../../core/services/security.service';
import { ConfirmationDialogService } from '../../../../core/services/confirmation-dialog.service';
import { MasterCatalogService } from '../../../services/master-catalog.service';
import { BinnacleService } from '../../../services/binnacle.service';
import { EventMessage } from '../../../../core/models/EventMessage';
import { EventBlocked } from '../../../../core/models/EventBlocked';
import {ContainerClasificaDTO} from '../../../models/container-clasifica-dto';

@Component({
	selector: 'app-safe-configuration-binnacle-edit',
	templateUrl: './safe-configuration-binnacle-edit.component.html',
	styleUrls: ['./safe-configuration-binnacle-edit.component.scss']
})
export class SafeConfigurationBinnacleEditComponent implements OnInit {
	formNewEvent: FormGroup;
	formNewEvent001: FormGroup;
	catalogType: any;
	lstEventClassification: IdLabel[] = [];
	lstEventClassificationDTO: Array<MaestroOpcionDTO>;
	lstFuels: IdLabel[] = [];
	lstEventsDTO: Array<MaestroOpcionDTO>;
	lstEvents: IdLabel[] = [];
	lstUnits: IdLabel[] = [];
	lstImpactContracts: IdLabel[] = [];
	lstRealsCcdv: IdLabel[] = [];
	lstToleranceBands: IdLabel[] = [];
	lstMarketTypes: IdLabel[] = [];
	lstSelatedServices: IdLabel[] = [];
	lstEquipment: IdLabel[] = [];
	lstWorkOrder: IdLabel[] = [];
	lstOperatorPlantOpen: IdLabel[] = [];
	lstOperatorPlantClose: IdLabel[] = [];
	lstSourceEvent: IdLabel[] = [];
	lstEventStatus: IdLabel[] = [];
	lstApprovalStatus: IdLabel[] = [];
	lstEventClassification00: IdLabel[] = [];
	lstEvents00: IdLabel[] = [];
	progress;
	disabledSubmit: boolean;
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
		this.disabledSubmit = true;
		this.formNewEvent001 = this.formBuilder.group({
			eventsClassification00Id: ['', null],
			disabledEventsClassification00Id: [false],
			events00Id: [{ value: null, disabled: true }],
			disabledEvents00Id: [false],
		});
		this.formNewEvent = this.formBuilder.group({
			binnacleEventID: ['', null],

			disabledEventsClassificationId: [false],
			eventsClassificationId: [{ value: null, disabled: false }],

			disabledEventsId: [false],
			eventsId: [{ value: null, disabled: false }],

			fuelsId: [null],
			disabledFuelsId: [false],
			requiredFuelsId: [false],

			powerMw: [{ value: null, disabled: false }],
			disabledPowerMw: [false],
			requiredPowerMw: [false],

			powerMwLimitLower: [{ value: null, disabled: false }],
			disabledPowerMwLimitLower: [false],
			requiredPowerMwLimitLower: [false],

			powerMwLimitUpper: [{ value: null, disabled: false }],
			disabledPowerMwLimitUpper: [false],
			requiredPowerMwLimitUpper: [false],

			unitsId: [null],
			disabledUnitsId: [false],
			requiredUnitsId: [false],

			impactContractsId: [null],
			disabledImpactContractsId: [false],
			requiredImpactContractsId: [false],

			realsCcdvId: [null],
			disabledRealsCcdvId: [false],
			requiredRealsCcdvId: [false],

			toleranceBandsId: [null],
			disabledToleranceBandsId: [false],
			requiredToleranceBandsId: [false],

			marketTypesId: [null],
			disabledMarketTypesId: [false],
			requiredMarketTypesId: [false],

			mwOffered: [{ value: null, disabled: false }],
			disabledMwOffered: [false],
			requiredMwOffered: [false],

			mwOfferedLimitLower: [{ value: null, disabled: false }],
			disabledMwOfferedLimitLower: [false],
			requiredMwOfferedLimitLower: [false],

			mwOfferedLimitUpper: [{ value: null, disabled: false }],
			disabledMwOfferedLimitUpper: [false],
			requiredMwOfferedLimitUpper: [false],



			relatedServicesId: [null],
			disabledRelatedServicesId: [false],
			requiredRelatedServicesId: [false],

			licenseNumber: [{ value: null, disabled: false }],
			disabledLicenseNumber: [false],
			requiredLicenseNumber: [false],

			equipmentId: [null],
			disabledEquipmentId: [false],
			requiredEquipmentId: [false],

			initialCharge: [{ value: null, disabled: false }],
			disabledInitialCharge: [false],
			requiredInitialCharge: [false],

			initialChargeLimitLower: [{ value: null, disabled: false }],
			disabledInitialChargeLimitLower: [false],
			requiredInitialChargeLimitLower: [false],

			initialChargeLimitUpper: [{ value: null, disabled: false }],
			disabledInitialChargeLimitUpper: [false],
			requiredInitialChargeLimitUpper: [false],

			finalCharge: [{ value: null, disabled: false }],
			disabledFinalCharge: [false],
			requiredFinalCharge: [false],

			finalChargeLimitLower: [{ value: null, disabled: false }],
			disabledFinalChargeLimitLower: [false],
			requiredFinalChargeLimitLower: [false],

			finalChargeLimitUpper: [{ value: null, disabled: false }],
			disabledFinalChargeLimitUpper: [false],
			requiredFinalChargeLimitUpper: [false],

			mwPowerLoss: [{ value: null, disabled: false }],
			disabledMwPowerLoss: [false],
			requiredMwPowerLoss: [false],

			mwPowerLossLI: [{ value: null, disabled: false }],
			disabledMwPowerLossLI: [false],
			requiredMwPowerLossLI: [false],

			mwPowerLossLS: [{ value: null, disabled: false }],
			disabledMwPowerLossLS: [false],
			requiredMwPowerLossLS: [false],

			workOrderId: [{ value: null, disabled: false }],
			disabledWorkOrderId: [false],
			requiredWorkOrderId: [false],

			licenseDescription: [{ value: null, disabled: false }],
			disabledLicenseDescription: [false],
			requiredLicenseDescription: [false],

			operatorPlantOpen: [{ value: null, disabled: false }],
			disabledOperatorPlantOpen: [false],
			requiredOperatorPlantOpen: [false],

			operatorCenaceOpen: [{ value: null, disabled: false }],
			disabledOperatorCenaceOpen: [false],
			requiredOperatorCenaceOpen: [false],

			operatorPlantClose: [{ value: null, disabled: false }],
			disabledOperatorPlantClose: [false],
			requiredOperatorPlantClose: [false],

			operatorCenaceClose: [{ value: null, disabled: false }],
			disabledOperatorCenaceClose: [false],
			requiredOperatorCenaceClose: [false],

			sourceEventId: [{ value: null, disabled: false }],
			disabledSourceEventId: [false],
			requiredSourceEventId: [false],

			eventStatus: [{ value: null, disabled: false }],
			disabledEventStatus: [false],
			requiredEventStatus: [false],

			approvalStatus: [{ value: null, disabled: false }],
			disabledApprovalStatus: [false],
			requiredApprovalStatus: [false],

			disabledFile: [false],
			disabledObsComment: [false],

			power001: [{ value: null, disabled: false }],
			disabledPower001: [false],
			requiredPower001: [false],

			mwOffered001: [{ value: null, disabled: false }],
			disabledMwOffered001: [false],
			requiredMwOffered001: [false],

			initialCharge001: [{ value: null, disabled: false }],
			disabledInitialCharge001: [false],
			requiredInitialCharge001: [false],

			finalCharge001: [{ value: null, disabled: false }],
			disabledFinalCharge001: [false],
			requiredFinalCharge001: [false],

			MwPowerLossLI001: [{ value: null, disabled: false }],
			disabledMwPowerLossLI001: [false],
			requiredMwPowerLossLI001: [false],

			statusElement: [true],
		});
		this.loadCatalog();
	}
	get fuelsId() {
		return this.formNewEvent.get('fuelsId');
	}
	loadSelect(selectCombo: Array<any>, catalog: Array<MaestroOpcionDTO>) {
		if (catalog !== null) {
			catalog.forEach((element: MaestroOpcionDTO) => {
				selectCombo.push({ id: element.maestroOpcionId, label: element.opcion.codigo, maestroOpcionId: element.maestroOpcionId });
			});
		}
	}
	onBuildEventAssociated_00(event) {
		const lstIds: Array<number> = [];
		if(event.value) {
			for (let i = 0; i < this.lstEventsDTO.length; i ++) {
				if (this.lstEventsDTO[i].opcionPadreId === event.value) {
					lstIds.push(this.lstEventsDTO[i].maestroOpcionId);
				}
			}
			this.formNewEvent001.controls.events00Id.enable();
			this.formNewEvent001.controls.events00Id.patchValue(lstIds);
			this.disabledSubmit = false;
		} else{
			this.formNewEvent001.controls.events00Id.disable();
			this.formNewEvent001.controls.events00Id.patchValue(lstIds);
			this.disabledSubmit = true;
		}
	}
	onBuildEventAssociated(event) {
		console.dir(event);
		this.lstEvents = [];
		this.loadSelect(this.lstEvents, this.lstEventsDTO.filter(a => a.opcionPadreId === event));
	}

	compareTech(t1, t2): boolean {
		return t1 && t2 ? t1.id === t2.id : t1 === t2;
	}

	loadCatalog() {
		const names = ['CLASIFICA EVENTO', 'EVENTO', 'COMBUSTIBLE', 'UNIDAD', 'CONTRATO IMPACTADO', 'REAL-CCDV', 'BANDA TOLERANCIA',
			'TIPO MERCADO MEM', 'SERVICIOS CONEXOS MEM', 'EQUIPO', 'FUENTE EVENTO'];
		this.masterCatalogService.listCatalog(names).subscribe(data => {
			this.loadSelect(this.lstEventClassification, data['CLASIFICA EVENTO']);
			this.lstEventClassificationDTO = data['CLASIFICA EVENTO'];
			this.loadSelect(this.lstEventClassification00, data['CLASIFICA EVENTO']);
			this.loadSelect(this.lstEvents00, data['EVENTO']);
			this.lstEventsDTO = data['EVENTO'];
			this.loadSelect(this.lstFuels, data['COMBUSTIBLE']);
			this.loadSelect(this.lstUnits, data['UNIDAD']);
			this.loadSelect(this.lstImpactContracts, data['CONTRATO IMPACTADO']);
			this.loadSelect(this.lstRealsCcdv, data['REAL-CCDV']);
			this.loadSelect(this.lstToleranceBands, data['BANDA TOLERANCIA']);
			this.loadSelect(this.lstMarketTypes, data['TIPO MERCADO MEM']);
			this.loadSelect(this.lstSelatedServices, data['SERVICIOS CONEXOS MEM']);
			this.loadSelect(this.lstEquipment, data['EQUIPO']);
			this.loadSelect(this.lstSourceEvent, data['FUENTE EVENTO']);

			if (this.catalogType.action === 'editar') {
				this.formNewEvent.patchValue(this.catalogType.dto);
				this.loadSelect(this.lstEvents, this.lstEventsDTO.filter(a => a.opcionPadreId === this.catalogType.dto.eventsClassificationId));
				this.formNewEvent.controls.eventsClassificationId.disable();
				this.formNewEvent.controls.eventsId.disable();
			}

			if (this.catalogType.action === 'ver') {
				this.formNewEvent.patchValue(this.catalogType.dto);
				this.loadSelect(this.lstEvents, this.lstEventsDTO.filter(a => a.opcionPadreId === this.catalogType.dto.eventsClassificationId));
				this.formNewEvent.disable();
			}
		}, errorData => {
			this.toastr.errorToastr(errorData.error.message, 'Error!');
		});
	}
	onSubmitFormNewEvent001(v) {
		const container = new ContainerClasificaDTO();
		container.opcionPadreId = v.eventsClassification00Id;
		container.nodesAssociated = v.events00Id;
		this.masterCatalogService.setAssociate(container).subscribe(
			data => {
				this.toastr.successToastr('Actualizacion completa', 'Exito!.');
				this.addBlock(2, '');
			},
			errorData => {
				this.addBlock(2, '');
				this.toastr.errorToastr(errorData.error.message, 'Error!');
			}, () => {
				const names = ['EVENTO'];
				this.masterCatalogService.listCatalog(names).subscribe(data => {
					console.dir(data);
					this.loadSelect(this.lstEvents00, data['EVENTO']);
					this.lstEventsDTO = data['EVENTO'];
				}, errorData => {
					this.toastr.errorToastr(errorData.error.message, 'Error!');
				});
			});
	}
	onSubmitFormNewEvent(v) {
		if (this.catalogType.action === 'nuevo') {
			this.addBlock(1, '');
			this.binnacleService.saveBinnacleConfiguration(v).subscribe(
				data => {
					this.toastr.successToastr('Guardado Completo', 'Exito!.');
					this.addBlock(2, '');
				},
				errorData => {
					this.addBlock(2, '');
					this.toastr.errorToastr(errorData.error.message, 'Error!');
				});
		}

		if (this.catalogType.action === 'editar') {
			this.addBlock(1, '');
			this.formNewEvent.controls.eventsClassificationId.enable();
			this.formNewEvent.controls.eventsId.enable();
			this.binnacleService.updateBinnacleConfiguration(this.formNewEvent.value).subscribe(
				data => {
					this.toastr.successToastr('Actualzacion Completa', 'Exito!.');
					this.addBlock(2, '');
				},
				errorData => {
					this.addBlock(2, '');
					this.toastr.errorToastr(errorData.error.message, 'Error!');
				});
		}

	}
	btnClickBack() {
		const type = {};
		this.eventService.sendChangePage(
			new EventMessage(null, type, 'Safe.SafeConfigurationBinnacleComponent')
		);
	}
	btnFinish() {
	}
	tableRowEdit(element) {
	}
	getNameUser() {
		return this.securityService.getNameUser() + ' ' + this.securityService.getLastNameUser();
	}

	private addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1,
			new EventBlocked(type, msg)));
	}
}
