import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {GlobalService} from 'src/app/core/globals/global.service';
import {Task} from "../../models/Task";

@Injectable({
  providedIn: 'root'
})
export class AdministratorComplianceService {
  private microexamenUrl = environment.microexamenUrl;
  private mastercatalog = environment.mastercatalog;
  private tagsUrl = environment.tagsUrl;
  private seguimiento = environment.seguimiento;
  parameters: any;

  constructor(private http: HttpClient,
              private globalService: GlobalService) { }

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
        {params : this.parameters });
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
}
