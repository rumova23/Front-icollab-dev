import { Component, OnInit, Input } from '@angular/core';
import { BtnBlockComponent } from './btn-block.component';

@Component({
  selector: 'app-btn-block-import',
	templateUrl: './btn-block.component.html',
})
export class BtnBlockImportComponent extends BtnBlockComponent {
	@Input() icon  : string[] = ['mr-2','ti-cloud-up'];
	@Input() label : string  = 'Import';
	
	constructor() { super() }
}
