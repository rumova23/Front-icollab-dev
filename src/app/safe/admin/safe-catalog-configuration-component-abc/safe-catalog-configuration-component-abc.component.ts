import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EventService } from 'src/app/core/services/event.service';
import { MasterCatalogService } from '../../services/master-catalog.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EventMessage } from '../../../core/models/EventMessage';
import { EventBlocked } from 'src/app/core/models/EventBlocked';

@Component({
	selector: 'app-safe-catalog-configuration-component-abc',
	templateUrl: './safe-catalog-configuration-component-abc.component.html',
	styleUrls: ['./safe-catalog-configuration-component-abc.component.scss']
})
export class SafeCatalogConfigurationComponentAbcComponent implements OnInit {
	catalogType: any;
	genericOpcionForm: FormGroup;
	isEnableBtnSave = true;
	idOpcion = null;
	titulo='';
	action='';
	constructor(
		private formBuilder: FormBuilder,
		private eventService: EventService,
		private masterCatalogService: MasterCatalogService,
		private toastr: ToastrManager,
	) { }

	ngOnInit() {
		this.titulo = this.catalogType.element.maestro;
		switch (this.catalogType.action) {
			case 'nuevo':
				this.action='Add'
				this.nuevoInit();
				break;
			case 'ver':
				this.action='See'
				this.isEnableBtnSave = false;
				this.verInit();
				break;
			case 'editar':
				this.action='Edit'
				this.editarInit();
				break;
		}
	}

	nuevoInit() {
		this.genericOpcionForm = this.formBuilder.group({
			codigo:[{value:'',disabled:false},[Validators.required,Validators.maxLength(120)]],
			descripcion:[{value:'',disabled:false},[Validators.required,Validators.maxLength(250)]],
			maestro: new FormControl(this.catalogType.element.maestro, Validators.required),
			//activo:[{value:true,disabled:false}]
		});
	}
	verInit() {
		this.genericOpcionForm = this.formBuilder.group({
			codigo: [{value:this.catalogType.element.codigo,disabled:true}, Validators.required],
			descripcion: [{value:this.catalogType.element.descripcion,disabled:true}, Validators.required],
			maestro: [{value:this.catalogType.element.maestro,disabled:true}, Validators.required],
			//activo:[{value:this.catalogType.element.activo,disabled:true}]
		});
	}
	editarInit() {
		this.idOpcion = this.catalogType.element.opcionId;
		this.genericOpcionForm = this.formBuilder.group({
			codigo: [{value:this.catalogType.element.codigo,disabled:false},[Validators.required,Validators.maxLength(30)]],
			descripcion: [{value:this.catalogType.element.descripcion,disabled:false},[Validators.required,Validators.maxLength(100)]],
			maestro: [{value:this.catalogType.element.maestro,disabled:false}, Validators.required],
			//activo:[{value:this.catalogType.element.activo,disabled:false}]
		});
		this.genericOpcionForm.controls['codigo'].disable();
	}
	onSubmitGenericOpcionForm(v) {
		if (this.isEnableBtnSave) {
			switch (this.catalogType.action) {
				case 'nuevo':
					this.saveOpcion(v);
					break;
				case 'editar':
					this.updateOpcion(v);
					break;
			}
		}
	}
	saveOpcion(value) {
		if (this.genericOpcionForm.valid) {

			this.addBlock(1, '');
			this.masterCatalogService.saveCompleteOpcion(value).subscribe(
				data => {
					this.toastr.successToastr('Guardado Completo', 'Exito!');
					this.addBlock(2, '');
				},
				errorData => {
					this.addBlock(2, '');
					this.toastr.errorToastr(errorData.error.message, 'Error!');
				},
				() => {
					this.addBlock(2, '');
					this.btnClickBack();
				});
		} else {
			this.toastr.errorToastr('Son necesarios todos los campos', 'Error.');
		}

	}
	updateOpcion(value) {
		if (this.genericOpcionForm.valid && this.idOpcion != null) {
			value.opcionId = this.idOpcion + "";
			value.codigo = this.catalogType.element.codigo;
			this.addBlock(1, '');
			this.masterCatalogService.updateOpcion(value).subscribe(
				data => {
					this.toastr.successToastr('Actualizacion Completa', 'Exito!');
					this.addBlock(2, '');
				},
				errorData => {
					this.addBlock(2, '');
					this.toastr.errorToastr(errorData.error.message, 'Error!');
				},
				() => {
					this.addBlock(2, '');
					this.btnClickBack();
				}
			);
		} else {
			this.toastr.errorToastr('Son necesarios todos los campos', 'Error.');
		}
	}


	btnClickBack() {
		this.eventService.sendChangePage(
			new EventMessage(null, {name:this.catalogType.element.maestro}, 'Safe.SafeCatalogConfigurationComponent')
		);
	}
	addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
	}
}
