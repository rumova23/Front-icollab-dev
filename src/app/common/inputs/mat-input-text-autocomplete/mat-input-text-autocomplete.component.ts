import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-mat-input-text-autocomplete',
	templateUrl: './mat-input-text-autocomplete.component.html',
	styleUrls: ['./mat-input-text-autocomplete.component.scss']
})
export class MatInputTextAutocompleteComponent implements OnInit {
	@Input () optionsOrigin: string[] = ['One', 'Two', 'Three'];
	options     : Observable<string[]>;
	constructor() { }

	ngOnInit() {
	}

}
