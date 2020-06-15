import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox-with-number',
  templateUrl: './checkbox-with-number.component.html',
  styleUrls: ['./checkbox-with-number.component.scss']
})
export class CheckboxWithNumberComponent implements OnInit {
	@Output() eventChangeNumber = new EventEmitter<any>();
	@Output() eventChangeCheckBox = new EventEmitter<any>();
	@Input() label: string = '';
	@Input() sufijo: string = '';
	@Input() submitted: boolean = false;
	@Input() controlName: string = null;
	@Input() formGroup: FormGroup = null;

	
	@Input() controlNameCheckBox: string = null;
	@Input() val:string = '';

	@Input() minValue: number;
	@Input() maxValue: number;
	@Input() step = 1;
	constructor() { }

	ngOnInit() {
	}

	onChangeCheckBox(e){
		this.eventChangeCheckBox.emit(this.formGroup.get(this.controlNameCheckBox).value);
	}
	onChangeNumber(e){
		this.eventChangeNumber.emit(this.formGroup.get(this.controlName).value);
	}
}
