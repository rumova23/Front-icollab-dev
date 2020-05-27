import { Component, OnInit, Input } from '@angular/core';
import { BtnBlockComponent } from './btn-block.component';

@Component({
	selector: 'app-btn-block-download',
	templateUrl: './btn-block.component.html',
})
export class BtnBlockDownloadComponent extends BtnBlockComponent {
	@Input() icon  : string[] = ['mr-2','ti-cloud-down'];
	@Input() label : string  = 'Download';
	
	constructor() { super() }
}
