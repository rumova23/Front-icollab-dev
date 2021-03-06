import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { GlobalService } from 'src/app/core/globals/global.service';
import { MonitoringTrService } from '../../services/monitoringTr.service';
import { PiServerBox } from '../../models/piServer/piServerBox';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ConnectSocketChannelComponent } from 'src/app/shared/socket/connectSocketChannel.component';
import { EventService } from 'src/app/core/services/event.service';
import { SocketService } from 'src/app/core/services/socket.service';
import { SecurityService } from 'src/app/core/services/security.service';
import * as Highcharts from 'highcharts';
import { timer , interval} from 'rxjs';
@Component({
	selector: 'app-phase3v3',
	templateUrl: './phase3v3.component.html',
	styleUrls: ['./phase3v3.component.scss']
})
export class Phase3v3Component extends ConnectSocketChannelComponent implements OnInit {
	@ViewChild('LineChart2') LineChart2: ElementRef;chartLine2C;
	LineChart = [];  //grafica
	mediaDona1 :Chart = []; //MediaDona1
	mediaDona2 :Chart = []; //Media Dona en medio
	mediaDona3 :Chart = []; //Media Dona en final
	mediaDonaIntermedia1 = [];


	conectToPi = false;
	tags :Map <String, Object> = new Map();
	mapToTag:Map <String, String> = new Map();
	pl          = "";
	colorPotNet = "#66D7D1";
	colorCcdv   = "#F4F1BB";
	colorRT     = "#FF637D";

	constructor(
         public globalService       : GlobalService
		,public monitoringTrService : MonitoringTrService
		,public toastr              : ToastrManager
		,public eventService        : EventService
		,public socketService       : SocketService
		,public  securityService    : SecurityService
	){ 
		super(globalService, eventService, socketService,securityService);
		this.initTags();
	}


	ngOnInit() {
		this.initInterpolated();
		/*
		// Grafica
		this.LineChart = new Chart('lineChart', {
			type: 'line',
			data: {
				labels: ["10:42:48", "10:42:53", "10:42:58", "10:43:02", "10:43:07"],
				datasets: [{
					data: [6, 6, 7, 10, 7, 6],
					fill: true,
					lineTension: 0.2,
					borderColor: "#9bc9ec",
					borderWidth: 5
				}, {
					data: [5, 5, 5, 5, 5, 5],
					fill: false,
					lineTension: 0.2,
					borderColor: "#9f8ac1",
					borderWidth: 5
				}, {
					data: [5, 4, 2, 1, 3, 5],
					fill: false,
					lineTension: 0.2,
					borderColor: "#b0d56f",
					borderWidth: 5,

				}],
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
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				}

			}
		});//*/
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

	getTagName(key):string{
		return this.tags.get(key)['tagName'];
	}
	getValue(key):string{
		let c = Array.isArray(this.tags.get(key)['value'])
		? 
		this.tags.get(key)['value']['length']>0 ? this.tags.get(key)['value'][this.tags.get(key)['value']['length']-1] : [null,0] 
		: this.tags.get(key)['value'];
		return c;
	}
	initTags(){
		this.tags.set("temperatura_ambiente" ,{tagName:"" ,f:"setTemperaturaAmbiente" ,value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6IglyQAAAU0VSVklET1JfUElcUDJBMDgyMTE",webIdS:"F1DP4rhZAwFMREKDf7s8vylUqgxwMAAAUElUVlxULkNFQS4yMjQ1"});
		this.tags.set("presion_atmosferica"  ,{tagName:"" ,f:"setPresionAtmosferica"  ,value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6IgmSQAAAU0VSVklET1JfUElcUDJBMDgyMTM",webIdS:"F1DP4rhZAwFMREKDf7s8vylUqg5gIAAAUElUVlw1MlBDLUFJLTAwNQ"});
		this.tags.set("humedad"              ,{tagName:"" ,f:"sethumedad"             ,value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6IgmCQAAAU0VSVklET1JfUElcUDJBMDgyMTI",webIdS:"F1DP4rhZAwFMREKDf7s8vylUqgtgIAAAUElUVlw1MlBDLUFJLTAwNA"});
		this.tags.set("potenciaNeta"         ,{tagName:"" ,f:"setPotenciaNeta"        ,value:[],date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6IgJiUAAAU0VSVklET1JfUElcREFBMDgyMDY",webIdS:"F1DP4rhZAwFMREKDf7s8vylUqg1gMAAAUElUVlxULkNFQS4yMjYz"});
		this.tags.set("potenciaCcdv"         ,{tagName:"" ,f:"setPotenciaCcdv"        ,value:[],date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6IgICUAAAU0VSVklET1JfUElcREFBMDgxMTE",webIdS:"F1DP4rhZAwFMREKDf7s8vylUqg1QMAAAUElUVlxULkNFQS4yMjYy"});
		this.tags.set("regimentermico"       ,{tagName:"" ,f:"setRegimenTermico"      ,value:[],date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6IgGCUAAAU0VSVklET1JfUElcREFBMDgxMDM",webIdS:"F1DP4rhZAwFMREKDf7s8vylUqg2wMAAAUElUVlxULkNFQS4yMjY4"});
		this.tags.set("ct-1-gas"             ,{tagName:"" ,f:"setCt1Gas"              ,value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6IguB8AAAU0VSVklET1JfUElcRzFBMDgwNzM",webIdS:"F1DP4rhZAwFMREKDf7s8vylUqglAAAAAUElUVlw1MUNFQUdGMDAxXzAx"});
		this.tags.set("ct-1-diesel"          ,{tagName:"" ,f:"setCt1Die"              ,value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6IgnSIAAAU0VSVklET1JfUElcRzFBMDgwOTc",webIdS:""});
		this.tags.set("ct-1-RT"              ,{tagName:"" ,f:"setCt1RT"               ,value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6IgGyUAAAU0VSVklET1JfUElcREFBMDgxMDY",webIdS:"F1DP4rhZAwFMREKDf7s8vylUqg3gMAAAUElUVlxULkNFQS4yMjcx"});
		this.tags.set("ct-1-Potencia"        ,{tagName:"" ,f:"setCt1Pot"              ,value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6Igmh8AAAU0VSVklET1JfUElcRzFBMDgwMzA",webIdS:"F1DP4rhZAwFMREKDf7s8vylUqgMgAAAAUElUVlw1MUNFQUdJMDAyXzAx"});
		this.tags.set("ct-1-RPM"             ,{tagName:"" ,f:"setCt1Rpm"              ,value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6Ig3SIAAAU0VSVklET1JfUElcRzFBMDg0MDQ",webIdS:"F1DP4rhZAwFMREKDf7s8vylUqgkQAAAAUElUVlw1MU1CSzAxQ1MwMDE"});
		this.tags.set("ct-2-gas"             ,{tagName:"" ,f:"setCt2Gas"              ,value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6IgICAAAAU0VSVklET1JfUElcRzJBMDgwNzM",webIdS:"F1DP4rhZAwFMREKDf7s8vylUqg9QAAAAUElUVlw1MkNFQUdGMDAxXzAx"});
		this.tags.set("ct-2-diesel"          ,{tagName:"" ,f:"setCt2Die"              ,value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6IgLCAAAAU0VSVklET1JfUElcRzJBMDgwOTc",webIdS:""});
		this.tags.set("ct-2-RT"              ,{tagName:"" ,f:"setCt2RT"               ,value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6IgHCUAAAU0VSVklET1JfUElcREFBMDgxMDc",webIdS:"F1DP4rhZAwFMREKDf7s8vylUqg3wMAAAUElUVlxULkNFQS4yMjcy"});
		this.tags.set("ct-2-Potencia"        ,{tagName:"" ,f:"setCt2Pot"              ,value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6IgDSAAAAU0VSVklET1JfUElcRzJBMDgwNDY",webIdS:"F1DP4rhZAwFMREKDf7s8vylUqglwAAAAUElUVlw1MkNFQUdJMDAyXzAx"});
		this.tags.set("ct-2-RPM"             ,{tagName:"" ,f:"setCt2Rpm"              ,value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6IgciMAAAU0VSVklET1JfUElcRzJBMDg0MDQ",webIdS:"F1DP4rhZAwFMREKDf7s8vylUqg8gAAAAUElUVlw1Mk1CSzAxQ1MwMDE"});
		this.tags.set("ct-3-gas"             ,{tagName:"" ,f:"setCt3Gas"              ,value:0,date:new Date(),webIdA:"",webIdS:""});
		this.tags.set("ct-3-diesel"          ,{tagName:"" ,f:"setCt3Die"              ,value:0,date:new Date(),webIdA:"",webIdS:""});
		this.tags.set("ct-3-RT"              ,{tagName:"" ,f:"setCt3RT"               ,value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6IgGiUAAAU0VSVklET1JfUElcREFBMDgxMDU",webIdS:"F1DP4rhZAwFMREKDf7s8vylUqg4AMAAAUElUVlxULkNFQS4yMjcz"});
		this.tags.set("ct-3-Potencia"        ,{tagName:"" ,f:"setCt3Pot"              ,value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6Ig4h4AAAU0VSVklET1JfUElcRUhBMDgwMTk",webIdS:"F1DP4rhZAwFMREKDf7s8vylUqgDwMAAAUElUVlxULkNFQS4yMDQ0"});
		this.tags.set("ct-3-RPM"             ,{tagName:"" ,f:"setCt3Rpm"              ,value:0,date:new Date(),webIdA:"P0uQAgHoBd0ku7P3cWOJL6IgSiIAAAU0VSVklET1JfUElcRUhBMDg3MDE",webIdS:"F1DP4rhZAwFMREKDf7s8vylUqg_gwAAAUElUVlxDRUEuNDI0"});
	}
	initInterpolated(){
		let webIds = [];
		let idPi   = 0;
		
		if(this.globalService.plant.name.toLowerCase() == 'sol'){
			idPi = 2;
			this.pl = "webIdS";
			webIds.push(this.tags.get("potenciaNeta")['webIdS']);
			webIds.push(this.tags.get("potenciaCcdv")['webIdS']);
			webIds.push(this.tags.get("regimentermico")['webIdS']);
		}
		if(this.globalService.plant.name.toLowerCase() == 'aguila'){
			idPi = 1;
			this.pl = "webIdA";
			webIds.push(this.tags.get("potenciaNeta")['webIdA']);
			webIds.push(this.tags.get("potenciaCcdv")['webIdA']);
			webIds.push(this.tags.get("regimentermico")['webIdA']);
		}
		this.monitoringTrService.getStreamsetsInterpolatedLastHours(idPi,webIds,24)
			.subscribe(
				(data:PiServerBox) => {
					if(data.data[0].error_response){
						this.toastr.errorToastr("Error", 'Error con la solicitud');
						return 0;
					} 
					this.conectToPi = true;
					data.data[0].Items.forEach(item=>{
						let a = this.tags.entries();
						for (let nextValue = a.next(); nextValue.done !== true; nextValue = a.next()){
							let webIdLocal = nextValue.value[1][this.pl];
							if(item.WebId && item.WebId == webIdLocal){
								if(!this.mapToTag.has(item.WebId))this.mapToTag.set(item.WebId,nextValue.value[0]);
								this.tags.get(nextValue.value[0])['tagName'] = item.Name
								this.tags.get(nextValue.value[0])['value']   = item.Items.map(itemInterpolated=>[(new Date(itemInterpolated.Value.Timestamp)).getTime(),itemInterpolated.Value.Value]);
							}
						}
					});				
				},
				errorData => {
				//this.toastr.errorToastr(Constants.ERROR_LOAD, 'Clima actual');
				},
				() => {//Complete
					if(this.conectToPi){
						this.initChartLine();
						/*
						this.tags.get('potenciaNeta')['value'].forEach(element => {
							
							this[this.tags.get('potenciaNeta')['f']](element[1],element[0])
						});
						this.tags.get('potenciaCcdv')['value'].forEach(element => {
							this[this.tags.get('potenciaCcdv')['f']](element[1],element[0])
						});
						this.tags.get('regimentermico')['value'].forEach(element => {
							this[this.tags.get('regimentermico')['f']](element[1],element[0])
						});
					//*/
						timer(3000).subscribe(()=>{
							this.socketFase3();
						},null,()=>{
							interval(3000).subscribe(()=>{
								//this.initChartLine();
								this.chartLine2C.redraw(true);
							});
							
							interval(19000).subscribe(()=>{
								this.initChartLine();
								//this.chartLine2C.redraw();
							});
						});
					}
				}
			);
	}
	initChartLine(){
		if(this.chartLine2C != undefined){
			this.chartLine2C.destroy();
			this.chartLine2C = undefined;
		}
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
	
		
			xAxis: {
				type: 'datetime',
				tickPixelInterval: 150
			},
		
			yAxis:  [ { // Secondary yAxis
				id: 'potencia-neta-axis',
				gridLineWidth: 0,
				labels: {
					style: {
						color: this.colorPotNet,
						fontWeight: 'bold'
					}
				},
				title: {
					enabled: false,
					text: 'Potencia Neta',
					style: {
						color: this.colorPotNet
					}
				},
				//opposite: true
			},{ // Secondary yAxis
				id: 'potencia-ccdv-axis',
				gridLineWidth: 0,
				labels: {
					style: {
						color: this.colorCcdv,
						fontWeight: 'bold'
					}
				},
				title: {
					enabled: false,
					text: 'CCDV',
					style: {
						color: this.colorCcdv
					}
				},
			   // opposite: true
			},{ // Secondary yAxis
				id: 'regimen-terminco-axis',
				gridLineWidth: 0,
				labels: {
					style: {
						color: this.colorRT,
						fontWeight: 'bold'
					}
				},
				title: {
					enabled: false,
					text: 'Regimen Termico',
					style: {
						color: this.colorRT
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
				
				color: this.colorPotNet,
				data:this.tags.get('potenciaNeta')['value']
			},{
				name:'Potencia CCDV',
				yAxis: 'potencia-ccdv-axis',
				color: this.colorCcdv,
				data:this.tags.get('potenciaCcdv')['value']
			},{
				name:'Regimen Termico',
				yAxis: 'regimen-terminco-axis',
				color: this.colorRT,
				data:this.tags.get('regimentermico')['value']
			}]
		}
		this.chartLine2C = Highcharts.chart(this.LineChart2.nativeElement, opt);

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
		
		let date = new Date();
		for (const plant of data.data) {
			if(!plant.error_response){
				for (const tag of plant.Items) {
					if(!this.mapToTag.has(tag.WebId))this.mapToTag.set(tag.WebId,this.findLocalKeyTagByWebId(tag.WebId));
					if(this.mapToTag.get(tag.WebId) != null){
						let localTag = this.tags.get(this.mapToTag.get(tag.WebId));
						if( ! ["potenciaNeta","potenciaCcdv","regimentermico"].includes(this.mapToTag.get(tag.WebId).toString()) )localTag['value'] = tag.Value.Value;
						if(""==localTag['tagName'])localTag['tagName'] = tag.Name;
						this[localTag['f']](tag.Value.Value,date.getTime());
					}
				}
			}
		}
		
		//this.addStreamsetsValueInChart(data);
	}
	findLocalKeyTagByWebId(webId):String{
		let result:String = null;
		let a = this.tags.entries();
		for (let nextValue = a.next(); nextValue.done !== true; nextValue = a.next()){
			let webIdLocal = nextValue.value[1][this.pl];
			if(webId == webIdLocal){
				result = nextValue.value[0];
			}
		}
		return result;
	}
	connected(){

	}
	disconnected(){

	}
	

	
	setTemperaturaAmbiente(x,y){}
	setPresionAtmosferica(x,y){}
	sethumedad(x,y){}
	setPotenciaNeta(y,x){
		this.chartLine2C.series[0].addPoint([x, y], false, true);
		let arr = this.tags.get('potenciaNeta')['value'];
		arr.shift();
		arr.push([x,y]);
		//*/
	}
	setPotenciaCcdv(y,x){		
		this.chartLine2C.series[1].addPoint([x, y], false, true);
		let arr = this.tags.get('potenciaCcdv')['value'];
		arr.shift();
		arr.push([x,y]);
		//*/
	}
	setRegimenTermico(y,x){
		this.chartLine2C.series[2].addPoint([x, y], false, true);
		let arr = this.tags.get('regimentermico')['value'];
		arr.shift();
		arr.push([x,y]);
		//*/
	}
	setCt1Gas(value,date){
		this.mediaDona1['data']['datasets'][0]['data'][0]=value;
		this.mediaDona1['data']['datasets'][2]['data'][0]=0;
		this.mediaDona1.update();
	}
	setCt1Die(value,date){
		this.mediaDona1['data']['datasets'][0]['data'][1]=value;
		this.mediaDona1['data']['datasets'][2]['data'][1]=0;
		this.mediaDona1.update();
	}
	setCt1RT(value,date){
		this.mediaDona1['data']['datasets'][0]['data'][2]=value;
		this.mediaDona1['data']['datasets'][2]['data'][2]=0;
		this.mediaDona1.update();
	}
	setCt1Pot(value,date){
		this.mediaDona1['data']['datasets'][0]['data'][3]=0;
		this.mediaDona1['data']['datasets'][2]['data'][3]=value;
		this.mediaDona1.update();
	}
	setCt1Rpm(value,date){
		this.mediaDona1['data']['datasets'][0]['data'][4]=0;
		this.mediaDona1['data']['datasets'][2]['data'][4]=value;
		this.mediaDona1.update();
	}


	
	setCt2Gas(value,date){
		this.mediaDona2['data']['datasets'][0]['data'][0]=value;
		this.mediaDona2['data']['datasets'][2]['data'][0]=0;
		this.mediaDona2.update();
	}
	setCt2Die(value,date){
		this.mediaDona2['data']['datasets'][0]['data'][1]=value;
		this.mediaDona2['data']['datasets'][2]['data'][1]=0;
		this.mediaDona2.update();
	}
	setCt2RT(value,date){
		this.mediaDona2['data']['datasets'][0]['data'][2]=value;
		this.mediaDona2['data']['datasets'][2]['data'][2]=0;
		this.mediaDona2.update();
	}
	setCt2Pot(value,date){
		this.mediaDona2['data']['datasets'][0]['data'][3]=0;
		this.mediaDona2['data']['datasets'][2]['data'][3]=value;
		this.mediaDona2.update();
	}
	setCt2Rpm(value,date){
		this.mediaDona2['data']['datasets'][0]['data'][4]=0;
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
}
