import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-mat-input-number',
	templateUrl: './mat-input-number.component.html',
	styleUrls: ['./mat-input-number.component.scss']
})
export class MatInputNumberComponent implements OnInit {
	@Output() eventChange = new EventEmitter<any>();
	@Input() minDate: Date;
	@Input() maxDate: Date;
	@Input() label: string = '';
	@Input() sufijo: string = '';
	@Input() submitted: boolean = false;
	@Input() controlName: string = null;
	@Input() formGroup: FormGroup = null;
	@Input() step = 1;
	constructor() { }

	ngOnInit() {
	}
	onChange(e){
		let d = this.formGroup.get(this.controlName).value;
		this.eventChange.emit(d);
	}
}