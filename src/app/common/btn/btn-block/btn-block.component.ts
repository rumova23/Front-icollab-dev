import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-btn-block',
	templateUrl: './btn-block.component.html',
})
export class BtnBlockComponent implements OnInit {
	@Output() myClick   = new EventEmitter<any>();
	@Input () label        : string    = 'Boton';
	@Input () disabled     : boolean   = false;
	@Input () mytype       : string    = 'button';
	@Input () btnClass     : string[]  = ['btn','btn-block','my-0']; //'align-self-end'
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
		this.myClick.emit();
	}
}
