import { Component, Input } from '@angular/core';
import { BtnBlockComponent } from './btn-block.component';

@Component({
  selector: 'app-btn-block-search',
	templateUrl: './btn-block.component.html',
})
export class BtnBlockSearchComponent  extends BtnBlockComponent  {
  @Input() icon  : string[];// = ['mr-2','ti-check'];
	@Input() label : string  = 'Search';
	
	constructor() { super() }

}
