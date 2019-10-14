import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {GlobalService} from 'src/app/core/globals/global.service';

@Injectable({
  providedIn: 'root'
})
export class AdministratorComplianceService {
  private microexamenUrl = environment.microexamenUrl;
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
  getPersonalCompetente(fechaInicio: number, fechaFinal: number) {
    this.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.microexamenUrl }exam/personalCompetente/competentes/${fechaInicio}/${fechaFinal}`,
        {params : this.parameters });
  }
}
