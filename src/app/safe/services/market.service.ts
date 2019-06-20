import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { Client } from '../models/Client';
import { Plant } from 'src/app/security/models/Plant';
import { BranchOfficeInvoiceSerie } from '../models/BranchOfficeInvoiceSerie';



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

  loadDataPlants(option: number): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'plant/data/' + option);
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
    return this.http.post(environment.mercadoUrl + 'client/save', client);
  }

  savePlant(plant: Plant): Observable<any> {
    return this.http.post(environment.mercadoUrl + 'plant/save', plant);
  }

  getProduct(idProduct: number): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'product/get/' + idProduct);
  }

  getClient(idClient: number): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'client/get/' + idClient);
  }

  getPlant(idPlant: number): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'plant/get/' + idPlant);
  }

  loadPlants(option: number): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'plant/list/' + option);
  }

  getPmls(data: any): Observable<any> {
    return this.http.post(environment.pmlUrl + "list", data);
  }

  getPlantBranches(idPlant: string): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'plantBranchOffice/list/' + idPlant);
  }

  getBranchOfficeInvoiceSeries(): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'branchOfficeInvoiceSerie/list');
  }

  saveBranchOfficeSerie(branchOfficeInvoiceSerie: BranchOfficeInvoiceSerie): Observable<any> {
    return this.http.post(environment.mercadoUrl + 'branchOfficeInvoiceSerie/save', branchOfficeInvoiceSerie);
  }

  getProductsByClient(idClient) : Observable<any> {
    return this.http.get(environment.mercadoUrl + 'product/list/client/' + idClient);
  }

}
