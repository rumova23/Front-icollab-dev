import { Component, OnInit, Input } from '@angular/core';
import { BtnBlockComponent } from './btn-block.component';

@Component({
  selector: 'app-btn-block-save-update',
	templateUrl: './btn-block.component.html',
})
export class BtnBlockSaveUpdateComponent extends BtnBlockComponent {
	@Input() icon  : string[] = ['mr-2','ti-pencil'];
	@Input() label : string  = 'Save / Update';
	
	constructor() { super() }
}
