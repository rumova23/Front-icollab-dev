import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-mat-input-datepicker',
	templateUrl: './mat-input-datepicker.component.html',
	styleUrls: ['./mat-input-datepicker.component.scss']
})
export class MatInputDatepickerComponent implements OnInit {
	@Output() eventChange = new EventEmitter<any>();
	@Input() minDate: Date;
	@Input() maxDate: Date;
	@Input() label: string = '';
	@Input() sufijo: string = '';
	@Input() submitted: boolean = false;
	@Input() controlName: string = null;
	@Input() formGroup: FormGroup = null;
	constructor() { }

	ngOnInit() {
	}
	onChange(e){
		this.eventChange.emit(e.value);
	}
}
