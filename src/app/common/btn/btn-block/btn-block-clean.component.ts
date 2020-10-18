import { Component, Input } from '@angular/core';
import { BtnBlockComponent } from './btn-block.component';

@Component({
  selector: 'app-btn-block-clean',
	templateUrl: './btn-block.component.html',
})
export class BtnBlockCleanComponent  extends BtnBlockComponent  {
  @Input() icon  : string[];// = ['mr-2','ti-check'];
	@Input() label : string  = 'Clean';
	
	constructor() { super() }

}
