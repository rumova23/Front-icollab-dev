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
	@Input() data:any;
	public tooltip = [];
	public Tag_info = {Name:"",Value:""};
	public chart_rt2 : Chart;
	public chart_rt22 : Chart;
	public fechaActual:Date;
	constructor() { }

	ngOnInit() {
		this.chart_rt2 = new Chart('chart_rt5', {
			type: 'line',
			data: {
				labels: [],
				datasets: [{
					label: 'ss',
					data: [],
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)'
					],
					borderColor: [
						'rgba(255, 99, 132, 1)'
					],
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: false
						},
						position: 'right',
					}]
				}
			}
		});
		
		
		this.chart_rt22 = new Chart('chart_rt2', {
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
		this.tooltip["DAA08103"]={Name:"caos",Value:0};
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
		console.log("this.data::::", this.data);
		
		
	}
	dataAdapter(){
		
		let checkTime = function (i) {
			if (i < 10) {
				i = "0" + i;
			}
			return i;
		}

		let data = this.data.data[0]['Items'][0]['Value']['Value'];
		let _data = this.chart_rt2.data.datasets[0].data;
		let _data_ = this.chart_rt2.data;
		_data.push(data);
		this.fechaActual = new Date();
		let time3 = checkTime(this.fechaActual.getHours()) + ":" + checkTime(this.fechaActual.getMinutes()) + ":" + checkTime(this.fechaActual.getSeconds());
		_data_.labels.push(time3);
		if (_data.length >= 50) {
			_data.shift();
			_data_.labels.shift();
		}
		this.chart_rt2.update();
	}
	gettooltip(){
		for(let tag of this.data.data[0]['Items']){
			this.tooltip[tag.Name]={Name:tag.Name,Value:tag.Value.Value};
		}
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
					this.Tag_info = {Name:this.tooltip['DAA08103']['Name'],Value:this.tooltip['DAA08206']['Value']};
				break;
		
			case 'tag_1':
					this.Tag_info = {Name:this.tooltip['DAA08206']['Name'],Value:this.tooltip['DAA08206']['Value']};
				break;
			default:
				break;
		}
	}
}
