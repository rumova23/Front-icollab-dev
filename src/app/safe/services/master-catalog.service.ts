import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../../core/globals/global.service';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {MaestroDTO} from '../../compliance/models/maestro-dto';
import {OpcionDTO} from '../../compliance/models/opcion-dto';
import {ContainerClasificaDTO} from '../models/container-clasifica-dto';

@Injectable({
  providedIn: 'root'
})
export class MasterCatalogService {

  private mastercatalog = environment.mastercatalog;

  parameters: any;
  constructor(private http: HttpClient,
              private globalService: GlobalService) {
  }

  catalogosAll(): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get( `${ this.mastercatalog }mastercatalog/mastercatalog/masters/2`,
        {params : this.parameters });
  }

  getCatalogo(catalogo: string): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get( `${ this.mastercatalog }mastercatalog/mastercatalog/opciones/${catalogo}`,
        {params : this.parameters });
  }

  updateMaestro(maestro: MaestroDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post( `${ this.mastercatalog }mastercatalog/mastercatalog/updatemaster`, maestro, {params : this.parameters });
  }

  updateOpcion(opcion: OpcionDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post( `${ this.mastercatalog }mastercatalog/mastercatalog/updateoption`, opcion, {params : this.parameters });
  }

  saveMaster(maestro: MaestroDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post( `${ this.mastercatalog }mastercatalog/mastercatalog/saveMaster`, maestro, {params : this.parameters });
  }

  saveCompleteOpcion(opcion: OpcionDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post( `${ this.mastercatalog }mastercatalog/mastercatalog/saveOpcion`, opcion, {params : this.parameters });
  }

  listCatalog(list: Array<string>) {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post( `${ this.mastercatalog }mastercatalog/list/catalog`, list, {params : this.parameters });
  }
}
