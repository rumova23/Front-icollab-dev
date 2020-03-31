import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
/* Highcharts */
import * as Highcharts from "highcharts";
import HC_exporting from "highcharts/modules/exporting";
import HC_stock from "highcharts/modules/stock";
import HC_customEvents from "highcharts-custom-events";
import HC_exportdata from "highcharts/modules/export-data";
import Highcharts3d from "highcharts/highcharts-3d";
import theme from 'highcharts/themes/sunset';
//import theme           from 'highcharts/themes/gray.src';
HC_exporting(Highcharts);
HC_stock(Highcharts);
HC_customEvents(Highcharts);
HC_exportdata(Highcharts);
Highcharts3d(Highcharts);
//theme(Highcharts);
/* ./ Highcharts */

import { AccuweatherService } from './accuweather.service';
import { DatePipe } from '@angular/common';



@Component({
	selector: 'app-accuweather',
	templateUrl: './accuweather.component.html',
	styleUrls: ['./accuweather.component.scss']
})
export class AccuweatherComponent implements OnInit {
	@ViewChild('chartLineMs') chartLineMs: ElementRef;
	@ViewChild('chartLineMs2') chartLineMs2: ElementRef;
	dateIni: Date;
	dateFin: Date;
	public opt: any = {
		time: {
			timezone: 'America/Mexico_City',
			useUTC: false
		},
		chart: {
			zoomType: 'xy'
		},
		title: {
			text: 'Average Monthly Weather Data for Tokyo',
			align: 'left'
		},
		subtitle: {
			text: 'Source: WorldClimate.com',
			align: 'left'
		},
		xAxis: {
			type: 'datetime'
		},
		yAxis: [{ // Primary yAxis
			labels: {
				format: '{value}°C',
				style: {
					color: Highcharts.getOptions().colors[2]
				}
			},
			title: {
				text: 'Temperature',
				style: {
					color: Highcharts.getOptions().colors[2]
				}
			},
			opposite: false

		}],
		tooltip: {
			shared: true
		},
		legend: {
			layout: 'vertical',
			align: 'left',
			x: 80,
			verticalAlign: 'top',
			y: 55,
			floating: true,
			backgroundColor:
				Highcharts.defaultOptions.legend.backgroundColor || // theme
				'rgba(255,255,255,0.25)'
		},
		series: [{
			name: 'Rainfall',
			data: [],
		}],
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
	constructor(private accuweatherService: AccuweatherService,private datePipe: DatePipe) { }
	ordenar (arr){
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
		this.accuweatherService.getWeatherTypeFromTo().subscribe(data=>{
			let series : Array<any> = [];
			data.forEach(element => {
				series.push(
					{
						name: element.name,
						data: this.ordenar(element.data),
					}
				);
			});
			//data.data = this.ordenar(data.data);
			this.opt.series = series;
			Highcharts.chart(this.chartLineMs.nativeElement, this.opt);
		});
	}
	searchAccuweather(){
		let dateInit = this.datePipe.transform(this.dateIni, 'yyyy-MM-dd');
		let dateFint = this.datePipe.transform(this.dateFin, 'yyyy-MM-dd');	
		let idsTypeWeather = [1,4,5];
		this.accuweatherService.getWeatherTypeFromTo(dateInit,dateFint,idsTypeWeather).subscribe(data=>{
			let series : Array<any> = [];
			data.forEach(element => {
				series.push(
					{
						name: element.name,
						data:  this.ordenar(element.data),
					}
				);
			});
			//data.data = this.ordenar(data.data);
			this.opt.series = series;
			Highcharts.chart(this.chartLineMs.nativeElement, this.opt);
		});
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
}
