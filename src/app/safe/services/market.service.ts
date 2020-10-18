import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { Client } from '../models/Client';
import { Plant } from 'src/app/security/models/Plant';
import { BranchOfficeInvoiceSerie } from '../models/BranchOfficeInvoiceSerie';
import { Invoice } from '../models/Invoice';
import { CreditNote } from '../models/CreditNote';
import { DebitNote } from '../models/DebitNote';
import { BranchOfficeCreditNoteSerie } from '../models/BranchOfficeCreditNoteSerie';
import { GlobalService } from '../../core/globals/global.service';
import { EPs } from 'src/app/core/globals/endpoints';

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
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.market.product.list.all + option, { params: this.parameters });
  }

  getClients(option: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.market.client.list.all + option, { params: this.parameters });
  }

  saveProduct(product: Product): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.market.product.save, product, { params: this.parameters });
  }

  saveClient(client: Client): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.market.client.save, client, { params: this.parameters });
  }

  savePlant(plant: Plant): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.market.plant.save, plant, { params: this.parameters });
  }

  saveInvoice(invoice: Invoice): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.market.invoice.save, invoice, { params: this.parameters });
  }

  saveCreditNote(invoice: CreditNote): Observable<any> {
    return this.http.post(EPs.market.creditNote.save, invoice, { params: this.parameters });
  }

  saveDebitNote(invoice: DebitNote): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.market.debitNote.save, invoice, { params: this.parameters });
  }

  saveFuecd(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.fuecd.save, data, { params: this.parameters });
  }

  changeStatusInvoiseFacturado(idSettlementInvoise: number, invoiseId: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(EPs.fuecd.status.invoice + idSettlementInvoise + '/' + invoiseId, { params: this.parameters });
  }

  aceptaFuecd(fuecd: string, estatus: string): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.fuecd.changeStatus + fuecd + '/' + estatus, { params: this.parameters });
  }

  saveFuecdInvoice(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.market.invoice.fuecd, data, { params: this.parameters });
  }

  getInvoice(id): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.market.invoice.get + id, { params: this.parameters });
  }

  getCreditNote(id): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.market.creditNote.get + id, { params: this.parameters });
  }

  getDebitNote(id): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.market.debitNote.get + id, { params: this.parameters });
  }

  getFufs(fuecd): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.fuecd.list.fuf + fuecd, { params: this.parameters });
  }

  getFuecd(id: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.fuecd.get + id, { params: this.parameters });
  }

  filterFuecdByDate(campoDate: string, timeIni: number, timeFin: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.fuecd.list.fuecd + campoDate + '/' + timeIni + '/' + timeFin, { params: this.parameters });
  }

  filterAccountFuecd(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.fuecd.account.key, data, { params: this.parameters });
  }

  validateFuecd(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.fuecd.validate, data, { params: this.parameters });
  }
  validateProposalAccepted(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.mmmarket.validate.id, data, { params: this.parameters });
  }

  validateProposalAcceptedMTR(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.mmmarket.validate.mtr.cenace, data, { params: this.parameters });
  }

  validateMTR(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.mmmarket.validate.MTR, data, { params: this.parameters });
  }
  downloadCharge(idTypeCharge): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.weather.change.download + idTypeCharge, { params: this.parameters });
  }

  validateCharge(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.weather.import.validate, data, { params: this.parameters });
  }

  saveCharge(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.weather.import.save, data, { params: this.parameters });
  }

  listCharge(time): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.weather.change.list + time, { params: this.parameters });
  }

  editCharge(data) {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.weather.change.edit, data, { params: this.parameters });
  }

  downloadWeather(idTypeWeather): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.weather.download + idTypeWeather, { params: this.parameters });
  }

  validateWeather(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.weather.import.validate, data, { params: this.parameters });
  }

  saveWeather(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.weather.import.save, data, { params: this.parameters });
  }

  listWeather(time): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.weather.list + time, { params: this.parameters });
  }

  editWeather(data) {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.weather.edit, data, { params: this.parameters });
  }

  downloadEnergy(idTypeCharge): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.weather.energy.download + idTypeCharge, { params: this.parameters });
  }

  validateEnergy(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.weather.import.validate, data, { params: this.parameters });
  }

  saveEnergy(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.weather.import.save, data, { params: this.parameters });
  }

  listEnergy(time): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.weather.energy.list + time, { params: this.parameters });
  }

  editEnergy(data) {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.weather.energy.edit, data, { params: this.parameters });
  }

  getProduct(idProduct: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.market.product.get + idProduct, { params: this.parameters });
  }

  getClient(idClient: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.market.client.get + idClient, { params: this.parameters });
  }

  comboOrigenDocumento() {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get(`${EPs.mastercatalog.mastercatalog.origin} Documento`, { params: this.parameters });
  }

  obtenEntidadEstatus(entidad: string, estatus: string) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(`${EPs.statusMaster.status}${entidad}/${estatus}`, { params: this.parameters });
  }

  getPlant(idPlant): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.market.plant.get + idPlant, { params: this.parameters });
  }

  getPlants(option: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.market.plant.list.all + option, { params: this.parameters });
  }

  getInvoices(option: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.market.invoice.list.all + option, { params: this.parameters });
  }

  getCreditNotes(option: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.market.creditNote.list.all + option, { params: this.parameters });
  }

  getDebitNotes(option: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.market.debitNote.list.all + option, { params: this.parameters });
  }

  getPmls(data: any): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.pml.list, data, { params: this.parameters });
  }

  getPlantBranches(idPlant: string): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.market.plantBranchOffice.list.all + idPlant, { params: this.parameters });
  }

  getBranchOfficeInvoiceSeries(): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.market.branchOfficeInvoiceSerie.list.all, { params: this.parameters });
  }

  saveBranchOfficeInvoiceSerie(branchOfficeInvoiceSerie: BranchOfficeInvoiceSerie): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.market.branchOfficeInvoiceSerie.save, branchOfficeInvoiceSerie, { params: this.parameters });
  }

  getBranchOfficeCreditNoteSeries(): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.market.branchOfficeCreditNoteSerie.list.all, { params: this.parameters });
  }

  saveBranchOfficeCreditNoteSerie(branchOfficeCreditNoteSerie: BranchOfficeCreditNoteSerie): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.market.branchOfficeCreditNoteSerie.save, branchOfficeCreditNoteSerie, { params: this.parameters });
  }

  getProductsByClient(idClient): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.market.product.list.client + idClient, { params: this.parameters });
  }

  getFinalcialIndexes(data: any): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.market.financialIndex.list.all, data, { params: this.parameters });
  }

  getInpp(data: any): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.market.inpp.list.all, data, { params: this.parameters });
  }

  getUsppi(data: any): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.market.usppi.list.all + 'usppi/list', data, { params: this.parameters });
  }

  getModelMarketMTR(time): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.mmmarket.planning.mtr + time, { params: this.parameters });
  }

  getModelMarket(time): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.mmmarket.prediction.planning + time, { params: this.parameters });
  }

  getModelMarketResultadosCenace(time): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.mmmarket.planning.cenace + time, { params: this.parameters });
  }

  getModelMarketResultadosMTRCenace(time): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.mmmarket.planning.mtr.cenace.id + time, { params: this.parameters });
  }

  getModelMarketAccept(time): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.mmmarket.planning.accept + time, { params: this.parameters });
  }

  getModelMarketAcceptMtr(time): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.mmmarket.planning.mtr.accept + time, { params: this.parameters });
  }

  getResultadosCenace(time): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.mmmarket.resulted.planning + time, { params: this.parameters });
  }

  saveModelMarket(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.mmmarket.prediction.updaterow, data, { params: this.parameters });
  }

  terminaPlannig(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.mmmarket.planning.completion + 'planning/termina/' + data, { params: this.parameters });
  }

  terminaPlannigMtr(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.mmmarket.planning.mtr.completion + data, { params: this.parameters });
  }
  solicitaReactivarPlannig(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.mmmarket.planning.apply.activate, data, { params: this.parameters });
  }
  solicitaReactivarPlannigMTR(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.mmmarket.planning.mtr.apply.activate, data, { params: this.parameters });
  }

  solicitaReactivarPlannigMTRCenace(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.mmmarket.planning.mtr.cenace.apply.activate, data, { params: this.parameters });
  }

  reactivarPlannig(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.mmmarket.planning.activate + data, { params: this.parameters });
  }

  reactivarPlannigMtr(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.mmmarket.planning.mtr.activate + data, { params: this.parameters });
  }

  reactivarPlannigMtrCenace(data): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.mmmarket.planning.mtr.cenace.activate + data, { params: this.parameters });
  }

  downloadModelMarket(time): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.mmmarket.download.id + time, { params: this.parameters });
  }

  downloadModelMarketMtr(time): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.mmmarket.download.mtr + time, { params: this.parameters });
  }

  getComentariosPlanning(time): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.mmmarket.planning.comments + time, { params: this.parameters });
  }

  getComentariosPlanningMtr(time): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.mmmarket.planning.mtr.comments + time, { params: this.parameters });
  }

  getComentariosPlanningMtrCenace(time): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.mmmarket.planning.mtr.cenace.comments + time, { params: this.parameters });
  }

  downloadInvoice(id: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.market.invoice.download + id, { params: this.parameters });
  }

  downloadCreditNote(id: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.market.creditNote.download + id, { params: this.parameters });
  }

  downloadDebitNote(id: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.market.debitNote.download + id, { params: this.parameters });
  }

  getConfigWeather(): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.weather.config, { params: this.parameters });
  }

  getConfigCharge(): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.weather.change.config, { params: this.parameters });
  }
}
