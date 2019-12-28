import { Component                       } from '@angular/core';
import { Chart                           } from 'chart.js';
import { GlobalService                   } from 'src/app/core/globals/global.service';
import { EventService                    } from 'src/app/core/services/event.service';
import { SocketService                   } from 'src/app/core/services/socket.service';
import { getMyDateFormat                 } from 'src/app/core/helpers/util.general';
import { MonitoringBaseSocketOnComponent } from './monitoringBaseSocketOn.component';
import { MonitoringTrService             } from '../services/monitoringTr.service';
import { PiServerItem                    } from '../models/piServer/piServerItem';
import { FinalsDataToChart               } from '../models/chart/finalsDataToChart';
import { RelWebIdLocalId                 } from '../models/rel_webId_localId/rel_webId_localId';
import { RelWebIdChartId                 } from '../models/rel_webId_localId/rel_webId_charId';

import * as BasChart from "src/app/monitoring/helpers/monitoringBaseChart.component";
import { MyChart } from '../models/chart/myChart';
import { PiServerBox } from '../models/piServer/piServerBox';

@Component({
	selector: 'app-monitoring-chart-tr',
	template: `NO UI TO BE FOUND HERE!`
})
export class MonitoringChartTR extends MonitoringBaseSocketOnComponent {
    public webIds            : Array<string>  = [];
    public charts            : Array<Chart>   = [];
	public myDefCharts       : Array<MyChart> = [];
	public dataSets          : [] = []; // para poder conoce los colores de cada dataset

    public rel_webId_localId : Array<Array<RelWebIdLocalId>> = [];
    public rel_webId_CharId  : Array<Array<RelWebIdChartId>> = [];
    
    public vistafinalsDataToChart :Array<FinalsDataToChart>=[];

    public tagValue          = [];
    public tagName           = [];
	public taglabel          = [];
	
	constructor(
		public globalService       : GlobalService,
		public eventService        : EventService,
		public socketService       : SocketService,
		public monitoringTrService : MonitoringTrService
	) {
		super(globalService, eventService, socketService, monitoringTrService);
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
    setPublicVariables(finalsDataToChart:FinalsDataToChart) {
        if (undefined != this.rel_webId_localId[finalsDataToChart.webId]) {
            for (const iterator of this.rel_webId_localId[finalsDataToChart.webId]) {
                this.tagValue[iterator.localId] = finalsDataToChart.values[finalsDataToChart.values.length - 1];
                this.tagName [iterator.localId] = finalsDataToChart.name;
                //this.taglabel[iterator.localId] = TAGS.lstTags[iterator.localId].label;
            }
        }
	}
    matchedTagIntoChart(tag, idChart) {
        return this.myDefCharts[idChart]["tags"].find(obj => {
            if (undefined === this.rel_webId_localId[tag.WebId]) return false;
            for (const rel of this.rel_webId_localId[tag.WebId]) {
                if (rel.active && rel.localId == obj.localId) {
                    return true;
                }
            }
            return false;
        });
	}
	
    chartInit(OBJlistChartsCLASS, data_per_graph = 25) {
        for (const idChart in OBJlistChartsCLASS) {
            if(this[idChart]){
                //this.myDefCharts[idChart] = new OBJlistChartsCLASS[idChart];
                this.myDefCharts[idChart]          = new MyChart();
                this.myDefCharts[idChart].tags     = OBJlistChartsCLASS[idChart].tags;
                this.myDefCharts[idChart].type     = OBJlistChartsCLASS[idChart].type;
                this.myDefCharts[idChart].controls = {
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
                this.charts[idChart] = new Chart(this[idChart].nativeElement, BasChart.chartCreateConfig(this.myDefCharts[idChart].controls));
            }
        }
	}
	chartOpen(){
        for (const key in this.myDefCharts) {
            if (this.myDefCharts.hasOwnProperty(key)) {
                const defChart = this.myDefCharts[key];
                if (this.check_time_refreseh_data(
                    defChart["controls"]["time_refreseh"]
                   ,defChart["controls"]["timePast"])
               ) {
                    defChart.write             = true;
                    defChart.controls.timePast = new Date();
                
                    /* Actualizar valor de label eje x  */
                    this.charts[key].data.labels.push(this.getTime());
                    if (this.charts[key].data.labels.length > defChart.controls.data_per_graph) {
                        this.charts[key].data.labels.shift();
                    }
                    /* ./Actualizar valor de label eje x  */
               }
            }
        }
    }
    chartClose(){
        for (const key in this.myDefCharts) {
            if (this.myDefCharts.hasOwnProperty(key)) {
                const defChart = this.myDefCharts[key];
                defChart.write = false;
            }
        }
    }
    chartEnableWrite(){
        this.chartClose();
        this.chartOpen();
    }
    getchartControl(idChart) {
        return this.myDefCharts[idChart] ? this.myDefCharts[idChart]["controls"] : { idChart: false };
    }
    createRelwebIdLocalId(tag: PiServerItem, localLstTags, localLstCharts, plants = this.globalService.plant.name.toLowerCase()) {
        if( ! Array.isArray(plants) )plants = [plants];
        for (const local_tag_key in localLstTags) {
            for (const plant of plants) {
                for (const localtag of localLstTags[local_tag_key][plant]) {
                    if (localtag.WebId == tag.WebId) {
                        for(let idChart in localLstCharts){
                            for (const chartTag of localLstCharts[idChart].tags) {
                                if(chartTag.localId == local_tag_key){
                                    if(this.rel_webId_CharId[tag.WebId] === undefined) {
                                        this.rel_webId_CharId[tag.WebId] = [];
                                    }
                                    if (this.rel_webId_CharId[tag.WebId].find((obj:RelWebIdChartId) => obj.charId == idChart) === undefined) {
                                        this.rel_webId_CharId[tag.WebId].push({
                                            //WebId: tag.WebId,
                                            charId: idChart,
                                            chartTag
                                        });
                                    } else {
                                    }
                                }
                            }
                        }
                        // crear relaciones
                        if (this.rel_webId_localId[tag.WebId] === undefined) {
                            this.rel_webId_localId[tag.WebId] = [];
                        }
                        if (this.rel_webId_localId[tag.WebId].find((obj:RelWebIdLocalId) => obj.localId == local_tag_key) === undefined) {
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
	getIdsCahrtByWebId(WebId):Array<RelWebIdChartId>{
        return Object.keys(this.rel_webId_CharId).includes(WebId) ? this.rel_webId_CharId[WebId] : [];
    }
	getIdsLocalTagByWebId(WebId):Array<RelWebIdLocalId>{
        return this.rel_webId_localId[WebId];
    }
    setStreamsetsInterpolatedInChart(box: PiServerBox, TAGS){
        
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
                        this.vistafinalsDataToChart[finalsDataToChart.chart_tags_tag.localId]=finalsDataToChart;
                        this.setStreamTagItemsInChart(finalsDataToChart, TAGS.lstTags);
                    }
            
                }
            }
        }
    }
	setStreamTagItemsInChart(finaleFataToChart: FinalsDataToChart, localLstTags) {
        let local_tag_key = finaleFataToChart.localId;
        let idChart = finaleFataToChart.idChart;
        let values = finaleFataToChart.values;
        let labels = finaleFataToChart.labels;
        let existDataset = function(tag) {
            return tag.id === local_tag_key;
        };
        let dataset = this.charts[idChart].data.datasets.find(existDataset);
        if (dataset == undefined) {
            let tagconf = localLstTags[local_tag_key];

            var hex = tagconf.color;
            let rgba = BasChart.hexToRGB(tagconf.color, 0.3);
            var newDataset = {
                id: local_tag_key,
                rgba: rgba,
                label: localLstTags[local_tag_key].label+' ('+finaleFataToChart.name+')',
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
    addStreamsetsValueInChart(box: PiServerBox){
        if(Object.keys(this.charts).length > 0){
            this.chartEnableWrite();
            for (const data of box.data) {
                if (!data.error_response) {
                    for (const tag of data.Items) {

                        let finalsDataToChart = this.extractDataFromTheBox(tag);
                        this.setPublicVariables(finalsDataToChart);

                        for (const refChartPerTag of this.getIdsCahrtByWebId(tag.WebId)) {
                            
                            if (this.myDefCharts[refChartPerTag.charId].write){

                                finalsDataToChart.idChart = refChartPerTag.charId;
                                finalsDataToChart.localId =  refChartPerTag.chartTag.localId;
                                finalsDataToChart.chart_tags_tag = refChartPerTag.chartTag;
                                this.vistafinalsDataToChart[finalsDataToChart.chart_tags_tag.localId]=finalsDataToChart;
                                
                                this.addStreamTagItemsInChart(finalsDataToChart);
                            }
                        }
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
                if (tag.data.length >= this.myDefCharts[idChart].controls.data_per_graph) {
                    tag.data.shift();
                }
            }
        }

        this.charts[idChart].update();
	}
	
	datasetUniqueShowChart(idChart, localKeyTag) {
        if (this.dataSets[`${idChart}-${localKeyTag}`] !== undefined) {
            for (const local_tag_key in this.dataSets) {
                //this.dataSets[local_tag_key].hidden = true;
                
				var arrayDeCadenas = local_tag_key.split('-');
				
                if(idChart === arrayDeCadenas[0]){ // para que no altere esta grafica
                    this.dataSets[`${local_tag_key}`].hidden = true;
                }
            }
            this.dataSets[`${idChart}-${localKeyTag}`].hidden = false;

            for (let index = 0; index < this.charts[idChart].config.options.scales.yAxes.length; index++) {
                const element = this.charts[idChart].config.options.scales.yAxes[index];
                if (element.id == localKeyTag) {
                    //this.yAxes_main[localKeyTag].display = !this.dataSets[`${idChart}-${localKeyTag}`].hidden;
                    this.charts[idChart].config.options.scales.yAxes[index].display = true;
                }else{
                    this.charts[idChart].config.options.scales.yAxes[index].display = false;
                }
            }
            this.charts[idChart].update();
        }
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
        //BasChart.change_type_scale     (this.charts[event.idChart], this.myDefCharts[event.idChart], TAGS.lstTags);
        BasChart.chart_update          (this.charts[event.idChart]);
    }
}