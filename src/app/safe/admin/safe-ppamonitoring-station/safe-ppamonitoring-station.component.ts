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
import { Sort } from '@angular/material';
import {Constants} from '../../../core/globals/Constants';
import {MonitoringService} from '../../services/monitoring.service';
// import theme           from 'highcharts/themes/dark-green';
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

	tags = new FormControl();
	tagsList: string[] = [];
    dataSource;
    data: any[] = [];
    displayedColumnsOrder: any[] = [];
    displayedColumnsActions: any[] = [];
    columnsToDisplay: string[] = [];
	row_x_page = [50, 100, 250, 500];
    showAdd = true;
    showView = false;
    showUpdate = false;
    showDelete = true;


	valid = false;
	fileUploadForm: FormGroup;
	file: any;
	fileName: any;
	progress;
	title;
	download;
	date = new FormControl(moment());
	// https://jsfiddle.net/highcharts/4jZ7T/
	public opt: any = {
		time: {
			timezone: 'America/Mexico_City',
			useUTC: false
		},
		chart: {
			zoomType: 'xy'
		},
		title: {
			text: '',
		},
		xAxis: {
			type: 'datetime'
		},
		yAxis: [  ],
		tooltip: {
			shared: true
		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'top',
			y: 60,
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
		public globalService: GlobalService,
		private fb: FormBuilder,
		private toastr: ToastrManager,
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
		this.setColumnsToDisplay();
		this.filterDatesFormGroup = new FormGroup({});

		this.ppaMonitoringFormatService.getTags().subscribe((data) => {
			data.forEach(element => {
				this.tagsList.push(element.tag);
			});
		});
		this.fileUploadForm = this.fb.group({
			file: new FormControl(null, [Validators.required, requiredFileType('zip')]),
			typeVarhtml: new FormControl('', Validators.required)
		});	
		//this.chartLine = Highcharts.chart(this.chartLineMs.nativeElement, this.opt);
	}
	setChartData() {
		this.dataSource = [
			{order : '1', dateOpCom : 'mar-20', Import : 'Manuel', user : 'Manuel Herrera', dateUpdated : '01/04/2020 10:40:00 a.m', status : 'Exitosa', sys_see : 'sys_see', sys_edit : 'sys_edit', sys_delete : 'sys_delete'},
			{order : '2', dateOpCom : 'mar-20', Import : 'PI SERVER DSB', user : 'Ivette Colin', dateUpdated : '01/04/2020 10:40:00 a.m', status : 'Fallida', sys_see : 'sys_see', sys_edit : 'sys_edit', sys_delete : 'sys_delete'},
			{order : '3', dateOpCom : 'mar-20', Import : 'FilleZilla FTP', user : 'Sistema', dateUpdated : '01/04/2020 10:40:00 a.m', status : 'Fallida', sys_see : 'sys_see', sys_edit : 'sys_edit', sys_delete : 'sys_delete'},

		];
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
		let tags     = this.tags.value;
		if(tags == null || tags.length == 0 || this.date.value == null){
			this.toastr.errorToastr("Todos los campos son necesarios.", 'Lo siento,');
			return 0;
		}

		this.chartLine = Highcharts.chart(this.chartLineMs.nativeElement, this.opt);

		const data: any = [
			{nameParameter: 'year', valueParameter: new Date(this.date.value).getFullYear()},
			{nameParameter: 'mount', valueParameter: new Date(this.date.value).getMonth() + 1}];
		let indexYAxis = 0;
		for (const tag of tags) {
			this.ppaMonitoringFormatService.get(tag, data).subscribe((data) => {
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
				this.chartLine.addAxis({ // Primary yAxis
					labels: {
						format: '{value} ' + unidad,
						style: {
							color: Highcharts.getOptions().colors[indexYAxis]
						}
					},
					title: {
						text: name,
						style: {
							color: Highcharts.getOptions().colors[indexYAxis]
						}
					},
				});
				fdss = this.ordenar(fdss);
				this.chartLine.addSeries(
					{
						yAxis: indexYAxis,
						name,
						data: fdss,
					}
				);
				indexYAxis += 1;
				// this.opt.xAxis.categories = lstX;
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

	ejecutaProceso() {
		console.log(this.fileUploadForm.controls.typeVarhtml.value);
		if (this.fileUploadForm.controls.typeVarhtml.value === '1') {
			this.toastr.successToastr('Procesando el mes anterior, Desde fillezila. Espere por favor.', '.... Procesando');
			this.executeProcess('FILEZILLA', true);
		}

		if (this.fileUploadForm.controls.typeVarhtml.value === '4') {
			this.toastr.successToastr('Procesando el mes anterior, Upload Zip Manualmente . Espere por favor.', '.... Procesando');
		}
	}

	executeProcess(applicationName: string, isMonthly: boolean) {
		this.monitoringService.executeProcess(applicationName, isMonthly).subscribe(
			data => {
				console.log(data);
				this.toastr.successToastr('Ejecutando proceso ' + (isMonthly ? 'Mensual' : 'Diario') + ' para: '+applicationName, 'Ejecución lanzada con éxito.');
			},
			errorData => {
				this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
			});
	}

	upload(value) {
		console.log('Ejecuntando upload');
		this.valid = false;
		const reader = new FileReader();
		reader.onloadend = (e) => {
			this.file = reader.result;
			this.file = this.file.replace(/^data:(.*;base64,)?/, '');
			this.file = this.file.trim();
			this.fileName = value.file.name;
			this.ppaMonitoringFormatService.entradaManual({
				file: this.file,
				name: this.fileName,
				idTypeImport: 4,
				nameImport: 'no aplica'
			}).subscribe(
				data => {
					console.log(data);
					this.toastr.successToastr('El archivo llego con exito', 'Ejecución lanzada con éxito.');
				},
				errorData => {
					this.toastr.errorToastr('El archivo no llego', 'Lo siento,');
				});
		}
		reader.readAsDataURL(value.file);
	}
}
