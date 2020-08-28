import { Component, OnInit, Input } from '@angular/core';
import { BtnBlockComponent } from './btn-block.component';

@Component({
  selector: 'app-btn-block-reject',
  templateUrl: './btn-block.component.html'
})
export class BtnBlockRejectComponent extends BtnBlockComponent {
	@Input() icon  : string[] = ['mr-2','ti-check'];
  @Input() label : string  = 'Reject';
	
	constructor() { super() }
}
