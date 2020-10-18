import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {GlobalService} from 'src/app/core/globals/global.service';
import {Task} from '../../models/Task';
import {Comentario} from '../../../core/models/comentario';
import {BehaviorSubject, Observable} from 'rxjs';
import {ComplianceDTO} from '../../models/compliance-dto';
import { EPs } from 'src/app/core/globals/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AdministratorComplianceService {

  accion: BehaviorSubject<string> = new BehaviorSubject<string>('no aplica');

  parameters: any;

  constructor(private http: HttpClient,
              private globalService: GlobalService) {
  }

  initComboTiposCumplimientos() {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get( `${ EPs.mastercatalog.mastercatalog.compliance }`,
        {params : this.parameters });
  }
  apruebaMatrizCumplimiento(anio: number) {
    let user = JSON.parse(localStorage.getItem('user'));
    user = user.username;
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post( `${ EPs.tracing.legal.approve.matriz }/${anio}`, user, {params : this.parameters });
  }

   liberaMatrizCumplimiento(anio: number) {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post( `${ EPs.tracing.legal.release.matriz }`, anio, {params : this.parameters });
  }

  initComboActividades() {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get( `${ EPs.tags.activity.alls }`, {params : this.parameters });
  }
  getPersonalCompetente() {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get( `${ EPs.exam.staff.competent }`,
        {params : this.parameters, headers: new HttpHeaders({ timeout: `${1000000}` }) });
  }
  getTasks(anio: number, maestroOpcionId: number, actividadId: number) {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get( `${ EPs.tracing.legal.get.matriz }/${anio}/${maestroOpcionId}/${actividadId}`, {params : this.parameters });
  }
  guardaListTask(tasks: Array<Task>) {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post( `${EPs.tracing.legal.generation.list.task }`, tasks, {params : this.parameters });
  }

  updateTask(complianceDTO: ComplianceDTO) {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post( `${ EPs.tracing.legal.update.compliance }`, complianceDTO,
        {params : this.parameters });
  }

  freeTask(complianceId: number) {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post( `${ EPs.tracing.legal.release.compliance }/`, complianceId, { params : this.parameters });
  }

  complianceById(complianceId: number) {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get( `${ EPs.tracing.legal.get.complianceById }/${complianceId}`,
        {params : this.parameters });
  }

  actividadById(actividadId: number) {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get( `${ EPs.tracing.activity.get }/${actividadId}`,
        {params : this.parameters });
  }

  guardaObservacion(complianceId: number, observacion: string) {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post( `${ EPs.tracing.legal.save.observation }/${complianceId}/${observacion}`, null, {params : this.parameters });
  }

  obtenObservaciones(complianceId: number) {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get( `${ EPs.tracing.legal.get.observation }/${complianceId}`, {params : this.parameters });
  }

  obtenEstatusMaestro(entidad: string) {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get( `${ EPs.mastercatalog.mastercatalog.status }${entidad}`,
        {params : this.parameters });
  }

  upload(fileObj: File, idCompliance: number, typeDocument: number) {
    this.parameters = this.globalService.setXTenantId_Plant();
    let user = JSON.parse(localStorage.getItem('user'));
    user = user.username;
    this.parameters = this.globalService.setXTenantId_Plant();
    const file: FormData = new FormData();
    file.append('file', fileObj);
    return this.http.post(`${ EPs.tracing.legal.saveFile }?idCompliance=` +
        idCompliance + `&typeDocument=` + typeDocument + `&username=` + user , file, {params : this.parameters });
  }

  obtenDocumentos(complianceId: number, typeDocument: string): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(`${ EPs.tracing.legal.get.documents }/${complianceId}/${typeDocument}`, {params : this.parameters });
  }

  obtenGantt(complianceId: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(`${ EPs.tracing.legal.get.gantt }/${complianceId}`, {params : this.parameters });
  }

    acceptTask(complianceId: number) {
      this.parameters = this.globalService.setXTenantId_Plant();
      return this.http.post( `${ EPs.tracing.legal.accept.responsible.compliance }/`, complianceId, { params : this.parameters });
    }
}
