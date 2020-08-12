import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
	selector: 'app-mat-input-text-autocomplete',
	templateUrl: './mat-input-text-autocomplete.component.html',
	styleUrls: ['./mat-input-text-autocomplete.component.scss']
})
export class MatInputTextAutocompleteComponent implements OnInit, OnChanges {
	@Input() label           : string = '';
	@Input() sufijo          : string = '';
	@Input() submitted       : boolean = false;
	@Input() controlName     : string;
	@Input() formGroup       : FormGroup;
	@Input() options         : string[] = [];
	@Input() filter          : 'startsWith' | 'includes' = 'startsWith';
	@Input() isCaseSensitive : boolean = false;
	filteredOptions          : Observable<string[]>;
	
	constructor() { }

	ngOnInit() {
	}
	ngOnChanges(changes: SimpleChanges): void {
		if(Array.isArray(this.options) && this.options.length > 0){
			this.options = this.options
			.filter(
				(el,index,arr)=>
				arr.indexOf(el) === index
			);
	
			this.filteredOptions = this.formGroup.get(this.controlName).valueChanges
			  .pipe(
				startWith(''),
				map(value => this._filter(value))
			);
		}else{
		}
	}
	private _filter(value: string): string[] {
		let filterValue = value
		.replace('á', 'a')
		.replace('é', 'e')
		.replace('í', 'i')
		.replace('ó', 'o')
		.replace('ú', 'u')
		.trim();
		if (!this.isCaseSensitive) {
			filterValue = filterValue.toLowerCase()
		}
		
		return this.options		
			.filter(option => {
				if (!this.isCaseSensitive) {
					option = option.toLowerCase()
				}
				return option
				.replace('á', 'a')
				.replace('é', 'e')
				.replace('í', 'i')
				.replace('ó', 'o')
				.replace('ú', 'u')
				[this.filter](filterValue)
			});
	}
}
