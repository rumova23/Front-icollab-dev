import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { OpcionDTO } from '../../../compliance/models/opcion-dto';
import { MasterCatalogService } from '../../services/master-catalog.service';
import { MaestroDTO } from '../../../compliance/models/maestro-dto';
import { IdLabel } from 'src/app/core/models/IdLabel';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from '../../../core/models/EventMessage';
import { EventBlocked } from 'src/app/core/models/EventBlocked';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
	selector: 'app-safe-catalog-configuration',
	templateUrl: './safe-catalog-configuration.component.html',
	styleUrls: ['./safe-catalog-configuration.component.scss']
})
export class SafeCatalogConfigurationComponent implements OnInit {
	maestroId : any = null;
	genericOpcionForm:FormGroup;
	lstCatalogs : IdLabel[]=[];

	public  opcionId: string;
	public  codigo: string;
	public  descripcion: number;
	public maestro: string;

	tableOpciones = [];
	tablaColumnsLabels = [
		{ key: 'opcionId', label: 'id' },
		{ key: 'codigo', label: 'Codigo' },
		{ key: 'descripcion', label: 'Description' },
		{ key: 'maestro', label: 'Maestro' },
	];
	tableColumnsDisplay = [
		'sys_index',
		'codigo',
		'descripcion',
		'sys_edit',
	];
	tableRowPage = [50,100,150,200];

	isUpdateOpcion = false;
	idOpcion = null;

	constructor(
		private formBuilder:FormBuilder,
		public eventService: EventService,
		private masterCatalogService: MasterCatalogService,
		private toastr: ToastrManager
	) { }

	ngOnInit() {
		this.loadMasters();
		
		this.genericOpcionForm = this.formBuilder.group({
			maestro: new FormControl('', Validators.required),
		});

		if(this.maestroId != null){
			
			this.genericOpcionForm.get('maestro').setValue(this.maestroId);
			this.loadOpciones(this.maestroId);
		}
	}
	
	loadMasters(){
		this.addBlock(1, "");
		this.masterCatalogService.catalogosAll().subscribe(
			(data: Array<MaestroDTO>) => {
				this.lstCatalogs = data.map(e=>{
					return {
						//id:e.maestroId
						id:e.nombre
						,label:e.nombre
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
	loadOpciones(catalogo) {
		// nombre de tipo string
		this.masterCatalogService.getCatalogo(catalogo).subscribe(
			(data: Array<OpcionDTO>) => {
				this.tableOpciones = data;
			},
			errorData => {
			  	console.dir(errorData);
			});
	}
	onChangeSelect(catalog){
		const name = catalog.value;
		this.loadOpciones(name);
	}
	onSubmitFormNewCatalogOption(value){
		if( this.genericOpcionForm.valid ){
			let type = {
				id: null,
				action: 'nuevo',
				name: "",
				element:value
			};
			this.eventService.sendChangePage(
				new EventMessage(null, type, 'Safe.SafeCatalogConfigurationComponentAbcComponent')
			);
		}else{
			this.toastr.errorToastr('Son necesarios todos los campos', 'Error.');
		}
	}
	tableRowEdit(element){
		element.maestro = this.genericOpcionForm.get('maestro').value
		let type = {
			id: null,
			action: 'editar',
			name: "",
			element:element,
		};
		this.eventService.sendChangePage(
			new EventMessage(null, type, 'Safe.SafeCatalogConfigurationComponentAbcComponent')
		);
	}
	addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1,
			new EventBlocked(type, msg)));
	}
}
