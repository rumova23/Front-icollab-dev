import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import {GlobalService} from '../../core/globals/global.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept-Language': 'es-419,es;q=0.9',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: 'authkey',

  })
};

@Injectable({
    providedIn: 'root'
})
export class ComplianceService {

  private urlSeguimiento = environment.seguimientoUrl;
  parameters: any;

  constructor(private http: HttpClient,
              private globalService: GlobalService) { }


  getAllCompliance() {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.urlSeguimiento }legal/obten/complianceActividad`, {params : this.parameters });
  }

  getListMatrizCumplimiento() {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.urlSeguimiento }legal/obten/list/matriz`, {params : this.parameters });
  }


  getCompliancePorPlantaYFechas(anio: number) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.urlSeguimiento }legal/obten/complianceActividad/${anio}`, {params : this.parameters });
  }

  getDiagramas(anio: number) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.urlSeguimiento }legal/obten/obtenDiagramas/${anio}`, {params : this.parameters });
  }
}
