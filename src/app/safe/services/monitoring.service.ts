import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FtpConnection } from '../models/FtpConnection';
import {GlobalService} from '../../core/globals/global.service';

@Injectable({ providedIn: 'root' })
export class MonitoringService {

  parameters: any;
  constructor(private http: HttpClient,
              private globalService: GlobalService) {
  }

  //Operaciones de la configuración
  getAllFtpConnections(): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.ftpconsumerUrl + 'configuration/getAll', {params : this.parameters });
  }

  getFtpConnection(idFtp: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.ftpconsumerUrl + 'configuration/get/' + idFtp, {params : this.parameters });
  }

  saveFtpConnection(ftpConnection: FtpConnection): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(environment.ftpconsumerUrl + 'configuration/save', ftpConnection, {params : this.parameters });
  }


  //Monitoreo
  getHistoryExcecutedJobs(): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.ftpconsumerUrl + 'monitoring/getAll/', {params : this.parameters });
  }

  //Detalle
  getDetailJobs(idFtpMonitoring: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(environment.ftpconsumerUrl + 'monitoring/detail/get/' + idFtpMonitoring, {params : this.parameters });
  }

  //Ejecucion de procesos
  executeProcess(applicationName: string, isMonthly: boolean ): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    let url = environment.ftpconsumerUrl +'executeProcess/'+applicationName+'/'+isMonthly;
    //alert(url);
    return this.http.get( url , {params : this.parameters });
  }


}
