import { Component, OnInit, OnDestroy }    from '@angular/core';
import { environment }                     from  'src/environments/environment';
import { Chart }                           from 'chart.js';
import { GlobalService }                   from 'src/app/core/globals/global.service';
import { ThemeService }                    from 'src/app/core/globals/theme';
import { EventService }                    from 'src/app/core/services/event.service';
import { SocketService }                   from 'src/app/core/services/socket.service';
import { MonitoringBaseSocketOnComponent } from 'src/app/monitoring/class/monitoringBaseSocketOn.component';
import { ChartControl }                    from 'src/app/monitoring/models/ChartControl';
import * as TAGS                           from 'src/app/monitoring/boards/phase2/config';
import * as BasChart                       from 'src/app/monitoring/helpers/monitoringBaseChart.component';


@Component({
  selector: 'app-monitoringPhase2',
  templateUrl: './monitoringPhase2.component.html',
  styleUrls: ['./monitoringPhase2.component.scss']
})
export class MonitoringPhase2Component extends MonitoringBaseSocketOnComponent implements OnInit,OnDestroy  {
	calltags         = []; 
	charts           : Array<Chart>        = [];

  
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
	subscribeSocketChanels(){
		if(this.globalService.socketConnect){
			this.subscribeSocketChanelbackPiIsRun();
			this.subscribeSocketChanelPiServers();
		}
	}
	modifyChart(event){
		// event es de tipo ChartControl
		TAGS.listCharts[event.idChart]['controls'] = event;
		let chartC = TAGS.listCharts[event.idChart]['controls'];
		
		/* Ajustar la cantidad de datos que se muestran en la grafica */
		this.charts[event.idChart].data.datasets.forEach(function(element) {
			/* Si el "data_per_graph_main" es menor a lo que existe
			*  esto eliminara los elementos del inicio que sibren 
			*  para pintar la grafica 
			*/
			if(chartC.data_per_graph < element.data.length){
				element.data = element.data.slice(
				element.data.length - chartC.data_per_graph
				,element.data.length);
			}
		});
		this.charts[event.idChart].data.labels  = new Array(chartC.data_per_graph);
		/* ./ Ajustar la cantidad de datos que se muestran en la grafica */




		switch(chartC.type_graph){
			case "line":
				for (const iterator in this.charts[event.idChart].data.datasets) {
					this.charts[event.idChart].data.datasets[iterator]['backgroundColor']=this.charts[event.idChart].data.datasets[iterator]['rgba'];
				}
			break;
			case "bar":
				for (const iterator in this.charts[event.idChart].data.datasets) {
					this.charts[event.idChart].data.datasets[iterator]['backgroundColor']=this.charts[event.idChart].data.datasets[iterator]['borderColor'];
				}
			break;
		}

		for (const iterator in this.charts[event.idChart].data.datasets) {
			this.charts[event.idChart].data.datasets[iterator]['fill'] = chartC.fill;
		}



		this.change_graph_dynamic_scale(event.idChart);
		this.charts[event.idChart].config.options.elements.point.radius = chartC.point_radius;
		this.charts[event.idChart].config.type = chartC.type_graph;
		this.charts[event.idChart].update();
	}
	change_graph_dynamic_scale(idChart){
		let chartC = TAGS.listCharts[idChart]['controls'];
		for (let index = 0; index < this.charts[idChart].config.options.scales.yAxes.length; index++) {
			const element = this.charts[idChart].config.options.scales.yAxes[index];
			const calltag = this.charts[idChart].config.options.scales.yAxes[index].id;
			if (chartC.type_scale === 'dynamic') {
				if(TAGS.lstTags[calltag]){
				this.charts[idChart].config.options.scales.yAxes[index].ticks.min = undefined;
				this.charts[idChart].config.options.scales.yAxes[index].ticks.max = undefined;
				this.charts[idChart].config.options.scales.yAxes[index].ticks.beginAtZero = false;
				}
			}else if(chartC.type_scale === 'dynamic_with_0'){
				if(TAGS.lstTags[calltag]){
				this.charts[idChart].config.options.scales.yAxes[index].ticks.min = undefined;
				this.charts[idChart].config.options.scales.yAxes[index].ticks.max = undefined;
				this.charts[idChart].config.options.scales.yAxes[index].ticks.beginAtZero = true;
				}
			}else if(chartC.type_scale === 'static'){
				if(TAGS.lstTags[calltag]){
				this.charts[idChart].config.options.scales.yAxes[index]['ticks']['min'] = TAGS.lstTags[calltag]['min'];
				this.charts[idChart].config.options.scales.yAxes[index]['ticks']['max'] = TAGS.lstTags[calltag]['max'];
				this.charts[idChart].config.options.scales.yAxes[index].ticks.beginAtZero = false;
				}
			}else if(chartC.type_scale === 'static_min'){
				if(TAGS.lstTags[calltag]){
				this.charts[idChart].config.options.scales.yAxes[index]['ticks']['min'] = TAGS.lstTags[calltag]['min'];
				this.charts[idChart].config.options.scales.yAxes[index]['ticks']['max'] = undefined;
				this.charts[idChart].config.options.scales.yAxes[index].ticks.beginAtZero = false;
				}
			}
		}
	}
	initializeAt0(){
		for (const local_tag_key in TAGS.lstTags) {
			if (TAGS.lstTags.hasOwnProperty(local_tag_key)) {
				this.calltags[local_tag_key+'-aguila']   = 0;
				this.calltags[local_tag_key+'-sol']      = 0;
				this.calltags[local_tag_key+'-overview'] = 0;
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
	createChart(idChart){
		TAGS.listCharts[idChart]['controls'] = {
			idChart        : idChart,
			type_graph     : 'line',
			type_scale     : 'dynamic',
			fill           : 'false',
			data_per_graph : 10,
			point_radius   : 3,
			time_refreseh  : 3,
			timePast       : new Date()
		};
		this.charts[idChart]= new Chart(idChart, BasChart.chartCreateConfig(TAGS.listCharts[idChart]['controls']));
	}
	getchartControl(idChart){
		return TAGS.listCharts[idChart]?TAGS.listCharts[idChart]['controls'] : {idChart:false};
	}
	dataAdapter(data){
		this.updateLocalTagValue(data);
		this.updateLocalTagOverView();
		this.addDataToChart();
	}
	addDataToChart(){
		for (const idChart in TAGS.listCharts) {
			if (TAGS.listCharts.hasOwnProperty(idChart)) {
				if(this.check_time_refreseh_data(
					TAGS.listCharts[idChart]['controls']['time_refreseh'],
					TAGS.listCharts[idChart]['controls']['timePast']
				)){
					TAGS.listCharts[idChart]['controls']['timePast'] = new Date();
					this.addDatasetLine2(idChart);
				}
			}
		}
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
				const local_tag  = TAGS.lstTags[local_tag_key];
				const aguila     = local_tag.aguila[0]['WebTag'] ? local_tag.aguila[0]['WebTag']["Value"]["Value"] : 0;
				const sol        = local_tag.sol[0]['WebTag']    ? local_tag.sol[0]['WebTag']["Value"]["Value"]    : 0;
				const overview   = aguila + sol;
				local_tag.overview[0]['value']           = overview;
				this.calltags[local_tag_key+'-aguila']   = aguila;
				this.calltags[local_tag_key+'-sol']      = sol;
				this.calltags[local_tag_key+'-overview'] = overview;
			}
		}
	}

	addDatasetLine2(idChart){
		let chart = TAGS.listCharts[idChart];

		for(let chartTags of chart.tags){
			let datasetTag = BasChart.getDatasetTag(this.charts[idChart].data.datasets, chartTags.calltags);
			let tagconf    = TAGS.lstTags[chartTags.calltags];
			if(datasetTag == undefined){
		
				var hex  = tagconf.color;
				let rgba = BasChart.hexToRGB(tagconf.color,0.3);
		
				var newDataset = {
					id:chartTags.calltags,
					rgba:rgba,
					label: tagconf.label,
					backgroundColor: hex,
					borderColor: hex,
					data: [chartTags.value()],
					fill: false,
					hidden:false,
					yAxisID: chartTags.calltags
				};
				var newYaxis = {
					id: chartTags.calltags,
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
				///*
				(datasetTag.data as number[]).push(chartTags.value());
				//tag.data.push(data);
				if(datasetTag.data.length > chart.controls.data_per_graph){
					datasetTag.data.shift();
				}
				//*/

				/**Para la grafica tipo  horizontalBar*/
				//(datasetTag.data as number[])=[chartTags.value];
			}
			
		}
		this.charts[idChart].update();
		//console.log(this.charts);
		//console.log(this.charts['chart_est_power_01'].data);
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
					//if(datasetTag.data.length > this.chartsControls[idChart].data_per_graph){
					if(datasetTag.data.length > 10){
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

	private generateDataset(){
		/*
		var hex  = tagconf.color;
		let rgba = BasChart.hexToRGB(tagconf.color,0.3);

		var newDataset = {
			id:tagconf.calltags,
			rgba:rgba,
			label: tagconf.label,
			backgroundColor: hex,
			borderColor: hex,
			data: [chartTags.value],
			fill: false,
			hidden:false,
			yAxisID: tagconf.calltags
		};
		//*/
	}
  }
  