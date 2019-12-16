import { Component, OnInit, OnDestroy    } from '@angular/core';
import { Chart                           } from 'chart.js';
import { GlobalService                   } from 'src/app/core/globals/global.service';
import { ThemeService                    } from 'src/app/core/globals/theme';
import { EventService                    } from 'src/app/core/services/event.service';
import { SocketService                   } from 'src/app/core/services/socket.service';
import { MonitoringBaseSocketOnComponent } from 'src/app/monitoring/class/monitoringBaseSocketOn.component';
import { ChartControl                    } from 'src/app/monitoring/models/chart/ChartControl';
import { MonitoringTrService             } from '../../services/monitoringTr.service';
import { TrService                       } from 'src/app/safe/services/tr.service';
import { PiServerBox                     } from '../../models/piServer/piServerBox';

import * as TAGS                           from 'src/app/monitoring/boards/phase2/config';
import * as BasChart                       from 'src/app/monitoring/helpers/monitoringBaseChart.component';
@Component({
  selector: 'app-monitoring-phase2',
  templateUrl: './monitoring-phase2.component.html',
  styleUrls: ['./monitoring-phase2.component.scss']
})
export class MonitoringPhase2Component extends MonitoringBaseSocketOnComponent implements OnInit,OnDestroy  {
	calltags  = [];
	charts    : Array<Chart> = [];
	dataSets  : [] = []; // para poder conoce los colores de cada dataset



	calltagsObj=[];

	weather:any;
	date = new Date();
	dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	stringDate:string = '';
	temp:any;
	realFeelTemp:any;
	weatherText = "";
	weatherImg = "assets/icons/conditions/1.svg";
	UVIndex: any;
	UVIndexText: any;
	pressureTendency: any;
	humidity: any;
	pressure:any;
	windSpeed:any;
	visibility:any;
	hours = [];
	predictionOptions = { weekday: 'long' };
	predictions = [];


	constructor(
		public globalService        : GlobalService ,
		public theme                : ThemeService  ,
		public eventService         : EventService  ,
		public socketService        : SocketService ,
		private trService           : TrService     ,
		public monitoringTrService  : MonitoringTrService
	) {
		super(globalService,eventService,socketService,monitoringTrService);

		/**
		 * el icono de conectado tendra que tener la siguiente condicion
		 * if(globalService.socketConnect && this.PiIsRun)
		 */
	}

	ngOnInit() {
		this.stringDate = this.date.toLocaleDateString("es-ES", this.dateOptions);

		this.initializeAt0();
		this.chartInit();

		this.subscribeEverySecond();
		this.subscribeSocketOnStatus();
		this.subscribeSocketChanels();

		//this.restGetWeather(this.trService);
		console.log(this.globalService.plant);
/*
		this.monitoringTrService.getStreamsetsInterpolatedLast24Hours('2',['F1DP4rhZAwFMREKDf7s8vylUqg1gMAAAUElUVlxULkNFQS4yMjYz'])
		.subscribe(
			(data:PiServerBox) => {
				console.log("data ::::::::",data);
				//this.dataAdapter(data);
				let values = [];
				let labels = [];
				let fd = data;
				if( ! data.data[0]['error_response'] ){
					for (const item of data.data[0]['Items'][0]['Items']) {
						values.push(item['Value']);
						let date = new Date(item['Timestamp']);
						let checkTime = function(i) {
							if (i < 10) {
							  i = "0" + i;
							}
							return i;
						  }
						let miahora = checkTime(date.getHours()) + ":" + checkTime(date.getMinutes()) + ":" + checkTime(date.getSeconds());
						labels.push(checkTime(date.getHours()) + ":" + checkTime(date.getMinutes()) + ":" + checkTime(date.getSeconds()));
						//labels.push(item['Timestamp']);
					}
				}
				this.addDatasetLine2("chart_est_item01_col03", values, labels)
				//debugger;
			},
			errorData => {
			//this.toastr.errorToastr(Constants.ERROR_LOAD, 'Clima actual');
			}
		);
//*/
///*
		this.monitoringTrService.getStreamsetsInterpolatedLast24Hours('1',['P0uQAgHoBd0ku7P3cWOJL6IgJiUAAAU0VSVklET1JfUElcREFBMDgyMDY','P0uQAgHoBd0ku7P3cWOJL6IgGSUAAAU0VSVklET1JfUElcREFBMDgxMDQ'])
		.subscribe(
			data => {
				//this.dataAdapter(data);
				//debugger
				let values = [];
				let labels = [];
				let fd = data;
				if( ! data.data[0]['error_response'] ){
					for (const item of data.data[0]['Items'][0]['Items']) {
						//debugger;
						values.push(item.Value.Value);
						let date = new Date(item['Timestamp']);
						let checkTime = function(i) {
							if (i < 10) {
							  i = "0" + i;
							}
							return i;
						  }
						let miahora = checkTime(date.getHours()) + ":" + checkTime(date.getMinutes()) + ":" + checkTime(date.getSeconds());
						labels.push  (checkTime(date.getHours()) + ":" + checkTime(date.getMinutes()) + ":" + checkTime(date.getSeconds()));
						//labels.push(item['Timestamp']);
					}
				}
				this.addDatasetLine2("chart_eat_item01_col03", values, labels)
	
				//debugger;
			},
			errorData => {
			//this.toastr.errorToastr(Constants.ERROR_LOAD, 'Clima actual');
			}
		);
					//*/
		/*
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
		} );//*/
	}
	initializeAt0(){
		for (const local_tag_key in TAGS.lstTags) {
			if (TAGS.lstTags.hasOwnProperty(local_tag_key)) {
				this.calltags[local_tag_key+'-aguila']   = 0;
				this.calltags[local_tag_key+'-sol']      = 0;
				this.calltags[local_tag_key+'-overview'] = 0;

				this.calltagsObj[local_tag_key+'-aguila']   = {Name:""};
				this.calltagsObj[local_tag_key+'-sol']      = {Name:""};
				this.calltagsObj[local_tag_key+'-overview'] = {Name:""};
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
			this.subscribeSocketChanelWeather();
		}
	}

	getWeather() {
		console.log(this.date.getTime());
		this.trService.getWeather(this.date.getTime())
		.subscribe(
		  data => {
			this.weather = data.docs[0].data;
			this.loadWeatherData();
			//this.getHourly();
		  },
		  errorData => {
			//this.toastr.errorToastr(Constants.ERROR_LOAD, 'Clima actual');
		  });
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
			displayLegend  : false,
			timePast       : new Date()
		};

		if(idChart == "chart_eat_item01_col03" || idChart == "chart_est_item01_col03") {
			TAGS.listCharts[idChart]['controls']['displayLegend']=true;
			TAGS.listCharts[idChart]['controls']['data_per_graph']=24;
			TAGS.listCharts[idChart]['controls']['time_refreseh']=3600;
		}

		switch (TAGS.listCharts[idChart].type) {
			case "doughnut_completo":
					this.charts[idChart]= new Chart(idChart, BasChart.doughnutCompletoConfig() );
				break;

			default:
					this.charts[idChart]= new Chart(idChart, BasChart.chartCreateConfig(TAGS.listCharts[idChart]['controls']));
				break;
		}

	}

	datasetToggleChart(idchart,idDataset){
		let chartDatasets = this.charts[idchart].data.datasets;
		let chartYAxis = this.charts[idchart].config.options.scales.yAxes;

		if (this.charts[idchart] !== undefined) {
			for (let index = 0; index < chartDatasets.length; index++) {
				const dataset = chartDatasets[index];
				if(dataset['id'] == idDataset){
					dataset.hidden = !dataset.hidden;
				}
			}

			for (let index = 0; index < chartYAxis.length; index++) {
				const element = chartYAxis[index];
				if (element.id == idDataset) {
					element.display = !element.display;
				}
			}
			this.charts[idchart].update();
		}
	}
	getchartControl(idChart){
		return TAGS.listCharts[idChart]?TAGS.listCharts[idChart]['controls'] : {idChart:false};
	}

	dataAdapter(data:PiServerBox){
		//debugger
		let checkTime = function(i) {
			if (i < 10) {
			  i = "0" + i;
			}
			return i;
		  }
		console.log(
			checkTime(this.timeCurrent.getHours()) + ":" + checkTime(this.timeCurrent.getMinutes()) + ":" + checkTime(this.timeCurrent.getSeconds())
			,data
		);

		if(data.name == "weather"){
			this.weather = data.data;
			this.loadWeatherData();
		}else{
			this.updateLocalTagValue(data);
			this.updateLocalTagOverView();
			this.addDataToChart();
		}
		//*/
	}
	updateLocalTagValue(data){
		//let ii = Object.keys(TAGS.lstTags).length;
		if(data.hasOwnProperty('data') && Array.isArray(data.data) ){
			for(const web_Plant of data.data){
				if(web_Plant.hasOwnProperty('Items') && Array.isArray(web_Plant.Items) ){
					for(const web_Tag of web_Plant['Items']){
						for (const local_Tag in TAGS.lstTags) {
							if (TAGS.lstTags.hasOwnProperty(local_Tag)) {
								const element = TAGS.lstTags[local_Tag];
								let plant = "";
								switch (web_Plant.plantId) {
									case "1":
										plant = "aguila"
										break;
									case "2":
										plant = "sol"
										break;
									default:
										break;
								}
								for (const local_webIds of element[plant]) {
									if(local_webIds.WebId == web_Tag.WebId){
										//console.log(web_Tag);
										local_webIds.WebTag = web_Tag;
										//debugger;
									}
								}
							}
						}
					}
				}else{
					console.log("ERROR:: if(web_Plant.hasOwnProperty('Items') && Array.isArray(web_Plant.Items) )",web_Plant);
				}
			}
		}else{
			console.log("ERROR:: data.hasOwnProperty('data') && Array.isArray(data.data)",data);
		}
	}
	updateLocalTagOverView(){

		for (const local_tag_key in TAGS.lstTags) {
			if (TAGS.lstTags.hasOwnProperty(local_tag_key)) {
				const local_tag  = TAGS.lstTags[local_tag_key];

				if(["PowerOutput","HeatRate","HeatRateCorreg"].includes(local_tag_key)){
					const aguila     = local_tag.aguila[0]['WebTag'] ? local_tag.aguila[0]['WebTag']["Value"]["Value"] : 0;
					const sol        = local_tag.sol[0]['WebTag']    ? local_tag.sol[0]['WebTag']["Value"]["Value"]    : 0;
					let overview     = aguila + sol;
					if(local_tag_key == "HeatRate"){
						overview     = (aguila + sol)/2;
					}
					if(local_tag_key == "HeatRateCorreg"){
						overview     = (aguila + sol)/2;
					}
					local_tag.overview[0]['value']           = overview;
					this.calltags[local_tag_key+'-aguila']   = aguila;
					this.calltags[local_tag_key+'-sol']      = sol;
					this.calltags[local_tag_key+'-overview'] = overview;


					const aguila2     = local_tag.aguila[0]['WebTag'] ? local_tag.aguila[0]['WebTag'] : {Name:"¿?"};
					const sol2        = local_tag.sol[0]['WebTag']    ? local_tag.sol[0]['WebTag']    : {Name:"¿?"};
					this.calltagsObj[local_tag_key+'-aguila']   = aguila2;
					this.calltagsObj[local_tag_key+'-sol']      = sol2;
//debugger;
				}else if(["CapacityFactor"].includes(local_tag_key)){
					let algo = TAGS.lstTags['CTUnoDiesel'];
					let aguila_diesel_01 = TAGS.lstTags['CTUnoDiesel']['aguila'][0]['WebTag']["Value"]["Value"];
					let aguila_diesel_02 = TAGS.lstTags['CTDosDiesel']['aguila'][0]['WebTag']["Value"]["Value"];

					let factor_para_capacityFactor = 495;
					if(aguila_diesel_01 > 4 && aguila_diesel_02 > 4) factor_para_capacityFactor = 405;

					let aguila_value = TAGS.lstTags['PowerOutput']['aguila'][0]['WebTag']["Value"]["Value"];
					let value = (aguila_value / factor_para_capacityFactor )*100;
					if(value > 100) value = 100;
					let aguila_temp={Value:{Timestamp: "2019-09-19T00:08:22.8810119Z",Value: value}}
					local_tag.aguila[0]['WebTag']= aguila_temp;

					let sol_value = TAGS.lstTags['PowerOutput']['sol'][0]['WebTag']["Value"]["Value"];
					let valuesol = (sol_value / factor_para_capacityFactor )*100;
					if(value > 100) value = 100;
					let sol_temp={Value:{Timestamp: "2019-09-19T00:08:22.8810119Z",Value: valuesol}}
					local_tag.sol[0]['WebTag']= sol_temp;



					const aguila     = local_tag.aguila[0]['WebTag'] ? local_tag.aguila[0]['WebTag']["Value"]["Value"] : 0;
					const sol        = local_tag.sol[0]['WebTag']    ? local_tag.sol[0]['WebTag']["Value"]["Value"]    : 0;
					let overview     = aguila + sol;
					if(local_tag_key == "CapacityFactor"){
						overview     = (aguila + sol)/2;
					}
					local_tag.overview[0]['value']           = overview;
					this.calltags[local_tag_key+'-aguila']   = aguila;
					this.calltags[local_tag_key+'-sol']      = sol;
					this.calltags[local_tag_key+'-overview'] = overview;
				}else if(["FuelGain"].includes(local_tag_key)){

					let aguila_HeatRateCorreg = TAGS.lstTags['HeatRateCorreg']['aguila'][0]['WebTag']["Value"]["Value"];
					let aguila_HeatRate       = TAGS.lstTags['HeatRate']['aguila'][0]['WebTag']["Value"]["Value"];
					let aguila_value          = (((aguila_HeatRateCorreg-aguila_HeatRate) * 0.00004596  ) / 20.03);
					let aguila_temp           = {Value:{Timestamp: "2019-09-19T00:08:22.8810119Z",Value: aguila_value}}
					local_tag.aguila[0]['WebTag']= aguila_temp;


					let sol_HeatRateCorreg = TAGS.lstTags['HeatRateCorreg']['sol'][0]['WebTag']["Value"]["Value"];
					let sol_HeatRate       = TAGS.lstTags['HeatRate']['sol'][0]['WebTag']["Value"]["Value"];
					let sol_value          = (((sol_HeatRateCorreg-sol_HeatRate) * 0.00004764) /  20.03);
					//sol_value = sol_value + (Math.random() * (0.0000000000000000927 - 0.0000000000000000100) + 0.0000000000000000100);

					let sol_temp           = {Value:{Timestamp: "2019-09-19T00:08:22.8810119Z",Value: sol_value}}
					local_tag.sol[0]['WebTag']= sol_temp;


					//console.log("Fuel Gain / Lost (Sol):: (HeatRateCorreg::",sol_HeatRateCorreg,")(HeatRate::",sol_HeatRate,") ->(  ( (HeatRateCorreg - HeatRate)*0.00004764 ) / 20.03 ) = (",sol_value,")");




					const aguila     = local_tag.aguila[0]['WebTag'] ? local_tag.aguila[0]['WebTag']["Value"]["Value"] : 0;
					const sol        = local_tag.sol[0]['WebTag']    ? local_tag.sol[0]['WebTag']["Value"]["Value"]    : 0;
					let overview     = aguila + sol;
					if(local_tag_key == "CapacityFactor"){
						overview     = (aguila + sol)/2;
					}
					local_tag.overview[0]['value']           = overview;
					this.calltags[local_tag_key+'-aguila']   = aguila;
					this.calltags[local_tag_key+'-sol']      = sol;
					this.calltags[local_tag_key+'-overview'] = overview;
				}

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
					switch (TAGS.listCharts[idChart].type) {
						case "doughnut_completo":
							this.addDataset_doughnut_completo(idChart);
							break;
						default:
							this.addDatasetLine(idChart);
							break;
					}
				}
			}
		}
	}
	addDataset_doughnut_completo(idChart){
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
					data: chartTag.value(),
					borderWidth:0,
					backgroundColor: [
						chart.color(),
						"#7f8182",
					]
				};


				this.charts[idChart].data.datasets.push(newDataset);
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
				(datasetTag.data as number[])=chartTag.value();
			}

		}
		this.charts[idChart].update();
		//console.log(this.charts);
		//console.log(this.charts['chart_est_power_01'].data);
	}
	addDatasetLine(idChart){
		let chart = TAGS.listCharts[idChart];
		let bandera = true;
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
					//type: 'linear',// logarithmic / linear
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
				this.dataSets[idChart+"-"+chartTag.calltags] = newDataset;
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

			if(bandera){// regimen termico
				bandera = false;
				this.charts[idChart].data.labels.push(this.getTime());
				if(this.charts[idChart].data.labels.length > chart.controls.data_per_graph){
					this.charts[idChart].data.labels.shift();
				}
			}
		}
		this.charts[idChart].update();
		//console.log(this.charts);
		//console.log(this.charts['chart_est_power_01'].data);
	}

	addDatasetLine2(idChart, values, labels){
		let chart = TAGS.listCharts[idChart];
		let bandera = true;
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
					data: values,
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
				this.dataSets[idChart+"-"+chartTag.calltags] = newDataset;
			}else{
			}

			this.charts[idChart].data.labels = labels;

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
			this.charts[chart].data.labels = [];
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
	loadWeatherData() {
		this.temp = this.weather.Temperature.Metric.Value;
		this.realFeelTemp = this.weather.RealFeelTemperature.Metric.Value;
		this.weatherText = this.weather.WeatherText;
		this.UVIndex = this.weather.UVIndex;
		this.UVIndexText = this.weather.UVIndexText;
		this.pressureTendency = this.weather.PressureTendency.LocalizedText;
		this.weatherImg = this.getUrlWeather();
		this.humidity = this.weather.RelativeHumidity;
		this.pressure = this.weather.Pressure.Metric.Value;
		this.windSpeed = this.weather.Wind.Speed.Metric.Value;
		this.visibility = this.weather.Visibility.Metric.Value;
	  }

	getUrlWeather() {
		let img = "assets/icons/conditions/";
			img = img + this.weather.WeatherIcon;

		img = img + ".svg";
		return img;
	}
}
