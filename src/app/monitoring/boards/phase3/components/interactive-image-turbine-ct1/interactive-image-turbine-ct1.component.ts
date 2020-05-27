import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { PiServerBox         } from "../../../../models/piServer/piServerBox";
import { GlobalService       } from "src/app/core/globals/global.service";
import { MonitoringTrService } from "../../../../services/monitoringTr.service";
import { FinalsDataToChart   } from '../../../../models/chart/finalsDataToChart';
import { ThemeService        } from 'src/app/core/globals/theme';
import { EventService        } from 'src/app/core/services/event.service';
import { SocketService       } from 'src/app/core/services/socket.service';
import { MonitoringChartTR   } from '../../../../class/monitoringChartTR.component';

import * as TAGS from "./config";
import { ChartControls } from '../../../../common/high-charts-controls/models/highchartsControls.model';
import * as Highcharts from "highcharts";
import { interval } from 'rxjs';
declare var $: any;


@Component({
    selector    : "app-interactive-image-turbine-ct1",
    templateUrl : "./interactive-image-turbine-ct1.component.html",
    styleUrls   : ["./interactive-image-turbine-ct1.component.scss"]
})
export class InteractiveImageTurbineCT1Component extends MonitoringChartTR implements OnInit {
    @Input() timeCurrent;   //esto para reutilizar el del padre u no suscribirnos de nuevo 
    @Input() ct = "ii";
    @Input() titulo = "";
    @ViewChild('chart_info')        chart_info        : ElementRef;
    @ViewChild('chartontheturbine') chartontheturbine : ElementRef;

    @ViewChild('modalturbuna') modalturbuna:ElementRef;
    @ViewChild('my_popup_info') my_popup_info:ElementRef;
    
	@ViewChild("LineChart2") LineChart2: ElementRef;
	chartLine2C;
    title="";

    mapWebIdToKeyTag: Map<string, string> = new Map();
    mapKeyTagToWebId: Map<string, string> = new Map();
    isSerieActivate_1: Map<string, boolean> = new Map();
    mapColors: Map<string, string> = new Map();
    public Tag_info:FinalsDataToChart={webId  : null,
        localId: "",
        idChart: "",
        values : [],
        labels : [],
        chart_tags_tag:{},
        name:""};
    public fechaActual: Date;
    
	chartControlLineChart2:ChartControls= new ChartControls('spline','dinamic',30);
    constructor(
        public globalService       : GlobalService,
        public theme               : ThemeService,
        public eventService        : EventService,
        public socketService       : SocketService,
        public monitoringTrService : MonitoringTrService
    ) {
        super(globalService, eventService, socketService, monitoringTrService);
    }

    ngOnInit() {
        this.title  = this.titulo;
        this.webIds = this.initializeAt0();
        if(this.webIds.length > 0){
            this.initInterpolated();
            //this.getStreamsetsInterpolatedLast24Hours(this.webIds);
        }

    }
    
	initInterpolated() {
		let idPi = 0;

		if (this.globalService.plant.name.toLowerCase() == "sol") {
			idPi = 2;
		}
		if (this.globalService.plant.name.toLowerCase() == "aguila") {
			idPi = 1;
		}

		this.monitoringTrService.getStreamsetsInterpolatedLastHoursSeconts(idPi, this.webIds, 1, this.chartControlLineChart2.timeRefreseh).subscribe(
			(data: PiServerBox) => {
				if (data.data[0].error_response) {
					return 0;
                }
                
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
                
				data.data[0].Items.forEach((item) => {
                    
                    for (const local_tag_key in TAGS.lstTags) {
                        /*this.tagValue[local_tag_key] = 0;
                        this.tagName [local_tag_key] = "";
                        this.taglabel[local_tag_key] = TAGS.lstTags[local_tag_key]["label"];//*/

                        for (const webid of TAGS.lstTags[local_tag_key][ this.globalService.plant.name.toLowerCase() ]) {
                            if (webid.WebId != null && webid.categoria == this.ct && webid.WebId  == item.WebId){
                                this.mapWebIdToKeyTag.set(item.WebId,local_tag_key);
                                this.mapKeyTagToWebId.set(local_tag_key,item.WebId);
                                this.isSerieActivate_1.set(local_tag_key,["getrt","getpotencia"].includes(local_tag_key));
                                this.mapColors.set(local_tag_key,TAGS.lstTags[local_tag_key]['color']);
                                if("static" == this.chartControlLineChart2.typeScale){
                                    ymax = TAGS.lstTags[local_tag_key]['max'];
                                    ymin = TAGS.lstTags[local_tag_key]['min'];
                                }
                                
                                opt.yAxis.push(
                                    {
                                        id: "y-axis-"+local_tag_key,
                                        gridLineWidth: 0,
                                        labels: {
                                            style: {
                                                color: TAGS.lstTags[local_tag_key]['color'],
                                                fontWeight: "bold",
                                            }
                                        },
                                        title: {
                                            enabled: false,
                                            text: TAGS.lstTags[local_tag_key]['label'],
                                            style: {
                                                color: TAGS.lstTags[local_tag_key]['color'],
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
                                        id : local_tag_key,
                                        name: TAGS.lstTags[local_tag_key]['label'],
                                        yAxis: "y-axis-"+local_tag_key,
                                        visible: ["getrt","getpotencia"].includes(local_tag_key),
                                        color: TAGS.lstTags[local_tag_key]['color'],
                                        data: item.Items.map((itemInterpolated) => [new Date(itemInterpolated.Value.Timestamp).getTime(), itemInterpolated.Value.Value])
                                    }
                                );
                            } 
                        }
                    }
                });
                this.chartLine2C = Highcharts.chart(this.LineChart2.nativeElement, opt);
			},
			(errorData) => {
				//this.toastr.errorToastr(Constants.ERROR_LOAD, 'Clima actual');
			},
			() => {
			
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
			}
		);
	}
    openModalCt_1() {
        $(this.modalturbuna.nativeElement).modal('show');
        //$("#ModalTurbine-"+this.ct).modal("show");
    }
    
	chartLine_01_updateCharLine(){
        this.tagValue
		let a = this.mapKeyTagToWebId.entries();
		let data = null;
		let serie = null;
		for (let nextValue = a.next(); nextValue.done !== true; nextValue = a.next()) {
			serie = this.chartLine2C.get(nextValue.value[0]);
			data = [new Date().getTime(),this.tagValue[nextValue.value[0]]];
			serie.addPoint(data, false, true);
		}
		this.chartLine2C.redraw(true);//*/
	}
    animar() {
        //let element = document.getElementById("my-popup-info");
        let element = this.my_popup_info.nativeElement;

        //const element =  document.querySelector('.my-popup-info');
        if (element.classList.contains("zoomOut")) {
            element.classList.remove("animated", "zoomOut");
            this.animateCSS(".my-popup-info", "slideInDown", () => {});
        } else if (element.classList.contains("slideInDown")) {
            element.classList.remove("animated", "slideInDown");

            this.animateCSS(".my-popup-info", "zoomOut", () => {
                element.classList.remove("animated", "zoomOut");
                this.animateCSS(".my-popup-info", "slideInDown", () => {});
            });
        }

        //*/
    }
    animateCSS(element, animationName, callback) {
        const node = document.querySelector(element);
        node.classList.add("animated", animationName);

        function handleAnimationEnd() {
            //node.classList.remove('animated', animationName)
            node.removeEventListener("animationend", handleAnimationEnd);

            if (typeof callback === "function") callback();
        }

        node.addEventListener("animationend", handleAnimationEnd);
    }
    tag(element,idChart,localid) {
        if(this.globalService.plant.name == "SOL")return 0;
        if(this.globalService.socketConnect){
            //this.animar();
            //this.aplicarCheck(element,localid);
            //this.datasetUniqueShowChart(idChart, localid);
            //this.setInfo(localid);
            this.chartLine_01_ToogleSerie(element,localid);
        }
    }
    
	chartLine_01_ToogleSerie(element,key){
		this.isSerieActivate_1.set(key,!this.isSerieActivate_1.get(key));
		if(this.isSerieActivate_1.get(key)){
            this.chartLine2C.get(key).show();
            if(element != null )element.classList.add("active");
            if(element != null )element.style['color'] = TAGS.lstTags[key]['color'];
        }else{
            this.chartLine2C.get(key).hide();
            if(element != null )element.classList.remove("active");
            if(element != null )element.style['color'] = '';
        }  
	}
    aplicarCheck(element: any,localid) {
        let selectores: any = document.getElementsByClassName("tagpoint");
        for (const ref of selectores) {
            ref.classList.remove("active");
        }
        element.classList.add("active");
    }
    setInfo(localId) {
        this.Tag_info = this.vistafinalsDataToChart[localId];
    }
    initializeAt0() {
        let lst = [];
        for (const local_tag_key in TAGS.lstTags) {
                this.tagValue[local_tag_key] = 0;
                this.tagName [local_tag_key] = "";
                this.taglabel[local_tag_key] = TAGS.lstTags[local_tag_key]["label"];

                for (const webid of TAGS.lstTags[local_tag_key][
                    this.globalService.plant.name.toLowerCase()
                ]) {
                    if (webid.WebId != null && webid.categoria == this.ct) lst.push(webid.WebId);
                }
        }
        return lst;
    }
    dataAdapter(box: PiServerBox) {
        
        switch (box.name) {
            case "getStreamsetsInterpolatedLast24Hours":
                //this.setStreamsetsInterpolatedInChart(box,TAGS);
                break;
            case "pi-aguila":
            case "pi-sol":
                this.addStreamsetsValueInChart(box);
                break;
        }
    }

    addStreamsetsValueInChart(box: PiServerBox){
        for (const data of box.data) {
            if (!data.error_response) {
                for (const tag of data.Items) {
                    let item = this.extractDataFromTheBox(tag);
                    let k = this.mapWebIdToKeyTag.get(item.webId);
                    this.tagValue[k] = item.values[item.values.length - 1];
                    this.tagName [k] = item.name;
                    //this.setPublicVariables(finalsDataToChart);
                }
            }
        }
    }
    
	modifyChartLineChart2(event:ChartControls){
		this.chartControlLineChart2 = event;
		let ymax = null;
		let ymin = null;
		let y = null;
		for (let index = 0; index < this.chartLine2C.yAxis.length; index++) {
            y = this.chartLine2C.yAxis[index];
            if("static" == this.chartControlLineChart2.typeScale){
                ymax = TAGS.lstTags[y.userOptions.id.split("y-axis-")[1]]['max'];
                ymin = TAGS.lstTags[y.userOptions.id.split("y-axis-")[1]]['min'];
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
