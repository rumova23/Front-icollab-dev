import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IdLabel } from 'src/app/core/models/IdLabel';

@Component({
	selector: 'app-mat-radio-button',
	templateUrl: './mat-radio-button.component.html',
	styleUrls: ['./mat-radio-button.component.scss']
})
export class MatRadioButtonComponent implements OnInit {
	@Output() eventChange = new EventEmitter<any>();
	@Input() label: string = '';
	@Input() sufijo: string = '';
	@Input() submitted: boolean = false;
	@Input() controlName: string = null;
	@Input() formGroup: FormGroup = null;
	@Input() options: IdLabel[] = [];

	constructor() { }

	ngOnInit() {
	}

}
