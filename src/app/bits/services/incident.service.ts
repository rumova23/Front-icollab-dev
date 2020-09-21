import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from 'src/app/core/globals/global.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IncidentInDTO } from '../models/IncidentInDTO';
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
	list(): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(
			`${this.url}incidents/list/`
			,{params : this.parameters }
		);
	}
	
	getListObservations(incidentId: number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(
			`${this.url}incidents/listObservations/${incidentId}`
			,{params : this.parameters }
		);
	}
	
	saveIncident(incidentInDTO: IncidentInDTO) {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.post( 
			`${ this.url }incidents/save`
			,incidentInDTO
			,{params : this.parameters }
		);
	}
	saveObservation(eventObservationInDTO: EventObservationInDTO) {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.post( 
			`${ this.url }incidents/saveObservation`
			,eventObservationInDTO
			,{params : this.parameters }
		);
	}
}
