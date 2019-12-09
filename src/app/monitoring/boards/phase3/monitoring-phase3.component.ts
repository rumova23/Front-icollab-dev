import { Component, OnInit, Input, OnDestroy, ViewEncapsulation, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver } from "@angular/core";
import { environment } from "src/environments/environment";
import { MonitoringPhase3Service } from "../../services/monitoringPhase3.service";
import { EventService } from "src/app/core/services/event.service";

import { ActivatedRoute } from "@angular/router";

import { NgbModal, ModalDismissReasons, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { interval, Subscription, Observable, timer } from "rxjs";
import { Chart } from "chart.js";
import { GlobalService } from "src/app/core/globals/global.service";

import { SecurityService } from "src/app/core/services/security.service";
import { Validate } from "src/app/core/helpers/util.validator.";
import { SocketService } from "src/app/core/services/socket.service";
import { EventSocket } from "src/app/core/models/EventSocket";
declare var $: any;

import { RelWebIdLocalId } from "../../models/rel_webId_localId/rel_webId_localId";
import * as TAGS from "./config";
import { DateAdapter } from "angular-calendar";
import { EventMessage } from "src/app/core/models/EventMessage";
import { ThemeService } from "src/app/core/globals/theme";
import { InteractiveImageTurbineCT1Component } from "./components/interactive-image-turbine-ct1/interactive-image-turbine-ct1.component";
import { MonitoringBaseSocketOnComponent } from "src/app/monitoring/class/monitoringBaseSocketOn.component";
import { MonitoringTrService } from "../../services/monitoringTr.service";
import { TrService } from "src/app/safe/services/tr.service";
import { PiServerBox } from "../../models/piServer/piServerBox";
import * as BasChart from "src/app/monitoring/helpers/monitoringBaseChart.component";
import { PiServerItem } from "../../models/piServer/piServerItem";
import { checkDigitTime } from "src/app/core/helpers/util.general";
import { getMyDateFormat } from "src/app/core/helpers/util.general";
import { FinalsDataToChart } from "../../models/chart/finals-data-to-chart";
@Component({
    selector: "app-monitoring-phase3",
    templateUrl: "./monitoring-phase3.component.html",
    styleUrls: ["./monitoring-phase3.component.scss"],
    entryComponents: [InteractiveImageTurbineCT1Component]
})
export class MonitoringPhase3Component extends MonitoringBaseSocketOnComponent implements OnInit, OnDestroy {
    @ViewChild("modal_turbine_ct_1") modal_turbine_ct_1: InteractiveImageTurbineCT1Component;
    @ViewChild("modal_turbine_ct_2") modal_turbine_ct_2: InteractiveImageTurbineCT1Component;
    @ViewChild("modal_turbine_ct_3") modal_turbine_ct_3: InteractiveImageTurbineCT1Component;
    private charts   : Array<Chart> = [];
    private rel_webId_localId: Array<any> = [];
    public dataSets : [] = []; // para poder conoce los colores de cada dataset

    public tagValue = [];
    public tagName = [];

    public wifi = false;
    public anyConfig = [];

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

        this.subscribeEverySecond();
        this.subscribeSocketOnStatus();
        this.getStreamsetsInterpolatedLast24Hours(lstTags);
    }
    initializeAt0() {
        let lst = [];
        for (const local_tag_key in TAGS.lstTags) {
            if (TAGS.lstTags.hasOwnProperty(local_tag_key)) {
                this.tagValue[local_tag_key] = 0;
                this.tagName[local_tag_key] = "";

                this.anyConfig[local_tag_key] = {
                    scale_min: TAGS.lstTags[local_tag_key]["min"],
                    scale_max: TAGS.lstTags[local_tag_key]["max"],
                    type: "linear",
                    stepSize: 0
                };
            }
            for (const webid of TAGS.lstTags[local_tag_key][this.globalService.plant.name.toLowerCase()]) {
                if (webid.WebId != null) lst.push(webid.WebId);
            }
        }
        return lst;
    }
    getStreamsetsInterpolatedLast24Hours(webids) {
        this.subscriptions.push(
            this.monitoringTrService.getStreamsetsInterpolatedLast24Hours(this.globalService.plant.id, webids).subscribe(
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
        this.wifi = true;
        switch (box.name) {
            case "getStreamsetsInterpolatedLast24Hours":
                this.chartInit(box.data[0].Items[0].Items.length);
                this.subscribeSocketChanels();
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
				this.modal_turbine_ct_1.dataAdapter(box);
				this.modal_turbine_ct_2.dataAdapter(box);
                break;
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

                this.charts[idChart] = new Chart(idChart, BasChart.chartCreateConfig(TAGS.listCharts[idChart]["controls"]));
            }
        }
    }
    subscribeSocketChanels() {
        if (this.globalService.socketConnect) {
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
                label: TAGS.lstTags[local_tag_key].label,
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
    whenLosingConnection() {
        this.wifi = false;
    }
    datasetToggleChart(idChart, localKeyTag) {
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
    getchartControl(idChart) {
        return TAGS.listCharts[idChart] ? TAGS.listCharts[idChart]["controls"] : { idChart: false };
    }
    modifyChart(event) {
        // event es de tipo ChartControl
        TAGS.listCharts[event.idChart]["controls"] = event;

        BasChart.change_data_per_graph(this.charts[event.idChart], TAGS.listCharts[event.idChart]);
        BasChart.change_typa_chart(this.charts[event.idChart], TAGS.listCharts[event.idChart]);
        BasChart.changeFill(this.charts[event.idChart], TAGS.listCharts[event.idChart]);
        BasChart.change_point_radius(this.charts[event.idChart], TAGS.listCharts[event.idChart]);
        BasChart.change_type_scale(this.charts[event.idChart], TAGS.listCharts[event.idChart], TAGS.lstTags);
        BasChart.chart_update(this.charts[event.idChart]);
    }
    updateChart(myform, localTagId) {}
    openModalCt_1() {
        this.modal_turbine_ct_1.openModalCt_1();
    }
    openModalCt_2() {
        this.modal_turbine_ct_2.openModalCt_1();
    }
    openModalCt_3(){
        this.modal_turbine_ct_3.openModalCt_1();
    }
    tester() {
        let lstTags = this.initializeAt0();
        this.getStreamsetsInterpolatedLast24Hours(lstTags);
    }
}
