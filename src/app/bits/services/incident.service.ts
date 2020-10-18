import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from 'src/app/core/globals/global.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IncidentInDTO } from '../models/IncidentInDTO';
import { IncidentOutDTO } from '../models/IncidentOutDTO';
import { IncidentObservationOutDTO } from '../models/IncidentObservationOutDTO';
import { IncidentObservationInDTO } from '../models/IncidentObservationInDTO';
import { EPs } from 'src/app/core/globals/endpoints';

@Injectable({
	providedIn: 'root'
})
export class IncidentService {
	
	accion: BehaviorSubject<string> = new BehaviorSubject<string>('no aplica');
	accionComments: BehaviorSubject<string> = new BehaviorSubject<string>('no aplica');
  
	private parameters: any;
	constructor(
		private http: HttpClient
		, private globalService: GlobalService
	) { }
	list(): Observable<IncidentOutDTO[]> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get<IncidentOutDTO[]>(
			`${ EPs.incident.list }`
			, { params: this.parameters }
		);
	}
	delete(id: number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.delete(
			`${ EPs.incident.delete }/${id}`
			, { params: this.parameters });
	}
	saveIncident(incidentInDTO: IncidentInDTO): Observable<IncidentOutDTO> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.post<IncidentOutDTO>(
			`${ EPs.incident.save }`
			, incidentInDTO
			, { params: this.parameters }
		);
	}
	saveObservation(data: IncidentObservationInDTO) {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.post(
			`${ EPs.incident.saveObservation }`
			, data
			, { params: this.parameters }
		);
	}

	getListObservations(incidentId: number): Observable<IncidentObservationOutDTO[]> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get<IncidentObservationOutDTO[]>(
			`${ EPs.incident.listObservation }/${incidentId}`
			, { params: this.parameters }
		);
	}
	deleteObservation(id: number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.delete(
			`${ EPs.incident.deleteObservation }/${id}`
			, { params: this.parameters });
	}

	upload(idTypeConfig: number, fileObj) {
		this.parameters = this.globalService.setXTenantId_Plant();
		if (idTypeConfig === 3) {
			return this.http.post(`${ EPs.incident.saveFile }`, fileObj, { params: this.parameters });
		}
	}

	downloadFile(idTypeConfig: number, fileId: number) {
		this.parameters = this.globalService.setXTenantId_Plant();
		if (idTypeConfig === 3) {
			return this.http.get<Blob>(`${ EPs.incident.downloadFile }/${fileId}`, { params: this.parameters, responseType: 'blob' as 'json' });
		}
	}
	getDocuments(idTypeConfig: number, id: number, typeDocument: string): Observable<any> {
	  this.parameters = this.globalService.setXTenantId_Plant();
	  if (idTypeConfig === 3) {
		return this.http.get(`${ EPs.incident.listFile }/${id}`, {params : this.parameters });
	  }
	}
  
	deleteFile(idTypeConfig: number, id): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		if (idTypeConfig === 3) {
		  return this.http.delete( `${ EPs.incident.deleteFile }/${id}`, {params : this.parameters });
		}
	  }
	
}
