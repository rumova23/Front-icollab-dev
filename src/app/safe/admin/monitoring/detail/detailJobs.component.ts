import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EventService } from 'src/app/core/services/event.service';
import { MonitoringService } from 'src/app/safe/services/monitoring.service';
import { Constants } from 'src/app/core/globals/Constants';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { Entity } from 'src/app/core/models/Entity';

@Component({
  selector: 'app-detailJobs',
  templateUrl: './detailJobs.component.html',
  styleUrls: ['./detailJobs.component.scss']
})

export class DetailJobsComponent implements OnInit {
  title: String = 'Detalle de ejecución';
  entity: Entity;
  idFtpMonitoring: any;
  fileDetailsDto:any;
  cols: any[];
  filterBtn = { label: "buscar" }; 
  rowsPorPage = [50, 100, 250, 500];
  
  
  constructor(public globalService: GlobalService,
    private eventService: EventService,
    private monitoringService : MonitoringService,
    private toastr: ToastrManager,
    private fb: FormBuilder,) { }
 
  ngOnInit() {
  
    this.cols = [
      'idFtpDetail',
      'fileName',
      'message',
      'putPath',
      'retrievePath',
      'status'
    ];

    console.log(this.entity);    
    this.idFtpMonitoring = this.entity;
    this.setData(this.idFtpMonitoring);
    
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.code === o2.code && o1.id === o2.id;
  }

  setData(idFtpMonitoring: any) {
    this.monitoringService.getDetailJobs(idFtpMonitoring).subscribe(
        data => {
          this.fileDetailsDto = data;
          console.log(this.fileDetailsDto);
        },
        errorData => {
          console.log(errorData);
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Conexión FTP');
        });
  }

  back(){
    this.eventService.sendMainSafe(new EventMessage(401, null));
  }

}
