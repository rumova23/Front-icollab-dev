import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Empleado } from '../models/Empleado';
import { Respuesta } from '../models/Respuesta';


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

const httpOptions2 = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7Fasunn4b0E6QxQs',
    'Accept-Language': 'es-ES,es;q=0.9,mk;q=0.8,en;q=0.7',
    'Accept': 'application/json',
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

  constructor(private http: HttpClient) { }

  getCatalogo(nameCat: Array<any>) {
    return this.http.get(`${this.baseUrl}listCatalogos/${nameCat}`, httpOptions);
  }

  getValoresAptitudes(list: Array<any>) {
    return this.http.get(`${this.baseUrl}valoresAptitudes/${list}`, httpOptions);
  }

  getEmpleado(id: number) {
    return this.http.get(`${this.baseUrl2}empleado/${id}`, httpOptions);
  }

  getEmpleadoDetalles(id: number) {
    return this.http.get(`${this.baseUrl2}empleadoDetalle/${id}`, httpOptions);
  }

  getSave(empleado: Empleado) {
    return this.http.put(`${this.baseUrl2}actualizaEmpleado`, empleado, httpOptions);
  }

  getPreguntas(idTemas: Array<string>, empleadoId: Number) {
    return this.http.post(`${this.baseUrl2}` + 'genera?empleadoId=' + empleadoId, idTemas, httpOptions);
  }

  postValoresHabilidades(idEmpleado: number, resulta: Array<any>) {
    return this.http.post(`${this.baseUrl2}guardarSicometricoEmpleado?idEmpleado=` + idEmpleado, resulta, httpOptions);
  }

  postRespuetaExamen(examenReservacionId: number, resulta: Array<Respuesta>) {
    return this.http.post(`${this.baseUrl2}guardaexamen?examenReservacionId=` + examenReservacionId, resulta, httpOptions);
  }

  getScalas(val: string) {
    return this.http.get(`${this.baseUrl3}` + 'evalucionConfiguracion/get/' + val, httpOptions);
  }

  getGraficas(examenReservacionId: number) {
    return this.http.get(`${this.baseUrl2}` + 'calificacion/' + examenReservacionId, httpOptions);
  }

  getComentarios(examenReservacionId: number) {
    return this.http.get(`${this.baseUrl2}` + 'getObservaciones/' + examenReservacionId, httpOptions);
  }

  postObservaciones(examenReservacionId: number, observaciones: String) {
    return this.http.post(`${this.baseUrl2}guardarObservaciones?idExamenReservacion=` + examenReservacionId + `&observacion=` + observaciones, httpOptions);
  }

  upload(fileObj: File, idExamenReservacion: number) {
    /*
    : Observable<HttpEvent<{}>>
     let input = new FormData();
     input.append('file', file);
      return this.http.post(`${ this.baseUrl2 }guardarArchivos?idExamenReservacion=`+examenReservacionId+`&idTipoDocumento=`+examenReservacionId, input);
      //return this.http.post<File>(`${ this.baseUrl4 }uploadFile`, input, httpOptions2);*/
    let file: FormData = new FormData();
    let idTipoDocumento: number = idExamenReservacion;

    file.append('file', fileObj);

    /*const req = new HttpRequest('POST', `${ this.baseUrl2 }guardarArchivos?idExamenReservacion=`+idExamenReservacion+`&idTipoDocumento=`+idTipoDocumento,file);
 
    return this.http.request(req);*/

    return this.http.post(`${this.baseUrl2}guardarArchivos?idExamenReservacion=` + idExamenReservacion + `&idTipoDocumento=` + idTipoDocumento, file);



  }
}
