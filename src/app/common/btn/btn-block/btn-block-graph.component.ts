import { Component, Input } from '@angular/core';
import { BtnBlockComponent } from './btn-block.component';

@Component({
  selector: 'app-btn-block-graph',
	templateUrl: './btn-block.component.html',
})
export class BtnBlockGraphComponent extends BtnBlockComponent {
	@Input() icon  : string[] = ['mr-2','ti-bar-chart-alt'];
	@Input() label : string  = 'Graph';
	
	constructor() { super() }
}
