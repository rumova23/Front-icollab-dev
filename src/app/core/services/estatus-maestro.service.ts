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
  private estatus_maestro = environment.estatus_maestro;
  private micro_catalago_maestro = environment.micro_catalago_maestro

  constructor(private http: HttpClient) { }

  getEntidadEstatus(entidad: string, estatus: string): Observable<any> {
    return this.http.get(`${this.estatus_maestro}entidadEstatus/${entidad}/${estatus}`, httpOptions);
  }
  getEstatusMaestroOpcion() {
    return this.http.get(`${this.micro_catalago_maestro}getEstatusMaestroOpcion`, httpOptions);
  }
}
