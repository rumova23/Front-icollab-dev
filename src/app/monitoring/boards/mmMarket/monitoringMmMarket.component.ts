import { Component, OnInit, OnDestroy }    from '@angular/core';
import { Chart }                           from 'chart.js';
import { GlobalService }                   from 'src/app/core/globals/global.service';
import { ThemeService }                    from 'src/app/core/globals/theme';
import { EventService }                    from 'src/app/core/services/event.service';
import { SocketService }                   from 'src/app/core/services/socket.service';
import { MonitoringBaseSocketOnComponent } from 'src/app/monitoring/class/monitoringBaseSocketOn.component';
import { ChartControl }                    from 'src/app/monitoring/models/ChartControl';
import * as TAGS                           from 'src/app/monitoring/boards/mmMarket/config';
import * as BasChart                       from 'src/app/monitoring/helpers/monitoringBaseChart.component';


@Component({
  selector: 'app-monitoringMmMarket',
  templateUrl: './monitoringMmMarket.component.html',
  styleUrls: ['./monitoringMmMarket.component.scss']
})
export class MonitoringMmMarketComponent extends MonitoringBaseSocketOnComponent implements OnInit,OnDestroy  {
	calltags  = []; 
	charts    : Array<Chart> = [];
	data_01 = null;
	data_02 = null;

  
	constructor(
		public globalService        : GlobalService ,
		public theme                : ThemeService  ,
		public eventService         : EventService  ,
		public socketService        : SocketService
	) {
		super(globalService,eventService,socketService);

		/**
		 * el icono de conectado tendra que tener la siguiente condicion 
		 * if(globalService.socketConnect && this.PiIsRun)
		 */
	}
	  
	ngOnInit() {
		this.initializeAt0();
		this.chartInit();

		this.subscribeEverySecond();
		this.subscribeSocketOnStatus();
		this.subscribeSocketChanels();
	}
	initializeAt0(){
		for (const local_tag_key in TAGS.lstTags) {
			if (TAGS.lstTags.hasOwnProperty(local_tag_key)) {
				this.calltags[local_tag_key]   = 0;
			}
		}
	}
	chartInit(){
		for (const idChart in TAGS.listCharts) {
			if (TAGS.listCharts.hasOwnProperty(idChart)) {
				this.createChart(idChart);
			}
		}
	}	
	subscribeSocketChanels(){
		if(this.globalService.socketConnect){
			this.subscribeSocketChanelMmMarketAguila();
		}
	}

	createChart(idChart){
		TAGS.listCharts[idChart]['controls'] = {
			idChart        : idChart,
			type_graph     : 'line',
			type_scale     : 'dynamic',
			fill           : 'false',
			data_per_graph : 24,
			point_radius   : 3,
			time_refreseh  : 3,
			displayLegend  : true,
			timePast       : new Date()
		};
		this.charts[idChart]= new Chart(idChart, BasChart.chartCreateConfig(TAGS.listCharts[idChart]['controls']));
		this.charts[idChart].data.labels = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"];
	}
	getchartControl(idChart){
		return TAGS.listCharts[idChart]?TAGS.listCharts[idChart]['controls'] : {idChart:false};
	}

	dataAdapter(data){
		console.log(data);
		this.data_01 = data;
		
		this.addDataToChart();
	}
	updateLocalTagValue(data){
		//let ii = Object.keys(TAGS.lstTags).length;
		for(const web_Plant in data){
			if(data.hasOwnProperty(web_Plant) && !["name","_id","_rev"].includes(web_Plant)){
				for(const web_Tag of data[web_Plant]['tags']['Items']){
					for (const local_Tag in TAGS.lstTags) {
						if (TAGS.lstTags.hasOwnProperty(local_Tag)) {
							const element = TAGS.lstTags[local_Tag];
							for (const local_webIds of element[web_Plant]) {
								if(local_webIds.WebId == web_Tag.WebId){
									local_webIds.WebTag = web_Tag;
								}
							}
						}
					}
				}
			}
		}
	}
	updateLocalTagOverView(){
		for (const local_tag_key in TAGS.lstTags) {
			if (TAGS.lstTags.hasOwnProperty(local_tag_key)) {
			}
		}
	}
	addDataToChart(){
		for (const idChart in TAGS.listCharts) {
			if (TAGS.listCharts.hasOwnProperty(idChart)) {
			
					TAGS.listCharts[idChart]['controls']['timePast'] = new Date();
					this.addDatasetLine(idChart);
					this.addDatasetLine2(idChart);
					this.addDatasetLine3(idChart);
					
			}
		}
	}

	addDatasetLine(idChart){
			let lst = [];
			for (const iterator of this.data_01.data.PPA) {
				lst.push(iterator.prediction);	
			}
			console.log(lst);
			
			let datasetTag = BasChart.getDatasetTag(this.charts[idChart].data.datasets, "chart_01");
			let tagconf    = TAGS.lstTags["PowerOutput"];
			if(datasetTag == undefined){
		
				var hex  = tagconf.color;
				let rgba = BasChart.hexToRGB(tagconf.color,0.3);
		
				var newDataset = {
					id:"chart_01",
					rgba:rgba,
					label: tagconf.label,
					backgroundColor: rgba,
					borderColor: hex,
					data: lst,
					fill: false,
					hidden:false,
					yAxisID: "01"
				};
				var newYaxis = {
					id: "01",
					display: true,
					position: 'left',
					ticks:{
						fontColor:hex,
						fontSize:12,
						//min: tagconf.min,
						//max: tagconf.max,
						//beginAtZero: false
					},
					gridLines:{
						color:"rgb(52, 58, 64)",
						display: false,
					},
					
				};
				
				this.charts[idChart].data.datasets.push(newDataset);
				this.charts[idChart].config.options.scales.yAxes.push(newYaxis);
				
				//console.log(this.charts[chart].data.datasets);
				
			}else{
				
				/**Para la grafica tipo  line , bar*/
				/*
				(datasetTag.data as number[]).push(chartTag.value());
				//tag.data.push(data);
				if(datasetTag.data.length > chart.controls.data_per_graph){
					datasetTag.data.shift();
				}
				//*/

				/**Para la grafica tipo  horizontalBar*/
				(datasetTag.data as number[])=lst;
			}
			
		this.charts[idChart].update();
		//console.log(this.charts);
		//console.log(this.charts['chart_est_power_01'].data);
	}
	addDatasetLine2(idChart){
		if(this.data_01 != null){
			let lst = [];
			for (const iterator of this.data_01.data['Capacidad Excedente']) {
				lst.push(iterator.prediction);	
			}
			console.log(lst);
			
			let datasetTag = BasChart.getDatasetTag(this.charts[idChart].data.datasets, "chart_02");
			let tagconf    = TAGS.lstTags["CapacityFactor"];
			if(datasetTag == undefined){
		
				var hex  = tagconf.color;
				let rgba = BasChart.hexToRGB(tagconf.color,0.3);
		
				var newDataset = {
					id:"chart_02",
					rgba:rgba,
					label: tagconf.label,
					backgroundColor: rgba,
					borderColor: hex,
					data: lst,
					fill: false,
					hidden:false,
					yAxisID: "02"
				};
				var newYaxis = {
					id: "02",
					display: true,
					position: 'left',
					ticks:{
						fontColor:hex,
						fontSize:12,
						//min: tagconf.min,
						//max: tagconf.max,
						//beginAtZero: false
					},
					gridLines:{
						color:"rgb(52, 58, 64)",
						display: false,
					},
					
				};
				
				this.charts[idChart].data.datasets.push(newDataset);
				this.charts[idChart].config.options.scales.yAxes.push(newYaxis);
				
				//console.log(this.charts[chart].data.datasets);
				
			}else{
				
				/**Para la grafica tipo  line , bar*/
				/*
				(datasetTag.data as number[]).push(chartTag.value());
				//tag.data.push(data);
				if(datasetTag.data.length > chart.controls.data_per_graph){
					datasetTag.data.shift();
				}
				//*/

				/**Para la grafica tipo  horizontalBar*/
				(datasetTag.data as number[])=lst;
			}
			
		this.charts[idChart].update();
		//console.log(this.charts);
		//console.log(this.charts['chart_est_power_01'].data);
		}
	}
	addDatasetLine3(idChart){
		
		if(this.data_01 != null){
			let lst = [];
			for (const iterator of this.data_01.data['Potencia Real Demostrada']) {
				lst.push(iterator.prediction);	
			}
			console.log(lst);
			let datasetTag = BasChart.getDatasetTag(this.charts[idChart].data.datasets, "chart_03");
			let tagconf    = TAGS.lstTags["getCTUnoRT"];
			if(datasetTag == undefined){
		
				var hex  = tagconf.color;
				let rgba = BasChart.hexToRGB(tagconf.color,0.3);
		
				var newDataset = {
					id:"chart_03",
					rgba:rgba,
					label: tagconf.label,
					backgroundColor: rgba,
					borderColor: hex,
					data: lst,
					fill: false,
					hidden:false,
					yAxisID: "03"
				};
				var newYaxis = {
					id: "03",
					display: true,
					position: 'left',
					ticks:{
						fontColor:hex,
						fontSize:12,
						//min: tagconf.min,
						//max: tagconf.max,
						//beginAtZero: false
					},
					gridLines:{
						color:"rgb(52, 58, 64)",
						display: false,
					},
					
				};
				
				this.charts[idChart].data.datasets.push(newDataset);
				this.charts[idChart].config.options.scales.yAxes.push(newYaxis);
				
				//console.log(this.charts[chart].data.datasets);
				
			}else{
				
				/**Para la grafica tipo  line , bar*/
				/*
				(datasetTag.data as number[]).push(chartTag.value());
				//tag.data.push(data);
				if(datasetTag.data.length > chart.controls.data_per_graph){
					datasetTag.data.shift();
				}
				//*/

				/**Para la grafica tipo  horizontalBar*/
				(datasetTag.data as number[])=lst;
			}
			
		this.charts[idChart].update();
		//console.log(this.charts);
		//console.log(this.charts['chart_est_power_01'].data);
		}
	}
	cleanDataofCharts(){
		for (const chart in this.charts) {
			for (const dataset of this.charts[chart].data.datasets) {
				dataset.data = [];
			}
			this.charts[chart].update();
		}
	}
	whenLosingConnection(){
		this.initializeAt0();
		this.cleanDataofCharts();
	}
	modifyChart(event){
		// event es de tipo ChartControl
		TAGS.listCharts[event.idChart]['controls'] = event;

		BasChart.change_data_per_graph ( this.charts[event.idChart], TAGS.listCharts[event.idChart] );
		BasChart.change_typa_chart     ( this.charts[event.idChart], TAGS.listCharts[event.idChart] );
		BasChart.changeFill            ( this.charts[event.idChart], TAGS.listCharts[event.idChart] );
		BasChart.change_point_radius   ( this.charts[event.idChart], TAGS.listCharts[event.idChart] );
		BasChart.change_type_scale     ( this.charts[event.idChart], TAGS.listCharts[event.idChart], TAGS.lstTags );
		BasChart.chart_update          ( this.charts[event.idChart] );
	}

  }
  