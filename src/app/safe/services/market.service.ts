import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { Client } from '../models/Client';
import { Plant } from 'src/app/security/models/Plant';
import { BranchOfficeInvoiceSerie } from '../models/BranchOfficeInvoiceSerie';
import { Invoice } from '../models/Invoice';
import { TimeRegister } from '../models/TimeRegister';



@Injectable({ providedIn: 'root' })
export class MarketService {

  constructor(private http: HttpClient) {
  }

  loadProducts(option: number): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'product/list/' + option);
  }

  getClients(option: number): Observable<any> {
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

  saveInvoice(invoice: Invoice): Observable<any> {
    return this.http.post(environment.mercadoUrl + 'invoice/save', invoice);
  }

  saveFuecd(data): Observable<any> {
    return this.http.post(environment.fuecdUrl + 'save', data);
  }

  saveFuecdInvoice(data): Observable<any> {
    return this.http.post(environment.mercadoUrl + 'invoice/fuecd', data);
  }

  getInvoice(id): Observable<any> {
    return this.http.post(environment.mercadoUrl + 'invoice/get', id);
  }

  getFuecds():Observable<any> {
    return this.http.get(environment.fuecdUrl + 'list');
  }

  getFuecd(id:number):Observable<any> {
    return this.http.get(environment.fuecdUrl + 'get/' + id);
  }

  validateFuecd(data): Observable<any> {
    return this.http.post(environment.fuecdUrl + 'validate', data);
  }

  getProduct(idProduct: number): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'product/get/' + idProduct);
  }

  getClient(idClient: number): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'client/get/' + idClient);
  }

  getPlant(idPlant): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'plant/get/' + idPlant);
  }

  getPlants(option: number): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'plant/list/' + option);
  }

  getInvoices(option: number): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'invoice/list/' + option);
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

  getFinalcialIndexes(data: any): Observable<any> {
    return this.http.post(environment.mercadoUrl + "financialIndex/list", data);
  }

  getInpp(data: any): Observable<any> {
    return this.http.post(environment.mercadoUrl + "inpp/list", data);
  }

  getUsppi(data: any): Observable<any> {
    return this.http.post(environment.mercadoUrl + "usppi/list", data);
  }

}
