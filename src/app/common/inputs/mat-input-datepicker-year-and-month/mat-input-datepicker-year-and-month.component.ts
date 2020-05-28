import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';

import { default as _rollupMoment, Moment } from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
	parse: {
		dateInput: 'MM/YYYY',
	},
	display: {
		dateInput: 'MM/YYYY',
		monthYearLabel: 'MMM YYYY',
		dateA11yLabel: 'LL',
		monthYearA11yLabel: 'MMMM YYYY',
	},
};



@Component({
	selector: 'app-mat-input-datepicker-year-and-month',
	templateUrl: './mat-input-datepicker-year-and-month.component.html',
	styleUrls: ['./mat-input-datepicker-year-and-month.component.scss'],
	providers: [
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
		},
		{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
	],
})
export class MatInputDatepickerYearAndMonthComponent implements OnInit {
	@Output() eventChange   = new EventEmitter<Moment>();
	@Input () label = "";
	@Input () minDate: Date;
  	@Input () maxDate: Date;
	date = new FormControl(moment());

	constructor() { }

	ngOnInit() {
	}

	chosenYearHandler(normalizedYear: Moment) {
		const ctrlValue = this.date.value;
		ctrlValue.year(normalizedYear.year());
		this.date.setValue(ctrlValue);
	}
	chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
		const ctrlValue = this.date.value;
		ctrlValue.month(normalizedMonth.month());
		this.date.setValue(ctrlValue);
		datepicker.close();
		this.eventChange.emit(this.date.value);
	}

}
