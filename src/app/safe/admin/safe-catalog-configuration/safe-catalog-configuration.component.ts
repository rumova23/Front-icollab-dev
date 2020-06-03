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
	
		this.genericOpcionForm = this.formBuilder.group({
			codigo: new FormControl('', Validators.required),
			descripcion: new FormControl('', Validators.required),
			maestro: new FormControl('', Validators.required),
		});
		this.loadMasters();
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

			  	console.dir(data);
			},
			errorData => {
			  	console.dir(errorData);
			});
	}
	onChangeSelect(catalog){
		const nameCatalog = catalog.source.triggerValue;
		const name = catalog.value;
		this.loadOpciones(name);
	}
	onSubmitFormNewCatalogOption(value){
		if( ! this.isUpdateOpcion ){
			this.saveOpcion(value);
		}else{
			this.updateOpcion(value);
		}
	}
	saveOpcion(value){
		if(this.genericOpcionForm.valid){

			this.addBlock(1, '');
			this.masterCatalogService.saveCompleteOpcion(value).subscribe(
				data => {
				  this.toastr.successToastr('Guardado Completo', 'Exito!.');
				  this.addBlock(2, '');
				},
				errorData => {
				  this.addBlock(2, '');
				  this.toastr.errorToastr(errorData.error.message, 'Error!');
				},
				() => {
					this.addBlock(2, '');
					this.loadOpciones(value.maestro);
				});
		}else{
			this.toastr.errorToastr('Son necesarios todos los campos', 'Error.');
		}

	}
	updateOpcion(value){
		if(this.genericOpcionForm.valid && this.idOpcion != null){
			value.opcionId = this.idOpcion+"";
			this.addBlock(1, '');
			this.masterCatalogService.updateOpcion(value).subscribe(
				data => {
				this.toastr.successToastr('Actualizacion Completa', 'Exito!.');
				this.addBlock(2, '');
				},
				errorData => {
				this.addBlock(2, '');
				this.toastr.errorToastr(errorData.error.message, 'Error!');
				},
				() => {
					this.addBlock(2, '');
					this.loadOpciones(value.maestro);
					this.cancelUpdateOpcion();
				}
			);
		}else{
			this.toastr.errorToastr('Son necesarios todos los campos', 'Error.');
		}
	}
	tableRowEdit(element){
		this.idOpcion = element.opcionId;
		this.isUpdateOpcion = true;
		this.genericOpcionForm.get('codigo').setValue(element.codigo);
		this.genericOpcionForm.get('descripcion').setValue(element.descripcion);
	}
	cancelUpdateOpcion(){
		this.idOpcion = null;
		this.isUpdateOpcion = false;
		this.genericOpcionForm.get('codigo').reset();
		this.genericOpcionForm.get('descripcion').reset();
	}

	addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1,
			new EventBlocked(type, msg)));
	}
}
