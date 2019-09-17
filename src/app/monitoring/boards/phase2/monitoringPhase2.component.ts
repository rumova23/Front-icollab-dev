import { Component, OnInit, OnDestroy }    from '@angular/core';
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
	calltags  = []; 
	charts    : Array<Chart> = [];

  
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



		var myChart = new Chart('mychart',{
			type: 'doughnut',
			data: {
				datasets: [{
					data: [1,2],
					label: 'Dataset 1',
					borderWidth:0,
					backgroundColor: [
						"#46FF33",
						"#363838",
					],
				}],
				labels: [
					'Green',
					'Gray',
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				cutoutPercentage: 40,
				legend: {
					display: false,
					position: 'top',
				},
				title: {
					display: false,
					text: ''
				},
				animation: {
					animateScale: true,
					animateRotate: true
				}
			}
		} );
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
	subscribeSocketChanels(){
		if(this.globalService.socketConnect){
			this.subscribeSocketChanelbackPiIsRun();
			this.subscribeSocketChanelPiServers();
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
	addDataToChart(){
		for (const idChart in TAGS.listCharts) {
			if (TAGS.listCharts.hasOwnProperty(idChart)) {
				if(this.check_time_refreseh_data(
					TAGS.listCharts[idChart]['controls']['time_refreseh'],
					TAGS.listCharts[idChart]['controls']['timePast']
				)){
					TAGS.listCharts[idChart]['controls']['timePast'] = new Date();
					this.addDatasetLine(idChart);
				}
			}
		}
	}

	addDatasetLine(idChart){
		let chart = TAGS.listCharts[idChart];

		for(let chartTag of chart.tags){
			let datasetTag = BasChart.getDatasetTag(this.charts[idChart].data.datasets, chartTag.calltags);
			let tagconf    = TAGS.lstTags[chartTag.calltags];
			if(datasetTag == undefined){
		
				var hex  = tagconf.color;
				let rgba = BasChart.hexToRGB(tagconf.color,0.3);
		
				var newDataset = {
					id:chartTag.calltags,
					rgba:rgba,
					label: tagconf.label,
					backgroundColor: hex,
					borderColor: hex,
					data: [chartTag.value()],
					fill: false,
					hidden:false,
					yAxisID: chartTag.calltags
				};
				var newYaxis = {
					id: chartTag.calltags,
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
				(datasetTag.data as number[]).push(chartTag.value());
				//tag.data.push(data);
				if(datasetTag.data.length > chart.controls.data_per_graph){
					datasetTag.data.shift();
				}
				//*/

				/**Para la grafica tipo  horizontalBar*/
				//(datasetTag.data as number[])=[chartTag.value];
			}
			
		}
		this.charts[idChart].update();
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
  