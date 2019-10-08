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

  private baseMicroComplianceUrl = environment.seguimiento;

  constructor(private http: HttpClient) { }

  getAllCompliance() {
    return this.http.get( `${ this.baseMicroComplianceUrl }legal/obten/complianceActividad`, httpOptions);
  }

    getCompliancePorPlantaYFechas(fechaInicio: Date, fechaFin: Date) {
      return this.http.get( `${ this.baseMicroComplianceUrl }legal/obten/complianceActividad/${fechaInicio}/${fechaFin}`, httpOptions);
  }

  getDiagramas(fechaInicio: Date, fechaFin: Date) {
    return this.http.get( `${ this.baseMicroComplianceUrl }legal/obten/obtenDiagramas/${fechaInicio}/${fechaFin}`, httpOptions);
  }
}
