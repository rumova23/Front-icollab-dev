import { Component                       } from '@angular/core';
import { Chart                           } from 'chart.js';
import { GlobalService                   } from 'src/app/core/globals/global.service';
import { EventService                    } from 'src/app/core/services/event.service';
import { SocketService                   } from 'src/app/core/services/socket.service';
import { getMyDateFormat                 } from 'src/app/core/helpers/util.general';
import { MonitoringBaseSocketOnComponent } from './monitoringBaseSocketOn.component';
import { MonitoringTrService             } from '../services/monitoringTr.service';
import { PiServerItem                    } from '../models/piServer/piServerItem';
import { FinalsDataToChart               } from '../models/chart/finals-data-to-chart';

import * as BasChart from "src/app/monitoring/helpers/monitoringBaseChart.component";

@Component({
	selector: 'app-monitoring-chart-tr',
	template: `NO UI TO BE FOUND HERE!`
})
export class MonitoringChartTR extends MonitoringBaseSocketOnComponent {
    public charts            : Array<Chart> = [];
	public myDefCharts       : Array<any> = [];
	public dataSets          : [] = []; // para poder conoce los colores de cada dataset

	public rel_webId_localId : Array<any> = [];
	
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
            this.myDefCharts[idChart] = new OBJlistChartsCLASS[idChart];
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
	
    getchartControl(idChart) {
        return this.myDefCharts[idChart] ? this.myDefCharts[idChart]["controls"] : { idChart: false };
    }
    createRelwebIdLocalId(tag: PiServerItem, localLstTags) {
        for (const local_tag_key in localLstTags) {
            if (localLstTags.hasOwnProperty(local_tag_key)) {
                for (const localtag of localLstTags[local_tag_key][this.globalService.plant.name.toLowerCase()]) {
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
}