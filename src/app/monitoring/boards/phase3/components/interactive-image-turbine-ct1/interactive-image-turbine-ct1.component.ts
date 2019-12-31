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

declare var $: any;


@Component({
    selector    : "app-interactive-image-turbine-ct1",
    templateUrl : "./interactive-image-turbine-ct1.component.html",
    styleUrls   : ["./interactive-image-turbine-ct1.component.scss"]
})
export class InteractiveImageTurbineCT1Component extends MonitoringChartTR implements OnInit {
    @Input() timeCurrent;   //esto para reutilizar el del padre u no suscribirnos de nuevo 
    @Input() ct = "ii";
    @ViewChild('chart_info')        chart_info        : ElementRef;
    @ViewChild('chartontheturbine') chartontheturbine : ElementRef;

    @ViewChild('modalturbuna') modalturbuna:ElementRef;
    @ViewChild('my_popup_info') my_popup_info:ElementRef;
    
    title="";



    public Tag_info:FinalsDataToChart={webId  : null,
        localId: "",
        idChart: "",
        values : [],
        labels : [],
        chart_tags_tag:{},
        name:""};
    public fechaActual: Date;
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
        this.title  = this.ct;
        this.webIds = this.initializeAt0();
        if(this.webIds.length > 0){
            this.getStreamsetsInterpolatedLast24Hours(this.webIds);
        }

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
    tag(element,idChart,localid) {
        if(this.globalService.plant.name == "SOL")return 0;
        if(this.globalService.socketConnect){
            //this.animar();
            this.aplicarCheck(element);
            this.datasetUniqueShowChart(idChart, localid);
            this.setInfo(localid);
        }
    }
    aplicarCheck(element: any) {
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
                
                this.setStreamsetsInterpolatedInChart(box,TAGS);
/*
                this.chartInit(TAGS.listCharts, box.data[0].Items[0].Items.length);
                for (const data of box.data) {
                    if (!data.error_response) {
                        for (const tag of data.Items) {

                            this.createRelwebIdLocalId(tag, TAGS.lstTags, TAGS.listCharts);
                            let finalsDataToChart = this.extractDataFromTheBox(tag);
                            this.setPublicVariables(finalsDataToChart);

                            for (const refChartPerTag of this.getIdsCahrtByWebId(tag.WebId)) {
                                finalsDataToChart.idChart = refChartPerTag.charId;
                                finalsDataToChart.localId = refChartPerTag.chartTag.localId;
                                finalsDataToChart.chart_tags_tag = refChartPerTag.chartTag;
                                this.setStreamTagItemsInChart(finalsDataToChart, TAGS.lstTags);
                            }
                            /*
                            for (const idChart in this.myDefCharts) {
                                // en esta grafica se puede pintar este tag
                                let chart_tags_tag = this.matchedTagIntoChart(tag, idChart);
                                if (undefined != chart_tags_tag) {
                                    finalsDataToChart.idChart = idChart;
                                    finalsDataToChart.localId = chart_tags_tag.localId;
                                    finalsDataToChart.chart_tags_tag = chart_tags_tag;
                                    this.vistafinalsDataToChart[chart_tags_tag.localId]=finalsDataToChart;
                                    this.setStreamTagItemsInChart(finalsDataToChart, TAGS.lstTags);
                                }
                            }
                        }
                    }
                }//*/
                break;
            case "pi-aguila":
            case "pi-sol":
                this.addStreamsetsValueInChart(box);
                break;
        }
    }

}
