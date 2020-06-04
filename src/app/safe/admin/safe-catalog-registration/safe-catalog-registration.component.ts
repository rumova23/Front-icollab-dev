import { Component, OnInit } from '@angular/core';
import { MasterCatalogService } from '../../services/master-catalog.service';
import { MaestroDTO } from '../../../compliance/models/maestro-dto';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from '../../../core/models/EventMessage';
import { EventBlocked } from 'src/app/core/models/EventBlocked';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CatalogType } from 'src/app/compliance/models/CatalogType';

@Component({
  selector: 'app-safe-catalog-registration',
  templateUrl: './safe-catalog-registration.component.html',
  styleUrls: ['./safe-catalog-registration.component.scss']
})
export class SafeCatalogRegistrationComponent implements OnInit {


	tableCatalogos = [
	];
	tablaColumnsLabels = [
		{ key: 'order', label: '#' },
		{ key: 'name', label: 'Name' },
		{ key: 'description', label: 'Description' },
		{ key: 'user', label: 'User' },
		{ key: 'dateUptade', label: 'Last Modification Date' },
		{ key: 'status', label: 'Status' },
	];
	tableColumnsDisplay = [
		'order',
		'name',
		'description',
		'user',
		'dateUptade',
		'status',
		'sys_see',
		'sys_edit',
		'sys_delete',
	];
	tableRowPage = [50,100,150,200];
	constructor(
		private masterCatalogService: MasterCatalogService,
		private eventService: EventService,
		private confirmationDialogService: ConfirmationDialogService,
		private toastr: ToastrManager,
	) { }

	ngOnInit() {
		this.addBlock(1, "");
		this.loadMasters();
	}

	loadMasters() {
		this.masterCatalogService.catalogosAll().subscribe(
			(data: Array<MaestroDTO>) => {
				let i = 0;
				this.tableCatalogos = data.map(e=>{
					i++;
					return {
						order:i
						,maestroId:e.maestroId
						,name:e.nombre
						,description:e.descripcion
						,entidadEstatusId:e.entidadEstatusId
						,user:''
						,dateUptade:''
						,status:e.activo?'Activo':'Inactivo'
						,activo:e.activo
					};
				});
			},
			errorData => {
			  console.dir(errorData);
			},
			()=>{
				this.addBlock(2, "");
			});
	}
	tableRowSee(element){
		let type = {
			id: element.maestroId,
			action: 'ver',
			name: element.name,
			element
		};
		this.eventService.sendChangePage(
            new EventMessage(null, type, 'Safe.SafeCatalogRegistrationAbcComponent')
        );
	}
	tableRowEdit(element){
		let type = {
			id: element.maestroId,
			action: 'editar',
			name: element.name,
			element
		};
		this.eventService.sendChangePage(
            new EventMessage(null, type, 'Safe.SafeCatalogRegistrationAbcComponent')
        );
	}
	tableRowDelete(element){
		this.confirmationDialogService.confirm(
			'Confirmación',
			'¿Está seguro de eliminar el Registro?'
		)
		.then((confirmed) => {
			if ( confirmed ) {
				this.toastr.successToastr('table Row Delete', 'Seleccionaste');
				console.log(element);
			}
		})
		.catch(() => {});
	}
	btnClickAdd(){
		let type = {
			id: null,
			action: 'nuevo',
			name: ""
		};
		this.eventService.sendChangePage(
            new EventMessage(null, type, 'Safe.SafeCatalogRegistrationAbcComponent')
        );
	}



	addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
	}
}
