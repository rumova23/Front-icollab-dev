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



import { RelWebIdLocalId } from '../../models/rel_webId_localId/rel_webId_localId';
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
	private charts            : Array<Chart> = [];
	private dataSets          : [] = []; // para poder conoce los colores de cada dataset
	private rel_webId_localId : Array<RelWebIdLocalId> = [];

	tagValue    = [];
	tagName     = [];



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
	}

	ngOnInit() {
		let lstTags = this.initializeAt0();
		
		this.subscribeEverySecond();
		this.subscribeSocketOnStatus();
		this.getStreamsetsInterpolatedLast24Hours(lstTags);
	}
	initializeAt0(){
		let lst = [];
		for (const local_tag_key in TAGS.lstTags) {
			if (TAGS.lstTags.hasOwnProperty(local_tag_key)) {
				this.tagValue[local_tag_key] = 0;
				this.tagName [local_tag_key] = "";

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
	getStreamsetsInterpolatedLast24Hours(webids){
		this.subscriptions.push(
			this.monitoringTrService
			.getStreamsetsInterpolatedLast24Hours(this.globalService.plant.id, webids)
			.subscribe(
				(box:PiServerBox) => {
					box.name = "getStreamsetsInterpolatedLast24Hours";
					this.dataAdapter(box);
				},
				errorData => {
				//this.toastr.errorToastr(Constants.ERROR_LOAD, 'Clima actual');
				}
			)
		);
	}
	dataAdapter(box:PiServerBox){
		this.wifi = true;
		for (const idChart in TAGS.listCharts) {
			if (TAGS.listCharts.hasOwnProperty(idChart)) {
				switch (box.name) {
					case "getStreamsetsInterpolatedLast24Hours":
						this.chartInit(box.data[0].Items[0].Items.length);
						this.subscribeSocketChanels();
						for (const data of box.data) {
							if(!data.error_response){
								for (const tag of data.Items) {
									this.createRelwebIdLocalId(tag);
									this.setStreamTagItemsInChart(tag);
								}
							}
						}
						break;
					case "pi-aguila":
					case "pi-sol":
						if(this.check_time_refreseh_data(
							TAGS.listCharts[idChart]['controls']['time_refreseh'],
							TAGS.listCharts[idChart]['controls']['timePast']
						)){
							TAGS.listCharts[idChart]['controls']['timePast'] = new Date();
							this.charts[idChart].data.labels.push(this.getTime());
							if(this.charts[idChart].data.labels.length > TAGS.listCharts[idChart].controls.data_per_graph){
								this.charts[idChart].data.labels.shift();
							}
							for (const data of box.data) {
								if(!data.error_response){
									for (const tag of data.Items) {
										this.setStreamTagItemsInChart(tag);
									}
								}
							}
						}
						break;
				}
			}
		}
	}
	chartInit(data_per_graph = 25){
		for (const idChart in TAGS.listCharts) {
			if (TAGS.listCharts.hasOwnProperty(idChart)) {
				
				TAGS.listCharts[idChart]['controls'] = {
					idChart        : idChart,
					type_graph     : 'line',
					type_scale     : 'dynamic',
					fill           : 'false',
					data_per_graph : data_per_graph,
					point_radius   : 3,
					time_refreseh  : 3,
					displayLegend  : false,
					timePast       : new Date()
				};

				this.charts[idChart]= new Chart(idChart, BasChart.chartCreateConfig(TAGS.listCharts[idChart]['controls']));
			}
		}
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
	createRelwebIdLocalId(tag:PiServerItem){
		for (const local_tag_key in TAGS.lstTags) {
			if (TAGS.lstTags.hasOwnProperty(local_tag_key)) {
				for (const localtag of TAGS.lstTags[local_tag_key][this.globalService.plant.name.toLowerCase()]) {
					if(localtag.WebId == tag.WebId){
						// crear relaciones
						this.rel_webId_localId[tag.WebId] 
						= new RelWebIdLocalId(tag.WebId, local_tag_key, localtag.active);
						//localtag.data = tag;
					}
				}
			}
		}
	}
	setStreamTagItemsInChart(tag:PiServerItem){
		let rel_tag_local : RelWebIdLocalId = this.rel_webId_localId[tag.WebId]?this.rel_webId_localId[tag.WebId]:null;

		if ( rel_tag_local != null && rel_tag_local.active ){

			let values = [];
			let labels = [];
			if(tag.Items.length>0){
				for (const item of tag.Items) {
					values.push(item.Value.Value);
					labels.push(getMyDateFormat(new Date(item.Timestamp)));
				}
			}else if(tag.Value != null){
				values.push(tag.Value.Value);
				labels.push(getMyDateFormat(new Date(tag.Value.Timestamp)));
			}
			this.tagValue[ rel_tag_local.localId ] = values[values.length-1];
			this.tagName [ rel_tag_local.localId ] = tag.Name;

			this.addDatasetLine2("canvas1", values, labels, rel_tag_local.localId );
		}
	}
	addDatasetLine2(idChart, values, labels,local_tag_key){
		if(! Array.isArray(values)){
			values = [values];
		}
		if(! Array.isArray(labels)){
			labels = [labels];
		}
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
		if (tag == undefined) {
			let tagconf    = TAGS.lstTags[local_tag_key];

				var hex  = tagconf.color;
				let rgba = BasChart.hexToRGB(tagconf.color,0.3);
				var newDataset = {
					id: local_tag_key,
					rgba: rgba,
					label: TAGS.lstTags[local_tag_key].label,
					backgroundColor: rgba,
					borderColor: hex,
					data: values,
					//fill: false,
					fill: false,
					yAxisID: local_tag_key,
					//yAxisID: 'my887896',
					hidden: hiddenDataset()
				};
				var newYaxis = {
					id: local_tag_key,
					type: 'linear', //'myScale','linear'
					display: displayYAxis(),
					position: 'left',
					scaleLabel: {
						display: false,
						labelString: 'Y',
						fontFamily: 'Lato',
						fontSize: 14,
					},
					afterUpdate: function (axis) {

					},
					ticks: {
						fontColor: hex,
						fontSize: 12,
						//min: tagconf.min,
						//max: tagconf.max,
						beginAtZero: false
					},
					gridLines: {
						color: "rgb(52, 58, 64)",
						display: false,
					},

				};

				this.charts[idChart].data.datasets.push(newDataset);
				this.charts[idChart].config.options.scales.yAxes.push(newYaxis);
				this.dataSets[idChart+"-"+local_tag_key] = newDataset;
				
				this.charts[idChart].data.labels = labels;
			}else{
				for (const data of values) {
					(tag.data as number[]).push(data);
					//tag.data.push(data);
					if (tag.data.length >= TAGS.listCharts[idChart].controls.data_per_graph) {
						tag.data.shift();
					}
				}
			}
	
		this.charts[idChart].update();
	}
	whenLosingConnection(){
		this.wifi = false;
	}
	datasetToggleChart(idChart,localKeyTag) {
		if (this.dataSets[`${idChart}-${localKeyTag}`] !== undefined) {
			this.dataSets[`${idChart}-${localKeyTag}`].hidden = !this.dataSets[`${idChart}-${localKeyTag}`].hidden;

			for (let index = 0; index < this.charts[idChart].config.options.scales.yAxes.length; index++) {
				const element = this.charts[idChart].config.options.scales.yAxes[index];
				if (element.id == localKeyTag) {
					//this.yAxes_main[localKeyTag].display = !this.dataSets[`${idChart}-${localKeyTag}`].hidden;
					this.charts[idChart].config.options.scales.yAxes[index].display = !this.dataSets[`${idChart}-${localKeyTag}`].hidden;
					this.charts[idChart].update();
				}
			}
		}
	}
	getchartControl(idChart){
		return TAGS.listCharts[idChart]?TAGS.listCharts[idChart]['controls'] : {idChart:false};
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
	updateChart(myform, localTagId){}
	openModalCt_1(){}
	openModalCt_2(){}
}
