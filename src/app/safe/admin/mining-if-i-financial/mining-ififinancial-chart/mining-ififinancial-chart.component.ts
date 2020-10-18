import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as chartDemo from '../../safe-ppamonitoring-station/chartDemo.json';
@Component({
  selector: 'app-mining-ififinancial-chart',
  templateUrl: './mining-ififinancial-chart.component.html',
  styleUrls: ['./mining-ififinancial-chart.component.scss']
})
export class MiningIFIFinancialChartComponent implements OnInit {
	@ViewChild('chartLineMs') chartLineMs: ElementRef; chartLine: any;
	public opt: any = {
		credits: {
			enabled: false
		},
		time: {
			timezone: 'America/Mexico_City',
			useUTC: false
		},
		chart: {
			zoomType: 'xy',
			type: 'spline'
		},
		title: {
			text: '',
			
		},
		exporting: {
			tableCaption: ""
		},
		xAxis: {
			type: 'datetime',
			gridLineWidth: 1
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
	constructor() { }

	ngOnInit() {
		
		let ymax = undefined;
		let ymin = undefined;

		this.opt.yAxis.push(
			{
				id: "y-axis-0",
				gridLineWidth: 1,
				labels: {
					style: {
						color: '#858',
						fontWeight: "bold",
					}
				},
				title: {
					enabled: false,
					text: "nombre",
					style: {
						color: '#858',
					},
				},
				showEmpty: false,
				max:ymax,
				min:ymin
				//opposite: true
			}
		);
		this.opt.series.push(
			{
				id : "idid",
				name: "name",
				yAxis: "y-axis-0",
				visible: true,
				color: "#858",
				data: chartDemo.chartDemo,
			}
		);
		this.chartLine = Highcharts.chart(this.chartLineMs.nativeElement, this.opt);
	}

}
