import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EventService } from 'src/app/core/services/event.service';
import { MonitoringService } from 'src/app/safe/services/monitoring.service';
import { Constants } from 'src/app/core/globals/Constants';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { FtpConnection } from 'src/app/safe/models/FtpConnection'
import { Entity } from 'src/app/core/models/Entity';

@Component({
  selector: 'app-monitoringJobs',
  templateUrl: './monitoringJobs.component.html',
  styleUrls: ['./monitoringJobs.component.scss']
})

export class MonitoringJobsComponent implements OnInit {
 
  entity: Entity;

  loading: boolean;
  colsFtpConnection: any[];
  cols: any[];

  filterBtn = { label: "buscar" };
  rowsPorPage = [50, 100, 250, 500];

  ftpConnections:Array<any>;
  historyExcecutedJobs:Array<any>;
  


  constructor(public globalService: GlobalService,
    private eventService: EventService,
    private monitoringService : MonitoringService,
    private toastr: ToastrManager) { }

  ngOnInit() {

    this.cols = [
      'id',
      'applicationName',
      'monthly',
      'status',
      'user',
      'date',
      'details'
    ];
    
    this.colsFtpConnection = [
      'idFtp',
      'applicationName',
      'type',
      'host',
      'port',
      'user',
      'password',
      'retrievePath',
      'putPath',
      'folderBase',
      'active',
      'repeatTimes',
      'waitTime',
      'userUpdated',
      'dateUpdated',
      'ver',
      'modificar'
    ];

    this.getAllFtpConnections();

    this.getHistoryExcecutedJobs();

    this.loading = false;
    
  }


  private getAllFtpConnections() {
    this.monitoringService.getAllFtpConnections()
      .subscribe(
        data => {
          this.ftpConnections = data;
          console.log(this.ftpConnections);
          
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
        });
  }

  private getHistoryExcecutedJobs() {
    this.monitoringService.getHistoryExcecutedJobs()
      .subscribe(
        data => {
          this.historyExcecutedJobs = data;
          console.log(this.historyExcecutedJobs);
          
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
        });
  }

  action(ftpConnection: FtpConnection, option: number) {
    switch (option) {
      case 2:  //Ver
        this.eventService.sendMainSafe(new
          EventMessage(402, { readOnly: true, edit: false, new: false, ftpConnection: ftpConnection }));
        break;
      case 3: //Editar
        this.eventService.sendMainSafe(new
          EventMessage(402, { readOnly: false, edit: true, new: false, ftpConnection: ftpConnection }));
        break;
     
    }
  }


  action2(historyExcecutedJobs: any) {
    //Ver detalle
    this.eventService.sendMainSafe(new
    EventMessage(403, { readOnly: false, edit: true, new: false, historyExcecutedJobs: historyExcecutedJobs }));
  }

  executeProcess(applicationName: string, isMonthly: boolean){
    this.monitoringService.executeProcess(applicationName, isMonthly).subscribe(
      data => {
        console.log(data);
        this.toastr.successToastr('Ejecutando proceso ' + (isMonthly ? 'Mensual' : 'Diario') + ' para: '+applicationName, 'Ejecución lanzada con éxito.');
      },
      errorData => {
        this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
      });
  }
}
