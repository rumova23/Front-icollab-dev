import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { IdLabel } from 'src/app/core/models/IdLabel';
import { SecurityService } from 'src/app/core/services/security.service';
import { requiredFileType } from 'src/app/core/helpers/requiredFileType';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
	selector: 'app-safe-registration-of-events',
	templateUrl: './safe-registration-of-events.component.html',
	styleUrls: ['./safe-registration-of-events.component.scss']
})
export class SafeRegistrationOfEventsComponent implements OnInit {
	formobservationsComments : FormGroup;
	fileUploadForm: FormGroup;
	formNewEvent : FormGroup;

	lstEventClassification : IdLabel[] = [
		{id:"1",label:'Pruebas de CENACE'}
	];
	lstFuels : IdLabel[] = [
		{id:"1",label:'Gas'}
	];
	lstEvents : IdLabel[] = [
		{id:"1",label:'PVC(+) Mercado'}
	];
	lstUnits : IdLabel[] = [
		{id:"1",label:'unidad 1'}
	];
	lstImpactContracts : IdLabel[] = [
		{id:"1",label:'Contrato 1'}
	];
	lstRealsCcdv : IdLabel[] = [
		{id:"1",label:'CCDV'}
	];
	lstToleranceBands : IdLabel[] = [
		{id:"1",label:'Banda de tolerancia 1'}
	];
	lstMarketTypes : IdLabel[] = [
		{id:"1",label:'Tipo de mercado 1'}
	];
	lstSelatedServices : IdLabel[] = [
		{id:"1",label:'Servicio conexo 1'}
	];
	lstEquipment : IdLabel[] = [
		{id:"1",label:'equipos'}
	];
	lstWorkOrder : IdLabel[] = [
		{id:"1",label:'Orden de trabajo'}
	];
	lstOperatorPlantOpen : IdLabel[] = [
		{id:"1",label:'Operador 1'}
	];
	lstOperatorPlantClose : IdLabel[] = [
		{id:"1",label:'Operador 1'}
	];
	lstSourceEvent : IdLabel[] = [
		{id:"1",label:'fuente 1'}
	];
	lstEventStatus : IdLabel[] = [
		{id:"1",label:'Estatus del evento 1'}
	];
	lstApprovalStatus : IdLabel[] = [
		{id:"1",label:'Estatus de Aprovacion 1'}
	];

	tableObservationsComments = [
		{name:this.getNameUser(),observation:"algo",dateUptade:moment(new Date()).format('YYYY-MM-DD'),visible:true},
		{name:this.getNameUser(),observation:"algo 2",dateUptade:moment(new Date()).format('YYYY-MM-DD'),visible:false}
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
		'sys_checkbox',
		'sys_edit',
		'sys_delete',
	];
	tableObservationsCommentsSelection : SelectionModel<any> = new SelectionModel<any>(true, []);

	
	progress;
	constructor(
		private formBuilder:FormBuilder,
		public globalService: GlobalService,
		public toastr: ToastrManager,
		private securityService: SecurityService,
		private confirmationDialogService: ConfirmationDialogService,
	) { }

	ngOnInit() {
		this.fileUploadForm = this.formBuilder.group({
			file: new FormControl(null, [Validators.required, requiredFileType('zip')]),
		});
		this.formobservationsComments = this.formBuilder.group({
			observationsComments: [{ value: null, disabled: false }],
		});
		this.formNewEvent = this.formBuilder.group(
			{
				//dateTimeStart:[{ value: moment(new Date()).format('h:mm'), disabled: false }, Validators.required],
				dateTimeStart : [{ value: null, disabled: false }, Validators.required],
				dateTimeEnd   : [{ value: null, disabled: false }, Validators.required],
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
				eventActivated: [{ value: true, disabled: false }],
				
			}
		);
		this.setTableObservationsCommentsSelectionChecked()		
	}
	setTableObservationsCommentsSelectionChecked(){
		this.tableObservationsCommentsSelection.select(...this.tableObservationsComments.filter(e=>e.visible===true));
	}
	getTableObservationsCommentsSelectionChecked(){
		let seleccionados = this.tableObservationsCommentsSelection.selected;
		console.log(seleccionados);
	}
	onSubmitFormNewEvent(v){
		let casas = moment(v.datetimelocal);
		let dsa = casas.format('YYYY-MM-DD HH:mm:ss');
		debugger;
	}
	btnClickBack(){
		this.toastr.successToastr('btnClickBack', 'Seleccionaste');
	}
	BtnAddObservationsComments(){
		let observation = this.formobservationsComments.get('observationsComments').value;
		if(observation != null && observation != ""){
			this.tableObservationsComments = this.tableObservationsComments.concat(
					{name:this.getNameUser(),observation,dateUptade:moment(new Date()).format('YYYY-MM-DD'),visible:true}
				);
			this.formobservationsComments.get('observationsComments').setValue('');
		}
		this.getTableObservationsCommentsSelectionChecked();
	}

	btnUploadFile(){
		this.toastr.successToastr('btnUploadFile', 'Seleccionaste');
		let file = this.fileUploadForm.get('file').value;
	}
	btnFinish(){
		this.toastr.successToastr('btnFinish', 'Seleccionaste');
	}
	tableRowEdit(element){
		this.toastr.successToastr('tableRowEdit', 'Seleccionaste');
	}
	tableRowDelete(element){
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
	downloadFile(){
		this.toastr.successToastr('downloadFile', 'Seleccionaste');
	}
	getNameUser() {
		return this.securityService.getNameUser() +" "+ this.securityService.getLastNameUser();
	}
}
