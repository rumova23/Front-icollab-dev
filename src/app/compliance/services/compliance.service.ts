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

  getCompliancePorPlantaYFechas(plantaId: string, fechaInicio: Date, fechaFin: Date) {
    return this.http.get( `${ this.baseMicroComplianceUrl }legal/obten/complianceActividad/${plantaId}/${fechaInicio}/${fechaFin}`, httpOptions);
  }

  getDiagramas(plantaId: string, fechaInicio: Date, fechaFin: Date) {
    return this.http.get( `${ this.baseMicroComplianceUrl }legal/obten/obtenDiagramas/${plantaId}/${fechaInicio}/${fechaFin}`, httpOptions);
  }


}
