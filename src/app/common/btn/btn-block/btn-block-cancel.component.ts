import { Component, OnInit, Input } from '@angular/core';
import { BtnBlockComponent } from './btn-block.component';

@Component({
  selector: 'app-btn-block-cancel',
	templateUrl: './btn-block.component.html',
})
export class BtnBlockCancelComponent extends BtnBlockComponent {
	@Input() icon  : string[] = ['mr-2','ti-close'];
	@Input() label : string  = 'Cancel';
	
	constructor() { super() }
}
