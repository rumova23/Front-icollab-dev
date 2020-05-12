import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import * as Highcharts from "highcharts";
import { Subscription, timer } from "rxjs";
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
	chartdona_1;

	public subscriptions: Subscription[] = []; // almacena las todos los observables

	conectToPi: boolean = false;
	tags: Map<String, Object> = new Map();
	mapToTag: Map<String, String> = new Map();

	colorPotNet = "#5d76d3";
	colorCcdv = "#9741f6";
	colorRT = "#4cc900";
	pl = "";

	mediaDona1: Chart = []; //MediaDona1

	constructor(
		public globalService: GlobalService,
		public monitoringTrService: MonitoringTrService,
		public toastr: ToastrManager,
		public eventService: EventService,
		public socketService: SocketService,
		public securityService: SecurityService
	) {
		super(globalService, eventService, socketService, securityService);
		this.initTags();
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
		this.initTags();
		this.initInterpolated();
		/*timer(3000).subscribe(()=>{
				this.addBlock(2, '');
			});//*/
	}

	getTagName(key): string {
		return this.tags.get(key)["tagName"];
	}
	getValue(key): string {
		let tag = this.tags.get(key)["value"]["length"] > 0 ? this.tags.get(key)["value"][this.tags.get(key)["value"]["length"] - 1] : [null, 0];
		return tag;
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
		this.tags.set("ct-1-gas", {
			tagName: "",
			f: "setCt1Gas",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IguB8AAAU0VSVklET1JfUElcRzFBMDgwNzM",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqglAAAAAUElUVlw1MUNFQUdGMDAxXzAx",
		});
		this.tags.set("ct-1-diesel", { tagName: "", f: "setCt1Die", value: [], webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgnSIAAAU0VSVklET1JfUElcRzFBMDgwOTc", webIdS: "" });
		this.tags.set("ct-1-RT", {
			tagName: "",
			f: "setCt1RT",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgGyUAAAU0VSVklET1JfUElcREFBMDgxMDY",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqg3gMAAAUElUVlxULkNFQS4yMjcx",
		});
		this.tags.set("ct-1-Potencia", {
			tagName: "",
			f: "setCt1Pot",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6Igmh8AAAU0VSVklET1JfUElcRzFBMDgwMzA",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqgMgAAAAUElUVlw1MUNFQUdJMDAyXzAx",
		});
		this.tags.set("ct-1-RPM", {
			tagName: "",
			f: "setCt1Rpm",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6Ig3SIAAAU0VSVklET1JfUElcRzFBMDg0MDQ",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqgkQAAAAUElUVlw1MU1CSzAxQ1MwMDE",
		});
		this.tags.set("ct-2-gas", {
			tagName: "",
			f: "setCt2Gas",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgICAAAAU0VSVklET1JfUElcRzJBMDgwNzM",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqg9QAAAAUElUVlw1MkNFQUdGMDAxXzAx",
		});
		this.tags.set("ct-2-diesel", { tagName: "", f: "setCt2Die", value: [], webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgLCAAAAU0VSVklET1JfUElcRzJBMDgwOTc", webIdS: "" });
		this.tags.set("ct-2-RT", {
			tagName: "",
			f: "setCt2RT",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgHCUAAAU0VSVklET1JfUElcREFBMDgxMDc",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqg3wMAAAUElUVlxULkNFQS4yMjcy",
		});
		this.tags.set("ct-2-Potencia", {
			tagName: "",
			f: "setCt2Pot",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgDSAAAAU0VSVklET1JfUElcRzJBMDgwNDY",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqglwAAAAUElUVlw1MkNFQUdJMDAyXzAx",
		});
		this.tags.set("ct-2-RPM", {
			tagName: "",
			f: "setCt2Rpm",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgciMAAAU0VSVklET1JfUElcRzJBMDg0MDQ",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqg8gAAAAUElUVlw1Mk1CSzAxQ1MwMDE",
		});
		this.tags.set("ct-3-gas", { tagName: "", f: "setCt3Gas", value: [], webIdA: "", webIdS: "" });
		this.tags.set("ct-3-diesel", { tagName: "", f: "setCt3Die", value: [], webIdA: "", webIdS: "" });
		this.tags.set("ct-3-RT", {
			tagName: "",
			f: "setCt3RT",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgGiUAAAU0VSVklET1JfUElcREFBMDgxMDU",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqg4AMAAAUElUVlxULkNFQS4yMjcz",
		});
		this.tags.set("ct-3-Potencia", {
			tagName: "",
			f: "setCt3Pot",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6Ig4h4AAAU0VSVklET1JfUElcRUhBMDgwMTk",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqgDwMAAAUElUVlxULkNFQS4yMDQ0",
		});
		this.tags.set("ct-3-RPM", {
			tagName: "",
			f: "setCt3Rpm",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgSiIAAAU0VSVklET1JfUElcRUhBMDg3MDE",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqg_gwAAAUElUVlxDRUEuNDI0",
		});
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
		this.monitoringTrService.getStreamsetsInterpolatedLastHoursMinute(idPi, webIds, 1, 3).subscribe(
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
							if (!this.mapToTag.has(item.WebId)) this.mapToTag.set(item.WebId, nextValue.value[0]);
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
					this.initChartLine();
					this.dona_1();
					this.addBlock(2, "");
					/*timer(3000).subscribe(()=>{
									  this.addBlock(2, '');
									  //this.socketFase3();
								  });//*/
				}
			}
		);
	}

	socketFase3() {
		let canal = "pi-" + this.globalService.plant.name.toLowerCase();
		this.subscribeSocketChannel(
			canal,
			(data) => this.inSocketData(data),
			() => this.connected(),
			() => this.disconnected()
		);
	}
	inSocketData(data: any) {
		console.log(data);

		let date = new Date();
		for (const plant of data.data) {
			if (!plant.error_response) {
				for (const tag of plant.Items) {
					if (!this.mapToTag.has(tag.WebId)) this.mapToTag.set(tag.WebId, this.findLocalKeyTagByWebId(tag.WebId));
					if (this.mapToTag.get(tag.WebId) != null) {
						let localTag = this.tags.get(this.mapToTag.get(tag.WebId));

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
	findLocalKeyTagByWebId(webId): String {
		let result: String = null;
		let a = this.tags.entries();
		for (let nextValue = a.next(); nextValue.done !== true; nextValue = a.next()) {
			let webIdLocal = nextValue.value[1][this.pl];
			if (webId == webIdLocal) {
				result = nextValue.value[0];
			}
		}
		return result;
	}
	connected() {
		this.conectToPi = true;
	}
	disconnected() {
		this.conectToPi = false;
	}
	initChartLine() {
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
			},

			yAxis: [
				{
					// Secondary yAxis
					id: "potencia-neta-axis",
					gridLineWidth: 0,
					labels: {
						style: {
							color: this.colorPotNet,
							fontWeight: "bold",
						},
					},
					title: {
						enabled: false,
						text: "Potencia Neta",
						style: {
							color: this.colorPotNet,
						},
					},
					//opposite: true
				},
				{
					// Secondary yAxis
					id: "potencia-ccdv-axis",
					gridLineWidth: 0,
					labels: {
						style: {
							color: this.colorCcdv,
							fontWeight: "bold",
						},
					},
					title: {
						enabled: false,
						text: "CCDV",
						style: {
							color: this.colorCcdv,
						},
					},
					// opposite: true
				},
				{
					// Secondary yAxis
					id: "regimen-terminco-axis",
					gridLineWidth: 0,
					labels: {
						style: {
							color: this.colorRT,
							fontWeight: "bold",
						},
					},
					title: {
						enabled: false,
						text: "Regimen Termico",
						style: {
							color: this.colorRT,
						},
					},
					//opposite: true
				},
			],

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

			series: [
				{
					name: "Potencia Neta",
					yAxis: "potencia-neta-axis",

					color: this.colorPotNet,
					data: this.tags.get("potenciaNeta")["value"],
				},
				{
					name: "Potencia CCDV",
					yAxis: "potencia-ccdv-axis",
					color: this.colorCcdv,
					data: this.tags.get("potenciaCcdv")["value"],
				},
				{
					name: "Regimen Termico",
					yAxis: "regimen-terminco-axis",
					color: this.colorRT,
					data: this.tags.get("regimentermico")["value"],
				},
			],
		};
		this.chartLine2C = Highcharts.chart(this.LineChart2.nativeElement, opt);
	}

	dona_1() {
		//Dona 1
		let opt: any = {
			colors: ["#CD7F32"],

			legend: {
				enabled: false,
			},
			chart: {
				height: 120,
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
			yAxis: {
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
					style: {
						color: "#fff",
					},
				},
			},
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
					name: "Gold medals",
					data: [132, 105],
				},
			],
			exporting: {
				enabled: false,
			},
		};
		Highcharts.chart(this.donaChart1.nativeElement, opt);
	}
}
