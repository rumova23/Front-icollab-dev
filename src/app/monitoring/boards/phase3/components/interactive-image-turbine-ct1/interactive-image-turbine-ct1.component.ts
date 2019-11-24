import { Component, OnInit, Input } from '@angular/core';
import { element } from 'protractor';
import { Chart } from 'chart.js';
declare var $: any;

@Component({
  selector    : 'app-interactive-image-turbine-ct1',
  templateUrl : './interactive-image-turbine-ct1.component.html',
  styleUrls   : ['./interactive-image-turbine-ct1.component.scss']
})
export class InteractiveImageTurbineCT1Component implements OnInit {
	@Input() lstTags: any;
	public Tag_info = "";
	constructor() { }

	ngOnInit() {
		var myChart = new Chart('chart_rt5', {
			type: 'line',
			data: {
				labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
				datasets: [{
					label: '# of Votes',
					data: [12, 19, 3, 5, 2, 3],
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(153, 102, 255, 0.2)',
						'rgba(255, 159, 64, 0.2)'
					],
					borderColor: [
						'rgba(255, 99, 132, 1)',
						'rgba(54, 162, 235, 1)',
						'rgba(255, 206, 86, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)',
						'rgba(255, 159, 64, 1)'
					],
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						},
						position: 'right',
					}]
				}
			}
		});
		
		
		var myChart = new Chart('chart_rt2', {
			type: 'bar',
			data: {
				labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
				datasets: [{
					label: '# of Votes',
					data: [12, 19, 3, 5, 2, 3],
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(153, 102, 255, 0.2)',
						'rgba(255, 159, 64, 0.2)'
					],
					borderColor: [
						'rgba(255, 99, 132, 1)',
						'rgba(54, 162, 235, 1)',
						'rgba(255, 206, 86, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)',
						'rgba(255, 159, 64, 1)'
					],
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						},
					}]
				}
			}
		});
	}

	openModalCt_1(){
		$('#ModalTurbineCT1').modal('show');
	}
	animar(idElement){
		let element = document.getElementById('my-popup-info');
		
		//const element =  document.querySelector('.my-popup-info');
		if(element.classList.contains('zoomOut')){
			element.classList.remove('animated', 'zoomOut');
			this.setInfo(idElement);
			this.animateCSS('.my-popup-info','slideInDown',()=>{
			
			});
		} else if(element.classList.contains('slideInDown')){
			
			element.classList.remove('animated', 'slideInDown');

			this.animateCSS('.my-popup-info','zoomOut',()=>{
				this.setInfo(idElement);
				element.classList.remove('animated', 'zoomOut');
				this.animateCSS('.my-popup-info','slideInDown',()=>{
			
				});
			});
		}
		
		

		//*/
	}
	animateCSS(element, animationName, callback) {
		const node = document.querySelector(element);
		node.classList.add('animated', animationName);
		
		function handleAnimationEnd() {
			//node.classList.remove('animated', animationName)
			node.removeEventListener('animationend', handleAnimationEnd);
	
			if (typeof callback === 'function') callback();
		}
	
		node.addEventListener('animationend', handleAnimationEnd);
	}
	tag(idElement){
		this.animar(idElement);
		this.aplicarCheck(idElement);
		console.log(this.lstTags);
		
	}
	aplicarCheck(idElement:any){
		let selectores:any = document.getElementsByClassName("tagpoint");
		for (const ref of selectores) {
			ref.classList.remove("active");
		}
		document.getElementById(idElement).classList.add("active");
	}
	setInfo(idElement){
		switch (idElement) {
			case 'tag_0':
					this.Tag_info = "Hola mundo";
				break;
		
			case 'tag_1':
					this.Tag_info = "tag 1";
				break;
			default:
				break;
		}
	}
}