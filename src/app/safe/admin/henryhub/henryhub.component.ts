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
import * as Highcharts from "highcharts";
import { FormGroup } from '@angular/forms';


@Component({
	selector: 'app-henryhub',
	templateUrl: './henryhub.component.html',
	styleUrls: ['./henryhub.component.scss']
})
export class HenryhubComponent extends ConnectSocketChannelComponent implements OnInit {
	@ViewChild('charthenryhub') charthenryhub: ElementRef;
	@ViewChild('canvas1') canvas1: ElementRef;
	charthenryhubobj;
	charts = [];	
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	filterDatesFormGroup: FormGroup;
	
	dataSource;
	data: any[] = [];
	displayedColumnsOrder: any[] = [
		{ key: 'serie', label: 'Serie' },
		{ key: 'fecha', label: 'Fecha' },
		{ key: 'precio', label: 'Precio' }];
	displayedColumnsActions: any[] = [];
	columnsToDisplay: string[] = [
		'serie',
		'fecha',
		'precio'];
	row_x_page = [50, 100, 250, 500];
	seriesOptions=[];
	public opt: any =  {
		
		time: {
			timezone: 'America/Mexico_City',
			useUTC: false
		},
        rangeSelector: {
			selected: 3,
			inputEnabled: false,
			buttons: [{
				type: 'month',
				count: 1,
				text: '1m'
			}, {
				type: 'month',
				count: 3,
				text: '3m'
			}, {
				type: 'month',
				count: 6,
				text: '6m'
			}, {
				type: 'year',
				count: 2,
				text: '2y'
			}, {
				type: 'year',
				count: 1,
				text: '1y'
			}, {
				type: 'ytd',
				text: 'YTD'
			}, {
				type: 'all',
				text: 'All'
			}]
        },
		xAxis: {
			type: 'datetime'
		},
	
		tooltip: {
			xDateFormat: '%Y-%m-%d',
			shared: true
		},
        yAxis: {
            labels: {
                formatter: function () {
                    return this.value + '$';
                }
            }
        },

		legend: {
			enabled:true
		},
        plotOptions: {
            series: {
                showInNavigator: true
            }
        },


        series: this.seriesOptions, 
	};
	seriesCounter=0;
	dateIni=null;
	dateFin=null;
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
	success(data) {
		//debugger;
		var name = "casa";
		var i = this.seriesCounter;
		this.seriesOptions[i] = {
			name: name,
			data: data
		};
	
		// As we're loading the data asynchronously, we don't know what order it
		// will arrive. So we keep a counter and create the chart when all the data is loaded.
		this.seriesCounter += 1;
	/*
		if (seriesCounter === names.length) {
			createChart();
		}
		//*/
	}
	ngOnInit() {
		let lang :any = {
			loading: 'Cargando...',
			months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
			weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
			shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
			exportButtonTitle: "Exportar",
			printButtonTitle: "Importar",
			rangeSelectorFrom: "Desde",
			rangeSelectorTo: "Hasta",
			rangeSelectorZoom: "Período",
			downloadPNG: 'Descargar imagen PNG',
			downloadJPEG: 'Descargar imagen JPEG',
			downloadPDF: 'Descargar imagen PDF',
			downloadSVG: 'Descargar imagen SVG',
			printChart: 'Imprimir',
			resetZoom: 'Reiniciar zoom',
			resetZoomTitle: 'Reiniciar zoom',
			thousandsSep: ",",
			decimalPoint: '.'
		} ;
		Highcharts.setOptions({lang});
		
		this.filterDatesFormGroup = new FormGroup({});
		
		this.subscribeSocketHenryhub();
		this.peticionget();
		
		Highcharts.getJSON(
			'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/msft-c.json',
			this.success
		);
	}
	peticionget(){

		if(this.globalService.socketConnect){
			this.henryhubService.algo().subscribe(data => { });
		}
	}
	subscribeSocketHenryhub() {
		this.subscribeSocketChannel(
			"henryhub",
			(data)=>this.mydataAdapter(data),
			()=>{this.peticionget();},
			()=>{}
			);
	}
	
	ordenar (arr){
		const l = arr.length;
		let j, temp;
	  
		for ( let i = 1; i < l; i++ ) {
		  j = i;
		  temp = arr[ i ];
		  while ( j > 0 && arr[ j - 1 ][0] > temp[0] ) {
			arr[ j ] = arr[ j - 1 ];
			j--;
		  }
		  arr[ j ] = temp;
		}
	  
		return arr;
	}
	mydataAdapter(dataAdapter: any) {
		let i =0;
		for (const serie of dataAdapter.series) {
			let  marker={
				enabled: true,
				radius: 3
			};
			let lineWidth = 1;
			let dataSerie = serie.data.map(d=>{
				let anio    = +d[0].substring(0, 4);
				let mes     = +d[0].substring(4, 6);
				let dia     = 1;
				if(serie.f=="M"){
				}else if(serie.f=="D"){
					marker.radius = 1;
					//lineWidth = 0;
					dia     = +d[0].substring(6, 8);
				}
				let fecha   = anio+ "/" + mes+"/"+dia;

				this.data.push({
					serie:serie.name,
					fecha:this.datePipe.transform(new Date(fecha), 'dd/MM/yyyy'),
					precio:d[1]
				});
				return[new Date(fecha).getTime(),d[1]];
			});
			this.seriesOptions[i] = {
				name: serie.name,
				data: this.ordenar(dataSerie),
				marker,
				lineWidth
			};

			i+=1;
		}
		this.charthenryhubobj = Highcharts.stockChart(this.charthenryhub.nativeElement, this.opt);

		
		this.dataSource = new MatTableDataSource<any>(this.data);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	mydataAdapterOld(data: any) {
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

	dateChangeIni(event) {
		this.dateIni = event.value;
		if (this.dateFin != null) {
			if (this.dateIni.getTime() >= this.dateFin.getTime()) {
				this.dateFin = new Date(this.dateIni);
			}
		}
	}
	dateChangeFin(event) {
		this.dateFin = event.value;
	}
	searchTagsFromTo(){
		let i = this.datePipe.transform(this.dateIni, 'yyyy-MM-dd');
		let f = this.datePipe.transform(this.dateFin, 'yyyy-MM-dd');
		this.henryhubService.getFromTo(i,f).subscribe(series=>{
			this.data=[];
			this.seriesOptions=[];
			let i =0;
			for (const serie of series) {
					
				let  marker={
					enabled: true,
					radius: 3
				};
				let lineWidth = 1;
				let dataSerie = serie.henryHubDatas.map(d=>{
					this.data.push({
						serie:serie.name,
						fecha:this.datePipe.transform(new Date(d.dataDate), 'dd/MM/yyyy'),
						precio:d.value
					});
					if(serie.f=="D"){
						marker.radius = 1;
					}
					return[new Date(d.dataDate).getTime(),d.value];
				});
				this.seriesOptions[i] = {
					name: serie.name,
					data: this.ordenar(dataSerie),
					marker,
					lineWidth
				};

				i+=1;
			}
			this.opt.series=this.seriesOptions;
			this.charthenryhubobj = Highcharts.stockChart(this.charthenryhub.nativeElement, this.opt);
			
			this.dataSource = new MatTableDataSource<any>(this.data);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		});
	}
}
