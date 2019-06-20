import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CatalogOrder } from '../models/CatalogOrder';
import { Observable } from 'rxjs';
import { CatalogOrderSat } from '../models/CatalogOrderSat';
import { State } from 'src/app/safe/models/State';
import { UnityProduct } from 'src/app/safe/models/UnityProduct';
import { Money } from 'src/app/safe/models/Money';
import { CatalogGeneric } from 'src/app/safe/models/CatalogGeneric';


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

  constructor(private http: HttpClient, 
    private router: Router) {
  
  }

  list(catalogs: Array<CatalogOrder>): Observable<any> {
    return this.http.post(environment.catalog + 'list', catalogs);
  }

  get(catalog: string): Observable<any> {
    return this.http.get(environment.catalog + 'get/'  +  catalog);
  }

  listSat(catalogs: Array<CatalogOrderSat>): Observable<any> {
    return this.http.post(environment.catalog + 'sat/list', catalogs);
  }

  getSat(catalog: string): Observable<any> {
    return this.http.get(environment.catalog + 'sat/get/'  +  catalog);
  }

  saveGeneric(generic: CatalogGeneric) {
    return this.http.post(environment.catalog +  'save', generic );
  }

  listUnityProduct(option: number):Observable<any> {
    return this.http.get(environment.catalog + 'unityProduct/list/' + option);
  }

  loadStates(idCountry:any, option: number): Observable<any> {
    return this.http.get(environment.catalog +
       'state/list/' + idCountry + '/' + option);
  }

  loadStatesAll(data): Observable<any> {
    return this.http.post(environment.catalog +  'state/listAll',data );
  }

  loadMoneys(option: number): Observable<any> {
    return this.http.get(environment.catalog +
       'money/list/'  + option);
  }

  saveState(state: State) {
    return this.http.post(environment.catalog +  'state/save', state );
  }

  saveUnityProduct(unityProduct: UnityProduct) {
    return this.http.post(environment.catalog +  'unityProduct/save', unityProduct );
  }

  saveMoney(money: Money) {
    return this.http.post(environment.catalog +  'money/save', money );
  }

}
