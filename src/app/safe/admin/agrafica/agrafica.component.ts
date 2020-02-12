import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GlobalService          } from 'src/app/core/globals/global.service';
import { ThemeService           } from 'src/app/core/globals/theme';
import { GraficaDosaService     } from 'src/app/monitoring/boards/demo-grafica-dos/service/grafica-dosa.service';
import { Chart                  } from 'chart.js';
import { Subscription           } from 'rxjs';

@Component({
	selector    : 'app-agrafica',
	templateUrl : './agrafica.component.html',
	styleUrls   : ['./agrafica.component.scss']
})
export class AgraficaComponent implements OnInit {
	@ViewChild('canvas1') canvas1: ElementRef;
	public subscriptions: Subscription[] = [];          // almacena las todos los observables
	public charts = [];

	constructor(
		public globalService: GlobalService,
		public theme: ThemeService,
		private graficaDosaService: GraficaDosaService) { }

	ngOnDestroy() {
		for (const iterator in this.subscriptions) {
			this.subscriptions[iterator].unsubscribe();
		}
	}
	ngOnInit() {
		this.subscriptions.push(
			this.graficaDosaService.getData().subscribe(
				(data: any[]) => {
					data.map(x => {
						x.fill = false;
						x.borderColor = x.backgroundColor;
						x.borderWidth = 1;
						return x;
					});
					this.charts['canvas1'] = new Chart(
						this['canvas1'].nativeElement
						, this.chartCreateConfigDemo(data)
					);
				}
			)
		);
	}
	chartCreateConfigDemo(data: any[]) {
		return {
			type: 'line',
			data: {
				labels: new Array(data[0].data.length).fill(0).map((_valor, indice) => indice),
				datasets: data
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					yAxes: [
						{
							ticks: { min: 0, max: 500 },
							type: 'linear',
							display: true,
							position: 'left',
							id: 'y-axis-1',
						},

						{
							ticks: { min: 0, max: 50 },
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
