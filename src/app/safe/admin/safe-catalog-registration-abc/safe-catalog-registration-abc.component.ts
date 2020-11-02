import { Component, OnInit } from '@angular/core';
import { CatalogType } from 'src/app/compliance/models/CatalogType';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from '../../../core/models/EventMessage';
import { MaestroDTO } from '../../../compliance/models/maestro-dto';
import { EventBlocked } from 'src/app/core/models/EventBlocked';
import { MasterCatalogService } from '../../services/master-catalog.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
	selector: 'app-safe-catalog-registration-abc',
	templateUrl: './safe-catalog-registration-abc.component.html',
	styleUrls: ['./safe-catalog-registration-abc.component.scss']
})
export class SafeCatalogRegistrationAbcComponent implements OnInit {
	catalogType: any;
	formNewCatalog:FormGroup;
	isEnableBtnSave = true;
	action='';
	constructor(
		private formBuilder:FormBuilder,
		private eventService: EventService,
		private masterCatalogService: MasterCatalogService,
		private toastr: ToastrManager,
	) { }

	ngOnInit() {
		switch(this.catalogType.action){
			case 'nuevo':
				this.action='Add'
				this.nuevoInit();
				break;
			case 'ver':
				this.isEnableBtnSave = false;
				this.action='See'
				this.verInit();
				break;
			case 'editar':
				this.editarInit();
				this.action='Edit'
				break;
				
		}

		
		/*
		this.formNewCatalog.controls['name'].disable();
		this.formNewCatalog.controls['description'].disable();
		this.formNewCatalog.controls['activated'].disable();
		//*/
	}
	nuevoInit(){
		this.formNewCatalog = this.formBuilder.group({
			maestroId: new FormControl('', null),
			nombre:[{value:'',disabled:false},[Validators.required,Validators.maxLength(30)]],
			descripcion:[{value:'',disabled:false},[Validators.required,Validators.maxLength(100)]],
			activo:[{value:true,disabled:false}],
			appId: new FormControl(2, null)
		});
	}
	verInit(){
		this.formNewCatalog = this.formBuilder.group({
			nombre:[{value:this.catalogType.element.name,disabled:true},[Validators.required,Validators.maxLength(30)]],
			descripcion:[{value:this.catalogType.element.description,disabled:true},[Validators.required,Validators.maxLength(100)]],
			activo:[{value:this.catalogType.element.activo,disabled:true}]
		});
	}
	editarInit(){
		this.formNewCatalog = this.formBuilder.group({
			maestroId: new FormControl(this.catalogType.element.maestroId, null),
			nombre:[{value:this.catalogType.element.name,disabled:false},[Validators.required,Validators.maxLength(30)]],
			descripcion:[{value:this.catalogType.element.description,disabled:false},[Validators.required,Validators.maxLength(100)]],
			activo:[{value:this.catalogType.element.activo,disabled:false}],
			appId: new FormControl(2, null)
		});
	}
	btnClickBack(){
		this.eventService.sendChangePage(
            new EventMessage(null, {}, 'Safe.SafeCatalogRegistrationComponent')
        );
	}
	onSubmitFormNewCatalog(v) {
		if(this.isEnableBtnSave){
			switch(this.catalogType.action){
				case 'nuevo':
					this.save(v);
					break;
				case 'editar':
					this.update(v);
					break;
			}
		}
	}
	save(value: MaestroDTO) {
		console.dir(value);
		
		this.masterCatalogService.saveMaster(value).subscribe(
			data => {
				this.toastr.successToastr('Guradado Completo', 'Exito!');
			},
			errorData => {
			  
			  this.toastr.errorToastr(errorData.error.message, 'Error!');
			},
			() => {
				
				this.eventService.sendChangePage(
					new EventMessage(null, {}, 'Safe.SafeCatalogRegistrationComponent')
				);
			}
		);
	}
	update(value: MaestroDTO){
		
		this.masterCatalogService.updateMaestro(value).subscribe(
			data => {
				this.toastr.successToastr('Actualizacion Completa', 'Exito!');
			},
			errorData => {
			  
			  this.toastr.errorToastr(errorData.error.message, 'Error!');
			},
			() => {
				
				this.eventService.sendChangePage(
					new EventMessage(null, {}, 'Safe.SafeCatalogRegistrationComponent')
				);
			}
		);
	}

	
	
}
