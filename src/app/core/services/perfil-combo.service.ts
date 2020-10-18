import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable} from 'rxjs';
import {BehaviorSubject} from 'rxjs';
import { Empleado } from 'src/app/compliance/models/Empleado';
import { Respuesta } from 'src/app/compliance/models/Respuesta';
import { GlobalService } from 'src/app/core/globals/global.service';
import { EPs } from '../globals/endpoints';

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
  accionSkills: BehaviorSubject<string> = new BehaviorSubject<string>('no aplica');
  accionBehavior: BehaviorSubject<string> = new BehaviorSubject<string>('no aplica');

  parameters: any;
  user: any;
  calificacionId: any;
  reservacionId: any;

  constructor(private http: HttpClient,
              private globalService: GlobalService) { }


  getlistCatalogoOrdenados(nameCatalogs: Array<any>) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ EPs.catalog.catalog.list }`, nameCatalogs, {params : this.parameters });
  }

  getSave(empleado: Empleado) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.put( `${ EPs.exam.updateEmployee }`, empleado, {params : this.parameters });
  }

  getEmpleado(id: number) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ EPs.exam.employee.id }/${id}`, {params : this.parameters });
  }

  getEmpleadoDetalles(id: number) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ EPs.exam.detailEmployee }/${id}`, {params : this.parameters });
  }


  generaExamen(empleadoIdentifier: number, config: string): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    const RequestBody = {
       empleadoId    : empleadoIdentifier
      , configuracion : config
    };

    return this.http.post(`${ EPs.exam.generate}`, RequestBody , {params : this.parameters });
  }

  obtenPreguntasExamen(configuracionExamen: string, empleadoId: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(`${ EPs.exam.questions}/${configuracionExamen}/${empleadoId}`, {params : this.parameters });
  }


  respuestaExamen(examenReservacionId: number, resulta: Array<Respuesta>) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${EPs.exam.saveExam}?examenReservacionId=` + examenReservacionId,
        resulta, {params : this.parameters });
  }

  getValoresAptitudes(examenReservacionId: number, preguntaId: number) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ EPs.exam.responseValue }?examenReservacionId=` + examenReservacionId
                             + `&preguntaId=` + preguntaId, {}, {params : this.parameters });
  }

  postValoresHabilidades(idEmpleado: number, resulta: Array<any>) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ EPs.exam.saveEmployeePsychometric }?idEmpleado=` + idEmpleado,
        resulta, {params : this.parameters });
  }

  getScalas(val: string) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(`${ EPs.configuration.evaluation}/` + val , {params : this.parameters });
  }

  public getReservacionesEmpleado(calificacionId: number): Observable<any>   {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(`${ EPs.exam.get.reservation}/${calificacionId}`, {params : this.parameters });
  }

  obtenCalificacion(empleadoId: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(`${ EPs.exam.get.qualification }/${empleadoId}`, {params : this.parameters });
  }

  obtenCatalogoDocumentos() {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(`${ EPs.exam.catalog.documents}/`, {params : this.parameters });
  }

  obtenDocumentos(calificacionId: number, typeDocument: string): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(`${ EPs.exam.get.documents }/${calificacionId}/${typeDocument}`, {params : this.parameters });
  }

  terminaExamen(examenReservacionId: number): Observable<any>  {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(`${ EPs.exam.completion }?examenReservacionId=` + examenReservacionId + '&user=' + this.user, null,
        {params : this.parameters });
  }

  obtenEstatusTerminado(entidad: string, estatus: string) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ EPs.statusMaster.status }${entidad}/${estatus}`,
          {params : this.parameters });
  }

  getGraficas(examenReservacionId: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(`${ EPs.exam.get.qualification.reservation }/${examenReservacionId}`, {params : this.parameters });
  }

  getGraficaGlobal(calificacionId: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(`${ EPs.exam.get.qualification.global }/${calificacionId}`, {params : this.parameters });
  }

  getComentarios(calificacionId: number): Observable<any>  {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(`${ EPs.exam.observation }/${calificacionId}`, {params : this.parameters });
  }

  postObservaciones(calificacionId: number, observacion: string): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ EPs.exam.saveObservation }/${calificacionId}/${observacion}`, null, {params : this.parameters });
  }

  guardaObservacion(observacion): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ EPs.exam.saveObservation }`, observacion, {params : this.parameters });
  }

  eliminaObservacion(observacionId): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.delete( `${ EPs.exam.deleteObservation }/` + observacionId, {params : this.parameters });
  }

  upload(fileObj: File, idCalificacion: number, typeDocument: number) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    const file: FormData = new FormData();
    file.append('file', fileObj);
    return this.http.post(`${ EPs.exam.saveFile }?idCalificacion=` + idCalificacion + `&typeDocument=` + typeDocument, file, {params : this.parameters });
  }

  downloadFile(fileId: number) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get<Blob>(`${ EPs.microuploaddb.downloadFile }` + fileId, {params : this.parameters, responseType: 'blob' as 'json' });
  }

  deleteFile(id): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.delete( `${ EPs.exam.deleteFile }/` + id, {params : this.parameters });
  }
}
