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
import theme from 'highcharts/themes/sunset';
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
	filterDatesFormGroup: FormGroup;
	dateIni: Date;
	dateFin: Date;

	fileUploadForm: FormGroup;
	typeVarhtml;
	progress;
	title;
	download;
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
			data: chartDemo.chartDemo,
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
		private ppaMonitoringFormatService: PpaMonitoringFormatService,
		private datePipe: DatePipe) { }

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
		
		this.filterDatesFormGroup = new FormGroup({});
		
		this.ppaMonitoringFormatService.get().subscribe((data) => {
			let lstV = [];
			let lstX = [];
			let fdss = [];
			let name;
			for (const dia of data) {
				name = dia.tag;
				dia.fechaTag; //"2020/2/15"

				for (const dato of dia.valores) {
					lstV.push(dato.value);
					lstX.push(new Date(dia.fechaTag + " " + dato.status + ":00").getTime());
					dato.timeEnd;
					dato.timeini;
					dato.status;//"08:20"
					fdss.push([new Date(dia.fechaTag + " " + dato.status + ":00").getTime(),dato.value]);
				}
			}
			
			fdss = this.ordenar(fdss);

			//this.opt.xAxis.categories = lstX;
			this.opt.series = [
				{
					name: name,
					data: fdss,
				}
			];
			Highcharts.chart(this.chartLineMs.nativeElement, this.opt);
		});//*/
		this.fileUploadForm = this.fb.group({
			file: new FormControl(null, [Validators.required, requiredFileType('xlsx')]),
			typeVarhtml: new FormControl('', Validators.required)
		});
		//Highcharts.chart(this.chartLineMs.nativeElement, this.opt);
	}

	upload(value) {

	}
	searchFuecdByDates() {
		let dateInit =  this.datePipe.transform(this.dateIni, 'yyyy-MM-dd');
		let dateFint = this.datePipe.transform(this.dateFin, 'yyyy-MM-dd');
		let tag: String = "olas del mar"
		let data:any = [
			{"nameParameter": "dateIni","valueParameter": dateInit},
			{"nameParameter": "dateEnd","valueParameter": dateFint}];
		this.ppaMonitoringFormatService.get(tag,data).subscribe((data) => {
			let lstV = [];
			let lstX = [];
			let fdss = [];
			let name;
			for (const dia of data) {
				name = dia.tag;
				dia.fechaTag; //"2020/2/15"

				for (const dato of dia.valores) {
					lstV.push(dato.value);
					lstX.push(new Date(dia.fechaTag + " " + dato.status + ":00").getTime());
					dato.timeEnd;
					dato.timeini;
					dato.status;//"08:20"
					fdss.push([new Date(dia.fechaTag + " " + dato.status + ":00").getTime(),dato.value]);
				}
			}
			fdss = this.ordenar(fdss);
			//this.opt.xAxis.categories = lstX;
			this.opt.series = [
				{
					name: name,
					data: fdss,
				}
			];
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
