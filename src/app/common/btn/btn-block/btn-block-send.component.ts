import { Component, OnInit, Input } from '@angular/core';
import { BtnBlockComponent } from './btn-block.component';

@Component({
  selector: 'app-btn-block-send',
  templateUrl: './btn-block.component.html'
})
export class BtnBlockSendComponent extends BtnBlockComponent {
	@Input() icon  : string[] = ['mr-2','ti-angle-double-right'];
  @Input() label : string  = 'Send';
	
	constructor() { super() }
}
