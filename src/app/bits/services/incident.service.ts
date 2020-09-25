import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from 'src/app/core/globals/global.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IncidentInDTO } from '../models/IncidentInDTO';
import { EventObservationInDTO } from '../models/event-observation-in-dto';
import { IncidentOutDTO } from '../models/IncidentOutDTO';

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
	list(): Observable<IncidentOutDTO[]> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get<IncidentOutDTO[]>(
			`${this.url}incidents/list/`
			,{params : this.parameters }
		);
	}
	delete(id:number):Observable<any>{
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.delete(
			`${this.url}incidents/delete/${id}`  
			, {params : this.parameters });
	}
	getListObservations(incidentId: number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(
			`${this.url}incidents/listObservations/${incidentId}`
			,{params : this.parameters }
		);
	}
	
	saveIncident(incidentInDTO: IncidentInDTO): Observable<IncidentOutDTO>  {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.post<IncidentOutDTO>( 
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
