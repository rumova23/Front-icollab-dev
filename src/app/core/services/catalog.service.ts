import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CatalogOrder } from '../models/CatalogOrder';
import { Observable } from 'rxjs';
import { CatalogOrderSat } from '../models/CatalogOrderSat';
import { State } from 'src/app/safe/models/State';
import { UnityProduct } from 'src/app/safe/models/UnityProduct';
import { Money } from 'src/app/safe/models/Money';
import { CatalogGeneric } from 'src/app/safe/models/CatalogGeneric';
import {GlobalService} from '../globals/global.service';


/*
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept-Language': 'es-419,es;q=0.9',
    'Accept': 'application/json'
  })
}; */


@Injectable({ providedIn: 'root' })
export class CatalogService {

  parameters:any;
  constructor(private http: HttpClient, private router: Router,
              public globalService: GlobalService) {
  }

  list(catalogs: Array<CatalogOrder>): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(environment.catalogUrl + 'catalog/list', catalogs, {params : this.parameters });
  }

  get(catalog: string): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(environment.catalogUrl + 'catalog/get/'  +  catalog, {params : this.parameters });
  }

  listSat(catalogs: Array<CatalogOrderSat>): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(environment.catalogUrl + 'sat/list', catalogs, {params : this.parameters });
  }

  getSat(catalog: string): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(environment.catalogUrl + 'sat/get/'  +  catalog, {params : this.parameters });
  }

  saveGeneric(generic: CatalogGeneric) {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(environment.catalogUrl +  'catalog/save', generic, {params : this.parameters });
  }

  listUnityProduct(option: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(environment.catalogUrl + 'unityProduct/list/' + option, {params : this.parameters });
  }

  loadStates(idCountry:any, option: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(environment.catalogUrl +
       'state/list/' + idCountry + '/' + option, {params : this.parameters });
  }

  loadStatesAll(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(environment.catalogUrl +  'state/listAll', data, {params : this.parameters });
  }

  loadMoneys(option: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(environment.catalogUrl +
       'money/list/'  + option, {params : this.parameters });
  }

  saveState(state: State) {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(environment.catalogUrl +  'state/save', state, {params : this.parameters });
  }

  saveUnityProduct(unityProduct: UnityProduct) {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(environment.catalogUrl +  'unityProduct/save', unityProduct, {params : this.parameters });
  }

  saveMoney(money: Money) {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(environment.catalogUrl +  'money/save', money, {params : this.parameters });
  }

  getStatus(entity: string, option): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(environment.catalogUrl + 'status/list/'  +  entity + '/' + option, {params : this.parameters });
  }

  getInvoiceByFUF(fuf: string): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.marketUrl + 'invoice/get/fuf/' + fuf, {params : this.parameters });
  }
}
