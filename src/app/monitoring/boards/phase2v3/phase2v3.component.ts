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
export class Phase2v3Component extends ConnectSocketChannelComponent implements OnInit, OnDestroy  {
	@ViewChild('chartEstA1') chartEstA1: ElementRef;
	@ViewChild('chartEstA2') chartEstA2: ElementRef;
	
	chartEstA1C:Chart;
	chartEstA2C:Chart;

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
		this.getStreamsetsInterpolatedLast24HoursSol();
		this.getStreamsetsInterpolatedLast24HoursAguila();
		this.subscribeSocketChannel("pi-servers"    ,(data)=>{this.socketFlow(data);}  ,()=>{this.socketReconnected();}  ,()=>{this.socketDisconnected();});
		//this.subscribeSocketChannel("back-pi-isrun" ,(data)=>{this.socketFlow(data);}  ,()=>{this.socketReconnected();}  ,()=>{this.socketDisconnected();});

		this.chartEstA1C = new Chart(this.chartEstA1.nativeElement,this.returnConfigDonught() );
		this.chartEstA2C = new Chart(this.chartEstA2.nativeElement,this.returnConfigDonught() );

		Highcharts.stockChart('container2', this.opt);


		


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
					data: [],
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
		this.setEstA1();		
		this.setEstA2();	
		this.setEstC2();
	}
	setEstA1(){
		this.mtr.est[0][0] =  +this.wids[3][1];
	}
	getEstA1():Array<number>{
		return this.mtr.est[0];
	}
	setEstA2(){
		this.mtr.est[3][0] =  +this.wids[4][1];
	}
	getEstA2():Array<number>{
		return this.mtr.est[3];
	}
	
	setEstC2(){
		this.mtr.est[5][0] =  +this.wids[5][1];
	}
	getEstC2():Array<number>{
		return this.mtr.est[5];
	}

}
