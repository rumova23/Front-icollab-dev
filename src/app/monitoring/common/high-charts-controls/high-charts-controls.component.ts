import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChartControls, TypeScaleType, TypeGraphType } from './models/highchartsControls.model';
import { ThemeService } from 'src/app/core/globals/theme';
declare var $: any;
@Component({
  selector: 'app-high-charts-controls',
  templateUrl: './high-charts-controls.component.html',
  styleUrls: ['./high-charts-controls.component.scss']
})
export class HighChartsControlsComponent implements OnInit {
  @Input()  chartsControl : ChartControls;
  @Output() chartsControlOutPut = new EventEmitter<any>();
  public readonly typeScaleTypes:string[] = Object.values(TypeScaleType);
  public readonly typeGraphType:string[] = Object.values(TypeGraphType);
  
  constructor(public theme : ThemeService ){}
  ngOnInit(){
      $('.mystopPropagation').on('click', function(e) {
          e.stopPropagation();
      });
  }
  updateChart(form){
    this.chartsControl;
    debugger;
      this.chartsControlOutPut.emit(this.chartsControl);
  }
}
