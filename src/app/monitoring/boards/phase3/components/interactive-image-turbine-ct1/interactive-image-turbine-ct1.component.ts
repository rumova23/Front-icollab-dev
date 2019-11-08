import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector    : 'app-interactive-image-turbine-ct1',
  templateUrl : './interactive-image-turbine-ct1.component.html',
  styleUrls   : ['./interactive-image-turbine-ct1.component.scss']
})
export class InteractiveImageTurbineCT1Component implements OnInit {

	constructor() { }

	ngOnInit() {
	}

	openModalCt_1(){
		$('#ModalTurbineCT1').modal('show');
	}
	animar(){
		let element = document.getElementById('my-popup-info');
		
		//const element =  document.querySelector('.my-popup-info');
		if(element.classList.contains('flipOutX')){
			element.classList.remove('animated', 'flipOutX');

			this.animateCSS('.my-popup-info','flipInX',()=>{
			
			});
		} else if(element.classList.contains('flipInX')){
			
			element.classList.remove('animated', 'flipInX');

			this.animateCSS('.my-popup-info','flipOutX',()=>{
			
				element.classList.remove('animated', 'flipOutX');
				this.animateCSS('.my-popup-info','flipInX',()=>{
			
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
}
