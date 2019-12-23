import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {GlobalService} from '../globals/global.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EfhService {

  accion: BehaviorSubject<string> = new BehaviorSubject<string>('no aplica');
  parameters: any;
  private microEfh = environment.efhUrl;

  constructor(private http: HttpClient,
              public globalService: GlobalService) { }

  getEventsConfigurated() {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.microEfh }event/list`, { params : this.parameters });
  }

  getEvent(id) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.microEfh }event/get/` + id, { params : this.parameters });
  }

  setEvent(event) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.microEfh }event/save` , event, {params : this.parameters });
  }

  deleteEvent(id) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.delete( `${ this.microEfh }event/delete/` + id, {params : this.parameters });
  }

  getObservations(idEventConfig: number): Observable<any>  {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(`${this.microEfh}event/listObservations/${idEventConfig}`, {params : this.parameters });
  }

  saveObservation(observation): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.microEfh }event/saveObservation`, observation, {params : this.parameters });
  }

  upload(fileObj: File, eventConfigId: number, typeDocument: number) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    const file: FormData = new FormData();
    file.append('file', fileObj);
    return this.http.post(`${ this.microEfh }event/saveFile?idEventConfig=` +
        eventConfigId + `&typeDocument=` + typeDocument, file);
  }

  downloadFile(fileId: number) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(`${ this.microEfh }event/downloadFile/` + fileId, {params : this.parameters });
  }

  getDocuments(eventConfigId: number, typeDocument: string): Observable<any> {
    this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(`${this.microEfh}event/listFile/${eventConfigId}`, {params : this.parameters });
  }

}
