import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { requiredFileType } from 'src/app/core/helpers/requiredFileType';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventBlocked } from 'src/app/core/models/EventBlocked';
import { EventService } from 'src/app/core/services/event.service';
import * as moment from 'moment';
import { IdLabel } from 'src/app/core/models/IdLabel';
import { MatSelectChange } from '@angular/material';
import { PpaMonitoringFormatService } from '../../services/ppa-monitoring-format.service';

@Component({
	selector: 'app-safe-energy-meters',
	templateUrl: './safe-energy-meters.component.html',
	styleUrls: ['./safe-energy-meters.component.scss']
})
export class SafeEnergyMetersComponent implements OnInit {
	// LA PROPIEDAD 'ORDER' ES NECESARIA EN EL DATA SI SE DESEA QUE SEA ORDENABLE ESTA COLUMNA
	// por eso se descarto dejar el incremental en el html
	tableData = [
		{order:1,fechaOp:'mar-20',fuenteImport:'2da Corrida MM',usuario:'Manuel Herrera',fechaMod:'01/04/2020 01:40:00 pm',estatus:'exitosa'},
		{order:2,fechaOp:'mar-20',fuenteImport:'2da Corrida MM',usuario:'Sistema'       ,fechaMod:'01/04/2020 12:40:00 pm',estatus:'exitosa'},
		{order:3,fechaOp:'mar-20',fuenteImport:'1ra Corrida MM',usuario:'Ivette Colin'  ,fechaMod:'01/04/2020 12:40:00 pm',estatus:'exitosa'},
		{order:4,fechaOp:'mar-20',fuenteImport:'1ra Corrida MM',usuario:'Sistema'       ,fechaMod:'01/04/2020 11:40:00 pm',estatus:'exitosa'},
		{order:5,fechaOp:'mar-20',fuenteImport:'1ra Corrida MM',usuario:'Sistema'       ,fechaMod:'01/04/2020 11:40:00 pm',estatus:'exitosa'}
	];
	tablaColumnsLabels=[
		{ key: 'order', label: '#' },
		{ key: 'fechaOp', label: 'Fecha de Operación Comercial' },
		{ key: 'fuenteImport', label: 'Fuente de Importación' },
		{ key: 'usuario', label: 'Usuario' },
		{ key: 'fechaMod', label: 'Fecha y Hora Ultima Modificación' },
		{ key: 'estatus', label: 'Estatus de la Importación' }
	];
	tableColumnsDisplay: string[] = [
		'order',
		'fechaOp',
		'fuenteImport',
		'usuario',
		'fechaMod',
		'estatus',
		'sys_delete'
	];
	tableRow_x_page = [5,10,20,50, 100, 250, 500];

	selectOptionsFuente : IdLabel[] = [
		{id:"1",label:'FileZilla FTP'},
		{id:"2",label:'PAYSERVER DB'},
		{id:"3",label:'PI SERVER DB'},
		{id:"4",label:'Manual'}
	];
	selectOptionsVariables : IdLabel[] = [
		{id:"1",label:'variable 1'},
		{id:"2",label:'variable 2'},
		{id:"3",label:'variable 3'},
		{id:"4",label:'variable 4'}
	];

	fileUploadForm: FormGroup;
	formvariables : FormGroup;
	isManualLoad = false;

	
	valid = false;
	file: any;
	fileName: any;
	progress;
	


	constructor(
		private formBuilder: FormBuilder,
		private confirmationDialogService: ConfirmationDialogService,
		public globalService: GlobalService,
		public toastr: ToastrManager,
		public eventService: EventService,
		private ppaMonitoringFormatService: PpaMonitoringFormatService
	) { }

	ngOnInit() {
		if(this.globalService.plant.name.toLowerCase() == 'aguila'){
			this.selectOptionsFuente = [
				{id:"1",label:'FileZilla FTP'},
				{id:"2",label:'PAYSERVER DB'},
				{id:"3",label:'PI SERVER DB'},
				{id:"4",label:'Manual'}
			];
		}else{
			this.selectOptionsFuente = [
				{id:"1",label:'FileZilla FTP'},
				{id:"2",label:'CTUNG DB'},
				{id:"3",label:'PI SERVER DB'},
				{id:"4",label:'Manual'}
			];
		}
		this.fileUploadForm = this.formBuilder.group({
			file: new FormControl(null, [Validators.required, requiredFileType('xlsx')]),
			typeVarhtml: new FormControl('', Validators.required),
			date: new FormControl(moment(), Validators.required)
		});	
		this.formvariables = this.formBuilder.group({
			selectVariables: new FormControl('', Validators.required),
		});	
	}
	onChangeSelectFuente(e:MatSelectChange){
		this.isManualLoad = e.value == '4' ? true:false;
	}
	onChangeDatePicker(d: Moment) {
		const month = d.month() + 1;
		const year = d.year();
		const date = d.format('MM/yyyy');
	}
	onChangeSelectVariables(e){

	}
	clickBtnChart(){
	}
	clickBtnDownloadChart(){
	}
	clickBtnImportFromDate(){
		console.log(this.fileUploadForm.value);
	}
	clickBtnDowloadImport(){
	}

	upload(value) {
		const mydate = this.fileUploadForm.get('date').value;
		const month = mydate.month() + 1;
		const year = mydate.year();
		if (mydate == null) {
		  this.toastr.errorToastr('Eliga una fecha.', 'Lo siento,');
		  return 0;
		}
		this.addBlock(1, '');
		const reader = new FileReader();
		reader.onloadend = (e) => {
		  this.file = reader.result;
		  this.file = this.file.replace(/^data:(.*;base64,)?/, '');
		  this.file = this.file.trim();
		  this.fileName = value.file.name;
		  this.ppaMonitoringFormatService.uploadPerfil({
				file: this.file,
				name: this.fileName,
				year: year,
				month: month
			  }).subscribe (
			  data => {
				this.addBlock(2, '');
				this.toastr.successToastr('El archivo llego con exito', 'Ejecución lanzada con éxito.');
			  },
			  errorData => {
				this.addBlock(2, '');
				console.dir(errorData);
				this.toastr.errorToastr(errorData.error.message, 'Lo siento,');
			  });
		};
		reader.readAsDataURL(value.file);
	  }
	
	
	tableRowDelete(element){
		this.confirmationDialogService.confirm(
			'Confirmación',
			'¿Está seguro de eliminar el Registro?'
		)
		.then((confirmed) => {
			if ( confirmed ) {
				console.log(element);
			}
		})
		.catch(() => {});
	}
	private addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1,
			new EventBlocked(type, msg)));
	}
}
