import { Component, OnInit, Input } from "@angular/core";
import { element } from "protractor";
import { Chart } from "chart.js";
import { PiServerBox } from "../../../../models/piServer/piServerBox";
import * as TAGS from "./config";
import { GlobalService } from "src/app/core/globals/global.service";
import { Subscription } from "rxjs";
import { MonitoringTrService } from "../../../../services/monitoringTr.service";
import { RelWebIdLocalId } from "../../../../models/rel_webId_localId/rel_webId_localId";
import * as BasChart from "src/app/monitoring/helpers/monitoringBaseChart.component";
import { PiServerItem } from "../../../../models/piServer/piServerItem";
import { getMyDateFormat } from "src/app/core/helpers/util.general";
declare var $: any;

@Component({
    selector: "app-interactive-image-turbine-ct1",
    templateUrl: "./interactive-image-turbine-ct1.component.html",
    styleUrls: ["./interactive-image-turbine-ct1.component.scss"]
})
export class InteractiveImageTurbineCT1Component implements OnInit {
    @Input() data: any;

    @Input() ct = "ct1";
    @Input() tagValue = [];
    @Input() tagName = [];
    public subscriptions: Subscription[] = []; // almacena las todos los observables
    private charts: Array<Chart> = [];
    private dataSets: [] = []; // para poder conoce los colores de cada dataset
    private rel_webId_localId: Array<RelWebIdLocalId> = [];

    public Tag_info = { Name: "", Value: "" };
    public chart_rt2: Chart;
    public chart_rt22: Chart;
    public fechaActual: Date;
    constructor(
        public globalService: GlobalService,
        public monitoringTrService: MonitoringTrService
    ) {}

    ngOnInit() {
        let lstTags = this.initializeAt0();
        this.getStreamsetsInterpolatedLast24Hours(lstTags);
        this.chart_rt2 = new Chart("chart_rt5", {
            type: "line",
            data: {
                labels: [],
                datasets: [
                    {
                        label: "ss",
                        data: [],
                        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                        borderColor: ["rgba(255, 99, 132, 1)"],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: false
                            },
                            position: "right"
                        }
                    ]
                }
            }
        });

    }

    initializeAt0() {
        let lst = [];
        for (const local_tag_key in TAGS.lstTags) {
            if (TAGS.lstTags.hasOwnProperty(local_tag_key)) {
                if (TAGS.lstTags[local_tag_key].categoria == this.ct) {
                    this.tagValue[local_tag_key] = 0;
                    this.tagName[local_tag_key] = "";

                    for (const webid of TAGS.lstTags[local_tag_key][
                        this.globalService.plant.name.toLowerCase()
                    ]) {
                        if (webid.WebId != null) lst.push(webid.WebId);
                    }
                }
            }
        }
        return lst;
    }

    getStreamsetsInterpolatedLast24Hours(webids) {
        this.subscriptions.push(
            this.monitoringTrService
                .getStreamsetsInterpolatedLast24Hours(
                    this.globalService.plant.id,
                    webids
                )
                .subscribe(
                    (box: PiServerBox) => {
                        box.name = "getStreamsetsInterpolatedLast24Hours";
                        this.dataAdapter(box);
                    },
                    errorData => {
                        //this.toastr.errorToastr(Constants.ERROR_LOAD, 'Clima actual');
                    }
                )
        );
    }
    openModalCt_1() {
        $("#ModalTurbineCT1").modal("show");
    }
    animar(idElement) {
        let element = document.getElementById("my-popup-info");

        //const element =  document.querySelector('.my-popup-info');
        if (element.classList.contains("zoomOut")) {
            element.classList.remove("animated", "zoomOut");
            this.setInfo(idElement);
            this.animateCSS(".my-popup-info", "slideInDown", () => {});
        } else if (element.classList.contains("slideInDown")) {
            element.classList.remove("animated", "slideInDown");

            this.animateCSS(".my-popup-info", "zoomOut", () => {
                this.setInfo(idElement);
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
    tag(idElement) {
        this.animar(idElement);
        this.aplicarCheck(idElement);
    }
    dataAdapter(box: PiServerBox) {
        ///*
        for (const idChart in TAGS.listCharts) {
            if (TAGS.listCharts.hasOwnProperty(idChart)) {
                switch (box.name) {
                    case "getStreamsetsInterpolatedLast24Hours":
                        this.chartInit(box.data[0].Items[0].Items.length);
                        for (const data of box.data) {
                            if (!data.error_response) {
                                for (const tag of data.Items) {
                                    this.rel_webId_localId = this.createRelwebIdLocalId(tag);
									let values = this.extractDataFromTheBox(tag);
									//let localId =  this.rel_webId_localId[tag.WebId]['localId'];
									this.setStreamTagItemsInChart('chart_rt2',values.values, values.labels, 'getTemperaturaAireSalidaCompresor-ct1');
                                }
                            }
                        }
                        break;
                    case "pi-aguila":
                    case "pi-sol":
                        
					debugger
					for (const data of box.data) {
						if(!data.error_response){
							for (const tag of data.Items) {
								if (tag.WebId == "P0uQAgHoBd0ku7P3cWOJL6IgwSIAAAU0VSVklET1JfUElcRzFBMDgyODI") {
									debugger
								}
							}
						}
					}
		
                        break;
                }
            }
        }
        //*/
    }

    chartInit(data_per_graph = 25) {
        for (const idChart in TAGS.listCharts) {
            if (TAGS.listCharts.hasOwnProperty(idChart)) {
                TAGS.listCharts[idChart]["controls"] = {
                    idChart: idChart,
                    type_graph: "line",
                    type_scale: "dynamic",
                    fill: "false",
                    data_per_graph: data_per_graph,
                    point_radius: 3,
                    time_refreseh: 3,
                    displayLegend: false,
                    timePast: new Date()
                };

                this.charts[idChart] = new Chart(
                    idChart,
                    BasChart.chartCreateConfig(
                        TAGS.listCharts[idChart]["controls"]
                    )
                );
            }
        }
    }

    createRelwebIdLocalId(tag: PiServerItem) {
        let rel_webId_localId = [];
        for (const local_tag_key in TAGS.lstTags) {
            if (TAGS.lstTags.hasOwnProperty(local_tag_key)) {
                for (const localtag of TAGS.lstTags[local_tag_key][
                    this.globalService.plant.name.toLowerCase()
                ]) {
                    if (localtag.WebId == tag.WebId) {
                        // crear relaciones
                        rel_webId_localId[tag.WebId] = new RelWebIdLocalId(
                            tag.WebId,
                            local_tag_key,
                            localtag.active
                        );
                        //localtag.data = tag;
                    }
                }
            }
        }
        return rel_webId_localId;
    }
    extractDataFromTheBox(tag: PiServerItem) {
        let rel_tag_local: RelWebIdLocalId = this.rel_webId_localId[tag.WebId]
            ? this.rel_webId_localId[tag.WebId]
			: null;
		let webId = tag.WebId
        let values = [];
        let labels = [];

        if (rel_tag_local != null && rel_tag_local.active) {
            if (tag.Items.length > 0) {
                for (const item of tag.Items) {
                    values.push(item.Value.Value);
                    labels.push(getMyDateFormat(new Date(item.Timestamp)));
                }
            } else if (tag.Value != null) {
                values.push(tag.Value.Value);
                labels.push(getMyDateFormat(new Date(tag.Value.Timestamp)));
            }
            this.tagValue[rel_tag_local.localId] = values[values.length - 1];
            this.tagName[rel_tag_local.localId] = tag.Name;
        }
        return { webId, values, labels };
    }

    setStreamTagItemsInChart(idChart, values, labels, local_tag_key) {
        let existDataset = function(tag) {
            return tag.id === local_tag_key;
        };
        let hiddenDataset = function() {
            switch (local_tag_key) {
                case "getPotenciaNeta":
                case "getPotenciaCCDV":
                case "getRegimenTermico":
                    return false;
                default:
                    return true;
            }
        };
        let displayYAxis = function() {
            //return false;
            switch (local_tag_key) {
                case "getPotenciaNeta":
                case "getPotenciaCCDV":
                case "getRegimenTermico":
                    return true;
                default:
                    return false;
            }
        };
        let hexToRGB = function(h, a) {
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
        };
 
            let tagconf = TAGS.lstTags[local_tag_key];
            var hex = tagconf.color;
            let rgba = BasChart.hexToRGB(tagconf.color, 0.3);
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
				//hidden: hiddenDataset()
				hidden: false
            };
            var newYaxis = {
                id: local_tag_key,
                type: "linear", //'myScale','linear'
				display: true,
				//display: displayYAxis(),
                position: "left",
                scaleLabel: {
                    display: false,
                    labelString: "Y",
                    fontFamily: "Lato",
                    fontSize: 14
                },
                afterUpdate: function(axis) {},
                ticks: {
                    fontColor: hex,
                    fontSize: 12,
                    //min: tagconf.min,
                    //max: tagconf.max,
                    beginAtZero: false
                },
                gridLines: {
                    color: "rgb(52, 58, 64)",
                    display: false
                }
            };

            this.charts[idChart].data.datasets.push(newDataset);
            this.charts[idChart].config.options.scales.yAxes.push(newYaxis);
            this.dataSets[idChart + "-" + local_tag_key] = newDataset;

            this.charts[idChart].data.labels = labels;


        this.charts[idChart].update();
    }
    dataAdapter_() {
        let checkTime = function(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        };

        let data = this.data.data[0]["Items"][0]["Value"]["Value"];
        let _data = this.chart_rt2.data.datasets[0].data;
        let _data_ = this.chart_rt2.data;
        _data.push(data);
        this.fechaActual = new Date();
        let time3 =
            checkTime(this.fechaActual.getHours()) +
            ":" +
            checkTime(this.fechaActual.getMinutes()) +
            ":" +
            checkTime(this.fechaActual.getSeconds());
        _data_.labels.push(time3);
        if (_data.length >= 50) {
            _data.shift();
            _data_.labels.shift();
        }
        this.chart_rt2.update();
    }
    aplicarCheck(idElement: any) {
        let selectores: any = document.getElementsByClassName("tagpoint");
        for (const ref of selectores) {
            ref.classList.remove("active");
        }
        document.getElementById(idElement).classList.add("active");
    }
    setInfo(idElement) {
        switch (idElement) {
            case "tag_0":
                this.Tag_info = { Name: "unos", Value: "lslsl" };
                break;

            case "tag_1":
                this.Tag_info = { Name: "dos", Value: "lslsl" };
                break;
            default:
                break;
        }
    }
}
