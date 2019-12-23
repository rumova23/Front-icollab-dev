import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {GlobalService} from '../globals/global.service';

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
  private estatusmaestro = environment.estatusmaestro;
  private catalog = environment.catalogUrl

  parameters: any;

  constructor(private http: HttpClient,
              private globalService: GlobalService) { }

  getEntidadEstatus(entidad: string, estatus: string): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get(`${this.estatusmaestro}entidadEstatus/${entidad}/${estatus}`, {params : this.parameters });
  }
  getEstatusMaestroOpcion() {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(`${this.catalog}getEstatusMaestroOpcion`, {params : this.parameters });
  }
}
