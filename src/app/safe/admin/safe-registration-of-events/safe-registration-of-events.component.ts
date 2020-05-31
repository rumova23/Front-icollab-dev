import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { IdLabel } from 'src/app/core/models/IdLabel';

@Component({
	selector: 'app-safe-registration-of-events',
	templateUrl: './safe-registration-of-events.component.html',
	styleUrls: ['./safe-registration-of-events.component.scss']
})
export class SafeRegistrationOfEventsComponent implements OnInit {
	formNewEvent: FormGroup;

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


	constructor(
		private formBuilder:FormBuilder,
		public globalService: GlobalService,
		public toastr: ToastrManager,
		private confirmationDialogService: ConfirmationDialogService,
	) { }

	ngOnInit() {
		this.formNewEvent = this.formBuilder.group(
			{
				//dateTimeStart:[{ value: moment(new Date()).format('h:mm'), disabled: false }, Validators.required],
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

			}
		);
	}
	onSubmitFormNewEvent(v){
		let casas = moment(v.datetimelocal);
		let dsa = casas.format('YYYY-MM-DD HH:mm:ss');
		debugger;
	}
	btnClickBack(){
		this.toastr.successToastr('btnClickBack', 'Seleccionaste');
	}
}
