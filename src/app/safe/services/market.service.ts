import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { Client } from '../models/Client';
import { Plant } from 'src/app/security/models/Plant';
import { BranchOfficeInvoiceSerie } from '../models/BranchOfficeInvoiceSerie';
import { Invoice } from '../models/Invoice';
import { CreditNote } from '../models/CreditNote';
import { DebitNote } from '../models/DebitNote';



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

  saveCreditNote(invoice: CreditNote): Observable<any> {
    return this.http.post(environment.mercadoUrl + 'creditNote/save', invoice);
  }

  saveDebitNote(invoice: DebitNote): Observable<any> {
    return this.http.post(environment.mercadoUrl + 'debitNote/save', invoice);
  }

  saveFuecd(data): Observable<any> {
    return this.http.post(environment.fuecdUrl + 'save', data);
  }

  saveFuecdInvoice(data): Observable<any> {
    return this.http.post(environment.mercadoUrl + 'invoice/fuecd', data);
  }

  getInvoice(id): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'invoice/get/' + id);
  }

  getCreditNote(id): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'creditNote/get/' + id);
  }

  getDebitNote(id): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'debitNote/get/' + id);
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

  downloadCharge(idTypeCharge): Observable<any>  {
    return this.http.get(environment.weatherUrl + 'charge/download/' + idTypeCharge);
  }

  validateCharge(data): Observable<any> {
    return this.http.post(environment.weatherUrl + 'charge/validate', data);
  }

  saveCharge(data): Observable<any> {
    return this.http.post(environment.weatherUrl + 'charge/save', data);
  }

  listCharge(time): Observable<any> {
    return this.http.get(environment.weatherUrl + 'charge/list/' + time);
  }

  editCharge(data) {
    return this.http.post(environment.weatherUrl + 'charge/edit', data);
  }

  downloadWeather(idTypeWeather): Observable<any>  {
    return this.http.get(environment.weatherUrl + 'download/' + idTypeWeather);
  }

  validateWeather(data): Observable<any> {
    return this.http.post(environment.weatherUrl + 'validate', data);
  }

  saveWeather(data): Observable<any> {
    return this.http.post(environment.weatherUrl + 'save', data);
  }

  listWeather(time): Observable<any> {
    return this.http.get(environment.weatherUrl + 'list/' + time);
  }

  editWeather(data) {
    return this.http.post(environment.weatherUrl + 'edit', data);
  }

  downloadEnergy(idTypeCharge): Observable<any>  {
    return this.http.get(environment.weatherUrl + 'energy/download/' + idTypeCharge);
  }

  validateEnergy(data): Observable<any> {
    return this.http.post(environment.weatherUrl + 'energy/validate', data);
  }

  saveEnergy(data): Observable<any> {
    return this.http.post(environment.weatherUrl + 'energy/save', data);
  }

  listEnergy(time): Observable<any> {
    return this.http.get(environment.weatherUrl + 'energy/list/' + time);
  }

  editEnergy(data) {
    return this.http.post(environment.weatherUrl + 'energy/edit', data);
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

  getCreditNotes(option: number): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'creditNote/list/' + option);
  }

  getDebitNotes(option: number): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'debitNote/list/' + option);
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

  getModelMarket(time): Observable<any> {
    return this.http.get(environment.modelMarket + "raws/prediction/planning/" + time);
  }

  saveModelMarket(data): Observable<any> {
    return this.http.post(environment.modelMarket + "raws/prediction/updaterow", data);
  }

}
