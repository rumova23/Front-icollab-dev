import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {GlobalService} from '../globals/global.service';

const httpOptions = new HttpHeaders({
  'Content-Type': 'application/json',
  'Accept-Language': 'es-419,es;q=0.9',
  Accept: 'application/json',
  'Access-Control-Allow-Origin': '*',
  Authorization: 'authkey',
  'X-TENANT-ID': 'aguila'
});

@Injectable({
  providedIn: 'root'
})
export class EfhService {

  headers = new HttpHeaders().set('X-TENANT-ID', 'aguila');
  parameters: any;
  user: any;

  private microEfh = environment.efhUrl;
  constructor(private http: HttpClient,
              public globalService: GlobalService) { }

  setXTenantId(plantSelected) {
    let user = JSON.parse(localStorage.getItem('user'));
    user = user.username;

    if (plantSelected) {
      const p1 = new HttpParams().set('X-TENANT-ID', 'aguila')
          .set('user', user);
      this.parameters = p1;
    } else {
      const p2 = new HttpParams().set('X-TENANT-ID', 'sol')
          .set('user', user);
      this.parameters = p2;
    }
  }

  getEventsConfigurated() {
    this.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.microEfh }event/list`, { params : this.parameters });
  }

  getEvent(id) {
    this.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.microEfh }event/get/` + id, { params : this.parameters });
  }

  setEvent(event, plantSelected) {
    this.setXTenantId(plantSelected);
    return this.http.post( `${ this.microEfh }event/save` , event, {params : this.parameters });
  }

  deleteEvent(id) {
    this.setXTenantId(this.globalService.aguila);
    return this.http.delete( `${ this.microEfh }event/delete/` + id, {params : this.parameters });
  }

}
