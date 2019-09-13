import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from  'src/environments/environment';
import { EventService } from 'src/app/core/services/event.service';
import { Chart } from 'chart.js';
import { GlobalService } from 'src/app/core/globals/global.service';
import { SocketService } from 'src/app/core/services/socket.service';
import { ThemeService } from 'src/app/core/globals/theme';
import { MonitoringBaseSocketOnComponent } from 'src/app/monitoring/class/monitoringBaseSocketOn.component';
import { ChartControl } from 'src/app/monitoring/models/ChartControl';
import * as TAGS from './config';
import * as BasChart from '../../helpers/monitoringBaseChart.component';


@Component({
  selector: 'app-monitoringPhase2',
  templateUrl: './monitoringPhase2.component.html',
  styleUrls: ['./monitoringPhase2.component.scss']
})
export class MonitoringPhase2Component extends MonitoringBaseSocketOnComponent implements OnInit,OnDestroy  {
	wifi             : boolean = false;
	calltags         = []; 
	charts           : Array<Chart>        = [];
	chartsControls   : Array<ChartControl> = [];
	tagsPerChart     : Array<ChartControl> = [];

  
	constructor(
		public globalService        : GlobalService ,
		public theme                : ThemeService  ,
		public eventService         : EventService  ,
		public socketService        : SocketService
	) {
		super(globalService,eventService,socketService);
	}
	  
	ngOnInit() {
		this.initializeAt0();
		this.chartInit();

	
		this.subscribeEverySecond();
		this.subscribeSocketOnStatus();
		this.subscribeSocketChanels();
	}
	puebafuncionllamadodesdehijo(event){
		console.log(event);
		
	}
	initializeAt0(){
		for (const calltag in TAGS.lstTags) {
			if (TAGS.lstTags.hasOwnProperty(calltag)) {
			this.calltags[calltag] = 0;
			}
		}
	}
	chartInit(){

		
		//this.chart_est_power_01    = new Chart('chart_est_power_01'     , this.chart_config_1);
		//this.chart_rt    = new Chart('chart_rt'    , TAGS.chart_config_rt);
		//this.chart_rpm   = new Chart('chart_rpm'   , TAGS.chart_config_rpm);
		//this.charts['chart_mw']= new Chart('chart_mw'    ,  BasChart.chartCreateConfig());
		
		//this.charts['chart_est_power_01']= new Chart('chart_est_power_01'    ,  TAGS.chart_config_rt);
		//this.chart_mw    = new Chart('chart_mw'    ,  BasChart.chartCreateConfig());
		//this.chart_est_power_01 = new Chart('chart_est_power_01' ,  BasChart.chartCreateConfig());
		//this.chart_modal = new Chart('canvas_modal',this.chart_modal_config);
		this.createChart('chart_est_power_01');
		this.createChart('chart_mw');
		//console.log(this.chartsControls);
	}
	createChart(idChart){
		this.charts[idChart]= new Chart(idChart, BasChart.chartCreateConfig());
		
		this.chartsControls[idChart]={
			idChart        : idChart,
			type_graph     : 'line',
			type_scale     : 'dynamic',
			fill           : 'false',
			data_per_graph : 3,
			point_radius   : 3,
			time_refreseh  : 3,
			timePast       : new Date()
		};
	}



	dataAdapter(data){
		/*
		if(  this.check_time_refreseh_data() ){
			this.timePast = new Date();
			this.dataAdapter(data);
		}//*/
		for (const calltag in TAGS.lstTags) {
			if (TAGS.lstTags.hasOwnProperty(calltag)) {
				let PItag = null;
		
				const tagconf  = TAGS.lstTags[calltag];
				const webID    = (this.globalService.plant.name === "AGUILA")?tagconf.webId_EAT:tagconf.webId_EST;
				
				for(const tag of data.tags.Items){
					if(tag.WebId == webID){
						PItag = tag;
						break;
					}
				}
				if(PItag != null){
					if(tagconf.calltags=='getPresionAtmosferica')this.wifi = true;
					this.calltags[tagconf.calltags]          = PItag.Value.Value;
					this.addDatasetLine ('chart_est_power_01', tagconf, PItag, ['getTemperaturaAmbiente']);
					this.addDatasetLine ('chart_mw', tagconf, PItag, ['getRegimenTermico']);
				}else{
					if(tagconf.calltags=='getPresionAtmosferica')this.wifi = false;
					this.calltags[tagconf.calltags]          = 0;
				}
			}
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
		this.wifi = false;
		this.initializeAt0();
		this.cleanDataofCharts();
	}


	updateChartMain(form){
		///*
		this.chartsControls['chart_est_power_01'].data_per_graph 
		= new Array(form.value.data_per_graph_main);
		this.chartsControls['chart_est_power_01'].time_refreseh
		= form.value.time_refreseh_data;
		this.chartsControls['chart_est_power_01'].data_per_graph
		= form.value.data_per_graph_main;
		this.chartsControls['chart_est_power_01'].type_scale
		= form.value.dynamic_scale;
		this.chartsControls['chart_est_power_01'].fill
		= form.value.chart_01_fill;
		this.chartsControls['chart_est_power_01'].point_radius
		= form.value.chart_01_point_radius;
		//*/
		/* Si el "data_per_graph_main" es menor a lo que existe
		* esto eliminara los elementos del inicio que sibren 
		* para pintar la grafica 
		*/
		///*
		this.charts['chart_est_power_01'].data.datasets.forEach(function(element) {
			debugger;
		if(form.value.data_per_graph_main < element.data.length){
			debugger;
			element.data = element.data.slice(
			element.data.length - form.value.data_per_graph_main
			,element.data.length);
		}
		});//*/
		this.charts['chart_est_power_01'].config.options.elements.point.radius = this.chartsControls['chart_est_power_01'].point_radius;
		/*
		this.change_graph_dynamic_scale();


		this.chart_01.config.type = form.value.type_graph_main;
		switch(form.value.type_graph_main){
			case "line":
				for (const iterator in this.dataset_main) {
					this.dataset_main[iterator]['backgroundColor']=this.dataset_main[iterator]['rgba'];
				}
			break;
			case "bar":
				for (const iterator in this.dataset_main) {
					this.dataset_main[iterator]['backgroundColor']=this.dataset_main[iterator]['borderColor'];
				}
			break;
		}

		for (const iterator in this.dataset_main) {
			this.dataset_main[iterator]['fill'] = this.chart_01_fill;
		}
		//*/
		//this.charts['chart_est_power_01'].update();
		//this.showDropdownchart_01 = false;
	}

	addDatasetLine(idChart, tagconf, PItag, tags){
		//if(this.check_time_refreseh_data(this.chartsControls[idChart].time_refreseh ,this.chartsControls[idChart].timePast) ){
		//	this.chartsControls[idChart].timePast = new Date();
			if(tags.includes(tagconf.calltags)){
				let datasetTag = BasChart.getDatasetTag(this.charts[idChart].data.datasets,tagconf.calltags);
				if(datasetTag == undefined){
			
					var hex  = tagconf.color;
					let rgba = BasChart.hexToRGB(tagconf.color,0.3);
			
					var newDataset = {
						id:tagconf.calltags,
						rgba:rgba,
						label: tagconf.label,
						backgroundColor: hex,
						borderColor: hex,
						data: [PItag.Value.Value],
						fill: false,
						hidden:false,
						yAxisID: tagconf.calltags
					};
					var newYaxis = {
						id: tagconf.calltags,
						display: true,
						position: 'left',
						ticks:{
							fontColor:hex,
							fontSize:12,
							min: tagconf.min,
							max: tagconf.max,
							beginAtZero: false
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
					///*
					(datasetTag.data as number[]).push(PItag.Value.Value);
					//tag.data.push(data);
					if(datasetTag.data.length > this.chartsControls[idChart].data_per_graph){
						datasetTag.data.shift();
					}
					//*/
	
					/**Para la grafica tipo  horizontalBar*/
					//(datasetTag.data as number[])=[PItag.Value.Value];
				}
				this.charts[idChart].update();
				
			}
		//}
		//console.log(this.charts);
		//console.log(this.charts['chart_est_power_01'].data);
	}
	private generateDataset(){
		/*
		var hex  = tagconf.color;
		let rgba = BasChart.hexToRGB(tagconf.color,0.3);
		return {
			id:calltag,
			rgba:rgba,
			label: tagconf.label,
			backgroundColor: rgba,
			borderColor: hex,
			data: [data],
			fill: false,
			hidden:false,
			yAxisID: calltag
		};//*/
	}
	addDataset(tagconf,calltag,data){
		let chart_est_power_01:Chart;
		let existDataset = function (tag) {
			return (tag.id === calltag);
		};
		let hiddenDataset = function(){
		switch(calltag) {
			case "getPotenciaNeta":
			case "getPotenciaCCDV":
			case "getRegimenTermico":
			return false;
			default:
			return true;
		}
		}
		let displayYAxis = function(){
		//return false;
		switch(calltag) {
			case "getPotenciaNeta":
			case "getPotenciaCCDV":
			case "getRegimenTermico":
			return true;
			default:
			return false;
		}
		}
		
		let tag = chart_est_power_01.data.datasets.find(existDataset);
		if(tag == undefined){
			let hex  = tagconf.color;
			let rgba = BasChart.hexToRGB(tagconf.color,0.3);

			var newDataset = {
				id:calltag,
				rgba:rgba,
				label: TAGS.lstTags[calltag].label,
				backgroundColor: rgba,
				borderColor: hex,
				data: [data],
				fill: false,
				//fill: this.chart_est_power_01_fill,
				yAxisID: calltag,
				//yAxisID: 'my887896',
				hidden:hiddenDataset()
			};
			var newYaxis = {
				id: calltag,
				type: 'linear', 
				display: displayYAxis(),
				position: 'left',
				ticks:{
					fontColor:hex,
					fontSize:12,
					min: tagconf.min,
					max: tagconf.max,
					beginAtZero: false
				},
				gridLines:{
					color:"rgb(52, 58, 64)",
					display: false,
				},
				
			};
			
			chart_est_power_01.data.datasets.push(newDataset);
			chart_est_power_01.config.options.scales.yAxes.push(newYaxis);

			
		
		}else{
			/**Para la grafica tipo  line , bar*/
			(tag.data as number[]).push(data);
			//tag.data.push(data);
			if(tag.data.length >= chart_est_power_01.data.labels.length+1){
				tag.data.shift();
			}

			
			/**Para la grafica tipo  horizontalBar*/
			//(tag.data as number[])=[data];
		}
		//console.log("data",chart_est_power_01.data.datasets);
		//console.log("y ",chart_est_power_01.config.options.scales.yAxes);
		chart_est_power_01.update();
	}
  
	  
  
  }
  