import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EventService } from 'src/app/core/services/event.service';
import { MonitoringService } from 'src/app/safe/services/monitoring.service';
import { Constants } from 'src/app/core/globals/Constants';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { FtpConnection } from 'src/app/safe/models/FtpConnection'
import { Opciontmp } from 'src/app/safe/models/opciontmp'

import { Entity } from 'src/app/core/models/Entity';
import { CatalogOrderGeneric } from 'src/app/core/models/CatalogOrderGeneric';

@Component({
  selector: 'app-monitoringJobsEdit',
  templateUrl: './monitoringJobsEdit.component.html',
  styleUrls: ['./monitoringJobsEdit.component.scss']
})

export class MonitoringJobsEditComponent implements OnInit {
  ftpConnectionForm: FormGroup;
  entity: Entity;
  idFtp:  number;
  ftpConnection: FtpConnection;
  ftpConnectionSelected: FtpConnection;
  loading: boolean;
  colsConnection: any[];
  cols: any[];

  filterBtn = { label: "buscar" }; 
  rowsPorPage = [50, 100, 250, 500];
  ftpConnections:Array<any>;
  historyExcecutedJobs:Array<any>;
  
  applicationNames: Array<Opciontmp> ;
  types: Array<Opciontmp> ;

  constructor(public globalService: GlobalService,
    private eventService: EventService,
    private monitoringService : MonitoringService,
    private toastr: ToastrManager,
    private fb: FormBuilder,) { }
 
  ngOnInit() {
    this.applicationNames = new Array<Opciontmp>();
    this.applicationNames.push(new Opciontmp('FILEZILLA','FILEZILLA'))
    this.applicationNames.push(new Opciontmp('CTUNG','CTUNG'))

    this.types = new Array<Opciontmp>();
    this.types.push(new Opciontmp('DOWNLOAD','DOWNLOAD'))
    this.types.push(new Opciontmp('UPLOAD','UPLOAD'))

    this.ftpConnectionForm = this.fb.group({
      'idFtp': new FormControl('', Validators.required),
      'applicationName': new FormControl('', Validators.required),
      'type': new FormControl('', Validators.required),
      'host': new FormControl('', Validators.required),
      'port': new FormControl('', Validators.required),
      'userFtp': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'retrievePath': new FormControl('', Validators.required),
      'putPath': new FormControl('', Validators.required),
      'folderBase': new FormControl('', Validators.required),
      'active': new FormControl(false),
      'repeatTimes': new FormControl('', Validators.required),
      'waitTime': new FormControl('', Validators.required),
      
    });

    if (this.entity.readOnly) {
      this.setData(1);
    } else if (this.entity.edit) {
      this.setData(2);
    } else {
      this.ftpConnection = {} as FtpConnection;
    }
    
  }

  getTitle() {
    return ((this.entity.readOnly) ?
      "Consultar " : (this.entity.edit) ? "Editar " : "Agregar ") + "Conexión FTP";
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.code === o2.code && o1.id === o2.id;
  }

  setData(option: number) {
    this.monitoringService.getFtpConnection(this.idFtp)
      .subscribe(
        data => {
          this.ftpConnectionSelected = data;
          this.ftpConnectionForm.patchValue(this.ftpConnectionSelected);
          if (option == 1) {
            this.ftpConnectionForm.disable();
          }
        },
        errorData => {
          console.log(errorData);
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Conexión FTP');
        });
  }

  save(value) {
    console.log(value);
    this.ftpConnection = value;
    this.ftpConnection.idFtp = (this.ftpConnectionSelected !== null && this.ftpConnectionSelected !== undefined &&
      this.ftpConnectionSelected.idFtp !== null && this.ftpConnectionSelected.idFtp !== undefined
    ) ? this.ftpConnectionSelected.idFtp : 0;
    this.monitoringService.saveFtpConnection(this.ftpConnection)
      .subscribe(
        data => {
          this.eventService.sendMainSafe(new EventMessage(401, null));
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_SAVE, 'Lo siento,');
        });
  }

  back(){
    this.eventService.sendMainSafe(new EventMessage(401, null));
  }
 
}
