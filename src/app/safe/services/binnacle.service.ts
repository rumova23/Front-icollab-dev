import { Injectable } from '@angular/core';
import {MaestroDTO} from '../../compliance/models/maestro-dto';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../../core/globals/global.service';
import {BinnacleDTO} from '../models/binnacle-dto';
import {BinnacleEventConfigurationDTO} from '../models/binnacle-event-configuration-dto';
import {BinnacleEventDTO} from '../models/binnacle-event-dto';
import {ContainerClasificaDTO} from '../models/container-clasifica-dto';
import {BearerDTO} from '../models/bearer-dto';
import {NoteDTO} from '../models/note-dto';
import {SpliceDTO} from '../models/splice-dto';

@Injectable({
  providedIn: 'root'
})
export class BinnacleService {
  private binnacle = environment.binnacle;
  parameters: any;
  constructor(private http: HttpClient,
              private globalService: GlobalService) {
  }

  saveBinnacle(binnacle: BinnacleEventDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.binnacle }binnacle/save/binnacle`, binnacle, {params : this.parameters });
  }

  updateBinnacleConfiguration(binnacle: BinnacleEventConfigurationDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.binnacle }binnacle/update/binnacle/configuration`, binnacle, {params : this.parameters });
  }

  saveBinnacleConfiguration(binnacle: BinnacleEventConfigurationDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.binnacle }binnacle/save/binnacle/configuration`, binnacle, {params : this.parameters });
  }

  downloadExcel(year: number, month: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(this.binnacle + 'binnacle/download/' + year + '/' + month, {params : this.parameters });
  }

  downloadBinnacleReal(year: number, month: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(this.binnacle + 'binnacle/download/binnacle/real/' + year + '/' + month, {params : this.parameters });
  }

  listTemplates(): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(this.binnacle + 'binnacle/configuration/list', {params : this.parameters });
  }

  obtenTemplate(eventsClassificationId: number, eventsId: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(`${ this.binnacle }binnacle/template/${eventsClassificationId}/${eventsId}`, {params : this.parameters });
  }

  uploadZip(year: number, month: number, data): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(environment.binnacle + 'binnacle/upload/zip/' + year + '/' + month, data, {params : this.parameters });
  }

  downloadZipCenace(year: number, month: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(this.binnacle + 'binnacle/download/zip/cenance/' + year + '/' + month, {params : this.parameters });
  }

  eventsBetween(timeInit: number, timeEnd: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(this.binnacle + 'binnacle/events/between/' + timeInit + '/' + timeEnd, {params : this.parameters });
  }

  eventsSearch(binnacleEventDTO: BinnacleEventDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(this.binnacle + 'binnacle/search/filter/events', binnacleEventDTO, {params : this.parameters });
  }

  searchEvents(searchText: string): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(this.binnacle + 'binnacle/search/events/' + searchText, {params : this.parameters });
  }

  deleteBinnacleEvent(event: BinnacleEventDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(this.binnacle + 'binnacle/events/delete', event, {params : this.parameters });
  }

  changeStatus(statusName: string, binnacleEventId: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(this.binnacle + 'binnacle/change/status/' + statusName + '/' + binnacleEventId, {params : this.parameters });
  }
  deleteEventConfiguration(binnacleEventConfigurationId: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(this.binnacle + 'binnacle/delete/' + binnacleEventConfigurationId, {params : this.parameters });
  }

  setAssociate(container: ContainerClasificaDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.binnacle }binnacle/configure/associated`, container, {params : this.parameters });
  }

  deleteFile(bearer: BearerDTO) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.binnacle }binnacle/delete/bearer`, bearer, {params : this.parameters });
  }

  obtenSupports(binnacleEventId: number) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.binnacle }binnacle/obten/support/${binnacleEventId}`, {params : this.parameters });
  }

  updateNote(noteDTO: NoteDTO) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.binnacle }binnacle/update/note`, noteDTO, {params : this.parameters });
  }
  deleteNote(noteDTO: NoteDTO) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.binnacle }binnacle/delete/note`, noteDTO, {params : this.parameters });
  }

  obtenSplices(eventsClassificationId: number) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.binnacle }binnacle/obten/splices/` + eventsClassificationId, {params : this.parameters });
  }
  saveSplice(splice: SpliceDTO) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.binnacle }binnacle/save/splice`, splice, {params : this.parameters });
  }
  deleteSplice(splice: SpliceDTO) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.binnacle }binnacle/delete/splice`, splice, {params : this.parameters });
  }
}
