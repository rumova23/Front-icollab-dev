import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from 'src/app/core/globals/global.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { IncidentInDTO } from '../models/IncidentInDTO';
import { EventObservationInDTO } from '../models/EventObservationInDTO';
import { IncidentOutDTO } from '../models/IncidentOutDTO';
import { EventObservationOutDTO } from '../models/EventObservationOutDTO';
import { IncidentObservationOutDTO } from '../models/IncidentObservationOutDTO';
import { IncidentObservationInDTO } from '../models/IncidentObservationInDTO';

@Injectable({
	providedIn: 'root'
})
export class IncidentService {
	
	accion: BehaviorSubject<string> = new BehaviorSubject<string>('no aplica');
	accionComments: BehaviorSubject<string> = new BehaviorSubject<string>('no aplica');
  
	private url = environment.incidentsUrl;
	private parameters: any;
	constructor(
		private http: HttpClient
		, private globalService: GlobalService
	) { }
	list(): Observable<IncidentOutDTO[]> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get<IncidentOutDTO[]>(
			`${this.url}incidents/list/`
			, { params: this.parameters }
		);
	}
	delete(id: number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.delete(
			`${this.url}incidents/delete/${id}`
			, { params: this.parameters });
	}
	saveIncident(incidentInDTO: IncidentInDTO): Observable<IncidentOutDTO> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.post<IncidentOutDTO>(
			`${this.url}incidents/save`
			, incidentInDTO
			, { params: this.parameters }
		);
	}
	saveObservation(data: IncidentObservationInDTO) {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.post(
			`${this.url}incidents/saveObservation`
			, data
			, { params: this.parameters }
		);
	}

	getListObservations(incidentId: number): Observable<IncidentObservationOutDTO[]> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get<IncidentObservationOutDTO[]>(
			`${this.url}incidents/listObservations/${incidentId}`
			, { params: this.parameters }
		);
	}
	deleteObservation(id: number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.delete(
			`${this.url}incidents/deleteObservation/${id}`
			, { params: this.parameters });
	}

	upload(idTypeConfig: number, fileObj) {
		this.parameters = this.globalService.setXTenantId_Plant();
		if (idTypeConfig === 3) {
			return this.http.post(`${this.url}incidents/saveFile`, fileObj, { params: this.parameters });
		} else {
			//return this.http.post(`${this.url}configuration/indicator/saveFile`, fileObj, { params: this.parameters });
		}
	}

	downloadFile(idTypeConfig: number, fileId: number) {
		this.parameters = this.globalService.setXTenantId_Plant();
		if (idTypeConfig === 3) {
			return this.http.get<Blob>(`${this.url}incidents/downloadFile/${fileId}`, { params: this.parameters, responseType: 'blob' as 'json' });
		} else {
			//return this.http.get<Blob>(`${this.url}configuration/indicator/downloadFile/` + fileId, { params: this.parameters, responseType: 'blob' as 'json' });
		}
	}
	getDocuments(idTypeConfig: number, id: number, typeDocument: string): Observable<any> {
	  this.parameters = this.globalService.setXTenantId_Plant();
	  if (idTypeConfig === 3) {
		return this.http.get(`${this.url}incidents/listFiles/${id}`, {params : this.parameters });
	  } else {
		//return this.http.get(`${this.url}configuration/indicator/listFiles/${id}`, {params : this.parameters });
	  }
	}
  
	deleteFile(idTypeConfig: number, id): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		if (idTypeConfig === 3) {
		  return this.http.delete( `${ this.url }incidents/deleteFile/${id}`, {params : this.parameters });
		} else {
		  //return this.http.delete( `${ this.url }configuration/indicator/deleteFile/` + id, {params : this.parameters });
		}
	  }
	
}
