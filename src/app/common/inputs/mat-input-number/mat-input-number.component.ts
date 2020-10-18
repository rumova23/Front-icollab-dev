import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-mat-input-number',
	templateUrl: './mat-input-number.component.html',
	styleUrls: ['./mat-input-number.component.scss']
})
export class MatInputNumberComponent implements OnInit {
	@Output() eventChange = new EventEmitter<any>();
	@Input() minValue: number;
	@Input() maxValue: number;
	@Input() label: string = '';
	@Input() sufijo: string = '';
	@Input() submitted: boolean = false;
	@Input() controlName: string = null;
	@Input() formGroup: FormGroup = null;
	@Input() touched = true;
	@Input() dirty   = true;
	@Input() step = 1;
	constructor() { }

	ngOnInit() {
	}
	onChange(e){
		let d = this.formGroup.get(this.controlName).value;
		if(d==null)this.formGroup.get(this.controlName).setValue(null);
		this.eventChange.emit(d);
	}
}
