import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EfhService} from '../../../core/services/efh.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {GlobalService} from '../../../core/globals/global.service';
import {PersonalCompetenteService} from '../../services/personal-competente.service';
import {EventMessage} from '../../../core/models/EventMessage';
import {EventBlocked} from '../../../core/models/EventBlocked';
import {EventService} from '../../../core/services/event.service';

@Component({
  selector: 'app-compliance-upload-common',
  templateUrl: './compliance-upload-common.component.html',
  styleUrls: ['./compliance-upload-common.component.scss']
})
export class ComplianceUploadCommonComponent implements OnInit {
  @Input() inAccion: string;
  @Input() inEmployeeId: number;
  @Input() typeDocument: number;
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
              public  toastr: ToastrManager,
              private cd: ChangeDetectorRef,
              public globalService: GlobalService,
              private eventService: EventService,
              private personalCompetenteService: PersonalCompetenteService) {
  }

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
      this.dataFileSubmit['eventConfigId'] = this.inEmployeeId;
      this.dataFileSubmit['fileName'] = this.currentFile.name;
      this.dataFileSubmit['fileType'] = this.currentFile.name.substr(this.currentFile.name.lastIndexOf('.') + 1);
      this.dataFileSubmit['fileContentType'] = this.currentFile.type;
      this.dataFileSubmit['fileSize'] = this.currentFile.size;
      this.dataFileSubmit['fileData'] = fileReader.result;
      this.dataFileSubmit['fileData'] = this.dataFileSubmit['fileData'].replace(/^data:(.*;base64,)?/, '');
      this.dataFileSubmit['fileData'] = this.dataFileSubmit['fileData'].trim();
      this.personalCompetenteService.uploadFile(this.dataFileSubmit).subscribe(
          respuesta => {
            this.toastr.successToastr('Documento guardado con éxito.', '¡Se ha logrado!');
            this.personalCompetenteService.accion.next('upload');
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
