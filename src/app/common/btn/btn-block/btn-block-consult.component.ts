import { Component, Input } from '@angular/core';
import { BtnBlockComponent } from './btn-block.component';

@Component({
  selector: 'app-btn-block-consult',
	templateUrl: './btn-block.component.html',
})
export class BtnBlockConsultComponent  extends BtnBlockComponent  {
  @Input() icon  : string[];// = ['mr-2','ti-check'];
	@Input() label : string  = 'Consult';
	
	constructor() { super() }

}
