import { Component, OnInit, Input } from '@angular/core';
import { BtnBlockComponent } from './btn-block.component';

@Component({
  selector: 'app-btn-block-back',
	templateUrl: './btn-block.component.html',
})
export class BtnBlockBackComponent extends BtnBlockComponent {
	@Input() icon  : string[] = ['mr-2','ti-angle-double-left'];
	@Input() label : string  = 'Back';
	
	constructor() { super() }
}
