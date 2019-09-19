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

  parameters: any;

  constructor(private http: HttpClient, private router: Router,
              public globalService: GlobalService) {
  }

  setXTenantId(plantSelected){
    console.log("setXTenantId(plantSelected)");
    console.log("plantSelected");
    console.log(plantSelected);
    console.log("this.parameters");
    console.log(this.parameters);


    let user = JSON.parse(localStorage.getItem('user'));
    console.log("user");
    console.dir(user);
    user = user['username'];
    console.log("user");
    console.dir(user);

    if (plantSelected){
      let p1 = new HttpParams().set("X-TENANT-ID","aguila")
          .set("user",user);
      this.parameters = p1;
    }
    else{
      let p2 = new HttpParams().set("X-TENANT-ID","sol")
          .set("user",user);
      this.parameters = p2;
    }

  }

  list(catalogs: Array<CatalogOrder>): Observable<any> {
    return this.http.post(environment.catalogUrl + 'catalog/list', catalogs);
  }

  get(catalog: string): Observable<any> {
    return this.http.get(environment.catalogUrl + 'catalog/get/'  +  catalog);
  }

  listSat(catalogs: Array<CatalogOrderSat>): Observable<any> {
    return this.http.post(environment.catalogUrl + 'sat/list', catalogs);
  }

  getSat(catalog: string): Observable<any> {
    return this.http.get(environment.catalogUrl + 'sat/get/'  +  catalog);
  }

  saveGeneric(generic: CatalogGeneric) {
    this.setXTenantId(this.globalService.aguila);
    return this.http.post(environment.catalogUrl +  'catalog/save', generic,{params : this.parameters } );
  }

  listUnityProduct(option: number):Observable<any> {
    return this.http.get(environment.catalogUrl + 'unityProduct/list/' + option);
  }

  loadStates(idCountry:any, option: number): Observable<any> {
    return this.http.get(environment.catalogUrl +
       'state/list/' + idCountry + '/' + option);
  }

  loadStatesAll(data): Observable<any> {
    return this.http.post(environment.catalogUrl +  'state/listAll',data );
  }

  loadMoneys(option: number): Observable<any> {
    return this.http.get(environment.catalogUrl +
       'money/list/'  + option);
  }

  saveState(state: State) {
    return this.http.post(environment.catalogUrl +  'state/save', state );
  }

  saveUnityProduct(unityProduct: UnityProduct) {
    return this.http.post(environment.catalogUrl +  'unityProduct/save', unityProduct );
  }

  saveMoney(money: Money) {
    return this.http.post(environment.catalogUrl +  'money/save', money );
  }

  getStatus(entity: string, option): Observable<any> {
    return this.http.get(environment.catalogUrl + 'status/list/'  +  entity + '/' + option);
  }
}
