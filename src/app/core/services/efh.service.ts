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

  getEventsConfiguratedByDate(event) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.post( `${ this.microEfh }configuration/event/listByDate`, event, { params : this.parameters });
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

  getObservations(idTypeConfig: number, id: number): Observable<any>  {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    if (idTypeConfig === 1) {
      return this.http.get(`${this.microEfh}configuration/event/listObservations/${id}`, {params : this.parameters });
    } else {
      return this.http.get(`${this.microEfh}configuration/indicator/listObservations/${id}`, {params : this.parameters });
    }
  }

  saveObservation(idTypeConfig: number, observation): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    if (idTypeConfig === 1) {
      return this.http.post( `${ this.microEfh }configuration/event/saveObservation`, observation, {params : this.parameters });
    } else {
      return this.http.post( `${ this.microEfh }configuration/indicator/saveObservation`, observation, {params : this.parameters });
    }
  }

  deleteObservation(idTypeConfig: number, id): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    if (idTypeConfig === 1) {
      return this.http.delete( `${ this.microEfh }configuration/event/deleteObservation/` + id, {params : this.parameters });
    } else {
      return this.http.delete( `${ this.microEfh }configuration/indicator/deleteObservation/` + id, {params : this.parameters });
    }
  }

  upload(idTypeConfig: number, fileObj) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    if (idTypeConfig === 1) {
      return this.http.post(`${this.microEfh}configuration/event/saveFile`, fileObj, {params: this.parameters});
    } else {
      return this.http.post(`${ this.microEfh }configuration/indicator/saveFile`, fileObj, {params : this.parameters });
    }
  }

  downloadFile(idTypeConfig: number, fileId: number) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    if (idTypeConfig === 1) {
      return this.http.get<Blob>(`${ this.microEfh }configuration/event/downloadFile/` + fileId, {params : this.parameters, responseType: 'blob' as 'json' });
    } else {
      return this.http.get<Blob>(`${ this.microEfh }configuration/indicator/downloadFile/` + fileId, {params : this.parameters, responseType: 'blob' as 'json' });
    }
  }

  getDocuments(idTypeConfig: number, id: number, typeDocument: string): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    if (idTypeConfig === 1) {
      return this.http.get(`${this.microEfh}configuration/event/listFiles/${id}`, {params : this.parameters });
    } else {
      return this.http.get(`${this.microEfh}configuration/indicator/listFiles/${id}`, {params : this.parameters });
    }
  }

  deleteFile(idTypeConfig: number, id): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    if (idTypeConfig === 1) {
      return this.http.delete( `${ this.microEfh }configuration/event/deleteFile/` + id, {params : this.parameters });
    } else {
      return this.http.delete( `${ this.microEfh }configuration/indicator/deleteFile/` + id, {params : this.parameters });
    }
  }

  getIndicatorsConfigurated() {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${ this.microEfh }configuration/indicator/list`, { params : this.parameters });
  }

  getIndicatorsConfiguratedByDate(event) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.post( `${ this.microEfh }configuration/indicator/listByDate`, event, { params : this.parameters });
  }

  getIndicator(id) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.microEfh }configuration/indicator/get/` + id, { params : this.parameters });
  }

  setIndicator(event) {
        this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
        return this.http.post( `${ this.microEfh }configuration/indicator/save` , event, {params : this.parameters });
  }

  deleteIndicator(id) {
        this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
        return this.http.delete( `${ this.microEfh }configuration/indicator/delete/` + id, {params : this.parameters });
  }

}
