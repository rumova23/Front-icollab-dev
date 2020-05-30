import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-mat-input-time',
	templateUrl: './mat-input-time.component.html',
	styleUrls: ['./mat-input-time.component.scss']
})
export class MatInputTimeComponent implements OnInit {
	@Output() eventChange = new EventEmitter<any>();
	@Input() label: string = '';
	@Input() sufijo: string = '';
	@Input() submitted: boolean = false;
	@Input() controlName: string = null;
	@Input() formGroup: FormGroup = null;

	constructor() { }

	ngOnInit() {
	}
	onChange() {
		let d = this.formGroup.get(this.controlName).value;
		this.eventChange.emit(d);
	}
}
