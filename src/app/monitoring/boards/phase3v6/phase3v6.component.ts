import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
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
@Component({
	selector: "app-phase3v6",
	templateUrl: "./phase3v6.component.html",
	styleUrls: ["./phase3v6.component.scss"],
})
export class Phase3v6Component extends ConnectSocketChannelComponent implements OnInit, OnDestroy {
	@ViewChild("LineChart2") LineChart2: ElementRef;
	chartLine2C;
	@ViewChild("donaChart1") donaChart1: ElementRef;
	chartDona_1;

	public subscriptions: Subscription[] = []; // almacena las todos los observables

	conectToPi: boolean = false;
	mapWebIdToKeyTag: Map<string, string> = new Map();
	tags: Map<string, Object> = new Map();
	mapColors: Map<string, string> = new Map([
		["potenciaNeta"          ,"#5d76d3"],
		["potenciaCcdv"          ,"#9741f6"],
		["regimentermico"        ,"#4cc900"],
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

	constructor(
		public globalService: GlobalService,
		public monitoringTrService: MonitoringTrService,
		public toastr: ToastrManager,
		public eventService: EventService,
		public socketService: SocketService,
		public securityService: SecurityService
	) {
		super(globalService, eventService, socketService, securityService);
	
	}
	private addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
	}

	ngOnDestroy() {
		this.connectSocketChannelNgOnDestroy();
	}
	ngOnInit() {
		this.addBlock(1, "");
		let url = `/assets/css/theme/content/monitoring.css`;
		document.getElementById("content_theme").setAttribute("href", url);
		this.connect();
		/*timer(3000).subscribe(()=>{
				this.addBlock(2, '');
			});//*/
	}

	initTags() {
		this.tags.set("temperatura_ambiente", {
			tagName: "",
			f: "setTemperaturaAmbiente",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IglyQAAAU0VSVklET1JfUElcUDJBMDgyMTE",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqgxwMAAAUElUVlxULkNFQS4yMjQ1",
		});
		this.tags.set("presion_atmosferica", {
			tagName: "",
			f: "setPresionAtmosferica",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgmSQAAAU0VSVklET1JfUElcUDJBMDgyMTM",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqg5gIAAAUElUVlw1MlBDLUFJLTAwNQ",
		});
		this.tags.set("humedad", {
			tagName: "",
			f: "sethumedad",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgmCQAAAU0VSVklET1JfUElcUDJBMDgyMTI",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqgtgIAAAUElUVlw1MlBDLUFJLTAwNA",
		});
		this.tags.set("potenciaNeta", {
			tagName: "",
			f: "setPotenciaNeta",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgJiUAAAU0VSVklET1JfUElcREFBMDgyMDY",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqg1gMAAAUElUVlxULkNFQS4yMjYz",
		});
		this.tags.set("potenciaCcdv", {
			tagName: "",
			f: "setPotenciaCcdv",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgICUAAAU0VSVklET1JfUElcREFBMDgxMTE",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqg1QMAAAUElUVlxULkNFQS4yMjYy",
		});
		this.tags.set("regimentermico", {
			tagName: "",
			f: "setRegimenTermico",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgGCUAAAU0VSVklET1JfUElcREFBMDgxMDM",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqg2wMAAAUElUVlxULkNFQS4yMjY4",
		});
		this.tags.set("ct_1_gas", {
			tagName: "",
			f: "setCt1Gas",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IguB8AAAU0VSVklET1JfUElcRzFBMDgwNzM",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqglAAAAAUElUVlw1MUNFQUdGMDAxXzAx",
		});
		this.tags.set("ct_1_diesel", { tagName: "", f: "setCt1Die", value: [], webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgnSIAAAU0VSVklET1JfUElcRzFBMDgwOTc", webIdS: "" });
		this.tags.set("ct_1_RT", {
			tagName: "",
			f: "setCt1RT",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgGyUAAAU0VSVklET1JfUElcREFBMDgxMDY",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqg3gMAAAUElUVlxULkNFQS4yMjcx",
		});
		this.tags.set("ct_1_Potencia", {
			tagName: "",
			f: "setCt1Pot",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6Igmh8AAAU0VSVklET1JfUElcRzFBMDgwMzA",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqgMgAAAAUElUVlw1MUNFQUdJMDAyXzAx",
		});
		this.tags.set("ct_1_RPM", {
			tagName: "",
			f: "setCt1Rpm",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6Ig3SIAAAU0VSVklET1JfUElcRzFBMDg0MDQ",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqgkQAAAAUElUVlw1MU1CSzAxQ1MwMDE",
		});
		this.tags.set("ct_2_gas", {
			tagName: "",
			f: "setCt2Gas",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgICAAAAU0VSVklET1JfUElcRzJBMDgwNzM",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqg9QAAAAUElUVlw1MkNFQUdGMDAxXzAx",
		});
		this.tags.set("ct_2_diesel", { tagName: "", f: "setCt2Die", value: [], webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgLCAAAAU0VSVklET1JfUElcRzJBMDgwOTc", webIdS: "" });
		this.tags.set("ct_2_RT", {
			tagName: "",
			f: "setCt2RT",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgHCUAAAU0VSVklET1JfUElcREFBMDgxMDc",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqg3wMAAAUElUVlxULkNFQS4yMjcy",
		});
		this.tags.set("ct_2_Potencia", {
			tagName: "",
			f: "setCt2Pot",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgDSAAAAU0VSVklET1JfUElcRzJBMDgwNDY",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqglwAAAAUElUVlw1MkNFQUdJMDAyXzAx",
		});
		this.tags.set("ct_2_RPM", {
			tagName: "",
			f: "setCt2Rpm",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgciMAAAU0VSVklET1JfUElcRzJBMDg0MDQ",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqg8gAAAAUElUVlw1Mk1CSzAxQ1MwMDE",
		});
		this.tags.set("ct_3_gas", { tagName: "", f: "setCt3Gas", value: [], webIdA: "", webIdS: "" });
		this.tags.set("ct_3_diesel", { tagName: "", f: "setCt3Die", value: [], webIdA: "", webIdS: "" });
		this.tags.set("ct_3_RT", {
			tagName: "",
			f: "setCt3RT",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgGiUAAAU0VSVklET1JfUElcREFBMDgxMDU",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqg4AMAAAUElUVlxULkNFQS4yMjcz",
		});
		this.tags.set("ct_3_Potencia", {
			tagName: "",
			f: "setCt3Pot",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6Ig4h4AAAU0VSVklET1JfUElcRUhBMDgwMTk",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqgDwMAAAUElUVlxULkNFQS4yMDQ0",
		});
		this.tags.set("ct_3_RPM", {
			tagName: "",
			f: "setCt3Rpm",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgSiIAAAU0VSVklET1JfUElcRUhBMDg3MDE",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqg_gwAAAUElUVlxDRUEuNDI0",
		});
	}

	getTagName(key): string {
		return this.tags.get(key)["tagName"];
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
		this.monitoringTrService.getStreamsetsInterpolatedLastHoursSeconts(idPi, webIds, 1, 3).subscribe(
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
				this.addBlock(2, "");
				//this.toastr.errorToastr(Constants.ERROR_LOAD, 'Clima actual');
			},
			() => {
				//Complete
				if (!this.conectToPi) this.addBlock(2, "");
				if (this.conectToPi) {
					this.chartLine_01_Init();
					this.dona_1();
					this.socketFase3();
					timer(3000).subscribe(()=>{
						this.addBlock(2, "");
					});//*/
					
					interval(3000).subscribe(()=>{
						this.chartLine_01_updateCharLine();
						this.dona_1_update();
						//this.chartLine_01_Init();
						//this.chartLine2C.redraw(true);
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
		console.log(data);

		let date = new Date();
		for (const plant of data.data) {
			if (!plant.error_response) {
				for (const tag of plant.Items) {
					if (!this.mapWebIdToKeyTag.has(tag.WebId)) this.mapWebIdToKeyTag.set(tag.WebId, this.findLocalKeyTagByWebId(tag.WebId));
					if (this.mapWebIdToKeyTag.get(tag.WebId) != null) {
						let localTag = this.tags.get(this.mapWebIdToKeyTag.get(tag.WebId));

						localTag["value"].push([date.getTime(), tag.Value.Value]);

						if (localTag["value"]["length"] > 100) localTag["value"].shift();

						if ("" == localTag["tagName"]) localTag["tagName"] = tag.Name;
						//this[localTag['f']](tag.Value.Value,date.getTime());
					}
				}
			}
		}

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
		this.chartLine_01_Init();
		this.dona_1();
		this.initInterpolated();
	}
	disconnected() {
		this.conectToPi = false;
		this.initTags();
		this.chartLine_01_Init();
		this.dona_1();
	}
	
	chartLine_01_Init() {
		if (this.chartLine2C != undefined) {
			this.chartLine2C.destroy();
			this.chartLine2C = undefined;
		}
		let opt: any = {
			chart: {
				type: "spline",
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
				},
			},

			yAxis: [],

			tooltip: {
				headerFormat: "<b>{series.name}</b><br/>",
				pointFormat: "{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}",
			},

			legend: {
				enabled: false,
			},

			exporting: {
				enabled: false,
			},

			series: [],
		};
		let a = this.tags.entries();
		for (let nextValue = a.next(); nextValue.done !== true; nextValue = a.next()) {
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
					//opposite: true
				}
			);
			opt.series.push(
				{
					id : nextValue.value[0],
					name: nextValue.value[0],
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
			//debugger;
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
		if(key == "ct_1_RT"){
			if(v <  1000 ) cl = 'icon-rojo';
			if(v >= 1000 ) cl = 'icon-verde';
		}else if(key == "ct_1_Potencia"){
			if(v <= 10 ) cl = 'icon-rojo';
			if(v > 10 ) cl = 'icon-amarillo';
			if(v >= 80) cl = 'icon-verde';
		}else if(key == "ct_1_diesel"){			
			if(v < 5 ) cl = 'icon-rojo';
			if(v >= 5 ) cl = 'icon-verde';
		}else if(key == "ct_1_gas"){			
			if(v < 1000 ) cl = 'icon-rojo';
			if(v >= 1000) cl = 'icon-verde';
		}else if(key == "ct_1_RPM"){			
			if(v <= 10 ) cl = 'icon-rojo';
			if(v > 10) cl = 'icon-verde';
		}
		
		return cl;
	}
	dona_1() {
		
		if (this.chartDona_1 != undefined) {
			this.chartDona_1.destroy();
			this.chartDona_1 = undefined;
		}
		let opt: any = {
			colors: ["#CD7F32","#ffffff"],

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
				outside: true,
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
				categories: ['RT <span class="f16"><span id="flag" class="flag no">' + "</span></span>", 'Potencia <span class="f16"><span id="flag" class="flag us">' + "</span></span>"],
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
				tickInterval: 25,
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
					data: [0, 105],
				},
				{
					id:"ct_1_Potencia",
					yAxis: "y-axis-potencia",
					data: [132, 0],
				},
			],
			exporting: {
				enabled: false,
			},
		};
		let vp = this.getValue('ct_1_Potencia')[1];
		let vr = this.getValue('ct_1_RT')[1];
		opt.series[0]['data'][1]=vr;
		opt.series[1]['data'][0]=vp;

		if(vp <= 10){
			opt.colors[0]=  this.rojo;//ct_1_Potencia
		}else if(vp > 10 && vp < 80){
			opt.colors[0]=  this.amarillo;//ct_1_Potencia
		}else if(vp >= 80){
			opt.colors[0]=  this.verde;//ct_1_Potencia
		}
		if(vr < 1000){
			opt.colors[1]=  this.rojo;
		}else if(vr >= 1000){
			opt.colors[1]=  this.verde;
		}
		this.chartDona_1 = Highcharts.chart(this.donaChart1.nativeElement, opt);
	}
	dona_1_update(){
		this.dona_1();
		/*
		let opt = {
			colors:["",""]
		}
		
		let vp = this.getValue('ct_1_Potencia')[1];
		let vr = this.getValue('ct_1_RT')[1];
		if(vp <= 10){
			opt.colors[0]=  this.rojo;//ct_1_Potencia
		}else if(vp > 10 && vp < 80){
			opt.colors[0]=  this.amarillo;//ct_1_Potencia
		}else if(vp >= 80){
			opt.colors[0]=  this.verde;//ct_1_Potencia
		}
		if(vr < 1000){
			opt.colors[1]=  this.rojo;
		}else if(vr >= 1000){
			opt.colors[1]=  this.verde;
		}
		this.chartDona_1.get('ct_1_RT').data=[0,vr];
		this.chartDona_1.get('ct_1_Potencia').data=[vp,0];
		this.chartDona_1.update({
			colors:opt.colors			
		});
		this.chartDona_1.redraw(true);
		//*/
	}
}
