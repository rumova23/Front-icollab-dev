import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EventService } from 'src/app/core/services/event.service';
import { DatePipe } from '@angular/common';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { IdLabel } from 'src/app/core/models/IdLabel';
import { SelectionModel } from '@angular/cdk/collections';
import * as moment from 'moment';
import { IncidentService } from '../../../services/incident.service';
import { map } from 'rxjs/operators';
import { IncidentInDTO } from '../../../models/IncidentInDTO';
import { EventObservationInDTO } from '../../../models/EventObservationInDTO';
import { IncidentOutDTO } from 'src/app/bits/models/IncidentOutDTO';
import { EventObservationOutDTO } from 'src/app/bits/models/EventObservationOutDTO';
import { IncidentObservationInDTO } from '../../../models/IncidentObservationInDTO';
import { IncidentObservationOutDTO } from 'src/app/bits/models/IncidentObservationOutDTO';
import { ResponseVO } from 'src/app/bits/models/ResponseVO';
import { EventBlocked } from 'src/app/core/models/EventBlocked';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { forEach } from '@angular/router/src/utils/collection';
import { AdministratorComplianceService } from 'src/app/compliance/administration/services/administrator-compliance.service';
import { EntidadEstatusDTO } from 'src/app/compliance/models/entidad-estatus-dto';
import { MaestroOpcionDTO } from 'src/app/compliance/models/maestro-opcion-dto';
import { PerfilComboService } from 'src/app/core/services/perfil-combo.service';
import { DataTransfer } from 'src/app/core/models/DataTransfer';
import { IncidentDTO } from 'src/app/bits/models/IncidentDTO';


@Component({
	selector: 'app-bits-incidents-environmental-abc',
	templateUrl: './bits-incidents-environmental-abc.component.html',
	styleUrls: ['./bits-incidents-environmental-abc.component.scss']
})
export class BitsIncidentsEnvironmentalABCComponent implements OnInit, OnDestroy {
	dataTransfer: DataTransfer<IncidentOutDTO> = {};
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
	disabledBtnFinish = true;
	disabledBtnSaveUpdate = true;
	disabledBtnSend = false;
	disabledToRefuse = true;
	disabledToAccept = true;

	tableObservationsComments : IncidentObservationOutDTO[] = [];
	tableObservationsCommentsSelection: SelectionModel<any> = new SelectionModel<any>(true, []);
	tableColumnsDisplay = [
		'order',
		'userUpdated',
		'observation',
		'dateUpdated',
		'sys_checkbox',
		'sys_edit',
		'sys_delete',
	];
	tablaColumnsLabels = [
		{ key: 'order', label: '#' },
		{ key: 'userUpdated', label: 'Nombre' },
		{ key: 'observation', label: 'Observaciones' },
		{ key: 'dateUpdated', label: 'Fecha de Ultima Modificación' , dateFormat:'dd/MM/yyyy HH:mm' },
	];
	tableSeguimiento = [];
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
	accion="nuevo";
	isGetObservations = false;
	is2=false;

	isSubmitedRCA = false;
	constructor(
		private formBuilder   : FormBuilder
		,private datePipe     : DatePipe
		,public globalService : GlobalService
		,public toastr        : ToastrManager
		,public eventService  : EventService
		,public incidentService : IncidentService
		,private confirmationDialogService: ConfirmationDialogService
		,private perfilService: PerfilComboService
		,private administratorComplianceService: AdministratorComplianceService
	) { }

	ngOnDestroy(): void {
		this.globalService.lockHeaderSidebar(false);
	}

	ngOnInit() {
		window.scroll(0,0);
		this.addBlock(2,null);
		this.getIncidentOutDTO();

		this.formTim = this.formBuilder.group({
			 h1:[null,[Validators.required]]
			,m1:[null,[Validators.required]]
		});
		this.formTimFechaObjetivoEntregaRCA = this.formBuilder.group({
			h1:[{value:null,disabled:true},[]]
		   ,m1:[{value:null,disabled:true},[]]
		   ,validformTimFechaObjetivoEntregaRCA:[]
	    });
		this.formNew = this.formBuilder.group({
			 order:[{value:null,disabled:false},[]]
			,id:[null]
			,tag:[{value:'AMB',disabled:true},[]]
			,incidentTypeDesc:[{value:null,disabled:false},[Validators.required,Validators.minLength(2),Validators.maxLength(100)]]
			,department:[{value:null,disabled:false},[Validators.required,Validators.minLength(2),Validators.maxLength(100)]]
			,specificLocation:[{value:null,disabled:false},[Validators.required,Validators.minLength(2),Validators.maxLength(100)]]
			,incidentDate:[{value:null,disabled:false},[Validators.required]]
			,description:[{value:null,disabled:false},[Validators.required,Validators.minLength(2),Validators.maxLength(1000)]]
			
			,rca:[{value:null,disabled:false},[]]
			,rcaTargetDate:[{value:null,disabled:true},[]]
			,rcaDeliveredDate:[{value:null,disabled:true},[]]
			,proceed:[{value:null,disabled:false},[]]
			


			,userReporter:[{value:null,disabled:true},[]]
			,dateReported:[{value:null,disabled:true},[]]
			,userSupervised:[{value:null,disabled:true},[]]
			,dateSupervised:[{value:null,disabled:true},[]]
			,userApproval:[{value:null,disabled:true},[]]
			,dateApproved:[{value:null,disabled:true},[]]

			,statusEvent:[{value:null,disabled:true},[]]
			,reasonApproved:[{value:null,disabled:true},[]]
		});
		this.formObs = this.formBuilder.group({
			id:[null],
			observation:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(1000)]]
		});
		this.fileUploadForm = this.formBuilder.group({
			file:[null]
		});
		switch (this.dataTransfer.action) {
			case 'nuevo':
				this.accion="nuevo";
				this.actionPage = 'Add';
				this.globalService.lockHeaderSidebar(true,'');
				break;
			case 'editar':
				this.disabledBtnSend = true;
				this.is2 = true;
				this.accion="editar";
				this.actionPage = 'Edit';
				break;
			case 'ver':
				this.disabledBtnSend = true;
				this.is2 = true;
				this.accion="ver";
				this.actionPage = 'Consultar';
				this.isReadOnly = true;
				this.formsDisabled();
				break;
		}
		if(!this.isReadOnly)
			this.tableObservationsCommentsSelection.changed.subscribe(event=> {
				this.onSelectedUpdate(event);
			});

		this.getListObservations();
		this.obtenEstatusMaestro();
	}
	get cFNew() { return this.formNew.controls; }
	formsDisabled(){
		this.formNew.disable();
		this.formObs.disable();
		this.formTim.disable();
	}
	setData(){
		for (const key in this.dataTransfer.dto) {
			const propertie = this.dataTransfer.dto[key];
			switch (key) {
				case 'incidentDate':
					let date = moment(propertie);
					let h = date.hour();
					let m = date.minute();
					this.formNew.controls.incidentDate.setValue(date.toDate());
					this.formTim.controls.h1.setValue((h < 10 ? '0' : '')+h);
			        this.formTim.controls.m1.setValue((m < 10 ? '0' : '')+m);
				break;			
				default:
					if(this.formNew.get(key)){
						this.formNew.controls[key].setValue(propertie);
					}
				break;
			}
		}
		this.setTableTraking();
	}
	onChangeDateFechaOcurrioIncidente(){
		if(this.formNew.controls.incidentDate.value != null){
			let h = this.formTim.controls.h1.value;
			let m = this.formTim.controls.m1.value;
			let date = moment(this.formNew.controls.incidentDate.value);
			if(h!=null)date.hour(h);
			if(m!=null)date.minute(m);
			this.formNew.controls.incidentDate.setValue(date.toDate());
		}
	}
	onChangeDateFechaObjetivoEntregaRCA(){
		if(this.formNew.controls.rcaTargetDate.value != null){
			let h = this.formTimFechaObjetivoEntregaRCA.controls.h1.value;
			let m = this.formTimFechaObjetivoEntregaRCA.controls.m1.value;
			let date = moment(this.formNew.controls.rcaTargetDate.value);
			if(h!=null)date.hour(h);
			if(m!=null)date.minute(m);
			this.formNew.controls.rcaTargetDate.setValue(date.toDate());
		}
	}
	getTimeA(): string {
		return this.formTim.controls.h1.value + ':' + this.formTim.controls.m1.value + ':00';
	}
	onFomrNew(o){
		let incident = [this.formNew.controls].map(e=>{
			let r: IncidentDTO = this.dataTransfer.dto;
			for (const key in e) r[key] = e[key].value;
			r.incidentDate = e.incidentDate.value != null ?(this.datePipe.transform(e.incidentDate.value, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS')):null;
			r.rcaTargetDate = e.rcaTargetDate.value != null ?(this.datePipe.transform(e.rcaTargetDate.value, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS')):null;
			r.rca = (e.rca == null?false:e.rca.value);
			r.proceed = (e.proceed == null?false:e.proceed.value);
			r.active = (e.active == null?true:e.active.value);
			r.save = (e.id.value == null);
			return r;
		})[0];
		this.incidentService.saveIncident(incident).subscribe((data:IncidentOutDTO)=>{
				//this.dataTransfer.dto = data;	
				this.getIncidentOutDTO();
				this.formNew.get('id').setValue(data.id);
				this.formNew.get('tag').setValue(data.tag);
				this.toastr.successToastr('Elemento Guardado Correctamente', 'Exito');
				this.disabledBtnSend = true;
			}
			,err=>{
				console.error(err);
				this.toastr.errorToastr('Ocurrió un error al intentar registrar la observación', 'Lo siento,');
			}
		);
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
		this.addBlock(1,null);
		let incidentObservationInDTO = [this.formObs.value].map(e=>{
			return {
					id               : e.id
				,incidentId       : this.formNew.get('id').value
				,observation      : e.observation
				,dateobservation  : this.datePipe.transform(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS')
				,save             : e.id == null
				,active           : true
			};
		})[0];
		this.incidentService.saveObservation(incidentObservationInDTO).subscribe((data:ResponseVO)=>{
			if(data.success){
				this.getListObservations();
			}
		}
		,err=>{
			this.toastr.errorToastr('Ocurrió un error al intentar registrar la observación', 'Lo siento,');
			console.log(err);
			
		}
		,()=>{
			this.addBlock(2,null);
		}
		);
		this.formObs.reset();
	}
	tableRowEdit(e){
		console.log(e);
		this.formObs.controls.id.setValue(e.id);
		this.formObs.controls.observation.setValue(e.observation);
	}
	tableRowDelete(e){
		console.log(e);
		this.confirmationDialogService.confirm(
			'ALERTA DE CONFIRMACIÓN DEREGISTRO',
			`¿Desea eliminar el registro ${e.observation} ?`
		)
			.then((confirmed) => {
				if ( confirmed ) {
					this.incidentService.deleteObservation(e.id).subscribe(
						data => {
							console.log(data);
							this.toastr.successToastr('Elemento Correctamente Borrado', 'Exito');
						},
						errorData => {
							console.log(errorData);
							this.toastr.errorToastr('Error', 'Error');
							
						},
						() => {
							this.getListObservations();
						});
				}
			})
			.catch(() => {});
	}
	onSelectedUpdate(event){
		if(this.isGetObservations) return 0;
		event.removed.map(e=>{
			e.active = false;
			e.save   = false;
			return e;
		}).concat(event.added.map(e=>{
			e.active = true;
			e.save   = false;
			return e;
		})).forEach((e)=>{
			this.incidentService.saveObservation(e).subscribe();
		});
	}
	getIncidentOutDTO(){
		if(this.dataTransfer.dto != null && this.dataTransfer.dto.id != null)
		this.incidentService.listById(this.dataTransfer.dto.id).subscribe((data:IncidentOutDTO)=>{
			this.dataTransfer.dto = data[0];
			this.setData();
		},err=>{
			this.setData();
		});
	}
	setTableTraking(){
		//{order:1,user:'',observation:'',status:'',dateUpdate:new Date()}
		this.tableSeguimiento = this.dataTransfer.dto.tracking.PLANT_OPERATOR_OPENED.map((e,index)=>{
			return {
				order:index+1
				,user:e.username
				,observation:e.reasonObservation
				,status:e.status
				,dateUpdate:e.update
			}
		});
	}
	getListObservations(){
		if(this.cFNew.id.value != null){
			this.incidentService.getListObservations(this.cFNew.id.value).subscribe(
				(data:IncidentObservationOutDTO[])=>{
					this.tableObservationsComments=data.map((e,index)=>{
						e.order = index+1;
						return e;
					});
					
					this.isGetObservations = true;
					this.tableObservationsCommentsSelection.clear();
					this.tableObservationsCommentsSelection.select(...this.tableObservationsComments.filter(e=>e.active));					
				},
				err=>{
					console.log(err);
				}
				,()=>{
					this.isGetObservations = false;
				}
			);
		}
	}
	obtenEstatusMaestro(){
		this.perfilService.obtenEstatusTerminado('TX_EXAMEN_RESERVACION', 'Terminado').subscribe(this.TX_EXAMEN_RESERVACION__Terminado);
		this.perfilService.obtenEstatusTerminado('TX_EXAMEN_RESERVACION', 'Abierto').subscribe(this.TX_EXAMEN_RESERVACION__Abierto);
		this.perfilService.obtenEstatusTerminado('TX_EXAMEN_RESERVACION', 'Cerrado').subscribe(this.TX_EXAMEN_RESERVACION__Cerrado);
		this.perfilService.obtenEstatusTerminado('TX_INCIDENT', 'Terminado').subscribe(this.TX_INCIDENT__Terminado);
		this.perfilService.obtenEstatusTerminado('TX_INCIDENT', 'Abierto').subscribe(this.TX_INCIDENT__Abierto);
		this.perfilService.obtenEstatusTerminado('TX_INCIDENT', 'Cerrado').subscribe(this.TX_INCIDENT__Cerrado);

		this.perfilService.obtenEstatusTerminado('TX_INCIDENT_ACTORS',"OBSERVED PROCESS").subscribe(this.TX_INCIDENT_ACTORS__OP);
	}
	TX_EXAMEN_RESERVACION__Terminado(entidadEstatus: EntidadEstatusDTO){
		//debugger;
	}
	TX_EXAMEN_RESERVACION__Abierto(entidadEstatus: EntidadEstatusDTO){
		//debugger;
	}
	TX_EXAMEN_RESERVACION__Cerrado(entidadEstatus: EntidadEstatusDTO){
		//debugger;
	}
	TX_INCIDENT__Terminado(entidadEstatus: EntidadEstatusDTO){
		//debugger;
	}
	TX_INCIDENT__Abierto(entidadEstatus: EntidadEstatusDTO){
		//debugger;
	}
	TX_INCIDENT__Cerrado(entidadEstatus: EntidadEstatusDTO){
		//debugger;
	}
	TX_INCIDENT_ACTORS__OP(entidadEstatus: EntidadEstatusDTO){
		//debugger;
	}
	onChangeCheckBoxRCA(e){
		if(e){
			this.isSubmitedRCA = true;
			this.formNew.get('rcaTargetDate').enable();
			this.formTimFechaObjetivoEntregaRCA.get('h1').enable();
			this.formTimFechaObjetivoEntregaRCA.get('m1').enable();

			this.formTimFechaObjetivoEntregaRCA.get('h1').setValidators([Validators.required]);
			this.formTimFechaObjetivoEntregaRCA.get('m1').setValidators([Validators.required]);
			this.formTimFechaObjetivoEntregaRCA.get('h1').updateValueAndValidity();
			this.formTimFechaObjetivoEntregaRCA.get('m1').updateValueAndValidity();

			this.formNew.get("rcaTargetDate").setValidators([Validators.required]);
			this.formNew.get("rcaTargetDate").updateValueAndValidity();
			
		}else{
			this.isSubmitedRCA = false;
			this.formTimFechaObjetivoEntregaRCA.get('h1').disable();
			this.formTimFechaObjetivoEntregaRCA.get('m1').disable();
			this.formTimFechaObjetivoEntregaRCA.get('h1').setValidators([]);
			this.formTimFechaObjetivoEntregaRCA.get('m1').setValidators([]);
			this.formNew.get('rcaTargetDate').disable();
			this.formNew.get("rcaTargetDate").setValidators([]);
			
			this.formNew.get("rcaTargetDate").setValue(null);
			this.formTimFechaObjetivoEntregaRCA.reset();
		}
	}
	addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1,
			new EventBlocked(type, msg)));
	}
}
