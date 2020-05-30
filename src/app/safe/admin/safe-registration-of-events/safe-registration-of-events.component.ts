import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
	selector: 'app-safe-registration-of-events',
	templateUrl: './safe-registration-of-events.component.html',
	styleUrls: ['./safe-registration-of-events.component.scss']
})
export class SafeRegistrationOfEventsComponent implements OnInit {
	formNewEvent: FormGroup;
	constructor(
		private formBuilder:FormBuilder
	) { }

	ngOnInit() {
		this.formNewEvent = this.formBuilder.group(
			{
				time:[{ value: moment(new Date()).format('h:mm'), disabled: false }, Validators.required],
				datepicker:[{ value: new Date(), disabled: false }, Validators.required],
				number:[{ value: 1, disabled: false }, Validators.required],
				text:[{ value: '', disabled: false }, Validators.required],
				datetimelocal:[{ value: null, disabled: false }, Validators.required],
			}
		);
	}
	onSubmitFormNewEvent(v){

	}

}
