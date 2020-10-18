import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {GlobalService} from '../globals/global.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {__values} from 'tslib';
import { EPs } from '../globals/endpoints';

@Injectable({
  providedIn: 'root'
})
export class EfhService {

  accion: BehaviorSubject<string> = new BehaviorSubject<string>('no aplica');
  accionComments: BehaviorSubject<string> = new BehaviorSubject<string>('no aplica');

  parameters: any;

  constructor(private http: HttpClient,
              public globalService: GlobalService) { }

  getEventsConfigurated() {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${ EPs.ef.configuration.event.list }`, { params : this.parameters });
  }

  getEventsConfiguratedByDate(event) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.post( `${ EPs.ef.configuration.event.listByDate }`, event, { params : this.parameters });
  }

  getEventsConfiguratedAsc() {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${ EPs.ef.configuration.event.listAsc }`, { params : this.parameters });
  }

  getEvent(id) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${ EPs.ef.configuration.event.get }` + id, { params : this.parameters });
  }

  setEvent(event) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.post( `${ EPs.ef.configuration.event.save }` , event, {params : this.parameters });
  }

  deleteEvent(id) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.delete( `${ EPs.ef.configuration.event.delete }` + id, {params : this.parameters });
  }

  getObservations(idTypeConfig: number, id: number): Observable<any>  {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    if (idTypeConfig === 1) {
      return this.http.get(`${EPs.ef.configuration.event.listObservation}${id}`, {params : this.parameters });
    } else {
      return this.http.get(`${EPs.ef.configuration.indicator.listObservation}${id}`, {params : this.parameters });
    }
  }

  saveObservation(idTypeConfig: number, observation): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    if (idTypeConfig === 1) {
      return this.http.post( `${EPs.ef.configuration.event.saveObservation}`, observation, {params : this.parameters });
    } else {
      return this.http.post( `${EPs.ef.configuration.indicator.saveObservation}`, observation, {params : this.parameters });
    }
  }

  deleteObservation(idTypeConfig: number, id): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    if (idTypeConfig === 1) {
      return this.http.delete( `${ EPs.ef.configuration.event.deleteObservation }` + id, {params : this.parameters });
    } else {
      return this.http.delete( `${EPs.ef.configuration.indicator.deleteObservation}` + id, {params : this.parameters });
    }
  }

  upload(idTypeConfig: number, fileObj) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    if (idTypeConfig === 1) {
      return this.http.post(`${EPs.ef.configuration.event.saveFile}`, fileObj, {params: this.parameters});
    } else {
      return this.http.post(`${EPs.ef.configuration.indicator.saveFile}`, fileObj, {params : this.parameters });
    }
  }

  downloadFile(idTypeConfig: number, fileId: number) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    if (idTypeConfig === 1) {
      return this.http.get<Blob>(`${EPs.ef.configuration.event.downloadFile}` + fileId, {params : this.parameters, responseType: 'blob' as 'json' });
    } else {
      return this.http.get<Blob>(`${EPs.ef.configuration.indicator.downloadFile}` + fileId, {params : this.parameters, responseType: 'blob' as 'json' });
    }
  }

  getDocuments(idTypeConfig: number, id: number, typeDocument: string): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    if (idTypeConfig === 1) {
      return this.http.get(`${EPs.ef.configuration.event.listFiles}${id}`, {params : this.parameters });
    } else {
      return this.http.get(`${EPs.ef.configuration.indicator.listFiles}${id}`, {params : this.parameters });
    }
  }

  deleteFile(idTypeConfig: number, id): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    if (idTypeConfig === 1) {
      return this.http.delete( `${EPs.ef.configuration.event.deleteFile}` + id, {params : this.parameters });
    } else {
      return this.http.delete( `${EPs.ef.configuration.indicator.deleteFile}` + id, {params : this.parameters });
    }
  }

  getIndicatorsConfigurated() {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${EPs.ef.configuration.indicator.list}`, { params : this.parameters });
  }

  getIndicatorsConfiguratedByDate(event) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.post( `${EPs.ef.configuration.indicator.listByDate}`, event, { params : this.parameters });
  }

  getIndicator(id) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${EPs.ef.configuration.indicator.get}` + id, { params : this.parameters });
  }

  setIndicator(event) {
        this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
        return this.http.post( `${EPs.ef.configuration.indicator.save}` , event, {params : this.parameters });
  }

  deleteIndicator(id) {
        this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
        return this.http.delete( `${EPs.ef.configuration.indicator.delete}` + id, {params : this.parameters });
  }

  getOperationDataByPeriod(period: string, idUnit: number) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get(`${ EPs.ef.operating.data.get }/${period}/${idUnit}`, {params : this.parameters });
  }

}
