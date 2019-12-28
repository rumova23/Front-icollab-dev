import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { EventService                        } from "src/app/core/services/event.service";
import { GlobalService                       } from "src/app/core/globals/global.service";
import { SocketService                       } from "src/app/core/services/socket.service";

import { ThemeService                        } from "src/app/core/globals/theme";
import { InteractiveImageTurbineCT1Component } from "./components/interactive-image-turbine-ct1/interactive-image-turbine-ct1.component";
import { MonitoringTrService                 } from "../../services/monitoringTr.service";
import { PiServerBox                         } from "../../models/piServer/piServerBox";
import { MonitoringChartTR                   } from '../../class/monitoringChartTR.component';

import * as TAGS     from "./config";
import * as BasChart from "src/app/monitoring/helpers/monitoringBaseChart.component";

declare var $: any;

@Component({
    selector        : "app-monitoring-phase3",
    templateUrl     : "./monitoring-phase3.component.html",
    styleUrls       : ["./monitoring-phase3.component.scss"],
    entryComponents : [InteractiveImageTurbineCT1Component]
})
export class MonitoringPhase3Component extends MonitoringChartTR implements OnInit, OnDestroy {
    @ViewChild("modal_turbine_ct_1") modal_turbine_ct_1: InteractiveImageTurbineCT1Component;
    @ViewChild("modal_turbine_ct_2") modal_turbine_ct_2: InteractiveImageTurbineCT1Component;
    @ViewChild("modal_turbine_ct_3") modal_turbine_ct_3: InteractiveImageTurbineCT1Component;

    @ViewChild('canvas1') canvas1:ElementRef;
    @ViewChild('canvas2tester') canvas2tester:ElementRef;



    public wifi = false;
    public anyConfig = [];

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
        this.webIds = this.initializeAt0();
        if(this.webIds.length > 0){
            this.subscribeEverySecond();
            this.subscribeSocketOnStatus();
            this.getStreamsetsInterpolatedLast24Hours(this.webIds);
        }

    }
    initializeAt0() {
        let lst = [];
        for (const local_tag_key in TAGS.lstTags) {
            if (TAGS.lstTags.hasOwnProperty(local_tag_key)) {
                this.tagValue[local_tag_key] = 0;
                this.tagName [local_tag_key] = "";
                this.taglabel[local_tag_key] = TAGS.lstTags[local_tag_key]["label"];

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
    dataAdapter(box: PiServerBox) {
        
        
        this.wifi = true;
        switch (box.name) {
            case "getStreamsetsInterpolatedLast24Hours":
                this.subscribeSocketChanels();

                this.setStreamsetsInterpolatedInChart(box,TAGS);

                break;
            case "pi-aguila":
            case "pi-sol":
             
                this.addStreamsetsValueInChart(box);
                
				this.modal_turbine_ct_1.dataAdapter(box);
				this.modal_turbine_ct_2.dataAdapter(box);
				this.modal_turbine_ct_3.dataAdapter(box);
                break;
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
    whenLosingConnection() {
        this.wifi = false;
    }
    modifyChart(event) {
        // event es de tipo ChartControl
        //TAGS.listCharts[event.idChart]["controls"] = event;
        this.myDefCharts[event.idChart].controls = event;

        // BasChart.change_data_per_graph(this.charts[event.idChart], TAGS.listCharts[event.idChart]);
        // BasChart.change_typa_chart(this.charts[event.idChart], TAGS.listCharts[event.idChart]);
        // BasChart.changeFill(this.charts[event.idChart], TAGS.listCharts[event.idChart]);
        // BasChart.change_point_radius(this.charts[event.idChart], TAGS.listCharts[event.idChart]);
        // BasChart.change_type_scale(this.charts[event.idChart], TAGS.listCharts[event.idChart], TAGS.lstTags);
        // BasChart.chart_update(this.charts[event.idChart]);
        
        BasChart.change_data_per_graph (this.charts[event.idChart], this.myDefCharts[event.idChart]);
        BasChart.change_typa_chart     (this.charts[event.idChart], this.myDefCharts[event.idChart]);
        BasChart.changeFill            (this.charts[event.idChart], this.myDefCharts[event.idChart]);
        BasChart.change_point_radius   (this.charts[event.idChart], this.myDefCharts[event.idChart]);
        BasChart.change_type_scale     (this.charts[event.idChart], this.myDefCharts[event.idChart], TAGS.lstTags);
        BasChart.chart_update          (this.charts[event.idChart]);
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
