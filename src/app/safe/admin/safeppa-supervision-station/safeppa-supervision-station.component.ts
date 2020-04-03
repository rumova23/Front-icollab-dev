import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Sort } from '@angular/material';
import * as Highcharts from 'highcharts';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
	selector: 'app-safeppa-supervision-station',
	templateUrl: './safeppa-supervision-station.component.html',
	styleUrls: ['./safeppa-supervision-station.component.scss']
})
export class SafeppaSupervisionStationComponent implements OnInit {
	@ViewChild('chartbar1') chartbar1: ElementRef;
	@ViewChild('chartbar2') chartbar2: ElementRef;

	demoTab1 = new Array(     31    ).fill(0).map((_valor,indice)=>Math.round(indice + 1));
	demoTags = new Array(     13    ).fill(0).map((_valor,indice)=>("Tag " + indice));

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

	opt : any = {
		chart: {
			type: 'bar'
		},
		title: {
			text: 'Historic World Population by Region'
		},
		subtitle: {
			text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
		},
		xAxis: {
			categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
			title: {
				text: null
			}
		},
		yAxis: {
			min: 0,
			title: {
				text: 'Population (millions)',
				align: 'high'
			},
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
			name: 'Year 1800',
			data: [107, 31, 635, 203, 2]
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
		this.dataSource = [
			{order : "1",dateOpCom : "mar-20",process : "Corrección de Formato",user : "Manuel Herrera",dateUpdated : "01/04/2020 10:40:00 a.m",status : "Exitosa",sys_see : "sys_see",sys_edit : "sys_edit",sys_delete : "sys_delete"},
			{order : "2",dateOpCom : "mar-20",process : "Detección de Formato",user : "Ivette Colin",dateUpdated : "01/04/2020 10:40:00 a.m",status : "Fallida",sys_see : "sys_see",sys_edit : "sys_edit",sys_delete : "sys_delete"},
			{order : "3",dateOpCom : "mar-20",process : "Detección de Formato",user : "Sistema",dateUpdated : "01/04/2020 10:40:00 a.m",status : "Fallida",sys_see : "sys_see",sys_edit : "sys_edit",sys_delete : "sys_delete"},

		];
	}
    sortData(sort: Sort) {
        
	}
	grafica(){
		Highcharts.chart(this.chartbar1.nativeElement, this.opt);
		Highcharts.chart(this.chartbar2.nativeElement, this.opt);
	}
}
