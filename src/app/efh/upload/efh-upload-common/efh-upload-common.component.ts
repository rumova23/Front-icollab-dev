import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PerfilComboService} from '../../../core/services/perfil-combo.service';
import {GlobalService} from '../../../core/globals/global.service';
import {EfhService} from '../../../core/services/efh.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {EfhUploadComponent} from '../efh-upload.component';

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

  constructor(private fb: FormBuilder, private efhService: EfhService, public  toastr: ToastrManager, private cd: ChangeDetectorRef, public globalService: GlobalService) {
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
        this.efhService.upload(this.inTypeConfig, this.dataFileSubmit).subscribe(
            respuesta => {
                this.toastr.successToastr('Documento guardado con éxito.', '¡Se ha logrado!');
                this.efhService.accion.next('upload');
            });
    }
    fileReader.readAsDataURL(this.currentFile);
  }

}
