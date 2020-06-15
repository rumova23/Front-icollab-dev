import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { GlobalService } from 'src/app/core/globals/global.service';
import { EventService } from 'src/app/core/services/event.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as moment from 'moment';
import { Moment } from 'moment';
import { PpaMonitoringFormatService } from '../../services/ppa-monitoring-format.service';
import { EventBlocked } from 'src/app/core/models/EventBlocked';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-dataq-dcf-energymeters',
	templateUrl: './dataq-dcf-energymeters.component.html',
	styleUrls: ['./dataq-dcf-energymeters.component.scss']
})
export class DataqDcfEnergymetersComponent implements OnInit {
	formQuery: FormGroup;
	tableData = [
		{ order: '', dateOpCom: '', process: '', user: '', dateUpdated: '', status: '' }
	];

	tableColumnsDisplay: string[] = [
		'order',
		'dateOpCom',
		'process',
		'user',
		'dateUpdated',
		'status',
		'sys_delete'
	];
	tableRow_x_page = [5,10,20,50, 100, 250, 500];	
	tablaColumnsLabels = [
		{ key: 'order', label: '#' },
		{ key: 'dateOpCom', label: 'Fecha de Operación Comercial' },
		{ key: 'process', label: 'Proceso' },
		{ key: 'user', label: 'Usuario' },
		{ key: 'dateUpdated', label: 'Date and Time last modified'},
		{ key: 'status', label: 'Estatus del Proceso' }
	];

	maxDate: Date;
	buttonDetected=false;
	buttonCorrected=false;
	translateSuccess = 'Success';
	constructor(
		private formBuilder: FormBuilder,
		private confirmationDialogService: ConfirmationDialogService,
		public globalService: GlobalService,
		public eventService: EventService,
		public toastr: ToastrManager,
		private translate: TranslateService,
		private ppaMonitoringFormatService: PpaMonitoringFormatService
	) { }

	ngOnInit() {
		this.maxDate = new Date(new Date().getFullYear(), (new Date().getMonth() - 1));
		this.formQuery = this.formBuilder.group({
			date: new FormControl(moment(), Validators.required)
		});
	}

	onFormQuery(value) {

	}
	onChangeDatePicker(d: Moment) {
		const month = d.month() + 1;
		const year = d.year();
		const date = d.format('MM/yyyy');
	}
	onBtnApDeteccion() {
		this.aplicarDeteccion();
	}
	onBtnApCorreccion() {
		this.aplicarCorrecion();
	}
	onBtnDownload() {
		this.translateMessages();
		this.toastr.successToastr('table Row Edite', this.translateSuccess);
	}
	tableRowEdit(element) {
	}
	tableRowSee(element) {
	}
	tableRowDelete(element) {
		this.confirmationDialogService.confirm(
			'Confirmación',
			'¿Está seguro de eliminar el Registro?'
		)
			.then((confirmed) => {
				if (confirmed) {
				}
			})
			.catch(() => { });
	}

	aplicarDeteccion() {
		const mydate = this.formQuery.get('date').value;
		const month = mydate.month() + 1;
		const year = mydate.year();
		if (mydate == null) {
			this.toastr.errorToastr('Eliga una fecha.', 'Lo siento,');
			return 0;
		}
		this.addBlock(1, '');
		this.ppaMonitoringFormatService.procesaDeteccionProfile(
			year, month
		).subscribe(
			data => {
				/*
				data = {success: true, message: "ok", code: 0}
				*/
				this.addBlock(2, '');
				this.toastr.successToastr('El archivo llego con exito', 'Ejecución lanzada con éxito.');
				console.log(data);
			},
			errorData => {
				this.addBlock(2, '');
				console.dir(errorData);
				this.toastr.errorToastr(errorData.error.message, 'Lo siento,');
			});
	}

	aplicarCorrecion() {
		const mydate = this.formQuery.get('date').value;
		const month = mydate.month() + 1;
		const year = mydate.year(); //getFullYear()
		if (mydate == null) {
			this.toastr.errorToastr('Eliga una fecha.', 'Lo siento,');
			return 0;
		}
		this.addBlock(1, '');
		this.ppaMonitoringFormatService.procesaCorreccionProfile(
			year, month
		).subscribe(
			data => {
				/*
				data = {success: true, message: "ok", code: 0}
				*/
				this.addBlock(2, '');
				this.toastr.successToastr('El archivo llego con exito', 'Ejecución lanzada con éxito.');
				console.log(data);
			},
			errorData => {
				this.addBlock(2, '');
				console.dir(errorData);
				this.toastr.errorToastr(errorData.error.message, 'Lo siento,');
			});
	}



	translateMessages(){
		this.translate.get('Success').subscribe(e => this.translateSuccess=e);
	}
	addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1,
			new EventBlocked(type, msg)));
	}
}
