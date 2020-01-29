import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {GlobalService} from '../globals/global.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {__values} from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class EfhService {

  accion: BehaviorSubject<string> = new BehaviorSubject<string>('no aplica');
  accionComments: BehaviorSubject<string> = new BehaviorSubject<string>('no aplica');

  parameters: any;
  private microEfh = environment.efhUrl;

  constructor(private http: HttpClient,
              public globalService: GlobalService) { }

  getEventsConfigurated() {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${ this.microEfh }configuration/event/list`, { params : this.parameters });
  }

  getEventsConfiguratedAsc() {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${ this.microEfh }configuration/event/listAsc`, { params : this.parameters });
  }

  getEvent(id) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.microEfh }configuration/event/get/` + id, { params : this.parameters });
  }

  setEvent(event) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.microEfh }configuration/event/save` , event, {params : this.parameters });
  }

  deleteEvent(id) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.delete( `${ this.microEfh }configuration/event/delete/` + id, {params : this.parameters });
  }

  getObservations(idEventConfig: number): Observable<any>  {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(`${this.microEfh}configuration/event/listObservations/${idEventConfig}`, {params : this.parameters });
  }

  saveObservation(observation): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.microEfh }configuration/event/saveObservation`, observation, {params : this.parameters });
  }

  deleteObservation(id): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.delete( `${ this.microEfh }configuration/event/deleteObservation/` + id, {params : this.parameters });
  }

  upload(fileObj) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(`${ this.microEfh }configuration/event/saveFile`, fileObj, {params : this.parameters });
  }

  downloadFile(fileId: number) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get<Blob>(`${ this.microEfh }configuration/event/downloadFile/` + fileId, {params : this.parameters, responseType: 'blob' as 'json' });
  }

  getDocuments(eventConfigId: number, typeDocument: string): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get(`${this.microEfh}configuration/event/listFiles/${eventConfigId}`, {params : this.parameters });
  }

  deleteFile(id): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.delete( `${ this.microEfh }configuration/event/deleteFile/` + id, {params : this.parameters });
  }

}
