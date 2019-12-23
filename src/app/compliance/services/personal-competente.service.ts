import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/core/globals/global.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept-Language': 'es-419,es;q=0.9',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, content-type',
  })
};

@Injectable({
  providedIn: 'root'
})
export class PersonalCompetenteService {
  private baseUrl2 = environment.microexamenUrl;
  private microSeguimiento = environment.seguimientoUrl;

  parameters: any;

  constructor(private http: HttpClient,
              private globalService: GlobalService) { }


  getEmpleados() {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(`${this.baseUrl2}exam/personalCompetente/empleados`, {params : this.parameters });
  }
  deleteEliminar(idEmpleado: number) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.delete(`${this.baseUrl2}exam/personalCompetente/empleados?idEmpleado=` + idEmpleado, {params : this.parameters });
  }
  getTagsAsignacion(idEmpleado: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(`${this.microSeguimiento}legal/personalCompetente/tags/ASIGNACION/${idEmpleado}`, {params : this.parameters });
  }
  getTagsAsignado(idEmpleado: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(`${this.microSeguimiento}legal/personalCompetente/tags/ASIGNADO/${idEmpleado}`, {params : this.parameters });
  }
  salvarTags(listtags: Array<string>, empleadoId: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(`${this.microSeguimiento}legal/tags/empleados?empleadoId=` + empleadoId, listtags, {params : this.parameters });
  }
  getPlantaPerfil(): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(`${this.microSeguimiento}legal/tags/perfilActor`, {params : this.parameters });
  }
  salvarPlantaPerfilEmpleado(lista: Array<any>) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(`${this.microSeguimiento}legal//tags/perfilActor`, lista, {params : this.parameters });
  }

}
