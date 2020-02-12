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
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DatePipe } from '@angular/common';
import { ConnectSocketChannelComponent } from 'src/app/shared/socket/connectSocketChannel.component';
import { SecurityService } from 'src/app/core/services/security.service';

@Component({
	selector: 'app-henryhub',
	templateUrl: './henryhub.component.html',
	styleUrls: ['./henryhub.component.scss']
})
export class HenryhubComponent extends ConnectSocketChannelComponent implements OnInit {

	@ViewChild('canvas1') canvas1: ElementRef;
	charts = [];

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	dataSource;
	data: any[] = [];
	displayedColumnsOrder: any[] = [
		{ key: 'fecha', label: 'fecha' },
		{ key: 'precio', label: 'precio' }];
	displayedColumnsActions: any[] = [];
	columnsToDisplay: string[] = [
		'fecha',
		'precio'];
	row_x_page = [50, 100, 250, 500];

	constructor(
		public globalService: GlobalService,
		public theme: ThemeService,
		private graficaDosaService: GraficaDosaService,
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
		//aqui hay alguna variable para detectar si ya se abrio el socket , revisar
		//usar la variable 
		this.subscribeSocketHenryhub();
		this.henryhubService.algo().subscribe(data => { });

	}

	subscribeSocketHenryhub() {
		//this.subscribeSocketChannel("henryhub");
		///*
		console.log("this.globalService.socketConnect",this.globalService.socketConnect);
		
		//if(this.globalService.socketConnect){
			let strChannel    : string = "henryhub"
			let strChannelErr : string = `${strChannel}-error`;
			let channel                = this.socketService.suscribeChannel(strChannel);
	
			this.addSubscriptionsPerChannel([strChannel, strChannelErr]);
			this.addChanels([strChannel]);
	
			this.subscriptions[strChannelErr] = this.socketService.onChannelError(channel - 1).subscribe((errorChannel: any) => { console.log(strChannelErr, errorChannel); });
			this.subscriptions[strChannel]    = this.socketService.onChannelWatch(channel - 1)
				.subscribe((data) => {
					this.dataAdapter(data);
				});
		//}
		//*/
	}
	dataAdapter(data: any) {
		debugger;
		this.data = [];
		let fechas = [];
		let chatdata = [
			{
				backgroundColor: 'rgba(199, 225, 229, 1)',
				borderColor:'rgba(199, 225, 229, 1)',
				fill: false,
				label: "HenryHub",
				data: [],
				yAxisID: 'y-axis-1'
			},
			{
				backgroundColor: 'rgba(202, 229, 199, 1)',
				borderColor: 'rgba(202, 229, 199, 1)',
				fill: false,
				borderDash: [5, 5],
				label: "forecast",
				data: [],
				yAxisID: 'y-axis-1'
			},
		];
		for (const serie of data.series) {
			serie.data = serie.data.reverse();
			for (const value of serie.data) {
				let anio    = +value[0].substring(0, 4);
				let mes     = +value[0].substring(4, 7);
				let fecha0  = +value[0];
				let fecha   = anio+ "-" + mes;
				let precio  = value[1];
				let hoy     = new Date();
				let hoymes  = hoy.getMonth();
				let hoyanio = hoy.getFullYear();
				let dates   = new Date(anio+ "-" + mes+"-01");
				if(dates.getTime() < hoy.getTime()){
					chatdata[0].data.push({
						x: fecha0,
						y: precio});
				}else{
					if(chatdata[1].data.length == 0){
						chatdata[1].data.push(chatdata[0].data[chatdata[0].data.length-1]);
					}
					chatdata[1].data.push({
						x: fecha0,
						y: precio});
				}
				//debugger;

				fechas.push(fecha0);
				this.data.push({ fecha, precio });
			}
		}
		this.charts['canvas1'] = new Chart(
			this['canvas1'].nativeElement
			, this.chartCreateConfigDemo(chatdata, fechas)
		);
		this.data.reverse();
		this.dataSource = new MatTableDataSource<any>(this.data);
		this.dataSource.paginator = this.paginator;
	}

	chartCreateConfigDemo(data: any[], fechas) {
		return {
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
