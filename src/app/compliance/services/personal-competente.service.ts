import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

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

  private baseUrl2 = environment.pgUrl;
  private baseUrl = environment.mtUrl;
  constructor(private http: HttpClient) { }

  getEmpleados() {
    return this.http.get(`${this.baseUrl2}personalCompetente/empleados`, httpOptions);
  }

  deleteEliminar(idEmpleado: number) {
    return this.http.delete(`${this.baseUrl2}personalCompetente/empleados?idEmpleado=` + idEmpleado, httpOptions);
  }

  getTagsAsignacion(idEmpleado: number): Observable<any> {
    return this.http.get(`${this.baseUrl2}personalCompetente/tags/asignacion/${idEmpleado}`, httpOptions);
  }

  getTagsAsignado(idEmpleado: number): Observable<any> {
    return this.http.get(`${this.baseUrl2}personalCompetente/tags/asignado/${idEmpleado}`, httpOptions);
  }

  salvarTags(listtags: Array<string>, empleadoId: number) {
    return this.http.post(`${this.baseUrl}tags/empleados?empleadoId=` + empleadoId, listtags, httpOptions);
  }

  getPlantaPerfil(): Observable<any> {
    return this.http.get(`${this.baseUrl}tags/planta/perfilActor`, httpOptions);
  }

  salvarPlantaPerfilEmpleado(lista: Array<any>) {
    return this.http.post(`${this.baseUrl}tags/planta/perfilActor`, lista, httpOptions);
  }

}
