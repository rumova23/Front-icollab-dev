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
    return this.http.get(environment.ftpconsumerUrl + 'configuration/getAll');
  }

  getFtpConnection(idFtp: number): Observable<any> {
    return this.http.get(environment.ftpconsumerUrl + 'configuration/get/' + idFtp);
  }

  saveFtpConnection(ftpConnection: FtpConnection): Observable<any> {
    return this.http.post(environment.ftpconsumerUrl + 'configuration/save', ftpConnection);
  }


  //Monitoreo
  getHistoryExcecutedJobs(): Observable<any> {
    return this.http.get(environment.ftpconsumerUrl + 'monitoring/getAll/');
  }

  //Detalle
  getDetailJobs(idFtpMonitoring: number): Observable<any> {
    return this.http.get(environment.ftpconsumerUrl + 'monitoring/detail/get/' + idFtpMonitoring);
  }

  //Ejecucion de procesos
  executeProcess(applicationName: string, isMonthly: boolean ): Observable<any> {
    let url = environment.ftpconsumerUrl +'executeProcess/'+applicationName+'/'+isMonthly;
    //alert(url);
    return this.http.get( url );
  }


}
