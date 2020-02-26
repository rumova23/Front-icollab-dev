import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ThemeService } from 'src/app/core/globals/theme';
import { SecurityService } from 'src/app/core/services/security.service';
import { EventService } from 'src/app/core/services/event.service';
import { SocketService } from 'src/app/core/services/socket.service';
import { MonitoringTrService } from 'src/app/monitoring/services/monitoringTr.service';
import { ConnectSocketChannelComponent } from 'src/app/shared/socket/connectSocketChannel.component';
import { TrService } from 'src/app/safe/services/tr.service';
import { Chart } from 'chart.js';

@Component({
	selector: 'app-temperature',
	templateUrl: './temperature.component.html',
	styleUrls: ['./temperature.component.scss']
})
export class TemperatureComponent extends ConnectSocketChannelComponent implements OnInit {
	@ViewChild('canvas1') canvas1: ElementRef;
	charts=[];
	
	constructor(
		public globalService       : GlobalService,
		public theme               : ThemeService,
		public securityService     : SecurityService,
		public eventService        : EventService,
		public socketService       : SocketService,
		public monitoringTrService : MonitoringTrService,
		
		private trService: TrService,
	) {
		super(globalService, eventService, socketService, securityService);
	}
	ngOnDestroy() {
		this.connectSocketChannelNgOnDestroy();
	}
	ngOnInit() {
		this.subscribeSocketChannel(
			"weather",
			(data)=>this.inSocketData(data),
			()=>this.connected(),
			()=>this.disconnected()
			);
		this.subscribeSocketChannel(
			"forecast",
			(data)=>this.inSocketDataForecast(data),
			()=>this.connected(),
			()=>this.disconnected()
			);
		this.subscribeSocketChannel(
			"hourly",
			(data)=>this.inSocketData(data),
			()=>this.connected(),
			()=>this.disconnected()
			);
	}
	inSocketData(data:any){
		debugger;
	}
	inSocketDataForecast(data:any){
		let labels   = [];
		let chatdata = [];
		if(data.docs){

			labels = data.docs[0].data.DailyForecasts.map(d=>d.Date);
			chatdata.push( {
				backgroundColor: 'rgba(0, 174, 255, 0.3)',
				borderColor:'rgba(0, 174, 255, 1)',
				fill: true,
				label: "Forecast Minimum",
				//data: serie.data.map(d=>d[1]).reverse(),
				data: data.docs[0].data.DailyForecasts.map(d=>d.Temperature.Minimum.Value),
				yAxisID: 'y-axis-1'
			});
			chatdata.push( {
				backgroundColor: 'rgba(16, 209, 0, 0.3)',
				borderColor: 'rgba(16, 209, 0, 1)',
				fill: true,
				label: "Forecast Maximum",
				//data: serie.data.map(d=>d[1]).reverse(),
				data: data.docs[0].data.DailyForecasts.map(d=>d.Temperature.Maximum.Value),
				yAxisID: 'y-axis-1'
			});

			this.charts['canvas1'] = new Chart(
				this['canvas1'].nativeElement
				, this.chartCreateConfigDemo(chatdata, labels)
			);
			this.charts['canvas1'].update();
		}else{
			debugger;
		}
	}
	connected(){
		this.trService.getHourly(new Date().getTime()).subscribe((data)=>{});
		this.trService.getWeather(new Date().getTime()).subscribe((data)=>{});
		this.trService.getForecast(new Date().getTime()).subscribe((data)=>{this.inSocketDataForecast(data);});
	}
	disconnected(){
	}
	chartCreateConfigDemo(data: any[], labels) {
		return {
			type: 'line',
			data: {
				labels: labels,
				datasets: data
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					yAxes: [
						{
							//ticks: {min: 0,max: 500},
							//type: 'linear',
							display: true,
							position: 'left',
							id: 'y-axis-1',
						
							scaleLabel: {
								display: true,
								labelString: 'Temperatura'
							},
						},
					],
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Fecha'
						}
					}]
					
				}
			}
		};
	}
}
