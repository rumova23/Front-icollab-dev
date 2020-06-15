import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox-with-input-text',
  templateUrl: './checkbox-with-input-text.component.html',
  styleUrls: ['./checkbox-with-input-text.component.scss']
})
export class CheckboxWithInputTextComponent implements OnInit {
	@Output() eventChangeText = new EventEmitter<any>();
	@Output() eventChangeCheckBox = new EventEmitter<any>();
	@Input() label: string = '';
	@Input() sufijo: string = '';
	@Input() submitted: boolean = false;
	@Input() controlName: string = null;
	@Input() formGroup: FormGroup = null;

	
	@Input() controlNameCheckBox: string = null;
	@Input() val:string = '';

	constructor() { }

	ngOnInit() {
	}

	onChangeCheckBox(e){
		this.eventChangeCheckBox.emit(this.formGroup.get(this.controlNameCheckBox).value);
	}
	onChangeText(e){
		this.eventChangeText.emit(this.formGroup.get(this.controlName).value);
	}
}
