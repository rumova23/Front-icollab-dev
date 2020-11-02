import { Component, OnInit } from '@angular/core';
import { ColumnLabel } from 'src/app/core/models/ColumnLabel';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventService } from 'src/app/core/services/event.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdLabel } from 'src/app/core/models/IdLabel';
import { IncidentService } from '../../../services/incident.service';
import { IncidentOutDTO } from 'src/app/bits/models/IncidentOutDTO';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { EventBlocked } from 'src/app/core/models/EventBlocked';
import * as Util from 'src/app/core/helpers/util.general';
import { DataTransfer } from 'src/app/core/models/DataTransfer';

@Component({
	selector: 'app-bits-incidents-environmental',
	templateUrl: './bits-incidents-environmental.component.html',
	styleUrls: ['./bits-incidents-environmental.component.scss']
})
export class BitsIncidentsEnvironmentalComponent implements OnInit {
	tableData:IncidentOutDTO[] = [];
	tableDataFiltered:IncidentOutDTO[]  = [];
	tablaColumnsLabels = [
		 {key:'order',label:'#',isSticky:true}
		//,{key:'id'}
		,{key:'tag',label:'TAG',isSticky:true}
		//,{key:'incidentTypeId',label:'Tipo de Incidente'}
		,{key:'incidentTypeDesc',label:'Tipo de Incidente'}
		,{key:'department',label:'Departamento'}
		,{key:'specificLocation',label:'Ubicación'}
		,{key:'incidentDate',label:'Fecha en que ocurrió el incidente', dateFormat:'dd/MM/yyyy HH:mm'}
		,{key:'description',label:'Descripción'}
		,{key:'rca',label:'Aplica RCA'}
		,{key:'rcaTargetDate',label:'rcaTargetDate'}
		,{key:'rcaDeliveredDate',label:'rcaDeliveredDate'}
		,{key:'statusEvent',label:'Estatus del Evento'}
		,{key:'proceed',label:'Estatus de Aprobación'}
		,{key:'userReporter',label:'Nombre Apellidos Usuario Reportador'}
		,{key:'userSupervised',label:'Nombre Apellidos Usuario Supervisor'}
		,{key:'userApproval',label:'Nombre Apellidos Usuario Aprobador'}

		


		//,{key:'userCreated'}
		//,{key:'dateCreated'}
		,{key:'userUpdated',label:'Usuario Última Modificación'}
		,{key:'dateUpdated',label:'Fecha de Última Modificación', dateFormat:'dd/MM/yyyy HH:mm'}
	];
	tableColumnsDisplay: string[] = [
		'order'
		,'tag'
		//,'incidentTypeId'
		,'incidentTypeDesc'
		,'department'
		,'specificLocation'
		,'incidentDate'
		,'description'
		,'statusEvent'
		,'rca'
		,'EsProcedente'
		,'userReporter'
		,'userSupervised'
		,'userApproval'
		//,'rcaTargetDate'
		//,'rcaDeliveredDate'
		//,'proceed'
		//,'userCreated'
		//,'dateCreated'
		,'userUpdated'
		,'dateUpdated'

		,'sys_see'
		,'sys_edit'
		,'sys_delete'
	];
	tableRowXpage = [50,100];

	formFilters         : FormGroup;
	formFiltersType     : FormGroup;
	optionsFiltersType  : IdLabel[] = [{id:1,label:'Todos'},{id:2,label:'Al menos uno'}];
	optionsYoN          : IdLabel[] = [{id:1,label:'Si'},{id:2,label:'No'}];
	comboX              : IdLabel[] = [];
	filteredAutoTag     : String[] ;
	filteredAutoIncidentTypeDesc     : String[] ;
	filteredAutoDepartment     : String[] ;
	filteredAutoUserUpdated    : String[] ;
	constructor(
		public eventService : EventService
		,private formBuilder: FormBuilder
		,private incidentService : IncidentService
		,private toastr: ToastrManager
		,private confirmationDialogService: ConfirmationDialogService
	) { }

	ngOnInit() {
		this.onLoadInit()
		this.formFilters = this.formBuilder.group({
			a:[null]
			,tag              : [null]
			,incidentTypeDesc : [null]
			,department       : [null]
			,specificLocation : [null]
			,minDate__incidentDate     : [null]
			,maxDate__incidentDate     : [null]
			,rca              : [null]
			,proceed          : [null]
			,userUpdated      : [null]
			,minDate__dateUpdated      : [null]
			,maxDate__dateUpdated      : [null]
			/*
			,description      : [null]
			,active           : [null]
			,order            : [null]
			,rcaTargetDate    : [null]
			,rcaDeliveredDate : [null]
			,userCreated      : [null]
			,dateCreated      : [null]//*/
		});
		this.formFiltersType = this.formBuilder.group({
			typeFilter:[2,Validators.required]
		});
	}
	onLoadInit(){
		
		this.incidentService.list().subscribe((data:IncidentOutDTO[])=>{
			console.log(data);
			this.tableData = data.map((e,i)=>{
				e.order = i+1;
				e.rca = e.rca ? 'Si': 'No'
				return e;
			});
			this.tableDataFiltered = [].concat(this.tableData);
			this.initAutoComplete();
		}
		,err=>{
			
			console.error(err);
			this.toastr.errorToastr('Error', 'Error');
		}
		,()=>{
			
		});
	}
	onbtnAdd(){
		
		const type: DataTransfer<IncidentOutDTO> = {
            dto: null,
            action: 'nuevo',
			name: ''
        };
  		this.eventService.sendChangePage(
            new EventMessage(null, type, 'Bits.BitsIncidentsEnvironmentalABC')
        );
	}
	onTableRowSee(element){
		
		const type: DataTransfer<IncidentOutDTO> = {
            dto: element,
            action: 'ver',
			name: ''
		};
  		this.eventService.sendChangePage(
            new EventMessage(null, type, 'Bits.BitsIncidentsEnvironmentalABC')
        );	
	}
	onTableRowEdit(element){
		
		const type: DataTransfer<IncidentOutDTO> = {
            dto: element,
            action: 'editar',
			name: ''
		};
  		this.eventService.sendChangePage(
            new EventMessage(null, type, 'Bits.BitsIncidentsEnvironmentalABC')
        );		
	}
	onTableRowDelete(e){
		console.log(e);
		this.confirmationDialogService.confirm(
			'ALERTA DE CONFIRMACIÓN DEREGISTRO',
			`¿Desea eliminar el registro ${e.tag} ?`
		)
			.then((confirmed) => {
				if ( confirmed ) {
					this.incidentService.delete(e.id).subscribe(
						data => {
							console.log(data);
							this.toastr.successToastr('Elemento Correctamente Borrado', 'Exito');
						},
						errorData => {
							console.log(errorData);
							this.toastr.errorToastr('Error', 'Error');
							this.onLoadInit();
						},
						() => {
							this.onLoadInit();
						});
				}
			})
			.catch(() => {});
	}
	limpiarFiltros(){
		this.formFilters.reset();
		this.tableDataFiltered = [].concat(this.tableData);
	}
	onFiltersTable(){
		let and = this.formFiltersType.value.typeFilter.toString() === '1';
		const typeSearch = and ? 'AND' : 'OR'; // 1. OR \ 2. AND for search conditions
		let tem = Util.tableFilterBetweenDate<IncidentOutDTO>(this.tableData,this.formFilters.value,'dateUpdated',false)
		.concat(Util.tableFilterBetweenDate<IncidentOutDTO>(this.tableData,this.formFilters.value,'incidentDate',false))
		.filter((el,index,arr)=>arr.indexOf(el) === index);
		if(tem.length==0 
			&& !Util.existBetweenDate(this.formFilters.value,'dateUpdated')
			&& !Util.existBetweenDate(this.formFilters.value,'incidentDate') )
			tem = this.tableData; // 
		Util.isEmptyFilters(this.formFilters.value) 
		  ? this.limpiarFiltros() 
		  : this.tableDataFiltered = Util.tableFilter<IncidentOutDTO>(tem,this.formFilters.value,typeSearch);
	}
	
    initAutoComplete() {
		this.filteredAutoTag     = this.tableData.map(d=>d.tag).filter((el,index,arr)=>arr.indexOf(el) === index);
		this.filteredAutoIncidentTypeDesc    = this.tableData.map(d=>d.incidentTypeDesc).filter((el,index,arr)=>arr.indexOf(el) === index);
		this.filteredAutoDepartment = this.tableData.map(d=>d.department).filter((el,index,arr)=>arr.indexOf(el) === index);
		this.filteredAutoUserUpdated = this.tableData.map(d=>d.userUpdated).filter((el,index,arr)=>arr.indexOf(el) === index);
  
	}
	
}
