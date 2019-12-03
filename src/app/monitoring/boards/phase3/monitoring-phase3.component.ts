import { Component, OnInit, Input, OnDestroy, ViewEncapsulation, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MonitoringPhase3Service } from '../../services/monitoringPhase3.service';
import { EventService } from 'src/app/core/services/event.service';

import { ActivatedRoute } from '@angular/router';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { interval, Subscription, Observable, timer } from 'rxjs';
import { Chart } from 'chart.js';
import { GlobalService } from 'src/app/core/globals/global.service';

import { SecurityService } from 'src/app/core/services/security.service';
import { Validate } from 'src/app/core/helpers/util.validator.';
import { SocketService } from 'src/app/core/services/socket.service';
import { EventSocket } from 'src/app/core/models/EventSocket';
declare var $: any;




import * as TAGS from './config';
import { DateAdapter } from 'angular-calendar';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { ThemeService } from 'src/app/core/globals/theme';
import { InteractiveImageTurbineCT1Component } from './components/interactive-image-turbine-ct1/interactive-image-turbine-ct1.component';
import { MonitoringBaseSocketOnComponent } from 'src/app/monitoring/class/monitoringBaseSocketOn.component';
import { MonitoringTrService } from '../../services/monitoringTr.service';
import { TrService } from 'src/app/safe/services/tr.service';
import { PiServerBox } from '../../models/piServer/piServerBox';
import * as BasChart                       from 'src/app/monitoring/helpers/monitoringBaseChart.component';
import { PiServerItem } from '../../models/piServer/piServerItem';
import { checkDigitTime } from 'src/app/core/helpers/util.general';
import { getMyDateFormat } from 'src/app/core/helpers/util.general';
@Component({
	selector: 'app-monitoring-phase3',
	templateUrl: './monitoring-phase3.component.html',
	styleUrls: ['./monitoring-phase3.component.scss'],
	entryComponents: [InteractiveImageTurbineCT1Component]
})
export class MonitoringPhase3Component extends MonitoringBaseSocketOnComponent implements OnInit, OnDestroy {
	@ViewChild('modal_turbine_ct_1') modal_turbine_ct_1: InteractiveImageTurbineCT1Component;
	@ViewChild('modal_turbine_ct_12') modal_turbine_ct_12: InteractiveImageTurbineCT1Component;
	charts      : Array<Chart> = [];
	dataSets    : [] = []; // para poder conoce los colores de cada dataset
	calltags    = [];
	calltagsObj = [];
	dataset_main=[];

	wifi = false;
	anyConfig = [];

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
		let lstTags = this.initializeAt0();
		this.chartInit();
		
		this.subscribeEverySecond();
		this.subscribeSocketOnStatus();
		this.getStreamsetsInterpolatedLast24Hours(lstTags);

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
			displayLegend  : false,
			timePast       : new Date()
		};

		this.charts[idChart]= new Chart(idChart, BasChart.chartCreateConfig(TAGS.listCharts[idChart]['controls']));
	}
	initializeAt0(){
		let lst = [];
		for (const local_tag_key in TAGS.lstTags) {
			if (TAGS.lstTags.hasOwnProperty(local_tag_key)) {
				this.calltags[local_tag_key]    = 0;
				this.calltagsObj[local_tag_key] = {Name:""};
				this.anyConfig[local_tag_key] = {
					scale_min: TAGS.lstTags[local_tag_key]['min'],
					scale_max: TAGS.lstTags[local_tag_key]['max'],
					type: "linear",
					stepSize: 0,
				}
			}
			for (const webid of TAGS.lstTags[local_tag_key][this.globalService.plant.name.toLowerCase()]) {
				if(webid.WebId != null) lst.push(webid.WebId);
			}
		}
		return lst;
	}
	
	subscribeSocketChanels(){
		if(this.globalService.socketConnect){
			this.subscribeSocketChanelbackPiIsRun();
			switch (this.globalService.plant.id) {
				case 1:
					this.subscribeSocketChanelAguila();
					break;
				case 2:
					this.subscribeSocketChanelSol();
					break;
			}
		}
	}
	getStreamsetsInterpolatedLast24Hours(webids){
		this.subscriptions.push(
			this.monitoringTrService
			.getStreamsetsInterpolatedLast24Hours(this.globalService.plant.id, webids)
			.subscribe(
				(box:PiServerBox) => {
					box.name = "getStreamsetsInterpolatedLast24Hours";
					this.subscribeSocketChanels();
					this.dataAdapter(box);

					

				},
				errorData => {
				//this.toastr.errorToastr(Constants.ERROR_LOAD, 'Clima actual');
				}
			)
		);
	}
	dataAdapter(box:PiServerBox){
		switch (box.name) {
			case "getStreamsetsInterpolatedLast24Hours":
				this.setStreamIn(box);
				break;
			case "pi-aguila":
			case "pi-sol":
			
				break;
		}

	}
	setStreamIn(box:PiServerBox){
		for (const data of box.data) {
			if(!data.error_response){
				for (const tag of data.Items) {
					this.setStreamInLocalTags(tag);
				}
			}
		}
	}
	
	setStreamInLocalTags(tag:PiServerItem){
		for (const local_tag_key in TAGS.lstTags) {
			if (TAGS.lstTags.hasOwnProperty(local_tag_key)) {
				for (const localtag of TAGS.lstTags[local_tag_key][this.globalService.plant.name.toLowerCase()]) {
					if(localtag.WebId == tag.WebId){
						localtag.data = tag;
					}
					if(localtag.active){
						this.setStreamTagItemsInChart(tag,local_tag_key);
					} 
				}
			}
		}
	}
	setStreamTagItemsInChart(tag:PiServerItem, local_tag_key:string){
		let values = [];
		let labels = [];
		for (const item of tag.Items) {
			values.push(item.Value.Value);
			labels.push(getMyDateFormat(new Date(item.Timestamp)));
		}
		this.addDatasetLine2("canvas1", values, labels, local_tag_key);
	}

	addDatasetLine2(idChart, values, labels,local_tag_key){
		let existDataset = function (tag) {
			return (tag.id === local_tag_key);
		};
		let hiddenDataset = function () {
			switch (local_tag_key) {
				case "getPotenciaNeta":
				case "getPotenciaCCDV":
				case "getRegimenTermico":
					return false;
				default:
					return true;
			}
		}
		let displayYAxis = function () {
			//return false;
			switch (local_tag_key) {
				case "getPotenciaNeta":
				case "getPotenciaCCDV":
				case "getRegimenTermico":
					return true;
				default:
					return false;
			}
		}
		let hexToRGB = function (h, a) {
			let r = "0";
			let g = "0";
			let b = "0";

			// 3 digits
			if (h.length == 4) {
				r = "0x" + h[1] + h[1];
				g = "0x" + h[2] + h[2];
				b = "0x" + h[3] + h[3];

				// 6 digits
			} else if (h.length == 7) {
				r = "0x" + h[1] + h[2];
				g = "0x" + h[3] + h[4];
				b = "0x" + h[5] + h[6];
			}

			return "rgb(" + +r + "," + +g + "," + +b + "," + a + ")";
		}
		let tag = this.charts[idChart].data.datasets.find(existDataset);
		debugger
		let chart = TAGS.listCharts[idChart];

			//let datasetTag = BasChart.getDatasetTag(this.charts[idChart].data.datasets, chartTag.calltags);
			let tagconf    = TAGS.lstTags[local_tag_key];
			//if(datasetTag == undefined){

				var hex  = tagconf.color;
				let rgba = BasChart.hexToRGB(tagconf.color,0.3);

				var newDataset = {
					id:local_tag_key,
					rgba:rgba,
					label: tagconf.label,
					backgroundColor: hex,
					borderColor: hex,
					data: values,
					fill: false,
					hidden:false,
					yAxisID: local_tag_key
				};
				var newYaxis = {
					id: local_tag_key,
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
				this.dataSets[idChart+"-"+local_tag_key] = newDataset;
			//}
			this.charts[idChart].data.labels = labels;
	
		this.charts[idChart].update();
		//console.log(this.charts);
		//console.log(this.charts['chart_est_power_01'].data);
	}

	language(re){
		return "";
	}
	datasetToggleChartMain(ds){

	}
}
