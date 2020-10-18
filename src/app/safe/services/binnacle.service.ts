import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../../core/globals/global.service';
import {BinnacleEventConfigurationDTO} from '../models/binnacle-event-configuration-dto';
import {BinnacleEventDTO} from '../models/binnacle-event-dto';
import {ContainerClasificaDTO} from '../models/container-clasifica-dto';
import {BearerDTO} from '../models/bearer-dto';
import {NoteDTO} from '../models/note-dto';
import {SpliceDTO} from '../models/splice-dto';
import { EPs } from 'src/app/core/globals/endpoints';

@Injectable({
  providedIn: 'root'
})
export class BinnacleService {
  parameters: any;
  constructor(private http: HttpClient,
              private globalService: GlobalService) {
  }

  saveBinnacle(binnacle: BinnacleEventDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ EPs.binnacle.save.binnacle.id }`, binnacle, {params : this.parameters });
  }

  updateBinnacleConfiguration(binnacle: BinnacleEventConfigurationDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ EPs.binnacle.update.binnacle.configuration }`, binnacle, {params : this.parameters });
  }

  saveBinnacleConfiguration(binnacle: BinnacleEventConfigurationDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ EPs.binnacle.save.binnacle.configuration }`, binnacle, {params : this.parameters });
  }

  downloadExcel(year: number, month: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.binnacle.download.id + year + '/' + month, {params : this.parameters });
  }

  downloadBinnacleReal(year: number, month: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.binnacle.download.binnacle.real + year + '/' + month, {params : this.parameters });
  }


  dowloadSearchEvents(binnacleEventDTO: BinnacleEventDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.binnacle.download.search.filter.events, binnacleEventDTO, {params : this.parameters });
  }

  listTemplates(): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.binnacle.configuration.list, {params : this.parameters });
  }

  obtenTemplate(eventsClassificationId: number, eventsId: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(`${ EPs.binnacle.template }${eventsClassificationId}/${eventsId}`, {params : this.parameters });
  }

  uploadZip(year: number, month: number, data): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.binnacle.upload.zip + year + '/' + month, data, {params : this.parameters });
  }

  downloadZipCenace(year: number, month: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.binnacle.download.zip.cenance + year + '/' + month, {params : this.parameters });
  }

  eventsBetween(timeInit: number, timeEnd: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.binnacle.event.between + timeInit + '/' + timeEnd, {params : this.parameters });
  }

  eventsSearch(binnacleEventDTO: BinnacleEventDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.binnacle.search.filter.events, binnacleEventDTO, {params : this.parameters });
  }

  searchEvents(searchText: string): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.binnacle.search.events + searchText, {params : this.parameters });
  }

  deleteBinnacleEvent(event: BinnacleEventDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.binnacle.event.delete, event, {params : this.parameters });
  }

  changeStatus(binnacleEventDTO: BinnacleEventDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.post(EPs.binnacle.change.status, binnacleEventDTO, {params : this.parameters });
  }
  deleteEventConfiguration(binnacleEventConfigurationId: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant();
    return this.http.get(EPs.binnacle.delete.id + binnacleEventConfigurationId, {params : this.parameters });
  }

  setAssociate(container: ContainerClasificaDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ EPs.binnacle.configure.associated }`, container, {params : this.parameters });
  }

  deleteFile(bearer: BearerDTO) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ EPs.binnacle.delete.bearer }`, bearer, {params : this.parameters });
  }

  obtenSupports(binnacleEventId: number) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ EPs.binnacle.get.support }${binnacleEventId}`, {params : this.parameters });
  }

  updateNote(noteDTO: NoteDTO) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ EPs.binnacle.update.note }`, noteDTO, {params : this.parameters });
  }
  deleteNote(noteDTO: NoteDTO) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ EPs.binnacle.delete.note }`, noteDTO, {params : this.parameters });
  }

  obtenSplices(eventsClassificationId: number) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ EPs.binnacle.get.splice }` + eventsClassificationId, {params : this.parameters });
  }
  saveSplice(splice: SpliceDTO) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ EPs.binnacle.save.splice }`, splice, {params : this.parameters });
  }
  deleteSplice(splice: SpliceDTO) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ EPs.binnacle.delete.splice }`, splice, {params : this.parameters });
  }
}
