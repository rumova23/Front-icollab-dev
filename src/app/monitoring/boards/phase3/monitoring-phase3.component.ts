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

	calltags    = [];
	calltagsObj = [];
	chart_01: Chart;

	dataset_main = [];
	yAxes_main = [];


	dataset_modal = [];
	yAxes_modal = [];


	wifi = false;
	tooltipWifi = "";

	showModal_lst_tags = false;

	showModal = false;
	titleModal = "tooltip";

	showDropdownchart_01 = false;
	myinterval = null;
	time_on_request: number = 3;//4000;
	time_refreseh_data: number = 5;
	data_per_graph_main = 5;
	type_graph_main = 'line';
	dynamic_scale = 'static';
	chart_01_fill = "false";
	chart_01_point_radius = 3;



	cadaIntervalo: number = 1000;//4000;
	fechaActual: any;
	fechaActualAnterior: any = new Date();


	ScaleClass: any;



	chart_config_1 = {
		type: 'line'
		, data: {
			labels: []
			//labels: ["k1","k2",'k3','k4']
			, datasets: []
		}
		, options: {

			responsive: true,
			//      aspectRatio:3,

			onClick: (clickEvt, activeElems) => this.onChartClick(clickEvt, activeElems),
			maintainAspectRatio: false,
			legend: {
				display: false,
				labels: {
					fontColor: 'red',
					fontSize: 26
				},
				position: "left"

			},
			elements: {
				point: {
					//hoverBackgroundColor: makeHalfAsOpaque,
					radius: this.chart_01_point_radius,
					hoverRadius: 15,
				}
			}
			, scales: {
				xAxes: [{
					gridLines: {
						color: "rgba(255,255,255,1)",
						display: false,
					},
					display: true,
					ticks: {
						fontColor: "orange"
					}
				}]
				, yAxes: [{
					type: 'linear',
					display: false,
					position: 'left',
					id: 'my887896',
					ticks: {
						min: 0,
						max: 1,
						beginAtZero: false
					},
				}
				],
			}
		}
	};
	chart_modal_config = {
		type: 'horizontalBar'

		, data: {
			labels: ['RPM']
			, datasets: [
			]
		}
		, options: {
			responsive: true,
			maintainAspectRatio: false,
			elements: {
				rectangle: {
					borderWidth: 2,
				}
			},
			legend: {
				display: false
			}
			, scales: {
				xAxes: [{
					gridLines: {
						color: "rgba(0,255,0,1)",
					},
					ticks: {
						fontColor: '#fff',
						fontSize: 12
					}
				}]
				, yAxes: [{

					gridLines: {
						color: "rgba(0,255,0,1)",
						display: false,
					},
					ticks: {
						fontColor: '#fff',
						fontSize: 12
					}
				}
				],
			}
		}
	};

	mibanderadecolor = true;
	anyConfig = [];

	/* No estan en la vista */

	constructor(
		public globalService: GlobalService
		, public theme: ThemeService
		, private wsPI: MonitoringPhase3Service
		, private modalService: NgbModal
		, private activatedRoute: ActivatedRoute
		, private securityService: SecurityService
		, public socketService: SocketService
		, public eventService: EventService
		, private componentFactoryResolver: ComponentFactoryResolver
		, public monitoringTrService : MonitoringTrService
	) {

		super(globalService, eventService, socketService,monitoringTrService);

		for (const calltag in M3.lstTags) {
			if (M3.lstTags.hasOwnProperty(calltag)) {
				this.dev_view_lstTags.push(M3.lstTags[calltag]);
			}
		}

		if (!this.globalService.socketConnect) {
			this.subscrubeChangeGraphUpdateTimeRest();
		}
	}
	ngOnInit() {
		//idiomas disponibles
		/*this.translate.addLangs(["es", "en", "ja"]);
		this.translate.setDefaultLang('es');
		this.translate.use('es');//*/
		$('.form-group').on('click', function (e) {
			e.stopPropagation();
		});

		$('.mystopPropagation').on('click', function (e) {
			e.stopPropagation();
		});
		this.initializeAt0();
		this.chartInit();


		this.subscribeFechaYHora()

		this.subscribeSocketOnStatus();
		this.subscribeSocket();
		//console.log(Chart);

		this.ScaleClass = Chart.helpers.extend({

		});
		var custom = Chart.controllers.bubble.extend({});
		let fdsafdsa = Chart.Scale;
		let fdsafdfdssa = Chart.scale;
		this.ScaleClass = Chart.Scale.extend({
			getValueForPixel: function (bar) {
				return "Pendejo";
			}

		});

		Chart.scaleService.registerScaleType('myScale', this.ScaleClass, Chart.Scale.linear);
		//*/
		/*
			var data = {
			labels: ["Success", "Error"],
			datasets: [
				{
					data: [50,10],
					backgroundColor: ["red", "#ccc"],
					borderWidth: 0
				}
			]
			};
			
			var myChart = new Chart('mychart', {
				type: 'doughnut',
				data: data,
				options: {
					cutoutPercentage: 80,
					rotation: .8 * Math.PI, 
					circumference: 1.4 * Math.PI,
					maintainAspectRatio: true,
					responsive: true,
					legend: {
						display: false
					},
					animation: {
						animateScale: true,
						animateRotate: true
					},
				},
				plugins: [{
					beforeDraw: function(chart) {
						const width = chart.width;
						const height = chart.height;
						const ctx = chart.ctx;
						ctx.restore();
						const fontSize = (height / 114).toFixed(2);
						ctx.font = fontSize + "em sans-serif";
						ctx.textBaseline = 'middle';
						var total = data.datasets[0].data.reduce(function(previousValue, currentValue, currentIndex, array) {
							return previousValue + currentValue;
						});
						var text = total+"";
						
						//const textX = Math.round((width - this.chart.ctx.measureText(text).width) / 2),
						const textX = Math.round((width - ctx.measureText(text).width) / 2);
						const textY = height/2.5;
	
						var gradient = ctx.createLinearGradient(0, 0, 80, 0);
						gradient.addColorStop(0,"magenta");
						gradient.addColorStop(0.5, "blue");
						gradient.addColorStop(1.0, "red");
						// Fill with gradient
						ctx.fillStyle = gradient;
	
	
						ctx.fillText(text, textX, textY);
						ctx.save();
					}
				}]
			});//*/

	}
	ngOnDestroy() {
		for (const iterator in this.subscriptions) {
			this.subscriptions[iterator].unsubscribe();
		}
		this.unsubscribeSocket();
	}





	openModalCt_1() {
		this.modal_turbine_ct_1.openModalCt_1();
	}
	openModalCt_2() {
		this.modal_turbine_ct_12.openModalCt_1();
	}
	onChartClick(clickEvt: MouseEvent, activeElems: Array<any>) {
		//if click was on a bar, we don't care (we want clicks on labels)
		let dafasfa = this.chart_01.options.scales;
		//debugger;
		//if(activeElems && activeElems.length) return;

		let mousePoint = Chart.helpers.getRelativePosition(clickEvt, this.chart_01);
		let clickYhjhkhk = this.chart_01['scales']['getRegimenTermico'];
		let clickY = this.chart_01['scales']['getRegimenTermico'].getValueForPixel(mousePoint.y);
	}

	language(item) {
		return M3.language[this.globalService.languge][item];
	}
	initializeAt0() {
		for (const calltag in M3.lstTags) {
			if (M3.lstTags.hasOwnProperty(calltag)) {
				this.calltags[calltag] = 0;
				this.calltagsObj[calltag] = { Name: "" };
				this.anyConfig[calltag] = {
					scale_min: M3.lstTags[calltag]['min'],
					scale_max: M3.lstTags[calltag]['max'],
					type: "linear",
					stepSize: 0,
				}
			}
		}
	}
	chartInit() {
		this.chart_01 = new Chart('canvas1', this.chart_config_1);
		//this.chart_rt    = new Chart('chart_rt'    , M3.chart_config_rt);
		//this.chart_rpm   = new Chart('chart_rpm'   , M3.chart_config_rpm);
		//this.chart_mw    = new Chart('chart_mw'    , M3.chart_config_mw);
		//this.chart_rt_t1 = new Chart('chart_rt_t1' , M3.chart_config_rt_t1);
		//this.chart_modal = new Chart('canvas_modal',this.chart_modal_config);
	}
	subscribeFechaYHora() {
		this.everySecond = timer(0, 1000);
		this.subscriptions['everySecond'] = this.everySecond.subscribe(() => {
			this.fechaActual = new Date();

			/*console.log("fechaActualAnterior::: ",this.fechaActualAnterior);
			console.log("fechaActual::: ",this.fechaActual);
			var seconds = (this.fechaActual.getTime() - this.fechaActualAnterior.getTime()) / 1000;
			console.log("fechaActual - Anterior seconds ::: ",seconds);//*/

		});
	}
	subscrubeChangeGraphUpdateTimeRest() {
		if (this.subscriptions['timeRequest'] != undefined) {
			this.subscriptions['timeRequest'].unsubscribe();
		}
		this.timeRequest = timer(0, this.time_on_request * 1000);
		this.subscriptions['timeRequest'] = this.timeRequest.subscribe(() => this.TraerDatosDesdePiWebAPI());
	}
	unsubscrubeChangeGraphUpdateTimeRest() {
		if (this.subscriptions['timeRequest'] != undefined && this.subscriptions["timeRequest"].isStopped == false) {
			this.subscriptions['timeRequest'].unsubscribe();
		}
	}
	subscribeSocketOnStatus() {
		this.subscriptions['onChangeSocketConnect'] = this.eventService.onChangeSocketConnect.subscribe({
			next: (event: EventMessage) => {
				if (event.id === 0) {
					this.unsubscribeSocket();
					this.subscrubeChangeGraphUpdateTimeRest();
				} else if (event.id === 1) {
					this.unsubscrubeChangeGraphUpdateTimeRest();
					this.subscribeSocket();
				}
			}
		});
	}
	subscribeSocket() {
		if (this.globalService.socketConnect) {
			let channelBackPiIsRun = this.socketService.suscribeChannel("back-pi-isrun");

			this.subscriptions['back-pi-isrun'] = this.socketService.onChannelWatch(channelBackPiIsRun - 1)
				.subscribe((data: any) => {
					if (data.isrun == 0) {
						this.whenLosingConnection();
					} else if (data.isrun == 1) {
					}
					//console.log("back-pi-isrun::",data);
				});
			this.subscriptions['back-pi-isrun-error'] = this.socketService.onChannelError(channelBackPiIsRun - 1)
				.subscribe((errorChannel: any) => {
					//console.log("back-pi-isrun-isrun::",errorChannel);
				});
			if (this.globalService.plant.name === "AGUILA" || this.globalService.plant.name === "Default") {
				let channelPiAguila = this.socketService.suscribeChannel("pi-aguila");
				this.subscriptions['pi-aguila-error'] = this.socketService.onChannelError(channelPiAguila - 1)
					.subscribe((errorChannel: any) => { console.log("pi-aguila-error", errorChannel); });

				this.subscriptions['pi-aguila'] = this.socketService.onChannelWatch(channelPiAguila - 1)
					.subscribe((data: any) => {
						if (this.mibanderadecolor) {

							this.fechaActualAnterior = new Date();
							this.dataAdapter(data);
							this.mibanderadecolor = false;
						} else if (this.check_time_refreseh_data()) {
							//console.log(data);
							this.fechaActualAnterior = new Date();
							this.dataAdapter(data);
						}
					});
			} else if (this.globalService.plant.name === "SOL") {
				let channelPiSol = this.socketService.suscribeChannel("pi-sol");
				this.subscriptions['pi-sol-error'] = this.socketService.onChannelError(channelPiSol - 1)
					.subscribe((errorChannel: any) => { console.log("pi-sol-error", errorChannel); });

				this.subscriptions['pi-sol'] = this.socketService.onChannelWatch(channelPiSol - 1)
					.subscribe((data: any) => {
						if (this.mibanderadecolor) {

							this.fechaActualAnterior = new Date();
							this.dataAdapter(data);
							this.mibanderadecolor = false;
						} else if (this.check_time_refreseh_data()) {
							//console.log(data);
							this.fechaActualAnterior = new Date();
							this.dataAdapter(data);
						}
					});
			}
		}
	}
	unsubscribeSocket() {
		['pi-aguila', 'pi-aguila-error'
			, 'pi-sol', 'pi-sol-error'
			, 'back-pi-isrun', 'back-pi-isrun-error'
		].forEach(event => {
			if (this.subscriptions[event] != undefined && this.subscriptions[event].isStopped == false) {
				this.subscriptions[event].unsubscribe();
			}
		});
		this.socketService.removeChannel("pi-aguila");
		this.socketService.removeChannel("pi-sol");
		this.socketService.removeChannel("back-pi-isrun");
	}
	TraerDatosDesdePiWebAPI() {
		/*
		for (const calltag in M3.lstTags) {
			if (M3.lstTags.hasOwnProperty(calltag)) {
				const tagconf  = M3.lstTags[calltag];
				const webID    = (this.globalService.plant.name == 'AGUILA')?tagconf.webId_EAT:tagconf.webId_EST;
				this.peticion(calltag,tagconf,webID);
			}
		}
		//*/

		///*
		console.log(">>>>>>>  TraerDatosDesdePiWebAPI");

		if (this.globalService.plant.name === "AGUILA") {
			this.wsPI.getTagsAguila().subscribe(data => {
				this.dataAdapter(JSON.parse(data));
			}, err => {
				this.whenLosingConnection();
			}
			);
		} else if (this.globalService.plant.name === "SOL") {
			this.wsPI.getTagsSol().subscribe(data => {
				this.dataAdapter(JSON.parse(data));
			}, err => {
				this.whenLosingConnection();
			}
			);
		}
		//*/
	}
	dataAdapter(data) {
		this.modal_turbine_ct_1.data = data;
		this.modal_turbine_ct_1.gettooltip();
		this.modal_turbine_ct_1.dataAdapter();
		




		console.log(data);

		let checkTime = function (i) {
			if (i < 10) {
				i = "0" + i;
			}
			return i;
		}
		let bandera = true;

		for (const calltag in M3.lstTags) {
			if (M3.lstTags.hasOwnProperty(calltag)) {
				let mydata = null;

				const tagconf = M3.lstTags[calltag];
				const webID = (this.globalService.plant.name === "AGUILA" || this.globalService.plant.name === "Default") ? tagconf.webId_EAT : tagconf.webId_EST;

				for (let tag of data.data[0]['Items']) {
					if (tag.WebId == webID) {
						mydata = tag;
						break;
					}
				}
				if (mydata != null) {
					if (bandera) {// regimen termico
						bandera = false;
						let time3 = checkTime(this.fechaActual.getHours()) + ":" + checkTime(this.fechaActual.getMinutes()) + ":" + checkTime(this.fechaActual.getSeconds());
						this.chart_01.data.labels.push(time3);
						if (this.chart_01.data.labels.length >= this.data_per_graph_main + 1) {
							this.chart_01.data.labels.shift();
						}
					}
					let datoprocesado = null;
					if (tagconf.typadata == 'float') datoprocesado = parseFloat(mydata.Value.Value);
					else if (tagconf.typadata == 'int') datoprocesado = parseInt(mydata.Value.Value);
					//console.log(mydata);

					this.calltags[tagconf.calltags] = datoprocesado;
					this.calltagsObj[tagconf.calltags] = mydata;

					this.addDataset(mydata, tagconf, tagconf.calltags, datoprocesado);
					/*
					this.addDatasetRT ( tagconf, tagconf.calltags, this.calltags[tagconf.calltags],['getCTUnoRT','getCTDosRT','getTVRT'],'chart_rt');
					this.addDatasetRT ( tagconf, tagconf.calltags, this.calltags[tagconf.calltags],['getCTUnoRPM','getCTDosRPM','getTVRPM'],'chart_rpm');
					this.addDatasetRT ( tagconf, tagconf.calltags, this.calltags[tagconf.calltags],['getCTUnoMW','getCTDosMW','getTVMW'],'chart_mw');
					this.addDatasetLine ( tagconf, tagconf.calltags, this.calltags[tagconf.calltags],['getCTUnoRT','getCTDosRT','getTVRT'],'chart_rt_t1');
					//*/

					if (tagconf.calltags == 'getPresionAtmosferica') this.wifi = true;

				} else {
					this.calltags[tagconf.calltags] = 0;
					if (tagconf.calltags == 'getPresionAtmosferica') this.wifi = false;
				}

			}
		}
	}
	updateChart(formulario, tagcall) {
		for (let index = 0; index < this.chart_01.config.options.scales.yAxes.length; index++) {
			const element = this.chart_01.config.options.scales.yAxes[index];
			if (element.id == tagcall) {
				if (this.anyConfig[tagcall]['scale_min'] < this.anyConfig[tagcall]['scale_max']) {
					this.chart_01.config.options.scales.yAxes[index].ticks.min = this.anyConfig[tagcall]['scale_min'];
					this.chart_01.config.options.scales.yAxes[index].ticks.max = this.anyConfig[tagcall]['scale_max'];
				} else {
					this.anyConfig[tagcall]['scale_min'] = this.chart_01.config.options.scales.yAxes[index].ticks.min;
					this.anyConfig[tagcall]['scale_max'] = this.chart_01.config.options.scales.yAxes[index].ticks.max;
				}


				(this.anyConfig[tagcall]['stepSize'] == 0) ? this.chart_01.config.options.scales.yAxes[index].ticks.stepSize = null : this.chart_01.config.options.scales.yAxes[index].ticks.stepSize = this.anyConfig[tagcall]['stepSize'];

				this.chart_01.update();
			}
		}


		if (this.dataset_main[tagcall] !== undefined) {
			this.dataset_main[tagcall].hidden = !this.dataset_main[tagcall].hidden;

			for (let index = 0; index < this.chart_01.config.options.scales.yAxes.length; index++) {
				const element = this.chart_01.config.options.scales.yAxes[index];
				if (element.id == tagcall) {
					this.yAxes_main[tagcall].display = true;
					this.chart_01.config.options.scales.yAxes[index].display = true;
					this.chart_01.update();
				}
			}
		}
	}
	cleanDataChart() {
		for (const iterator in this.dataset_main) {
			this.dataset_main[iterator]['data'] = [];
		}
		/*
		for (const iterator of this['chart_rt'].data.datasets) {
			iterator.data = [];
		}
		for (const iterator of this['chart_rpm'].data.datasets) {
			iterator.data = [];
		}
		for (const iterator of this['chart_mw'].data.datasets) {
			iterator.data = [];
		}
		for (const iterator of this['chart_rt_t1'].data.datasets) {
			iterator.data = [];
		}

		this['chart_rt'].update();
		this['chart_rpm'].update();
		this['chart_mw'].update();
		this['chart_rt_t1'].update();
//*/
		this.chart_01.data.labels = [];


		this.chart_01.update();
	}
	dataAdapter___(box:PiServerBox){
		switch (box.name) {
			case "getStreamsetsInterpolatedLast24Hours":
				this.setStreamIn(box);
				break;
			case "pi-aguila":
			case "pi-sol":
			
				this.setStreamIn(box);
				break;
		}

		for (const iterator in this.dataset_main) {
			this.dataset_main[iterator]['fill'] = this.chart_01_fill;
		}

		this.chart_01.update();
		this.showDropdownchart_01 = false;
	}
	dataAdapter(box:PiServerBox){
		for (const idChart in TAGS.listCharts) {
			if (TAGS.listCharts.hasOwnProperty(idChart)) {
				switch (box.name) {
					case "getStreamsetsInterpolatedLast24Hours":
						this.setStreamIn(box);
						break;
					case "pi-aguila":
					case "pi-sol":
						if(this.check_time_refreseh_data(
							TAGS.listCharts[idChart]['controls']['time_refreseh'],
							TAGS.listCharts[idChart]['controls']['timePast']
						)){
							this.charts[idChart].data.labels.push(this.getTime());
							//if(this.charts[idChart].data.labels.length > chart.controls.data_per_graph){
							if(this.charts[idChart].data.labels.length > 24){
								this.charts[idChart].data.labels.shift();
							}
							this.setStreamIn(box);
							
						}
						break;
				}

			}
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
						this.rel_webId_localId[tag.WebId] = new RelWebIdLocalId(tag.WebId, local_tag_key, localtag.active);
						//localtag.data = tag;
						if(localtag.active){
							this.setStreamTagItemsInChart(tag,local_tag_key);
						} 
					}
				}
			}
		}
	}
	setStreamTagItemsInChart(tag:PiServerItem, local_tag_key:string){
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

	}
	addDatasetLine(tagconf, calltag, data, tags, chart) {
		/*El método find() devuelve el valor del primer elemento 
		del array que cumple la función de prueba proporcionada. 
		En cualquier otro caso se devuelve undefined. */
		let existDataset = function (tag) {
			return (tag.id === calltag);
		};

		//if(['getCTUnoRT','getCTDosRT','getTVRT'].includes(calltag)){
		if (tags.includes(calltag)) {
			let tag = this[chart].data.datasets.find(existDataset);
			if (tag == undefined) {

	addDatasetLine2(idChart, values, labels,local_tag_key){
		if(! Array.isArray(values)){
			values = [values];
		}
		if(! Array.isArray(labels)){
			labels = [labels];
		}
		let existDataset = function (tag) {
			return (tag.id === calltag);
		};
		let hiddenDataset = function () {
			switch (calltag) {
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
			switch (calltag) {
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
			//let datasetTag = BasChart.getDatasetTag(this.charts[idChart].data.datasets, chartTag.calltags);
			let tagconf    = TAGS.lstTags[local_tag_key];
			//if(datasetTag == undefined){

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

				},
				ticks: {
					fontColor: hex,
					fontSize: 12,
					min: tagconf.min,
					max: tagconf.max,
					beginAtZero: false
				},
				gridLines: {
					color: "rgb(52, 58, 64)",
					display: false,
				},

				this.charts[idChart].data.datasets.push(newDataset);
				this.charts[idChart].config.options.scales.yAxes.push(newYaxis);
				this.dataSets[idChart+"-"+local_tag_key] = newDataset;
				
				this.charts[idChart].data.labels = labels;
			}else{
				///*
				for (const data of values) {
					(tag.data as number[]).push(data);
					//tag.data.push(data);
					if (tag.data.length >= 24) {
						tag.data.shift();
					}
				}

				//*/
			}
	
		this.charts[idChart].update();
		//console.log(this.charts);
		//console.log(this.charts['chart_est_power_01'].data);
	}



	obtenerValor(po_textoHTML): string {
		/*
		if(!this.wsPI.conexiondirectaPI){
		var obj = JSON.parse(po_textoHTML);
		return obj.Value;
		}

		let lc_cadena = po_textoHTML.toString();
		//console.log(lc_cadena);

		let ln_pos1Value = lc_cadena.indexOf(";Value") + 14;
		//console.log("ln_pos1Value=" + ln_pos1Value);
		let ln_pos2Value = lc_cadena.substring(ln_pos1Value).indexOf(",");
		//console.log("ln_pos2Value=" + ln_pos2Value);
		
		let lc_valor = lc_cadena.substring(ln_pos1Value, ln_pos1Value + ln_pos2Value).trim();
		return lc_valor;
		//*/
		return "";
	}
	peticion(calltag, tagconf, webID) {
		/*
		if(this.isdemo){
		this.calltags[calltag]          = Math.random() * (500 - 51) + 51;

		this.addDataset     ( tagconf, calltag, this.calltags[calltag] );
		this.addDatasetRT   ( tagconf, calltag, this.calltags[calltag],['getCTUnoRT','getCTDosRT','getTVRT'],'chart_rt');
		this.addDatasetRT   ( tagconf, calltag, this.calltags[calltag],['getCTUnoRPM','getCTDosRPM','getTVRPM'],'chart_rpm');
		this.addDatasetRT   ( tagconf, calltag, this.calltags[calltag],['getCTUnoMW','getCTDosMW','getTVMW'],'chart_mw');
		this.addDatasetLine ( tagconf, calltag, this.calltags[calltag],['getCTUnoRT','getCTDosRT','getTVRT'],'chart_rt_t1');
		//this.addDatasetModal(label,calltag,this.calltags[calltag]);
		return;
		}
		this.wsPI.getTag(webID,(this.globalService.plant.name === "AGUILA")).subscribe(
		data=>{
			let datoprocesado = null;
			if(tagconf.typadata == 'float')     datoprocesado = parseFloat(this.obtenerValor(data));
			else if(tagconf.typadata == 'int')  datoprocesado = parseInt(this.obtenerValor(data));
			
			this.calltags[calltag]          = datoprocesado;
			
			this.addDataset(tagconf,calltag,datoprocesado);
			this.addDatasetRT ( tagconf, calltag, this.calltags[calltag],['getCTUnoRT','getCTDosRT','getTVRT'],'chart_rt');
			this.addDatasetRT ( tagconf, calltag, this.calltags[calltag],['getCTUnoRPM','getCTDosRPM','getTVRPM'],'chart_rpm');
			this.addDatasetRT ( tagconf, calltag, this.calltags[calltag],['getCTUnoMW','getCTDosMW','getTVMW'],'chart_mw');
			this.addDatasetLine ( tagconf, calltag, this.calltags[calltag],['getCTUnoRT','getCTDosRT','getTVRT'],'chart_rt_t1');
			
			if(calltag=='getPresionAtmosferica')this.wifi = true;
		},
		err=>{
			this.calltags[calltag]          = 0;
			if(calltag=='getPresionAtmosferica')this.wifi = false;
		}
		);
		//*/
	}
	cambiarIdioma(pc_idioma: string) {
		//this.translate.use(pc_idioma);
	}
}
