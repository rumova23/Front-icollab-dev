import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
	selector: 'app-phase3v3',
	templateUrl: './phase3v3.component.html',
	styleUrls: ['./phase3v3.component.scss']
})
export class Phase3v3Component implements OnInit {
	LineChart = [];  //grafica
	mediaDona1 = []; //MediaDona1
	mediaDona2 = []; //Media Dona en medio
	mediaDona3 = []; //Media Dona en final
	mediaDonaIntermedia1 = [];
	constructor() { }


	ngOnInit() {

		// Grafica
		this.LineChart = new Chart('lineChart', {
			type: 'line',
			data: {
				labels: ["10:42:48", "10:42:53", "10:42:58", "10:43:02", "10:43:07"],
				datasets: [{
					data: [6, 6, 7, 10, 7, 6],
					fill: true,
					lineTension: 0.2,
					borderColor: "#9bc9ec",
					borderWidth: 5
				}, {
					data: [5, 5, 5, 5, 5, 5],
					fill: false,
					lineTension: 0.2,
					borderColor: "#9f8ac1",
					borderWidth: 5
				}, {
					data: [5, 4, 2, 1, 3, 5],
					fill: false,
					lineTension: 0.2,
					borderColor: "#b0d56f",
					borderWidth: 5,

				}],
				animation: true,
				animationSteps: 100,
				animationEasing: "easeOutQuart",
				scaleFontSize: 16,
				responsive: true,
				showTooltip: true,
				scaleShowGridLines: false,
				bezierCurve: true,
				pointDotRadius: 5,
			},
			options: {
				title: {
					text: "",
					display: false
				},
				legend: {
					display: false
				},
				maintainAspectRatio: false,
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				}

			}
		});
		//Dona 1
		this.mediaDona1 = new Chart('mediaDona1', {
			type: 'doughnut',
			data: {
				responsive: true,
				datasets: [
					{
						data: [80, 30, 60, 70, 80, 20],
						backgroundColor: [
							'rgba(138,53,71, 0.3)',
							'rgba(37,110,161, 0.3)',
							'rgba(200,164,67, 0.3)',
							'rgba(60,145,145, 0.3)',
							'rgba(111,73,188, 0.3)',
							'rgba(148,92,34, 0.3)',
						],
						borderWidth: 1,
						borderColor: [
							'rgba(138,53,71, 1)',
							'rgba(37,110,161, 1)',
							'rgba(200,164,67, 1)',
							'rgba(60,145,145, 1)',
							'rgba(111,73,188, 1 )',
							'rgba(148,92,34,  1)',
						],

					},
					{
						data: [10],
						backgroundColor: [
							'rgba(0,0,0)',

						],
						borderWidth: 0,
						borderColor: [
							'rgba(0,0,0)',
						],

					},

					{
						data: [80, 30, 60, 70, 80, 20],
						backgroundColor: [
							'rgba(138,53,71, 0.3)',
							'rgba(37,110,161, 0.3)',
							'rgba(200,164,67, 0.3)',
							'rgba(60,145,145, 0.3)',
							'rgba(111,73,188, 0.3)',
							'rgba(148,92,34, 0.3)',
						],
						borderWidth: 1,
						borderColor: [
							'rgba(138,53,71, 1)',
							'rgba(37,110,161, 1)',
							'rgba(200,164,67, 1)',
							'rgba(60,145,145, 1)',
							'rgba(111,73,188, 1 )',
							'rgba(148,92,34,  1)',
						],

					}
				],

			},
			options: {
				segmentShowStroke: false,
				responsive: true,
				rotation: -Math.PI,
				circumference: Math.PI,
				cutoutPercentage: 88,
				legend: {
					position: 'left'
				},
				animation: {
					animateRotate: true,
					animateScale: true
				},

			}
		});



		//Dona 2

		this.mediaDona2 = new Chart('mediaDona2', {
			type: 'doughnut',
			responsive: true,
			data: {
				datasets: [
					{
						data: [50, 30, 60, 30, 70, 60],
						backgroundColor: [
							'rgba(138,53,71, 0.3)',
							'rgba(37,110,161, 0.3)',
							'rgba(200,164,67, 0.3)',
							'rgba(60,145,145, 0.3)',
							'rgba(111,73,188, 0.3)',
							'rgba(148,92,34, 0.3)',
						],
						borderWidth: 1,
						borderColor: [
							'rgba(138,53,71, 1)',
							'rgba(37,110,161, 1)',
							'rgba(200,164,67, 1)',
							'rgba(60,145,145, 1)',
							'rgba(111,73,188, 1)',
							'rgba(148,92,34, 1)',
						],

					},
					{
						data: [10],
						backgroundColor: [
							'rgba(0,0,0)',

						],
						borderWidth: 1,
						borderColor: [
							'rgba(0,0,0)',
						],

					},
					{
						data: [50, 30, 60, 30, 70, 60],
						backgroundColor: [
							'rgba(138,53,71, 0.3)',
							'rgba(37,110,161, 0.3)',
							'rgba(200,164,67, 0.3)',
							'rgba(60,145,145, 0.3)',
							'rgba(111,73,188, 0.3)',
							'rgba(148,92,34, 0.3)',
						],
						borderWidth: 1,
						borderColor: [
							'rgba(138,53,71, 1)',
							'rgba(37,110,161, 1)',
							'rgba(200,164,67, 1)',
							'rgba(60,145,145, 1)',
							'rgba(111,73,188, 1)',
							'rgba(148,92,34, 1)',
						],


					}
				],


			},

			options: {
				responsive: true,
				rotation: -Math.PI,
				cutoutPercentage: 88,
				circumference: Math.PI,
				legend: {
					position: 'left'
				},
				animation: {
					animateRotate: true,
					animateScale: true
				}

			}

		});


		//Dona 3

		this.mediaDona3 = new Chart('mediaDona3', {
			type: 'doughnut',
			responsive: true,
			data: {

				datasets: [
					{
						data: [50, 30, 60, 70, 85, 50],
						backgroundColor: [
							'rgba(138,53,71, 0.3)',
							'rgba(37,110,161, 0.3)',
							'rgba(200,164,67, 0.3)',
							'rgba(60,145,145, 0.3)',
							'rgba(111,73,188, 0.3)',
							'rgba(148,92,34, 0.3)',
						],
						borderWidth: 1,
						borderColor: [
							'rgba(138,53,71, 1)',
							'rgba(37,110,161, 1)',
							'rgba(200,164,67, 1)',
							'rgba(60,145,145, 1)',
							'rgba(111,73,188, 1)',
							'rgba(148,92,34, 1)',
						],

					},
					{
						data: [10],
						backgroundColor: [
							'rgba(0,0,0)',

						],
						borderWidth: 1,
						borderColor: [
							'rgba(0,0,0)',
						],

					},
					{
						data: [50, 30, 60, 70, 85, 50],
						backgroundColor: [
							'rgba(138,53,71, 0.3)',
							'rgba(37,110,161, 0.3)',
							'rgba(200,164,67, 0.3)',
							'rgba(60,145,145, 0.3)',
							'rgba(111,73,188, 0.3)',
							'rgba(148,92,34, 0.3)',
						],
						borderWidth: 1,
						borderColor: [
							'rgba(138,53,71, 1)',
							'rgba(37,110,161, 1)',
							'rgba(200,164,67, 1)',
							'rgba(60,145,145, 1)',
							'rgba(111,73,188, 1)',
							'rgba(148,92,34, 1)',
						],

					}
				],


			},

			options: {
				responsive: true,
				rotation: -Math.PI,
				cutoutPercentage: 88,
				circumference: Math.PI,
				legend: {
					position: 'left'
				},
				animation: {
					animateRotate: false,
					animateScale: true
				}
			}

		});
	}

}
