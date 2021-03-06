import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IdLabel } from 'src/app/core/models/IdLabel';

@Component({
  selector: 'app-checkbox-with-select',
  templateUrl: './checkbox-with-select.component.html',
  styleUrls: ['./checkbox-with-select.component.scss']
})
export class CheckboxWithSelectComponent implements OnInit  {
	@Output() eventChangeSelect = new EventEmitter<any>();
	@Output() eventChangeCheckBox = new EventEmitter<any>();
	@Input() label: string = '';
	@Input() sufijo: string = '';
	@Input() submitted: boolean = false;
	@Input() controlName: string = null;
	@Input() formGroup: FormGroup = null;
	@Input() compareWith = null;
	@Input() options: IdLabel[] = [];

	
	@Input() controlNameCheckBox: string = null;
	@Input() controlNameCheckBoxRequired: string = null;
	@Input() val:string = '';
	constructor() { }

	ngOnInit() {
	}

	onChangeCheckBox(e){
		this.eventChangeCheckBox.emit(this.formGroup.get(this.controlNameCheckBox).value);
	}
	onChangeSelect(e){
		this.eventChangeSelect.emit(this.formGroup.get(this.controlName).value);
	}
}
