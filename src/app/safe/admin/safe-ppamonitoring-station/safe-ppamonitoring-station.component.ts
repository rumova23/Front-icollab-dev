import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { DatePipe } from '@angular/common';
import { requiredFileType } from 'src/app/core/helpers/requiredFileType';
import * as chartDemo from "./chartDemo.json";

/* Highcharts */
import * as Highcharts from "highcharts";
import HC_exporting from "highcharts/modules/exporting";
import HC_stock from "highcharts/modules/stock";
import HC_customEvents from "highcharts-custom-events";
import HC_exportdata from "highcharts/modules/export-data";
import Highcharts3d from "highcharts/highcharts-3d";
import theme           from 'highcharts/themes/sunset';
//import theme           from 'highcharts/themes/gray.src';
import { PpaMonitoringFormatService } from '../../services/ppa-monitoring-format.service';
HC_exporting(Highcharts);
HC_stock(Highcharts);
HC_customEvents(Highcharts);
HC_exportdata(Highcharts);
Highcharts3d(Highcharts);
theme(Highcharts);
/* ./ Highcharts */

@Component({
	selector: "app-safe-ppamonitoring-station",
	templateUrl: "./safe-ppamonitoring-station.component.html",
	styleUrls: ["./safe-ppamonitoring-station.component.scss"]
})
export class SafePPAMonitoringStationComponent implements OnInit {
	@ViewChild('chartLineMs') chartLineMs: ElementRef;
	fileUploadForm: FormGroup;
	typeVarhtml;
	progress;
	title;
	download;
	public opt: any = {
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
		xAxis: [{
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
				'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			crosshair: true
		}],
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
			opposite: true
	
		}, { // Secondary yAxis
			gridLineWidth: 0,
			title: {
				text: 'Rainfall',
				style: {
					color: Highcharts.getOptions().colors[0]
				}
			},
			labels: {
				format: '{value} mm',
				style: {
					color: Highcharts.getOptions().colors[0]
				}
			}
	
		}, { // Tertiary yAxis
			gridLineWidth: 0,
			title: {
				text: 'Sea-Level Pressure',
				style: {
					color: Highcharts.getOptions().colors[1]
				}
			},
			labels: {
				format: '{value} mb',
				style: {
					color: Highcharts.getOptions().colors[1]
				}
			},
			opposite: true
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
			type: 'spline',
			yAxis: 1,
			data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
			tooltip: {
				valueSuffix: ' mm'
			}
	
		}, {
			name: 'Sea-Level Pressure',
			type: 'spline',
			yAxis: 2,
			data: [1016, 1016, 1015.9, 1015.5, 1012.3, 1009.5, 1009.6, 1010.2, 1013.1, 1016.9, 1018.2, 1016.7],
			marker: {
				enabled: false
			},
			dashStyle: 'shortdot',
			tooltip: {
				valueSuffix: ' mb'
			}
	
		}, {
			name: 'Temperature',
			type: 'spline',
			data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
			tooltip: {
				valueSuffix: ' °C'
			}
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
	constructor(
		public globalService: GlobalService,
		private fb: FormBuilder,
		private toastr: ToastrManager,
		private confirmationDialogService: ConfirmationDialogService,
		private ppaMonitoringFormatService:PpaMonitoringFormatService,
		private datePipe: DatePipe) { }

	ngOnInit() { 
		this.ppaMonitoringFormatService.get().subscribe((data)=>{
			let lstV = [];
			let lstX = [];
			let name ;
			for (const dia of data) {
				name = dia.tag;
				dia.fechaTag; //"2020/2/15"

				for (const dato of dia.valores) {
					lstV.push(dato.value);
					lstX.push(new Date(dia.fechaTag+" "+dato.status+":00"));
					dato.timeEnd;
					dato.timeini;
					dato.status;//"08:20"
				}
			}
			this.opt.xAxis.categories = lstX;
			this.opt.series =  [
				{
					name: name,
					type: 'spline',
					yAxis: 1,
					data: lstV,
					tooltip: {
						valueSuffix: ' mm'
					}
				}
			];
			Highcharts.chart(this.chartLineMs.nativeElement, this.opt);
		});
		this.fileUploadForm = this.fb.group({
			file: new FormControl(null, [Validators.required, requiredFileType('xlsx')]),
			typeVarhtml: new FormControl('', Validators.required)
		});
		//Highcharts.chart(this.chartLineMs.nativeElement, this.opt);
	}

	upload(value){

	}
}
