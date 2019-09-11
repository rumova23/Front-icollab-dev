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
        this.chartsControl = form.value;
        this.chartsControlOutPut.emit(this.chartsControl);
    }
}
