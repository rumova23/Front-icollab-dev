import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { GlobalService } from 'src/app/core/globals/global.service';
import { EPs } from 'src/app/core/globals/endpoints';

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

  accion: BehaviorSubject<string> = new BehaviorSubject<string>('no aplica');
  parameters: any;

  constructor(private http: HttpClient,
              private globalService: GlobalService) { }


  getEmpleados() {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(`${EPs.exam.staff.employee.all }`, {params : this.parameters });
  }
  getEmpleadosEvaluaciones() {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(`${EPs.exam.staff.employee.evaluation }`, {params : this.parameters });
  }
  getHistorialEvaluaciones(empleadoId: number) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ EPs.exam.staff.employeeEvaluation }/${empleadoId}/evaluaciones`, {params : this.parameters });
  }
  deleteEliminar(idEmpleado: number) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.delete(`${EPs.exam.staff.employee.get }?idEmpleado=` + idEmpleado, {params : this.parameters });
  }
  getTagsAsignacion(idEmpleado: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(`${ EPs.tracing.legal.staff.tag.assigned }/${idEmpleado}`, {params : this.parameters });
  }
  getTagsAsignado(idEmpleado: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(`${ EPs.tracing.legal.staff.tag.assigned }/${idEmpleado}`, {params : this.parameters });
  }
  salvarTags(listtags: Array<string>, empleadoId: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(`${EPs.tracing.legal.tag.employees}?empleadoId=` + empleadoId, listtags, {params : this.parameters });
  }
  getPlantaPerfil(): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(`${ EPs.tracing.legal.tag.actorProfile }`, {params : this.parameters });
  }
  salvarPlantaPerfilEmpleado(lista: Array<any>) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(`${ EPs.tracing.legal.tag.actorProfile }`, lista, {params : this.parameters });
  }
  uploadFile(fileObj) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(`${EPs.exam.staff.saveSoport }`, fileObj, {params: this.parameters});
  }
  downloadFile(fileId: number) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get<Blob>(`${EPs.exam.staff.downloadFile }/` + fileId, {params : this.parameters, responseType: 'blob' as 'json' });
  }
  getDocuments(empleadoId: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get(`${EPs.exam.staff.listSoport }/${empleadoId}`, {params : this.parameters });
  }
  deleteFile(id): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.delete( `${ EPs.exam.staff.deleteFile}/` + id, {params : this.parameters });
  }

}
