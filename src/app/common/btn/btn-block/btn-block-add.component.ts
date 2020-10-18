import { Component, OnInit, Input } from '@angular/core';
import { BtnBlockComponent } from './btn-block.component';


@Component({
  selector: 'app-btn-block-add',
	templateUrl: './btn-block.component.html',
})
export class BtnBlockAddComponent extends BtnBlockComponent {
	@Input() icon  : string[] = ['mr-2','ti-plus'];
	@Input() label : string  = 'Add';
	
	constructor() { super() }
}
