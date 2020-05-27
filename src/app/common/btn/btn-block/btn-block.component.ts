import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-btn-block',
	templateUrl: './btn-block.component.html',
})
export class BtnBlockComponent implements OnInit {
	@Output() eventClick   = new EventEmitter<any>();
	@Input () label        : string    = 'Boton';
	@Input () isDisabled   : boolean   = false;
	@Input () type         : string    = 'button';
	@Input () btnClass     : string[]  = ['btn','btn-block','align-self-end','my-0'];
	@Input () addClass     : string[]  = [];
	@Input () icon         : string[]  = [];
	
	constructor() {  }

	ngOnInit() {
		this.addClassToBtn();
	}
	addClassToBtn(){
		this.btnClass = this.btnClass.concat(this.addClass);
	}
	myEventClick() {
		this.eventClick.emit();
	}
}
