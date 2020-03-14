import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { EventService                        } from "src/app/core/services/event.service";
import { GlobalService                       } from "src/app/core/globals/global.service";
import { ThemeService                        } from "src/app/core/globals/theme";
import { SocketService                       } from 'src/app/core/services/socket.service';
import { ConnectSocketChannelComponent       } from 'src/app/shared/socket/connectSocketChannel.component';
import { SecurityService                     } from 'src/app/core/services/security.service';
import { MonitoringTrService                 } from 'src/app/monitoring/services/monitoringTr.service';
import * as TAGS                               from 'src/app/monitoring/boards/phase2/config';

import { RadialGauge } from 'ng-canvas-gauges';
import * as algo from './algo.json';


import { Chart                           } from 'chart.js';

/* Highcharts */
import * as Highcharts from 'highcharts';
import HC_exporting    from 'highcharts/modules/exporting';
import HC_stock        from 'highcharts/modules/stock';
import HC_customEvents from 'highcharts-custom-events';
import HC_exportdata   from 'highcharts/modules/export-data';
import Highcharts3d    from 'highcharts/highcharts-3d';
//import theme           from 'highcharts/themes/gray';
import theme           from 'highcharts/themes/gray.src';




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


	CTUnoDiesel;
	CTDosDiesel;

	maxPow = 590;
	maxHR  = 14000;
	maxHRC = 14000;
	maxRT1 = 50000;
	maxRT2 = 50000;
	maxCaF = 100;
	maxFue = 1;

	mtr = {
		overview:[
			/*Power OutPut*/ [0 ,this.maxPow*2]  ,[0,0],  [0 ,this.maxPow*2],
			/*heat Rate*/    [0 ,this.maxHR *2]  ,[0,0],  [0 ,this.maxHR *2],
			/*Capacity Fac*/ [0 ,this.maxCaF*2]  ,[0,0],  [0 ,this.maxCaF*2],
			/*Fuel G/L*/     [0 ,this.maxFue*2]  ,[0,0],  [0 ,this.maxFue*2]
		],
		eat:[
			/*Power OutPut*/ [0 ,this.maxPow]  ,[0,0],  [440.55 ,this.maxPow],
			/*heat Rate*/    [0 ,this.maxHR ]  ,[0,0],  [0 ,this.maxHR],
			/*Capacity Fac*/ [0 ,this.maxCaF]  ,[0,0],  [89 ,this.maxCaF],
			/*Fuel G/L*/     [0 ,this.maxFue]  ,[0,0],  [0 ,this.maxFue]
		],
		est:[
			/*Power OutPut*/ [0 ,this.maxPow]  ,[0,0],  [455.4 ,this.maxPow],
			/*heat Rate*/    [0 ,this.maxHR ]  ,[0,0],  [0 ,this.maxHR],
			/*Capacity Fac*/ [0 ,this.maxCaF]  ,[0,0],  [92 ,this.maxCaF],
			/*Fuel G/L*/     [0 ,this.maxFue]  ,[0,0],  [0 ,this.maxFue]
		]
	};
	wids=[
		['P0uQAgHoBd0ku7P3cWOJL6IgJiUAAAU0VSVklET1JfUElcREFBMDgyMDY' ,0 ,'eat_power' ,"this.mtr.eat[0][0]"],
		['P0uQAgHoBd0ku7P3cWOJL6IgGCUAAAU0VSVklET1JfUElcREFBMDgxMDM' ,0 ,'eat_heatR' ,"this.mtr.eat[3][0]"],
		['P0uQAgHoBd0ku7P3cWOJL6IgGSUAAAU0VSVklET1JfUElcREFBMDgxMDQ' ,0 ,'eat_heatRC',"this.mtr.eat[5][0]"],

		['F1DP4rhZAwFMREKDf7s8vylUqg1gMAAAUElUVlxULkNFQS4yMjYz'      ,0 ,'est_power' ,"this.mtr.est[0][0]"],
		['F1DP4rhZAwFMREKDf7s8vylUqg2wMAAAUElUVlxULkNFQS4yMjY4'      ,0 ,'est_heatR' ,"this.mtr.est[3][0]"],
		['F1DP4rhZAwFMREKDf7s8vylUqgJA0AAAUElUVlxMR1MuQ0VBLjcx'      ,0 ,'est_heatRC',"this.mtr.est[5][0]"],

		['P0uQAgHoBd0ku7P3cWOJL6IgnSIAAAU0VSVklET1JfUElcRzFBMDgwOTc' ,0 ,'CTUnoDiesel',"this.CTUnoDiesel"],
		['P0uQAgHoBd0ku7P3cWOJL6IgLCAAAAU0VSVklET1JfUElcRzJBMDgwOTc' ,0 ,'CTDosDiesel',"this.CTDosDiesel"],
	];
	
	public opt :any={
		time: {
			timezone: 'America/Mexico_City',
			useUTC: false
		},
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
			name: '',
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
	
	valueGas=100;
	
    constructor(
        public globalService       : GlobalService,
        public eventService        : EventService,
        public socketService       : SocketService,
		public securityService     : SecurityService,
		public monitoringTrService  : MonitoringTrService
    ) {
        super(globalService, eventService, socketService,securityService);
    }

	ngOnDestroy(){

	}
	ngOnInit() {
		this.initChart();
		//this.getStreamsetsInterpolatedLast24HoursSol();
		//this.getStreamsetsInterpolatedLast24HoursAguila();
		//this.subscribeSocketChannel("pi-servers"    ,(data)=>{this.socketFlow(data);}  ,()=>{this.socketReconnected();}  ,()=>{this.socketDisconnected();});
		//this.subscribeSocketChannel("back-pi-isrun" ,(data)=>{this.socketFlow(data);}  ,()=>{this.socketReconnected();}  ,()=>{this.socketDisconnected();});


		


		


	}
	socketFlow(data){
		for (const plant of data.data) {
			for (const tag of plant.Items) {
				for (const iterator of this.wids) {
					if(tag.WebId == iterator[0]){
						iterator[1]=tag.Value.Value;						
					}
				}
			}
		}
		this.setMtr();
		this.setChart();
	}
	socketReconnected(){

	}
	socketDisconnected(){

	}

	getStreamsetsInterpolatedLast24HoursAguila(){

		this.monitoringTrService.getStreamsetsInterpolatedLastHours('1',[TAGS.lstTags['PowerOutput']['aguila'][0]['WebId']],72)
			.subscribe(
				data => {
					let values = ( ! data.data[0]['error_response'] ) ? data.data[0]['Items'][0]['Items'].map((item)=>[new Date(item['Timestamp']).getTime(), item.Value.Value]) : [];
					this.opt.series[0]['data'] = values;
					this.opt.title.text        = TAGS.lstTags['PowerOutput']['label'];
					this.opt.subtitle.text     = data.data[0]['Items'][0]['Name'];
					Highcharts.stockChart('container2', this.opt);
		
				},
				errorData => {
				//this.toastr.errorToastr(Constants.ERROR_LOAD, 'Clima actual');
				}
			);
	}
	getStreamsetsInterpolatedLast24HoursSol(){

		this.monitoringTrService.getStreamsetsInterpolatedLastHours('2',[TAGS.lstTags['PowerOutput']['sol'][0]['WebId']],72)
			.subscribe(
				data => {
					let values = ( ! data.data[0]['error_response'] ) ? data.data[0]['Items'][0]['Items'].map((item)=>[new Date(item['Timestamp']).getTime(), item.Value.Value]) : [];
					this.opt.series[0]['data'] = values;
					this.opt.title.text        = TAGS.lstTags['PowerOutput']['label'];
					this.opt.subtitle.text     = data.data[0]['Items'][0]['Name'];
					Highcharts.stockChart('container3', this.opt);
		
				},
				errorData => {
				//this.toastr.errorToastr(Constants.ERROR_LOAD, 'Clima actual');
				}
			);
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
		this.chartLineOve1C = Highcharts.stockChart(this.chartLineOve1.nativeElement, this.opt);
		this.chartLineEat1C = Highcharts.stockChart(this.chartLineEat1.nativeElement, this.opt);
		this.chartLineEat2C = Highcharts.stockChart(this.chartLineEat2.nativeElement, this.opt);
		this.chartLineEst1C = Highcharts.stockChart(this.chartLineEst1.nativeElement, this.opt);
		this.chartLineEst2C = Highcharts.stockChart(this.chartLineEst2.nativeElement, this.opt);

		let configDonught = this.returnConfigDonught();
		
		///*
		this.chartOveA1C = new Chart(this.chartOveA1.nativeElement,configDonught);
		this.chartOveA2C = new Chart(this.chartOveA2.nativeElement,configDonught);
		this.chartOveA3C = new Chart(this.chartOveA3.nativeElement,configDonught);
		this.chartOveA4C = new Chart(this.chartOveA4.nativeElement,configDonught);
		this.chartOveB1C = new Chart(this.chartOveB1.nativeElement,configDonught);
		this.chartOveB2C = new Chart(this.chartOveB2.nativeElement,configDonught);
		this.chartOveB3C = new Chart(this.chartOveB3.nativeElement,configDonught);
		this.chartOveB4C = new Chart(this.chartOveB4.nativeElement,configDonught);
		this.chartOveC1C = new Chart(this.chartOveC1.nativeElement,configDonught);
		this.chartOveC2C = new Chart(this.chartOveC2.nativeElement,configDonught);
		this.chartOveC3C = new Chart(this.chartOveC3.nativeElement,configDonught);
		this.chartOveC4C = new Chart(this.chartOveC4.nativeElement,configDonught);
		this.chartEatA1C = new Chart(this.chartEatA1.nativeElement,configDonught);
		this.chartEatA2C = new Chart(this.chartEatA2.nativeElement,configDonught);
		this.chartEatA3C = new Chart(this.chartEatA3.nativeElement,configDonught);
		this.chartEatA4C = new Chart(this.chartEatA4.nativeElement,configDonught);
		this.chartEatB1C = new Chart(this.chartEatB1.nativeElement,configDonught);
		this.chartEatB2C = new Chart(this.chartEatB2.nativeElement,configDonught);
		this.chartEatB3C = new Chart(this.chartEatB3.nativeElement,configDonught);
		this.chartEatB4C = new Chart(this.chartEatB4.nativeElement,configDonught);
		this.chartEatC1C = new Chart(this.chartEatC1.nativeElement,configDonught);
		this.chartEatC2C = new Chart(this.chartEatC2.nativeElement,configDonught);
		this.chartEatC3C = new Chart(this.chartEatC3.nativeElement,configDonught);
		this.chartEatC4C = new Chart(this.chartEatC4.nativeElement,configDonught);
		this.chartEstA1C = new Chart(this.chartEstA1.nativeElement,configDonught);
		this.chartEstA2C = new Chart(this.chartEstA2.nativeElement,configDonught);
		this.chartEstA3C = new Chart(this.chartEstA3.nativeElement,configDonught);
		this.chartEstA4C = new Chart(this.chartEstA4.nativeElement,configDonught);
		this.chartEstB1C = new Chart(this.chartEstB1.nativeElement,configDonught);
		this.chartEstB2C = new Chart(this.chartEstB2.nativeElement,configDonught);
		this.chartEstB3C = new Chart(this.chartEstB3.nativeElement,configDonught);
		this.chartEstB4C = new Chart(this.chartEstB4.nativeElement,configDonught);
		this.chartEstC1C = new Chart(this.chartEstC1.nativeElement,configDonught);
		this.chartEstC2C = new Chart(this.chartEstC2.nativeElement,configDonught);
		this.chartEstC3C = new Chart(this.chartEstC3.nativeElement,configDonught);
		this.chartEstC4C = new Chart(this.chartEstC4.nativeElement,configDonught);
		//*/
	}
	setChart(){
		this.setChartEstA1();
	}
	setChartEstA1(){
		this.chartEstA1C.data.datasets[0].data=this.getEstA1();
		this.chartEstA1C.update();
		
		this.chartEstA2C.data.datasets[0].data=this.getEstA2();
		this.chartEstA2C.update();
	}
	setMtr(){
		this.setOveA1();
		this.setOveA2();
		this.setOveA3();
		this.setOveA4();
		this.setOveB1();
		this.setOveB2();
		this.setOveB3();
		this.setOveB4();
		this.setOveC1();
		this.setOveC2();
		this.setOveC3();
		this.setOveC4();
		this.setEatA1();
		this.setEatA2();
		this.setEatA3();
		this.setEatA4();
		this.setEatB1();
		this.setEatB2();
		this.setEatB3();
		this.setEatB4();
		this.setEatC1();
		this.setEatC2();
		this.setEatC3();
		this.setEatC4();
		this.setEstA1();
		this.setEstA2();
		this.setEstA3();
		this.setEstA4();
		this.setEstB1();
		this.setEstB2();
		this.setEstB3();
		this.setEstB4();
		this.setEstC1();
		this.setEstC2();
		this.setEstC3();
		this.setEstC4();
	}
	setOveA1(){}
	setOveA2(){}
	setOveA3(){}
	setOveA4(){}
	setOveB1(){}
	setOveB2(){}
	setOveB3(){}
	setOveB4(){}
	setOveC1(){}
	setOveC2(){}
	setOveC3(){}
	setOveC4(){}
	setEatA1(){}
	setEatA2(){}
	setEatA3(){}
	setEatA4(){}
	setEatB1(){}
	setEatB2(){}
	setEatB3(){}
	setEatB4(){}
	setEatC1(){}
	setEatC2(){}
	setEatC3(){}
	setEatC4(){}
	setEstA1(){this.mtr.est[0][0] =  +this.wids[3][1];}
	setEstA2(){this.mtr.est[3][0] =  +this.wids[4][1];}
	setEstA3(){}
	setEstA4(){}
	setEstB1(){}
	setEstB2(){}
	setEstB3(){}
	setEstB4(){}
	setEstC1(){}
	setEstC2(){this.mtr.est[5][0] =  +this.wids[5][1];}
	setEstC3(){}
	setEstC4(){}

	getOveA1():Array<number>{return this.mtr.overview[0]; }
	getOveA2():Array<number>{return this.mtr.overview[3]; }
	getOveA3():Array<number>{return this.mtr.overview[6]; }
	getOveA4():Array<number>{return this.mtr.overview[9]; }
	getOveB1():Array<number>{return this.mtr.overview[1]; }
	getOveB2():Array<number>{return this.mtr.overview[4]; }
	getOveB3():Array<number>{return this.mtr.overview[7]; }
	getOveB4():Array<number>{return this.mtr.overview[10];}
	getOveC1():Array<number>{return this.mtr.overview[3]; }
	getOveC2():Array<number>{return this.mtr.overview[5]; }
	getOveC3():Array<number>{return this.mtr.overview[8]; }
	getOveC4():Array<number>{return this.mtr.overview[11];}
	getEatA1():Array<number>{return this.mtr.overview[0]; }
	getEatA2():Array<number>{return this.mtr.overview[3]; }
	getEatA3():Array<number>{return this.mtr.overview[6]; }
	getEatA4():Array<number>{return this.mtr.overview[9]; }
	getEatB1():Array<number>{return this.mtr.overview[1]; }
	getEatB2():Array<number>{return this.mtr.overview[4]; }
	getEatB3():Array<number>{return this.mtr.overview[7]; }
	getEatB4():Array<number>{return this.mtr.overview[10];}
	getEatC1():Array<number>{return this.mtr.overview[3]; }
	getEatC2():Array<number>{return this.mtr.overview[5]; }
	getEatC3():Array<number>{return this.mtr.overview[8]; }
	getEatC4():Array<number>{return this.mtr.overview[11];}
	getEstA1():Array<number>{return this.mtr.overview[0]; }
	getEstA2():Array<number>{return this.mtr.overview[3]; }
	getEstA3():Array<number>{return this.mtr.overview[6]; }
	getEstA4():Array<number>{return this.mtr.overview[9]; }
	getEstB1():Array<number>{return this.mtr.overview[1]; }
	getEstB2():Array<number>{return this.mtr.overview[4]; }
	getEstB3():Array<number>{return this.mtr.overview[7]; }
	getEstB4():Array<number>{return this.mtr.overview[10];}
	getEstC1():Array<number>{return this.mtr.overview[3]; }
	getEstC2():Array<number>{return this.mtr.overview[5]; }
	getEstC3():Array<number>{return this.mtr.overview[8]; }
	getEstC4():Array<number>{return this.mtr.overview[11];}

}
