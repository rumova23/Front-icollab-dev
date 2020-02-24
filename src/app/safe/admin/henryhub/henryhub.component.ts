import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MonitoringChartTR } from '../../../monitoring/class/monitoringChartTR.component';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ThemeService } from 'src/app/core/globals/theme';
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
		this.peticionget();
	}
	peticionget(){

		if(this.globalService.socketConnect){
			this.henryhubService.algo().subscribe(data => { });
		}
	}
	subscribeSocketHenryhub() {
		this.subscribeSocketChannel("henryhub",(data)=>this.mydataAdapter(data),()=>{this.peticionget();});
	}
	mydataAdapter(data: any) {
		this.data = [];
		let fechas = [];
		let chatdata = [];
		for (const serie of data.series) {
			if(serie.f=="M"){
				let obj:any = {
					backgroundColor: 'rgba(0, 174, 255, 0.3)',
					borderColor:'rgba(0, 174, 255, 1)',
					fill: true,
					label: serie.name,
					data: serie.data.map(d=>d[1]).reverse(),
					yAxisID: 'y-axis-1'
				}
				if(serie.series_id == "STEO.NGHHMCF.M"){
					obj.borderDash= [5, 5];
					obj.backgroundColor= 'rgba(16, 209, 0, 0.3)';
					obj.borderColor= 'rgba(16, 209, 0, 1)';
					this.data=serie.data.map(d=>{
						let anio    = +d[0].substring(0, 4);
						let mes     = +d[0].substring(4, 7);
						let fecha   = mes+ "/" + anio;
						return{fecha,precio:d[1]}
					});
				}
				if(serie.series_id == "NG.N3050TX3.M"){
					obj.backgroundColor= 'rgba(242, 203, 5, 0.3)';
					obj.borderColor= 'rgba(242, 203, 5, 1)';
				}
				chatdata.push(obj);
				if(serie.series_id == "STEO.NGHHMCF.M")fechas = serie.data.map(d=>{
					let anio    = +d[0].substring(0, 4);
					let mes     = +d[0].substring(4, 7);
					let fecha   = mes+ "/" + anio;
					return fecha;
				}).reverse();
			}
		}
		this.charts['canvas1'] = new Chart(
			this['canvas1'].nativeElement
			, this.chartCreateConfigDemo(chatdata, fechas)
		);
		this.charts['canvas1'].update();
		//this.data.reverse();
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
							//type: 'linear',
							display: true,
							position: 'left',
							id: 'y-axis-1',
							
							ticks: {
								min: 0
							},
							scaleLabel: {
								display: true,
								labelString: 'Precio'
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
