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
import { PpaFinancialindicesService } from '../../services/ppa-financialindices.service';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mining-if-i-financial',
  templateUrl: './mining-if-i-financial.component.html',
  styleUrls: ['./mining-if-i-financial.component.scss']
})
export class MiningIFIFinancialComponent implements OnInit {
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

	selectOptionsVariables : IdLabel[] = [
		{id:"1",label:'INPPm Definitivo'},
		{id:"2",label:'INPPm Provisional'},
	];

	labelInputNumberDefinitivo = 'Definitivo';
	labelInputNumberProvisional = 'Provisional';
	diaNOHabilBancarioProvisional = null;
	diaNOHabilBancarioDefinitivo = null;

	formQuery: FormGroup;
	formvariables : FormGroup;
	formIndexFinancial  : FormGroup;
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
		public indicesService :PpaFinancialindicesService,
		private datePipe: DatePipe,
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
		this.fileUploadForm = this.formBuilder.group({
			file: new FormControl(null, [Validators.required, requiredFileType('xlsx')]),
		});
		
		this.initFormIndexFinancial();
	}
	initFormIndexFinancial(){
		
		this.formIndexFinancial = this.formBuilder.group({
			dateProv: new FormControl(moment(), Validators.required),
			dateDef: new FormControl(moment(), Validators.required),
			valProv: new FormControl('', Validators.required),
			valDef: new FormControl('', Validators.required),
		});
	}
	onChangeDatePicker(d: Moment) {
		const month = d.month() + 1;
		const year = d.year();
		const date = d.format('MM/yyyy');

		this.tableIndexFinancialData = [];
		this.tableDataBitacora = [];
	}
	onChangeSelectVariables(e){
		console.log(e);
		
	}
	onChangeselectIndiceFinanciero(e){
		
		this.initFormIndexFinancial();

		console.log(e.value);
		this.labelInputNumberDefinitivo = `${e.source.triggerValue} Definitivo`;
		this.labelInputNumberProvisional = `${e.source.triggerValue} Provisional`;
		
		this.diaNOHabilBancarioProvisional = null;
		this.diaNOHabilBancarioDefinitivo = null;
		switch (e.value) {
			case '1':
				this.tableIndexFinancialData = [
					{order:1,fechaOp:'mar-20',index:'INPPm Provisional',date:'05/2020',value:'ws'},
					{order:1,fechaOp:'mar-20',index:'INPPm Definitivo',date:'05/2020',value:'ws'}
				];
				break;
			case '2':
				break;
			case '3':
				this.tableIndexFinancialData = [
					{order:1,fechaOp:'mar-20',index:'TCp Provisional',date:'01/05/2020',value:'ws'},
					{order:1,fechaOp:'mar-20',index:'TCp Definitivo',date:'01/05/2020',value:'ws'}
				];
				this.diaNOHabilBancarioProvisional = '* Provisional Día NO hábil bancario';
				this.diaNOHabilBancarioDefinitivo = '* Definitivo Día NO hábil bancario';
				break;
			default:
				this.tableIndexFinancialData= [];
				break;
		}

	}
	onSubmitFormIndexFinancial(o){
		console.log(this.formQuery.controls.typeVarhtml);
		
		console.log(o);
	}
	onBtnCancelFormIndexFinancial(){

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
		console.log(v);
		

		switch (v.typeVarhtml) {
			case '2': // USPPI
					this.getUsppi();
					this.usppiFindByDateOpBetween();
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
			this.setDataUsppi(data);
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
			console.log(data);
			this.setDataUsppi(data);

		},error=>{
			this.tableIndexFinancialData = [];
			this.toastr.errorToastr("No hay datos para esta Fecha", 'Lo siento,');
			this.addBlock(2,null);
		},()=>{
			this.addBlock(2,null);
		});
	}
	setDataUsppi(data){
		this.tableIndexFinancialData = [
			{order:1,fechaOp:this.datePipe.transform(new Date(data.dateOp) , 'MM/yyyy'),index:'USPPIm Provisional',date:this.datePipe.transform(new Date(data.dateProvisional) , 'MM/yyyy') ,value:data.valueProvisional},
			{order:1,fechaOp:this.datePipe.transform(new Date(data.dateOp) , 'MM/yyyy'),index:'USPPIm Definitivo',date:this.datePipe.transform(new Date(data.dateDefinitivo) , 'MM/yyyy') ,value:data.yearDefinitivo}
		];

		let i = 0;
		this.tableDataBitacora = data.lstUsppiBit.map(row=>{
			i++;
			return {order:i,fechaOp:this.datePipe.transform(new Date(data.dateOp) , 'MM/yyyy'),fuenteImport:'2da Corrida MM',usuario:row.userCreated,fechaMod:this.datePipe.transform(new Date(row.dateCreated) , 'dd/MM/yyyy HH:mm:ss'),estatus:row.status};
		});
	}
	usppiFindByDateOpBetween(){
		const date:Moment = this.formQuery.get('date').value;
		const to = date.format("YYYY-M")+"-01";
		const from = moment(to).subtract(1, 'years').format("YYYY-M")+"-01";
		console.log('----------------- usppiFindByDateOpBetween');
		console.log('from',from);
		console.log('to',to);
		console.log("v: ", this.formQuery.get('date').value);
		
		
				
		this.addBlock(1,null);
		this.indicesService.usppiFindByDateOpBetween(from,to).subscribe(data=>{
			console.log(data);
			
		},error=>{
			this.addBlock(2,null);

		},()=>{
			this.addBlock(2,null);

		});
	}
	tableIndexFinancialRowEdit(o){
		console.log(o);
	}
	private addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1,
			new EventBlocked(type, msg)));
	}
}
