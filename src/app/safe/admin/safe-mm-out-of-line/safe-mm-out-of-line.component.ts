import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';

@Component({
	selector: 'app-safe-mm-out-of-line',
	templateUrl: './safe-mm-out-of-line.component.html',
	styleUrls: ['./safe-mm-out-of-line.component.scss']
})
export class SafeMmOutOfLineComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}
	chosenMonthHandler(a:Moment){
		const date = a.toDate();
		const month = a.month() + 1;
		const year  = a.year();
	}
}
