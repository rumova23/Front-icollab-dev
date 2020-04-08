import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Sort, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import * as Highcharts from 'highcharts';
import { FormControl } from '@angular/forms';


import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {MY_FORMAT_DATE_PICKER} from '../../../core/models/MyFormatDatePicker';
import * as moment from 'moment';


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

	demoTab1 = new Array(     31    ).fill(0).map((_valor,indice)=>Math.round(indice + 1));
	demoTags = new Array(     13    ).fill(0).map((_valor,indice)=>("Tag " + indice));

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
    dataSource;
    data : any[] = [];
    displayedColumnsOrder   : any[]    = [];
    displayedColumnsActions : any[]    = [];
    columnsToDisplay        : string[] = [];
	row_x_page           = [50, 100, 250, 500];
    showAdd    : boolean = true;
    showView   : boolean = false;
    showUpdate : boolean = false;
    showDelete : boolean = true;

	resumenHeader=[
		"Bandera (Falta Hora y Fecha)",
		"Bandera (Falta  Fecha)",
		"Bandera (Falta Hora)",
		"Bandera( Fecha y Hora no aceptables)",
		"Bandera(Fecha no aceptable)",
		"Bandera(Hora no aceptable)",
		"Bandera (Dato Repetido)",
		"Bandera (Dato redondeo a concominutal)",
		"Bandera(Ordenamiento)",
		"Bandera (Dato Correcto)",
		"Bandera (Falta Valor)",
		"Bandera (Renglon vacio)",
		"Bandera (Valor no aceptable)"
	];
	resumenValue=[
		{name:"Serie 1",value:[0.280,0.672,0.370,0.560,0.504,0.381,0.034,0.258,7.841,86.985,0.381,0.616,1.120]}
	]
	chart2header=[
		"Variables corregidas",
		"Variables detectadas",
		"Total "
	];
	chart2headerValue=[
		100,
		13.02,
		0.00
	];

	tablaDiasSeries=[
		{name:"Total de Registros Esperados"  , dia31: 8928 ,value:[288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288]},
		{name:"Total de Registos Encontrados" , dia31: 8938 ,value:[288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288]},
		{name:"# Variables Detectadas"        , dia31: 1162 ,value:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
		{name:"# Variables Corregidas"        , dia31: 0    ,value:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}
	]
	opt : any = {
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
			
			data: this.resumenValue[0].value
		}]
	};
	
	opt2 : any = {
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
	constructor() { }

	ngOnInit() {
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
	}
	setColumnsToDisplay(){
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
	
	setTableData(){
		let data = [
			{order : "1",dateOpCom : "mar-20",process : "Corrección de Formato",user : "Manuel Herrera",dateUpdated : "01/04/2020 10:40:00 a.m",status : "Exitosa",sys_see : "sys_see",sys_edit : "sys_edit",sys_delete : "sys_delete"},
			{order : "2",dateOpCom : "mar-20",process : "Detección de Formato",user : "Ivette Colin",dateUpdated : "01/04/2020 10:40:00 a.m",status : "Fallida",sys_see : "sys_see",sys_edit : "sys_edit",sys_delete : "sys_delete"},
			{order : "3",dateOpCom : "mar-20",process : "Detección de Formato",user : "Sistema",dateUpdated : "01/04/2020 10:40:00 a.m",status : "Fallida",sys_see : "sys_see",sys_edit : "sys_edit",sys_delete : "sys_delete"},
		];
		this.dataSource = new MatTableDataSource<any>(data);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}
    sortData(sort: Sort) {
        
	}
	grafica(){
		Highcharts.chart(this.chartbar1.nativeElement, this.opt);
		Highcharts.chart(this.chartbar2.nativeElement, this.opt2);
	}
}
