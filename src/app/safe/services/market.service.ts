import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { UnityProduct } from '../models/UnityProduct';
import { Client } from '../models/Client';
import { CatalogGeneric } from '../models/CatalogGeneric';



@Injectable({ providedIn: 'root' })
export class MarketService {

  constructor(private http: HttpClient) {
  }

  loadDataProducts(option: number): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'product/data/' + option);
  }

  loadDataClients(option: number): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'client/data/' + option);
  }

  loadStates(idCountry:any, option: number): Observable<any> {
    return this.http.get(environment.mercadoUrl +
       'state/list/' + idCountry + '/' + option);
  }
  
  loadProducts(option: number): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'product/list/' + option);
  }

  loadClients(option: number): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'client/list/' + option);
  }

  saveProduct(product: Product): Observable<any> {
    return this.http.post(environment.mercadoUrl + 'product/save', product);
  }

  saveClient(client: Client): Observable<any> {
    return this.http.post(environment.mercadoUrl + 'client/save', JSON.stringify(client));
  }

  getClient(idClient:number): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'client/get/' + idClient);
  }

  loadTypeProducts(option: number): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'typeProduct/list/'+ option);
  }

  loadProductsSat(option: number): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'productSat/list/' + option);
  }

  loadUnityProductsSat(option: number): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'unityProductSat/list/' + option);
  }

  loadUnityProducts(option: number): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'unityProduct/list/' +  option);
  }

  loadSystems(option:number): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'sys/list/' + option);
  }

  loadRatesIvaSat(option: number): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'rateIvaSat/list/'+ option);
  }

  saveUnityProduct(unityProduct: UnityProduct) : Observable<any> {
    return this.http.post(environment.mercadoUrl + 'unityProduct/save', unityProduct);
  }

  loadPaymentConditions(option: number): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'paymentCondition/list/'+ option);
  }

  loadTypePersons(option: number): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'typePerson/list/'+ option);
  }

  loadTypeClients(option: number): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'typeClient/list/'+ option);
  }

  loadCountries(option: number): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'country/list/'+ option);
  }

  loadBanks(option: number): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'bank/list/'+ option);
  }

  saveSystem(catalogGeneric: CatalogGeneric) : Observable<any> {
    return this.http.post(environment.mercadoUrl + 'sys/save', catalogGeneric);
  }

  saveTypeProduct(catalogGeneric: CatalogGeneric) : Observable<any> {
    return this.http.post(environment.mercadoUrl + 'typeProduct/save', catalogGeneric);
  }

  savePaymentCondition(catalogGeneric: CatalogGeneric) : Observable<any> {
    return this.http.post(environment.mercadoUrl + 'paymentCondition/save', catalogGeneric);
  }

  saveTypePerson(catalogGeneric: CatalogGeneric) : Observable<any> {
    return this.http.post(environment.mercadoUrl + 'typePerson/save', catalogGeneric);
  }

  saveTypeClient(catalogGeneric: CatalogGeneric) : Observable<any> {
    return this.http.post(environment.mercadoUrl + 'typeClient/save', catalogGeneric);
  }

  saveCountry(catalogGeneric: CatalogGeneric) : Observable<any> {
    return this.http.post(environment.mercadoUrl + 'country/save', catalogGeneric);
  }

  saveBank(catalogGeneric: CatalogGeneric) : Observable<any> {
    return this.http.post(environment.mercadoUrl + 'bank/save', catalogGeneric);
  }

  getPmls(data: any) : Observable<any> {
    return this.http.post(environment.pmlUrl + "list", data);
  }
}
