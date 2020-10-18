import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from 'src/app/core/globals/global.service';
import { Observable } from 'rxjs';
import { EPs } from 'src/app/core/globals/endpoints';

@Injectable({
	providedIn: 'root'
})
export class HenryhubService {
	parameters: any;
	constructor(private http: HttpClient,
		private globalService: GlobalService
	) { }
	algo(): Observable<any> {
		this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
		return this.http.get( EPs.weather.henryhub.id, { params: this.parameters });
	}
	getFromTo(init,fin):Observable<any>{

		this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
		return this.http.get( `${EPs.weather.henryhub.getDataFromTo}/${init}/${fin}`, { params: this.parameters });
	}
}
