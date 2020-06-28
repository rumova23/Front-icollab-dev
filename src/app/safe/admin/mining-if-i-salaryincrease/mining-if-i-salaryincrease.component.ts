import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
import { PpaFinancialindicesService } from '../../services/ppa-financialindices.service';
import { DatePipe } from '@angular/common';
import Highcharts from 'highcharts';

@Component({
  selector: 'app-mining-if-i-salaryincrease',
  templateUrl: './mining-if-i-salaryincrease.component.html',
  styleUrls: ['./mining-if-i-salaryincrease.component.scss']
})
export class MiningIFISalaryincreaseComponent implements OnInit {
	
	@ViewChild('chartLineMs') chartLineMs: ElementRef;
	chartLine: any;
	// LA PROPIEDAD 'ORDER' ES NECESARIA EN EL DATA SI SE DESEA QUE SEA ORDENABLE ESTA COLUMNA
	// por eso se descarto dejar el incremental en el html
	tableData = [];
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
	tableData01 = [];
	tableColumnsLabels01=[
		{ key: 'order', label: '#' },
		{ key: 'fechaOp', label: 'Fecha de Operación Comercial' },
		{ key: 'index', label: 'Indice' },
		{ key: 'date', label: 'Fecha' },
		{ key: 'isn', label: 'Valor' }
	];
	tableColumnsDisplay01: string[] = [
		'order',
		'fechaOp',
		'index',
		'date',
		'isn',
		'sys_edit'
	];


	selectOptionsVariables : IdLabel[] = [
		{id:"1",label:'CFC am'},
		{id:"2",label:'CFOM mtm'},
	];


	formQuery: FormGroup;
	formvariables : FormGroup;
	fileUploadForm :FormGroup;
	formUpdateCosto:FormGroup;
	isManualLoad = false;

	
	valid = false;
	file: any;
	fileName: any;
	progress;
	
	originData;
	consulted = false;
	soporte = null;
	
	maxDatetoQuery = moment().subtract(1, 'months');

	currentFile: File;
	dataFileSubmit = {};
	selectedFiles: FileList;

	idYAxis = [];
	
	opt: any = {
		credits: {
			enabled: false
		},
		time: {
			timezone: 'America/Mexico_City',
			useUTC: false
		},
		chart: {
			zoomType: 'xy',
			type: 'spline',
			height: 600,
		},
		title: {
			text: 'Variables de Medidores de Energía',

		},
		exporting: {
			tableCaption: "",
			
			csv: {
			//	dateFormat: '%Y-%m-%d',
				decimalPoint: '.',
				itemDelimiter:",",
			}
		},
		xAxis: {
			gridLineWidth: 1,
			type: 'datetime'
		},
		yAxis: [],

		plotOptions: {
			series: {
				fillOpacity: 0.2
			}
		},

		tooltip: {
			shared: true
		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'bottom',
			y: -20,
			x: -10,
			floating: true,
			draggable: true,
			zIndex: 20,
			title: {
				text: 'Tags'
			},
			backgroundColor:
				Highcharts.defaultOptions.legend.backgroundColor || // theme
				'rgba(255,255,255,0.25)'
		},
		series: [],
		responsive: {
			rules: [{
				condition: {
					maxWidth: 500
				},
				chartOptions: {
					legend: {
						floating: false,
						layout: 'horizontal',
						align: 'center',
						verticalAlign: 'bottom',
						x: 0,
						y: 0
					},
					yAxis: [{
						labels: {
							align: 'right',
							x: 0,
							y: -6
						},
						showLastLabel: false
					}, {
						labels: {
							align: 'left',
							x: 0,
							y: -6
						},
						showLastLabel: false
					}, {
						visible: false
					}]
				}
			}]
		}
	};

	constructor(
		private formBuilder: FormBuilder,
		private confirmationDialogService: ConfirmationDialogService,
		public globalService: GlobalService,
		public toastr: ToastrManager,
		public eventService: EventService,
		public indicesService :PpaFinancialindicesService,
		private datePipe: DatePipe,
		private ppaMonitoringFormatService: PpaMonitoringFormatService
	) { }

	ngOnInit() {
		this.formQuery = this.formBuilder.group({
			date: new FormControl(this.maxDatetoQuery, Validators.required)
		});	
		this.formvariables = this.formBuilder.group({
			selectVariables: new FormControl('', Validators.required),
		});	
		this.fileUploadForm = this.formBuilder.group({
			file: new FormControl(null, [Validators.required, requiredFileType('xlsx')]),
		});
		this.formUpdateCosto = this.formBuilder.group({
			date: [{value: '', disabled: true}, Validators.required],
			value: [{value: '', disabled: true}, Validators.required],
		});
	}
	onChangeDatePicker(d: Moment) {
		const month = d.month() + 1;
		const year = d.year();
		const date = d.format('MM/yyyy');

		this.consulted = false;
		this.deactivateFormEdit();
	}
	onChangeSelectVariables(e){
		console.log(e);
	}
	selectFile(event) {
		this.selectedFiles = event.target.files;
	}
	clickBtnChart(){
	}
	clickBtnDownloadChart(){
	}
	clickBtnDowloadImport(){
	}
	onBtnUploadFile() {
		console.log(this.fileUploadForm.value);
		
		const mydate = this.formQuery.get('date').value;
		const mymonth  = mydate.month() + 1;
		const myyear =  +mydate.year();

		let fileReader = new FileReader();
		this.currentFile = this.selectedFiles.item(0);
		this.addBlock(1, 'Guardando archivo...');
	
		fileReader.onloadend = (e) => {
		  this.dataFileSubmit['fileName'] = this.currentFile.name;
		  this.dataFileSubmit['fileType'] = this.currentFile.name.substr(this.currentFile.name.lastIndexOf('.') + 1);
		  this.dataFileSubmit['fileContentType'] = this.currentFile.type;
		  this.dataFileSubmit['fileSize'] = this.currentFile.size;
		  this.dataFileSubmit['fileData'] = fileReader.result;
		  this.dataFileSubmit['fileData'] = this.dataFileSubmit['fileData'].replace(/^data:(.*;base64,)?/, '');
		  this.dataFileSubmit['fileData'] = this.dataFileSubmit['fileData'].trim();
			console.log(this.dataFileSubmit);
			
		  this.indicesService.salaryUploadFile(myyear,mymonth,this.originData,this.dataFileSubmit).subscribe(
			data => {
				console.log(data);
				this.salarySetData(data);
			  },
			  error => {
				  this.addBlock(2, null);
			  }).add(() => {
				this.addBlock(2, null);
		  });
		}
		fileReader.readAsDataURL(this.currentFile);
	}
	onBtnFinish(){
	}
	downloadFile(){}
	ontableRowEdit01(e){
		
		this.formUpdateCosto.get('date').setValue(new Date(this.originData.dateReference));
		this.formUpdateCosto.get('value').setValue(this.originData.value);
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
	onBtnCancel(){
		this.deactivateFormEdit();
	}
	onBtnSaveUpdate(){
		this.addBlock(1,null);
		const mydate = this.formQuery.get('date').value;
		const mymonth  = mydate.month() + 1;
		const myyear =  +mydate.year();
		const dateOp = (mymonth<10)?  myyear+"-"+"0"+mymonth:myyear+"-"+mymonth;
		const dateOp2 = (mymonth<10)?  myyear+"/"+"0"+mymonth+"/01" : myyear+"*"+mymonth+"/01";
		let v = this.formUpdateCosto.value;
		let salary = {
			dateReference :new Date(v.date).getTime(),
			value:v.value
		};
		debugger;
		this.indicesService.salaryIncreaseSaveAndEdit(myyear,mymonth,salary).subscribe(data=>{
			this.salarySetData(data);
		},error=>{
			this.toastr.errorToastr("No hay datos para esta Fecha", 'Lo siento,');
			this.addBlock(2,null);
		},()=>{
			this.addBlock(2,null);
		});
	}
	formQuerySubmit(v){
		
		const mydate = this.formQuery.get('date').value;
		const mymonth  = mydate.month() + 1;
		const myyear =  +mydate.year();
		console.log("month:"+mymonth);
		console.log("myyear:"+myyear);
		this.addBlock(1,null);
		this.indicesService.salaryIncreaseFindByDateOp(myyear,mymonth).subscribe(data=>{
			this.consulted = true;
			this.activateFormEdit();
			this.salarySetData(data);

		},error=>{
			this.consulted = true;
			this.activateFormEdit();
			this.toastr.errorToastr("No hay datos para esta Fecha", 'Lo siento,');
			this.addBlock(2,null);
		},()=>{
			this.addBlock(2,null);
		});
	}
	activateFormEdit(){
		this.formUpdateCosto.get('date').enable();
		this.formUpdateCosto.get('value').enable();
	}
	deactivateFormEdit(){
		this.formUpdateCosto.reset();
		this.formUpdateCosto.get('date').disable();
		this.formUpdateCosto.get('value').disable();
	}

	salarySetData(data){
		this.originData = data;
		this.tableData01 = [
			{order:1,fechaOp:this.datePipe.transform(new Date(data.dateOp) , 'MM/yyyy'),index:'ISN',date:this.datePipe.transform(new Date(data.dateReference) , 'dd/MM/yyyy'),isn:data.value}
		];
		let i = 0;
		this.tableData = data.logs.map(row=>{
			i++;
			return {order:i,fechaOp:this.datePipe.transform(new Date(data.dateOp) , 'MM/yyyy'),fuenteImport:'',usuario:row.userCreated,fechaMod:this.datePipe.transform(new Date(row.dateCreated) , 'dd/MM/yyyy HH:mm:ss'),estatus:row.action};
		});
		this.soporte = data.filesCenter[data.filesCenter.length  -1];
	}
	onBtndownloadFile(){
		
		this.indicesService.usppidownloadById(this.soporte['id']).subscribe(result=>{
			this.soporte;
			debugger
			let dataType = result.type;
			debugger
			let binaryData = [];
			binaryData.push(result);
			let downloadLink = document.createElement('a');
			downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
			downloadLink.setAttribute('download', this.soporte.fileName);
			downloadLink.click();
		},error=>{
			this.toastr.errorToastr("No hay datos para esta Fecha", 'Lo siento,');
		},()=>{
		});
	}

	private addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1,
			new EventBlocked(type, msg)));
	}
}
