import { Component, OnInit, Input } from '@angular/core';
import { BtnBlockComponent } from './btn-block.component';

@Component({
  selector: 'app-btn-block-acept',
	templateUrl: './btn-block.component.html',
})
export class BtnBlockAceptComponent extends BtnBlockComponent {
	@Input() icon  : string[] = ['mr-2','ti-check'];
	@Input() label : string  = 'Accept';
	
	constructor() { super() }
}
