import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ThemeService } from 'src/app/core/globals/theme';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { SafeagraficaService } from './services/safeagrafica.service';

@Component({
	selector: 'app-agrafica',
	templateUrl: './agrafica.component.html',
	styleUrls: ['./agrafica.component.scss']
})
export class AgraficaComponent implements OnInit {
	@ViewChild('canvas1') canvas1: ElementRef;
	public subscriptions: Subscription[] = [];          // almacena las todos los observables
	public charts = [];

	constructor(
		public globalService: GlobalService,
		public theme: ThemeService,
		private graficaDosaService: SafeagraficaService) { }

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
						x.borderWidth = 2;
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
	financial(x) {
		return +Number.parseFloat(x).toFixed(1);
	}
	chartCreateConfigDemo(data: any[]) {
		let j: number = 0;
		let labels = [0];

		for (let index = 0; index < 501; index++) {
			j += 0.1;
			j = this.financial(j);
			labels.push(j);
		}
		var ticks = new Array(51).fill(0).map((_valor, indice) => indice+' °C');
		return {
			type: 'line',
			data: {
				//				labels: new Array(12).fill(0).map((_valor, indice) => indice),
				labels: labels,
				datasets: data
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				tooltips: {
					//mode: 'index',
					callbacks: {
						title: function (tooltipItems, data) {
							let dato = data.datasets[0].data[tooltipItems[0].index];
							return 'Temperatura: ' + dato.x + ' °C';
						},
						footer: function (tooltipItems, data) {
							let dato = data.datasets[0].data[tooltipItems[0].index];
							/*var sum = 0;
							tooltipItems.forEach(function(tooltipItem) {
								sum += data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
							});//*/
							//return 'Temperatura: ' + dato.x +' °C';
						},
					},
					//footerFontStyle: 'normal'
				},
				scales: {
					yAxes: [
						{
							ticks: { min: 460, max: 580, stepSize: 2 },
							type: 'linear',
							display: true,
							position: 'left',
							id: 'y-axis-1',
						},

						{
							ticks: { min: 0, max: 60, stepSize: 1 },
							type: 'linear',
							display: true,
							position: 'right',
							id: 'y-axis-2',
						}
					],
					xAxes: [{
						id: "x-temperatura-real",
						display: false,
						scaleLabel: {
							display: true,
							labelString: 'Temperatura'
						},
						ticks: {
							//autoSkip: false,
						}
					},
					{
						id: "x-temperatura",
						gridLines: {
							display: false,
							drawBorder: false
						},

						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Temperatura'
						},
						afterBuildTicks: function (scale) {
							scale.ticks = ticks;
							return;
						},
						ticks: {
							autoSkip: false,
							fontColor: "#545354"
						}
					}

					]
				}
			}
		};
	}
}
