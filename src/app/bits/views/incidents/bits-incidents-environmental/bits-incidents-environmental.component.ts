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

@Component({
	selector: 'app-bits-incidents-environmental',
	templateUrl: './bits-incidents-environmental.component.html',
	styleUrls: ['./bits-incidents-environmental.component.scss']
})
export class BitsIncidentsEnvironmentalComponent implements OnInit {
	tableData = [];
	tablaColumnsLabels : ColumnLabel[] = [
		 {key:'order'                            ,label:'#'}
		//,{key:'id'}
		,{key:'tag',label:'TAG'}
		//,{key:'incidentTypeId',label:'Tipo de Incidente'}
		,{key:'incidentTypeDesc',label:'Tipo de Incidente'}
		,{key:'department',label:'Departamento'}
		,{key:'specificLocation',label:'Ubicación'}
		,{key:'incidentDate',label:'Fecha en que ocurrió el incidente', dateFormat:'dd/MM/yyyy HH:mm'}
		,{key:'description',label:'Descripción'}
		,{key:'rca',label:'Aplica RCA'}
		,{key:'rcaTargetDate',label:'rcaTargetDate'}
		,{key:'rcaDeliveredDate',label:'rcaDeliveredDate'}
		,{key:'active',label:'Estatus del Evento'}
		,{key:'proceed',label:'Estatus de Aprobación'}
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
		,'active'
		,'rca'
		,'EsProcedente'
		,'NombreApellidosUsuarioReportador'
		,'NombreApellidosUsuarioSupervisor'
		,'NombreApellidosUsuarioAprobador'
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
	filteredAutoTag     : string[] ;
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
		});
		this.formFiltersType = this.formBuilder.group({
			typeFilter:[2,Validators.required]
		});
	}
	onLoadInit(){
		this.addBlock(1, '');
		this.incidentService.list().subscribe((data:IncidentOutDTO[])=>{
			console.log(data);
			this.tableData = data.map((e,i)=>{
				e.order = i+1;				
				return e;
			});
		}
		,err=>{}
		,()=>{
			this.addBlock(2, '');
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
	}
	onFiltersTable(){
		let a = this.formFilters.value;
		let b = this.formFiltersType.value;
		console.log(a);
		console.log(b);
		
		
	}
	
	addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1,
			new EventBlocked(type, msg)));
	}
}
