import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { EventService                        } from "src/app/core/services/event.service";
import { GlobalService                       } from "src/app/core/globals/global.service";
import { ThemeService                        } from "src/app/core/globals/theme";
import { SocketService                       } from 'src/app/core/services/socket.service';
import { ConnectSocketChannelComponent       } from 'src/app/shared/socket/connectSocketChannel.component';
import { SecurityService                     } from 'src/app/core/services/security.service';
import { MonitoringTrService                 } from 'src/app/monitoring/services/monitoringTr.service';
import * as TAGS                               from 'src/app/monitoring/boards/phase2/config';
import * as highcharts                         from 'src/app/monitoring/highcharts/highcharts.json';

import { RadialGauge } from 'ng-canvas-gauges';
import * as algo from './algo.json';


import { Chart                           } from 'chart.js';


import * as Highcharts from 'highcharts';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventBlocked } from 'src/app/core/models/EventBlocked';
import { MarketService } from 'src/app/safe/services/market.service';
import { PiServerBox } from '../../models/piServer/piServerBox';
import { ExcelService } from '../../services/excel.service';
import { DatePipe } from '@angular/common';




@Component({
	selector: 'app-phase2v3',
	templateUrl: './phase2v3.component.html',
	styleUrls: ['./phase2v3.component.scss']
})
export class Phase2v3Component extends ConnectSocketChannelComponent implements OnInit, OnDestroy  {
	@ViewChild('chartOveA1') chartOveA1: ElementRef;  chartOveA1C:Chart;
	@ViewChild('chartOveA2') chartOveA2: ElementRef;  chartOveA2C:Chart;
	@ViewChild('chartOveA3') chartOveA3: ElementRef;  chartOveA3C:Chart;
	@ViewChild('chartOveA4') chartOveA4: ElementRef;  chartOveA4C:Chart;
	@ViewChild('chartOveB1') chartOveB1: ElementRef;  chartOveB1C:Chart;
	@ViewChild('chartOveB2') chartOveB2: ElementRef;  chartOveB2C:Chart;
	@ViewChild('chartOveB3') chartOveB3: ElementRef;  chartOveB3C:Chart;
	@ViewChild('chartOveB4') chartOveB4: ElementRef;  chartOveB4C:Chart;
	@ViewChild('chartOveC1') chartOveC1: ElementRef;  chartOveC1C:Chart;
	@ViewChild('chartOveC2') chartOveC2: ElementRef;  chartOveC2C:Chart;
	@ViewChild('chartOveC3') chartOveC3: ElementRef;  chartOveC3C:Chart;
	@ViewChild('chartOveC4') chartOveC4: ElementRef;  chartOveC4C:Chart;
	@ViewChild('chartEatA1') chartEatA1: ElementRef;  chartEatA1C:Chart;
	@ViewChild('chartEatA2') chartEatA2: ElementRef;  chartEatA2C:Chart;
	@ViewChild('chartEatA3') chartEatA3: ElementRef;  chartEatA3C:Chart;
	@ViewChild('chartEatA4') chartEatA4: ElementRef;  chartEatA4C:Chart;
	@ViewChild('chartEatB1') chartEatB1: ElementRef;  chartEatB1C:Chart;
	@ViewChild('chartEatB2') chartEatB2: ElementRef;  chartEatB2C:Chart;
	@ViewChild('chartEatB3') chartEatB3: ElementRef;  chartEatB3C:Chart;
	@ViewChild('chartEatB4') chartEatB4: ElementRef;  chartEatB4C:Chart;
	@ViewChild('chartEatC1') chartEatC1: ElementRef;  chartEatC1C:Chart;
	@ViewChild('chartEatC2') chartEatC2: ElementRef;  chartEatC2C:Chart;
	@ViewChild('chartEatC3') chartEatC3: ElementRef;  chartEatC3C:Chart;
	@ViewChild('chartEatC4') chartEatC4: ElementRef;  chartEatC4C:Chart;
	@ViewChild('chartEstA1') chartEstA1: ElementRef;  chartEstA1C:Chart;
	@ViewChild('chartEstA2') chartEstA2: ElementRef;  chartEstA2C:Chart;
	@ViewChild('chartEstA3') chartEstA3: ElementRef;  chartEstA3C:Chart;
	@ViewChild('chartEstA4') chartEstA4: ElementRef;  chartEstA4C:Chart;
	@ViewChild('chartEstB1') chartEstB1: ElementRef;  chartEstB1C:Chart;
	@ViewChild('chartEstB2') chartEstB2: ElementRef;  chartEstB2C:Chart;
	@ViewChild('chartEstB3') chartEstB3: ElementRef;  chartEstB3C:Chart;
	@ViewChild('chartEstB4') chartEstB4: ElementRef;  chartEstB4C:Chart;
	@ViewChild('chartEstC1') chartEstC1: ElementRef;  chartEstC1C:Chart;
	@ViewChild('chartEstC2') chartEstC2: ElementRef;  chartEstC2C:Chart;
	@ViewChild('chartEstC3') chartEstC3: ElementRef;  chartEstC3C:Chart;
	@ViewChild('chartEstC4') chartEstC4: ElementRef;  chartEstC4C:Chart;

	@ViewChild('chartLineOve1') chartLineOve1: ElementRef;  chartLineOve1C;
	@ViewChild('chartLineEat1') chartLineEat1: ElementRef;  chartLineEat1C;
	@ViewChild('chartLineEat2') chartLineEat2: ElementRef;  chartLineEat2C;
	@ViewChild('chartLineEst1') chartLineEst1: ElementRef;  chartLineEst1C;
	@ViewChild('chartLineEst2') chartLineEst2: ElementRef;  chartLineEst2C;
	
	//@ViewChild('chartManometro') chartManometro: ElementRef; 

	valueTemporal : number = 0;
	CTUnoDiesel;
	CTDosDiesel;
	radialGasPressure=0;
	viewGasPressure=0;
	viewGasPressureTagName:string="";


	maxPow = 590;
	maxHR  = 14000;
	maxHRC = 14000;
	maxRT1 = 50000;
	maxRT2 = 50000;
	maxCaF = 100;
	maxFue = 1;
	maxDiese1=50000;
	maxDiese2=50000;
	/* Espected */
	factorExpEatPow = 440.55;
	factorExpEatCF  = 89;
	factorExpEstPow = 455.4;
	factorExpEstCF  = 92;
	factorCapFactor = 495;
	factorExpEstFuel= 0.182791;
	factorExpEatFuel= -0.246670;

	viewDiesel=0;
	viewDieselMetros;
	viewDieselRadialGauge=0;
	//viewDieselTagName="";
	
	eatHRCorregido;
	estHRCorregido;

	mtr = {
		overview:[
			/*Power OutPut*/ [0,1]  ,[0,1],  [0,1],
			/*heat Rate*/    [0,1]  ,[0,1],  [0,1],
			/*Capacity Fac*/ [0,1]  ,[0,1],  [0,1],
			/*Fuel G/L*/     [0,1]  ,[0,1],  [0,1]
		],
		eat:[
			/*Power OutPut*/ [0,1]  ,[0,1],  [0,1],
			/*heat Rate*/    [0,1]  ,[0,1],  [0,1],
			/*Capacity Fac*/ [0,1]  ,[0,1],  [0,1],
			/*Fuel G/L*/     [0,1]  ,[0,1],  [0,1]
		],
		est:[
			/*Power OutPut*/ [0,1]  ,[0,1],  [0,1],
			/*heat Rate*/    [0,1]  ,[0,1],  [0,1],
			/*Capacity Fac*/ [0,1]  ,[0,1],  [0,1],
			/*Fuel G/L*/     [0,1]  ,[0,1],  [0,1]
		]
	};
	wids=[
		['P0uQAgHoBd0ku7P3cWOJL6IgJiUAAAU0VSVklET1JfUElcREFBMDgyMDY' ,0 ,'eat_power' ,"setEatA1","tagName"],
		['P0uQAgHoBd0ku7P3cWOJL6IgGCUAAAU0VSVklET1JfUElcREFBMDgxMDM' ,0 ,'eat_heatR' ,"setEatA2","tagName"],
		['P0uQAgHoBd0ku7P3cWOJL6IgGSUAAAU0VSVklET1JfUElcREFBMDgxMDQ' ,0 ,'eat_heatRC',"setEatC2","tagName"],

		['F1DP4rhZAwFMREKDf7s8vylUqg1gMAAAUElUVlxULkNFQS4yMjYz'      ,0 ,'est_power' ,"setEstA1","tagName"],
		['F1DP4rhZAwFMREKDf7s8vylUqg2wMAAAUElUVlxULkNFQS4yMjY4'      ,0 ,'est_heatR' ,"setEstA2","tagName"],// T.CEA.2268
		['F1DP4rhZAwFMREKDf7s8vylUqgJA0AAAUElUVlxMR1MuQ0VBLjcx'      ,0 ,'est_heatRC',"setEstC2","tagName"],// LGS.CEA.71

		['P0uQAgHoBd0ku7P3cWOJL6IgnSIAAAU0VSVklET1JfUElcRzFBMDgwOTc' ,0 ,'CTUnoDiesel',"setCTUnoDiesel","tagName"],
		['P0uQAgHoBd0ku7P3cWOJL6IgLCAAAAU0VSVklET1JfUElcRzJBMDgwOTc' ,0 ,'CTDosDiesel',"setCTDosDiesel","tagName"],

		
		/**Aguila */
		
        ['P0uQAgHoBd0ku7P3cWOJL6IgXCUAAAU0VSVklET1JfUElcVC5DRUEuMjI3OA' ,0 ,'',"setOveA1","tagName"],
        ['P0uQAgHoBd0ku7P3cWOJL6IgXiUAAAU0VSVklET1JfUElcVC5DRUEuMjI3OQ' ,0 ,'',"setOveA2","tagName"],
        ['P0uQAgHoBd0ku7P3cWOJL6IgYCUAAAU0VSVklET1JfUElcVC5DRUEuMjI4MA' ,0 ,'',"setOveA3","tagName"],
        ['P0uQAgHoBd0ku7P3cWOJL6IgYiUAAAU0VSVklET1JfUElcREFBMDgxMTM'    ,0 ,'',"setOveC2","tagName"],

        ['P0uQAgHoBd0ku7P3cWOJL6IgWSUAAAU0VSVklET1JfUElcUDFBMDgwODA'    ,0 ,'',"setPercentageDieselTank","tagName"],//setPercentageDieselTank
		['P0uQAgHoBd0ku7P3cWOJL6IgWCUAAAU0VSVklET1JfUElcREFHMDgyMDc'    ,0 ,'',"setEatA3","tagName"],
		

		/**Sol */
		
		['F1DP4rhZAwFMREKDf7s8vylUqgNQ4AAAUElUVlxULkNFQS4yMjc3'         ,0 ,'',"setEstA3","tagName"],
		

	];

	oveA2PorFormula=0;
	oveC2PorFormula=0;
	mtrLineAcDifExp={
		overview:{
			power:[{name:'Actuals',data:[]},{name:'dif',data:[]},{name:'expected',data:[[1167609600000,0.7537],[1167696000000,0.3197]]}],//[[1167609600000,0.7537],[1167696000000,0.3197]],
			heatR:[{name:'Actuals',data:[]},{name:'dif',data:[]},{name:'expected',data:[[1167609600000,0.3237],[1167696000000,0.8177]]}],//[[1167609600000,0.3237],[1167696000000,0.8177]],
			capaF:[{name:'Actuals',data:[]},{name:'dif',data:[]},{name:'expected',data:[[1167609600000,0.6537],[1167696000000,0.1347]]}],//[[1167609600000,0.6537],[1167696000000,0.1347]],
			fuel :[{name:'Actuals',data:[]},{name:'dif',data:[]},{name:'expected',data:[[1167609600000,0.1237],[1167696000000,0.2777]]}],//[[1167609600000,0.1237],[1167696000000,0.2777]]
		},
		eat:{
			power:[{name:'Actuals',data:[]},{name:'dif',data:[]},{name:'expected',data:[[1167609600000,0.8737],[1167696000000,0.6537]]}],//[[1167609600000,0.8737],[1167696000000,0.6537]],
			heatR:[{name:'Actuals',data:[]},{name:'dif',data:[]},{name:'expected',data:[[1167609600000,0.8737],[1167696000000,0.9537]]}],//[[1167609600000,0.8737],[1167696000000,0.9537]],
			capaF:[{name:'Actuals',data:[]},{name:'dif',data:[]},{name:'expected',data:[[1167609600000,0.1546],[1167696000000,0.2537]]}],//[[1167609600000,0.1546],[1167696000000,0.2537]],
			fuel :[{name:'Actuals',data:[]},{name:'dif',data:[]},{name:'expected',data:[[1167609600000,0.5537],[1167696000000,0.4537]]}],//[[1167609600000,0.5537],[1167696000000,0.4537]]
		},
		est:{
			power:[{name:'Actuals',data:[]},{name:'dif',data:[]},{name:'expected',data:[[1167609600000,0.7512],[1167696000000,0.1537]]}],//[[1167609600000,0.7512],[1167696000000,0.1537]],
			heatR:[{name:'Actuals',data:[]},{name:'dif',data:[]},{name:'expected',data:[[1167609600000,0.7537],[1167696000000,0.8517]]}],//[[1167609600000,0.7537],[1167696000000,0.8517]],
			capaF:[{name:'Actuals',data:[]},{name:'dif',data:[]},{name:'expected',data:[[1167609600000,0.8837],[1167696000000,0.6327]]}],//[[1167609600000,0.8837],[1167696000000,0.6327]],
			fuel :[{name:'Actuals',data:[]},{name:'dif',data:[]},{name:'expected',data:[[1167609600000,0.9937],[1167696000000,0.9117]]}],//[[1167609600000,0.9937],[1167696000000,0.9117]]
		}
	};
	public opt :any={
		colors: ['#DDDF0D', '#7798BF', '#55BF3B', '#DF5353', '#aaeeee',
        '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
		chart: {
			backgroundColor: {
				linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
				stops: [
					[0, 'rgb(0, 0, 0)'],
					[1, 'rgb(0, 0, 0)']
				]
			},
			borderWidth: 0,
			borderRadius: 0,
			plotBackgroundColor: null,
			plotShadow: false,
			plotBorderWidth: 0,
            //height: 300
		},
		scrollbar: {
			barBackgroundColor: {
				linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
				stops: [
					[0.4, '#888'],
					[0.6, '#555']
				]
			},
			barBorderColor: '#CCC',
			buttonArrowColor: '#CCC',
			buttonBackgroundColor: {
				linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
				stops: [
					[0.4, '#888'],
					[0.6, '#555']
				]
			},
			buttonBorderColor: '#CCC',
			rifleColor: '#FFF',
			trackBackgroundColor: {
				linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
				stops: [
					[0, '#000'],
					[1, '#333']
				]
			},
			trackBorderColor: '#666'
		},
		title: {
			text: 'AAPL Stock Price',
			style: {
				color: '#FFF',
				font: '16px Lucida Grande, Lucida Sans Unicode,' +
					' Verdana, Arial, Helvetica, sans-serif'
			}
		},
		subtitle: {
			text: 'Click small/large buttons or change window size to test responsiveness',
			style: {
				color: '#DDD',
				font: '12px Lucida Grande, Lucida Sans Unicode,' +
					' Verdana, Arial, Helvetica, sans-serif'
			}
		},
		legend: {
			backgroundColor: 'rgba(48, 48, 48, 0.8)',
			itemStyle: {
				color: '#CCC'
			},
			itemHoverStyle: {
				color: '#FFF'
			},
			itemHiddenStyle: {
				color: '#333'
			},
			title: {
				style: {
					color: '#E0E0E0'
				}
			}
		},
		labels: {
			style: {
				color: '#CCC'
			}
		},
		tooltip: {
			backgroundColor: {
				linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
				stops: [
					[0, 'rgba(96, 96, 96, .8)'],
					[1, 'rgba(16, 16, 16, .8)']
				]
			},
			borderWidth: 0,
			style: {
				color: '#FFF'
			}
		},
		plotOptions: {
			series: {
				dataLabels: {
					color: '#444'
				},
				nullColor: '#444444'
			},
			line: {
				dataLabels: {
					color: '#CCC'
				},
				marker: {
					lineColor: '#333'
				}
			},
			spline: {
				marker: {
					lineColor: '#333'
				}
			},
			scatter: {
				marker: {
					lineColor: '#333'
				}
			},
			candlestick: {
				lineColor: 'white'
			}
		},
		toolbar: {
			itemStyle: {
				color: '#CCC'
			}
		},
		navigation: {
			buttonOptions: {
				symbolStroke: '#DDDDDD',
				theme: {
					fill: {
						linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
						stops: [
							[0.4, '#606060'],
							[0.6, '#333333']
						]
					},
					stroke: '#000000'
				}
			}
		},
		// scroll charts
		rangeSelector: {
			selected: 1,
			buttonTheme: {
				fill: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
					stops: [
						[0.4, '#888'],
						[0.6, '#555']
					]
				},
				stroke: '#000000',
				style: {
					color: '#CCC',
					fontWeight: 'bold'
				},
				states: {
					hover: {
						fill: {
							linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
							stops: [
								[0.4, '#BBB'],
								[0.6, '#888']
							]
						},
						stroke: '#000000',
						style: {
							color: 'white'
						}
					},
					select: {
						fill: {
							linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
							stops: [
								[0.1, '#000'],
								[0.3, '#333']
							]
						},
						stroke: '#000000',
						style: {
							color: 'yellow'
						}
					}
				}
			},
			inputStyle: {
				backgroundColor: '#333',
				color: 'silver'
			},
			labelStyle: {
				color: '#fff'
			}
		},
		navigator: {
			handles: {
				backgroundColor: '#666',
				borderColor: '#fff'
			},
			outlineColor: '#CCC',
			maskFill: 'rgba(16, 16, 16, 0.5)',
			series: {
				color: '#7798BF',
				lineColor: '#A6C7ED'
			}
		},
		xAxis: {
			gridLineWidth: 0,
			lineColor: '#fff',
			tickColor: '#fff',
			labels: {
				style: {
					color: '#fff',
					fontWeight: 'bold'
				}
			},
			title: {
				style: {
					color: '#fff',
					font: 'bold 12px Lucida Grande, Lucida Sans Unicode,' +
						' Verdana, Arial, Helvetica, sans-serif'
				}
			}
		},
		yAxis: {
			alternateGridColor: null,
			minorTickInterval: null,
			gridLineColor: 'rgba(255, 255, 255, .1)',
			minorGridLineColor: 'rgba(255,255,255,0.07)',
			lineWidth: 0,
			tickWidth: 0,
			labels: {
				style: {
					color: '#fff',
					fontWeight: 'bold'
				}
			},
			title: {
				style: {
					color: '#fff',
					font: 'bold 12px Lucida Grande, Lucida Sans Unicode,' +
						' Verdana, Arial, Helvetica, sans-serif'
				}
			}
		},
	
		time: {
			timezone: 'America/Mexico_City',
			useUTC: false
		},
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 900
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
            },{
				condition: {
					minWidth: 901
				},
				chartOptions: {
					chart: {
						height: null
					}
				}
			}]
        },

		series: [{
			name: '',
			data: algo.algo,
            type: 'area',
            threshold: null,
            tooltip: {
                valueDecimals: 2
            }
		}],
	}

	
	public line2:any= {
		
		colors: ['#DDDF0D', '#7798BF', '#55BF3B', '#DF5353', '#aaeeee',
        '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
		chart: {
			backgroundColor: {
				linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
				stops: [
					[0, 'rgb(0, 0, 0)'],
					[1, 'rgb(0, 0, 0)']
				]
			},
			borderWidth: 0,
			borderRadius: 0,
			plotBackgroundColor: null,
			plotShadow: false,
			plotBorderWidth: 0,
            //height: 300
		},
		scrollbar: {
			barBackgroundColor: {
				linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
				stops: [
					[0.4, '#888'],
					[0.6, '#555']
				]
			},
			barBorderColor: '#CCC',
			buttonArrowColor: '#CCC',
			buttonBackgroundColor: {
				linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
				stops: [
					[0.4, '#888'],
					[0.6, '#555']
				]
			},
			buttonBorderColor: '#CCC',
			rifleColor: '#FFF',
			trackBackgroundColor: {
				linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
				stops: [
					[0, '#000'],
					[1, '#333']
				]
			},
			trackBorderColor: '#666'
		},
		title: {
			text: 'AAPL Stock Price',
			style: {
				color: '#FFF',
				font: '16px Lucida Grande, Lucida Sans Unicode,' +
					' Verdana, Arial, Helvetica, sans-serif'
			}
		},
		subtitle: {
			text: 'Click small/large buttons or change window size to test responsiveness',
			style: {
				color: '#DDD',
				font: '12px Lucida Grande, Lucida Sans Unicode,' +
					' Verdana, Arial, Helvetica, sans-serif'
			}
		},
		legend: {
			backgroundColor: 'rgba(48, 48, 48, 0.8)',
			itemStyle: {
				color: '#CCC'
			},
			itemHoverStyle: {
				color: '#FFF'
			},
			itemHiddenStyle: {
				color: '#333'
			},
			title: {
				style: {
					color: '#E0E0E0'
				}
			}
		},
		labels: {
			style: {
				color: '#CCC'
			}
		},
		tooltip: {
			backgroundColor: {
				linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
				stops: [
					[0, 'rgba(96, 96, 96, .8)'],
					[1, 'rgba(16, 16, 16, .8)']
				]
			},
			borderWidth: 0,
			style: {
				color: '#FFF'
			}
		},
		plotOptions: {
			series: {
				dataLabels: {
					color: '#444'
				},
				nullColor: '#444444'
			},
			line: {
				dataLabels: {
					color: '#CCC'
				},
				marker: {
					lineColor: '#333'
				}
			},
			spline: {
				marker: {
					lineColor: '#333'
				}
			},
			scatter: {
				marker: {
					lineColor: '#333'
				}
			},
			candlestick: {
				lineColor: 'white'
			}
		},
		toolbar: {
			itemStyle: {
				color: '#CCC'
			}
		},
		navigation: {
			buttonOptions: {
				symbolStroke: '#DDDDDD',
				theme: {
					fill: {
						linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
						stops: [
							[0.4, '#606060'],
							[0.6, '#333333']
						]
					},
					stroke: '#000000'
				}
			}
		},
		// scroll charts
		rangeSelector: {
			inputEnabled: true,
			selected: 0,
			buttonTheme: {
				fill: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
					stops: [
						[0.4, '#888'],
						[0.6, '#555']
					]
				},
				stroke: '#000000',
				style: {
					color: '#CCC',
					fontWeight: 'bold'
				},
				states: {
					hover: {
						fill: {
							linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
							stops: [
								[0.4, '#BBB'],
								[0.6, '#888']
							]
						},
						stroke: '#000000',
						style: {
							color: 'white'
						}
					},
					select: {
						fill: {
							linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
							stops: [
								[0.1, '#000'],
								[0.3, '#333']
							]
						},
						stroke: '#000000',
						style: {
							color: 'yellow'
						}
					}
				}
			},
			inputStyle: {
				backgroundColor: '#333',
				color: '#fff'
			},
			labelStyle: {
				color: '#fff'
			}
		},
		navigator: {
			handles: {
				backgroundColor: '#666',
				borderColor: '#AAA'
			},
			outlineColor: '#CCC',
			maskFill: 'rgba(16, 16, 16, 0.5)',
			series: {
				color: '#7798BF',
				lineColor: '#A6C7ED'
			}
		},
		xAxis: {
			gridLineWidth: 0,
			lineColor: '#fff',
			tickColor: '#fff',
			labels: {
				style: {
					color: '#fff',
					fontWeight: 'bold'
				}
			},
			title: {
				style: {
					color: '#fff',
					font: 'bold 12px Lucida Grande, Lucida Sans Unicode,' +
						' Verdana, Arial, Helvetica, sans-serif'
				}
			}
		},
		yAxis: {
			alternateGridColor: null,
			minorTickInterval: null,
			gridLineColor: 'rgba(255, 255, 255, .1)',
			minorGridLineColor: 'rgba(255,255,255,0.07)',
			lineWidth: 0,
			tickWidth: 0,
			labels: {
				style: {
					color: '#fff',
					fontWeight: 'bold'
				}
			},
			title: {
				style: {
					color: '#fff',
					font: 'bold 12px Lucida Grande, Lucida Sans Unicode,' +
						' Verdana, Arial, Helvetica, sans-serif'
				}
			}
		},
	
		time: {
			timezone: 'America/Mexico_City',
			useUTC: false
		},
        responsive: {
            rules: [
				{
					condition: {
						maxWidth: 900
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
				},{
					condition: {
						minWidth: 901
					},
					chartOptions: {
						chart: {
							height: null
						}
					}
				}
			]
        },
        series: [
			{
				name: 'Actuals',
				data: []
			}
		]
	}
	public optManometro:any={

		chart: {
			type: 'gauge',
			plotBackgroundColor: null,
			plotBackgroundImage: null,
			plotBorderWidth: 0,
			plotShadow: true,
			backgroundColor: {
				linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
				stops: [
					[0, 'rgb(0, 0, 0)'],
					[1, 'rgb(0, 0, 0)']
				]
			},
			height: 260,
			width:260
		},

		title: {
			text: ''
		},

		exporting: {
		  enabled: false
		},
	
		pane: {
			startAngle: -150,
			endAngle: 150,
			background: [{
				backgroundColor: '#000',
				borderWidth: 0,
				outerRadius: '100%',
				innerRadius: '88%'
			}]
		},
	
		// the value axis
		yAxis: {
			min: 0,
			max: 70,
	
			minorTickInterval: 'auto',
			minorTickWidth: 1,
			minorTickLength: 10,
			minorTickPosition: 'inside',
			minorTickColor: '#666',
	
			tickPixelInterval: 30,
			tickWidth: 2,
			tickPosition: 'inside',
			tickLength: 10,
			tickColor: '#666',
			labels: {
				step: 2,
				rotation: 'auto',
				style: {
					color: '#fff',
					fontWeigth: 'normal'
				}
			},
			title: {
				text: 'kg/cm^2',
				style: {
					color: '#fff',
					fontWeigth: 'normal'
				}
			},
			plotBands: [{
				from: 0,
				to: 39,
				color: '#DF5353' // green #55BF3B
			}, {
				from: 39,
				to: 45,
				color: '#DDDF0D' // yellow DDDF0D
			}, {
				from: 45,
				to: 70,
				color: '#55BF3B' // red DF5353
			}]
		},

		plotOptions: {
			series: {
				dataLabels: {
					enabled: false,
					color: '#fff'
				}
			},
			gauge: {
				dial: {
					backgroundColor: '#fff',
				},
				pivot: {
					backgroundColor: '#fff'
				},/*
				dataLabels: {
					borderWidth: 2,
					borderColor: '#d3e9f7',
					padding: 5,
					borderRadius: 2,
					verticalAlign: 'center',
					y: 30,
					style: {
						fontWeight: 'normal'
					}
				},
				wrap: false//*/
			}
		},
	
		series: [{
			name: 'Bar',
			data: [0],
			tooltip: {
				valueSuffix: 'kg/cm^2'
			}
		}]
	
	};
	valueGas=100;
	id;
	id2;
	
	showOveLine=1;
	showEstLine=2;
	showEatLine=2;

	/**weather */
	dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	stringDate:string = '';
	realFeelTemp="";
	temperatura="";
	weatherText="";
	UVIndex="";
	UVIndexText="";
	pressureTendency="";
	humidity="";
	pressure="";
	windSpeed="";
	chartManoometro;
	excessCapacityEST="0";
	excessCapacityEAT="0";

	exportAsExcelFile=[];
	mapBookExcel = new Map();
    constructor(
        public globalService       : GlobalService,
        public eventService        : EventService,
        public socketService       : SocketService,
		public securityService     : SecurityService,
		public monitoringTrService : MonitoringTrService,
		private excelService       : ExcelService,
		private datePipe           : DatePipe
    ) {
        super(globalService, eventService, socketService,securityService);
	}
	getTagName(fname:string):string{
		let name = "";
		for (const e of this.wids) {
			if(fname==e[3]){
				name = e[4]+"";
			}
		}
		return name;
	}
	ngOnDestroy(){
		if (this.id) {
			clearInterval(this.id);
			clearInterval(this.id2);
		}
	}
	ngOnInit() {
		let url = `/assets/css/theme/content/monitoringv2.css`;
		document.getElementById("content_theme").setAttribute('href',url);
		//Highcharts.setOptions(highcharts.theme);
		
		this.sleep(2000).then(() => { this.cargar(); });
	}
	cargar(){
		this.sleep(5000);
		this.initChart();
		this.getStreamsetsInterpolatedLast24HoursSol();
		this.getStreamsetsInterpolatedLast24HoursAguila();
		
		this.subscribeSocketChannel("pi-servers"    ,(data)=>{this.socketFlow(data);}  ,()=>{this.socketReconnected();}  ,()=>{this.socketDisconnected();});
		this.subscribeSocketChannel("weather"    ,(data)=>{this.socketFlowWeather(data);}  ,()=>{this.socketReconnected();}  ,()=>{this.socketDisconnected();});
		//this.subscribeSocketChannel("back-pi-isrun" ,(data)=>{this.socketFlow(data);}  ,()=>{this.socketReconnected();}  ,()=>{this.socketDisconnected();});
		this.initManoometro();
		/*
		this.setMtr();
		this.updateDonughtChart();
		//*/
		this.updateChartDif(); 			
		this.loadData();
		this.id = setInterval(() => {
		  this.getStreamsetsInterpolatedSolPresionGas();
		}, 5000);
		this.id2 = setInterval(() => {
			/**Cada Hora */
			this.updateChartDif(); 			
			this.loadData();
		}, 3600000);
		this.addBlock(1,'');
		this.sleep(4000).then(() => { this.addBlock(2,''); });

	}
	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	initManoometro(){
		//this.chartManoometro = Highcharts.chart(this.chartManometro.nativeElement, this.optManometro);
	}
	socketFlowWeather(data){
		let weather = data.data;
		let date = new Date();
		this.stringDate = date.toLocaleDateString("es-ES", this.dateOptions);
		this.temperatura = weather.Temperature.Metric.Value;
		this.realFeelTemp = weather.RealFeelTemperature.Metric.Value;
		this.weatherText = weather.WeatherText;
		this.UVIndex = weather.UVIndex;
		this.UVIndexText = weather.UVIndexText;
		this.pressureTendency = weather.PressureTendency.LocalizedText;
		this.humidity = weather.RelativeHumidity;
		this.pressure = weather.Pressure.Metric.Value;
		this.windSpeed = weather.Wind.Speed.Metric.Value;

	}
	socketFlow(data:PiServerBox){
		/*
		this.chartLineOve1C.redraw();
		this.chartLineEat1C.redraw();
		this.chartLineEst1C.redraw();
		this.chartLineEat2C.redraw();
		this.chartLineEst2C.redraw();
		/*
		this.chartLineOve1C.update();
		this.chartLineEat1C.update();
		this.chartLineEst1C.update();
		this.chartLineEat2C.update();
		this.chartLineEst2C.update();//*/

		//this.chartLineOve1C?this.chartLineOve1C.series[0].addPoint([(new Date()).getTime(), 500], true, true):null;
		//*/
		for (const plant of data.data) {
			if(plant.Items && plant.Items.length > 0){
				for (const tag of plant.Items) {
					for (const iterator of this.wids) {
						if(tag.WebId == iterator[0]){
							this.valueTemporal =  +tag.Value.Value;
							iterator[1]=this.valueTemporal;
							iterator[4]=tag.Name;
							//console.log(iterator[3]);
							this[iterator[3]](this.valueTemporal);
						}
					}
				}
			}else{
				//debugger
			}
		}
		this.setMtr();
		this.updateDonughtChart();
		this.updateMtrLineDif();
	}
	eventExportAsExcelFile(){
		this.excelService.exportAsExcelBook(this.mapBookExcel);
	}
	socketReconnected(){

	}
	socketDisconnected(){

	}
	getStreamsetsInterpolatedLast24HoursAguila(){

		this.monitoringTrService.getStreamsetsInterpolatedLastHours('1',[TAGS.lstTags['PowerOutput']['aguila'][0]['WebId']],8760)
			.subscribe(
				data => {
					let values = ( ! data.data[0]['error_response'] ) ? data.data[0]['Items'][0]['Items'].map((item)=>[new Date(item['Timestamp']).getTime(), item.Value.Value]) : [];
					this.opt.series[0]['data'] = values;
					this.opt.title.text        = TAGS.lstTags['PowerOutput']['label'];
					this.opt.subtitle.text     = data.data[0]['Items'][0]['Name'];
					Highcharts.stockChart(this.chartLineEat2.nativeElement, this.opt);
		
				},
				errorData => {
				//this.toastr.errorToastr(Constants.ERROR_LOAD, 'Clima actual');
				}
			);
	}
	getStreamsetsInterpolatedLast24HoursSol(){

		this.monitoringTrService.getStreamsetsInterpolatedLastHours('2',[TAGS.lstTags['PowerOutput']['sol'][0]['WebId']],8760)
			.subscribe(
				data => {
					let values = ( ! data.data[0]['error_response'] ) ? data.data[0]['Items'][0]['Items'].map((item)=>[new Date(item['Timestamp']).getTime(), item.Value.Value]) : [];
					this.opt.series[0]['data'] = values;
					this.opt.title.text        = TAGS.lstTags['PowerOutput']['label'];
					this.opt.subtitle.text     = data.data[0]['Items'][0]['Name'];
					Highcharts.stockChart(this.chartLineEst2.nativeElement, this.opt);
		
				},
				errorData => {
				//this.toastr.errorToastr(Constants.ERROR_LOAD, 'Clima actual');
				}
			);
	}	
	DemoManometro(){
		
		this.chartManoometro.update({
			series: {
				name: 'Bar',
				data: [100],
				tooltip: {
					valueSuffix: ' kg/cm^2'
				}
			},
		  });
	}
	
	loadData() {
		let fecha = new Date();
		
		this.monitoringTrService.getModelMarketSol(fecha.getTime())
		  .subscribe(
			data => {
			  const rows = data.rows;
			  for (let i = 0; i < rows.length; i++) {
				const hour: any = {};
				const offerIncrements = rows[i].offerIncrements;
				hour.hour = offerIncrements[0].hour;
				hour.limitDispatchMin = rows[i].planningDetail.limitDespatchMin;
				hour.limitDispatchMax = rows[i].planningDetail.limitDespatchMax;
				hour.idSubInt =  rows[i].planningDetail.idSubInt;
				hour.minimumPowerOperationCost = (rows[i].planningCharges) ? rows[i].planningCharges.costOperation : 0;
				let hours = new Date().getHours();
				if(hours == hour.hour){
					this.excessCapacityEST = hour.limitDispatchMax+"";
				}
				
			  }
			 
			},
			errorData => {
			  
			});
	}
	getStreamsetsInterpolatedSolPresionGas(){

		this.monitoringTrService.getStreamsetsInterpolatedLastHours('2',['F1DP4rhZAwFMREKDf7s8vylUqgnAMAAAUElUVlxULkNFQS4yMTk0'],1)
			.subscribe(
				(data:PiServerBox) => {
					let max = 68;
					let value = data.data[0]['Items'][0]['Items'][data.data[0]['Items'][0]['Items'].length-1].Value.Value;
					//this.viewGasPressure = ((value*100)/max);
					this.viewGasPressure = value;
					this.viewGasPressureTagName = data.data[0].error_response?"":data.data[0].Items[0].Name;
					/*this.chartManoometro.update({
						series: {
							name: 'Bar',
							data: [value],
							tooltip: {
								valueSuffix: ' kg/cm^2'
							}
						},
					  });//*/
					this.optManometro.series[0].data = [value];
					this.radialGasPressure = 80+(120-(80+((40*((value*100)/max))/100)));					
				},
				errorData => {
				//this.toastr.errorToastr(Constants.ERROR_LOAD, 'Clima actual');
				}
			);
	}
	getStreamsetsInterpolatedAguilaDieselTank(){
		/*
		this.monitoringTrService.getStreamsetsInterpolatedLastHours('1',['P0uQAgHoBd0ku7P3cWOJL6IgyyMAAAU0VSVklET1JfUElcUDFBMDgwNjI'],1)
			.subscribe(
				data => {
					//14.13 son metros y es mi maximo 
					//data / 1000 // convertir a metros
					// en la representacion radial-gauge en 80 representa el 100% y el 120 representa el 0%
					let max = 14.13;
					let value = data.data[0]['Items'][0]['Items'][data.data[0]['Items'][0]['Items'].length-1].Value.Value;
					this.viewDieselMetros= value/1000;
					this.viewDiesel = ((this.viewDieselMetros*100)/max);
					this.viewDieselTagName = data.data[0].error_response?"":data.data[0].Items[0].Name;
					debugger
					let v = (40*this.viewDiesel)/100;		
					this.viewDieselRadialGauge = 80+(120-(80+v));	
				},
				errorData => {
				//this.toastr.errorToastr(Constants.ERROR_LOAD, 'Clima actual');
				}
			);
			//*/
	}
	setPercentageDieselTank(x){
		this.viewDiesel = x;		
		let v = (40*this.viewDiesel)/100;		
		this.viewDieselRadialGauge = 80+(120-(80+v));
	}
	returnConfigDonught(){
		return {

			type: 'doughnut',
			data: {
				datasets: [{
					data: [0,1],
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
				},
				tooltips: {
					 enabled: false
				}
			}
		
		};
	}
	initChart(){
		this.chartLineOve1C = Highcharts.stockChart(this.chartLineOve1.nativeElement, this.line2);
		this.chartLineEat1C = Highcharts.stockChart(this.chartLineEat1.nativeElement, this.line2);
		this.chartLineEat2C = Highcharts.stockChart(this.chartLineEat2.nativeElement, this.opt);
		this.chartLineEst1C = Highcharts.stockChart(this.chartLineEst1.nativeElement, this.line2);
		this.chartLineEst2C = Highcharts.stockChart(this.chartLineEst2.nativeElement, this.opt);
		
		///*
		this.chartOveA1C = new Chart(this.chartOveA1.nativeElement,this.returnConfigDonught());
		this.chartOveA2C = new Chart(this.chartOveA2.nativeElement,this.returnConfigDonught());
		this.chartOveA3C = new Chart(this.chartOveA3.nativeElement,this.returnConfigDonught());
		this.chartOveA4C = new Chart(this.chartOveA4.nativeElement,this.returnConfigDonught());
		this.chartOveB1C = new Chart(this.chartOveB1.nativeElement,this.returnConfigDonught());
		this.chartOveB2C = new Chart(this.chartOveB2.nativeElement,this.returnConfigDonught());
		this.chartOveB3C = new Chart(this.chartOveB3.nativeElement,this.returnConfigDonught());
		this.chartOveB4C = new Chart(this.chartOveB4.nativeElement,this.returnConfigDonught());
		this.chartOveC1C = new Chart(this.chartOveC1.nativeElement,this.returnConfigDonught());
		this.chartOveC2C = new Chart(this.chartOveC2.nativeElement,this.returnConfigDonught());
		this.chartOveC3C = new Chart(this.chartOveC3.nativeElement,this.returnConfigDonught());
		this.chartOveC4C = new Chart(this.chartOveC4.nativeElement,this.returnConfigDonught());
		this.chartEatA1C = new Chart(this.chartEatA1.nativeElement,this.returnConfigDonught());
		this.chartEatA2C = new Chart(this.chartEatA2.nativeElement,this.returnConfigDonught());
		this.chartEatA3C = new Chart(this.chartEatA3.nativeElement,this.returnConfigDonught());
		this.chartEatA4C = new Chart(this.chartEatA4.nativeElement,this.returnConfigDonught());
		this.chartEatB1C = new Chart(this.chartEatB1.nativeElement,this.returnConfigDonught());
		this.chartEatB2C = new Chart(this.chartEatB2.nativeElement,this.returnConfigDonught());
		this.chartEatB3C = new Chart(this.chartEatB3.nativeElement,this.returnConfigDonught());
		this.chartEatB4C = new Chart(this.chartEatB4.nativeElement,this.returnConfigDonught());
		this.chartEatC1C = new Chart(this.chartEatC1.nativeElement,this.returnConfigDonught());
		this.chartEatC2C = new Chart(this.chartEatC2.nativeElement,this.returnConfigDonught());
		this.chartEatC3C = new Chart(this.chartEatC3.nativeElement,this.returnConfigDonught());
		this.chartEatC4C = new Chart(this.chartEatC4.nativeElement,this.returnConfigDonught());
		this.chartEstA1C = new Chart(this.chartEstA1.nativeElement,this.returnConfigDonught());
		this.chartEstA2C = new Chart(this.chartEstA2.nativeElement,this.returnConfigDonught());
		this.chartEstA3C = new Chart(this.chartEstA3.nativeElement,this.returnConfigDonught());
		this.chartEstA4C = new Chart(this.chartEstA4.nativeElement,this.returnConfigDonught());
		this.chartEstB1C = new Chart(this.chartEstB1.nativeElement,this.returnConfigDonught());
		this.chartEstB2C = new Chart(this.chartEstB2.nativeElement,this.returnConfigDonught());
		this.chartEstB3C = new Chart(this.chartEstB3.nativeElement,this.returnConfigDonught());
		this.chartEstB4C = new Chart(this.chartEstB4.nativeElement,this.returnConfigDonught());
		this.chartEstC1C = new Chart(this.chartEstC1.nativeElement,this.returnConfigDonught());
		this.chartEstC2C = new Chart(this.chartEstC2.nativeElement,this.returnConfigDonught());
		this.chartEstC3C = new Chart(this.chartEstC3.nativeElement,this.returnConfigDonught());
		this.chartEstC4C = new Chart(this.chartEstC4.nativeElement,this.returnConfigDonught());
		//*/
	}
	updateDonughtChart(){
		
		this.donugthCheckColor(this.chartOveA1C ,this.getOveA1());
		this.donugthCheckColor(this.chartOveA2C ,this.getOveA2());
		this.donugthCheckColor(this.chartOveA3C ,this.getOveA3());
		this.donugthCheckColor(this.chartOveA4C ,this.getOveA4());
		this.donugthCheckColor(this.chartOveB1C ,this.getOveB1());
		this.donugthCheckColor(this.chartOveB2C ,this.getOveB2());
		this.donugthCheckColor(this.chartOveB3C ,this.getOveB3());
		this.donugthCheckColor(this.chartOveB4C ,this.getOveB4());
		this.donugthCheckColor(this.chartOveC1C ,this.getOveC1());
		this.donugthCheckColor(this.chartOveC2C ,this.getOveC2());
		this.donugthCheckColor(this.chartOveC3C ,this.getOveC3());
		this.donugthCheckColor(this.chartOveC4C ,this.getOveC4());
		this.donugthCheckColor(this.chartEatA1C ,this.getEatA1());
		this.donugthCheckColor(this.chartEatA2C ,this.getEatA2());
		this.donugthCheckColor(this.chartEatA3C ,this.getEatA3());
		this.donugthCheckColor(this.chartEatA4C ,this.getEatA4());
		this.donugthCheckColor(this.chartEatB1C ,this.getEatB1());
		this.donugthCheckColor(this.chartEatB2C ,this.getEatB2());
		this.donugthCheckColor(this.chartEatB3C ,this.getEatB3());
		this.donugthCheckColor(this.chartEatB4C ,this.getEatB4());
		this.donugthCheckColor(this.chartEatC1C ,this.getEatC1());
		this.donugthCheckColor(this.chartEatC2C ,this.getEatC2());
		this.donugthCheckColor(this.chartEatC3C ,this.getEatC3());
		this.donugthCheckColor(this.chartEatC4C ,this.getEatC4());
		this.donugthCheckColor(this.chartEstA1C ,this.getEstA1());
		this.donugthCheckColor(this.chartEstA2C ,this.getEstA2());
		this.donugthCheckColor(this.chartEstA3C ,this.getEstA3());
		this.donugthCheckColor(this.chartEstA4C ,this.getEstA4());
		this.donugthCheckColor(this.chartEstB1C ,this.getEstB1());
		this.donugthCheckColor(this.chartEstB2C ,this.getEstB2());
		this.donugthCheckColor(this.chartEstB3C ,this.getEstB3());
		this.donugthCheckColor(this.chartEstB4C ,this.getEstB4());
		this.donugthCheckColor(this.chartEstC1C ,this.getEstC1());
		this.donugthCheckColor(this.chartEstC2C ,this.getEstC2());
		this.donugthCheckColor(this.chartEstC3C ,this.getEstC3());
		this.donugthCheckColor(this.chartEstC4C ,this.getEstC4());

		/*
		this.chartOveA1C.data.datasets[0].data = this.getOveA1();
		this.chartOveA2C.data.datasets[0].data = this.getOveA2();
		this.chartOveA3C.data.datasets[0].data = this.getOveA3();
		this.chartOveA4C.data.datasets[0].data = this.getOveA4();
		this.chartOveB1C.data.datasets[0].data = this.getOveB1();
		this.chartOveB2C.data.datasets[0].data = this.getOveB2();
		this.chartOveB3C.data.datasets[0].data = this.getOveB3();
		this.chartOveB4C.data.datasets[0].data = this.getOveB4();
		this.chartOveC1C.data.datasets[0].data = this.getOveC1();
		this.chartOveC2C.data.datasets[0].data = this.getOveC2();
		this.chartOveC3C.data.datasets[0].data = this.getOveC3();
		this.chartOveC4C.data.datasets[0].data = this.getOveC4();

		this.chartEatA1C.data.datasets[0].data = this.getEatA1();
		this.chartEatA2C.data.datasets[0].data = this.getEatA2();
		this.chartEatA3C.data.datasets[0].data = this.getEatA3();
		this.chartEatA4C.data.datasets[0].data = this.getEatA4();
		this.chartEatB1C.data.datasets[0].data = this.getEatB1();
		this.chartEatB2C.data.datasets[0].data = this.getEatB2();
		this.chartEatB3C.data.datasets[0].data = this.getEatB3();
		this.chartEatB4C.data.datasets[0].data = this.getEatB4();
		this.chartEatC1C.data.datasets[0].data = this.getEatC1();
		this.chartEatC2C.data.datasets[0].data = this.getEatC2();
		this.chartEatC3C.data.datasets[0].data = this.getEatC3();
		this.chartEatC4C.data.datasets[0].data = this.getEatC4();

		this.chartEstA1C.data.datasets[0].data = this.getEstA1();
		this.chartEstA2C.data.datasets[0].data = this.getEstA2();
		this.chartEstA3C.data.datasets[0].data = this.getEstA3();
		this.chartEstA4C.data.datasets[0].data = this.getEstA4();
		this.chartEstB1C.data.datasets[0].data = this.getEstB1();
		this.chartEstB2C.data.datasets[0].data = this.getEstB2();
		this.chartEstB3C.data.datasets[0].data = this.getEstB3();
		this.chartEstB4C.data.datasets[0].data = this.getEstB4();
		this.chartEstC1C.data.datasets[0].data = this.getEstC1();
		this.chartEstC2C.data.datasets[0].data = this.getEstC2();
		this.chartEstC3C.data.datasets[0].data = this.getEstC3();
		this.chartEstC4C.data.datasets[0].data = this.getEstC4();

		this.chartOveA1C.update();
		this.chartOveA2C.update();
		this.chartOveA3C.update();
		this.chartOveA4C.update();
		this.chartOveB1C.update();
		this.chartOveB2C.update();
		this.chartOveB3C.update();
		this.chartOveB4C.update();
		this.chartOveC1C.update();
		this.chartOveC2C.update();
		this.chartOveC3C.update();
		this.chartOveC4C.update();
		this.chartEatA1C.update();
		this.chartEatA2C.update();
		this.chartEatA3C.update();
		this.chartEatA4C.update();
		this.chartEatB1C.update();
		this.chartEatB2C.update();
		this.chartEatB3C.update();
		this.chartEatB4C.update();
		this.chartEatC1C.update();
		this.chartEatC2C.update();
		this.chartEatC3C.update();
		this.chartEatC4C.update();
		this.chartEstA1C.update();
		this.chartEstA2C.update();
		this.chartEstA3C.update();
		this.chartEstA4C.update();
		this.chartEstB1C.update();
		this.chartEstB2C.update();
		this.chartEstB3C.update();
		this.chartEstB4C.update();
		this.chartEstC1C.update();
		this.chartEstC2C.update();
		this.chartEstC3C.update();
		this.chartEstC4C.update();
		//*/
	}
	donugthCheckColor(chart,data){
		let mydata = [...data]
		chart.data.datasets[0].data = mydata;
		chart.data.datasets[0].backgroundColor[0] = "#46FF33";
		chart.data.datasets[0].backgroundColor[1] = "#7f8182";
		if(data[0] < 0){
			chart.data.datasets[0].data.reverse();
			chart.data.datasets[0].backgroundColor[0] = "#7f8182";
			chart.data.datasets[0].backgroundColor[1] = "#ff0000";
		}
		chart.update();
	}
	setMtr(){
		//this.setEatA1();
		//this.setEatA2();
		//this.setEatA3();
		this.setEatA4();
		this.setEatC1();
		//this.setEatC2();
		this.setEatC3();
		this.setEatC4();
		this.setEatB1();
		this.setEatB2();
		this.setEatB3();
		this.setEatB4();

		//this.setEstA1();
		//this.setEstA2();
		//this.setEstA3();
		this.setEstA4();
		this.setEstC1();
		//this.setEstC2();
		this.setEstC3();
		this.setEstC4();
		this.setEstB1();
		this.setEstB2();
		this.setEstB3();
		this.setEstB4();	
		
		//this.setOveA1();
		//this.setOveA2();
		this.setOveA2PorFormula();
		//this.setOveA3();
		this.setOveA4();
		this.setOveC1();
		//this.setOveC2();
		this.setOveC2PorFormula();
		this.setOveC3();
		this.setOveC4();
		this.setOveB1();
		this.setOveB2();
		this.setOveB3();
		this.setOveB4();
	}
	updateMtrLineDif(){
		this.mtrLineAcDifExp.overview.power[0]['data'].push([new Date().getTime(),this.getOveA1()[0]]);
		this.mtrLineAcDifExp.overview.power[1]['data'].push([new Date().getTime(),this.getOveB1()[0]]);
		this.mtrLineAcDifExp.overview.power[2]['data'].push([new Date().getTime(),this.getOveC1()[0]]);
		
		this.mtrLineAcDifExp.overview.heatR[0]['data'].push([new Date().getTime(),this.getOveA2()[0]]);
		this.mtrLineAcDifExp.overview.heatR[1]['data'].push([new Date().getTime(),this.getOveB2()[0]]);
		this.mtrLineAcDifExp.overview.heatR[2]['data'].push([new Date().getTime(),this.getOveC2()[0]]);
		
		this.mtrLineAcDifExp.overview.capaF[0]['data'].push([new Date().getTime(),this.getOveA3()[0]]);
		this.mtrLineAcDifExp.overview.capaF[1]['data'].push([new Date().getTime(),this.getOveB3()[0]]);
		this.mtrLineAcDifExp.overview.capaF[2]['data'].push([new Date().getTime(),this.getOveC3()[0]]);
		
		this.mtrLineAcDifExp.overview.fuel[0]['data'].push([new Date().getTime(),this.getOveA4()[0]]);
		this.mtrLineAcDifExp.overview.fuel[1]['data'].push([new Date().getTime(),this.getOveB4()[0]]);
		this.mtrLineAcDifExp.overview.fuel[2]['data'].push([new Date().getTime(),this.getOveC4()[0]]);

		
		this.mtrLineAcDifExp.eat.power[0]['data'].push([new Date().getTime(),this.getEatA1()[0]]);
		this.mtrLineAcDifExp.eat.power[1]['data'].push([new Date().getTime(),this.getEatB1()[0]]);
		this.mtrLineAcDifExp.eat.power[2]['data'].push([new Date().getTime(),this.getEatC1()[0]]);
		
		this.mtrLineAcDifExp.eat.heatR[0]['data'].push([new Date().getTime(),this.getEatA2()[0]]);
		this.mtrLineAcDifExp.eat.heatR[1]['data'].push([new Date().getTime(),this.getEatB2()[0]]);
		this.mtrLineAcDifExp.eat.heatR[2]['data'].push([new Date().getTime(),this.getEatC2()[0]]);
		
		this.mtrLineAcDifExp.eat.capaF[0]['data'].push([new Date().getTime(),this.getEatA3()[0]]);
		this.mtrLineAcDifExp.eat.capaF[1]['data'].push([new Date().getTime(),this.getEatB3()[0]]);
		this.mtrLineAcDifExp.eat.capaF[2]['data'].push([new Date().getTime(),this.getEatC3()[0]]);
		
		this.mtrLineAcDifExp.eat.fuel[0]['data'].push([new Date().getTime(),this.getEatA4()[0]]);
		this.mtrLineAcDifExp.eat.fuel[1]['data'].push([new Date().getTime(),this.getEatB4()[0]]);
		this.mtrLineAcDifExp.eat.fuel[2]['data'].push([new Date().getTime(),this.getEatC4()[0]]);

		
		this.mtrLineAcDifExp.est.power[0]['data'].push([new Date().getTime(),this.getEstA1()[0]]);
		this.mtrLineAcDifExp.est.power[1]['data'].push([new Date().getTime(),this.getEstB1()[0]]);
		this.mtrLineAcDifExp.est.power[2]['data'].push([new Date().getTime(),this.getEstC1()[0]]);
		
		this.mtrLineAcDifExp.est.heatR[0]['data'].push([new Date().getTime(),this.getEstA2()[0]]);
		this.mtrLineAcDifExp.est.heatR[1]['data'].push([new Date().getTime(),this.getEstB2()[0]]);
		this.mtrLineAcDifExp.est.heatR[2]['data'].push([new Date().getTime(),this.getEstC2()[0]]);
		
		this.mtrLineAcDifExp.est.capaF[0]['data'].push([new Date().getTime(),this.getEstA3()[0]]);
		this.mtrLineAcDifExp.est.capaF[1]['data'].push([new Date().getTime(),this.getEstB3()[0]]);
		this.mtrLineAcDifExp.est.capaF[2]['data'].push([new Date().getTime(),this.getEstC3()[0]]);
		
		this.mtrLineAcDifExp.est.fuel[0]['data'].push([new Date().getTime(),this.getEstA4()[0]]);
		this.mtrLineAcDifExp.est.fuel[1]['data'].push([new Date().getTime(),this.getEstB4()[0]]);
		this.mtrLineAcDifExp.est.fuel[2]['data'].push([new Date().getTime(),this.getEstC4()[0]]);

		if(this.mtrLineAcDifExp.overview.power[0]['data'].length > 20){
			this.mtrLineAcDifExp.overview.power[0]['data'].shift();
			this.mtrLineAcDifExp.overview.power[1]['data'].shift();
			this.mtrLineAcDifExp.overview.power[2]['data'].shift();
			
			this.mtrLineAcDifExp.overview.heatR[0]['data'].shift();
			this.mtrLineAcDifExp.overview.heatR[1]['data'].shift();
			this.mtrLineAcDifExp.overview.heatR[2]['data'].shift();
			
			this.mtrLineAcDifExp.overview.capaF[0]['data'].shift();
			this.mtrLineAcDifExp.overview.capaF[1]['data'].shift();
			this.mtrLineAcDifExp.overview.capaF[2]['data'].shift();
			
			this.mtrLineAcDifExp.overview.fuel[0]['data'].shift();
			this.mtrLineAcDifExp.overview.fuel[1]['data'].shift();
			this.mtrLineAcDifExp.overview.fuel[2]['data'].shift();

			
			this.mtrLineAcDifExp.eat.power[0]['data'].shift();
			this.mtrLineAcDifExp.eat.power[1]['data'].shift();
			this.mtrLineAcDifExp.eat.power[2]['data'].shift();
			
			this.mtrLineAcDifExp.eat.heatR[0]['data'].shift();
			this.mtrLineAcDifExp.eat.heatR[1]['data'].shift();
			this.mtrLineAcDifExp.eat.heatR[2]['data'].shift();
			
			this.mtrLineAcDifExp.eat.capaF[0]['data'].shift();
			this.mtrLineAcDifExp.eat.capaF[1]['data'].shift();
			this.mtrLineAcDifExp.eat.capaF[2]['data'].shift();
			
			this.mtrLineAcDifExp.eat.fuel[0]['data'].shift();
			this.mtrLineAcDifExp.eat.fuel[1]['data'].shift();
			this.mtrLineAcDifExp.eat.fuel[2]['data'].shift();

			
			this.mtrLineAcDifExp.est.power[0]['data'].shift();
			this.mtrLineAcDifExp.est.power[1]['data'].shift();
			this.mtrLineAcDifExp.est.power[2]['data'].shift();
			
			this.mtrLineAcDifExp.est.heatR[0]['data'].shift();
			this.mtrLineAcDifExp.est.heatR[1]['data'].shift();
			this.mtrLineAcDifExp.est.heatR[2]['data'].shift();
			
			this.mtrLineAcDifExp.est.capaF[0]['data'].shift();
			this.mtrLineAcDifExp.est.capaF[1]['data'].shift();
			this.mtrLineAcDifExp.est.capaF[2]['data'].shift();
			
			this.mtrLineAcDifExp.est.fuel[0]['data'].shift();
			this.mtrLineAcDifExp.est.fuel[1]['data'].shift();
			this.mtrLineAcDifExp.est.fuel[2]['data'].shift();
		}
	}
	updateChartDif(){
		switch (this.showOveLine) {
			case 1:
				this.chartLineOve1C.setTitle({text: "Power Output"});
				/*
				this.chartLineOve1C.series[0].setData(this.mtrLineAcDifExp.overview.power[0]['data']);
				this.chartLineOve1C.series[1].setData(this.mtrLineAcDifExp.overview.power[1]['data']);
				this.chartLineOve1C.series[2].setData(this.mtrLineAcDifExp.overview.power[2]['data']);
				//*/
				this.monitoringTrService.getStreamsetsInterpolatedLastHours('1',['P0uQAgHoBd0ku7P3cWOJL6IgJiUAAAU0VSVklET1JfUElcREFBMDgyMDY'],8760)
				.subscribe(
					data => {						
						this.monitoringTrService.getStreamsetsInterpolatedLastHours('2',['F1DP4rhZAwFMREKDf7s8vylUqg1gMAAAUElUVlxULkNFQS4yMjYz'],8760)
						.subscribe(
							dataSol => {
								let valuesAguila = ( ! data.data[0]['error_response'] ) ? data.data[0]['Items'][0]['Items'].map((item)=>[new Date(item['Timestamp']).getTime(), item.Value.Value]) : [];						
								let valuesSol    = ( ! dataSol.data[0]['error_response'] ) ? dataSol.data[0]['Items'][0]['Items'].map((item)=>[new Date(item['Timestamp']).getTime(), item.Value.Value]) : [];						
								let values = []
								for (let i = 0; i < valuesAguila.length; i++) {
									const elementA = valuesAguila[i];
									const elementS = valuesSol[i];
									values.push([elementA[0],(elementA[1]+elementS[1])]);
								}
								this.chartLineOve1C.series[0].setData(values);

							},
							errorData => {
							}
						);
					},
					errorData => {
					}
				);
				break;
			case 2:
				this.chartLineOve1C.setTitle({text: "Heat Rate"});
				/*
				this.chartLineOve1C.series[0].setData(this.mtrLineAcDifExp.overview.heatR[0]['data']);
				this.chartLineOve1C.series[1].setData(this.mtrLineAcDifExp.overview.heatR[1]['data']);
				this.chartLineOve1C.series[2].setData(this.mtrLineAcDifExp.overview.heatR[2]['data']);
				//*/
				
				this.monitoringTrService.getStreamsetsInterpolatedLastHours('1',['P0uQAgHoBd0ku7P3cWOJL6IgGCUAAAU0VSVklET1JfUElcREFBMDgxMDM'],8760)
				.subscribe(
					data => {						
						this.monitoringTrService.getStreamsetsInterpolatedLastHours('2',['F1DP4rhZAwFMREKDf7s8vylUqg2wMAAAUElUVlxULkNFQS4yMjY4'],8760)
						.subscribe(
							dataSol => {
								let valuesAguila = ( ! data.data[0]['error_response'] ) ? data.data[0]['Items'][0]['Items'].map((item)=>[new Date(item['Timestamp']).getTime(), item.Value.Value]) : [];						
								let valuesSol    = ( ! dataSol.data[0]['error_response'] ) ? dataSol.data[0]['Items'][0]['Items'].map((item)=>[new Date(item['Timestamp']).getTime(), item.Value.Value]) : [];						
								let values = []
								for (let i = 0; i < valuesAguila.length; i++) {
									const elementA = valuesAguila[i];
									const elementS = valuesSol[i];
									values.push([elementA[0],(elementA[1]+elementS[1])/2]);
								}
								this.chartLineOve1C.series[0].setData(values);

							},
							errorData => {
							}
						);
					},
					errorData => {
					}
				);
				break;
			case 3:
				
				this.chartLineOve1C.setTitle({text: "Capacity Factor"});
				/*this.chartLineOve1C.series[0].setData(this.mtrLineAcDifExp.overview.capaF[0]['data']);
				this.chartLineOve1C.series[1].setData(this.mtrLineAcDifExp.overview.capaF[1]['data']);
				this.chartLineOve1C.series[2].setData(this.mtrLineAcDifExp.overview.capaF[2]['data']);
				//*/
				
				this.monitoringTrService.getStreamsetsInterpolatedLastHours('1',['P0uQAgHoBd0ku7P3cWOJL6IgJiUAAAU0VSVklET1JfUElcREFBMDgyMDY'],8760)
				.subscribe(
					data => {						
						this.monitoringTrService.getStreamsetsInterpolatedLastHours('2',['F1DP4rhZAwFMREKDf7s8vylUqg1gMAAAUElUVlxULkNFQS4yMjYz'],8760)
						.subscribe(
							dataSol => {
								this.updatefactorCapFac();
								let valuesAguila = ( ! data.data[0]['error_response'] ) ? data.data[0]['Items'][0]['Items'].map((item)=>[new Date(item['Timestamp']).getTime(), item.Value.Value]) : [];						
								let valuesSol    = ( ! dataSol.data[0]['error_response'] ) ? dataSol.data[0]['Items'][0]['Items'].map((item)=>[new Date(item['Timestamp']).getTime(), item.Value.Value]) : [];						
								valuesAguila = valuesAguila.map((a)=>{
									let v=(a[1]/this.factorCapFactor)*100;if(v>100)v=100;
									return [a[0],v];
								});
								valuesSol = valuesSol.map((a)=>{
									let v=(a[1]/this.factorCapFactor)*100;if(v>100)v=100;
									return [a[0],v];
								});

								let values = []
								for (let i = 0; i < valuesAguila.length; i++) {
									const elementA = valuesAguila[i];
									const elementS = valuesSol[i];
									values.push([elementA[0],(elementA[1]+elementS[1])/2]);
								}
								
						

								this.chartLineOve1C.series[0].setData(values);

							},
							errorData => {
							}
						);
					},
					errorData => {
					}
				);
				break;
			case 4:
				/*
				this.chartLineOve1C.setTitle({text: "Fuel Gain / lost"});
				this.chartLineOve1C.series[0].setData(this.mtrLineAcDifExp.overview.fuel[0]['data']);
				this.chartLineOve1C.series[1].setData(this.mtrLineAcDifExp.overview.fuel[1]['data']);
				this.chartLineOve1C.series[2].setData(this.mtrLineAcDifExp.overview.fuel[2]['data']);
				//*/
				break;
		}
		
		switch (this.showEatLine) {
			case 1:
				this.chartLineEat1C.setTitle({text: "Power Output"});
				
				this.monitoringTrService.getStreamsetsInterpolatedLastHours('1',['P0uQAgHoBd0ku7P3cWOJL6IgJiUAAAU0VSVklET1JfUElcREFBMDgyMDY'],8760)
				.subscribe(
					data => {
						let values = ( ! data.data[0]['error_response'] ) ? data.data[0]['Items'][0]['Items'].map((item)=>[new Date(item['Timestamp']).getTime(), item.Value.Value]) : [];						
						this.chartLineEat1C.series[0].setData(values);
					},
					errorData => {
					}
				);
				break;
			case 2:
				this.chartLineEat1C.setTitle({text: "Heat Rate"});
				/*this.chartLineEat1C.series[0].setData(this.mtrLineAcDifExp.eat.heatR[0]['data']);
				this.chartLineEat1C.series[1].setData(this.mtrLineAcDifExp.eat.heatR[1]['data']);
				this.chartLineEat1C.series[2].setData(this.mtrLineAcDifExp.eat.heatR[2]['data']);
				//*/
				this.monitoringTrService.getStreamsetsInterpolatedLastHours('1',['P0uQAgHoBd0ku7P3cWOJL6IgGCUAAAU0VSVklET1JfUElcREFBMDgxMDM'],8760)
				.subscribe(
					data => {
						let values = ( ! data.data[0]['error_response'] ) ? data.data[0]['Items'][0]['Items'].map((item)=>[new Date(item['Timestamp']).getTime(), item.Value.Value]) : [];						
						this.chartLineEat1C.series[0].setData(values);
					},
					errorData => {
					}
				);
				break;
			case 3:				
				this.chartLineEat1C.setTitle({text: "Capacity Factor"});
				/*this.chartLineEat1C.series[0].setData(this.mtrLineAcDifExp.eat.capaF[0]['data']);
				this.chartLineEat1C.series[1].setData(this.mtrLineAcDifExp.eat.capaF[1]['data']);
				this.chartLineEat1C.series[2].setData(this.mtrLineAcDifExp.eat.capaF[2]['data']);
				//*/
				
				this.monitoringTrService.getStreamsetsInterpolatedLastHours('1',['P0uQAgHoBd0ku7P3cWOJL6IgJiUAAAU0VSVklET1JfUElcREFBMDgyMDY'],8760)
				.subscribe(
					data => {
						this.updatefactorCapFac();
						let values = ( ! data.data[0]['error_response'] ) ? data.data[0]['Items'][0]['Items'].map((item)=>[new Date(item['Timestamp']).getTime(), item.Value.Value]) : [];
						values = values.map((a)=>{
							let v=(a[1]/this.factorCapFactor)*100;if(v>100)v=100;
							return [a[0],v];
						});
						this.chartLineEat1C.series[0].setData(values);
					},
					errorData => {
					}
				);
				break;
			case 4:
				/*
				this.chartLineEat1C.setTitle({text: "Fuel Gain / lost"});
				this.chartLineEat1C.series[0].setData(this.mtrLineAcDifExp.eat.fuel[0]['data']);
				this.chartLineEat1C.series[1].setData(this.mtrLineAcDifExp.eat.fuel[1]['data']);
				this.chartLineEat1C.series[2].setData(this.mtrLineAcDifExp.eat.fuel[2]['data']);
				//*/
				break;
		}
		
		switch (this.showEstLine) {
			case 1:
				this.chartLineEst1C.setTitle({text: "Power Output"});
				/*this.chartLineEst1C.series[0].setData(this.mtrLineAcDifExp.est.power[0]['data']);
				this.chartLineEst1C.series[1].setData(this.mtrLineAcDifExp.est.power[1]['data']);
				this.chartLineEst1C.series[2].setData(this.mtrLineAcDifExp.est.power[2]['data']);
				//*/
				
				this.monitoringTrService.getStreamsetsInterpolatedLastHours('2',['F1DP4rhZAwFMREKDf7s8vylUqg1gMAAAUElUVlxULkNFQS4yMjYz'],8760)
				.subscribe(
					data => {
						let values = ( ! data.data[0]['error_response'] ) ? data.data[0]['Items'][0]['Items'].map((item)=>[new Date(item['Timestamp']).getTime(), item.Value.Value]) : [];						
						this.chartLineEst1C.series[0].setData(values);
					},
					errorData => {
					}
				);

				break;
			case 2:
				this.chartLineEst1C.setTitle({text: "Heat Rate"});
				/*this.chartLineEst1C.series[0].setData(this.mtrLineAcDifExp.est.heatR[0]['data']);
				this.chartLineEst1C.series[1].setData(this.mtrLineAcDifExp.est.heatR[1]['data']);
				this.chartLineEst1C.series[2].setData(this.mtrLineAcDifExp.est.heatR[2]['data']);
				//*/
				
				this.monitoringTrService.getStreamsetsInterpolatedLastHours('2',['F1DP4rhZAwFMREKDf7s8vylUqg2wMAAAUElUVlxULkNFQS4yMjY4'],8760)
				.subscribe(
					data => {
						let values = ( ! data.data[0]['error_response'] ) ? data.data[0]['Items'][0]['Items'].map((item)=>[new Date(item['Timestamp']).getTime(), item.Value.Value]) : [];						
						this.chartLineEst1C.series[0].setData(values);
					},
					errorData => {
					}
				);
				break;
			case 3:
				
				this.chartLineEst1C.setTitle({text: "Capacity Factor"});
				/*this.chartLineEst1C.series[0].setData(this.mtrLineAcDifExp.est.capaF[0]['data']);
				this.chartLineEst1C.series[1].setData(this.mtrLineAcDifExp.est.capaF[1]['data']);
				this.chartLineEst1C.series[2].setData(this.mtrLineAcDifExp.est.capaF[2]['data']);
				//*/
				
				this.monitoringTrService.getStreamsetsInterpolatedLastHours('2',['F1DP4rhZAwFMREKDf7s8vylUqg1gMAAAUElUVlxULkNFQS4yMjYz'],8760)
				.subscribe(
					data => {
						this.updatefactorCapFac();
						let values = ( ! data.data[0]['error_response'] ) ? data.data[0]['Items'][0]['Items'].map((item)=>[new Date(item['Timestamp']).getTime(), item.Value.Value]) : [];
						values = values.map((a)=>{
							let v=(a[1]/this.factorCapFactor)*100;if(v>100)v=100;
							return [a[0],v];
						});
						this.chartLineEst1C.series[0].setData(values);
					},
					errorData => {
					}
				);
				break;
			case 4:
				/*
				this.chartLineEst1C.setTitle({text: "Fuel Gain / lost"});
				this.chartLineEst1C.series[0].setData(this.mtrLineAcDifExp.est.fuel[0]['data']);
				this.chartLineEst1C.series[1].setData(this.mtrLineAcDifExp.est.fuel[1]['data']);
				this.chartLineEst1C.series[2].setData(this.mtrLineAcDifExp.est.fuel[2]['data']);
				//*/
				break;
		}
	}
	showOve(n){
		this.showOveLine = n;
		this.updateChartDif();
	}
	showEat(n){
		this.showEatLine = n;
		this.updateChartDif();
	}
	showEst(n){
		this.showEstLine = n;
		this.updateChartDif();
	}

	//setOveA1(){let v=(this.getEatA1()[0]+this.getEstA1()[0]);this.mtr.overview[0]=[v,(this.maxPow*2)-v]}
	setOveA1(x){
		let v=x;
		this.mtr.overview[0]=[v,(this.maxPow*2)-v];		
	}
	//setOveA2(){let a=this.getEatA2();let s=this.getEstA2();let ove0=(a[0]+s[0])/2;this.mtr.overview[3]=[ove0,this.maxHR-ove0]}
	setOveA2PorFormula(){
		let a=this.getEatA2();
		let s=this.getEstA2();
		let ove0=(a[0]+s[0])/2;
		this.oveA2PorFormula=ove0;
	}
	setOveA2(x){this.mtr.overview[3]=[x,this.maxHR-x];
		let a=this.getEatA2();
		let s=this.getEstA2();
		let ss=this.getEstC2();//LGS.CEA.71 ss[0]
		let ove0=(a[0]+s[0])/2;
		let namePag = "OveA2-"+this.getTagName("setOveA2");
		let tagName = this.getTagName("setOveA2");
		if(!this.mapBookExcel.has(namePag))this.mapBookExcel.set(namePag,[]);
		if(this.mapBookExcel.get(namePag).length > 10000 )this.mapBookExcel.get(namePag).shift();
		let sss = (a[0]+ss[0])/2;
		this.mapBookExcel.get(namePag).push(
			{	
				tag:tagName,
				date: this.datePipe.transform(new Date(), 'HH:mm:ss'),
				"EAT HR ACTUAL 5seg (DAA08103)":a[0],
				"EST HR ACTUAL 5 min (T.CEA.2268)":s[0],
				"Formula Manual HR ACTUAL TOTAL (eat+est/2)":ove0,
				"HR ACTUAL TOTAL 5min (T.CEA.2279)":x,
				"Diferencias":ove0-x,
				"-----":"||||",
				"EAT HR ACTUAL 5seg(DAA08103)":a[0],
				"EST HR ACTUAL 5 min(LGS.CEA.71)":ss[0],
				"Formula Manual HR ACTUAL TOTAL((I+J)/2)":sss,
				"HR ACTUAL TOTAL 5min(T.CEA.2279)":x,
				"Diferencias(AF-AH)":(ss[0]-sss)

			}
		);
		/*this.mapBookExcel.get(namePag).push(
			{	
				tag:tagName,
				date: this.datePipe.transform(new Date(), 'HH:mm:ss'),
				formula:`(EatA2(DAA08103) + EstA2(T.CEA.2268) / 2)`,
				"DAA08103":a[0],
				"T.CEA.2268":s[0],
				"resultado usando T.CEA.2268":ove0,
				porTag:x,
				diferencia_Tag_Menos_Formula:x-ove0
			}
		);//*/
		
	}
	//setOveA3(){let a=this.getEatA3();let s=this.getEstA3();let ove0=(a[0]+s[0])/2;this.mtr.overview[6]=[ove0,this.maxCaF-ove0]}
	setOveA3(x){this.mtr.overview[6]=[x,this.maxCaF-x]}
	setOveA4(){let v=(this.getEatA4()[0]+this.getEstA4()[0]);this.mtr.overview[9]=[v,(this.maxFue*2)-v]}
	setOveB1(){let v=(this.getOveA1()[0]-this.getOveC1()[0]);this.mtr.overview[1]=[v,(this.maxPow*2)-v];}
	setOveB2(){let v=(this.getOveC2()[0]-this.getOveA2()[0]);this.mtr.overview[4]=[v,this.maxHR-v];}
	setOveB3(){let v=(this.getOveA3()[0]-this.getOveC3()[0]);this.mtr.overview[7]=[v,this.maxCaF-v];}
	setOveB4(){let v=(this.getOveA4()[0]-this.getOveC4()[0]);this.mtr.overview[10]=[v,(this.maxFue*2)-v];}
	setOveC1(){let a=this.getEatC1();let s=this.getEstC1();let ove0=a[0]+s[0];let ove1=a[1]+s[1];this.mtr.overview[2]=[ove0,(this.maxPow*2)-ove0]}
	//setOveC2(){let a=this.getEatC2();let s=this.getEstC2();let ove0=(a[0]+s[0])/2;let ove1=(a[1]+s[1])/2;this.mtr.overview[5]=[ove0,this.maxHR-ove0]}
	setOveC2PorFormula(){let a=this.getEatC2();let s=this.getEstC2();let ove0=(a[0]+s[0])/2;this.oveC2PorFormula=ove0}
	setOveC2(x){
		//DAA08113
		this.mtr.overview[5]=[x,this.maxHR-x];

		let a=this.getEatC2();
		let s=this.getEstC2();//LGS.CEA.71 s[0]
		
		let sA2=this.getEstA2();
		let ove0=(a[0]+s[0])/2;		
		let resultadoCambiandoEltagAl2268 = (a[0]+sA2[0])/2;	
		this.mtr.overview[5]=[ove0,this.maxHR-ove0]

		let namePag = "OveC2-"+this.getTagName("setOveC2");
		let tagName = this.getTagName("setOveC2");
		if(!this.mapBookExcel.has(namePag))this.mapBookExcel.set(namePag,[]);
		if(this.mapBookExcel.get(namePag).length > 10000 )this.mapBookExcel.get(namePag).shift();
		this.mapBookExcel.get(namePag).push(
			{	
				tag:tagName,
				date: this.datePipe.transform(new Date(), 'HH:mm:ss'),
				"EAT HR EXPECTED 5seg (DAA08104)":a[0],
				"EST HR EXPECTEDL 5 min (LGS.CEA.71)":s[0],
				"Formula Manual HR ACTUAL TOTAL (eat+est/2)":ove0,
				"HR EXPECTED TOTAL 5min (DAA08113)":x,
				"Diferencias (E-F)":ove0-x,
				"-----":"||||",
				"EAT HR EXPECTED 5seg(DAA08104)":a[0],
				"EST HR EXPECTEDL 5 min(T.CEA.2268)":sA2[0],
				"Formula Manual HR ACTUAL TOTAL((X+Y)/2)":resultadoCambiandoEltagAl2268,
				"HR EXPECTED TOTAL 5min(DAA08113)":x,
				"Diferencias(K-L)":resultadoCambiandoEltagAl2268-x,
			}
		);
		/*this.mapBookExcel.get(namePag).push(
			{	
				tag:tagName,
				date: this.datePipe.transform(new Date(), 'HH:mm:ss'),
				formula:`(EatC2 (DAA08104) + EstC2(LGS.CEA.71) / 2)`,
				DAA08104: a[0],
				"LGS.CEA.71": s[0],
				"T.CEA.2268": sA2[0],
				"resultado usando T.CEA.2268":resultadoCambiandoEltagAl2268,
				"resultado usando LGS.CEA.71":ove0,
				porTag:x,
				diferencia_Tag_Menos_Formula:x-ove0
			}
		);
		//*/
		/*
		console.log("(Expected)Total Heat Rate");
		console.log("OveC2 (DAA08113) = (DAA08104 + LGS.CEA.71)/2");
		console.log(`desdePI = (${x})   ,   desdeIcollab ( (${a[0]} + ${s[0]})/2 ) = ${ove0}`);
		//*/
	}
	setOveC3(){let a=this.getEatC3();let s=this.getEstC3();let ove0=(a[0]+s[0])/2;let ove1=(a[1]+s[1])/2;this.mtr.overview[8]=[ove0,this.maxCaF-ove0]}
	setOveC4(){let a=this.getEatC4();let s=this.getEstC4();let ove0=a[0]+s[0];let ove1=a[1]+s[1];this.mtr.overview[11]=[ove0,(this.maxFue*2)-ove0]}

	setEatA1(x){this.mtr.eat[0]=[x,this.maxPow-x];}
	setEatA2(x){this.mtr.eat[3]=[x,this.maxHR-x];}
	//setEatA3( ){this.updatefactorCapFac();let a=this.getEatA1();let v=(a[0]/this.factorCapFactor)*100;if(v>100)v=100;this.mtr.eat[6]=[v,this.maxCaF-v];}
	setEatA3(x){let v=x;if(v>100)v=100;this.mtr.eat[6]=[v,this.maxCaF-v];}
	setEatA4( ){let heatRateCor=this.getEatC2()[0];let heatRate=this.getEatA2()[0];let v=(((heatRateCor-heatRate)*0.00004596)/20.03);this.mtr.eat[9]=[v,this.maxFue-v];}
	setEatB1( ){let v=(this.getEatA1()[0]-this.getEatC1()[0]);this.mtr.eat[1]=[v,this.maxPow-v];}
	setEatB2( ){let v=(this.getEatC2()[0]-this.getEatA2()[0]);this.mtr.eat[4]=[v,this.maxHR-v];}
	setEatB3( ){let v=(this.getEatA3()[0]-this.getEatC3()[0]);this.mtr.eat[7]=[v,this.maxCaF-v];}
	setEatB4( ){let v=(this.getEatA4()[0]-this.getEatC4()[0]);this.mtr.eat[10]=[v,this.maxFue-v];}
	setEatC1( ){this.mtr.eat[2]=[this.factorExpEatPow ,this.maxPow-this.factorExpEatPow];}
	setEatC2(x){this.mtr.eat[5]=[x,this.maxHR-x];this.eatHRCorregido=x;}
	setEatC3( ){this.mtr.eat[8]=[this.factorExpEatCF ,this.maxCaF-this.factorExpEatCF];}
	setEatC4( ){this.mtr.eat[11]=[this.factorExpEatFuel,this.maxFue-this.factorExpEatFuel];}

	setEstA1(x){this.mtr.est[0]=[x,this.maxPow-x];}
	setEstA2(x){this.mtr.est[3]=[x,this.maxHR-x];}
	//setEstA3( ){this.updatefactorCapFac();let a=this.getEstA1();let v=(a[0]/this.factorCapFactor)*100;if(v>100)v=100;this.mtr.est[6]=[v,this.maxCaF-v];}
	setEstA3(x){let v=x;if(v>100)v=100;this.mtr.est[6]=[v,this.maxCaF-v];}
	setEstA4( ){let heatRateCor=this.getEstC2()[0];let heatRate=this.getEstA2()[0];let v=(((heatRateCor-heatRate)*0.00004764)/20.03);this.mtr.eat[9]=[v,this.maxFue-v];}
	setEstB1( ){let v=(this.getEstA1()[0]-this.getEstC1()[0]);this.mtr.est[1]=[v,this.maxPow-v];}
	setEstB2( ){let v=(this.getEstC2()[0]-this.getEstA2()[0]);this.mtr.est[4]=[v,this.maxHR-v];}
	setEstB3( ){let v=(this.getEstA3()[0]-this.getEstC3()[0]);this.mtr.est[7]=[v,this.maxCaF-v];}
	setEstB4( ){let v=(this.getEstA4()[0]-this.getEstC4()[0]);this.mtr.est[10]=[v,this.maxFue-v];}
	setEstC1( ){this.mtr.est[2]=[this.factorExpEstPow ,this.maxPow-this.factorExpEstPow];}
	setEstC2(x){this.mtr.est[5]=[x,this.maxHR-x];this.estHRCorregido=x;}
	setEstC3( ){this.mtr.est[8]=[this.factorExpEstCF ,this.maxCaF-this.factorExpEstCF];}
	setEstC4( ){this.mtr.est[11]=[this.factorExpEstFuel,this.maxFue-this.factorExpEstFuel];}

	getOveA1():Array<number>{return this.mtr.overview[0]; }
	getOveA2():Array<number>{return this.mtr.overview[3]; }
	getOveA3():Array<number>{return this.mtr.overview[6]; }
	getOveA4():Array<number>{return this.mtr.overview[9]; }
	getOveB1():Array<number>{return this.mtr.overview[1]; }
	getOveB2():Array<number>{return this.mtr.overview[4]; }
	getOveB3():Array<number>{return this.mtr.overview[7]; }
	getOveB4():Array<number>{return this.mtr.overview[10];}
	getOveC1():Array<number>{return this.mtr.overview[2]; }
	getOveC2():Array<number>{return this.mtr.overview[5]; }
	getOveC3():Array<number>{return this.mtr.overview[8]; }
	getOveC4():Array<number>{return this.mtr.overview[11];}

	getEatA1():Array<number>{return this.mtr.eat[0]; }
	getEatA2():Array<number>{return this.mtr.eat[3]; }
	getEatA3():Array<number>{return this.mtr.eat[6]; }
	getEatA4():Array<number>{return this.mtr.eat[9]; }
	getEatB1():Array<number>{return this.mtr.eat[1]; }
	getEatB2():Array<number>{return this.mtr.eat[4]; }
	getEatB3():Array<number>{return this.mtr.eat[7]; }
	getEatB4():Array<number>{return this.mtr.eat[10];}
	getEatC1():Array<number>{return this.mtr.eat[2]; }
	getEatC2():Array<number>{return this.mtr.eat[5]; }
	getEatC3():Array<number>{return this.mtr.eat[8]; }
	getEatC4():Array<number>{return this.mtr.eat[11];}

	getEstA1():Array<number>{return this.mtr.est[0]; }
	getEstA2():Array<number>{return this.mtr.est[3]; }
	getEstA3():Array<number>{return this.mtr.est[6]; }
	getEstA4():Array<number>{return this.mtr.est[9]; }
	getEstB1():Array<number>{return this.mtr.est[1]; }
	getEstB2():Array<number>{return this.mtr.est[4]; }
	getEstB3():Array<number>{return this.mtr.est[7]; }
	getEstB4():Array<number>{return this.mtr.est[10];}
	getEstC1():Array<number>{return this.mtr.est[2]; }
	getEstC2():Array<number>{return this.mtr.est[5]; }
	getEstC3():Array<number>{return this.mtr.est[8]; }
	getEstC4():Array<number>{return this.mtr.est[11];}

	
	setEatHRCorregido(x){this.eatHRCorregido=x;}
	setEstHRCorregido(x){this.estHRCorregido=x;}
	setCTUnoDiesel(x){this.CTUnoDiesel=x;}
	setCTDosDiesel(x){this.CTDosDiesel=x;}

	getEatHRCorregido(){ return this.eatHRCorregido;}
	getEstHRCorregido(){ return this.estHRCorregido;}
	getCTUnoDiesel(){ return this.CTUnoDiesel;}
	getCTDosDiesel(){ return this.CTDosDiesel;}
	updatefactorCapFac(){this.factorCapFactor = (this.CTUnoDiesel > 4 && this.CTDosDiesel > 4)?405:495;}
	/*
	getDiesel(){this.viewDiesel = ((this.CTUnoDiesel+this.CTDosDiesel)*100)   /  (this.maxDiese1+this.maxDiese2)  ;}
	getDieselRadialGauge(){

		this.getDiesel();
		let v = (40*this.viewDiesel)/100;		
		this.viewDieselRadialGauge = 80+(120-(80+v));
	}//*/
	demo(){
		this.viewDiesel += 10;		
		let v = (40*this.viewDiesel)/100;		
		this.viewDieselRadialGauge = 80+(120-(80+v));
	}


		private addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1, 
		  new EventBlocked(type, msg)));
	}
}
