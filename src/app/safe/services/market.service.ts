import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { Client } from '../models/Client';
import { Plant } from 'src/app/security/models/Plant';
import { BranchOfficeInvoiceSerie } from '../models/BranchOfficeInvoiceSerie';
import { Invoice } from '../models/Invoice';
import { CreditNote } from '../models/CreditNote';
import { DebitNote } from '../models/DebitNote';
import { BranchOfficeCreditNoteSerie } from '../models/BranchOfficeCreditNoteSerie';
import {GlobalService} from '../../core/globals/global.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept-Language': 'es-419,es;q=0.9',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, content-type',
  })
};

@Injectable({ providedIn: 'root' })
export class MarketService {

  parameters: any;
  constructor(private http: HttpClient,
              private globalService: GlobalService) {
  }



  loadProducts(option: number): Observable<any> {
    return this.http.get(environment.marketUrl + 'product/list/' + option);
  }

  getClients(option: number): Observable<any> {
    return this.http.get(environment.marketUrl + 'client/list/' + option);
  }

  saveProduct(product: Product): Observable<any> {
    return this.http.post(environment.marketUrl + 'product/save', product);
  }

  saveClient(client: Client): Observable<any> {
    return this.http.post(environment.marketUrl + 'client/save', client);
  }

  savePlant(plant: Plant): Observable<any> {
    return this.http.post(environment.marketUrl + 'plant/save', plant);
  }

  saveInvoice(invoice: Invoice): Observable<any> {
    return this.http.post(environment.marketUrl + 'invoice/save', invoice);
  }

  saveCreditNote(invoice: CreditNote): Observable<any> {
    return this.http.post(environment.marketUrl + 'creditNote/save', invoice);
  }

  saveDebitNote(invoice: DebitNote): Observable<any> {
    return this.http.post(environment.marketUrl + 'debitNote/save', invoice);
  }

  saveFuecd(data): Observable<any> {
    return this.http.post(environment.fuecdUrl + 'save', data);
  }

  saveFuecdInvoice(data): Observable<any> {
    return this.http.post(environment.marketUrl + 'invoice/fuecd', data);
  }

  getInvoice(id): Observable<any> {
    return this.http.get(environment.marketUrl + 'invoice/get/' + id);
  }

  getCreditNote(id): Observable<any> {
    return this.http.get(environment.marketUrl + 'creditNote/get/' + id);
  }

  getDebitNote(id): Observable<any> {
    return this.http.get(environment.marketUrl + 'debitNote/get/' + id);
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
    return this.http.get(environment.marketUrl + 'product/get/' + idProduct);
  }

  getClient(idClient: number): Observable<any> {
    return this.http.get(environment.marketUrl + 'client/get/' + idClient);
  }

  getPlant(idPlant): Observable<any> {
    return this.http.get(environment.marketUrl + 'plant/get/' + idPlant);
  }

  getPlants(option: number): Observable<any> {
    return this.http.get(environment.marketUrl + 'plant/list/' + option);
  }

  getInvoices(option: number): Observable<any> {
    return this.http.get(environment.marketUrl + 'invoice/list/' + option);
  }

  getCreditNotes(option: number): Observable<any> {
    return this.http.get(environment.marketUrl + 'creditNote/list/' + option);
  }

  getDebitNotes(option: number): Observable<any> {
    return this.http.get(environment.marketUrl + 'debitNote/list/' + option);
  }

  getPmls(data: any): Observable<any> {
    return this.http.post(environment.pmlUrl + "list", data);
  }

  getPlantBranches(idPlant: string): Observable<any> {
    return this.http.get(environment.marketUrl + 'plantBranchOffice/list/' + idPlant);
  }

  getBranchOfficeInvoiceSeries(): Observable<any> {
    return this.http.get(environment.marketUrl + 'branchOfficeInvoiceSerie/list');
  }

  saveBranchOfficeInvoiceSerie(branchOfficeInvoiceSerie: BranchOfficeInvoiceSerie): Observable<any> {
    return this.http.post(environment.marketUrl + 'branchOfficeInvoiceSerie/save', branchOfficeInvoiceSerie);
  }

  getBranchOfficeCreditNoteSeries(): Observable<any> {
    return this.http.get(environment.marketUrl + 'branchOfficeCreditNoteSerie/list');
  }

  saveBranchOfficeCreditNoteSerie(branchOfficeCreditNoteSerie: BranchOfficeCreditNoteSerie): Observable<any> {
    return this.http.post(environment.marketUrl + 'branchOfficeCreditNoteSerie/save', branchOfficeCreditNoteSerie);
  }

  getProductsByClient(idClient) : Observable<any> {
    return this.http.get(environment.marketUrl + 'product/list/client/' + idClient);
  }

  getFinalcialIndexes(data: any): Observable<any> {
    return this.http.post(environment.marketUrl + "financialIndex/list", data);
  }

  getInpp(data: any): Observable<any> {
    return this.http.post(environment.marketUrl + "inpp/list", data);
  }

  getUsppi(data: any): Observable<any> {
    return this.http.post(environment.marketUrl + "usppi/list", data);
  }

  getModelMarket(time): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.mmmercadoUrl + "raws/prediction/planning/" + time , {params : this.parameters });
  }

  saveModelMarket(data): Observable<any> {
    return this.http.post(environment.mmmercadoUrl + "raws/prediction/updaterow", data);
  }

  downloadModelMarket(time): Observable<any> {
    return this.http.get(environment.mmmercadoUrl + 'raws/download/' + time);
  }

  getConfigWeather(): Observable<any> {
    return this.http.get(environment.weatherUrl + 'config/');
  }

  getConfigCharge(): Observable<any> {
    return this.http.get(environment.weatherUrl + 'charge/config/');
  }

}
