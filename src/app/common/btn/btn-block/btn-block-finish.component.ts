import { Component, OnInit, Input } from '@angular/core';
import { BtnBlockComponent } from './btn-block.component';

@Component({
  selector: 'app-btn-block-finish',
	templateUrl: './btn-block.component.html',
})
export class BtnBlockFinishComponent extends BtnBlockComponent {
	@Input() icon  : string[] = ['mr-2','ti-check'];
	@Input() label : string  = 'Finish';
	
	constructor() { super() }
}
