import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import { CatalogOrder } from '../models/CatalogOrder';
import { Observable } from 'rxjs';
import { CatalogOrderSat } from '../models/CatalogOrderSat';
import { State } from 'src/app/safe/models/State';
import { UnityProduct } from 'src/app/safe/models/UnityProduct';
import { Money } from 'src/app/safe/models/Money';
import { CatalogGeneric } from 'src/app/safe/models/CatalogGeneric';
import {GlobalService} from '../globals/global.service';
import { EPs } from '../globals/endpoints';


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
    return this.http.post(EPs.catalog.catalog.list, catalogs, {params : this.parameters });
  }

  get(catalog: string): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.catalog.catalog.get + catalog, {params : this.parameters });
  }

  listSat(catalogs: Array<CatalogOrderSat>): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.catalog.sat.list, catalogs, {params : this.parameters });
  }

  getSat(catalog: string): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.catalog.sat.get + catalog, {params : this.parameters });
  }

  saveGeneric(generic: CatalogGeneric) {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.catalog.catalog.save, generic, {params : this.parameters });
  }

  listUnityProduct(option: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.catalog.unityProduct.list + option, {params : this.parameters });
  }

  loadStates(idCountry:any, option: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.catalog.state.list + idCountry + '/' + option, {params : this.parameters });
  }

  loadStatesAll(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.catalog.state.all, data, {params : this.parameters });
  }

  loadMoneys(option: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.catalog.money.list + option, {params : this.parameters });
  }

  saveState(state: State) {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.catalog.state.save, state, {params : this.parameters });
  }

  saveUnityProduct(unityProduct: UnityProduct) {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.catalog.unityProduct.save, unityProduct, {params : this.parameters });
  }

  saveMoney(money: Money) {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.catalog.money.save, money, {params : this.parameters });
  }

  getStatus(entity: string, option): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.catalog.status.list + entity + '/' + option, {params : this.parameters });
  }

  getInvoiceByFUF(fuf: string): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(EPs.market.invoice.fut + fuf, {params : this.parameters });
  }
}
