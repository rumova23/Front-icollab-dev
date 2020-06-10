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
  selector: 'app-mining-if-i-financial',
  templateUrl: './mining-if-i-financial.component.html',
  styleUrls: ['./mining-if-i-financial.component.scss']
})
export class MiningIFIFinancialComponent implements OnInit {
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
	tableProvisionalData = [{index:'',date:'',value:''}];
	tableDefinitivoData = [{index:'',date:'',value:''}];
	tableDefinitivoColumnsLabels=[
		{ key: 'index', label: 'Índice' },
		{ key: 'date', label: 'Fecha' },
		{ key: 'value', label: 'Valor' }
	];
	tableDefinitivoColumnsDisplay: string[] = [
		'index',
		'date',
		'value',
		'sys_edit'
	];

	selectIndiceFinanciero : IdLabel[] = [
		{id:"1",label:'INPPm'},
		{id:"2",label:'USPPIm'},
		{id:"3",label:'TCp'},
	];

	selectOptionsVariables : IdLabel[] = [
		{id:"1",label:'INPPm Definitivo'},
		{id:"2",label:'INPPm Provisional'},
	];

	labelInputNumberDefinitivo = 'Valor Definitivo';
	labelInputNumberProvisional = 'Valor Provisional';
	diaNOHabilBancarioProvisional = null;
	diaNOHabilBancarioDefinitivo = null;

	formQuery: FormGroup;
	formvariables : FormGroup;
	formValorDefinitivo  : FormGroup;
	formValorProvisional : FormGroup;
	fileUploadForm :FormGroup;
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
		this.formQuery = this.formBuilder.group({
			typeVarhtml: new FormControl('', Validators.required),
			date: new FormControl(moment(), Validators.required)
		});	
		this.formvariables = this.formBuilder.group({
			selectVariables: new FormControl('', Validators.required),
		});	
		this.formValorDefinitivo = this.formBuilder.group({
			indice:[]
		});
		this.formValorProvisional = this.formBuilder.group({
			indice:[]
		});
		this.fileUploadForm = this.formBuilder.group({
			file: new FormControl(null, [Validators.required, requiredFileType('xlsx')]),
		});
	}
	onChangeDatePicker(d: Moment) {
		const month = d.month() + 1;
		const year = d.year();
		const date = d.format('MM/yyyy');
	}
	onChangeSelectVariables(e){
		console.log(e);
		
	}
	onChangeselectIndiceFinanciero(e){
		/**
			selectIndiceFinanciero : IdLabel[] = [
				{id:"1",label:'INPPm'},
				{id:"2",label:'USPPIm'},
				{id:"3",label:'TCp'},
			];
		 */
		console.log(e.value);
		this.labelInputNumberDefinitivo = `Valor ${e.source.triggerValue} Definitivo`;
		this.labelInputNumberProvisional = `Valor ${e.source.triggerValue} Provisional`;
		
		this.diaNOHabilBancarioProvisional = null;
		this.diaNOHabilBancarioDefinitivo = null;
		switch (e.value) {
			case '1':
				this.tableProvisionalData = [
					{index:'INPPm',date:'05/2020',value:'ws'}
				];
				this.tableDefinitivoData = [
					{index:'INPPm',date:'05/2020',value:'ws'}
				];
				break;
			case '2':
				this.tableProvisionalData = [
					{index:'USPPIm',date:'05/2020',value:'ws'}
				];
				this.tableDefinitivoData = [
					{index:'USPPIm',date:'05/2020',value:'ws'}
				];
				break;
			case '3':
				this.tableProvisionalData = [
					{index:'TCp',date:'05/2020',value:'ws'}
				];
				this.tableDefinitivoData = [
					{index:'TCp',date:'05/2020',value:'ws'}
				];
				this.diaNOHabilBancarioProvisional = '* Día NO hábil bancario';
				this.diaNOHabilBancarioDefinitivo = '* Día NO hábil bancario';
				break;
			default:
				this.tableProvisionalData= [];
				this.tableDefinitivoData= [];
				break;
		}

	}
	clickBtnChart(){
	}
	clickBtnDownloadChart(){
	}
	clickBtnDowloadImport(){
	}
	onBtnConsultar(){

	}
	onBtnCancelDefinitivo(){

	}
	onBtnSaveUpdateDefinitivo(){

	}
	onBtnCancelProvisional(){}
	onBtnSaveUpdateProvisional(){}
	onBtnUploadFile() {
		const mydate = this.formQuery.get('date').value;
		const month = mydate.month() + 1;
		const year = mydate.year();
	}
	onBtnFinish(){
	}
	downloadFile(){}
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
	tableDefinitivoRowEdit(element){

	}
	tableProvisionalRowEdit(element){

	}
	formQuerySubmit(v){

	}
	private addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1,
			new EventBlocked(type, msg)));
	}
}
