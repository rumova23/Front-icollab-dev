import { Component, OnInit } from '@angular/core';
import { ThemeService      } from 'src/app/core/globals/theme';

@Component({
  selector    : 'app-shared-footer',
  templateUrl : './shared-footer.component.html',
  styleUrls   : ['./shared-footer.component.scss']
})
export class SharedFooterComponent implements OnInit {

	constructor(
		public theme : ThemeService
	) { }

	ngOnInit() {
	}

}
