import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Sort, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import * as Highcharts from 'highcharts';
import { FormControl } from '@angular/forms';


import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {MY_FORMAT_DATE_PICKER} from '../../../core/models/MyFormatDatePicker';
import * as moment from 'moment';
import {ToastrManager} from 'ng6-toastr-notifications';
import {PpaMonitoringFormatService} from '../../services/ppa-monitoring-format.service';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventBlocked } from 'src/app/core/models/EventBlocked';
import {saveAs} from 'file-saver';
import {ConfirmationDialogService} from '../../../core/services/confirmation-dialog.service';

@Component({
	selector: 'app-safeppa-supervision-station',
	templateUrl: './safeppa-supervision-station.component.html',
	styleUrls: ['./safeppa-supervision-station.component.scss'],
	providers: [
		{
		  provide: DateAdapter,
		  useClass: MomentDateAdapter,
		  deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
		},

		{provide: MAT_DATE_FORMATS, useValue: MY_FORMAT_DATE_PICKER},
	  ],
})
export class SafeppaSupervisionStationComponent implements OnInit {
	@ViewChild('chartbar1') chartbar1: ElementRef;
	@ViewChild('chartbar2') chartbar2: ElementRef;

	demoTab1 = new Array(     31    ).fill(0).map((_valor, indice) => Math.round(indice + 1));
	demoTags = new Array(     13    ).fill(0).map((_valor, indice) => ('Tag ' + indice));

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
    dataSource;
    data: any[] = [];
    displayedColumnsOrder: any[]    = [];
    displayedColumnsActions: any[]    = [];
    columnsToDisplay: string[] = [];
	row_x_page           = [50, 100, 250, 500];
    showAdd = true;
    showView = false;
    showUpdate = false;
    showDelete = true;
	variablesDetectadasRojo = false;
	tablaTotalPorcentajesBanderas = [];
	tablaTotales = [];
	resumenHeader = [
		'Dato Correcto',
		'Falta Valor',
		'Renglon vacio',
		'Valor no aceptable',
		'Falta Fecha y Hora',
		'Falta Fecha',
		'Falta Hora',
		'Fecha y Hora no aceptables',
		'Fecha no aceptable',
		'Hora no aceptable',
		'Dato Repetido',
		'Dato redondeo a concominutal',
		'Ordenamiento'
	];
	resumenValue = [
		{name: '', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
	];
	chart2header = [
		'Variables corregidas',
		'Variables detectadas',
		'Total'
	];
	chart2headerValue = [
		0,
		0,
		0
	];
	/*
	tablaDiasSeries=[
		{name:"Total de Registros Esperados"  , dia31: 8928 ,value:[288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288]},
		{name:"Total de Registos Encontrados" , dia31: 8938 ,value:[288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288]},
		{name:"# Variables Detectadas"        , dia31: 1162 ,value:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
		{name:"# Variables Corregidas"        , dia31: 0    ,value:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}
	]//*/

	tablaDiasSeries = [
		{name: 'Total de Registros Esperados'  , dia31: 0 , value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
		{name: 'Total de Registos Encontrados' , dia31: 0 , value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
		{name: '# Variables Detectadas'        , dia31: 0 , value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
		{name: '# Variables Corregidas'        , dia31: 0 , value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
	];
	totalDiasDelMes:number=0;
	opt: any = {
		chart: {
			type: 'bar'
		},
		title: {
			text: ''
		},
		xAxis: {
			categories: this.resumenHeader,
			title: {
				text: null
			}
		},
		yAxis: {
			min: 0,
			title: {
				text: null
			},
			labels: {
				overflow: 'justify',
				enabled: false
			}
		},
		tooltip: {
			pointFormat: '<b>{point.y}</b>',
			valueSuffix: ' %'
		},
		plotOptions: {
			bar: {
				dataLabels: {
					enabled: true
				}
			}
		},
		legend: {
			enabled: false,
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'top',
			x: -40,
			y: 80,
			floating: true,
			borderWidth: 1,
			backgroundColor:
				Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
			shadow: true
		},
		credits: {
			enabled: false
		},
		series: [{

			data: this.resumenValue[0].value
		}]
	};

	opt2: any = {
		chart: {
			type: 'bar'
		},
		title: {
			text: ''
		},
		xAxis: {
			categories: this.chart2header,
			title: {
				text: null
			}
		},
		yAxis: {
			min: 0,

			labels: {
				overflow: 'justify'
			}
		},
		tooltip: {
			valueSuffix: ' millions'
		},
		plotOptions: {
			bar: {
				dataLabels: {
					enabled: true
				}
			}
		},
		legend: {
			enabled: false,
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'top',
			x: -40,
			y: 80,
			floating: true,
			borderWidth: 1,
			backgroundColor:
				Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
			shadow: true
		},
		credits: {
			enabled: false
		},
		series: [{

			data: this.chart2headerValue
		}]
	};
	date = new FormControl(moment());
	buttonDetected: boolean;
	isDetected: boolean;
	buttonCorrected: boolean;
	isCorrected: boolean;
	maxDate: Date;
	constructor(
		private eventService: EventService,
		private toastr: ToastrManager,
		private ppaMonitoringFormatService: PpaMonitoringFormatService,
		private confirmationDialogService: ConfirmationDialogService) { }

	ngOnInit() {

		this.maxDate = new Date(new Date().getFullYear(), (new Date().getMonth() - 1 ));
		this.buttonDetected = true;
		this.buttonCorrected = true;
		this.setColumnsToDisplay();
		this.grafica();
	}

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
		this.stangeLoadRaw();
	}
	setColumnsToDisplay() {
		this.setTableData();
		this.displayedColumnsOrder = [
			{ key: 'order', label: '#' },
			{ key: 'dateOpCom', label: 'Fecha de Operación Comercial' },
			{ key: 'process', label: 'Proceso' },
			{ key: 'user', label: 'Usuario' },
			{
				key: 'dateUpdated',
				label: 'Date and Time last modified'
			},
			{ key: 'status', label: 'Estatus del Proceso' }
		];

		this.displayedColumnsActions = [];
		this.columnsToDisplay = [
			'order',
			'dateOpCom',
			'process',
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

	setTableData() {

		this.ppaMonitoringFormatService.obtenBitacoraLoadRaw().subscribe(
			data => {
				const datain = [];
				let i = 1;
				for (const d of data) {
					datain.push(
						{
							order: i,
							dateOpCom: d.fechaOperacionComercial,
							process: d.fuenteImportacion,
							dateUpdated: d.fechaUltimaModificacion ? d.fechaUltimaModificacion : '-',
							status: d.estatusImportacion,
							user: d.usuario ? d.usuario : 'system',
							sys_see : 'sys_see',
							sys_edit : 'sys_edit',
							sys_delete : 'sys_delete'
						}
					);
					i += 1;
				}


				this.dataSource = new MatTableDataSource<any>(datain);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			},
			errorData => {
				console.dir(errorData);
				this.toastr.errorToastr(errorData.error.message, 'Lo siento,');
			});
			/*
		let data = [
			{order : "1",dateOpCom : "mar-20",process : "Corrección de Formato",user : "Manuel Herrera",dateUpdated : "01/04/2020 10:40:00 a.m",status : "Exitosa",sys_see : "sys_see",sys_edit : "sys_edit",sys_delete : "sys_delete"},
			{order : "2",dateOpCom : "mar-20",process : "Detección de Formato",user : "Ivette Colin",dateUpdated : "01/04/2020 10:40:00 a.m",status : "Fallida",sys_see : "sys_see",sys_edit : "sys_edit",sys_delete : "sys_delete"},
			{order : "3",dateOpCom : "mar-20",process : "Detección de Formato",user : "Sistema",dateUpdated : "01/04/2020 10:40:00 a.m",status : "Fallida",sys_see : "sys_see",sys_edit : "sys_edit",sys_delete : "sys_delete"},
		];
		this.dataSource = new MatTableDataSource<any>(data);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;//*/
	}
    sortData(sort: Sort) {

	}
	grafica() {
		Highcharts.chart(this.chartbar1.nativeElement, this.opt);
		// Highcharts.chart(this.chartbar2.nativeElement, this.opt2);
	}

	setTable01(data) {
		this.tablaDiasSeries[0].value = [];
		this.tablaDiasSeries[1].value = [];
		this.tablaDiasSeries[2].value = [];
		this.tablaDiasSeries[3].value = [];
		this.totalDiasDelMes = data.analisisDayList[data.analisisDayList.length-1]["day"];
		for (const dia of data.analisisDayList) {
			/*
			{name:"Total de Registros Esperados"  , dia31: 0 ,value:[]},
			{name:"Total de Registos Encontrados" , dia31: 0 ,value:[]},
			{name:"# Variables Detectadas"        , dia31: 0 ,value:[]},
			{name:"# Variables Corregidas"        , dia31: 0 ,value:[]}//*/
			this.tablaDiasSeries[0].value.push(dia.esperados);
			this.tablaDiasSeries[0].dia31 += dia.esperados;

			this.tablaDiasSeries[1].value.push(dia.encontrados);
			this.tablaDiasSeries[1].dia31 += dia.encontrados;

			this.tablaDiasSeries[2].value.push(dia.detectados);
			this.tablaDiasSeries[2].dia31 += dia.detectados;

			this.tablaDiasSeries[3].value.push(dia.corregidos);
			this.tablaDiasSeries[3].dia31 += dia.corregidos;

			if(dia.detectados > 0) this.variablesDetectadasRojo=true;

		}
		if (data.analisisDayList.length < 31) {
			for (let index = data.analisisDayList.length; index < 31; index++) {

				this.tablaDiasSeries[0].value.push(0);
				this.tablaDiasSeries[0].dia31 += 0;

				this.tablaDiasSeries[1].value.push(0);
				this.tablaDiasSeries[1].dia31 += 0;

				this.tablaDiasSeries[2].value.push(0);
				this.tablaDiasSeries[2].dia31 += 0;

				this.tablaDiasSeries[3].value.push(0);
				this.tablaDiasSeries[3].dia31 += 0;

			}
		}
		this.setChartTotal();
	}
	setChartBanderas(data) {
		this.opt.series[0].data = this.resumenValue[0].value.map(() => 0);
		this.tablaTotalPorcentajesBanderas = this.resumenValue[0].value.map((v, i) => {
			return {
				header: this.opt.xAxis.categories[i],
				value: v
			};
		});
		for (let index = 0; index < this.opt.xAxis.categories.length; index++) {
			const element = this.opt.xAxis.categories[index].toLowerCase();
			for (const bandera of data.estatusValueList) {
				if (bandera.estatus.toLowerCase() === element) {
					const porcentaje = bandera.cantidad;
					this.opt.series[0].data[index] = porcentaje;
					this.tablaTotalPorcentajesBanderas[index].value = porcentaje;
				}
			}
		}
		Highcharts.chart(this.chartbar1.nativeElement, this.opt);
	}
	getOrderBanderas(estatus) {
		/**
		 *
		 */
		let i = 10000;
		if (estatus.includes('Dato Correcto')) {                i = 1; }
		if (estatus.includes('Falta Valor')) {                  i = 2; }
		if (estatus.includes('Renglon vacio')) {                i = 3; }
		if (estatus.includes('Valor no aceptable')) {           i = 4; }

		if (estatus.includes('Falta Fecha y Hora')) {           i = 5; }
		if (estatus.includes('Falta Fecha')) {                  i = 6; }
		if (estatus.includes('Falta Hora')) {                   i = 7; }
		if (estatus.includes('Fecha y Hora no aceptables')) {   i = 8; }
		if (estatus.includes('Fecha no aceptable')) {           i = 9; }
		if (estatus.includes('Hora no aceptable')) {            i = 10; }
		if (estatus.includes('Dato Repetido')) {                i = 11; }
		if (estatus.includes('Dato redondeo a concominutal')) { i = 12; }
		if (estatus.includes('Ordenamiento')) {                 i = 13; }


		return i;
	}
	setChartTotal() {/*
		this.chart2headerValue=[];
		this.tablaTotales=[];

		this.chart2headerValue.push(this.tablaDiasSeries[3].dia31);
		this.chart2headerValue.push(this.tablaDiasSeries[2].dia31);
		this.chart2headerValue.push(this.tablaDiasSeries[2].dia31 + this.tablaDiasSeries[3].dia31);

		this.tablaTotales.push({header: 'Variables corregidas', value: this.tablaDiasSeries[3].dia31});
		this.tablaTotales.push({header: 'Variables detectadas', value: this.tablaDiasSeries[2].dia31});
		this.tablaTotales.push({header: 'Total', value: this.tablaDiasSeries[3].dia31 + this.tablaDiasSeries[2].dia31});

		this.opt2.series[0].data = this.chart2headerValue;
		Highcharts.chart(this.chartbar2.nativeElement, this.opt2);//*/
	}

	validaAplicarDeteccion() {
		if (this.isDetected) {
			this.confirmationDialogService.confirm('Por favor, confirme..',
				'Esta seguro que, quiere sobreescribir la actual deteccion?').then((confirmed) => {
					if (confirmed) {
						this.aplicarDeteccion();
					}
			}).catch(() => console.log('Salio'));
		} else {
			this.aplicarDeteccion();
		}
}
	aplicarDeteccion() {
		const year = new Date(this.date.value).getFullYear();
		const mount =  new Date(this.date.value).getMonth() + 1;
		this.addBlock(1, 'Aplicando detección de formato');
		this.ppaMonitoringFormatService.procesaDeteccion(year, mount).subscribe(
			data => {
				this.isDetected = data.isDetected;
				this.isCorrected = data.isCorrected;
				this.buttonDetected = false;
				this.buttonCorrected = true;
				if (this.isDetected) {
					this.buttonCorrected = false;
				}

				this.addBlock(2, '');

				this.setTable01(data);
				this.setChartBanderas(data);
			},
			errorData => {
				console.dir(errorData);
				this.addBlock(2, '');
				this.toastr.errorToastr(errorData.error.message, 'Lo siento,');
			});
	}

	validaAplicarCorreccion() {
		if (this.isCorrected) {
			this.confirmationDialogService.confirm('Por favor, confirme..',
				'Esta seguro que, quiere sobreescribir la actual Correccion?').then((confirmed) => {
				if (confirmed) {
					this.aplicarCorrecion();
				}
			}).catch(() => console.log('Salio'));
		} else {
			this.aplicarCorrecion();
		}
	}
	aplicarCorrecion() {
		const year = new Date(this.date.value).getFullYear();
		const mount =  new Date(this.date.value).getMonth() + 1;

		this.addBlock(1, 'Aplicar Correción');
		this.ppaMonitoringFormatService.procesaCorreccion(year, mount).subscribe(
			data => {
				this.isDetected = data.isDetected;
				this.isCorrected = data.isCorrected;
				this.buttonDetected = false;
				this.buttonCorrected = true;
				if (this.isDetected) {
					this.buttonCorrected = false;
				}
				this.addBlock(2, '');
				this.setTable01(data);
				this.setChartBanderas(data);

			},
			errorData => {
				this.addBlock(2, '');
				console.dir(errorData);
				this.toastr.errorToastr(errorData.error.message, 'Lo siento,');
			});
	}

	aplicarDeteccionProcedimiento() {
		const year = new Date(this.date.value).getFullYear();
		const mount =  new Date(this.date.value).getMonth() + 1;
		this.addBlock(1, 'Aplicar Detección Procedimiento');
		this.ppaMonitoringFormatService.procesaDeteccionProcedimiento(year, mount).subscribe(
			data => {
				console.dir(data);
				this.addBlock(2, '');
			},
			errorData => {
				console.dir(errorData);
				this.addBlock(2, '');
				this.toastr.errorToastr(errorData.error.message, 'Lo siento,');
			});
	}

	aplicarCorrecionProcedimiento() {
		const year = new Date(this.date.value).getFullYear();
		const mount =  new Date(this.date.value).getMonth() + 1;
		this.addBlock(1, 'Aplicar Correcion Procedimiento');
		this.ppaMonitoringFormatService.procesaCorreccionProcedimiento(year, mount).subscribe(
			data => {
				console.dir(data);
				this.addBlock(2, '');
			},
			errorData => {
				console.dir(errorData);
				this.addBlock(2, '');
				this.toastr.errorToastr(errorData.error.message, 'Lo siento,');
			});
	}

	private addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1,
		  new EventBlocked(type, msg)));
	}

	download() {
		const year = new Date(this.date.value).getFullYear();
		const month =  new Date(this.date.value).getMonth() + 1;
		this.addBlock(1, 'Descargando datos detectados y corregidos de formato: ' + year + '/' + month + '; Generando');
		this.ppaMonitoringFormatService.downloadCrudosExcel(year, month)
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
		this.ppaMonitoringFormatService.stageLoadRaw(year, month)
			.subscribe(
				data => {
					console.dir(data);
					this.isDetected = data.isDetected;
					this.isCorrected = data.isCorrected;
					this.buttonDetected = false;
					this.buttonCorrected = true;
					if (this.isDetected) {
						this.buttonCorrected = false;
					}

					this.setTable01(data);
					this.setChartBanderas(data);
					this.addBlock(2, '');
				},
				errorData => {
					this.addBlock(2, '');
					this.toastr.errorToastr(errorData.error.message, '¡Error!');
					this.buttonDetected = true;
					this.buttonCorrected = true;
				});
	}
}
