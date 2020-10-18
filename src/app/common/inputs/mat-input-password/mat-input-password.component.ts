import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mat-input-password',
  templateUrl: './mat-input-password.component.html',
  styleUrls: ['./mat-input-password.component.scss']
})
export class MatInputPasswordComponent implements OnInit {
	@Output() eventChange = new EventEmitter<any>();
	@Input() label: string = '';
	@Input() sufijo: string = '';
	@Input() submitted: boolean = false;
	@Input() controlName: string = null;
	@Input() formGroup: FormGroup = null;
	constructor() { }

	ngOnInit() {
	}
	onChange(e){
		let d = this.formGroup.get(this.controlName).value;
		this.eventChange.emit(d);
	}
}