import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { GlobalService } from 'src/app/core/globals/global.service';
import { EventService } from 'src/app/core/services/event.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
	selector: 'app-dataq-dcf-energymeters',
	templateUrl: './dataq-dcf-energymeters.component.html',
	styleUrls: ['./dataq-dcf-energymeters.component.scss']
})
export class DataqDcfEnergymetersComponent implements OnInit {
	formQuery : FormGroup;	
	tableData = [
		{order:'',dateOpCom:'',process:'',user:'',dateUpdated:'',status:''}
	];
	
	tableColumnsDisplay: string[] = [
		'order',
		'dateOpCom',
		'process',
		'user',
		'dateUpdated',
		'status',
		'sys_see',
		'sys_edit',
		'sys_delete'
	];
	tableRow_x_page = [50,100,150,200];

	constructor(
		private formBuilder: FormBuilder,
		private confirmationDialogService: ConfirmationDialogService,
		public globalService: GlobalService,
		public eventService: EventService,
		public toastr: ToastrManager
	) { }

	ngOnInit() {
		this.formQuery = this.formBuilder.group({
			date:new FormControl(moment(),Validators.required)
		});
	}

	onFormQuery(value){

	}
	onChangeDatePicker(d: Moment) {
		const month = d.month() + 1;
		const year = d.year();
		const date = d.format('MM/yyyy');
		this.toastr.successToastr(date, 'Seleccionaste');
	}
	onBtnApDeteccion(){
	}
	onBtnApCorreccion(){
	}
	onBtnDownload(){
	}
	tableRowEdit(element){
		this.toastr.successToastr('table Row Edite', 'Seleccionaste');
	}	
	tableRowSee(element){
		this.toastr.successToastr('table Row See', 'Seleccionaste');
	}
	tableRowDelete(element){
		this.confirmationDialogService.confirm(
			'Confirmación',
			'¿Está seguro de eliminar el Registro?'
		)
		.then((confirmed) => {
			if ( confirmed ) {
				this.toastr.successToastr('table Row Delete', 'Seleccionaste');
			}
		})
		.catch(() => {});
	}

}
