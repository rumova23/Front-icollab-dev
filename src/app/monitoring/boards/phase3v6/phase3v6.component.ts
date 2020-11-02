import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, AfterContentInit } from '@angular/core';
import * as Highcharts from "highcharts";
import { Subscription, timer ,interval} from "rxjs";
import { ConnectSocketChannelComponent } from "src/app/shared/socket/connectSocketChannel.component";
import { GlobalService } from "src/app/core/globals/global.service";
import { MonitoringTrService } from "../../services/monitoringTr.service";
import { ToastrManager } from "ng6-toastr-notifications";
import { EventService } from "src/app/core/services/event.service";
import { SocketService } from "src/app/core/services/socket.service";
import { SecurityService } from "src/app/core/services/security.service";
import { EventMessage } from "src/app/core/models/EventMessage";
import { EventBlocked } from "src/app/core/models/EventBlocked";
import { PiServerBox } from "../../models/piServer/piServerBox";
import { Chart } from "chart.js";

declare var $: any;

import { InteractiveImageTurbineCT1Component } from '../phase3/components/interactive-image-turbine-ct1/interactive-image-turbine-ct1.component';
import { ChartControl } from '../../models/chart/ChartControl';
import { ChartControls } from '../../common/high-charts-controls/models/highchartsControls.model';
import { DatePipe } from '@angular/common';
@Component({
	selector: "app-phase3v6",
	templateUrl: "./phase3v6.component.html",
	styleUrls: ["./phase3v6.component.scss"],
})
export class Phase3v6Component extends ConnectSocketChannelComponent implements OnInit, OnDestroy, AfterViewInit  {
	@ViewChild("modal_turbine_ct_1") modal_turbine_ct_1: InteractiveImageTurbineCT1Component;
    @ViewChild("modal_turbine_ct_2") modal_turbine_ct_2: InteractiveImageTurbineCT1Component;
	@ViewChild("modal_turbine_ct_3") modal_turbine_ct_3: InteractiveImageTurbineCT1Component;
	@ViewChild("modal_ct_1_dona") modal_ct_1_dona: ElementRef;
	@ViewChild("modal_ct_2_dona") modal_ct_2_dona: ElementRef;
	@ViewChild("modal_ct_3_dona") modal_ct_3_dona: ElementRef;
	@ViewChild("donaChart1_modal") donaChart1_modal: ElementRef; donaChart1_modal_x;
	@ViewChild("donaChart2_modal") donaChart2_modal: ElementRef; donaChart2_modal_x;
	@ViewChild("donaChart3_modal") donaChart3_modal: ElementRef; donaChart3_modal_x;

	@ViewChild("LineChart2") LineChart2: ElementRef;
	chartLine2C;
	@ViewChild("donaChart1") donaChart1: ElementRef;
	chartDona_1;
	@ViewChild("donaChart2") donaChart2: ElementRef;
	chartDona_2;
	@ViewChild("donaChart3") donaChart3: ElementRef;
	chartDona_3;
	public timeCurrent             : Date           = new Date();  // para los modales



	public subscriptions: Subscription[] = []; // almacena las todos los observables

	conectToPi: boolean = false;
	mapWebIdToKeyTag: Map<string, string> = new Map();
	tags: Map<string, Object> = new Map();
	mapColors: Map<string, string> = new Map([
		["potenciaNeta"          ,"#f3f315"],
		["potenciaCcdv"          ,"#00ACEE"],
		["regimentermico"        ,"#39FF14"],
		["temperatura_ambiente"  ,"#aff000"],
		["presion_atmosferica"   ,"#c5f327"],
		["humedad"               ,"#d9d5fe"],
		["ct_1_gas"              ,"#c5f327"],
		["ct_1_diesel"           ,"#5d76d3"],
		["ct_1_RT"               ,"#CCFF00"],
		["ct_1_Potencia"         ,"#ff526a"],
		["ct_1_RPM"              ,"#FF0000"],
		["ct_2_gas"              ,"#FFA500"],
		["ct_2_diesel"           ,"#FFC0CB"],
		["ct_2_RT"               ,"#008000"],
		["ct_2_Potencia"         ,"#FFFF00"],
		["ct_2_RPM"              ,"#0000FF"],
		["ct_3_gas"              ,"#FFFFFF"],
		["ct_3_diesel"           ,"#FFCC99"],
		["ct_3_RT"               ,"#CCFFFF"],
		["ct_3_Potencia"         ,"#CC3300"],
		["ct_3_RPM"              ,"#99CC99"],
	]);
	isSerieActivate_1: Map<string, boolean> = new Map([
		["temperatura_ambiente"  ,false],
		["presion_atmosferica"   ,false],
		["humedad"               ,false],
		["potenciaNeta"          ,true ],
		["potenciaCcdv"          ,true ],
		["regimentermico"        ,true ],
		["ct_1_gas"              ,false],
		["ct_1_diesel"           ,false],
		["ct_1_RT"               ,false],
		["ct_1_Potencia"         ,false],
		["ct_1_RPM"              ,false],
		["ct_2_gas"              ,false],
		["ct_2_diesel"           ,false],
		["ct_2_RT"               ,false],
		["ct_2_Potencia"         ,false],
		["ct_2_RPM"              ,false],
		["ct_3_gas"              ,false],
		["ct_3_diesel"           ,false],
		["ct_3_RT"               ,false],
		["ct_3_Potencia"         ,false],
		["ct_3_RPM"              ,false],
	]);
	pl = "";


	rojo = "red";
	amarillo = "yellow";
	verde = "#4cc900";

	chartControlLineChart2:ChartControls= new ChartControls('spline','dinamic',30);
	constructor(
		public globalService: GlobalService,
		public monitoringTrService: MonitoringTrService,
		public toastr: ToastrManager,
		public eventService: EventService,
		public socketService: SocketService,
		public securityService: SecurityService,
		private datePipe: DatePipe
	) {
		super(globalService, eventService, socketService, securityService);
	
	}


	ngOnDestroy() {
		this.connectSocketChannelNgOnDestroy();
	}
	ngOnInit() {
		
		let url = `/assets/css/theme/content/monitoring.css`;
		let urlActual = document.getElementById("content_theme").getAttribute("href");
		if(url != urlActual){
			document.getElementById("content_theme").setAttribute("href", url);
		}
		this.globalService.aside_open = !this.globalService.aside_open;
	}
	ngAfterViewInit(){
		timer(7000).subscribe(()=>{
			this.connect();
		});
	}
	initTags() {
		this.tags.set("temperatura_ambiente", {
			tagName: "",
			min:0,
  			max:590,
			f: "setTemperaturaAmbiente",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IglyQAAAU0VSVklET1JfUElcUDJBMDgyMTE",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqgxwMAAAUElUVlxULkNFQS4yMjQ1",
		});
		this.tags.set("presion_atmosferica", {
			tagName: "",
			min:0,
  			max:1200,
			f: "setPresionAtmosferica",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgmSQAAAU0VSVklET1JfUElcUDJBMDgyMTM",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqg5gIAAAUElUVlw1MlBDLUFJLTAwNQ",
		});
		this.tags.set("humedad", {
			tagName: "",
			min:0,
  			max:100,
			f: "sethumedad",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgmCQAAAU0VSVklET1JfUElcUDJBMDgyMTI",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqgtgIAAAUElUVlw1MlBDLUFJLTAwNA",
		});
		this.tags.set("potenciaNeta", {
			tagName: "",
			min:0,
  			max:590,
			f: "setPotenciaNeta",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgJiUAAAU0VSVklET1JfUElcREFBMDgyMDY",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqg1gMAAAUElUVlxULkNFQS4yMjYz",
		});
		this.tags.set("potenciaCcdv", {
			tagName: "",
			min:0,
  			max:590,
			f: "setPotenciaCcdv",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgICUAAAU0VSVklET1JfUElcREFBMDgxMTE",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqg1QMAAAUElUVlxULkNFQS4yMjYy",
		});
		this.tags.set("regimentermico", {
			tagName: "",
			min:0,
  			max:14000,
			f: "setRegimenTermico",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgGCUAAAU0VSVklET1JfUElcREFBMDgxMDM",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqg2wMAAAUElUVlxULkNFQS4yMjY4",
		});
		this.tags.set("ct_1_gas", {
			tagName: "",
			min:0,
  			max:50000,
			f: "setCt1Gas",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IguB8AAAU0VSVklET1JfUElcRzFBMDgwNzM",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqglAAAAAUElUVlw1MUNFQUdGMDAxXzAx",
		});
		this.tags.set("ct_1_diesel", { tagName: "",
			min:0,
  			max:50000, f: "setCt1Die", value: [], webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgnSIAAAU0VSVklET1JfUElcRzFBMDgwOTc", webIdS: "" });
		this.tags.set("ct_1_RT", {
			tagName: "",
			min:0,
  			max:14000,
			f: "setCt1RT",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgGyUAAAU0VSVklET1JfUElcREFBMDgxMDY",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqg3gMAAAUElUVlxULkNFQS4yMjcx",
		});
		this.tags.set("ct_1_Potencia", {
			tagName: "",
			min:0,
  			max:200,
			f: "setCt1Pot",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6Igmh8AAAU0VSVklET1JfUElcRzFBMDgwMzA",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqgMgAAAAUElUVlw1MUNFQUdJMDAyXzAx",
		});
		this.tags.set("ct_1_RPM", {
			tagName: "",
			min:0,
  			max:4150,
			f: "setCt1Rpm",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6Ig3SIAAAU0VSVklET1JfUElcRzFBMDg0MDQ",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqgkQAAAAUElUVlw1MU1CSzAxQ1MwMDE",
		});
		this.tags.set("ct_2_gas", {
			tagName: "",
			min:0,
  			max:50000,
			f: "setCt2Gas",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgICAAAAU0VSVklET1JfUElcRzJBMDgwNzM",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqg9QAAAAUElUVlw1MkNFQUdGMDAxXzAx",
		});
		this.tags.set("ct_2_diesel", { tagName: "",
			min:0,
  			max:50000, f: "setCt2Die", value: [], webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgLCAAAAU0VSVklET1JfUElcRzJBMDgwOTc", webIdS: "" });
		this.tags.set("ct_2_RT", {
			tagName: "",
			min:0,
  			max:14000,
			f: "setCt2RT",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgHCUAAAU0VSVklET1JfUElcREFBMDgxMDc",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqg3wMAAAUElUVlxULkNFQS4yMjcy",
		});
		this.tags.set("ct_2_Potencia", {
			tagName: "",
			min:0,
  			max:200,
			f: "setCt2Pot",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgDSAAAAU0VSVklET1JfUElcRzJBMDgwNDY",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqglwAAAAUElUVlw1MkNFQUdJMDAyXzAx",
		});
		this.tags.set("ct_2_RPM", {
			tagName: "",
			min:0,
  			max:4150,
			f: "setCt2Rpm",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgciMAAAU0VSVklET1JfUElcRzJBMDg0MDQ",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqg8gAAAAUElUVlw1Mk1CSzAxQ1MwMDE",
		});
		this.tags.set("ct_3_gas", { tagName: "",
			min:0,
  			max:0, f: "setCt3Gas", value: [], webIdA: "", webIdS: "" });
		this.tags.set("ct_3_diesel", { tagName: "",
			min:0,
  			max:0, f: "setCt3Die", value: [], webIdA: "", webIdS: "" });
		this.tags.set("ct_3_RT", {
			tagName: "",
			min:0,
  			max:14000,
			f: "setCt3RT",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgGiUAAAU0VSVklET1JfUElcREFBMDgxMDU",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqg4AMAAAUElUVlxULkNFQS4yMjcz",
		});
		this.tags.set("ct_3_Potencia", {
			tagName: "",
			min:0,
  			max:250,
			f: "setCt3Pot",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6Ig4h4AAAU0VSVklET1JfUElcRUhBMDgwMTk",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqgDwMAAAUElUVlxULkNFQS4yMDQ0",
		});
		this.tags.set("ct_3_RPM", {
			tagName: "",
			min:0,
  			max:4150,
			f: "setCt3Rpm",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgSiIAAAU0VSVklET1JfUElcRUhBMDg3MDE",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqg_gwAAAUElUVlxDRUEuNDI0",
		});
	}

	getTagName(key): string {
		return this.tags.has(key) ? this.tags.get(key)["tagName"]:'';
	}
	getValue(key) {
		if(!this.tags.has(key))return [null, 0];
		let tag = this.tags.get(key)["value"]["length"] > 0 ? this.tags.get(key)["value"][this.tags.get(key)["value"]["length"] - 1] : [null, 0];
		return tag;
	}
	initInterpolated() {
		let webIds = [];
		let idPi = 0;

		if (this.globalService.plant.name.toLowerCase() == "sol") {
			idPi = 2;
			this.pl = "webIdS";
		}
		if (this.globalService.plant.name.toLowerCase() == "aguila") {
			idPi = 1;
			this.pl = "webIdA";
		}

		let a = this.tags.entries();
		for (let nextValue = a.next(); nextValue.done !== true; nextValue = a.next()) {
			if (nextValue.value[1][this.pl] != "") webIds.push(nextValue.value[1][this.pl]);
		}
		this.monitoringTrService.getStreamsetsInterpolatedLastHoursSeconts(idPi, webIds, 1, this.chartControlLineChart2.timeRefreseh).subscribe(
			(data: PiServerBox) => {
				if (data.data[0].error_response) {
					this.toastr.errorToastr("Error", "Error con la solicitud");
					return 0;
				}
				this.conectToPi = true;
				data.data[0].Items.forEach((item) => {
					let a = this.tags.entries();
					for (let nextValue = a.next(); nextValue.done !== true; nextValue = a.next()) {
						let webIdLocal = nextValue.value[1][this.pl];
						if (item.WebId && item.WebId == webIdLocal) {
							if (!this.mapWebIdToKeyTag.has(item.WebId)) this.mapWebIdToKeyTag.set(item.WebId, nextValue.value[0]);
							this.tags.get(nextValue.value[0])["tagName"] = item.Name;
							this.tags.get(nextValue.value[0])["value"] = item.Items.map((itemInterpolated) => [new Date(itemInterpolated.Value.Timestamp).getTime(), itemInterpolated.Value.Value]);
						}
					}
				});
			},
			(errorData) => {
				this.conectToPi = false;
				//this.toastr.errorToastr(Constants.ERROR_LOAD, 'Clima actual');
			},
			() => {
				//Complete
				if (this.conectToPi) {
					this.initCharts();
					this.socketFase3();
					timer(3000).subscribe(()=>{
					});

					if(this.subscriptions['interval_chartLine_01_updateCharLine'] != undefined && this.subscriptions['interval_chartLine_01_updateCharLine']['isStopped']==false){
						this.subscriptions['interval_chartLine_01_updateCharLine'].unsubscribe();
						this.subscriptions['interval_chartLine_01_updateCharLine']=undefined;
					}
					if(this.subscriptions['interval_interval_uodateDona'] != undefined && this.subscriptions['interval_interval_uodateDona']['isStopped']==false){
						this.subscriptions['interval_interval_uodateDona'].unsubscribe();
						this.subscriptions['interval_interval_uodateDona']=undefined;
					}
					this.subscriptions['interval_chartLine_01_updateCharLine'] = interval(1000*this.chartControlLineChart2.timeRefreseh).subscribe(()=>{
						this.chartLine_01_updateCharLine();
					});
					
					this.subscriptions['interval_interval_uodateDona'] = interval(3000).subscribe(()=>{
						this.dona_1_update();
						this.dona_2_update();
						this.dona_3_update();
						this.dona_1_modal_update();
						this.dona_2_modal_update();
						this.dona_3_modal_update();
					});
				}
			}
		);
	}
	socketFase3() {
		this.subscriptions['onChangeSocketConnect'] = this.eventService.onChangeSocketConnect
			.subscribe({
				next: (event: EventMessage) => {
					if(event.id === 0){
						this.disconnected();
					}else if(event.id === 1){
						this.connect();
					}
				}
			}
		);
		let canal = "pi-" + this.globalService.plant.name.toLowerCase();
		this.subscribeSocketChannel(
			canal,
			(data) => this.inSocketData(data)
		);
	}
	inSocketData(data: any) {
		let date = new Date();
		for (const plant of data.data) {
			if (!plant.error_response) {
				for (const tag of plant.Items) {
					if (!this.mapWebIdToKeyTag.has(tag.WebId)) this.mapWebIdToKeyTag.set(tag.WebId, this.findLocalKeyTagByWebId(tag.WebId));
					if (this.mapWebIdToKeyTag.get(tag.WebId) != null) {
						let localTag = this.tags.get(this.mapWebIdToKeyTag.get(tag.WebId));
						
						localTag["value"] = [];
						//if (localTag["value"]["length"] > 100) localTag["value"].shift();
						localTag["value"].push([date.getTime(), tag.Value.Value]);


						if ("" == localTag["tagName"]) localTag["tagName"] = tag.Name;
						//this[localTag['f']](tag.Value.Value,date.getTime());
					}
				}
			}
		}


		this.modal_turbine_ct_1.dataAdapter(data);
		this.modal_turbine_ct_2.dataAdapter(data);
		this.modal_turbine_ct_3.dataAdapter(data);

		//this.addStreamsetsValueInChart(data);
	}
	findLocalKeyTagByWebId(webId): string {
		let result: string = null;
		let a = this.tags.entries();
		for (let nextValue = a.next(); nextValue.done !== true; nextValue = a.next()) {
			let webIdLocal = nextValue.value[1][this.pl];
			if (webId == webIdLocal) {
				result = nextValue.value[0];
			}
		}
		return result;
	}
	connect() {
		this.initTags();
		this.initCharts();
		this.initInterpolated();
	}
	disconnected() {
		this.conectToPi = false;
		this.initTags();
		this.initCharts();
	}
	initCharts(){
		this.chartLine_01_Init();
		this.dona_1();
		this.dona_2();
		this.dona_3();
		this.dona_1_modal();
		this.dona_2_modal();
		this.dona_3_modal();
	}
	chartLine_01_Init() {
		if (this.chartLine2C != undefined) {
			this.chartLine2C.destroy();
			this.chartLine2C = undefined;
		}
		let opt: any = {			
			credits: {
				enabled: false
			},		
			chart: {
				height: 400,
				zoomType: 'x',
				type: this.chartControlLineChart2.typeGraph,
				//animation: Highcharts.svg, // don't animate in old IE
				marginRight: 10,

				backgroundColor: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
					stops: [
						[0, "rgb(0, 0, 0)"],
						[1, "rgb(0, 0, 0)"],
					],
				},
			},

			time: {
				useUTC: false,
			},

			title: {
				text: "",
			},

			plotOptions: {
				series: {
					fillOpacity: 0.2,
					marker: {
						enabled: false,
					},
				},
			},

			xAxis: {
				type: "datetime",
				tickPixelInterval: 150,
				labels: {
					style: {
						fontSize: "13px",
						color: "#fff",
					},
					rotation: -20,
					formatter: function () {
						const d = new Date(this.value)
						const year = d.getFullYear() // 2019
						const month = d.getMonth()+1;
						const day = d.getDate();
						const hour = d.getHours();
						const min = d.getMinutes();
						const sec = d.getSeconds();
						let month2;
						let day2;
						let hour2;
						let min2;
						let sec2 ;
						
						month2 = (month < 10) ? `0${month}`:`${month}`;
						day2   = (day   < 10) ? `0${day}`:`${day}`;
						hour2  = (hour  < 10) ? `0${hour}`:`${hour}`;
						min2   = (min   < 10) ? `0${min}`:`${min}`;
						sec2 = (sec < 10) ? `0${sec}`:`${sec}`;
						return `${day2}/${month2}/${year} ${hour2}:${min2}:${sec2}`;
						//return this.this.this.datePipe.transform(new Date(this.value), 'dd/MM/yyyy HH:mm:ss');
						//return this.value ;
					}//*/
					
				},
			},

			yAxis: [],

			tooltip: {
				headerFormat: "<b>{series.name}</b><br/>",
				pointFormat: "{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}",
				borderWidth: 0,
				backgroundColor: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
					stops: [
						[0, 'rgba(96, 96, 96, .8)'],
						[1, 'rgba(16, 16, 16, .8)']
					]
				},
				style: {
					color: '#FFF'
				}
			},

			legend: {
				enabled: false,
			},

			exporting: {
				enabled: true,
				
				buttons: {
					contextButton: {
						menuItems: ["viewFullscreen",'downloadPNG','downloadXLS']
					}
				}
			},

			series: [],
		};
		let ymax = undefined;
		let ymin = undefined;

		let a = this.tags.entries();
		for (let nextValue = a.next(); nextValue.done !== true; nextValue = a.next()) {
			if("static" == this.chartControlLineChart2.typeScale){
				ymax = this.tags.get(nextValue.value[0])['max'];
				ymin = this.tags.get(nextValue.value[0])['min'];
			}
			opt.yAxis.push(
				{
					id: "y-axis-"+nextValue.value[0],
					gridLineWidth: 0,
					labels: {
						style: {
							color: this.mapColors.get(nextValue.value[0]),
							fontWeight: "bold",
						}
					},
					title: {
						enabled: false,
						text: nextValue.value[0],
						style: {
							color: this.mapColors.get(nextValue.value[0]),
						},
					},
					showEmpty: false,
					max:ymax,
					min:ymin
					//opposite: true
				}
			);
			opt.series.push(
				{
					id : nextValue.value[0],
					name: nextValue.value[1]['tagName'],
					yAxis: "y-axis-"+nextValue.value[0],
					visible: ["potenciaNeta","potenciaCcdv","regimentermico"].includes(nextValue.value[0]),
					color: this.mapColors.get(nextValue.value[0]),
					data: nextValue.value[1]["value"],
				}
			);
		}
		this.chartLine2C = Highcharts.chart(this.LineChart2.nativeElement, opt);
	}
	chartLine_01_updateCharLine(){
		let a = this.tags.entries();
		let data = null;
		let serie = null;
		for (let nextValue = a.next(); nextValue.done !== true; nextValue = a.next()) {
			serie = this.chartLine2C.get(nextValue.value[0]);
			data = nextValue.value[1]["value"][nextValue.value[1]["value"]["length"]-1]
			serie.addPoint(data, false, true);
		}
		this.chartLine2C.redraw(true);
	}
	chartLine_01_ToogleSerie(key){
		this.isSerieActivate_1.set(key,!this.isSerieActivate_1.get(key));
		this.isSerieActivate_1.get(key) ? this.chartLine2C.get(key).show() : this.chartLine2C.get(key).hide();
	}
	tester(){
		/*this.chartLine2C.series[0].hide();
		this.chartLine2C.series[0].show();//*/
		var series = this.chartLine2C.get('series-2');
		alert ('The series-2 series\' name is '+ series.name);
		series.show();
	}
	getClassIcon(key):string{
		let cl = "";
		let v = this.getValue(key)[1];
		if(["ct_1_RT","ct_2_RT","ct_3_RT"].includes(key)){
			if(v == 0 ) cl = 'icon-rojo';
			if(v > 0 && v <= 10000 ) cl = 'icon-verde';
			if(v > 10000 && v < 10100 ) cl = 'icon-amarillo';
			if(v >=  10100 ) cl = 'icon-rojo';
		}else if(["ct_1_Potencia","ct_2_Potencia","ct_3_Potencia"].includes(key)){
			if(v <= 10 ) cl = 'icon-rojo';
			if(v > 10 && v < 100) cl = 'icon-amarillo';
			if(v >= 100) cl = 'icon-verde';
		}else if(["ct_1_diesel","ct_2_diesel","ct_3_diesel"].includes(key)){			
			if(v < 5 ) cl = 'icon-rojo';
			if(v >= 5 && v < 20) cl = 'icon-amarillo';
			if(v >= 20 ) cl = 'icon-verde';
		}else if(["ct_1_gas","ct_2_gas","ct_3_gas"].includes(key)){			
			if(v < 10000 ) cl = 'icon-rojo';
			if(v >= 10000 && v < 25000) cl = 'icon-amarillo';
			if(v >= 25000) cl = 'icon-verde';
		}else if(["ct_1_RPM","ct_2_RPM","ct_3_RPM"].includes(key)){			
			if(v <= 3200 ) cl = 'icon-rojo';
			if(v > 3200 && v < 3500) cl = 'icon-amarillo';
			if(v >= 3500) cl = 'icon-verde';
		}
		
		return cl;
	}
	dona_1() {
		
		if (this.chartDona_1 != undefined) {
			this.chartDona_1.destroy();
			this.chartDona_1 = undefined;
		}
		let opt: any = {
			credits: {
				enabled: false
			},		
			colors: ["#CD7F32","#ffffff","#ffffff"],

			legend: {
				enabled: false,
			},
			chart: {
				height: 150,
				type: "column",
				inverted: true,
				polar: true,
				backgroundColor: {
					linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
					stops: [
						[0, "#000"],
						[1, "#000"],
					],
				},
				style: {
					fontFamily: "'Unica One', sans-serif",
				},
				plotBorderColor: "#606063",
			},
			title: {
				text: "",
			},
			
			tooltip: {
				borderWidth: 0,
				backgroundColor: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
					stops: [
						[0, 'rgba(96, 96, 96, .8)'],
						[1, 'rgba(16, 16, 16, .8)']
					]
				},
				style: {
					color: '#FFF'
				}
			},
			pane: {
				size: "80%",
				innerSize: "50%",
				endAngle: 270,
			},
			xAxis: {
				gridLineColor: "#707073",

				tickInterval: 1,
				labels: {
					align: "right",
					useHTML: true,
					allowOverlap: true,
					step: 1,
					y: 3,
					style: {
						fontSize: "13px",
						color: "#fff",
					},
				},
				lineWidth: 0,
				categories: [
					'<span class="f9" style="font-size: 9px;">Potencia</span> <span class="f16"><span id="flag" class="flag no">' + "</span></span>"
					,'<span class="f9" style="font-size: 9px;">RT</span><span class="f16"><span id="flag" class="flag us">' + "</span></span>"
					,'<span class="f9" style="font-size: 6px;">RPM</span><span class="f16"><span id="flag" class="flag us">' + "</span></span>"
				],
			},
			yAxis: [{
				id: "y-axis-rt",
				min:0,
				max:14000,
				crosshair: {
					enabled: true,
					color: "#333",
				},
				lineWidth: 0,
				tickInterval: 1000,
				reversedStacks: false,
				endOnTick: true,
				showLastLabel: true,
				labels: {
					enabled: false,
					style: {
						color: "#fff",
					},
				},
			},{
				id: "y-axis-potencia",
				offset: 10,
				min:0,
				max:200,
                gridLineWidth: 0,
				crosshair: {
					enabled: true,
					color: "#333",
				},
				lineWidth: 0,
				tickInterval: 25,
				reversedStacks: false,
				endOnTick: true,
				showLastLabel: true,
				labels: {
					enabled: true,
					style: {
						color: "#fff",
					},
				},
			},{
				id: "y-axis-rpm",
				offset: 10,
				min:0,
				max:4150,
                gridLineWidth: 0,
				crosshair: {
					enabled: true,
					color: "#333",
				},
				lineWidth: 0,
				tickInterval: 25,
				reversedStacks: false,
				endOnTick: true,
				showLastLabel: true,
				labels: {
					enabled: true,
					style: {
						color: "#fff",
					},
				},
			}],
			plotOptions: {
				column: {
					stacking: "normal",
					borderWidth: 0,
					pointPadding: 0,
					groupPadding: 0.15,
				},
			},
			series: [
				{
					id:"ct_1_RT",
					yAxis: "y-axis-rt",
					data: [0, 105,0],
					name: '',
				},
				{
					id:"ct_1_Potencia",
					yAxis: "y-axis-potencia",
					data: [132, 0,0],
					name: '',
				},
				{
					id:"ct_1_RPM",
					yAxis: "y-axis-rpm",
					data: [0, 0, 1000],
					name: '',
				},
			],
			exporting: {
				enabled: false,
			},
		};
		let vp = this.getValue('ct_1_Potencia')[1];
		let vr = this.getValue('ct_1_RT')[1];
		let vrpm = this.getValue('ct_1_RPM')[1];
		opt.series[0]['data'][1]=vr;
		opt.series[1]['data'][0]=vp;
		opt.series[2]['data'][2]=vrpm;

		opt.colors = this.getColorChartDonas(vp,vr,vrpm).colors;
		this.chartDona_1 = Highcharts.chart(this.donaChart1.nativeElement, opt);
	}
	
	dona_1_modal(){		
		if (this.donaChart1_modal_x != undefined) {
			this.donaChart1_modal_x.destroy();
			this.donaChart1_modal_x = undefined;
		}
		let opt: any = {
			credits: {
				enabled: false
			},		
			colors: ["#CD7F32","#ffffff","#ffffff"],

			legend: {
				enabled: false,
			},
			chart: {
				type: "column",
				inverted: true,
				polar: true,
				backgroundColor: {
					linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
					stops: [
						[0, "#000"],
						[1, "#000"],
					],
				},
				style: {
					fontFamily: "'Unica One', sans-serif",
				},
				plotBorderColor: "#606063",
			},
			title: {
				text: "",
			},
			tooltip: {
				borderWidth: 0,
				backgroundColor: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
					stops: [
						[0, 'rgba(96, 96, 96, .8)'],
						[1, 'rgba(16, 16, 16, .8)']
					]
				},
				style: {
					color: '#FFF'
				}
			},
			pane: {
				size: "80%",
				innerSize: "50%",
				endAngle: 270,
			},
			xAxis: {
				gridLineColor: "#707073",

				tickInterval: 1,
				labels: {
					align: "right",
					useHTML: true,
					allowOverlap: true,
					step: 1,
					y: 3,
					style: {
						fontSize: "13px",
						color: "#fff",
					},
				},
				lineWidth: 0,
				categories: [
					'<span class="f9">Potencia</span> <span class="f16"><span id="flag" class="flag no">' + "</span></span>"
					,'<span class="f9">RT</span><span class="f16"><span id="flag" class="flag us">' + "</span></span>"
					,'<span class="f9">RPM</span><span class="f16"><span id="flag" class="flag us">' + "</span></span>"
				],
			},
			yAxis: [{
				id: "y-axis-rt",
				offset: -20,
				min:0,
				max:14000,
				crosshair: {
					enabled: true,
					color: "#333",
				},
				lineWidth: 0,
				tickInterval: 1000,
				reversedStacks: false,
				endOnTick: true,
				showLastLabel: true,
				labels: {
					enabled: true,
					style: {
						color: "#fff",
					},
				},
			},{
				id: "y-axis-potencia",
				offset: -40,
				min:0,
				max:200,
				crosshair: {
					enabled: true,
					color: "#333",
				},
				lineWidth: 0,
				tickInterval: 25,
				reversedStacks: false,
				endOnTick: true,
				showLastLabel: true,
				labels: {
					enabled: true,
					style: {
						color: "#fff",
					},
				},
			},{
				id: "y-axis-rpm",
				offset: 5,
				min:0,
				max:4150,
				crosshair: {
					enabled: true,
					color: "#333",
				},
				lineWidth: 0,
				tickInterval: 500,
				reversedStacks: false,
				endOnTick: true,
				showLastLabel: true,
				labels: {
					enabled: true,
					style: {
						color: "#fff",
					},
				},
			}],
			plotOptions: {
				column: {
					stacking: "normal",
					borderWidth: 0,
					pointPadding: 0,
					groupPadding: 0.15,
				},
			},
			series: [
				{
					id:"ct_1_RT",
					yAxis: "y-axis-rt",
					data: [0, 105],
				},
				{
					id:"ct_1_Potencia",
					yAxis: "y-axis-potencia",
					data: [132, 0],
				},
				{
					id:"ct_1_RPM",
					yAxis: "y-axis-rpm",
					data: [0, 0, 1000],
					name: '',
				},
			],
			
			exporting: {
				enabled: true,
				buttons: {
					contextButton: {
						menuItems: ['downloadPNG']
					}
				}
			},
		};

		let vp = this.getValue('ct_1_Potencia')[1];
		let vr = this.getValue('ct_1_RT')[1];
		let vrpm = this.getValue('ct_1_RPM')[1];
		opt.series[0]['data'][1]=vr;
		opt.series[1]['data'][0]=vp;
		opt.series[2]['data'][2]=vrpm;

		
		opt.colors = this.getColorChartDonas(vp,vr,vrpm).colors;
		this.donaChart1_modal_x = Highcharts.chart(this.donaChart1_modal.nativeElement, opt);
	}
	dona_2() {		
		if (this.chartDona_2 != undefined) {
			this.chartDona_2.destroy();
			this.chartDona_2 = undefined;
		}
		let opt: any = {
			credits: {
				enabled: false
			},		
			colors: ["#CD7F32","#ffffff","#ffffff"],

			legend: {
				enabled: false,
			},
			chart: {
				height: 150,
				type: "column",
				inverted: true,
				polar: true,
				backgroundColor: {
					linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
					stops: [
						[0, "#000"],
						[1, "#000"],
					],
				},
				style: {
					fontFamily: "'Unica One', sans-serif",
				},
				plotBorderColor: "#606063",
			},
			title: {
				text: "",
			},
			
			tooltip: {
				borderWidth: 0,
				backgroundColor: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
					stops: [
						[0, 'rgba(96, 96, 96, .8)'],
						[1, 'rgba(16, 16, 16, .8)']
					]
				},
				style: {
					color: '#FFF'
				}
			},
			pane: {
				size: "80%",
				innerSize: "50%",
				endAngle: 270,
			},
			xAxis: {
				gridLineColor: "#707073",

				tickInterval: 1,
				labels: {
					align: "right",
					useHTML: true,
					allowOverlap: true,
					step: 1,
					y: 3,
					style: {
						fontSize: "13px",
						color: "#fff",
					},
				},
				lineWidth: 0,
				categories: [
					'<span class="f9" style="font-size: 9px;">Potencia</span> <span class="f16"><span id="flag" class="flag no">' + "</span></span>"
					,'<span class="f9" style="font-size: 9px;">RT</span><span class="f16"><span id="flag" class="flag us">' + "</span></span>"
					,'<span class="f9" style="font-size: 6px;">RPM</span><span class="f16"><span id="flag" class="flag us">' + "</span></span>"
				],
			},
			yAxis: [{
				id: "y-axis-rt",
				min:0,
				max:14000,
				crosshair: {
					enabled: true,
					color: "#333",
				},
				lineWidth: 0,
				tickInterval: 1000,
				reversedStacks: false,
				endOnTick: true,
				showLastLabel: true,
				labels: {
					enabled: false,
					style: {
						color: "#fff",
					},
				},
			},{
				id: "y-axis-potencia",
				offset: 10,
				min:0,
				max:200, 
                gridLineWidth: 0,
				crosshair: {
					enabled: true,
					color: "#333",
				},
				lineWidth: 0,
				tickInterval: 25,
				reversedStacks: false,
				endOnTick: true,
				showLastLabel: true,
				labels: {
					enabled: true,
					style: {
						color: "#fff",
					},
				},
			},{
				id: "y-axis-rpm",
				offset: 10,
				min:0,
				max:4150,
                gridLineWidth: 0,
				crosshair: {
					enabled: true,
					color: "#333",
				},
				lineWidth: 0,
				tickInterval: 25,
				reversedStacks: false,
				endOnTick: true,
				showLastLabel: true,
				labels: {
					enabled: true,
					style: {
						color: "#fff",
					},
				},
			}],
			plotOptions: {
				column: {
					stacking: "normal",
					borderWidth: 0,
					pointPadding: 0,
					groupPadding: 0.15,
				},
			},
			series: [
				{
					id:"ct_2_RT",
					yAxis: "y-axis-rt",
					data: [0, 105],
				},
				{
					id:"ct_2_Potencia",
					yAxis: "y-axis-potencia",
					data: [132, 0],
				},
				{
					id:"ct_2_RPM",
					yAxis: "y-axis-rpm",
					data: [0, 0, 1000],
					name: '',
				},
			],
			exporting: {
				enabled: false,
			},
		};
		let vp = this.getValue('ct_2_Potencia')[1];
		let vr = this.getValue('ct_2_RT')[1];
		let vrpm = this.getValue('ct_2_RPM')[1];
		opt.series[0]['data'][1]=vr;
		opt.series[1]['data'][0]=vp;
		opt.series[2]['data'][2]=vrpm;

		
		opt.colors = this.getColorChartDonas(vp,vr,vrpm).colors;
		this.chartDona_2 = Highcharts.chart(this.donaChart2.nativeElement, opt);
	}
	dona_2_modal() {		
		if (this.donaChart2_modal_x != undefined) {
			this.donaChart2_modal_x.destroy();
			this.donaChart2_modal_x = undefined;
		}
		let opt: any = {
			credits: {
				enabled: false
			},		
			colors: ["#CD7F32","#ffffff","#ffffff"],

			legend: {
				enabled: false,
			},
			chart: {
				type: "column",
				inverted: true,
				polar: true,
				backgroundColor: {
					linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
					stops: [
						[0, "#000"],
						[1, "#000"],
					],
				},
				style: {
					fontFamily: "'Unica One', sans-serif",
				},
				plotBorderColor: "#606063",
			},
			title: {
				text: "",
			},
			tooltip: {
				borderWidth: 0,
				backgroundColor: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
					stops: [
						[0, 'rgba(96, 96, 96, .8)'],
						[1, 'rgba(16, 16, 16, .8)']
					]
				},
				style: {
					color: '#FFF'
				}
			},
			pane: {
				size: "80%",
				innerSize: "50%",
				endAngle: 270,
			},
			xAxis: {
				gridLineColor: "#707073",

				tickInterval: 1,
				labels: {
					align: "right",
					useHTML: true,
					allowOverlap: true,
					step: 1,
					y: 3,
					style: {
						fontSize: "13px",
						color: "#fff",
					},
				},
				lineWidth: 0,
				categories: [
					'<span class="f9">Potencia</span> <span class="f16"><span id="flag" class="flag no">' + "</span></span>"
					,'<span class="f9">RT</span><span class="f16"><span id="flag" class="flag us">' + "</span></span>"
					,'<span class="f9">RPM</span><span class="f16"><span id="flag" class="flag us">' + "</span></span>"
				],
			},
			yAxis: [{
				id: "y-axis-rt",
				offset: -20,
				min:0,
				max:14000,
				crosshair: {
					enabled: true,
					color: "#333",
				},
				lineWidth: 0,
				tickInterval: 1000,
				reversedStacks: false,
				endOnTick: true,
				showLastLabel: true,
				labels: {
					enabled: true,
					style: {
						color: "#fff",
					},
				},
			},{
				id: "y-axis-potencia",
				offset: -40,
				min:0,
				max:200,
				crosshair: {
					enabled: true,
					color: "#333",
				},
				lineWidth: 0,
				tickInterval: 25,
				reversedStacks: false,
				endOnTick: true,
				showLastLabel: true,
				labels: {
					enabled: true,
					style: {
						color: "#fff",
					},
				},
			},{
				id: "y-axis-rpm",
				offset: 5,
				min:0,
				max:4150,
				crosshair: {
					enabled: true,
					color: "#333",
				},
				lineWidth: 0,
				tickInterval: 500,
				reversedStacks: false,
				endOnTick: true,
				showLastLabel: true,
				labels: {
					enabled: true,
					style: {
						color: "#fff",
					},
				},
			}],
			plotOptions: {
				column: {
					stacking: "normal",
					borderWidth: 0,
					pointPadding: 0,
					groupPadding: 0.15,
				},
			},
			series: [
				{
					id:"ct_2_RT",
					yAxis: "y-axis-rt",
					data: [0, 105],
				},
				{
					id:"ct_2_Potencia",
					yAxis: "y-axis-potencia",
					data: [132, 0],
				},
				{
					id:"ct_2_RPM",
					yAxis: "y-axis-rpm",
					data: [0, 0, 1000],
					name: '',
				},
			],
			exporting: {
				enabled: true,
				buttons: {
					contextButton: {
						menuItems: ['downloadPNG']
					}
				}
			},
		};
		let vp = this.getValue('ct_2_Potencia')[1];
		let vr = this.getValue('ct_2_RT')[1];
		let vrpm = this.getValue('ct_2_RPM')[1];
		opt.series[0]['data'][1]=vr;
		opt.series[1]['data'][0]=vp;
		opt.series[2]['data'][2]=vrpm;

		
		opt.colors = this.getColorChartDonas(vp,vr,vrpm).colors;
		this.donaChart2_modal_x = Highcharts.chart(this.donaChart2_modal.nativeElement, opt);
	}
	dona_3() {		
		if (this.chartDona_3 != undefined) {
			this.chartDona_3.destroy();
			this.chartDona_3 = undefined;
		}
		let opt: any = {
			credits: {
				enabled: false
			},		
			colors: ["#CD7F32","#ffffff","#ffffff"],

			legend: {
				enabled: false,
			},
			chart: {
				height: 150,
				type: "column",
				inverted: true,
				polar: true,
				backgroundColor: {
					linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
					stops: [
						[0, "#000"],
						[1, "#000"],
					],
				},
				style: {
					fontFamily: "'Unica One', sans-serif",
				},
				plotBorderColor: "#606063",
			},
			title: {
				text: "",
			},
			
			tooltip: {
				borderWidth: 0,
				backgroundColor: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
					stops: [
						[0, 'rgba(96, 96, 96, .8)'],
						[1, 'rgba(16, 16, 16, .8)']
					]
				},
				style: {
					color: '#FFF'
				}
			},
			pane: {
				size: "80%",
				innerSize: "50%",
				endAngle: 270,
			},
			xAxis: {
				gridLineColor: "#707073",

				tickInterval: 1,
				labels: {
					align: "right",
					useHTML: true,
					allowOverlap: true,
					step: 1,
					y: 3,
					style: {
						fontSize: "13px",
						color: "#fff",
					},
				},
				lineWidth: 0,
				categories: [
					'<span class="f9" style="font-size: 9px;">Potencia</span> <span class="f16"><span id="flag" class="flag no">' + "</span></span>"
					,'<span class="f9" style="font-size: 9px;">RT</span><span class="f16"><span id="flag" class="flag us">' + "</span></span>"
					,'<span class="f9" style="font-size: 6px;">RPM</span><span class="f16"><span id="flag" class="flag us">' + "</span></span>"
				],
			},
			yAxis: [{
				id: "y-axis-rt",
				min:0,
				max:14000,
				crosshair: {
					enabled: true,
					color: "#333",
				},
				lineWidth: 0,
				tickInterval: 1000,
				reversedStacks: false,
				endOnTick: true,
				showLastLabel: true,
				labels: {
					enabled: false,
					style: {
						color: "#fff",
					},
				},
			},{
				id: "y-axis-potencia",
				offset: 10,
				min:0,
				max:200,
                gridLineWidth: 0,
				crosshair: {
					enabled: true,
					color: "#333",
				},
				lineWidth: 0,
				tickInterval: 25,
				reversedStacks: false,
				endOnTick: true,
				showLastLabel: true,
				labels: {
					enabled: true,
					style: {
						color: "#fff",
					},
				},
			},{
				id: "y-axis-rpm",
				offset: 10,
				min:0,
				max:4150,
                gridLineWidth: 0,
				crosshair: {
					enabled: true,
					color: "#333",
				},
				lineWidth: 0,
				tickInterval: 25,
				reversedStacks: false,
				endOnTick: true,
				showLastLabel: true,
				labels: {
					enabled: true,
					style: {
						color: "#fff",
					},
				},
			}],
			plotOptions: {
				column: {
					stacking: "normal",
					borderWidth: 0,
					pointPadding: 0,
					groupPadding: 0.15,
				},
			},
			series: [
				{
					id:"ct_3_RT",
					yAxis: "y-axis-rt",
					data: [0, 105],
				},
				{
					id:"ct_3_Potencia",
					yAxis: "y-axis-potencia",
					data: [132, 0],
				},
				{
					id:"ct_3_RPM",
					yAxis: "y-axis-rpm",
					data: [0, 0, 1000],
					name: '',
				},
			],
			exporting: {
				enabled: false,
			},
		};
		let vp = this.getValue('ct_3_Potencia')[1];
		let vr = this.getValue('ct_3_RT')[1];
		let vrpm = this.getValue('ct_3_RPM')[1];
		opt.series[0]['data'][1]=vr;
		opt.series[1]['data'][0]=vp;
		opt.series[2]['data'][2]=vrpm;

		
		opt.colors = this.getColorChartDonas(vp,vr,vrpm).colors;
		this.chartDona_3 = Highcharts.chart(this.donaChart3.nativeElement, opt);
	}
	dona_3_modal() {		
		if (this.donaChart3_modal_x != undefined) {
			this.donaChart3_modal_x.destroy();
			this.donaChart3_modal_x = undefined;
		}
		let opt: any = {
			credits: {
				enabled: false
			},		
			colors: ["#CD7F32","#ffffff","#ffffff"],

			legend: {
				enabled: false,
			},
			chart: {
				type: "column",
				inverted: true,
				polar: true,
				backgroundColor: {
					linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
					stops: [
						[0, "#000"],
						[1, "#000"],
					],
				},
				style: {
					fontFamily: "'Unica One', sans-serif",
				},
				plotBorderColor: "#606063",
			},
			title: {
				text: "",
			},
			tooltip: {
				borderWidth: 0,
				backgroundColor: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
					stops: [
						[0, 'rgba(96, 96, 96, .8)'],
						[1, 'rgba(16, 16, 16, .8)']
					]
				},
				style: {
					color: '#FFF'
				}
			},
			pane: {
				size: "80%",
				innerSize: "50%",
				endAngle: 270,
			},
			xAxis: {
				gridLineColor: "#707073",

				tickInterval: 1,
				labels: {
					align: "right",
					useHTML: true,
					allowOverlap: true,
					step: 1,
					y: 3,
					style: {
						fontSize: "13px",
						color: "#fff",
					},
				},
				lineWidth: 0,
				categories: [
					'<span class="f9">Potencia</span> <span class="f16"><span id="flag" class="flag no">' + "</span></span>"
					,'<span class="f9">RT</span><span class="f16"><span id="flag" class="flag us">' + "</span></span>"
					,'<span class="f9">RPM</span><span class="f16"><span id="flag" class="flag us">' + "</span></span>"
				],
			},
			yAxis: [{
				id: "y-axis-rt",
				offset: -20,
				min:0,
				max:14000,
				crosshair: {
					enabled: true,
					color: "#333",
				},
				lineWidth: 0,
				tickInterval: 1000,
				reversedStacks: false,
				endOnTick: true,
				showLastLabel: true,
				labels: {
					enabled: true,
					style: {
						color: "#fff",
					},
				},
			},{
				id: "y-axis-potencia",
				offset: -40,
				min:0,
				max:200,
				crosshair: {
					enabled: true,
					color: "#333",
				},
				lineWidth: 0,
				tickInterval: 25,
				reversedStacks: false,
				endOnTick: true,
				showLastLabel: true,
				labels: {
					enabled: true,
					style: {
						color: "#fff",
					},
				},
			},{
				id: "y-axis-rpm",
				offset: 5,
				min:0,
				max:4150,
				crosshair: {
					enabled: true,
					color: "#333",
				},
				lineWidth: 0,
				tickInterval: 500,
				reversedStacks: false,
				endOnTick: true,
				showLastLabel: true,
				labels: {
					enabled: true,
					style: {
						color: "#fff",
					},
				},
			}],
			plotOptions: {
				column: {
					stacking: "normal",
					borderWidth: 0,
					pointPadding: 0,
					groupPadding: 0.15,
				},
			},
			series: [
				{
					id:"ct_3_RT",
					yAxis: "y-axis-rt",
					data: [0, 105],
				},
				{
					id:"ct_3_Potencia",
					yAxis: "y-axis-potencia",
					data: [132, 0],
				},
				{
					id:"ct_3_RPM",
					yAxis: "y-axis-rpm",
					data: [0, 0, 1000],
					name: '',
				},
			],
			exporting: {
				enabled: true,
				buttons: {
					contextButton: {
						menuItems: ['downloadPNG']
					}
				}
			},
		};
		let vp = this.getValue('ct_3_Potencia')[1];
		let vr = this.getValue('ct_3_RT')[1];
		let vrpm = this.getValue('ct_3_RPM')[1];
		opt.series[0]['data'][1]=vr;
		opt.series[1]['data'][0]=vp;
		opt.series[2]['data'][2]=vrpm;

		
		opt.colors = this.getColorChartDonas(vp,vr,vrpm).colors;
		this.donaChart3_modal_x = Highcharts.chart(this.donaChart3_modal.nativeElement, opt);
	}
	getColorChartDonas(vp,vr,vrpm){
		let opt = {
			colors:["","",""]
		}
		/*
		opt.colors[0]=  this.rojo;  //rt
		opt.colors[1]=  this.amarillo;//potencia
		opt.colors[2]=  this.verde;  //rpm
		//*/

		if(vp <= 10){
			opt.colors[1]=  this.rojo;//ct_1_Potencia
		}else if(vp > 10 && vp < 100){
			opt.colors[1]=  this.amarillo;//ct_1_Potencia
		}else if(vp >= 100){
			opt.colors[1]=  this.verde;//ct_1_Potencia
		}
		if(vr <= 10000){
			opt.colors[0]=  this.verde;
		}else if(vr > 10000 && vr < 10100){
			opt.colors[0]=  this.amarillo;
		}else if(vr >= 10100){
			opt.colors[0]=  this.rojo;
		}
		if(vrpm <= 3200){
			opt.colors[2]=  this.rojo;
		}else if(vrpm > 3200 && vrpm < 3500){
			opt.colors[2]=  this.amarillo;
		}else if(vrpm >= 3500){
			opt.colors[2]=  this.verde;
		}//*/
		return opt;
	}
	dona_1_update(){
		if(this.chartDona_1.get('ct_1_Potencia') && this.chartDona_1.get('ct_1_RT')){
			let vp = this.getValue('ct_1_Potencia')[1];
			let vr = this.getValue('ct_1_RT')[1];
			let vrpm = this.getValue('ct_1_RPM')[1];
			let opt = this.getColorChartDonas(vp,vr,vrpm);
			

			this.chartDona_1.get('ct_1_Potencia').setData([vp,0,0],false,false);
			this.chartDona_1.get('ct_1_RT').setData([0,vr,0],false,false);
			this.chartDona_1.get('ct_1_RPM').setData([0,0,vrpm],false,false);
			this.chartDona_1.update({
				colors:opt.colors			
			},false);
			this.chartDona_1.redraw(true);
		}
		//*/
	}
	dona_2_update(){
		if(this.chartDona_2.get('ct_2_Potencia') && this.chartDona_2.get('ct_2_RT')){
			
			let vp = this.getValue('ct_2_Potencia')[1];
			let vr = this.getValue('ct_2_RT')[1];
			let vrpm = this.getValue('ct_2_RPM')[1];
			let opt = this.getColorChartDonas(vp,vr,vrpm);
			
			

			this.chartDona_2.get('ct_2_RT').setData([0,vr],false,false);
			this.chartDona_2.get('ct_2_Potencia').setData([vp,0],false,false);
			this.chartDona_2.get('ct_2_RPM').setData([0,0,vrpm],false,false);
			this.chartDona_2.update({
				colors:opt.colors			
			},false);
			this.chartDona_2.redraw(true);
		}
	}
	dona_3_update(){
		if(this.chartDona_3.get('ct_3_Potencia') && this.chartDona_3.get('ct_3_RT')){
			
			let vp = this.getValue('ct_3_Potencia')[1];
			let vr = this.getValue('ct_3_RT')[1];
			let vrpm = this.getValue('ct_3_RPM')[1];
			let opt = this.getColorChartDonas(vp,vr,vrpm);
			
			

			this.chartDona_3.get('ct_3_RT').setData([0,vr],false,false);
			this.chartDona_3.get('ct_3_Potencia').setData([vp,0],false,false);
			this.chartDona_3.get('ct_3_RPM').setData([0,0,vrpm],false,false);
			this.chartDona_3.update({
				colors:opt.colors			
			},false);
			this.chartDona_3.redraw(true);
		}
	}
	
	dona_1_modal_update(){
		if(this.donaChart1_modal_x.get('ct_1_Potencia') && this.donaChart1_modal_x.get('ct_1_RT')){
			let vp = this.getValue('ct_1_Potencia')[1];
			let vr = this.getValue('ct_1_RT')[1];
			let vrpm = this.getValue('ct_1_RPM')[1];
			let opt = this.getColorChartDonas(vp,vr,vrpm);
			

			

			this.donaChart1_modal_x.get('ct_1_RT').setData([0,vr],false,false);
			this.donaChart1_modal_x.get('ct_1_Potencia').setData([vp,0],false,false);
			this.donaChart1_modal_x.get('ct_1_RPM').setData([0,0,vrpm],false,false);
			this.donaChart1_modal_x.update({
				colors:opt.colors			
			},false);
			this.donaChart1_modal_x.redraw(true);
		}
	}
	
	dona_2_modal_update(){
		
		if(this.donaChart2_modal_x.get('ct_2_Potencia') && this.donaChart2_modal_x.get('ct_2_RT')){
			let vp = this.getValue('ct_2_Potencia')[1];
			let vr = this.getValue('ct_2_RT')[1];
			let vrpm = this.getValue('ct_2_RPM')[1];
			let opt = this.getColorChartDonas(vp,vr,vrpm);
			
			


			this.donaChart2_modal_x.get('ct_2_RT').setData([0,vr],false,false);
			this.donaChart2_modal_x.get('ct_2_Potencia').setData([vp,0],false,false);
			this.donaChart2_modal_x.get('ct_2_RPM').setData([0,0,vrpm],false,false);
			this.donaChart2_modal_x.update({
				colors:opt.colors			
			},false);
			this.donaChart2_modal_x.redraw(true);
		}
	}
	
	dona_3_modal_update(){
		if(this.donaChart3_modal_x.get('ct_3_Potencia') && this.donaChart3_modal_x.get('ct_3_RT')){
			
			let vp = this.getValue('ct_3_Potencia')[1];
			let vr = this.getValue('ct_3_RT')[1];
			let vrpm = this.getValue('ct_3_RPM')[1];
			let opt = this.getColorChartDonas(vp,vr,vrpm);
			
			


			this.donaChart3_modal_x.get('ct_3_RT').setData([0,vr],false,false);
			this.donaChart3_modal_x.get('ct_3_Potencia').setData([vp,0],false,false);
			this.donaChart3_modal_x.get('ct_3_RPM').setData([0,0,vrpm],false,false);
			this.donaChart3_modal_x.update({
				colors:opt.colors			
			},false);
			this.donaChart3_modal_x.redraw(true);
		}
	}
	isEat(){
		return (this.globalService.plant.name.toLowerCase() == "aguila") ? true: false;
	}
	openModalCt_1() {
        this.modal_turbine_ct_1.openModalCt_1();
	}
    openModalCt_2() {
        this.modal_turbine_ct_2.openModalCt_1();
    }
    openModalCt_3(){
        this.modal_turbine_ct_3.openModalCt_1();
	}
	openModal_ct_1_dona(){
		$(this.modal_ct_1_dona.nativeElement).modal('show');
	}
	openModal_ct_2_dona(){
		$(this.modal_ct_2_dona.nativeElement).modal('show');
	}
	openModal_ct_3_dona(){
		$(this.modal_ct_3_dona.nativeElement).modal('show');
	}
	modifyChartLineChart2(event:ChartControls){
		this.chartControlLineChart2 = event;
		let ymax = null;
		let ymin = null;
		let y = null;
		for (let index = 0; index < this.chartLine2C.yAxis.length; index++) {
			y = this.chartLine2C.yAxis[index];
			if("static" == event.typeScale){
				debugger
				ymax = this.tags.get(y.userOptions.id.split("y-axis-")[1])['max'];
				ymin = this.tags.get(y.userOptions.id.split("y-axis-")[1])['min'];
			}
			this.chartLine2C.yAxis[index].update({
				max : ymax,
				min : ymin
			},false);
			
		}
		this.chartLine2C.update({
			chart: {
				type: event.typeGraph,
			},
		},false);
		
		if(this.subscriptions['interval_chartLine_01_updateCharLine'] != undefined && this.subscriptions['interval_chartLine_01_updateCharLine']['isStopped']==false){
			this.subscriptions['interval_chartLine_01_updateCharLine'].unsubscribe();
			this.subscriptions['interval_chartLine_01_updateCharLine']=undefined;

			this.subscriptions['interval_chartLine_01_updateCharLine'] = interval(1000 * event.timeRefreseh).subscribe(()=>{
				this.chartLine_01_updateCharLine();
			});
		}

		this.chartLine2C.redraw(true);
		//debugger;
	}
}
