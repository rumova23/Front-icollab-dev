import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MonitoringChartTR } from '../../../monitoring/class/monitoringChartTR.component';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ThemeService } from 'src/app/core/globals/theme';
import { GraficaDosaService } from 'src/app/monitoring/boards/demo-grafica-dos/service/grafica-dosa.service';
import { EventService } from 'src/app/core/services/event.service';
import { SocketService } from 'src/app/core/services/socket.service';
import { MonitoringTrService } from 'src/app/monitoring/services/monitoringTr.service';
import { HenryhubService } from '../../services/henryhub.service';
import { Chart } from 'chart.js';

@Component({
	selector: 'app-henryhub',
	templateUrl: './henryhub.component.html',
	styleUrls: ['./henryhub.component.scss']
})
export class HenryhubComponent extends MonitoringChartTR implements OnInit {
	
	@ViewChild('canvas1') canvas1: ElementRef;
	charts = [];

	constructor(
		public globalService: GlobalService,
		public theme: ThemeService,
		private graficaDosaService: GraficaDosaService,
		private henryhubService: HenryhubService,

		public eventService: EventService,
		public socketService: SocketService,
		public monitoringTrService: MonitoringTrService
	) {
		super(globalService, eventService, socketService, monitoringTrService);
	}
	ngOnInit() {
		this.subscribeSocketHenryhub();
		this.henryhubService.algo().subscribe(data=>{});
	}
	
	subscribeSocketHenryhub(){
		let strChannel    : string = "henryhub"
		let strChannelErr : string = `${strChannel}-error`;
		let channel       = this.socketService.suscribeChannel(strChannel);


		this.addSubscriptionsPerChannel([strChannel, strChannelErr]);
		this.addChanels([strChannel]);

		this.subscriptions[strChannelErr] = this.socketService.onChannelError(channel - 1).subscribe((errorChannel: any) => {console.log(strChannelErr,errorChannel);});
		this.subscriptions[strChannel]    = this.socketService.onChannelWatch(channel - 1)
		.subscribe((data) => {
			this.dataAdapter(data);
		});
	}
	dataAdapter(data:any){
		let fechas = [];
		let chatdata = [
			{
				backgroundColor:'rgba(255, 99, 132, 1)',
				label:"HenryHub",
				data:[],
				yAxisID: 'y-axis-1'
			},
		];
		for (const serie of data.series) {
			for (const value of serie.data) {
				let fecha  = value[0];
				let precio = value[1];
				fechas.push(fecha);
				chatdata[0].data.push(precio);
			}
		}
		this.charts['canvas1'] = new Chart(
			this['canvas1'].nativeElement
		   ,this.chartCreateConfigDemo(chatdata,fechas)
	   	);
	}
	
	chartCreateConfigDemo(data:any[],fechas){
		return{
			type: 'line', 
			data: {
				labels: fechas,
				datasets: data
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					yAxes: [
						{
							//ticks: {min: 0,max: 500},
							type: 'linear', 
							display: true,
							position: 'left',
							id: 'y-axis-1',
						},						
					]
				}
			}
		};
	}

}
