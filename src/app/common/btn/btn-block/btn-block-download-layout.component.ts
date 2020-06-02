import { Component, OnInit, Input } from '@angular/core';
import { BtnBlockComponent } from './btn-block.component';

@Component({
  selector: 'app-btn-block-download-layout',
	templateUrl: './btn-block.component.html',
})
export class BtnBlockDownloadLayoutComponent extends BtnBlockComponent {
	@Input() icon  : string[] = ['mr-2','ti-cloud-down'];
	@Input() label : string  = 'Download Layout';
	
	constructor() { super() }
}
