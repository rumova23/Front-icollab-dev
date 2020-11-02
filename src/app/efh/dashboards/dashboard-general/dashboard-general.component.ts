import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { timer, interval } from 'rxjs';
import { ConnectSocketChannelComponent } from 'src/app/shared/socket/connectSocketChannel.component';
import { GlobalService } from 'src/app/core/globals/global.service';
import { EventService } from 'src/app/core/services/event.service';
import { SocketService } from 'src/app/core/services/socket.service';
import { SecurityService } from 'src/app/core/services/security.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { PiServerBox } from 'src/app/monitoring/models/piServer/piServerBox';
import * as Highcharts from "highcharts";
import { EventBlocked } from 'src/app/core/models/EventBlocked';
import { MonitoringTrService } from 'src/app/monitoring/services/monitoringTr.service';
import { ChartControls } from 'src/app/monitoring/common/high-charts-controls/models/highchartsControls.model';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
	selector: 'app-dashboard-general',
	templateUrl: './dashboard-general.component.html',
	styleUrls: ['./dashboard-general.component.scss']
})
export class DashboardGeneralComponent extends ConnectSocketChannelComponent implements OnInit, OnDestroy, AfterViewInit  {
	timeCurrent   : Date           = new Date();  // Se actualiza cada segundo subscribeEverySecond();
	tg1YtdTotal01 = 648.123;
	tg1YtdTotal02 = 648.123;
	tg1YtdTotal03 = 648.123;
	tg1YtdTotal04 = 648.123;
	tg1YtdTotal05 = 648.123;
	tg1YtdTotal06 = 648.123;
	tg1YtdTotal07 = 648.123;
	tg1YtdTotal08 = 648.123;
	tg1MtdTotal01 = 648.123;
	tg1MtdTotal02 = 648.123;
	tg1MtdTotal03 = 648.123;
	tg1MtdTotal04 = 648.123;
	tg1MtdTotal05 = 648.123;
	tg1MtdTotal06 = 648.123;
	
	tg1YtdLastI01 = 648.123;
	tg1YtdLastI02 = 648.123;
	tg1YtdLastI03 = 648.123;
	tg1YtdLastI04 = 648.123;
	tg1YtdLastI05 = 648.123;
	tg1YtdLastI06 = 648.123;
	tg1YtdLastI07 = 648.123;
	tg1YtdLastI08 = 648.123;
	tg1MtdLastI01 = 648.123;
	tg1MtdLastI02 = 648.123;
	tg1MtdLastI03 = 648.123;
	tg1MtdLastI04 = 648.123;
	tg1MtdLastI05 = 648.123;
	tg1MtdLastI06 = 648.123;


	tg2YtdTotal01 = 648.123;
	tg2YtdTotal02 = 648.123;
	tg2YtdTotal03 = 648.123;
	tg2YtdTotal04 = 648.123;
	tg2YtdTotal05 = 648.123;
	tg2YtdTotal06 = 648.123;
	tg2YtdTotal07 = 648.123;
	tg2YtdTotal08 = 648.123;
	tg2MtdTotal01 = 648.123;
	tg2MtdTotal02 = 648.123;
	tg2MtdTotal03 = 648.123;
	tg2MtdTotal04 = 648.123;
	tg2MtdTotal05 = 648.123;
	tg2MtdTotal06 = 648.123;
	
	tg2YtdLastI01 = 648.123;
	tg2YtdLastI02 = 648.123;
	tg2YtdLastI03 = 648.123;
	tg2YtdLastI04 = 648.123;
	tg2YtdLastI05 = 648.123;
	tg2YtdLastI06 = 648.123;
	tg2YtdLastI07 = 648.123;
	tg2YtdLastI08 = 648.123;
	tg2MtdLastI01 = 648.123;
	tg2MtdLastI02 = 648.123;
	tg2MtdLastI03 = 648.123;
	tg2MtdLastI04 = 648.123;
	tg2MtdLastI05 = 648.123;
	tg2MtdLastI06 = 648.123;

	totalPowerTg1Tg2 = 0;
	powerTg1 = 0;
	powerTg2 = 0;

	/** chart and socket */
	@ViewChild("LineChart2") LineChart2: ElementRef;
	chartLine2C = null;
	conectToPi  = false;
	pl          = "";
	tags                   : Map<string, Object> = new Map();
	chartControlLineChart2 : ChartControls       = new ChartControls('spline','dinamic',3);
	mapWebIdToKeyTag       : Map<string, string> = new Map();
	mapColors: Map<string, string> = new Map([
		["potenciaNeta"          ,"#FFC0CB"],
		["ct_1_Potencia"         ,"#5d76d3"],
		["ct_2_Potencia"         ,"#00ACEE"],
		["potenciaCcdv"          ,"#00ACEE"],
		["regimentermico"        ,"#39FF14"],
		["temperatura_ambiente"  ,"#aff000"],
		["presion_atmosferica"   ,"#c5f327"],
		["humedad"               ,"#d9d5fe"],
		["ct_1_gas"              ,"#c5f327"],
		["ct_1_diesel"           ,"#5d76d3"],
		["ct_1_RT"               ,"#CCFF00"],
		["ct_1_RPM"              ,"#FF0000"],
		["ct_2_gas"              ,"#FFA500"],
		["ct_2_diesel"           ,"#FFC0CB"],
		["ct_2_RT"               ,"#008000"],
		["ct_2_RPM"              ,"#0000FF"],
		["ct_3_gas"              ,"#FFFFFF"],
		["ct_3_diesel"           ,"#FFCC99"],
		["ct_3_RT"               ,"#CCFFFF"],
		["ct_3_Potencia"         ,"#CC3300"],
		["ct_3_RPM"              ,"#99CC99"],
	]);
	/** ./chart and socket */
	
	constructor(
		public globalService: GlobalService,
		public eventService: EventService,
		public socketService: SocketService,
		public securityService: SecurityService,
		public monitoringTrService: MonitoringTrService,
		public toastr: ToastrManager,
	) {
		super(globalService, eventService, socketService, securityService);
	}

	ngOnInit() {
		this.addBlock(1, "");
		timer(15000).subscribe(()=>{
			this.addBlock(2, "");
		});
		this.subscribeEverySecond();
		this.initTagsPI();
	}
	ngAfterViewInit(){
		timer(1000).subscribe(()=>{
			this.connect();
		});
	}
	ngOnDestroy(){
		for (const iterator in this.subscriptions) {
			this.subscriptions[iterator].unsubscribe();
		}
		this.connectSocketChannelNgOnDestroy();
	}
	subscribeEverySecond(){
		this.subscriptions['everySecond'] = timer(0,1000).subscribe(()=>{
			this.timeCurrent = new Date();
		});
	}
	/** chart and socket */
	initTagsPI() {
		this.tags.set("potenciaNeta", {
			tagName: "",
			min:0,
  			max:590,
			f: "setPotenciaNeta",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgJiUAAAU0VSVklET1JfUElcREFBMDgyMDY",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqg1gMAAAUElUVlxULkNFQS4yMjYz",
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
		this.tags.set("ct_2_Potencia", {
			tagName: "",
			min:0,
  			max:200,
			f: "setCt2Pot",
			value: [],
			webIdA: "P0uQAgHoBd0ku7P3cWOJL6IgDSAAAAU0VSVklET1JfUElcRzJBMDgwNDY",
			webIdS: "F1DP4rhZAwFMREKDf7s8vylUqglwAAAAUElUVlw1MkNFQUdJMDAyXzAx",
		});
	}
	connect() {
		this.initInterpolated();
	}
	disconnected() {
		this.conectToPi = false;
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
				//*/
			},
			(errorData) => {
				this.conectToPi = false;
				
			},
			() => {
				//Complete
				if (this.conectToPi) {
					this.addBlock(1, "");
					this.chartCreate();
					this.connectToSocket();
					timer(3000).subscribe(()=>{
						this.addBlock(2, "");
					});

					this.subscriptions.push( 
						interval(1000*this.chartControlLineChart2.timeRefreseh).subscribe(()=>{
							this.chartPush();
						})
					);//*/
				}
			}
		);
	}
	connectToSocket() {
		this.subscriptions.push(this.eventService.onChangeSocketConnect
			.subscribe({
				next: (event: EventMessage) => {
					if(event.id === 0){
						this.disconnected();
					}else if(event.id === 1){
						this.connect();
					}
				}
			}
		));
		let canal = "pi-" + this.globalService.plant.name.toLowerCase();
		this.subscribeSocketChannel(
			canal,
			(data) => this.inSocketData(data)
		);
	}
	inSocketData(data: PiServerBox){
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
	chartCreate(){
		if (this.chartLine2C != null) {
			this.chartLine2C.destroy();
			this.chartLine2C = null;
		}
		let opt: any = {
			colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
                '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
			credits: {
				enabled: false
			},
			time: {
				timezone: 'America/Mexico_City',
				useUTC: false
			},
			chart: {
				zoomType: 'xy',
				height: 600,
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                    stops: [
                        [0, '#2a2a2b'],
                        [1, '#3e3e40']
                    ]
                },
                style: {
                    fontFamily: '\'Unica One\', sans-serif'
                },
                plotBorderColor: '#606063'
			},
			title: {
				text: 'Titulo',
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase',
                    fontSize: '20px'
                }
			},
			exporting: {
				tableCaption: ""
			},
			xAxis: {
				gridLineWidth: 1,
				gridLineDashStyle: 'longdash',
                gridLineColor: '#2b908f',
				type: 'datetime',
                labels: {
                    style: {
                        color: '#E0E0E3'
                    }
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                title: {
                    style: {
                        color: '#A0A0A3'
                    }
                }
			},
			yAxis: [  ],
			
			plotOptions: {
				series: {
					fillOpacity: 0.2
				}
			},
		
			tooltip: {
				shared: true
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'bottom',
				y: -20,
				x: -10,
				floating: true,
				draggable: true,
				zIndex: 20,
				title: {
					text: 'Tags'
				},
				backgroundColor:
					Highcharts.defaultOptions.legend.backgroundColor || // theme
					'rgba(255,255,255,0.25)'
			},
			series: [],
			responsive: {
				rules: [{
					condition: {
						maxWidth: 500
					},
					chartOptions: {
						legend: {
							floating: false,
							layout: 'horizontal',
							align: 'center',
							verticalAlign: 'bottom',
							x: 0,
							y: 0
						},
						yAxis: [{
							labels: {
								align: 'right',
								x: 0,
								y: -6
							},
							showLastLabel: false
						}, {
							labels: {
								align: 'left',
								x: 0,
								y: -6
							},
							showLastLabel: false
						}, {
							visible: false
						}]
					}
				}]
			}
		};
		
		let ymax = undefined;
		let ymin = undefined;

		let a = this.tags.entries();
		let iii = 0;
		for (let nextValue = a.next(); nextValue.done !== true; nextValue = a.next()) {
			if("static" == this.chartControlLineChart2.typeScale){
				ymax = this.tags.get(nextValue.value[0])['max'];
				ymin = this.tags.get(nextValue.value[0])['min'];
			}
			opt.yAxis.push(
				{
					id: "y-axis-"+nextValue.value[0],
					gridLineWidth: 1,
					gridLineDashStyle: 'longdash',
					gridLineColor: '#2b908f',
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
					type: 'spline',
					name: nextValue.value[1]['tagName'],
					yAxis: "y-axis-"+nextValue.value[0],
					visible: true,
					color: this.mapColors.get(nextValue.value[0]),
					data: nextValue.value[1]["value"],
				}
			);
			if(false){

				opt.yAxis.push(
					{
						id: "y-axis-"+nextValue.value[0]+"-2",
						gridLineWidth: 0,
						labels: {
							style: {
								color: this.mapColors.get('ct_2_RT'),
								fontWeight: "bold",
							}
						},
						title: {
							enabled: false,
							text: nextValue.value[0],
							style: {
								color: this.mapColors.get('ct_2_RT'),
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
						id : nextValue.value[0]+"-2",
						type: 'column',
						name: nextValue.value[1]['tagName']+"-2",
						yAxis: "y-axis-"+nextValue.value[0]+"-2",
						visible: true,
						color: this.mapColors.get('ct_2_RT'),
						data: nextValue.value[1]["value"].filter((e,i)=>{return i%2}).filter((e,i)=>{return i%2}).filter((e,i)=>{return i%2}).filter((e,i)=>{return i%2}).filter((e,i)=>{return i%2}).filter((e,i)=>{return i%2}),
					}
				);
			}
			iii++;
		}
		this.chartLine2C = Highcharts.chart(this.LineChart2.nativeElement, opt);
	}
	chartPush(){
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
	getTagName(key): string {
		return this.tags.has(key) ? this.tags.get(key)["tagName"]:'';
	}
	getValue(key) {
		if(!this.tags.has(key))return [null, 0];
		let tag = this.tags.get(key)["value"]["length"] > 0 ? this.tags.get(key)["value"][this.tags.get(key)["value"]["length"] - 1] : [null, 0];
		return tag;
	}
	/** ./ chart and socket */
	
	addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
	}
}
