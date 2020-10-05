import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PerfilComboService} from '../../../core/services/perfil-combo.service';
import {GlobalService} from '../../../core/globals/global.service';
import {EfhService} from '../../../core/services/efh.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {EfhUploadComponent} from '../efh-upload.component';
import {EventService} from '../../../core/services/event.service';
import {EventMessage} from '../../../core/models/EventMessage';
import {EventBlocked} from '../../../core/models/EventBlocked';
import { IncidentService } from '../../../bits/services/incident.service';

@Component({
  selector: 'app-efh-upload-common',
  templateUrl: './efh-upload-common.component.html',
  styleUrls: ['./efh-upload-common.component.scss']
})
export class EfhUploadCommonComponent implements OnInit {
  @Input() inAccion: string;
  @Input() inIdEventConfig: number;
  @Input() typeDocument: number;
  @Input() inTypeConfig: number;
  formGroup: FormGroup;
  isdisabled: boolean = false;

  file: any;
  fileName: any;
  valid: boolean = false;
  progress;
  selectedFiles: FileList;
  currentFile: File;
  dataFileSubmit = {};

  constructor(private fb: FormBuilder,
              private efhService: EfhService,
              public  toastr: ToastrManager,
              private cd: ChangeDetectorRef,
              private eventService: EventService,
              public globalService: GlobalService
		          ,public incidentService : IncidentService
  ) {}

  ngOnInit() {
    if (this.inAccion === 'ver') {
      this.isdisabled = true;
    }
    this.formGroup = this.fb.group({
      file: [null, Validators.required]
    });
  }

  selectFile(event) {
    if (!this.isdisabled) {
        this.selectedFiles = event.target.files;
    }
  }

  upload() {
    let fileReader = new FileReader();
    this.currentFile = this.selectedFiles.item(0);
    this.addBlock(1, 'Guardando archivo...');

    fileReader.onloadend = (e) => {
        if (this.inTypeConfig === 1) {
            this.dataFileSubmit['eventConfigId'] = this.inIdEventConfig;
        } else if (this.inTypeConfig === 2) {
            this.dataFileSubmit['idindicatorconfig'] = this.inIdEventConfig;
        }
        this.dataFileSubmit['fileName'] = this.currentFile.name;
        this.dataFileSubmit['fileType'] = this.currentFile.name.substr(this.currentFile.name.lastIndexOf('.') + 1);
        this.dataFileSubmit['fileContentType'] = this.currentFile.type;
        this.dataFileSubmit['fileSize'] = this.currentFile.size;
        this.dataFileSubmit['fileData'] = fileReader.result;
        this.dataFileSubmit['fileData'] = this.dataFileSubmit['fileData'].replace(/^data:(.*;base64,)?/, '');
        this.dataFileSubmit['fileData'] = this.dataFileSubmit['fileData'].trim();
        let temServiceUpload = "efhService";
        switch (this.inTypeConfig) {
          case 3:
            temServiceUpload = "incidentService";
            break;
          default:
            temServiceUpload = "efhService";
            break;
        }
        //this.efhService.upload(this.inTypeConfig, this.dataFileSubmit);
        this[temServiceUpload].upload(this.inTypeConfig, this.dataFileSubmit).subscribe(
            respuesta => {
                this.toastr.successToastr('Documento guardado con éxito.', '¡Se ha logrado!');
                this.efhService.accion.next('upload');
            },
            error => {
                this.addBlock(2, null);
            }).add(() => {
            this.addBlock(2, null);
        });
    }
    fileReader.readAsDataURL(this.currentFile);
  }

  private addBlock(type, msg): void {
      this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
  }
}
