import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {GlobalService} from '../../core/globals/global.service';
import { EPs } from 'src/app/core/globals/endpoints';

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

  parameters: any;

  constructor(private http: HttpClient,
              private globalService: GlobalService) { }


  getAllCompliance() {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ EPs.tracing.legal.get.complianceActivity }`, {params : this.parameters });
  }

  getListMatrizCumplimiento() {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ EPs.tracing.legal.get.listMatriz }`, {params : this.parameters });
  }


  getCompliancePorPlantaYFechas(anio: number) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ EPs.tracing.legal.get.complianceActivity }/${anio}`, {params : this.parameters });
  }

  getDiagramas(anio: number) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ EPs.tracing.legal.get.diagram }/${anio}`, {params : this.parameters });
  }
}
