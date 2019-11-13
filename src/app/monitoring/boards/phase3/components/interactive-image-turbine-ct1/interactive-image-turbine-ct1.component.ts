import { Component, OnInit, Input } from '@angular/core';
import { element } from 'protractor';
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
