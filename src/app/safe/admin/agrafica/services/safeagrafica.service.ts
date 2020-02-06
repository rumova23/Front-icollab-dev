import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { data_graficaDosa } from './data.json';

@Injectable({
	providedIn: 'root'
})
export class SafeagraficaService {

	constructor() { }

	getData() {
		return of(data_graficaDosa);
	}
}
