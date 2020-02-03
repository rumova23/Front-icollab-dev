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
import {ProductInDTO} from '../models/product-in-dto';

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
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.marketUrl + 'product/list/' + option, {params : this.parameters });
  }

  getClients(option: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.marketUrl + 'client/list/' + option, {params : this.parameters });
  }

  saveProduct(product: Product): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(environment.marketUrl + 'product/save', product, {params : this.parameters });
  }

  saveClient(client: Client): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(environment.marketUrl + 'client/save', client, {params : this.parameters });
  }

  savePlant(plant: Plant): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(environment.marketUrl + 'plant/save', plant, {params : this.parameters });
  }

  saveInvoice(invoice: Invoice): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(environment.marketUrl + 'invoice/save', invoice, {params : this.parameters });
  }

  saveCreditNote(invoice: CreditNote): Observable<any> {
    return this.http.post(environment.marketUrl + 'creditNote/save', invoice, {params : this.parameters });
  }

  saveDebitNote(invoice: DebitNote): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(environment.marketUrl + 'debitNote/save', invoice, {params : this.parameters });
  }

  saveFuecd(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(environment.fuecdUrl + 'fuecd/save', data, {params : this.parameters });
  }

  saveFuecdInvoice(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(environment.marketUrl + 'invoice/fuecd', data, {params : this.parameters });
  }

  getInvoice(id): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.marketUrl + 'invoice/get/' + id, {params : this.parameters });
  }

  getCreditNote(id): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.marketUrl + 'creditNote/get/' + id, {params : this.parameters });
  }

  getDebitNote(id): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.marketUrl + 'debitNote/get/' + id, {params : this.parameters });
  }

  getFuecds(): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.fuecdUrl + 'fuecd/list', {params : this.parameters });
  }

  getFuecd(id: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.fuecdUrl + 'fuecd/get/' + id, {params : this.parameters });
  }

  validateFuecd(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(environment.fuecdUrl + 'fuecd/validate', data, {params : this.parameters });
  }
  validateProposalAccepted(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(environment.mmmercadoUrl + 'validate', data, {params : this.parameters });
  }
  downloadCharge(idTypeCharge): Observable<any>  {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.weatherUrl + 'charge/download/' + idTypeCharge, {params : this.parameters });
  }

  validateCharge(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(environment.weatherUrl + 'import/validate', data, {params : this.parameters });
  }

  saveCharge(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(environment.weatherUrl + 'import/save', data, {params : this.parameters });
  }

  listCharge(time): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.weatherUrl + 'charge/list/' + time, {params : this.parameters });
  }

  editCharge(data) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(environment.weatherUrl + 'charge/edit', data, {params : this.parameters });
  }

  downloadWeather(idTypeWeather): Observable<any>  {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.weatherUrl + 'download/' + idTypeWeather, {params : this.parameters });
  }

  validateWeather(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(environment.weatherUrl + 'import/validate', data, {params : this.parameters });
  }

  saveWeather(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(environment.weatherUrl + 'import/save', data, {params : this.parameters });
  }

  listWeather(time): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.weatherUrl + 'list/' + time, {params : this.parameters });
  }

  editWeather(data) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(environment.weatherUrl + 'edit', data, {params : this.parameters });
  }

  downloadEnergy(idTypeCharge): Observable<any>  {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.weatherUrl + 'energy/download/' + idTypeCharge, {params : this.parameters });
  }

  validateEnergy(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(environment.weatherUrl + 'import/validate', data, {params : this.parameters });
  }

  saveEnergy(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(environment.weatherUrl + 'import/save', data, {params : this.parameters });
  }

  listEnergy(time): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.weatherUrl + 'energy/list/' + time, {params : this.parameters });
  }

  editEnergy(data) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(environment.weatherUrl + 'energy/edit', data, {params : this.parameters });
  }

  getProduct(idProduct: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.marketUrl + 'product/get/' + idProduct, {params : this.parameters });
  }

  getClient(idClient: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.marketUrl + 'client/get/' + idClient, {params : this.parameters });
  }

  getPlant(idPlant): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.marketUrl + 'plant/get/' + idPlant, {params : this.parameters });
  }

  getPlants(option: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.marketUrl + 'plant/list/' + option, {params : this.parameters });
  }

  getInvoices(option: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.marketUrl + 'invoice/list/' + option, {params : this.parameters });
  }

  getCreditNotes(option: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.marketUrl + 'creditNote/list/' + option, {params : this.parameters });
  }

  getDebitNotes(option: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.marketUrl + 'debitNote/list/' + option, {params : this.parameters });
  }

  getPmls(data: any): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(environment.pmlUrl + 'list', data, {params : this.parameters });
  }

  getPlantBranches(idPlant: string): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.marketUrl + 'plantBranchOffice/list/' + idPlant, {params : this.parameters });
  }

  getBranchOfficeInvoiceSeries(): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.marketUrl + 'branchOfficeInvoiceSerie/list', {params : this.parameters });
  }

  saveBranchOfficeInvoiceSerie(branchOfficeInvoiceSerie: BranchOfficeInvoiceSerie): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(environment.marketUrl + 'branchOfficeInvoiceSerie/save', branchOfficeInvoiceSerie, {params : this.parameters });
  }

  getBranchOfficeCreditNoteSeries(): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.marketUrl + 'branchOfficeCreditNoteSerie/list', {params : this.parameters });
  }

  saveBranchOfficeCreditNoteSerie(branchOfficeCreditNoteSerie: BranchOfficeCreditNoteSerie): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(environment.marketUrl + 'branchOfficeCreditNoteSerie/save', branchOfficeCreditNoteSerie, {params : this.parameters });
  }

  getProductsByClient(idClient): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.marketUrl + 'product/list/client/' + idClient, {params : this.parameters });
  }

  getFinalcialIndexes(data: any): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(environment.marketUrl + 'financialIndex/list', data, {params : this.parameters });
  }

  getInpp(data: any): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(environment.marketUrl + 'inpp/list', data, {params : this.parameters });
  }

  getUsppi(data: any): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(environment.marketUrl + 'usppi/list', data, {params : this.parameters });
  }

  getModelMarket(time): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.mmmercadoUrl + 'prediction/planning/' + time, {params : this.parameters });
  }

  getResultadosCenace(time): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.mmmercadoUrl + 'resulted/planning/' + time, {params : this.parameters });
  }

  saveModelMarket(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(environment.mmmercadoUrl + 'prediction/updaterow', data, {params : this.parameters });
  }

  terminaPlannig(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.mmmercadoUrl + 'planning/termina/' + data, {params : this.parameters });
  }

  downloadModelMarket(time): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.mmmercadoUrl + 'download/' + time, {params : this.parameters });
  }

  downloadInvoice(id: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.marketUrl + 'invoice/download/' + id, {params : this.parameters });
  }

  getConfigWeather(): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.weatherUrl + 'config/', {params : this.parameters });
  }

  getConfigCharge(): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.weatherUrl + 'charge/config/', {params : this.parameters });
  }
}
