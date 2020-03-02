import { Component, OnInit, OnDestroy } from '@angular/core';
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

@Component({
	selector: 'app-phase3v2',
	templateUrl: './phase3v2.component.html',
	styleUrls: ['./phase3v2.component.scss']
})
export class Phase3v2Component extends ConnectSocketChannelComponent implements OnInit, OnDestroy {

	LineChart :Chart ;  //grafica
	mediaDona1 = []; //MediaDona1
	mediaDona2 = []; //Media Dona en medio
	mediaDona3 = []; //Media Dona en final
	mediaDonaIntermedia1 = [];
	
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
				responsive: true,
				datasets: [
					{
						data: [80, 30, 60, 70, 80, 20],
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
						data: [10],
						backgroundColor: [
							'rgba(0,0,0)',

						],
						borderWidth: 0,
						borderColor: [
							'rgba(0,0,0)',
						],

					},

					{
						data: [80, 30, 60, 70, 80, 20],
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
			responsive: true,
			data: {
				datasets: [
					{
						data: [50, 30, 60, 30, 70, 60],
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
						data: [50, 30, 60, 30, 70, 60],
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
			responsive: true,
			data: {

				datasets: [
					{
						data: [50, 30, 60, 70, 85, 50],
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
						data: [50, 30, 60, 70, 85, 50],
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
					position: 'left'
				},
				animation: {
					animateRotate: false,
					animateScale: true
				}
			}

		});
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
}
