import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mat-input-text',
  templateUrl: './mat-input-text.component.html',
  styleUrls: ['./mat-input-text.component.scss']
})
export class MatInputTextComponent implements OnInit {
	@Output() eventChange = new EventEmitter<any>();
	@Input() label: string = '';
	@Input() sufijo: string = '';
	@Input() submitted: boolean = false;
	@Input() controlName: string = null;
	@Input() formGroup: FormGroup = null;
	@Input() maxLength:string = '';
	constructor() { }

	ngOnInit() {
	}
	onChange(e){
		let d = this.formGroup.get(this.controlName).value;
		this.eventChange.emit(d);
	}
}
