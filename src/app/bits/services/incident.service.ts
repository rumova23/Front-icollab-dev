import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from 'src/app/core/globals/global.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
	private url = environment.incidentsUrl;
	private parameters : any;
	constructor(
		 private http          : HttpClient
		,private globalService : GlobalService
	) {}
	
	getListObservations(incidentId: number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(this.url + 'incident/listObservations/' + incidentId, {params : this.parameters });
	}
}
