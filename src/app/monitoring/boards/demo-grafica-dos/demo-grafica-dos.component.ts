import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ThemeService } from 'src/app/core/globals/theme';
import { Chart } from 'chart.js';
import { GraficaDosaService } from './service/grafica-dosa.service';
import { MonitoringChartTR } from '../../class/monitoringChartTR.component';
import { EventService } from 'src/app/core/services/event.service';
import { SocketService } from 'src/app/core/services/socket.service';
import { MonitoringTrService } from '../../services/monitoringTr.service';
import { PiServerBox } from '../../models/piServer/piServerBox';

@Component({
  selector: 'app-demo-grafica-dos',
  templateUrl: './demo-grafica-dos.component.html',
  styleUrls: ['./demo-grafica-dos.component.scss']
})
export class DemoGraficaDosComponent extends MonitoringChartTR implements OnInit {
	@ViewChild('canvas1') canvas1:ElementRef;
	charts = [];

	constructor(
		public globalService       : GlobalService,
		public theme               : ThemeService,
		private graficaDosaService : GraficaDosaService,
		
        public eventService        : EventService,
        public socketService       : SocketService,
        public monitoringTrService : MonitoringTrService
	) {
        super(globalService, eventService, socketService, monitoringTrService);
	}

	ngOnInit() {
		this.graficaDosaService.getData().subscribe(
			(data:any[])=>{
				data.map(x=>{
					x.fill=false;
					x.borderColor=x.backgroundColor;
					x.borderWidth = 1;
					return x;
				});
				this.charts['canvas1'] = new Chart(
					 this['canvas1'].nativeElement
					,this.chartCreateConfigDemo(data)
				);
			}
		);
		this.subscribeSocketChanelAguila();
	}
	chartCreateConfigDemo(data:any[]){
		return{
			type: 'line', 
			data: {
				labels: new Array(     data[0].data.length    ).fill(0).map((_valor,indice)=>indice),
				datasets: data
			},
			options: {
				scales: {
					yAxes: [
						{
							ticks: {min: 0,max: 500},
							type: 'linear', 
							display: true,
							position: 'left',
							id: 'y-axis-1',
						},
						
						{
							ticks: {min: 0,max: 50},
							type: 'linear', 
							display: true,
							position: 'left',
							id: 'y-axis-2',
						}
					]
				}
			}
		};
	}

	
	subscribeSocketChanelAguila(){
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
		debugger;
	}
}
