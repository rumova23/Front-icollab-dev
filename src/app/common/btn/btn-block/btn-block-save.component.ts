import { Component, OnInit, Input } from '@angular/core';
import { BtnBlockComponent } from './btn-block.component';

@Component({
  selector: 'app-btn-block-save',
	templateUrl: './btn-block.component.html',
})
export class BtnBlockSaveComponent extends BtnBlockComponent {
	@Input() icon  : string[] = ['mr-2','ti-save'];
	@Input() label : string  = 'Save';
	
	constructor() { super() }
}
