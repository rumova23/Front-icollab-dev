/* tslint:disable:indent */
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
		console.dir(this.catalogType);
		this.formNewEvent001 = this.formBuilder.group({
			eventsClassification00Id: ['', null],
			disabledEventsClassification00Id: [false],
			events00Id: ['', null],
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
			powerMw: [{ value: null, disabled: false }],
			disabledPowerMw: [false],
			powerMwLimitLower: [{ value: null, disabled: false }],
			disabledPowerMwLimitLower: [false],
			powerMwLimitUpper: [{ value: null, disabled: false }],
			disabledPowerMwLimitUpper: [false],
			unitsId: [null],
			disabledUnitsId: [false],
			impactContractsId: [null],
			disabledImpactContractsId: [false],
			realsCcdvId: [null],
			disabledRealsCcdvId: [false],
			toleranceBandsId: [null],
			disabledToleranceBandsId: [false],
			marketTypesId: [null],
			disabledMarketTypesId: [false],
			mwOffered: [{ value: null, disabled: false }],
			mwOfferedLimitLower: [{ value: null, disabled: false }],
			disabledMwOfferedLimitLower: [false],
			mwOfferedLimitUpper: [{ value: null, disabled: false }],
			disabledMwOfferedLimitUpper: [false],
			disabledMwOffered: [false],
			relatedServicesId: [null],
			disabledRelatedServicesId: [false],
			disabledlicenseNumber: [false],
			licenseNumber: [{ value: null, disabled: true }],
			disabledKLicenseNumber: [false],
			equipmentId: [null],
			disabledEquipmentId: [false],
			initialCharge: [{ value: null, disabled: false }],
			disabledInitialCharge: [false],

			initialChargeLimitLower: [{ value: null, disabled: false }],
			disabledInitialChargeLimitLower: [false],
			initialChargeLimitUpper: [{ value: null, disabled: false }],
			disabledInitialChargeLimitUpper: [false],

			finalCharge: [{ value: null, disabled: false }],
			disabledFinalCharge: [false],

			finalChargeLimitLower: [{ value: null, disabled: false }],
			disabledFinalChargeLimitLower: [false],
			finalChargeLimitUpper: [{ value: null, disabled: false }],
			disabledFinalChargeLimitUpper: [false],

			mwPowerLoss: [{ value: null, disabled: false }],
			disabledMwPowerLoss: [false],

			mwPowerLossLI: [{ value: null, disabled: false }],
			disabledMwPowerLossLI: [false],
			mwPowerLossLS: [{ value: null, disabled: false }],
			disabledMwPowerLossLS: [false],

			workOrderId: [{ value: null, disabled: true }],
			disabledWorkOrderId: [false],
			licenseDescription: [{ value: null, disabled: true }],
			disabledLicenseDescription: [false],
			operatorPlantOpen: [{ value: null, disabled: true }],
			disabledOperatorPlantOpen: [false],
			operatorCenaceOpen: [{ value: null, disabled: true }],
			disabledOperatorCenaceOpen: [false],
			operatorPlantClose: [{ value: null, disabled: true }],
			disabledOperatorPlantClose: [false],
			operatorCenaceClose: [{ value: null, disabled: true }],
			disabledOperatorCenaceClose: [false],
			sourceEvent: [{ value: null, disabled: false }],
			disabledSourceEvent: [false],
			eventStatus: [{ value: null, disabled: true }],
			disabledEventStatus: [false],
			approvalStatus: [{ value: null, disabled: true }],
			disabledApprovalStatus: [false],
			disabledFile: [false],
			disabledObsComment: [false],
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
		console.log(event);
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
			'TIPO MERCADO MEM', 'SERVICIOS CONEXOS MEM', 'EQUIPO'];
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
		}, errorData => {
			this.toastr.errorToastr(errorData.error.message, 'Error!');
		}, () => {
			if (this.catalogType.action === 'editar') {
				this.formNewEvent.patchValue(this.catalogType.dto);
				this.loadSelect(this.lstEvents, this.lstEventsDTO.filter(a => a.opcionPadreId === this.catalogType.dto.eventsClassificationId));
				this.formNewEvent.controls.eventsClassificationId.disable();
				this.formNewEvent.controls.eventsId.disable();
			}
		});
	}
	onSubmitFormNewEvent001(v){
		console.log(v);
	}
	onSubmitFormNewEvent(v) {
		console.log('RTC: ' + this.catalogType.action);
		console.dir(v);
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
