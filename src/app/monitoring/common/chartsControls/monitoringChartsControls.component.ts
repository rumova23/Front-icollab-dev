import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ChartControl } from 'src/app/monitoring/models/ChartControl';
import { ThemeService } from 'src/app/core/globals/theme';
declare var $: any;

@Component({
  selector: 'app-monitoringChartsControls',
  templateUrl: './monitoringChartsControls.component.html'
})
export class MonitoringChartsControlsComponent implements OnInit {
    @Input()  chartsControl : ChartControl;
    @Output() chartsControlOutPut = new EventEmitter<any>();

    constructor(public theme : ThemeService ){}
    ngOnInit(){
        $('.mystopPropagation').on('click', function(e) {
            e.stopPropagation();
        });
    }
    updateChart(form){
        this.chartsControl.type_graph     = form.value.type_graph;
        this.chartsControl.type_scale     = form.value.type_scale;
        this.chartsControl.fill           = form.value.fill;
        this.chartsControl.data_per_graph = form.value.data_per_graph;
        this.chartsControl.point_radius   = form.value.point_radius;
        this.chartsControl.time_refreseh  = form.value.time_refreseh;
        
        this.chartsControlOutPut.emit(this.chartsControl);
    }
}
