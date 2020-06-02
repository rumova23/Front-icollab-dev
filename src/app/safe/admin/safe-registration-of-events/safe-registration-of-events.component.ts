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

@Component({
	selector: 'app-safe-registration-of-events',
	templateUrl: './safe-registration-of-events.component.html',
	styleUrls: ['./safe-registration-of-events.component.scss']
})
export class SafeRegistrationOfEventsComponent implements OnInit {
	formobservationsComments: FormGroup;
	fileUploadForm: FormGroup;
	formNewEvent: FormGroup;

	lstEventClassification: IdLabel[] = [];
	lstFuels: IdLabel[] = [];
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

	tableObservationsComments = [
		{name: this.getNameUser(), observation: 'algo', dateUptade: moment(new Date()).format('YYYY-MM-DD'), visible: '¿¿??'}
	];
	tablaColumnsLabels = [
		{ key: 'name', label: 'Nombre' },
		{ key: 'observation', label: 'Observaciones' },
		{ key: 'dateUptade', label: 'Fecha de Ultima Modificación' },
		{ key: 'visible', label: 'Visible' },
	];
	tableColumnsDisplay = [
		'sys_index',
		'name',
		'observation',
		'dateUptade',
		'visible',
		'sys_edit',
		'sys_delete',
	];


	progress;
	constructor(
		private formBuilder: FormBuilder,
		public globalService: GlobalService,
		public toastr: ToastrManager,
		private securityService: SecurityService,
		private confirmationDialogService: ConfirmationDialogService,
		private masterCatalogService: MasterCatalogService
	) { }


	ngOnInit() {

		this.loadCatalog();
		this.fileUploadForm = this.formBuilder.group({
			file: new FormControl(null, [Validators.required, requiredFileType('zip')]),
		});
		this.formobservationsComments = this.formBuilder.group({
			observationsComments: [{ value: null, disabled: false }],
		});
		this.formNewEvent = this.formBuilder.group(
			{
				// dateTimeStart:[{ value: moment(new Date()).format('h:mm'), disabled: false }, Validators.required],
				dateTimeStart : [{ value: moment(new Date()).format('YYYY-MM-DDTHH:mm'), disabled: false }, Validators.required],
				dateTimeEnd   : [{ value: moment(new Date()).format('YYYY-MM-DDTHH:mm'), disabled: false }, Validators.required],
				eventsClassification   : [{ value: null, disabled: false }, Validators.required],
				events: [{ value: null, disabled: false }, Validators.required],
				fuels : [{ value: null, disabled: false }, Validators.required],
				PowerMw: [{ value: null, disabled: false }, Validators.required],
				units: [{ value: null, disabled: false }, Validators.required],
				impactContracts: [{ value: null, disabled: false }, Validators.required],
				realsCcdv: [{ value: null, disabled: false }, Validators.required],
				toleranceBands: [{ value: null, disabled: false }, Validators.required],
				marketTypes: [{ value: null, disabled: false }, Validators.required],
				mwOffered: [{ value: null, disabled: false }, Validators.required],
				relatedServices: [{ value: null, disabled: false }, Validators.required],
				licenseNumber: [{ value: null, disabled: false }, Validators.required],
				equipment: [{ value: null, disabled: false }, Validators.required],
				initialCharge: [{ value: null, disabled: false }, Validators.required],
				finalCharge: [{ value: null, disabled: false }, Validators.required],
				mwPowerLoss: [{ value: null, disabled: false }, Validators.required],
				workOrder: [{ value: null, disabled: false }, Validators.required],
				licenseDescription: [{ value: null, disabled: false }, Validators.required],
				operatorPlantOpen: [{ value: null, disabled: false }, Validators.required],
				operatorCenaceOpen: [{ value: null, disabled: false }, Validators.required],
				operatorPlantClose: [{ value: null, disabled: false }, Validators.required],
				operatorCenaceClose: [{ value: null, disabled: false }, Validators.required],
				sourceEvent: [{ value: null, disabled: false }, Validators.required],
				eventStatus: [{ value: null, disabled: false }, Validators.required],
				approvalStatus: [{ value: null, disabled: false }, Validators.required],
				eventActivated: [{ value: false, disabled: false }],

			}
		);
	}

	loadSelect(selectCombo: Array<any>, catalog: Array<MaestroOpcionDTO>) {
		catalog.forEach((element: MaestroOpcionDTO ) => {
			selectCombo.push({id: element.maestroOpcionId, label: element.opcion.codigo});
		});
	}

	loadCatalog() {
		const names = ['CLASIFICA EVENTO', 'EVENTO', 'COMBUSTIBLE', 'UNIDAD', 'CONTRATO IMPACTADO', 'CONTRATO COMPRA VENTA ENERGIA PPA', 'BANDA TOLERANCIA',
		'TIPO MERCADO MEM', 'SERVICIOS CONEXOS MEM', 'EQUIPO', 'ORDEN TRABAJO'];
		this.masterCatalogService.listCatalog(names).subscribe(data  => {
			this.loadSelect(this.lstEventClassification, data['CLASIFICA EVENTO']);
			this.loadSelect(this.lstEvents, data['EVENTO']);
			this.loadSelect(this.lstFuels, data['COMBUSTIBLE']);
			this.loadSelect(this.lstUnits, data['UNIDAD']);
			this.loadSelect(this.lstImpactContracts, data['CONTRATO IMPACTADO']);
			this.loadSelect(this.lstRealsCcdv, data['CONTRATO COMPRA VENTA ENERGIA PPA']);
			this.loadSelect(this.lstToleranceBands, data['BANDA TOLERANCIA']);
			this.loadSelect(this.lstMarketTypes, data['TIPO MERCADO MEM']);
			this.loadSelect(this.lstSelatedServices, data['SERVICIOS CONEXOS MEM']);
			this.loadSelect(this.lstEquipment, data['EQUIPO']);
			this.loadSelect(this.lstWorkOrder, data['ORDEN TRABAJO']);
		});
	}
	onSubmitFormNewEvent(v) {
		const casas = moment(v.datetimelocal);
		const dsa = casas.format('YYYY-MM-DD HH:mm:ss');
	}
	btnClickBack() {
		this.toastr.successToastr('btnClickBack', 'Seleccionaste');
	}
	BtnAddObservationsComments() {
		const observation = this.formobservationsComments.get('observationsComments').value;
		if (observation != null && observation !== '') {
			this.tableObservationsComments = this.tableObservationsComments.concat(
					{name: this.getNameUser(), observation, dateUptade: moment(new Date()).format('YYYY-MM-DD'), visible: '¿¿??'}
				);
			this.formobservationsComments.get('observationsComments').setValue('');
		}
	}
	btnUploadFile() {
		this.toastr.successToastr('btnUploadFile', 'Seleccionaste');
		const file = this.fileUploadForm.get('file').value;
	}
	btnFinish() {
		this.toastr.successToastr('btnFinish', 'Seleccionaste');
	}
	tableRowEdit(element) {
		this.toastr.successToastr('tableRowEdit', 'Seleccionaste');
	}
	tableRowDelete(element) {
		this.confirmationDialogService.confirm(
			'Confirmación',
			'¿Está seguro de eliminar el Registro?'
		)
		.then((confirmed) => {
			if ( confirmed ) {
				this.toastr.successToastr('table Row Delete', 'Seleccionaste');
				this.tableObservationsComments = this.tableObservationsComments.filter(
					e => e !== element
				);
				console.log(element);
			}
		})
		.catch(() => {});
	}
	downloadFile() {
		this.toastr.successToastr('downloadFile', 'Seleccionaste');
	}
	getNameUser() {
		return this.securityService.getNameUser() + ' ' + this.securityService.getLastNameUser();
	}
}
