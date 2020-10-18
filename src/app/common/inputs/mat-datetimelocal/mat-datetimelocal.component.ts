import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mat-datetimelocal',
  templateUrl: './mat-datetimelocal.component.html',
  styleUrls: ['./mat-datetimelocal.component.scss']
})
export class MatDatetimelocalComponent implements OnInit {
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
