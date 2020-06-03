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
				this.nuevoInit();
				break;
			case 'ver':
				this.isEnableBtnSave = false;
				this.verInit();
				break;
			case 'editar':
				this.editarInit();
				break;

		}
		console.log(this.catalogType);

	}

	nuevoInit() {
		this.genericOpcionForm = this.formBuilder.group({
			codigo: new FormControl('', Validators.required),
			descripcion: new FormControl('', Validators.required),
			maestro: new FormControl(this.catalogType.element.maestro, Validators.required),
		});
	}
	verInit() {
		this.genericOpcionForm = this.formBuilder.group({
			codigo: new FormControl('', Validators.required),
			descripcion: new FormControl('', Validators.required),
			maestro: new FormControl('', Validators.required),
		});
	}
	editarInit() {
		this.idOpcion = this.catalogType.element.opcionId;
		this.genericOpcionForm = this.formBuilder.group({
			codigo: new FormControl(this.catalogType.element.codigo, Validators.required),
			descripcion: new FormControl(this.catalogType.element.descripcion, Validators.required),
			maestro: new FormControl(this.catalogType.element.maestro, Validators.required),
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
			new EventMessage(null, {}, 'Safe.SafeCatalogConfigurationComponent')
		);
	}
	addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
	}
}
