import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from 'src/app/core/globals/global.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
		return this.http.get(environment.weatherUrl + 'henryhub', { params: this.parameters });
	}
}
