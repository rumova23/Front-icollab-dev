import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  constructor(private http: HttpClient) { }

  getEntidadEstatus(entidad: string, estatus: string): Observable<any> {
    return this.http.get(`${this.estatusmaestro}entidadEstatus/${entidad}/${estatus}`, httpOptions);
  }
  getEstatusMaestroOpcion() {
    return this.http.get(`${this.catalog}getEstatusMaestroOpcion`, httpOptions);
  }
}
