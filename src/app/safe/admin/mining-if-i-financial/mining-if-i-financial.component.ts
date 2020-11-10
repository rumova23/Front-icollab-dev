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
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import Highcharts from 'highcharts';
import { FileCenterService } from '../../../core/services/file-center.service';
import { FileCenter } from '../../../core/models/FileCenter';

@Component({
  selector: 'app-mining-if-i-financial',
  templateUrl: './mining-if-i-financial.component.html',
  styleUrls: ['./mining-if-i-financial.component.scss']
})
export class MiningIFIFinancialComponent implements OnInit {
	@ViewChild('chartLineMs') chartLineMs: ElementRef;
	chartLine: any;
	// LA PROPIEDAD 'ORDER' ES NECESARIA EN EL DATA SI SE DESEA QUE SEA ORDENABLE ESTA COLUMNA
	// por eso se descarto dejar el incremental en el html
	tableDataBitacora = [];
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
	tableIndexFinancialData = [];
	tableIndexFinancialColumnsLabels = [
		{ key: 'order', label: '#' },
		{ key: 'fechaOp', label: 'Fecha de Operación Comercial' },
		{ key: 'index', label: 'Índice' },
		{ key: 'date', label: 'Fecha' },
		{ key: 'value', label: 'Valor' }
	];
	tableIndexFinancialColumnsDisplay = [
		'order',
		'fechaOp',
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

	selectOptionsVariables : IdLabel[] = [];

	labelInputNumberDefinitivo = 'Definitivo';
	labelInputNumberProvisional = 'Provisional';
	diaNOHabilBancarioProvisional = null;
	diaNOHabilBancarioDefinitivo = null;

	formQuery: FormGroup;
	formvariables : FormGroup;
	formEditIndexFinancial  : FormGroup;
	fileUploadForm :FormGroup;
	isManualLoad = false;

	
	valid = false;
	file: any;
	fileName: any;
	progress;
	
	isDisabledBtnQueryToExternalData = true;
	isFinalizedData = false;
	isEdit=false;

	maxDatetoQuery = moment().subtract(1, 'months');

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
	originData;
	soporte = null;
	isconsult = false;
	currentFile: File;
	dataFileSubmit = {};
	selectedFiles: FileList;
	constructor(
		private formBuilder: FormBuilder,
		private confirmationDialogService: ConfirmationDialogService,
		public globalService: GlobalService,
		public toastr: ToastrManager,
		public eventService: EventService,
		public indicesService :PpaFinancialindicesService,
		private datePipe: DatePipe,
		private fileCenterService : FileCenterService,
		private ppaMonitoringFormatService: PpaMonitoringFormatService
	) { }

	ngOnInit() {
		console.log("maxDatetoQuery   ",this.maxDatetoQuery);
		
		this.formQuery = this.formBuilder.group({
			typeVarhtml: new FormControl('', Validators.required),
			date: new FormControl(moment().subtract(1, 'months'), Validators.required)
		});	
		this.formvariables = this.formBuilder.group({
			selectVariables: new FormControl('', Validators.required),
		});	
		this.fileUploadForm = this.formBuilder.group({
			file: new FormControl(null, [Validators.required]),
			//file: new FormControl(null, [Validators.required, requiredFileType('xlsx')]),
		});
		
		this.reset();
	}
	initFormEditIndexFinancial(){
		this.isEdit = false;
		this.formEditIndexFinancial = this.formBuilder.group({
			dateProv: new FormControl(moment(), Validators.required),
			dateDef: new FormControl(moment(), Validators.required),
			valProv: new FormControl('', Validators.required),
			valDef: new FormControl('', Validators.required),
		});
		
	}
	onDatePickerQuery(d: Moment) {
		this.reset();
	}
	onSelectQuery(e){
		this.reset();
		
		
		
		console.log(e.value);
		this.labelInputNumberDefinitivo = `${e.source.triggerValue} Definitivo`;
		this.labelInputNumberProvisional = `${e.source.triggerValue} Provisional`;
		
		this.diaNOHabilBancarioProvisional = null;
		this.diaNOHabilBancarioDefinitivo = null;
		switch (e.value) {
			case '1':
				
				this.usppiSetView();
				break;
			case '2':
				this.inppSetView();
				break;
			case '3':
				this.tcSetView();
				this.diaNOHabilBancarioProvisional = '* Provisional Día NO hábil bancario';
				this.diaNOHabilBancarioDefinitivo = '* Definitivo Día NO hábil bancario';
				break;
			default:
				this.tableIndexFinancialData= [];
				break;
		}

	}
	reset(){
		this.isconsult=false;
		this.soporte = null;
		this.originData = null;
		this.tableIndexFinancialData = [];
		this.tableDataBitacora = [];

		this.formvariables.reset();
		this.initFormEditIndexFinancial();
		
		if (this.chartLine != null){
			
			for (const axis of this.idYAxis) {
				this.chartLine.get(axis).remove();
			}
			this.chartLine.destroy();
			this.chartLine = null;
		} 
	}
	
	usppiSetView(){
		this.selectOptionsVariables = [
			{id:"d",label:'USPPIm Definitivo'},
			{id:"p",label:'USPPIm Provisional'},
		];
	}
	
	inppSetView(){
		this.selectOptionsVariables = [
			{id:"d",label:'INPPm Definitivo'},
			{id:"p",label:'INPPm Provisional'},
		];
	}
	
	tcSetView(){
		this.selectOptionsVariables = [
			{id:"d",label:'TCp Definitivo'},
			{id:"p",label:'TCp Provisional'},
		];
	}
	
	onSubmitFormEditIndexFinancial(o){
		switch (this.formQuery.get('typeVarhtml').value) {
			case '1': // inpp
				this.inppEdit();
				break;
			case '2': // USPPI
				this.usppiEdit();
				break;
			case '3': // tc
				this.tcEdit();
				break;
		}
		console.log(o);
	}
	onBtnCancelFormEditIndexFinancial(){
		this.isEdit = false;
		this.initFormEditIndexFinancial();
	}
	onSubmitChart(v){
		console.log(v);
		switch (this.formQuery.get('typeVarhtml').value) {
			case '1':
				this.inppFindByDateOpBetween();
			break;
			case '2': // USPPI
				this.usppiFindByDateOpBetween();
				break;
			case '3': // tc
				this.tcFindByDateOpBetween();
				break;
		}
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
		switch (this.formQuery.get('typeVarhtml').value) {
			case '1': // inpp
				this.inppFinalize();
				break;
			case '2': // USPPI
				this.usppiFinalize();
				break;
			case '3': // tc
				this.tcFinalize();
				break;
		}
	}

	onBtndownloadFile(){
		this.usppiDownloadFile();
	}

	tableDefinitivoRowEdit(element){

	}
	tableProvisionalRowEdit(element){

	}
	formQuerySubmit(v){
		console.log(v);
		

		switch (v.typeVarhtml) {
			case '1':
				this.getInpp();
				break;
			case '2': // USPPI
				this.getUsppi();
				break;
			case '3' :
				this.getTc();
				break;
			default:
				break;
		}

	}
	onUsppiQueryExternalData(){
		const mydate = this.formQuery.get('date').value;
		const mymonth  = mydate.month() + 1;
		const myyear =  +mydate.year();
		console.log("month:"+mymonth);
		console.log("myyear:"+myyear);
		this.addBlock(1,null);
		this.indicesService.usppiQueryExternalData(myyear,mymonth).subscribe(data=>{
			this.usppiSetData(data);
		},error=>{
			this.toastr.errorToastr("No hay datos para esta Fecha", 'Lo siento,');
			this.addBlock(2,null);
		},()=>{
			this.addBlock(2,null);
		});
	}
	getUsppi(){
		const mydate = this.formQuery.get('date').value;
		const mymonth  = mydate.month() + 1;
		const myyear =  +mydate.year();
		console.log("month:"+mymonth);
		console.log("myyear:"+myyear);
		this.addBlock(1,null);
		this.indicesService.usppiFindByDateOp(myyear,mymonth).subscribe(data=>{
			this.isFinalizedData = data.finalized;
			console.log(data);
			this.usppiSetData(data);
		},error=>{
			this.tableIndexFinancialData = [];
			this.toastr.errorToastr("No hay datos para esta Fecha", 'Lo siento,');
			this.addBlock(2,null);
		},()=>{
			this.addBlock(2,null);
		});
	}
	getInpp(){
		const mydate = this.formQuery.get('date').value;
		const mymonth  = mydate.month() + 1;
		const myyear =  +mydate.year();
		console.log("month:"+mymonth);
		console.log("myyear:"+myyear);
		this.addBlock(1,null);
		this.indicesService.inppFindByDateOp(myyear,mymonth).subscribe(data=>{
			this.isEdit = true;
			this.isFinalizedData = data.finalized;
			console.log(data);
			this.inppSetData(data);
		},error=>{
			this.isEdit = true;
			this.tableIndexFinancialData = [];
			this.toastr.errorToastr("No hay datos para esta Fecha", 'Lo siento,');
			this.addBlock(2,null);
		},()=>{
			this.addBlock(2,null);
		});
	}
	getTc(){
		const mydate = this.formQuery.get('date').value;
		const mymonth  = mydate.month() + 1;
		const myyear =  +mydate.year();
		console.log("month:"+mymonth);
		console.log("myyear:"+myyear);
		this.addBlock(1,null);
		this.indicesService.tcFindByDateOp(myyear,mymonth).subscribe(data=>{
			this.isEdit = true;
			this.isFinalizedData = data.finalized;
			console.log(data);
			this.tcSetData(data);
		},error=>{
			this.isEdit = true;
			this.tableIndexFinancialData = [];
			this.toastr.errorToastr("No hay datos para esta Fecha", 'Lo siento,');
			this.addBlock(2,null);
		},()=>{
			this.addBlock(2,null);
		});
	}
	usppiSetData(data){
		this.originData = data;
		this.tableIndexFinancialData = [
			{order:1,code:'p',fechaOp:this.datePipe.transform(new Date(data.dateOp) , 'MM/yyyy'),index:'USPPIm Provisional',dateProvisional:data.dateProvisional,date:this.datePipe.transform(new Date(data.dateProvisional) , 'MM/yyyy') ,value:data.valueProvisional},
			{order:2,code:'d',fechaOp:this.datePipe.transform(new Date(data.dateOp) , 'MM/yyyy'),index:'USPPIm Definitivo',dateDefinitivo:data.dateDefinitivo,date:this.datePipe.transform(new Date(data.dateDefinitivo) , 'MM/yyyy') ,value:data.valueDefinitivo}
		];
		let i = 0;
		this.tableDataBitacora = data.logs.map(row=>{
			i++;
			return {order:i,fechaOp:this.datePipe.transform(new Date(data.dateOp) , 'MM/yyyy'),fuenteImport:'2da Corrida MM',usuario:row.userCreated,fechaMod:this.datePipe.transform(new Date(row.dateCreated) , 'dd/MM/yyyy HH:mm:ss'),estatus:row.action};
		});
		this.soporte = data.filesCenter[data.filesCenter.length  -1];
	}
	inppSetData(data){
		this.originData = data;
		this.tableIndexFinancialData = [
			{order:1,code:'p',fechaOp:this.datePipe.transform(new Date(data.dateOp) , 'MM/yyyy'),index:'INPPm Provisional',dateProvisional:data.dateProvisional,date:this.datePipe.transform(new Date(data.dateProvisional) , 'MM/yyyy') ,value:data.valueProvisional},
			{order:2,code:'d',fechaOp:this.datePipe.transform(new Date(data.dateOp) , 'MM/yyyy'),index:'INPPm Definitivo',dateDefinitivo:data.dateDefinitivo,date:this.datePipe.transform(new Date(data.dateDefinitivo) , 'MM/yyyy') ,value:data.valueDefinitivo}
		];
		let i = 0;
		this.tableDataBitacora = data.logs.map(row=>{
			i++;
			return {order:i,fechaOp:this.datePipe.transform(new Date(data.dateOp) , 'MM/yyyy'),fuenteImport:'2da Corrida MM',usuario:row.userCreated,fechaMod:this.datePipe.transform(new Date(row.dateCreated) , 'dd/MM/yyyy HH:mm:ss'),estatus:row.action};
		});
		this.soporte = data.filesCenter[data.filesCenter.length  -1];
	}
	tcSetData(data){
		this.originData = data;
		this.tableIndexFinancialData = [
			{order:1,code:'p',fechaOp:this.datePipe.transform(new Date(data.dateOp) , 'MM/yyyy'),index:'TCp Provisional',dateProvisional:data.dateProvisional,date:this.datePipe.transform(new Date(data.dateProvisional) , 'dd/MM/yyyy') ,value:data.valueProvisional},
			{order:2,code:'d',fechaOp:this.datePipe.transform(new Date(data.dateOp) , 'MM/yyyy'),index:'TCp Definitivo',dateDefinitivo:data.dateDefinitivo,date:this.datePipe.transform(new Date(data.dateDefinitivo) , 'dd/MM/yyyy') ,value:data.valueDefinitivo}
		];
		let i = 0;
		this.tableDataBitacora = data.logs.map(row=>{
			i++;
			return {order:i,fechaOp:this.datePipe.transform(new Date(data.dateOp) , 'MM/yyyy'),fuenteImport:'2da Corrida MM',usuario:row.userCreated,fechaMod:this.datePipe.transform(new Date(row.dateCreated) , 'dd/MM/yyyy HH:mm:ss'),estatus:row.action};
		});
		this.soporte = data.filesCenter[data.filesCenter.length  -1];
	}
	usppiFindByDateOpBetween(){
		const date:Moment = this.formQuery.get('date').value;
		const to = date.format("YYYY-M")+"-01";
		const from = moment(to).subtract(2, 'years').format("YYYY-M")+"-01";
		this.addBlock(1,null);
		this.indicesService.usppiFindByDateOpBetween(from,to).subscribe(data=>{
			console.log(data);
			
			if (this.chartLine != null){
				for (const axis of this.idYAxis) {
					this.chartLine.get(axis).remove();
				}
				this.chartLine.destroy();
				this.chartLine = null;
			} 
			this.chartLine = Highcharts.chart(this.chartLineMs.nativeElement, this.opt);
			this.idYAxis = [];
			let indexYAxis = 0;
			let dataChartD = data.map(mes=>{return [new Date(mes.dateOp).getTime(), parseFloat(mes.valueDefinitivo)];});
			let dataChartP = data.map(mes=>{return [new Date(mes.dateOp).getTime(), parseFloat(mes.valueProvisional)];});
			dataChartD = this.ordenar(dataChartD);
			dataChartP = this.ordenar(dataChartP);
			
			let axis = [];
			let series = [];
			axis['d'] = { // Primary yAxis
				id: 'd',
				labels: {
					format: '{value}',
					style: {
						color: Highcharts.getOptions().colors[0]
					}
				},
				title: {
					enabled: false,
					style: {
						color: Highcharts.getOptions().colors[0]
					},
					align: 'high',
					offset: 0,
					text: "Definitivo" ,
					rotation: 0,
					y: -10
				},
			};
			axis['p'] = { // Primary yAxis
				id: 'p',
				labels: {
					format: '{value}',
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
				title: {
					enabled: false,
					style: {
						color: Highcharts.getOptions().colors[1]
					},
					align: 'high',
					offset: 0,
					text: "Provicional",
					rotation: 0,
					y: -10
				},
			};
			series['d'] = {
				yAxis: 'd',
				name: 'd',
				data: dataChartD,
			};
			series['p'] = {
				yAxis: 'p',
				name: 'p',
				data: dataChartP,
			};
			let tags : [] = this.formvariables.get('selectVariables').value;
			for (let index = 0; index < tags.length; index++) {
				const tag = tags[index];
				this.idYAxis.push(tag);
				this.chartLine.addAxis(axis[tag] );
				this.chartLine.addSeries(series[tag] );
			}
		
		},error=>{
			this.addBlock(2,null);

		},()=>{
			this.addBlock(2,null);

		});
	}
	inppFindByDateOpBetween(){
		const date:Moment = this.formQuery.get('date').value;
		const to = date.format("YYYY-M")+"-01";
		const from = moment(to).subtract(2, 'years').format("YYYY-M")+"-01";
		this.addBlock(1,null);
		this.indicesService.inppFindByDateOpBetween(from,to).subscribe(data=>{
			console.log(data);
			
			if (this.chartLine != null){
				for (const axis of this.idYAxis) {
					this.chartLine.get(axis).remove();
				}
				this.chartLine.destroy();
				this.chartLine = null;
			} 
			this.chartLine = Highcharts.chart(this.chartLineMs.nativeElement, this.opt);
			this.idYAxis = [];
			let indexYAxis = 0;
			let dataChartD = data.map(mes=>{return [new Date(mes.dateOp).getTime(), parseFloat(mes.valueDefinitivo)];});
			let dataChartP = data.map(mes=>{return [new Date(mes.dateOp).getTime(), parseFloat(mes.valueProvisional)];});
			dataChartD = this.ordenar(dataChartD);
			dataChartP = this.ordenar(dataChartP);
			
			let axis = [];
			let series = [];
			axis['d'] = { // Primary yAxis
				id: 'd',
				labels: {
					format: '{value}',
					style: {
						color: Highcharts.getOptions().colors[0]
					}
				},
				title: {
					enabled: false,
					style: {
						color: Highcharts.getOptions().colors[0]
					},
					align: 'high',
					offset: 0,
					text: "Definitivo" ,
					rotation: 0,
					y: -10
				},
			};
			axis['p'] = { // Primary yAxis
				id: 'p',
				labels: {
					format: '{value}',
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
				title: {
					enabled: false,
					style: {
						color: Highcharts.getOptions().colors[1]
					},
					align: 'high',
					offset: 0,
					text: "Provicional",
					rotation: 0,
					y: -10
				},
			};
			series['d'] = {
				yAxis: 'd',
				name: 'd',
				data: dataChartD,
			};
			series['p'] = {
				yAxis: 'p',
				name: 'p',
				data: dataChartP,
			};
			let tags : [] = this.formvariables.get('selectVariables').value;
			for (let index = 0; index < tags.length; index++) {
				const tag = tags[index];
				this.idYAxis.push(tag);
				this.chartLine.addAxis(axis[tag] );
				this.chartLine.addSeries(series[tag] );
			}
		
		},error=>{
			this.addBlock(2,null);

		},()=>{
			this.addBlock(2,null);

		});
	}
	
	tcFindByDateOpBetween(){
		const date:Moment = this.formQuery.get('date').value;
		const to = date.format("YYYY-M")+"-01";
		const from = moment(to).subtract(2, 'years').format("YYYY-M")+"-01";
		this.addBlock(1,null);
		this.indicesService.tcFindByDateOpBetween(from,to).subscribe(data=>{
			console.log(data);
			
			if (this.chartLine != null){
				for (const axis of this.idYAxis) {
					this.chartLine.get(axis).remove();
				}
				this.chartLine.destroy();
				this.chartLine = null;
			} 
			this.chartLine = Highcharts.chart(this.chartLineMs.nativeElement, this.opt);
			this.idYAxis = [];
			let indexYAxis = 0;
			let dataChartD = data.map(mes=>{return [new Date(mes.dateOp).getTime(), parseFloat(mes.valueDefinitivo)];});
			let dataChartP = data.map(mes=>{return [new Date(mes.dateOp).getTime(), parseFloat(mes.valueProvisional)];});
			dataChartD = this.ordenar(dataChartD);
			dataChartP = this.ordenar(dataChartP);
			
			let axis = [];
			let series = [];
			axis['d'] = { // Primary yAxis
				id: 'd',
				labels: {
					format: '{value}',
					style: {
						color: Highcharts.getOptions().colors[0]
					}
				},
				title: {
					enabled: false,
					style: {
						color: Highcharts.getOptions().colors[0]
					},
					align: 'high',
					offset: 0,
					text: "Definitivo" ,
					rotation: 0,
					y: -10
				},
			};
			axis['p'] = { // Primary yAxis
				id: 'p',
				labels: {
					format: '{value}',
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
				title: {
					enabled: false,
					style: {
						color: Highcharts.getOptions().colors[1]
					},
					align: 'high',
					offset: 0,
					text: "Provicional",
					rotation: 0,
					y: -10
				},
			};
			series['d'] = {
				yAxis: 'd',
				name: 'd',
				data: dataChartD,
			};
			series['p'] = {
				yAxis: 'p',
				name: 'p',
				data: dataChartP,
			};
			let tags : [] = this.formvariables.get('selectVariables').value;
			for (let index = 0; index < tags.length; index++) {
				const tag = tags[index];
				this.idYAxis.push(tag);
				this.chartLine.addAxis(axis[tag] );
				this.chartLine.addSeries(series[tag] );
			}
		
		},error=>{
			this.addBlock(2,null);

		},()=>{
			this.addBlock(2,null);

		});
	}
	usppiFinalize(){
		const mydate = this.formQuery.get('date').value;
		const mymonth  = mydate.month() + 1;
		const myyear =  +mydate.year();
		console.log("month:"+mymonth);
		console.log("myyear:"+myyear);
		this.addBlock(1,null);
		this.indicesService.usppiFinalize(myyear,mymonth).subscribe(data=>{
			this.usppiSetData(data);
			this.toastr.successToastr('Finalizado');
		},error=>{
			this.tableIndexFinancialData = [];
			this.toastr.errorToastr("No hay datos para esta Fecha", 'Lo siento,');
			this.addBlock(2,null);
		},()=>{
			this.addBlock(2,null);
		});
	}
	
	inppFinalize(){
		const mydate = this.formQuery.get('date').value;
		const mymonth  = mydate.month() + 1;
		const myyear =  +mydate.year();
		console.log("month:"+mymonth);
		console.log("myyear:"+myyear);
		this.addBlock(1,null);
		this.indicesService.inppFinalize(myyear,mymonth).subscribe(data=>{
			this.inppSetData(data);
			this.toastr.successToastr('Finalizado');
		},error=>{
			this.tableIndexFinancialData = [];
			this.toastr.errorToastr("No hay datos para esta Fecha", 'Lo siento,');
			this.addBlock(2,null);
		},()=>{
			this.addBlock(2,null);
		});
	}
	
	tcFinalize(){
		const mydate = this.formQuery.get('date').value;
		const mymonth  = mydate.month() + 1;
		const myyear =  +mydate.year();
		console.log("month:"+mymonth);
		console.log("myyear:"+myyear);
		this.addBlock(1,null);
		this.indicesService.tcFinalize(myyear,mymonth).subscribe(data=>{
			this.tcSetData(data);
			this.toastr.successToastr('Finalizado');
		},error=>{
			this.tableIndexFinancialData = [];
			this.toastr.errorToastr("No hay datos para esta Fecha", 'Lo siento,');
			this.addBlock(2,null);
		},()=>{
			this.addBlock(2,null);
		});
	}
	
	selectFile(event) {
		this.selectedFiles = event.target.files;
	}
	usppiEdit(){
		let v = this.formEditIndexFinancial.value;
		this.originData;
		//this.datePipe.transform(new Date(data.dateOp) , 'MM/yyyy')
		if(v.valDef != ""){
			this.originData.valueDefinitivo = v.valDef;
			this.originData.dateDefinitivo = new Date(v.dateDef).getTime();
			this.originData.periodDefinitivo ="M"+this.datePipe.transform(new Date(v.dateDef) , 'MM');
			this.originData.periodNameDefinitivo = this.datePipe.transform(new Date(v.dateDef) , 'MMMM');
			this.originData.yearDefinitivo = this.datePipe.transform(new Date(v.dateDef) , 'yyyy');
		}
		if(v.valProv != ""){
			this.originData.valueProvisional = v.valProv;
			this.originData.dateProvisional = new Date(v.dateProv).getTime();
			this.originData.periodProvisional ="M"+this.datePipe.transform(new Date(v.dateProv) , 'MM');
			this.originData.periodNameProvisional = this.datePipe.transform(new Date(v.dateProv) , 'MMMM');
			this.originData.yearProvisional = this.datePipe.transform(new Date(v.dateProv) , 'yyyy');
		}
		this.addBlock(1,null);
		this.indicesService.usppiEdit(this.originData).subscribe(data=>{
			this.reset();
			this.usppiSetData(data);
			this.toastr.successToastr('Finalizado');
		},error=>{
			this.tableIndexFinancialData = [];
			this.toastr.errorToastr("No hay datos para esta Fecha", 'Lo siento,');
			this.addBlock(2,null);
		},()=>{
			this.addBlock(2,null);
		});
	}
	inppCrear(){
		
		const mydate = this.formQuery.get('date').value;
		const mymonth  = mydate.month() + 1;
		const myyear =  +mydate.year();
		let v = this.formEditIndexFinancial.value;
		this.originData = {};
		console.log(v);
		
		//this.datePipe.transform(new Date(data.dateOp) , 'MM/yyyy')
		if(v.valDef != ""){
			this.originData['valueDefinitivo'] = v.valDef;
			this.originData['dateDefinitivo'] = new Date(v.dateDef).getTime();
			this.originData['periodDefinitivo'] ="M"+this.datePipe.transform(new Date(v.dateDef) , 'MM');
			this.originData['periodNameDefinitivo'] = this.datePipe.transform(new Date(v.dateDef) , 'MMMM');
			this.originData['yearDefinitivo'] = this.datePipe.transform(new Date(v.dateDef) , 'yyyy');
		}
		if(v.valProv != ""){
			this.originData['valueProvisional'] = v.valProv;
			this.originData['dateProvisional'] = new Date(v.dateProv).getTime();
			this.originData['periodProvisional'] ="M"+this.datePipe.transform(new Date(v.dateProv) , 'MM');
			this.originData['periodNameProvisional'] = this.datePipe.transform(new Date(v.dateProv) , 'MMMM');
			this.originData['yearProvisional'] = this.datePipe.transform(new Date(v.dateProv) , 'yyyy');
		}
		this.originData['strDateOp'] = this.datePipe.transform(new Date(this.formQuery.get('date').value) , 'yyyy-MM')
		this.originData['dateOp'] = new Date(this.datePipe.transform(new Date(this.formQuery.get('date').value) , 'yyyy/MM')+'/01');

		
		this.addBlock(1,null);
		this.indicesService.inppNew(myyear,mymonth, this.originData).subscribe(data=>{
			this.reset();
			this.inppSetData(data);
			this.toastr.successToastr('Finalizado');
		},error=>{
			this.tableIndexFinancialData = [];
			this.toastr.errorToastr("No hay datos para esta Fecha", 'Lo siento,');
			this.addBlock(2,null);
		},()=>{
			this.addBlock(2,null);
		});
	}
	inppEdit(){
		console.log(this.originData);
		
		if(this.originData == undefined || this.originData == null){
			this.inppCrear();
			return 0;
		}
		let v = this.formEditIndexFinancial.value;
		this.originData;
		//this.datePipe.transform(new Date(data.dateOp) , 'MM/yyyy')
		if(v.valDef != ""){
			this.originData.valueDefinitivo = v.valDef;
			this.originData.dateDefinitivo = new Date(v.dateDef).getTime();
			this.originData.periodDefinitivo ="M"+this.datePipe.transform(new Date(v.dateDef) , 'MM');
			this.originData.periodNameDefinitivo = this.datePipe.transform(new Date(v.dateDef) , 'MMMM');
			this.originData.yearDefinitivo = this.datePipe.transform(new Date(v.dateDef) , 'yyyy');
		}
		if(v.valProv != ""){
			this.originData.valueProvisional = v.valProv;
			this.originData.dateProvisional = new Date(v.dateProv).getTime();
			this.originData.periodProvisional ="M"+this.datePipe.transform(new Date(v.dateProv) , 'MM');
			this.originData.periodNameProvisional = this.datePipe.transform(new Date(v.dateProv) , 'MMMM');
			this.originData.yearProvisional = this.datePipe.transform(new Date(v.dateProv) , 'yyyy');
		}
		this.addBlock(1,null);
		this.indicesService.inppEdit(this.originData).subscribe(data=>{
			this.reset();
			this.inppSetData(data);
			this.toastr.successToastr('Finalizado');
		},error=>{
			this.tableIndexFinancialData = [];
			this.toastr.errorToastr("No hay datos para esta Fecha", 'Lo siento,');
			this.addBlock(2,null);
		},()=>{
			this.addBlock(2,null);
		});
	}
	
	tcCrear(){
		
		const mydate = this.formQuery.get('date').value;
		const mymonth  = mydate.month() + 1;
		const myyear =  +mydate.year();
		let v = this.formEditIndexFinancial.value;
		this.originData = {};
		console.log(v);
		
		//this.datePipe.transform(new Date(data.dateOp) , 'MM/yyyy')
		if(v.valDef != ""){
			this.originData['valueDefinitivo'] = v.valDef;
			this.originData['dateDefinitivo'] = new Date(v.dateDef).getTime();
			this.originData['periodDefinitivo'] ="M"+this.datePipe.transform(new Date(v.dateDef) , 'MM');
			this.originData['periodNameDefinitivo'] = this.datePipe.transform(new Date(v.dateDef) , 'MMMM');
			this.originData['yearDefinitivo'] = this.datePipe.transform(new Date(v.dateDef) , 'yyyy');
		}
		if(v.valProv != ""){
			this.originData['valueProvisional'] = v.valProv;
			this.originData['dateProvisional'] = new Date(v.dateProv).getTime();
			this.originData['periodProvisional'] ="M"+this.datePipe.transform(new Date(v.dateProv) , 'MM');
			this.originData['periodNameProvisional'] = this.datePipe.transform(new Date(v.dateProv) , 'MMMM');
			this.originData['yearProvisional'] = this.datePipe.transform(new Date(v.dateProv) , 'yyyy');
		}
		this.originData['strDateOp'] = this.datePipe.transform(new Date(this.formQuery.get('date').value) , 'yyyy-MM')
		this.originData['dateOp'] = new Date(this.datePipe.transform(new Date(this.formQuery.get('date').value) , 'yyyy/MM')+'/01');

		debugger
		this.addBlock(1,null);
		this.indicesService.tcNew(myyear,mymonth, this.originData).subscribe(data=>{
			this.reset();
			this.tcSetData(data);
			this.toastr.successToastr('Finalizado');
		},error=>{
			this.tableIndexFinancialData = [];
			this.toastr.errorToastr("No hay datos para esta Fecha", 'Lo siento,');
			this.addBlock(2,null);
		},()=>{
			this.addBlock(2,null);
		});
	}
	tcEdit(){
		let v = this.formEditIndexFinancial.value;
		console.log(this.originData);
		debugger;
		if(this.originData == undefined || this.originData == null){
			this.tcCrear();
			return 0;
		}
		
		this.originData;
		//this.datePipe.transform(new Date(data.dateOp) , 'MM/yyyy')
		if(v.valDef != ""){
			this.originData.valueDefinitivo = v.valDef;
			this.originData.dateDefinitivo = new Date(v.dateDef).getTime();
			this.originData.periodDefinitivo ="M"+this.datePipe.transform(new Date(v.dateDef) , 'MM');
			this.originData.periodNameDefinitivo = this.datePipe.transform(new Date(v.dateDef) , 'MMMM');
			this.originData.yearDefinitivo = this.datePipe.transform(new Date(v.dateDef) , 'yyyy');
		}
		if(v.valProv != ""){
			this.originData.valueProvisional = v.valProv;
			this.originData.dateProvisional = new Date(v.dateProv).getTime();
			this.originData.periodProvisional ="M"+this.datePipe.transform(new Date(v.dateProv) , 'MM');
			this.originData.periodNameProvisional = this.datePipe.transform(new Date(v.dateProv) , 'MMMM');
			this.originData.yearProvisional = this.datePipe.transform(new Date(v.dateProv) , 'yyyy');
		}
		this.addBlock(1,null);
		this.indicesService.tcEdit(this.originData).subscribe(data=>{
			this.reset();
			this.tcSetData(data);
			this.toastr.successToastr('Finalizado');
		},error=>{
			this.tableIndexFinancialData = [];
			this.toastr.errorToastr("No hay datos para esta Fecha", 'Lo siento,');
			this.addBlock(2,null);
		},()=>{
			this.addBlock(2,null);
		});
	}
	usppiUploadFile(){
		if(this.originData && this.originData.id){
			this.uploadFileByFileCenter(this.originData.ename,this.originData.id,this.selectedFiles.item(0));
		}else{
			console.log(this.originData);
		}
	}
	
	uploadFileByFileCenter(father:string,fatherId:number|string, file : File){
		let fileReader  = new FileReader();
		let fileCenter  : FileCenter = {father,fatherId};
		fileReader.onloadend = (e) => {
			fileCenter['fileName'] = file.name;
			fileCenter['fileType'] = file.name.substr(file.name.lastIndexOf('.') + 1);
			fileCenter['fileContentType'] = file.type;
			fileCenter['fileSize'] = file.size;
			fileCenter['fileData'] = fileReader.result;
			fileCenter['fileData'] = fileCenter['fileData'].replace(/^data:(.*;base64,)?/, '');
			fileCenter['fileData'] = fileCenter['fileData'].trim();
			console.log(fileCenter);
			
			this.addBlock(1, 'Guardando archivo...');
			this.fileCenterService.uploadFile(fileCenter).subscribe(
				data => {
					console.log(data);
					this.soporte = data;
				  },
				  error => {
					  this.addBlock(2, null);
				  }).add(() => {
					this.addBlock(2, null);
			});//*/
		}
		fileReader.readAsDataURL(file);
	}
	usppiDownloadFile(){
		this.fileCenterService.download(this.soporte);
	}
	tableIndexFinancialRowEdit(o){
		this.isEdit = true;
	
		if('3' == this.formQuery.get('typeVarhtml').value){

			switch (o.code) {
				case 'p':
					this.formEditIndexFinancial.get('dateProv').setValue(new Date(o.dateProvisional));
					this.formEditIndexFinancial.get('valProv').setValue(o.value);
					break;
				case 'd':
					this.formEditIndexFinancial.get('dateDef').setValue(new Date(o.dateDefinitivo));
					this.formEditIndexFinancial.get('valDef').setValue(o.value);
					break;
			}
			return 0;
		}
		switch (o.code) {
			case 'p':
				this.formEditIndexFinancial.get('dateProv').setValue(moment(o.dateProvisional));
				this.formEditIndexFinancial.get('valProv').setValue(o.value);
				break;
			case 'd':
				this.formEditIndexFinancial.get('dateDef').setValue(moment(o.dateDefinitivo));
				this.formEditIndexFinancial.get('valDef').setValue(o.value);
				break;
		}
	}
	private addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1,
			new EventBlocked(type, msg)));
	}
	
	ordenar(arr) {
		const l = arr.length;
		let j, temp;
		for (let i = 1; i < l; i++) {
			j = i;
			temp = arr[i];
			while (j > 0 && arr[j - 1][0] > temp[0]) {
				arr[j] = arr[j - 1];
				j--;
			}
			arr[j] = temp;
		}
		return arr;
	}
}
