import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EventService } from 'src/app/core/services/event.service';
import { DatePipe } from '@angular/common';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { IdLabel } from 'src/app/core/models/IdLabel';
import { SelectionModel } from '@angular/cdk/collections';
import * as moment from 'moment';

@Component({
	selector: 'app-bits-incidents-environmental-abc',
	templateUrl: './bits-incidents-environmental-abc.component.html',
	styleUrls: ['./bits-incidents-environmental-abc.component.scss']
})
export class BitsIncidentsEnvironmentalABCComponent implements OnInit, OnDestroy {
	catalogType : any;
	actionPage  : String = '';
	isReadOnly  : boolean = false;
	hours       : IdLabel[] =  new Array(24).fill(0).map((_valor, indice) => ({id: (indice < 10 ? '0' : '') + indice, label: (indice < 10 ? '0' : '') + indice}));
	minutes     : IdLabel[] =  new Array(60).fill(0).map((_valor, indice) => ({id: (indice < 10 ? '0' : '') + indice, label: (indice < 10 ? '0' : '') + indice}));

	formNew : FormGroup;
	formObs : FormGroup;
	fileUploadForm : FormGroup;
	formTim : FormGroup;
	formTimFechaObjetivoEntregaRCA : FormGroup;

	progress;
	disabledSubmit = false;
	disabledBtnFinish = false;
	disabledToRefuse = false;
	disabledToAccept = false;

	tableObservationsComments = [{id:1,order:1,name:'tester',observation:'obs',dateUpdate:new Date()}];
	tableObservationsCommentsSelection: SelectionModel<any> = new SelectionModel<any>(true, []);
	tableColumnsDisplay = [
		'order',
		'name',
		'observation',
		'dateUpdate',
		'sys_checkbox',
		'sys_edit',
		'sys_delete',
	];
	tablaColumnsLabels = [
		{ key: 'order', label: '#' },
		{ key: 'name', label: 'Nombre' },
		{ key: 'observation', label: 'Observaciones' },
		{ key: 'dateUpdate', label: 'Fecha de Ultima Modificación' , dateFormat:'dd/MM/yyyy HH:mm' },
	];
	tableSeguimiento = [{order:1,user:'',observation:'',status:'',dateUpdate:new Date()}];
	tableSeguimientoColumnsDisplay = [
		'order',
		'user',
		'observation',
		'status',
		'dateUpdate'
	];
	tablaSeguimientoColumnsLabels = [
		{ key: 'order', label: '#' },
		{ key: 'user', label: 'Usuario' },
		{ key: 'observation', label: 'Observaciones' },
		{ key: 'status', label: 'Estatus' },
		{ key: 'dateUpdate', label: 'Fecha de Ultima Modificación' , dateFormat:'dd/MM/yyyy HH:mm'},
	];
	constructor(
		private formBuilder: FormBuilder,
		public globalService: GlobalService,
		public toastr: ToastrManager,
		public eventService: EventService,
		private datePipe: DatePipe,
	) { }

	ngOnDestroy(): void {
		this.globalService.lockHeaderSidebar(false);
	}

	ngOnInit() {
		
		console.log(this.catalogType);
		this.formTim = this.formBuilder.group({
			 h1:[null,[Validators.required]]
			,m1:[null,[Validators.required]]
		});
		this.formTimFechaObjetivoEntregaRCA = this.formBuilder.group({
			h1:[null,[Validators.required]]
		   ,m1:[null,[Validators.required]]
	   });
		this.formNew = this.formBuilder.group({
			file:[{value:null,disabled:false},[]]
			,order:[{value:null,disabled:false},[]]
			,tag:[{value:null,disabled:true},[]]
			,TAG:[{value:null,disabled:true},[]]
			,TipoIncidente:[{value:null,disabled:false},[Validators.required,Validators.minLength(2),Validators.maxLength(100)]]
			,Departamento:[{value:null,disabled:false},[Validators.required,Validators.minLength(2),Validators.maxLength(100)]]
			,Ubicacion:[{value:null,disabled:false},[Validators.required,Validators.minLength(2),Validators.maxLength(100)]]
			,FechaOcurrioIncidente:[{value:null,disabled:false},[Validators.required]]
			,DescripcionIncidente:[{value:null,disabled:false},[Validators.required,Validators.minLength(2),Validators.maxLength(1000)]]
			,AnalisisCausaRaizRCA:[{value:null,disabled:false},[]]
			,FechaObjetivoEntregaRCA:[{value:null,disabled:false},[]]
			,FechaHoraEntregaRCA:[{value:null,disabled:false},[]]
			,Procede:[{value:null,disabled:false},[]]
			,NombresApellidosUsuarioReporto:[{value:null,disabled:false},[]]
			,FechaHoraReporto:[{value:null,disabled:false},[]]
			,NombresApellidosUsuarioSuperviso:[{value:null,disabled:false},[]]
			,FechaHoraSuperviso:[{value:null,disabled:false},[]]
			,NombresApellidosUsuarioAproboRechazo:[{value:null,disabled:false},[]]
			,FechaHoraAproboRechazo:[{value:null,disabled:false},[]]
			,EstatusDelEvento:[{value:null,disabled:false},[]]
			,EstatusDeAprovacion:[{value:null,disabled:false},[]]
		});
		this.formObs = this.formBuilder.group({
			id:[null],
			obs:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(1000)]]
		});
		this.fileUploadForm = this.formBuilder.group({
			file:[null]
		});
		switch (this.catalogType.action) {
			case 'nuevo':
				this.actionPage = 'Add';
				this.globalService.lockHeaderSidebar(true,'');
				break;
			case 'editar':
				this.actionPage = 'Edit';
				this.setData();
				break;
			case 'ver':
				this.actionPage = 'See';
				this.isReadOnly = true;
				this.formsDisabled();
				this.setData();
				break;
		}
		if(!this.isReadOnly)
			this.tableObservationsCommentsSelection.changed.subscribe(event=> {
				this.onSelectedUpdate(event);
			});
	}	
	formsDisabled(){
		this.formNew.disable();
		this.formObs.disable();
		this.formTim.disable();
	}
	setData(){
		for (const key in this.catalogType.element) {
			const propertie = this.catalogType.element[key];
			this.formNew.controls[key].setValue(propertie);
		}
	}
	onChangeDateFechaOcurrioIncidente(){
		if(this.formNew.controls.FechaOcurrioIncidente.value != null){
			let h = this.formTim.controls.h1.value;
			let m = this.formTim.controls.m1.value;
			let date = moment(this.formNew.controls.FechaOcurrioIncidente.value);
			if(h!=null)date.hour(h);
			if(m!=null)date.minute(m);
			this.formNew.controls.FechaOcurrioIncidente.setValue(date.toDate());
		}
		console.log(this.formNew.controls.FechaOcurrioIncidente.value);
	}
	onFomrNew(o){
		console.log(o);
	}
	btnClickBack(){
		const type = {};
		this.eventService.sendChangePage(
			new EventMessage(null, type, 'Bits.BitsIncidentsEnvironmental')
		);
	}
	btnFinish(){
		console.log("btnFinish()");
		
	}
	btnSend(){
		/** eniviar a guardar */
		console.log("btnSend()");
		console.log(this.formNew.value);
		
		
	}
	btnChangeStatus(status:String){
		console.log(status);
		
	}
	selectFile(e){

	}
	uploadFile(){
		const reader = new FileReader();
		reader.onloadend = (e) => {
			let file:any = reader.result;
			file = file.replace(/^data:(.*;base64,)?/, '');
			file = file.trim();
			console.log(file);
			
		}
		reader.readAsDataURL(this.fileUploadForm.value.file);
	}
	BtnAddObservationsComments(){
		console.log(this.formObs.value);
		/** eniviar a guardar */
		this.formObs.reset();
	}
	tableRowEdit(e){
		this.formObs.controls.id.setValue(e.id);
		this.formObs.controls.obs.setValue(e.observation);
		console.log(e);
	}
	tableRowDelete(e){
		console.log(e);
	}
	onSelectedUpdate(event){
		console.log("event:::",event);
		let selecteds = this.tableObservationsCommentsSelection.selected;
	}
	onChangeDateTimeStart(){

	}
}
