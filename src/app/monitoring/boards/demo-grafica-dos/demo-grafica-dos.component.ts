import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ThemeService } from 'src/app/core/globals/theme';
import { Chart } from 'chart.js';
import { GraficaDosaService } from './service/grafica-dosa.service';

@Component({
  selector: 'app-demo-grafica-dos',
  templateUrl: './demo-grafica-dos.component.html',
  styleUrls: ['./demo-grafica-dos.component.scss']
})
export class DemoGraficaDosComponent  implements OnInit {
	@ViewChild('canvas1') canvas1:ElementRef;
	charts = [];

	constructor(
		public globalService       : GlobalService,
		public theme               : ThemeService,
		private graficaDosaService : GraficaDosaService
	) {
	}

	ngOnInit() {
		this.graficaDosaService.getData().subscribe(
			(data:any[])=>{
				data.map(x=>{
					x.fill=false;
					x.borderColor=x.backgroundColor;
					x.borderWidth = 1;
					return x;
				});
				this.charts['canvas1'] = new Chart(
					 this['canvas1'].nativeElement
					,this.chartCreateConfigDemo(data)
				);
			}
		);
	}
	chartCreateConfigDemo(data:any[]){
		return{
			type: 'line', 
			data: {
				labels: new Array(     data[0].data.length    ).fill(0).map((_valor,indice)=>indice),
				datasets: data
			},
			options: {
				scales: {
					yAxes: [
						{
							ticks: {min: 0,max: 500},
							type: 'linear', 
							display: true,
							position: 'left',
							id: 'y-axis-1',
						},
						
						{
							ticks: {min: 0,max: 50},
							type: 'linear', 
							display: true,
							position: 'left',
							id: 'y-axis-2',
						}
					]
				}
			}
		};
	}

}
