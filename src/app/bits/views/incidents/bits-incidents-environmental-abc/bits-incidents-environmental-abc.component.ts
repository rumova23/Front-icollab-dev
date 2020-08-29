import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EventService } from 'src/app/core/services/event.service';
import { DatePipe } from '@angular/common';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { IdLabel } from 'src/app/core/models/IdLabel';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
	selector: 'app-bits-incidents-environmental-abc',
	templateUrl: './bits-incidents-environmental-abc.component.html',
	styleUrls: ['./bits-incidents-environmental-abc.component.scss']
})
export class BitsIncidentsEnvironmentalABCComponent implements OnInit {
	hours: IdLabel[] =  new Array(24).fill(0).map((_valor, indice) => ({id: (indice < 10 ? '0' : '') + indice, label: (indice < 10 ? '0' : '') + indice}));
	minutes: IdLabel[] =  new Array(60).fill(0).map((_valor, indice) => ({id: (indice < 10 ? '0' : '') + indice, label: (indice < 10 ? '0' : '') + indice}));

	formNew : FormGroup;

	progress;
	disabledSubmit = false;
	disabledBtnFinish = false;
	disabledToRefuse = false;
	disabledToAccept = false;

	tableObservationsComments = [{order:1,name:'tester',observation:'obs',dateUpdate:new Date()}];
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

	ngOnInit() {
		this.formNew = this.formBuilder.group({
			tag:[{value:null,disabled:false},[Validators.required]],
			file:[null],
		});
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
		console.log("btnSend()");
		
	}
	btnChangeStatus(status:String){
		console.log(status);
		
	}
	selectFile(e){

	}
	uploadFile(){

	}
	BtnAddObservationsComments(){

	}
	tableRowEdit(e){
		console.log(e);
	}
	tableRowDelete(e){
		console.log(e);
	}
	onSelected(e){
		console.log(e);
	}
	onChangeDateTimeStart(){

	}
}
