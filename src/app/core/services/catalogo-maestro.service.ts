import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MaestroOpcion } from '../models/maestro-opcion';


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
export class CatalogoMaestroService {
  private micro_catalago_maestro = environment.micro_catalago_maestro;

  constructor(private http: HttpClient) { }

  getCatalogo(nameCat): Observable<any> {
    return this.http.get(`${this.micro_catalago_maestro}admin/catalogo/${nameCat}`, httpOptions);
  }

  getOpcion(idOpcion: string): Observable<any> {
    // @ts-ignore
    // @ts-ignore
    return this.http.get(`${this.micro_catalago_maestro}catalogoOpcion/id/${idOpcion}`, httpOptions);
  }
  // tslint:disable-next-line:max-line-length
  salvarOpcion(opcionNombre: string, opcionDescripcion: string, estatus: string, orden: string, maestroNombre: string): Observable<MaestroOpcion> {
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    return this.http.post(`${this.micro_catalago_maestro}catalogoOpcion/catalogo/` + maestroNombre + `/` + opcionNombre + `/` + opcionDescripcion + `/` + estatus + `/` + orden, httpOptions);
  }

  updateOpcion(opcionNombre: string, opcionDescripcion: string, estatus: string, orden: string, maestroOpcionId: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.post(`${this.micro_catalago_maestro}catalogoOpcion/catalogo/update/` + `/` + opcionNombre + `/` + opcionDescripcion + `/` + estatus + `/` + orden + `/` + maestroOpcionId, httpOptions);
  }

  updateEstatus(maestroOpcionId: string) {
    return this.http.post(`${this.micro_catalago_maestro}catalogoOpcion/catalogo/update/estatus/` + maestroOpcionId, httpOptions);
  }

  borrarEstatus(maestroOpcionId: string) {
    return this.http.post(`${this.micro_catalago_maestro}catalogoOpcion/catalogo/delete/` + maestroOpcionId, httpOptions);
  }
}
