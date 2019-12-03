import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

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

  constructor(private http: HttpClient) { }

  getAllCompliance() {
    return this.http.get( `${ this.urlSeguimiento }legal/obten/complianceActividad`, httpOptions);
  }

  getListMatrizCumplimiento() {
    return this.http.get( `${ this.urlSeguimiento }legal/obten/list/matriz`, httpOptions);
  }


  getCompliancePorPlantaYFechas(anio: number) {
      return this.http.get( `${ this.urlSeguimiento }legal/obten/complianceActividad/${anio}`, httpOptions);
  }

  getDiagramas(anio: number) {
    return this.http.get( `${ this.urlSeguimiento }legal/obten/obtenDiagramas/${anio}`, httpOptions);
  }
}
