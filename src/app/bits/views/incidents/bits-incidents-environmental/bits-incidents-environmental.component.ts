import { Component, OnInit } from '@angular/core';
import { ColumnLabel } from 'src/app/core/models/ColumnLabel';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventService } from 'src/app/core/services/event.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdLabel } from 'src/app/core/models/IdLabel';
import { IncidentService } from '../../../services/incident.service';

@Component({
	selector: 'app-bits-incidents-environmental',
	templateUrl: './bits-incidents-environmental.component.html',
	styleUrls: ['./bits-incidents-environmental.component.scss']
})
export class BitsIncidentsEnvironmentalComponent implements OnInit {
	tableData = [
		{
			order:"1"
			,TAG:"TAG"
			,TipoIncidente:"TipoIncidente"
			,Departamento:"Departamento"
			,Ubicacion:"Ubicacion"
			,FechaOcurrioIncidente:new Date()
			,AplicaRCA:"AplicaRCA"
			,EsProcedente:"EsProcedente"
			,NombreApellidosUsuarioReportador:"NombreApellidosUsuarioReportador"
			,NombreApellidosUsuarioSupervisor:"NombreApellidosUsuarioSupervisor"
			,NombreApellidosUsuarioAprobador:"NombreApellidosUsuarioAprobador"
			,EstatusEvento:"EstatusEvento"
			,EstatusAprobacion:"EstatusAprobacion"
			,UsuarioUltimaModificacion:"UsuarioUltimaModificacion"
			,FechaUltimaModificacion:new Date()
		}
	];
	tablaColumnsLabels : ColumnLabel[] = [
		 {key:'order'                            ,label:'#'}
		,{key:'TAG'                              ,label:'TAG'}
		,{key:'TipoIncidente'                    ,label:'Tipo de Incidente'}
		,{key:'Departamento'                     ,label:'Departamento'}
		,{key:'Ubicacion'                        ,label:'Ubicación'}
		,{key:'FechaOcurrioIncidente'            ,label:'Fecha en que ocurrió el incidente', dateFormat:'dd/MM/yyyy HH:mm'}
		,{key:'AplicaRCA'                        ,label:'Aplica RCA'}
		,{key:'EsProcedente'                     ,label:'Es Procedente'}
		,{key:'NombreApellidosUsuarioReportador' ,label:'Nombre(s) Apellidos Usuario Reportador'}
		,{key:'NombreApellidosUsuarioSupervisor' ,label:'Nombre(s) Apellidos Usuario Supervisor'}
		,{key:'NombreApellidosUsuarioAprobador'  ,label:'Nombre(s) Apellidos Usuario Aprobador'}
		,{key:'EstatusEvento'                    ,label:'Estatus del Evento'}
		,{key:'EstatusAprobacion'                ,label:'Estatus de Aprobación'}
		,{key:'UsuarioUltimaModificacion'        ,label:'Usuario Última Modificación'}
		,{key:'FechaUltimaModificacion'          ,label:'Fecha de Última Modificación', dateFormat:'dd/MM/yyyy HH:mm'}
	];
	tableColumnsDisplay: string[] = [
		'order'
		,'TAG'
		,'TipoIncidente'
		,'Departamento'
		,'Ubicacion'
		,'FechaOcurrioIncidente'
		,'AplicaRCA'
		,'EsProcedente'
		,'NombreApellidosUsuarioReportador'
		,'NombreApellidosUsuarioSupervisor'
		,'NombreApellidosUsuarioAprobador'
		,'EstatusEvento'
		,'EstatusAprobacion'
		,'UsuarioUltimaModificacion'
		,'FechaUltimaModificacion'
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
	filteredAutoTag     : string[] ;
	constructor(
		public eventService : EventService
		,private formBuilder: FormBuilder
		,private incidentService : IncidentService
	) { }

	ngOnInit() {
		this.incidentService.getListObservations(1).subscribe(data=>{
			console.log(data);
		});
		this.formFilters = this.formBuilder.group({
			a:[null]
		});
		this.formFiltersType = this.formBuilder.group({
			typeFilter:[2,Validators.required]
		});
	}
	onbtnAdd(){
		console.log('onbtnAdd');
		const type = {
            dto: null,
            action: 'nuevo',
			name: '',
			element: null
        };
  		this.eventService.sendChangePage(
            new EventMessage(null, type, 'Bits.BitsIncidentsEnvironmentalABC')
        );
	}
	onTableRowSee(element){
		console.log(element);	
		const type = {
            dto: null,
            action: 'ver',
			name: '',
			element
		};
  		this.eventService.sendChangePage(
            new EventMessage(null, type, 'Bits.BitsIncidentsEnvironmentalABC')
        );	
	}
	onTableRowEdit(element){
		console.log(element);
		const type = {
            dto: null,
            action: 'editar',
			name: '',
			element
		};
  		this.eventService.sendChangePage(
            new EventMessage(null, type, 'Bits.BitsIncidentsEnvironmentalABC')
        );		
	}
	onTableRowDelete(e){
		console.log(e);		
	}
	limpiarFiltros(){
		this.formFilters.reset();
	}
	onFiltersTable(){
		let a = this.formFilters.value;
		let b = this.formFiltersType.value;
		console.log(a);
		console.log(b);
		
		
	}
}
