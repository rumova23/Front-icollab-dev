import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Empleado } from 'src/app/compliance/models/Empleado';
import { Respuesta } from 'src/app/compliance/models/Respuesta';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept-Language': 'es-419,es;q=0.9',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, content-type',
  })
};

const httpOptions2 = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7Fasunn4b0E6QxQs',
    'Accept-Language': 'es-ES,es;q=0.9,mk;q=0.8,en;q=0.7',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
};

@Injectable({
  providedIn: 'root'
})
export class PerfilComboService {

  private baseUrl = environment.mnUrl;
  private baseUrl2 = environment.pgUrl;
  private baseUrl3 = environment.cnUrl;
  private baseUrl4 = environment.fdUrl;
  private estatus_maestro = environment.estatus_maestro;

  constructor(private http: HttpClient) { }

  getCatalogo(nameCat: Array<any>) {
    return this.http.get( `${ this.baseUrl }listCatalogos/${nameCat}`, httpOptions);
  }

  getValoresAptitudes(list: Array<any>) {
    return this.http.get( `${ this.baseUrl }valoresAptitudes/${list}`, httpOptions);
  }

  getEmpleado(id: number) {
    return this.http.get( `${ this.baseUrl2 }empleado/${id}`, httpOptions);
  }

  getEmpleadoDetalles(id: number) {
    return this.http.get( `${ this.baseUrl2 }empleadoDetalle/${id}`, httpOptions);
  }


  getSave(empleado: Empleado) {
      return this.http.put( `${ this.baseUrl2 }actualizaEmpleado`, empleado, httpOptions);
  }

  generaExamen(empleadoId: number): Observable<any> {
    console.log('generaExamen(empleadoId: number): ' + empleadoId);
    return this.http.post(`${this.baseUrl2}` + 'genera?empleadoId=' + empleadoId, httpOptions);
  }

  postValoresHabilidades(idEmpleado: number, resulta: Array<any>) {
    return this.http.post( `${ this.baseUrl2 }guardarSicometricoEmpleado?idEmpleado=` + idEmpleado, resulta, httpOptions);
  }

  postRespuetaExamen(examenReservacionId: number, resulta: Array<Respuesta>) {
    return this.http.post( `${ this.baseUrl2 }guardaexamen?examenReservacionId=` + examenReservacionId, resulta, httpOptions);
  }

  getScalas(val: string) {
    return this.http.get(`${this.baseUrl3}` + 'evalucionConfiguracion/get/' + val , httpOptions);
  }

  public getReservacionesEmpleado(calificacionId: number): Observable<any>   {
    return this.http.get(`${this.baseUrl2}obten/reservacion/${calificacionId}`, httpOptions);
  }

  obtenPreguntasExamen(configuracionExamen: string, empleadoId: number): Observable<any> {
    return this.http.get(`${this.baseUrl2}examen/preguntas/${configuracionExamen}/${empleadoId}`, httpOptions);
  }

  obtenCalificacion(empleadoId: number): Observable<any> {
    return this.http.get(`${this.baseUrl2}obten/calificacion/${empleadoId}`, httpOptions);
  }

  terminaExamen(examenReservacionId: number): Observable<any>  {
    return this.http.post(`${this.baseUrl2}terminaExamen?examenReservacionId=` + examenReservacionId , httpOptions);
  }

  obtenEstatusTerminado(entidad: string, estatus: string): Observable<any> {
    return this.http.get( `${ this.estatus_maestro }entidadEstatus/${entidad}/${estatus}`, httpOptions);
  }

  getGraficas(examenReservacionId: number): Observable<any> {
    return this.http.get(`${this.baseUrl2}obten/calificacion/reservacion/${examenReservacionId}`, httpOptions);
  }

  getComentarios(calificacionId: number): Observable<any>  {
    return this.http.get(`${this.baseUrl2}getObservaciones/${calificacionId}`, httpOptions);
  }

  postObservaciones(calificacionId: number, observacion: string): Observable<any> {
    return this.http.post( `${ this.baseUrl2 }guardaObservacion/${calificacionId}/${observacion}`, httpOptions);
  }

  upload(fileObj: File, idExamenReservacion: number) {
    const file: FormData = new FormData();
    const idTipoDocumento: number = idExamenReservacion;
    file.append('file', fileObj);
    // tslint:disable-next-line:max-line-length
    return this.http.post(`${ this.baseUrl2 }guardarArchivos?idExamenReservacion=` + idExamenReservacion + `&idTipoDocumento=` + idTipoDocumento, file);
  }
}
