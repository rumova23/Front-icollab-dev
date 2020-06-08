/* tslint:disable:indent */
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { DatePipe } from '@angular/common';
import { requiredFileType } from 'src/app/core/helpers/requiredFileType';
import * as chartDemo from './chartDemo.json';

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {MY_FORMAT_DATE_PICKER} from '../../../core/models/MyFormatDatePicker';
import * as moment from 'moment';

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/


import { PpaMonitoringFormatService } from '../../services/ppa-monitoring-format.service';
/* Highcharts */
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import HC_stock from 'highcharts/modules/stock';
import HC_customEvents from 'highcharts-custom-events';
import HC_exportdata from 'highcharts/modules/export-data';
import Highcharts3d from 'highcharts/highcharts-3d';
// import theme from 'highcharts/themes/sunset';
import theme           from 'highcharts/themes/gray.src';
import { Sort, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import {Constants} from '../../../core/globals/Constants';
import {MonitoringService} from '../../services/monitoring.service';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventBlocked } from 'src/app/core/models/EventBlocked';
import {MaestroOpcionDTO} from '../../../compliance/models/maestro-opcion-dto';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {saveAs} from 'file-saver';
// import theme           from 'highcharts/themes/dark-green';
import { IdLabel } from 'src/app/core/models/IdLabel';
import { Moment } from 'moment';
HC_exporting(Highcharts);
HC_stock(Highcharts);
HC_customEvents(Highcharts);
HC_exportdata(Highcharts);
// Highcharts3d(Highcharts);
// theme(Highcharts);
/* ./ Highcharts */

@Component({
	selector: 'app-safe-ppamonitoring-station',
	templateUrl: './safe-ppamonitoring-station.component.html',
	styleUrls: ['./safe-ppamonitoring-station.component.scss'],
	providers: [
		{
		  provide: DateAdapter,
		  useClass: MomentDateAdapter,
		  deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
		},
	
		{provide: MAT_DATE_FORMATS, useValue: MY_FORMAT_DATE_PICKER},
	  ],
})
export class SafePPAMonitoringStationComponent implements OnInit {
	@ViewChild('chartLineMs') chartLineMs: ElementRef;
	chartLine: any;
	filterDatesFormGroup: FormGroup;
	dateIni: Date;
	dateFin: Date;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

	selectOptionsFuente : IdLabel[] = [
		{id:"1",label:'FileZilla FTP'},
		{id:"2",label:'PAYSERVER DB'},
		{id:"3",label:'PI SERVER DB'},
		{id:"4",label:'Manual'}
	];
	formvariables : FormGroup;
	
	tagsList: IdLabel[] = [];
    dataSource;
    data: any[] = [];
    displayedColumnsOrder: any[] = [];
    displayedColumnsActions: any[] = [];
    columnsToDisplay: string[] = [];
	tableRow_x_page = [5];
    showAdd = true;
    showView = false;
    showUpdate = false;
    showDelete = true;

	etapa001: number;

	existsLoad: boolean;
	buttonExists: boolean;


	valid = false;
	fileUploadForm: FormGroup;
	file: any;
	fileName: any;
	progress;
	title;
	date = new FormControl(moment());
	// https://jsfiddle.net/highcharts/4jZ7T/
	public opt: any = {
		time: {
			timezone: 'America/Mexico_City',
			useUTC: false
		},
		chart: {
			zoomType: 'xy',
			type: 'area'
		},
		title: {
			text: 'Variables de Estación de Supervisión',
			
		},
		exporting: {
			tableCaption: ""
		},
		xAxis: {
			type: 'datetime'
		},
		yAxis: [  ],
		
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
	typeVarhtml: any;
	idYAxis=[];
	manualImport=false;
	maxDate: Date;
	constructor(
		public globalService: GlobalService,
		private fb: FormBuilder,
		private toastr: ToastrManager,
		public eventService: EventService,
		private confirmationDialogService: ConfirmationDialogService,
		private ppaMonitoringFormatService: PpaMonitoringFormatService,
		private monitoringService: MonitoringService,
		private datePipe: DatePipe) { }

	chosenYearHandler(normalizedYear: any) {
		const ctrlValue = this.date.value;
		ctrlValue.year(normalizedYear.year());
		this.date.setValue(ctrlValue);
	}

	chosenMonthHandler(normalizedMonth: any, datepicker: MatDatepicker<any>) {
		const ctrlValue = this.date.value;
		ctrlValue.month(normalizedMonth.month());
		this.date.setValue(ctrlValue);
		datepicker.close();
		this.resetScreen();
		this.stangeLoadRaw();
	}
	resetScreen() {
		// this.dataSource = new MatTableDataSource<any>([]);
		this.formvariables.get('tags').reset();
		if (this.chartLine !== undefined) {
			this.chartLine.destroy();
			this.chartLine = undefined;
		}
	}
	changeIn(evt){
		const v = +evt.value; // el 4 es carga manual
		this.manualImport = (v==4) ? true : false;
	}
	clickBtnDowloadImport(){

	}
	ordenar(arr) {
		const l = arr.length;
		let j, temp;

		for ( let i = 1; i < l; i++ ) {
		  j = i;
		  temp = arr[ i ];
		  while ( j > 0 && arr[ j - 1 ][0] > temp[0] ) {
			arr[ j ] = arr[ j - 1 ];
			j--;
		  }
		  arr[ j ] = temp;
		}

		return arr;
	}

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
		this.formvariables = this.fb.group({
			tags: new FormControl('', Validators.required),
		});	

		this.maxDate = new Date(new Date().getFullYear(), (new Date().getMonth() - 1 ));
		this.existsLoad = true;
		this.buttonExists = true;
		this.ppaMonitoringFormatService.getCatalogoOpcion('Etapa Tag', '001').subscribe(
		(data: MaestroOpcionDTO) => {
			this.etapa001 = data.maestroOpcionId;
			this.ppaMonitoringFormatService.getTags(this.etapa001).subscribe((dataInterno) => {
				this.addBlock(2,'');
				dataInterno.forEach(element => {
					this.tagsList.push({id:element.tag,label:element.tag});
				});
			});
		});
		this.addBlock(1, '');
		this.ppaMonitoringFormatService.obtenBitacoraLoadRaw().subscribe(
			data => {
				this.addBlock(2, '');
				console.dir(data);
			},
			errorData => {
				this.addBlock(2, '');
				console.dir(errorData);
				this.toastr.errorToastr(errorData.error.message, 'Lo siento,');
			});
		this.setColumnsToDisplay();
		this.filterDatesFormGroup = new FormGroup({});
		this.fileUploadForm = this.fb.group({
			file: new FormControl(null, [Validators.required, requiredFileType('zip')]),
			typeVarhtml: new FormControl('', Validators.required),
			date: new FormControl(moment(), Validators.required)
		});	
		//this.chartLine = Highcharts.chart(this.chartLineMs.nativeElement, this.opt);
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
	setChartData() {
		/*this.dataSource = [
			{order : '1', dateOpCom : 'mar-20', Import : 'Manuel', user : 'Manuel Herrera', dateUpdated : '01/04/2020 10:40:00 a.m', status : 'Exitosa', sys_see : 'sys_see', sys_edit : 'sys_edit', sys_delete : 'sys_delete'},
			{order : '2', dateOpCom : 'mar-20', Import : 'PI SERVER DSB', user : 'Ivette Colin', dateUpdated : '01/04/2020 10:40:00 a.m', status : 'Fallida', sys_see : 'sys_see', sys_edit : 'sys_edit', sys_delete : 'sys_delete'},
			{order : '3', dateOpCom : 'mar-20', Import : 'FilleZilla FTP', user : 'Sistema', dateUpdated : '01/04/2020 10:40:00 a.m', status : 'Fallida', sys_see : 'sys_see', sys_edit : 'sys_edit', sys_delete : 'sys_delete'},

		];//*/
		this.addBlock(1,'');
		this.ppaMonitoringFormatService.obtenBitacoraLoadRaw().subscribe(
			data => {
				this.addBlock(2,'');
				this.dataSource = [];
				let i=1;
				for (const d of data) {
					this.dataSource.push(
						{
							"order":i,
							"dateOpCom": d.fechaOperacionComercial,
							"Import": d.fuenteImportacion,
							"dateUpdated": d.fechaUltimaModificacion?d.fechaUltimaModificacion:"-",
							"status": d.estatusImportacion,
							"user": d.usuario?d.usuario:"system"
						}
					);
					i+=1;
				}
				//this.dataSource = new MatTableDataSource<any>(this.dataSource);
				//this.dataSource.paginator = this.paginator;

			},
			errorData => {
				this.addBlock(2,'');
				console.dir(errorData);
				this.toastr.errorToastr(errorData.error.message, 'Lo siento,');
			});
	}
	setColumnsToDisplay() {
		this.setChartData();
		this.displayedColumnsOrder = [
			{ key: 'order', label: '#' },
			{ key: 'dateOpCom', label: 'Fecha de Operación Comercial' },
			{ key: 'Import', label: 'Fuente de Importación' },
			{ key: 'user', label: 'Usuario' },
			{
				key: 'dateUpdated',
				label: 'Date and Time last modified'
			},
			{ key: 'status', label: 'Estatus de la Importación' }
		];

		this.displayedColumnsActions = [];
		this.columnsToDisplay = [
			'order',
			'dateOpCom',
			'Import',
			'user',
			'dateUpdated',
			'status'
		];

		if (this.showView) {
			this.displayedColumnsActions.push({
				key: 'sys_see',
				label: 'See'
			});
			this.columnsToDisplay.push('sys_see');
		}
		if (this.showUpdate) {
			this.displayedColumnsActions.push({
				key: 'sys_edit',
				label: 'Edit'
			});
			this.columnsToDisplay.push('sys_edit');
		}
		if (this.showDelete) {
			this.displayedColumnsActions.push({
				key: 'sys_delete',
				label: 'Delete'
			});
			this.columnsToDisplay.push('sys_delete');
		}
	}
    sortData(sort: Sort) {
    }
	searchTagsFromTo() {
	
		//let dateOpComm = this.datePipe.transform(this.dateOpComm, 'yyyy-MM-dd');
		let tags     = this.formvariables.get('tags').value;
		let count = 0;
		if(tags == null || tags.length == 0 || this.date.value == null){
			this.toastr.errorToastr("Todos los campos son necesarios.", 'Lo siento,');
			return 0;
		}

		for (const axis of this.idYAxis) {
			this.chartLine.get(axis).remove();
		}
		if(this.chartLine)this.chartLine.destroy();
		this.chartLine = Highcharts.chart(this.chartLineMs.nativeElement, this.opt);
		this.idYAxis = [];
		let data:any = [
			{nameParameter: "year",valueParameter: new Date(this.date.value).getFullYear()},
			{nameParameter: "mount",valueParameter: new Date(this.date.value).getMonth() + 1}];
		let indexYAxis=0;
		this.addBlock(1,'Graficando');
		for (const tag of tags) {
			this.ppaMonitoringFormatService.get(tag, data).subscribe((data) => {
				count +=1;
				if(count == tags.length)this.addBlock(2,'');
				if (data == null) {
					this.toastr.warningToastr(tag + ' no contiene datos en estas fechas', 'Lo siento,');
					return false;
				}
				let fdss = [];
				let name;
				for (const dia of data) {
					name = dia.tag;
					dia.fechaTag; // "2020/2/15"
					for (const dato of dia.valores) {
						dato.timeEnd;
						dato.timeini;
						dato.status; // " 08:20"
						fdss.push([new Date(dia.fechaTag + ' ' + dato.timeini + ':00').getTime(), dato.value]);
					}
				}
				let unidad = '';
				if (tag.includes('TBS') || tag.includes('TAM')) {
					unidad = '°C';
				}
				if (tag.includes('SGM') || tag.includes('IGM')) {
					unidad = 'kj/kg';
				}
				if (tag.includes('SGV') || tag.includes('IGV')) {
					unidad = 'kj/m3';
				}
				if (tag.includes('HRE')) {
					unidad = '%';
				}
				if (tag.includes('PBA')) {
					unidad = 'BAR';
				}
				this.idYAxis.push(name);
				this.chartLine.addAxis({ // Primary yAxis
					id: name,
					labels: {
						format: '{value}',
						style: {
							color: Highcharts.getOptions().colors[indexYAxis]
						}
					},
					title: {						
						enabled: false,
						style: {
							color: Highcharts.getOptions().colors[indexYAxis]
						},
						align: 'high',
						offset: 0,
						text: " "+name+' ('+unidad+") ",
						rotation: 0,
						y: -10
					},
				});
				fdss = this.ordenar(fdss);
				this.chartLine.addSeries(
					{
						yAxis: name,
						name: name,
						data: fdss,
					}
				);
				indexYAxis += 1;
				// this.opt.xAxis.categories = lstX;
			},error=>{
				count +=1;
				if(count == tags.length)this.addBlock(2,'');
			});
		}
	}
	dateChangeIni(event) {
		this.dateIni = event.value;
		if (this.dateFin != null) {
			if (this.dateIni.getTime() >= this.dateFin.getTime()) {
				this.dateFin = new Date(this.dateIni);
			}
		}
	}
	dateChangeFin(event) {
		this.dateFin = event.value;
	}

	validaEjecutaProceso() {
		console.log(this.existsLoad);
		if (this.existsLoad) {
			console.log('entro al confirm');
			this.confirmationDialogService.confirm('Por favor, confirme..',
				'La carga para fecha comercial ya existe: Necesita Sobreescribirla?').then((confirmed) => {
				if (confirmed) {
					this.ejecutaProceso();
				}
			}).catch(() => console.log('Salio'));
		} else {
			console.log('se fue directo al else');
			this.ejecutaProceso();
		}
	}

	ejecutaProceso() {
		if (this.fileUploadForm.controls.typeVarhtml.value === '1') {
			if (this.date.value == null){
				this.toastr.errorToastr('Eliga una Fecha', 'Lo siento,');
				return 0;
			}
			// this.toastr.successToastr('Procesando el mes anterior, Desde fillezila. Espere por favor.', '.... Procesando');
			this.executeProcess('FILEZILLA', new Date(this.date.value).getFullYear(), new Date(this.date.value).getMonth() + 1);
		}

		if (this.fileUploadForm.controls.typeVarhtml.value === '4') {
			this.toastr.successToastr('Procesando el mes anterior, Upload Zip Manualmente . Espere por favor.', '.... Procesando');
		}
	}

	executeProcess(applicationName: string, year: number, month: number) {
		this.addBlock(1, 'Importando información');
		this.monitoringService.executeProcessYearMonth(applicationName, year, month).subscribe(
			data => {
				this.toastr.successToastr('Ejecutando proceso ' + year + '/' + month + ' para: ' + applicationName, 'Ejecución lanzada con éxito.');
			},
			errorData => {
				this.addBlock(2, null);
			}).add(() => {
			this.addBlock(2, null);
		});
	}

	upload(value) {
		this.typeVarhtml = this.fileUploadForm.controls.typeVarhtml.value;
		if (this.typeVarhtml == null || this.date.value == null) {
			this.toastr.errorToastr('Todos los campos son necesarios.', 'Lo siento,');
			return 0;
		}

		if (this.fileUploadForm.controls.typeVarhtml.value === '4') {
			const message = 'Procesando el mes: ' + (new Date(this.date.value).getMonth() + 1) + ' del año: ' +  new Date(this.date.value).getFullYear() + '. Upload Zip Manualmente; espere por favor.';
			this.toastr.successToastr(message, '.... Procesando');
		} else {
			// this.toastr.errorToastr('No es Proceso Manual.', 'Lo siento,');
			return 0;
		}
		this.addBlock(1,'');
		this.valid = false;
		const reader = new FileReader();
		reader.onloadend = (e) => {
			this.file = reader.result;
			this.file = this.file.replace(/^data:(.*;base64,)?/, '');
			this.file = this.file.trim();
			this.fileName = value.file.name;
			this.ppaMonitoringFormatService.entradaManual( new Date(this.date.value).getFullYear(),
			 new Date(this.date.value).getMonth() + 1, {
				file: this.file,
				name: this.fileName,
				idTypeImport: 4,
				nameImport: 'no aplica'
			}).subscribe(
				data => {
					this.addBlock(2,'');
					console.log(data);
					this.toastr.successToastr('El archivo llego con exito', 'Ejecución lanzada con éxito.');
				},
				errorData => {
					this.addBlock(2,'');
					console.dir(errorData);
					this.toastr.errorToastr(errorData.error.message, 'Lo siento,');
				});
		}
		reader.readAsDataURL(value.file);
	}
	private addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1,
			new EventBlocked(type, msg)));
	}
	onChangeDatePicker(d: Moment) {
		this.date.setValue(d);
	}

	download() {
		const year = new Date(this.date.value).getFullYear();
		const month =  new Date(this.date.value).getMonth() + 1;
		this.addBlock(1, 'Bajando  crudos CSV ' + year + '/' + month + ': Generando');
		this.ppaMonitoringFormatService.downloadcrudosZip(year, month)
			.subscribe(
				data => {
					const blob = new Blob([this.base64toBlob(data.base64,
						'application/CSV')], {});
					saveAs(blob, data.nameFile);
					this.addBlock(2, '');
					this.toastr.successToastr('Download File: Correctamente ' + year + '/' + month + ': Generado Correctamente', '¡Exito!');
				},
				errorData => {
					this.addBlock(2, '');
					this.toastr.errorToastr(errorData.error.message, '¡Error!');
				});
	}

	base64toBlob(base64Data, contentType) {
		contentType = contentType || '';
		const sliceSize = 1024;
		const byteCharacters = atob(base64Data);
		const bytesLength = byteCharacters.length;
		const slicesCount = Math.ceil(bytesLength / sliceSize);
		const byteArrays = new Array(slicesCount);
		for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
			const begin = sliceIndex * sliceSize;
			const end = Math.min(begin + sliceSize, bytesLength);
			const bytes = new Array(end - begin);
			for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
				bytes[i] = byteCharacters[offset].charCodeAt(0);
			}
			byteArrays[sliceIndex] = new Uint8Array(bytes);
		}
		return new Blob(byteArrays, { type: contentType });
	}

	stangeLoadRaw() {
		this.addBlock(1, '');
		const year = new Date(this.date.value).getFullYear();
		const month =  new Date(this.date.value).getMonth() + 1;
		this.ppaMonitoringFormatService.stageLoad(year, month)
			.subscribe(
				data => {
					this.existsLoad = data.existsLoad
					this.buttonExists = false;
					this.addBlock(2, '');
				},
				errorData => {
					this.addBlock(2, '');
					if (errorData.error.message.indexOf('Notificacion 100') !== -1) {
						this.toastr.warningToastr(errorData.error.message, '¡Notificacion!');
						this.existsLoad = false;
						this.buttonExists = false;
					} else {
						this.toastr.errorToastr(errorData.error.message, '¡Error!');
						this.existsLoad = false;
						this.buttonExists = true;
					}
				});
	}
}
