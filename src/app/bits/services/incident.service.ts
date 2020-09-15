import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from 'src/app/core/globals/global.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IncidentInDTO } from '../models/incident-in-dto';
import { EventObservationInDTO } from '../models/event-observation-in-dto';

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
		return this.http.get(
			`${this.url}incident/listObservations/${incidentId}`
			,{params : this.parameters }
		);
	}
	
	saveIncident(incidentInDTO: IncidentInDTO) {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.post( 
			`${ this.url }incident/save`
			,incidentInDTO
			,{params : this.parameters }
		);
	}
	saveObservation(eventObservationInDTO: EventObservationInDTO) {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.post( 
			`${ this.url }incident/saveObservation`
			,eventObservationInDTO
			,{params : this.parameters }
		);
	}
}
