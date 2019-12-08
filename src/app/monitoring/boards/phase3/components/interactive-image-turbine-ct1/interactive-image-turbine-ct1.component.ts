import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
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
import { FinalsDataToChart } from '../../../../models/chart/finals-data-to-chart';
import { MonitoringBaseSocketOnComponent } from '../../../../class/monitoringBaseSocketOn.component';
import { ThemeService } from 'src/app/core/globals/theme';
import { EventService } from 'src/app/core/services/event.service';
import { SocketService } from 'src/app/core/services/socket.service';
import { TrService } from 'src/app/safe/services/tr.service';
declare var $: any;

@Component({
    selector: "app-interactive-image-turbine-ct1",
    templateUrl: "./interactive-image-turbine-ct1.component.html",
    styleUrls: ["./interactive-image-turbine-ct1.component.scss"]
})
export class InteractiveImageTurbineCT1Component extends MonitoringBaseSocketOnComponent implements OnInit {
    private charts: Array<Chart> = [];
    private dataSets: [] = []; // para poder conoce los colores de cada dataset
    private rel_webId_localId: Array<any> = [];
    @Input() timeCurrent;   //esto para reutilizar el del padre u no suscribirnos de nuevo 

    @Input() ct = "ii";
    tagValue = [];
    tagName = [];
    title="";
    @ViewChild('modalturbuna') modalturbuna:ElementRef;
    @ViewChild('my_popup_info') my_popup_info:ElementRef;
    @ViewChild('chart_info') chart_info:ElementRef;
    
    public subscriptions: Subscription[] = []; // almacena las todos los observables


    public Tag_info = { Name: "", Value: "" };
    public chart_rt2: Chart;
    public chart_rt22: Chart;
    public fechaActual: Date;
    constructor(
        public globalService: GlobalService,
        public theme: ThemeService,
        public eventService: EventService,
        public socketService: SocketService,
        private trService: TrService,
        public monitoringTrService: MonitoringTrService
    ) {
        super(globalService, eventService, socketService, monitoringTrService);
    }

    ngOnInit() {
        let lstTags = this.initializeAt0();
        this.getStreamsetsInterpolatedLast24Hours(lstTags);
        this.title = this.ct;

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
    openModalCt_1() {
        $(this.modalturbuna.nativeElement).modal('show');
        //$("#ModalTurbine-"+this.ct).modal("show");
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
    tag(element) {

        this.animar();
        this.aplicarCheck(element);
    }
    aplicarCheck(element: any) {
        let selectores: any = document.getElementsByClassName("tagpoint");
        for (const ref of selectores) {
            ref.classList.remove("active");
        }
        element.classList.add("active");
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


    initializeAt0() {
        let lst = [];
        for (const local_tag_key in TAGS.lstTags) {
                this.tagValue[local_tag_key] = 0;
                this.tagName[local_tag_key] = "";

                for (const webid of TAGS.lstTags[local_tag_key][
                    this.globalService.plant.name.toLowerCase()
                ]) {
                    if (webid.WebId != null && webid.categoria == this.ct) lst.push(webid.WebId);
                }
        }
        debugger
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
    dataAdapter(box: PiServerBox) {

        switch (box.name) {
            case "getStreamsetsInterpolatedLast24Hours":
                this.chartInit(box.data[0].Items[0].Items.length);
                for (const data of box.data) {
                    if (!data.error_response) {
                        for (const tag of data.Items) {
                            this.createRelwebIdLocalId(tag);
                            let finalsDataToChart = this.extractDataFromTheBox(tag);
                            this.setPublicVariables(finalsDataToChart);

                            for (const idChart in TAGS.listCharts) {
                                // en esta grafica se puede pintar este tag
                                let chart_tags_tag = this.matchedTagIntoChart(tag, idChart);
                                if (undefined != chart_tags_tag) {
                                    finalsDataToChart.idChart = idChart;
                                    finalsDataToChart.localId = chart_tags_tag.localId;
                                    finalsDataToChart.chart_tags_tag = chart_tags_tag;

                                    this.setStreamTagItemsInChart(finalsDataToChart);
                                }
                            }
                        }
                    }
                }
                break;
            case "pi-aguila":
            case "pi-sol":
                for (const idChart in TAGS.listCharts) {
                    if(this.charts[idChart] == undefined) break;
                    if (this.check_time_refreseh_data(TAGS.listCharts[idChart]["controls"]["time_refreseh"], TAGS.listCharts[idChart]["controls"]["timePast"])) {
                        
                        TAGS.listCharts[idChart]["controls"]["timePast"] = new Date();
                        this.charts[idChart].data.labels.push(this.getTime());

                        if (this.charts[idChart].data.labels.length > TAGS.listCharts[idChart].controls.data_per_graph) {
                            this.charts[idChart].data.labels.shift();
                        }
                        for (const data of box.data) {
                            if (!data.error_response) {
                                for (const tag of data.Items) {
                                    let finalsDataToChart = this.extractDataFromTheBox(tag);
                                    this.setPublicVariables(finalsDataToChart);

                                    // en esta grafica se puede pintar este tag
                                    let chart_tags_tag = this.matchedTagIntoChart(tag, idChart);
                                    if (undefined != chart_tags_tag) {
                                        finalsDataToChart.idChart = idChart;
                                        finalsDataToChart.localId = chart_tags_tag.localId;
                                        finalsDataToChart.chart_tags_tag = chart_tags_tag;

                                        this.addStreamTagItemsInChart(finalsDataToChart);
                                    }
                                }
                            }
                        }
                    }
                }
                break;
        }
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
                    time_refreseh: 1,
                    displayLegend: false,
                    timePast: new Date()
                };

                this.charts[idChart] = new Chart(this[idChart].nativeElement, BasChart.chartCreateConfig(TAGS.listCharts[idChart]["controls"]));
            }
        }
    }
    createRelwebIdLocalId(tag: PiServerItem) {
        for (const local_tag_key in TAGS.lstTags) {
            if (TAGS.lstTags.hasOwnProperty(local_tag_key)) {
                for (const localtag of TAGS.lstTags[local_tag_key][this.globalService.plant.name.toLowerCase()]) {
                    if (localtag.WebId == tag.WebId) {
                        // crear relaciones
                        if (this.rel_webId_localId[tag.WebId] === undefined) {
                            this.rel_webId_localId[tag.WebId] = [];
                        }
                        if (this.rel_webId_localId[tag.WebId].find(obj => obj.localId == local_tag_key) === undefined) {
                            this.rel_webId_localId[tag.WebId].push({
                                //WebId: tag.WebId,
                                localId: local_tag_key,
                                active: localtag.active
                            });
                        } else {
                        }

                        //localtag.data = tag;
                    }
                }
            }
        }
    }
    extractDataFromTheBox(tag: PiServerItem): FinalsDataToChart {
        let values = [];
        let labels = [];
        if (tag.Items.length > 0) {
            for (const item of tag.Items) {
                values.push(item.Value.Value);
                labels.push(getMyDateFormat(new Date(item.Timestamp)));
            }
        } else if (tag.Value != null) {
            values.push(tag.Value.Value);
            labels.push(getMyDateFormat(new Date(tag.Value.Timestamp)));
        }
        return {
            values,
            labels,
            name: tag.Name,
            webId: tag.WebId,
            localId: null,
            idChart: null,
            chart_tags_tag: null
        };
    }
    setPublicVariables(FinalsDataToChart) {
        if (undefined != this.rel_webId_localId[FinalsDataToChart.webId]) {
            for (const iterator of this.rel_webId_localId[FinalsDataToChart.webId]) {
                this.tagValue[iterator.localId] = FinalsDataToChart.values[FinalsDataToChart.values.length - 1];
                this.tagName[iterator.localId] = FinalsDataToChart.name;
            }
        }
    }
    matchedTagIntoChart(tag, idChart) {
        return TAGS.listCharts[idChart]["tags"].find(obj => {
            if (undefined === this.rel_webId_localId[tag.WebId]) return false;
            for (const rel of this.rel_webId_localId[tag.WebId]) {
                if (rel.active && rel.localId == obj.localId) {
                    return true;
                }
            }
            return false;
        });
    }
    setStreamTagItemsInChart(finaleFataToChart: FinalsDataToChart) {
        let local_tag_key = finaleFataToChart.localId;
        let idChart = finaleFataToChart.idChart;
        let values = finaleFataToChart.values;
        let labels = finaleFataToChart.labels;
        let existDataset = function(tag) {
            return tag.id === local_tag_key;
        };
        let dataset = this.charts[idChart].data.datasets.find(existDataset);
        if (dataset == undefined) {
            let tagconf = TAGS.lstTags[local_tag_key];

            var hex = tagconf.color;
            let rgba = BasChart.hexToRGB(tagconf.color, 0.3);
            var newDataset = {
                id: local_tag_key,
                rgba: rgba,
                label: TAGS.lstTags[local_tag_key].label+' ('+finaleFataToChart.name+')',
                backgroundColor: rgba,
                borderColor: hex,
                data: values,
                //fill: false,
                fill: false,
                yAxisID: local_tag_key,
                //yAxisID: 'my887896',
                hidden: finaleFataToChart.chart_tags_tag.initHiddenInChart
            };
            var newYaxis = {
                id: local_tag_key,
                type: "linear", //'myScale','linear'
                display: !finaleFataToChart.chart_tags_tag.initHiddenInChart,
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
        } else {
            dataset.data = values;
            this.charts[idChart].data.labels = labels;
        }

        this.charts[idChart].update();
        //*/
    }
    addStreamTagItemsInChart(finaleFataToChart: FinalsDataToChart) {
        let local_tag_key = finaleFataToChart.localId;
        let idChart = finaleFataToChart.idChart;
        let values = finaleFataToChart.values;
        let labels = finaleFataToChart.labels;
        let existDataset = function(tag) {
            return tag.id === local_tag_key;
        };

        let tag = this.charts[idChart].data.datasets.find(existDataset);
        if (tag != undefined) {
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
}
