import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { ToastrManager } from 'ng6-toastr-notifications';
import { GlobalService } from 'src/app/core/globals/global.service';

@Component({
	selector: 'app-safe-mm-out-of-line',
	templateUrl: './safe-mm-out-of-line.component.html',
	styleUrls: ['./safe-mm-out-of-line.component.scss']
})
export class SafeMmOutOfLineComponent implements OnInit {

	constructor(
		public globalService: GlobalService,
		public toastr: ToastrManager
	) { }

	ngOnInit() {
	}
	chosenMonthHandler(d:Moment){
		const month = d.month() + 1;
		const year  = d.year();
		const date  = d.format('MM/yyyy');
	}
	clickBtn1raCorrida(){

	}
	clickBtn2daCorrida(){
		
	}
}
