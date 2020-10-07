import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
		dateInput: 'YYYY',
		monthYearLabel: 'MMM YYYY',
		dateA11yLabel: 'LL',
		monthYearA11yLabel: 'MMMM YYYY',
	},
};

@Component({
	selector: 'app-mat-input-datepicker-year',
	templateUrl: './mat-input-datepicker-year.component.html',
	styles: [],
	providers: [
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
		},
		{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
	],
})
export class MatInputDatepickerYearComponent implements OnInit {
	@Output() eventChange   = new EventEmitter<Moment>();
	@Input() minDate         : Date;
  	@Input() maxDate         : Date;
	@Input() label           : string = '';
	@Input() sufijo          : string = '';
	@Input() submitted       : boolean = false;
	@Input() controlName     : string = null;
	@Input() formGroup       : FormGroup = null;
	//date = new FormControl(moment());

	constructor() { }

	ngOnInit() {
	}

	chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
		let ctrlValue = this.formGroup.get(this.controlName).value;
		if(ctrlValue == null) ctrlValue = moment();
		ctrlValue.year(normalizedYear.year());
		this.formGroup.get(this.controlName).setValue(ctrlValue);
		
		datepicker.close();
		this.eventChange.emit(this.formGroup.get(this.controlName).value);
	}

}
