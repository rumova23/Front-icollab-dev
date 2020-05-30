import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
	selector: 'app-safe-registration-of-events',
	templateUrl: './safe-registration-of-events.component.html',
	styleUrls: ['./safe-registration-of-events.component.scss']
})
export class SafeRegistrationOfEventsComponent implements OnInit {
	formNewEvent: FormGroup;
	constructor(
		private formBuilder:FormBuilder,
		public globalService: GlobalService,
		public toastr: ToastrManager,
		private confirmationDialogService: ConfirmationDialogService,
	) { }

	ngOnInit() {
		this.formNewEvent = this.formBuilder.group(
			{
				time:[{ value: moment(new Date()).format('h:mm'), disabled: false }, Validators.required],
				datepicker:[{ value: new Date(), disabled: false }, Validators.required],
				number:[{ value: 1, disabled: false }, Validators.required],
				text:[{ value: '', disabled: false }, Validators.required],
				datetimelocal:[{ value: moment(new Date()).format('YYYY-MM-DDTHH:mm'), disabled: false }, Validators.required],
			}
		);
	}
	onSubmitFormNewEvent(v){
		let casas = moment(v.datetimelocal);
		let dsa = casas.format('YYYY-MM-DD HH:mm:ss');
		debugger;
	}
	btnClickBack(){
		this.toastr.successToastr('btnClickBack', 'Seleccionaste');
	}
}
