import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FtpConnection } from '../models/FtpConnection';

@Injectable({ providedIn: 'root' })
export class MonitoringService {

  constructor(private http: HttpClient) {
  }

  //Operaciones de la configuración
  getAllFtpConnections(): Observable<any> {
    return this.http.get(environment.monitoringUrl + 'configuration/getAll');
  }

  getFtpConnection(idFtp: number): Observable<any> {
    return this.http.get(environment.monitoringUrl + 'configuration/get/' + idFtp);
  }

  saveFtpConnection(ftpConnection: FtpConnection): Observable<any> {
    return this.http.post(environment.monitoringUrl + 'configuration/save', ftpConnection);
  }


  //Monitoreo
  getHistoryExcecutedJobs(): Observable<any> {
    return this.http.get(environment.monitoringUrl + 'monitoring/getAll/');
  }

  //Detalle
  getDetailJobs(idFtpMonitoring: number): Observable<any> {
    return this.http.get(environment.monitoringUrl + 'monitoring/detail/get/' + idFtpMonitoring);
  }

  //Ejecucion de procesos
  executeProcess(applicationName: string, isMonthly: boolean ): Observable<any> {
    let url = environment.monitoringUrl +'executeProcess/'+applicationName+'/'+isMonthly;
    //alert(url);
    return this.http.get( url );
  }


}
