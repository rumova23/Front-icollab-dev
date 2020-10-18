import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FtpConnection } from '../models/FtpConnection';
import {GlobalService} from '../../core/globals/global.service';
import { EPs } from 'src/app/core/globals/endpoints';

@Injectable({ providedIn: 'root' })
export class MonitoringService {

  parameters: any;
  constructor(private http: HttpClient,
              private globalService: GlobalService) {
  }

  //Operaciones de la configuración
  getAllFtpConnections(): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( EPs.ftpconsumer.configuration.all, {params : this.parameters });
  }

  getFtpConnection(idFtp: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( EPs.ftpconsumer.configuration.get + idFtp, {params : this.parameters });
  }

  saveFtpConnection(ftpConnection: FtpConnection): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( EPs.ftpconsumer.configuration.save, ftpConnection, {params : this.parameters });
  }


  //Monitoreo
  getHistoryExcecutedJobs(): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( EPs.ftpconsumer.monitoring.all, {params : this.parameters });
  }

  //Detalle
  getDetailJobs(idFtpMonitoring: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( EPs.ftpconsumer.monitoring.detail.get + idFtpMonitoring, {params : this.parameters });
  }

  executeProcessYearMonth(applicationName: string, year: number, month: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( EPs.ftpconsumer.executeProcess.month + applicationName + '/' + year + '/' + month, {params : this.parameters });
  }

  executeProcess(applicationName: string, isMonthy: boolean): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( EPs.ftpconsumer.executeProcess.id + applicationName + '/' + isMonthy, {params : this.parameters });
  }
}
