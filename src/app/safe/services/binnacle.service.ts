import { Injectable } from '@angular/core';
import {MaestroDTO} from '../../compliance/models/maestro-dto';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../../core/globals/global.service';
import {BinnacleDTO} from '../models/binnacle-dto';
import {BinnacleEventConfigurationDTO} from '../models/binnacle-event-configuration-dto';
import {BinnacleEventDTO} from '../models/binnacle-event-dto';

@Injectable({
  providedIn: 'root'
})
export class BinnacleService {
  private binnacle = environment.binnacle;
  parameters: any;
  constructor(private http: HttpClient,
              private globalService: GlobalService) {
  }

  saveBinnacle(binnacle: BinnacleEventDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.binnacle }binnacle/save/binnacle`, binnacle, {params : this.parameters });
  }

  updateBinnacleConfiguration(binnacle: BinnacleEventConfigurationDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.binnacle }binnacle/update/binnacle/configuration`, binnacle, {params : this.parameters });
  }

  saveBinnacleConfiguration(binnacle: BinnacleEventConfigurationDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.binnacle }binnacle/save/binnacle/configuration`, binnacle, {params : this.parameters });
  }

  downloadExcel(year: number, month: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(this.binnacle + 'binnacle/download/' + year + '/' + month, {params : this.parameters });
  }

  listTemplates(): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(this.binnacle + 'binnacle/configuration/list', {params : this.parameters });
  }

  obtenTemplate(eventsId: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(`${ this.binnacle }binnacle/template/${eventsId}`, {params : this.parameters });
  }

  uploadZip(year: number, month: number, data): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(environment.binnacle + 'binnacle/upload/zip/' + year + '/' + month, data, {params : this.parameters });
  }

  downloadZipCenace(year: number, month: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(this.binnacle + 'binnacle/download/zip/cenance/' + year + '/' + month, {params : this.parameters });
  }
}
