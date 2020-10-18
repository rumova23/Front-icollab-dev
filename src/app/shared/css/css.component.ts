import { Component, OnInit } from '@angular/core';
import { GlobalService     } from 'src/app/core/globals/global.service';

@Component({
	selector: 'app-css',
	templateUrl: './css.component.html'
})
export class CssComponent implements OnInit {

	constructor(public globalService: GlobalService) { }

	ngOnInit() {
		this.globalService.setTheme();
	}

}
