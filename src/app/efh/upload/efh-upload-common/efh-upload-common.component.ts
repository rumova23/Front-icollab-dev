import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PerfilComboService} from '../../../core/services/perfil-combo.service';
import {GlobalService} from '../../../core/globals/global.service';
import {EfhService} from '../../../core/services/efh.service';

@Component({
  selector: 'app-efh-upload-common',
  templateUrl: './efh-upload-common.component.html',
  styleUrls: ['./efh-upload-common.component.scss']
})
export class EfhUploadCommonComponent implements OnInit {
  @Input() inTipo: string;
  @Input() inIdEventConfig: number;
  @Input() typeDocument: number;
  formGroup: FormGroup;
  isdisabled: boolean = false;

  file: any;
  fileName: any;
  valid: boolean = false;
  progress;
  selectedFiles: FileList;
  currentFile: File;

  constructor(private fb: FormBuilder, private efhService: EfhService, private cd: ChangeDetectorRef, public globalService: GlobalService) { }

  ngOnInit() {
    if (this.inTipo === 'ver') {
      this.isdisabled = true;
    }
    this.formGroup = this.fb.group({
      file: [null, Validators.required]
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.currentFile = this.selectedFiles.item(0);
    this.efhService.upload(this.currentFile, this.inIdEventConfig, this.typeDocument).subscribe(
        respuesta => {
          console.log('llego');
        });
    this.efhService.accion.next('upload');
  }

}
