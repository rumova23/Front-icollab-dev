import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {GlobalService} from 'src/app/core/globals/global.service';
import {Task} from '../../models/Task';
import {Comentario} from '../../../core/models/comentario';
import {BehaviorSubject, Observable} from 'rxjs';
import {ComplianceDTO} from '../../models/compliance-dto';

@Injectable({
  providedIn: 'root'
})
export class AdministratorComplianceService {

  accion: BehaviorSubject<string> = new BehaviorSubject<string>('no aplica');

  private microexamenUrl = environment.microexamenUrl;
  private mastercatalog = environment.mastercatalog;
  private tagsUrl = environment.tagsUrl;
  private seguimientoUrl = environment.seguimientoUrl;
  parameters: any;

  constructor(private http: HttpClient,
              private globalService: GlobalService) {
  }

  initComboTiposCumplimientos() {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.mastercatalog }mastercatalog/mastercatalog/TIPO_CUMPLIMIENTO`,
        {params : this.parameters });
  }
  apruebaMatrizCumplimiento(anio: number) {
    let user = JSON.parse(localStorage.getItem('user'));
    user = user.username;
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.seguimientoUrl }legal/aprobar/matriz/${anio}`, user, {params : this.parameters });
  }

   liberaMatrizCumplimiento(anio: number) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.seguimientoUrl }legal/libera/matriz`, anio, {params : this.parameters });
  }

  initComboActividades() {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.tagsUrl }actividad/all/TODOS`, {params : this.parameters });
  }
  getPersonalCompetente() {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.microexamenUrl }exam/personalCompetente/competentes`,
        {params : this.parameters, headers: new HttpHeaders({ timeout: `${1000000}` }) });
  }
  getTasks(anio: number, maestroOpcionId: number, actividadId: number) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.seguimientoUrl }legal/obten/matriz/${anio}/${maestroOpcionId}/${actividadId}`, {params : this.parameters });
  }
  guardaListTask(tasks: Array<Task>) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.seguimientoUrl }legal/generation/list/task`, tasks, {params : this.parameters });
  }

  updateTask(complianceDTO: ComplianceDTO) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.seguimientoUrl }legal/update/compliance`, complianceDTO,
        {params : this.parameters });
  }

  freeTask(complianceId: number) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.seguimientoUrl }legal/libera/compliance/`, complianceId, { params : this.parameters });
  }

  complianceById(complianceId: number) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.seguimientoUrl }legal/obten/complianceById/${complianceId}`,
        {params : this.parameters });
  }

  actividadById(actividadId: number) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.seguimientoUrl }actividad/obtenerActividad/${actividadId}`,
        {params : this.parameters });
  }

  guardaObservacion(complianceId: number, observacion: string) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.seguimientoUrl }legal/guarda/observacion/${complianceId}/${observacion}`, null, {params : this.parameters });
  }

  obtenObservaciones(complianceId: number) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.seguimientoUrl }legal/obten/observaciones/${complianceId}`, {params : this.parameters });
  }

  obtenEstatusMaestro(entidad: string) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.mastercatalog }mastercatalog/mastercatalog/${entidad}`,
        {params : this.parameters });
  }

  upload(fileObj: File, idCompliance: number, typeDocument: number) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    let user = JSON.parse(localStorage.getItem('user'));
    user = user.username;
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    const file: FormData = new FormData();
    file.append('file', fileObj);
    return this.http.post(`${ this.seguimientoUrl }legal/guardarArchivos?idCompliance=` +
        idCompliance + `&typeDocument=` + typeDocument + `&username=` + user , file, {params : this.parameters });
  }

  obtenDocumentos(complianceId: number, typeDocument: string): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(`${this.seguimientoUrl}legal/obten/documents/${complianceId}/${typeDocument}`, {params : this.parameters });
  }

  obtenGantt(complianceId: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(`${this.seguimientoUrl}legal/obten/gantt/${complianceId}`, {params : this.parameters });
  }

    acceptTask(complianceId: number) {
      this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
      return this.http.post( `${ this.seguimientoUrl }legal/accept/responsible/compliance/`, complianceId, { params : this.parameters });
    }
}
