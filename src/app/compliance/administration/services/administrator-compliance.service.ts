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
  private estatusmaestro = environment.estatusmaestro;
  private tagsUrl = environment.tagsUrl;
  private seguimiento = environment.seguimiento;
  parameters: any;

  constructor(private http: HttpClient,
              private globalService: GlobalService) {
  }

  setXTenantId(plantSelected) {
    let user = JSON.parse(localStorage.getItem('user'));
    user = user.username;
    if (plantSelected) {
      const p1 = new HttpParams().set('X-TENANT-ID', 'aguila').set('user', user);
      this.parameters = p1;
    } else {
      const p2 = new HttpParams().set('X-TENANT-ID', 'sol').set('user', user);
      this.parameters = p2;
    }
  }
  initComboTiposCumplimientos() {
    this.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.mastercatalog }mastercatalog/mastercatalog/TIPO_CUMPLIMIENTO`,
        {params : this.parameters });
  }

  initComboActividades() {
    this.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.tagsUrl }tag/actividad/all/TODOS`);
  }
  getPersonalCompetente(fechaInicio: number, fechaFinal: number) {
    this.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.microexamenUrl }exam/personalCompetente/competentes/${fechaInicio}/${fechaFinal}`,
        {params : this.parameters, headers: new HttpHeaders({ timeout: `${1000000}` }) });
  }
  getTasks(maestroOpcionId: number, actividadId: number) {
    this.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.tagsUrl }tag/actividad/${maestroOpcionId}/${actividadId}`,
        {params : this.parameters });
  }
  guardaTask(task: Task) {
    this.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.seguimiento }legal/generation/task`, task,
        {params : this.parameters });
  }

  updateTask(complianceDTO: ComplianceDTO) {
    this.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.seguimiento }legal/update/compliance`, complianceDTO,
        {params : this.parameters });
  }

  freeTask(complianceId: number) {
    this.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.seguimiento }legal/libera/compliance/`, complianceId, { params : this.parameters });
  }

  complianceById(complianceId: number) {
    this.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.seguimiento }legal/obten/complianceById/${complianceId}`,
        {params : this.parameters });
  }

  actividadById(actividadId: number) {
    this.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.seguimiento }tag/actividad/obtenerActividad/${actividadId}`,
        {params : this.parameters });
  }

  guardaObservacion(complianceId: number, observacion: string) {
    this.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.seguimiento }legal/guarda/observacion/${complianceId}/${observacion}`,
        {params : this.parameters });
  }

  obtenObservaciones(complianceId: number) {
    this.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.seguimiento }legal/obten/observaciones/${complianceId}`,
        {params : this.parameters });
  }

  obtenEstatusMaestro(entidad: string) {
    this.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.mastercatalog }mastercatalog/mastercatalog/${entidad}`,
        {params : this.parameters });
  }

  upload(fileObj: File, idCompliance: number, typeDocument: number) {
    let user = JSON.parse(localStorage.getItem('user'));
    user = user.username;
    this.setXTenantId(this.globalService.aguila);
    const file: FormData = new FormData();
    file.append('file', fileObj);
    return this.http.post(`${ this.seguimiento }legal/guardarArchivos?idCompliance=` +
        idCompliance + `&typeDocument=` + typeDocument + `&username=` + user , file);
  }

  obtenDocumentos(complianceId: number, typeDocument: string): Observable<any> {
    this.setXTenantId(this.globalService.aguila);
    return this.http.get(`${this.seguimiento}legal/obten/documents/${complianceId}/${typeDocument}`, {params : this.parameters });
  }

  obtenGantt(complianceId: number): Observable<any> {
    this.setXTenantId(this.globalService.aguila);
    return this.http.get(`${this.seguimiento}legal/obten/gantt/${complianceId}`, {params : this.parameters });
  }

    acceptTask(complianceId: number) {
      this.setXTenantId(this.globalService.aguila);
      return this.http.post( `${ this.seguimiento }legal/accept/responsible/compliance/`, complianceId, { params : this.parameters });
    }
}
