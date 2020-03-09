import { Component, OnInit } from '@angular/core';

import * as algo from './algo.json';


import { Chart                           } from 'chart.js';

/* Highcharts */
import * as Highcharts from 'highcharts';
import HC_exporting    from 'highcharts/modules/exporting';
import HC_stock        from 'highcharts/modules/stock';
import HC_customEvents from 'highcharts-custom-events';
import HC_exportdata   from 'highcharts/modules/export-data';
import Highcharts3d    from 'highcharts/highcharts-3d';
import theme           from 'highcharts/themes/gray';
HC_exporting(Highcharts);
HC_stock(Highcharts);
HC_customEvents(Highcharts);
HC_exportdata(Highcharts);
Highcharts3d(Highcharts);
theme(Highcharts);


/* ./ Highcharts */

@Component({
	selector: 'app-phase2v3',
	templateUrl: './phase2v3.component.html',
	styleUrls: ['./phase2v3.component.scss']
})
export class Phase2v3Component implements OnInit {
	expected={
		eat:{
			powerOutput:440.55,
			capacityFactor:89
		},
		est:{
			powerOutput:455.4,
			capacityFactor:92
		}
	}
	table = {
		overview:[
			{
				tag:"power",
				value:{
				actuals:{value:5,max:6},
				dif:{value:5,max:6},
				expected:{value:5,max:6}
				}
			}
		],
		est:[
			{
				tag:"power",
				value:{
				actuals:{value:5,max:6},
				dif:{value:5,max:6},
				expected:{value:5,max:6}
				}
			}
		],
		eat:[
			{
				tag:"power",
				value:{
				actuals:{value:5,max:6},
				dif:{value:5,max:6},
				expected:{value:5,max:6}
				}
			}
		]
	};
	
	public opt :any={
	
        chart: {
            height: 300
        },

		rangeSelector: {
			selected: 1
		},

		title: {
			text: 'AAPL Stock Price'
		},

        subtitle: {
            text: 'Click small/large buttons or change window size to test responsiveness'
        },
		series: [{
			name: 'AAPL',
			data: algo.algo,
            type: 'area',
            threshold: null,
            tooltip: {
                valueDecimals: 2
            }
		}],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    chart: {
                        height: 300
                    },
                    subtitle: {
                        text: null
                    },
                    navigator: {
                        enabled: false
                    }
                }
            }]
        }
	}
	theme=theme;
	Highcharts = Highcharts;
	
	constructor() { }

	ngOnInit() {


		var myChart = new Chart('mychart',{
			type: 'doughnut',
			data: {
				datasets: [{
					data: [1,2],
					label: 'Dataset 1',
					borderWidth:0,
					backgroundColor: [
						"#46FF33",
						"#7f8182",
					],
				}],
				labels: [
					'Green',
					'Gray',
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				cutoutPercentage: 40,
				legend: {
					display: false,
					//position: 'top',
				},
				title: {
					display: false,
					//text: ''
				},
				animation: {
					animateScale: true,
					animateRotate: true
				}
			}
		} );

		Highcharts.stockChart('container2', this.opt);
		Highcharts.stockChart('container3', this.opt);

	}

}
