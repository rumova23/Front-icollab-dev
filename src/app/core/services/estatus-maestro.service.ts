import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {GlobalService} from '../globals/global.service';
import { EPs } from '../globals/endpoints';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept-Language': 'es-419,es;q=0.9',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: 'authkey',

  })
};

@Injectable({
  providedIn: 'root'
})

export class EstatusMaestroService {

  parameters: any;

  constructor(private http: HttpClient,
              private globalService: GlobalService) { }

  getEntidadEstatus(entidad: string, estatus: string): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(`${ EPs.statusMaster.status }${entidad}/${estatus}`, {params : this.parameters });
  }

  getEntidadEstatusById(entidadEstatusId: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(`${ EPs.statusMaster.status }${entidadEstatusId}`, {params : this.parameters });
  }

  getCatalogoEntidad(entidad: string) {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(`${ EPs.statusMaster.get.catalog }/${entidad}`, {params : this.parameters });
  }
}
