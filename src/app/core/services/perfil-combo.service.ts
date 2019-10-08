import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable} from 'rxjs';
import {BehaviorSubject} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Empleado } from 'src/app/compliance/models/Empleado';
import { Respuesta } from 'src/app/compliance/models/Respuesta';
import { GlobalService } from 'src/app/core/globals/global.service';

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

  accion: BehaviorSubject<string> = new BehaviorSubject<string>('no aplica');

  private catalogUrl = environment.catalogUrl;
  private microexamenUrl = environment.microexamenUrl;
  private evaluacionExamenUrl = environment.evaluacionExamenUrl;
  private microuploaddbUrl = environment.microuploaddbUrl;

  parameters: any;
  user: any;
  calificacionId: any;
  reservacionId: any;

  constructor(private http: HttpClient,
              private globalService: GlobalService) { }

  setXTenantId(plantSelected) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.user = this.user.username;

      if (plantSelected) {
      const p1 = new HttpParams().set('X-TENANT-ID', 'aguila')
                               .set('user', this.user);
      this.parameters = p1;
    } else {
      const p2 = new HttpParams().set('X-TENANT-ID', 'sol')
                               .set('user', this.user);
      this.parameters = p2;
    }
  }

  getlistCatalogoOrdenados(nameCatalogs: Array<any>) {
    this.setXTenantId(this.globalService.aguila);
    // return this.http.post( `${ this.catalogUrl }catalog/list`, nameCat, httpOptions);
    return this.http.post( `${ this.catalogUrl }catalog/list`, nameCatalogs, {params : this.parameters });
  }

  getSave(empleado: Empleado) {
    this.setXTenantId(this.globalService.aguila);
    // return this.http.put( `${ this.microexamenUrl }exam/actualizaEmpleado`, empleado, httpOptions);
    return this.http.put( `${ this.microexamenUrl }exam/actualizaEmpleado`, empleado, {params : this.parameters });
  }

  getEmpleado(id: number) {
    this.setXTenantId(this.globalService.aguila);
    // return this.http.get( `${ this.microexamenUrl }exam/empleado/${id}`, httpOptions);
    return this.http.get( `${ this.microexamenUrl }exam/empleado/${id}`, {params : this.parameters });
  }

  getEmpleadoDetalles(id: number) {
    this.setXTenantId(this.globalService.aguila);
    // return this.http.get( `${ this.microexamenUrl }exam/empleadoDetalle/${id}`, httpOptions);
    return this.http.get( `${ this.microexamenUrl }exam/empleadoDetalle/${id}`, {params : this.parameters });
  }


  generaExamen(empleadoIdentifier: number, config: String): Observable<any> {
    this.setXTenantId(this.globalService.aguila);
    const RequestBody = {
       empleadoId    : empleadoIdentifier
      , configuracion : config
    };
    // let RequestBody = empleadoId;

    // return this.http.post(`${this.microexamenUrl}` + 'exam/genera?empleadoId=' + empleadoId, httpOptions);
    return this.http.post(`${this.microexamenUrl}` + 'exam/genera', RequestBody , {params : this.parameters });
  }

  obtenPreguntasExamen(configuracionExamen: string, empleadoId: number): Observable<any> {
    this.setXTenantId(this.globalService.aguila);
    return this.http.get(`${this.microexamenUrl}exam/preguntas/${configuracionExamen}/${empleadoId}`, httpOptions);
  }


  respuestaExamen(examenReservacionId: number, resulta: Array<Respuesta>) {
    this.setXTenantId(this.globalService.aguila);
    // return this.http.post( `${ this.microexamenUrl }exam/guardaexamen?examenReservacionId=` + examenReservacionId, resulta, httpOptions);
    return this.http.post( `${ this.microexamenUrl }exam/guardaexamen?examenReservacionId=` + examenReservacionId,
        resulta, {params : this.parameters });
  }


  getValoresAptitudes(examenReservacionId: number, preguntaId: number) {
    this.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.microexamenUrl }exam/valorRespuesta?examenReservacionId=` + examenReservacionId
                             + `&preguntaId=` + preguntaId, {}, {params : this.parameters });
  }


  postValoresHabilidades(idEmpleado: number, resulta: Array<any>) {
    this.setXTenantId(this.globalService.aguila);
    // return this.http.post( `${ this.microexamenUrl }exam/guardarSicometricoEmpleado?idEmpleado=` + idEmpleado, resulta, httpOptions);
    return this.http.post( `${ this.microexamenUrl }exam/guardarSicometricoEmpleado?idEmpleado=` + idEmpleado,
        resulta, {params : this.parameters });
  }




  getScalas(val: string) {
    this.setXTenantId(this.globalService.aguila);
    // return this.http.get(`${this.evaluacionExamenUrl}` + 'evalucionConfiguracion/get/' + val , httpOptions);
    return this.http.get(`${this.evaluacionExamenUrl}` + 'evalucionConfiguracion/get/' + val , {params : this.parameters });
  }

  public getReservacionesEmpleado(calificacionId: number): Observable<any>   {
    this.setXTenantId(this.globalService.aguila);
    // return this.http.get(`${this.microexamenUrl}exam/obten/reservacion/${calificacionId}`, httpOptions);
    return this.http.get(`${this.microexamenUrl}exam/obten/reservacion/${calificacionId}`, {params : this.parameters });
  }



  obtenCalificacion(empleadoId: number): Observable<any> {
    this.setXTenantId(this.globalService.aguila);
    // return this.http.get(`${this.microexamenUrl}exam/obten/calificacion/${empleadoId}`, httpOptions);
    return this.http.get(`${this.microexamenUrl}exam/obten/calificacion/${empleadoId}`, {params : this.parameters });
  }

  obtenCatalogoDocumentos() {
    this.setXTenantId(this.globalService.aguila);
    return this.http.get(`${this.microexamenUrl}exam/catalogo/documents/`, {params : this.parameters });
  }

  obtenDocumentos(calificacionId: number, typeDocument: string): Observable<any> {
    this.setXTenantId(this.globalService.aguila);
    return this.http.get(`${this.microexamenUrl}exam/obten/documents/${calificacionId}/${typeDocument}`, {params : this.parameters });
  }

  terminaExamen(examenReservacionId: number): Observable<any>  {
    this.setXTenantId(this.globalService.aguila);
    // return this.http.post(`${this.microexamenUrl}exam/terminaExamen?examenReservacionId=` + examenReservacionId , httpOptions);
    return this.http.post(`${this.microexamenUrl}exam/terminaExamen?examenReservacionId=` + examenReservacionId + '&user=' + this.user,
        {params : this.parameters });
  }


  obtenEstatusTerminado(entidad: string, estatus: string): Observable<any> {
    this.setXTenantId(this.globalService.aguila);
    return null;
  }


  getGraficas(examenReservacionId: number): Observable<any> {
    this.setXTenantId(this.globalService.aguila);
    return this.http.get(`${this.microexamenUrl}exam/obten/calificacion/reservacion/${examenReservacionId}`, {params : this.parameters });
  }


  getComentarios(calificacionId: number): Observable<any>  {
    this.setXTenantId(this.globalService.aguila);
    // return this.http.get(`${this.microexamenUrl}exam/getObservaciones/${calificacionId}`, httpOptions);
    return this.http.get(`${this.microexamenUrl}exam/getObservaciones/${calificacionId}`, {params : this.parameters });
  }


  postObservaciones(calificacionId: number, observacion: string): Observable<any> {
    this.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.microexamenUrl }exam/guardaObservacion/${calificacionId}/${observacion}`, {params : this.parameters });
  }


  upload(fileObj: File, idCalificacion: number, typeDocument: number) {
    this.setXTenantId(this.globalService.aguila);
    const file: FormData = new FormData();
    file.append('file', fileObj);
    return this.http.post(`${ this.microexamenUrl }exam/guardarArchivos?idCalificacion=` +
        idCalificacion + `&typeDocument=` + typeDocument, file);
  }

  downloadFile(fileId: number) {
    this.setXTenantId(this.globalService.aguila);
    return this.http.get(`${ this.microuploaddbUrl }downloadFile/` + fileId, {params : this.parameters });
  }
}
