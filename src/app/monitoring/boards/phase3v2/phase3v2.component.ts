import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import {Chart} from 'chart.js';
import { map } from 'rxjs/operators';
import { ConnectSocketChannelComponent } from 'src/app/shared/socket/connectSocketChannel.component';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ThemeService } from 'src/app/core/globals/theme';
import { HenryhubService } from 'src/app/safe/services/henryhub.service';
import { SecurityService } from 'src/app/core/services/security.service';
import { EventService } from 'src/app/core/services/event.service';
import { SocketService } from 'src/app/core/services/socket.service';
import { MonitoringTrService } from '../../services/monitoringTr.service';
import { DatePipe } from '@angular/common';
import { PiServerBox } from '../../models/piServer/piServerBox';
import * as Highcharts from 'highcharts';
@Component({
	selector: 'app-phase3v2',
	templateUrl: './phase3v2.component.html',
	styleUrls: ['./phase3v2.component.scss']
})
export class Phase3v2Component extends ConnectSocketChannelComponent implements OnInit, OnDestroy {
	@ViewChild('LineChart2') LineChart2: ElementRef;chartLine2C;
	LineChart :Chart ;  //grafica
	mediaDona1 :Chart; //MediaDona1
	mediaDona2 :Chart; //Media Dona en medio
	mediaDona3 :Chart; //Media Dona en final
	mediaDonaIntermedia1 = [];
	
	public opt2: any = {
		time: {
			timezone: 'America/Mexico_City',
			useUTC: false
		},
		chart: {
			backgroundColor: {
				linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
				stops: [
					[0, 'rgb(0, 0, 0)'],
					[1, 'rgb(0, 0, 0)']
				]
			},
			zoomType: 'xy'
		},
		title: {
			text: 'Variables de Estación de Supervisión',
		},
		xAxis: {
			type: 'datetime'
		},
		yAxis: [ { // Secondary yAxis
            id: 'potencia-neta-axis',
            title: {
                text: 'Potencia Neta'
            },
            //opposite: true
        },{ // Secondary yAxis
            id: 'potencia-ccdv-axis',
            title: {
                text: 'CCDV'
            },
           // opposite: true
        },{ // Secondary yAxis
            id: 'regimen-terminco-axis',
            title: {
                text: 'Regimen Termico'
            },
            //opposite: true
        } ],
		tooltip: {
			shared: true
		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'top',
			y: 60,
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
		series: [{
			name:'Potencia Neta',
			color: '#F33',
            yAxis: 'potencia-neta-axis',

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
	
	webIds=[
		{tagName:"",name:"potenciaNeta",f:"setPotenciaNeta",value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6IgJiUAAAU0VSVklET1JfUElcREFBMDgyMDY",webIdS:"F1DP4rhZAwFMREKDf7s8vylUqg1gMAAAUElUVlxULkNFQS4yMjYz"},
		{tagName:"",name:"potenciaCcdv",f:"setPotenciaCcdv",value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6IgICUAAAU0VSVklET1JfUElcREFBMDgxMTE",webIdS:"F1DP4rhZAwFMREKDf7s8vylUqg1QMAAAUElUVlxULkNFQS4yMjYy"},
		{tagName:"",name:"regimentermico",f:"setRegimenTermico",value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6IgGCUAAAU0VSVklET1JfUElcREFBMDgxMDM",webIdS:"F1DP4rhZAwFMREKDf7s8vylUqg2wMAAAUElUVlxULkNFQS4yMjY4"},
		{tagName:"",name:"ct-1-gas"     ,f:"setCt1Gas",value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6IguB8AAAU0VSVklET1JfUElcRzFBMDgwNzM",webIdS:"F1DP4rhZAwFMREKDf7s8vylUqglAAAAAUElUVlw1MUNFQUdGMDAxXzAx"},
		{tagName:"",name:"ct-1-diesel"  ,f:"setCt1Die",value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6IgnSIAAAU0VSVklET1JfUElcRzFBMDgwOTc",webIdS:""},
		{tagName:"",name:"ct-1-RT"      ,f:"setCt1RT" ,value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6IgGyUAAAU0VSVklET1JfUElcREFBMDgxMDY",webIdS:"F1DP4rhZAwFMREKDf7s8vylUqg3gMAAAUElUVlxULkNFQS4yMjcx"},
		{tagName:"",name:"ct-1-Potencia",f:"setCt1Pot",value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6Igmh8AAAU0VSVklET1JfUElcRzFBMDgwMzA",webIdS:"F1DP4rhZAwFMREKDf7s8vylUqgMgAAAAUElUVlw1MUNFQUdJMDAyXzAx"},
		{tagName:"",name:"ct-1-RPM"     ,f:"setCt1Rpm",value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6Ig3SIAAAU0VSVklET1JfUElcRzFBMDg0MDQ",webIdS:"F1DP4rhZAwFMREKDf7s8vylUqgkQAAAAUElUVlw1MU1CSzAxQ1MwMDE"},

		{tagName:"",name:"ct-2-gas"     ,f:"setCt2Gas",value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6IgICAAAAU0VSVklET1JfUElcRzJBMDgwNzM",webIdS:"F1DP4rhZAwFMREKDf7s8vylUqg9QAAAAUElUVlw1MkNFQUdGMDAxXzAx"},
		{tagName:"",name:"ct-2-diesel"  ,f:"setCt2Die",value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6IgLCAAAAU0VSVklET1JfUElcRzJBMDgwOTc",webIdS:""},
		{tagName:"",name:"ct-2-RT"      ,f:"setCt2RT" ,value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6IgHCUAAAU0VSVklET1JfUElcREFBMDgxMDc",webIdS:"F1DP4rhZAwFMREKDf7s8vylUqg3wMAAAUElUVlxULkNFQS4yMjcy"},
		{tagName:"",name:"ct-2-Potencia",f:"setCt2Pot",value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6IgDSAAAAU0VSVklET1JfUElcRzJBMDgwNDY",webIdS:"F1DP4rhZAwFMREKDf7s8vylUqglwAAAAUElUVlw1MkNFQUdJMDAyXzAx"},
		{tagName:"",name:"ct-2-RPM"     ,f:"setCt2Rpm",value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6IgciMAAAU0VSVklET1JfUElcRzJBMDg0MDQ",webIdS:"F1DP4rhZAwFMREKDf7s8vylUqg8gAAAAUElUVlw1Mk1CSzAxQ1MwMDE"},
		
		{tagName:"",name:"ct-3-gas"     ,f:"setCt3Gas",value:0,date:new Date(),webIdA:"",webIdS:""},
		{tagName:"",name:"ct-3-diesel"  ,f:"setCt3Die",value:0,date:new Date(),webIdA:"",webIdS:""},
		{tagName:"",name:"ct-3-RT"      ,f:"setCt3RT" ,value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6IgGiUAAAU0VSVklET1JfUElcREFBMDgxMDU",webIdS:"F1DP4rhZAwFMREKDf7s8vylUqg4AMAAAUElUVlxULkNFQS4yMjcz"},
		{tagName:"",name:"ct-3-Potencia",f:"setCt3Pot",value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6Ig4h4AAAU0VSVklET1JfUElcRUhBMDgwMTk",webIdS:"F1DP4rhZAwFMREKDf7s8vylUqgDwMAAAUElUVlxULkNFQS4yMDQ0"},
		{tagName:"",name:"ct-3-RPM"     ,f:"setCt3Rpm",value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6IgSiIAAAU0VSVklET1JfUElcRUhBMDg3MDE",webIdS:"F1DP4rhZAwFMREKDf7s8vylUqg_gwAAAUElUVlxDRUEuNDI0"},

		
	]
	constructor(
		public globalService: GlobalService,
		public theme: ThemeService,
		private henryhubService: HenryhubService,
		
		public  securityService    : SecurityService,

		public eventService: EventService,
		public socketService: SocketService,
		public monitoringTrService: MonitoringTrService,
		private datePipe: DatePipe
	) {
		super(globalService, eventService, socketService,securityService);
	}

	ngOnInit() {
		this.socketFase3();
		this.LineChart2f();
		// Grafica
		this.LineChart = new Chart('lineChart', {
			type: 'line',
			data: {
				labels: [],
				datasets: [],
				animation: true,
				animationSteps: 100,
				animationEasing: "easeOutQuart",
				scaleFontSize: 16,
				responsive: true,
				showTooltip: true,
				scaleShowGridLines: false,
				bezierCurve: true,
				pointDotRadius: 5,
			},
			options: {
				title: {
					text: "",
					display: false
				},
				legend: {
					display: false
				},
				maintainAspectRatio: false,
				scales: {
					yAxes: []
				}

			}
		});
		//Dona 1
		this.mediaDona1 = new Chart('mediaDona1', {
			type: 'doughnut',
			data: {
				labels: (this.globalService.plant.name.toLowerCase() == "aguila")?["Gas","Diesel","RT","Potencia","RPM"]:["Gas","RT","Potencia","RPM"],
				responsive: true,
				datasets: [
					{
						data: [0, 0, 0, 0, 0, 0],
						backgroundColor: [
							'rgba(138,53,71, 0.3)',
							'rgba(37,110,161, 0.3)',
							'rgba(200,164,67, 0.3)',
							'rgba(60,145,145, 0.3)',
							'rgba(111,73,188, 0.3)',
							'rgba(148,92,34, 0.3)',
						],
						borderWidth: 1,
						borderColor: [
							'rgba(138,53,71, 1)',
							'rgba(37,110,161, 1)',
							'rgba(200,164,67, 1)',
							'rgba(60,145,145, 1)',
							'rgba(111,73,188, 1 )',
							'rgba(148,92,34,  1)',
						],

					},
					{
						data: [1],
						backgroundColor: [
							'rgba(0,0,0)',

						],
						borderWidth: 0,
						borderColor: [
							'rgba(0,0,0)',
						],

					},

					{
						data: [0, 0, 0, 0, 0, 0],
						backgroundColor: [
							'rgba(138,53,71, 0.3)',
							'rgba(37,110,161, 0.3)',
							'rgba(200,164,67, 0.3)',
							'rgba(60,145,145, 0.3)',
							'rgba(111,73,188, 0.3)',
							'rgba(148,92,34, 0.3)',
						],
						borderWidth: 1,
						borderColor: [
							'rgba(138,53,71, 1)',
							'rgba(37,110,161, 1)',
							'rgba(200,164,67, 1)',
							'rgba(60,145,145, 1)',
							'rgba(111,73,188, 1 )',
							'rgba(148,92,34,  1)',
						],

					}
				],

			},
			options: {
				segmentShowStroke: false,
				responsive: true,
				rotation: -Math.PI,
				circumference: Math.PI,
				cutoutPercentage: 88,
				legend: {
					display:false,
					position: 'left'
				},
				animation: {
					animateRotate: true,
					animateScale: true
				},

			}
		});



		//Dona 2

		this.mediaDona2 = new Chart('mediaDona2', {
			type: 'doughnut',
			data: {
				labels: (this.globalService.plant.name.toLowerCase() == "aguila")?["Gas","Diesel","RT","Potencia","RPM"]:["Gas","RT","Potencia","RPM"],
				responsive: true,
				datasets: [
					{
						data: [0, 0, 0, 0, 0, 0],
						backgroundColor: [
							'rgba(138,53,71, 0.3)',
							'rgba(37,110,161, 0.3)',
							'rgba(200,164,67, 0.3)',
							'rgba(60,145,145, 0.3)',
							'rgba(111,73,188, 0.3)',
							'rgba(148,92,34, 0.3)',
						],
						borderWidth: 1,
						borderColor: [
							'rgba(138,53,71, 1)',
							'rgba(37,110,161, 1)',
							'rgba(200,164,67, 1)',
							'rgba(60,145,145, 1)',
							'rgba(111,73,188, 1)',
							'rgba(148,92,34, 1)',
						],

					},
					{
						data: [10],
						backgroundColor: [
							'rgba(0,0,0)',

						],
						borderWidth: 1,
						borderColor: [
							'rgba(0,0,0)',
						],

					},
					{
						data: [0, 0, 0, 0, 0, 0],
						backgroundColor: [
							'rgba(138,53,71, 0.3)',
							'rgba(37,110,161, 0.3)',
							'rgba(200,164,67, 0.3)',
							'rgba(60,145,145, 0.3)',
							'rgba(111,73,188, 0.3)',
							'rgba(148,92,34, 0.3)',
						],
						borderWidth: 1,
						borderColor: [
							'rgba(138,53,71, 1)',
							'rgba(37,110,161, 1)',
							'rgba(200,164,67, 1)',
							'rgba(60,145,145, 1)',
							'rgba(111,73,188, 1)',
							'rgba(148,92,34, 1)',
						],


					}
				],
			},

			options: {
				responsive: true,
				rotation: -Math.PI,
				cutoutPercentage: 88,
				circumference: Math.PI,
				legend: {
					display:false,
					position: 'left'
				},
				animation: {
					animateRotate: true,
					animateScale: true
				}

			}

		});


		//Dona 3

		this.mediaDona3 = new Chart('mediaDona3', {
			type: 'doughnut',
			data: {
				responsive: true,				
				labels: ["RT","Potencia","RPM"],
				datasets: [
					{
						data: [0, 0, 0, 0, 0, 0],
						backgroundColor: [
							'rgba(138,53,71, 0.3)',
							'rgba(37,110,161, 0.3)',
							'rgba(200,164,67, 0.3)',
							'rgba(60,145,145, 0.3)',
							'rgba(111,73,188, 0.3)',
							'rgba(148,92,34, 0.3)',
						],
						borderWidth: 1,
						borderColor: [
							'rgba(138,53,71, 1)',
							'rgba(37,110,161, 1)',
							'rgba(200,164,67, 1)',
							'rgba(60,145,145, 1)',
							'rgba(111,73,188, 1)',
							'rgba(148,92,34, 1)',
						],

					},
					{
						data: [10],
						backgroundColor: [
							'rgba(0,0,0)',

						],
						borderWidth: 1,
						borderColor: [
							'rgba(0,0,0)',
						],

					},
					{
						data: [0, 0, 0, 0, 0, 0],
						backgroundColor: [
							'rgba(138,53,71, 0.3)',
							'rgba(37,110,161, 0.3)',
							'rgba(200,164,67, 0.3)',
							'rgba(60,145,145, 0.3)',
							'rgba(111,73,188, 0.3)',
							'rgba(148,92,34, 0.3)',
						],
						borderWidth: 1,
						borderColor: [
							'rgba(138,53,71, 1)',
							'rgba(37,110,161, 1)',
							'rgba(200,164,67, 1)',
							'rgba(60,145,145, 1)',
							'rgba(111,73,188, 1)',
							'rgba(148,92,34, 1)',
						],

					}
				],
			},

			options: {
				responsive: true,
				rotation: -Math.PI,
				cutoutPercentage: 88,
				circumference: Math.PI,
				legend: {
					display:false,
					position: 'left'
				},
				animation: {
					animateRotate: false,
					animateScale: true
				}
			}

		});
	}	
	getTagNamByF(fname:string):string{
		let name = "";
		for (const e of this.webIds) {
			if(fname==e.f){
				name = e.tagName+"";
			}
		}
		return name;
	}
	getValueByF(fname:string):number{
		let name = 0;
		for (const e of this.webIds) {
			if(fname==e.f){
				name = e.value;
			}
		}
		return name;
	}
	ngOnDestroy(){
		this.connectSocketChannelNgOnDestroy();
	}
	socketFase3(){
		let canal = "pi-"+this.globalService.plant.name.toLowerCase() ;
		this.subscribeSocketChannel(
			canal,
			(data)=>this.inSocketData(data),
			()=>this.connected(),
			()=>this.disconnected()
			);
	}
	inSocketData(data: any) {
		console.log(data);
		this.addStreamsetsValueInChart(data);
	}
	connected(){

	}
	disconnected(){

	}	
	addStreamsetsValueInChart(box: PiServerBox){
		
		let date = new Date();
		for (const plant of box.data) {
			if(!plant.error_response){
				for (const tag of plant.Items) {
					
					for (const iterator of this.webIds) {

						let webIdT = "";
						
						if(this.globalService.plant.name.toLowerCase() == "aguila"){
							webIdT = iterator.webIdA;
						}else if(this.globalService.plant.name.toLowerCase() == "sol"){
							webIdT = iterator.webIdS;							
						}
						if(tag.WebId == webIdT){
							iterator.value = +tag.Value.Value;
							iterator.date = date; 
							iterator.tagName = tag.Name;
							this[iterator.f](iterator.value,date.getTime());
						}
					}
				}
			}
		}
	}
	setPotenciaNeta(y,x){
		this.chartLine2C.series[0].addPoint([x, y], true, true);
	}
	setPotenciaCcdv(y,x){
		this.chartLine2C.series[1].addPoint([x, y], true, true);
	}
	setRegimenTermico(y,x){
		this.chartLine2C.series[2].addPoint([x, y], true, true);
	}
	setCt1Gas(value,date){
		this.mediaDona1['data']['datasets'][0]['data'][0]=value;
		this.mediaDona1['data']['datasets'][2]['data'][0]=value;
		this.mediaDona1.update();
	}
	setCt1Die(value,date){
		this.mediaDona1['data']['datasets'][0]['data'][1]=value;
		this.mediaDona1['data']['datasets'][2]['data'][1]=value;
		this.mediaDona1.update();
	}
	setCt1RT(value,date){
		this.mediaDona1['data']['datasets'][0]['data'][2]=value;
		this.mediaDona1['data']['datasets'][2]['data'][2]=value;
		this.mediaDona1.update();
	}
	setCt1Pot(value,date){
		this.mediaDona1['data']['datasets'][0]['data'][3]=value;
		this.mediaDona1['data']['datasets'][2]['data'][3]=value;
		this.mediaDona1.update();
	}
	setCt1Rpm(value,date){
		this.mediaDona1['data']['datasets'][0]['data'][4]=value;
		this.mediaDona1['data']['datasets'][2]['data'][4]=value;
		this.mediaDona1.update();
	}


	
	setCt2Gas(value,date){
		this.mediaDona2['data']['datasets'][0]['data'][0]=value;
		this.mediaDona2['data']['datasets'][2]['data'][0]=value;
		this.mediaDona2.update();
	}
	setCt2Die(value,date){
		this.mediaDona2['data']['datasets'][0]['data'][1]=value;
		this.mediaDona2['data']['datasets'][2]['data'][1]=value;
		this.mediaDona2.update();
	}
	setCt2RT(value,date){
		this.mediaDona2['data']['datasets'][0]['data'][2]=value;
		this.mediaDona2['data']['datasets'][2]['data'][2]=value;
		this.mediaDona2.update();
	}
	setCt2Pot(value,date){
		this.mediaDona2['data']['datasets'][0]['data'][3]=value;
		this.mediaDona2['data']['datasets'][2]['data'][3]=value;
		this.mediaDona2.update();
	}
	setCt2Rpm(value,date){
		this.mediaDona2['data']['datasets'][0]['data'][4]=value;
		this.mediaDona2['data']['datasets'][2]['data'][4]=value;
		this.mediaDona2.update();
	}


	
	setCt3Gas(value,date){
		this.mediaDona3['data']['datasets'][0]['data'][0]=value;
		this.mediaDona3['data']['datasets'][2]['data'][0]=value;
		this.mediaDona3.update();
	}
	setCt3Die(value,date){
		this.mediaDona3['data']['datasets'][0]['data'][1]=value;
		this.mediaDona3['data']['datasets'][2]['data'][1]=value;
		this.mediaDona3.update();
	}
	setCt3RT(value,date){
		this.mediaDona3['data']['datasets'][0]['data'][2]=value;
		this.mediaDona3['data']['datasets'][2]['data'][2]=value;
		this.mediaDona3.update();
	}
	setCt3Pot(value,date){
		this.mediaDona3['data']['datasets'][0]['data'][3]=value;
		this.mediaDona3['data']['datasets'][2]['data'][3]=value;
		this.mediaDona3.update();
	}
	setCt3Rpm(value,date){
		this.mediaDona3['data']['datasets'][0]['data'][4]=value;
		this.mediaDona3['data']['datasets'][2]['data'][4]=value;
		this.mediaDona3.update();
	}
    addStreamsetsValueInChartOld(box: PiServerBox){
		let entrada = true;
		for (const data of box.data) {
			if (!data.error_response) {
				for (const tag of data.Items) {
					let casa:Chart = this.LineChart;
					let bandera = false;
					this.LineChart.data.datasets.map((dataset=>{
						if(entrada){
							entrada = false;
							this.LineChart.data.labels.push(this.datePipe.transform(new Date(tag.Value.Timestamp),'dd/MM/yyyy HH:mm:ss:SSS') );
						}
						if(dataset.id == tag.Name){
							bandera = true;
							dataset.data.push(tag.Value.Value);
						}
					}));
					if( !bandera ){
						this.LineChart.data.datasets.push(
							{
								backgroundColor: 'rgba(0, 174, 255, 0.3)',
								borderColor:'rgba(0, 174, 255, 1)',
								fill: false,
								data: [tag.Value.Value],
								label: tag.Name,
								id: tag.Name,
								yAxisID: tag.Name
							}
						);
					}
					let existeY=false;
					this.LineChart.chart.options.scales.yAxes.map(y=>{
						if(y.id == tag.Name){
							existeY=true;
						}
					});
					if(!existeY){
						this.LineChart.chart.options.scales.yAxes.push(
							{
								id: tag.Name,
								type: 'linear',// logarithmic / linear
								display: false,
							}
						);
					}
					
					if (this.LineChart.data.labels.length >= 20) {
						this.LineChart.data.labels.shift();
						this.LineChart.data.datasets.map((dataset=>{
							dataset.data.shift();
						}));
					}
					this.LineChart.update();
				}
			}
		}
	}
	LineChart2f(){
		
		let opt: any = {
			chart: {
				type: 'spline',
				//animation: Highcharts.svg, // don't animate in old IE
				marginRight: 10,
				
				backgroundColor: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
					stops: [
						[0, 'rgb(0, 0, 0)'],
						[1, 'rgb(0, 0, 0)']
					]
				},
			},
		
			time: {
				useUTC: false
			},
		
			title: {
				text: ''
			},
		
			plotOptions: {
				series: {
					marker: {
						enabled: false
					}
				}
			},
			accessibility: {
				announceNewData: {
					enabled: false,
					minAnnounceInterval: 15000,
					announcementFormatter: function (allSeries, newSeries, newPoint) {
						if (newPoint) {
							return 'New point added. Value: ' + newPoint.y;
						}
						return false;
					}
				}
			},
		
			xAxis: {
				type: 'datetime',
				tickPixelInterval: 150
			},
		
			yAxis:  [ { // Secondary yAxis
				id: 'potencia-neta-axis',
				gridLineWidth: 0,
				labels: {
					style: {
						color: '#66D7D1',
						fontWeight: 'bold'
					}
				},
				title: {
					text: 'Potencia Neta',
					style: {
						color: '#66D7D1'
					}
				},
				//opposite: true
			},{ // Secondary yAxis
				id: 'potencia-ccdv-axis',
				gridLineWidth: 0,
				labels: {
					style: {
						color: '#F4F1BB',
						fontWeight: 'bold'
					}
				},
				title: {
					text: 'CCDV',
					style: {
						color: '#F4F1BB'
					}
				},
			   // opposite: true
			},{ // Secondary yAxis
				id: 'regimen-terminco-axis',
				gridLineWidth: 0,
				labels: {
					style: {
						color: '#FF637D',
						fontWeight: 'bold'
					}
				},
				title: {
					text: 'Regimen Termico',
					style: {
						color: '#FF637D'
					}
				},
				//opposite: true
			} ],
		
			tooltip: {
				headerFormat: '<b>{series.name}</b><br/>',
				pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
			},
		
			legend: {
				enabled: false
			},
		
			exporting: {
				enabled: false
			},
		
			series: [{
				name:'Potencia Neta',
				yAxis: 'potencia-neta-axis',
				
				color: '#66D7D1',
				data:(function () {
					// generate an array of random data
					var data = [],
						time = (new Date()).getTime(),
						i;
		
					for (i = -24; i <= 0; i += 1) {
						data.push({
							x: time + i * 1000,
							y:0
						});
					}
					return data;
				}())
			},{
				name:'Potencia CCDV',
				yAxis: 'potencia-ccdv-axis',
				color: '#F4F1BB',
				data:(function () {
					// generate an array of random data
					var data = [],
						time = (new Date()).getTime(),
						i;
		
					for (i = -24; i <= 0; i += 1) {
						data.push({
							x: time + i * 1000,
							y:0
						});
					}
					return data;
				}())
			},{
				name:'Regimen Termico',
				yAxis: 'regimen-terminco-axis',
				color: '#FF637D',
				data:(function () {
					// generate an array of random data
					var data = [],
						time = (new Date()).getTime(),
						i;
		
					for (i = -24; i <= 0; i += 1) {
						data.push({
							x: time + i * 1000,
							y:0
						});
					}
					return data;
				}())
			}]
		}
		this.chartLine2C = Highcharts.chart(this.LineChart2.nativeElement, opt);
	}
}
