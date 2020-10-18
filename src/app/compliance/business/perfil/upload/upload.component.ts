import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfilComboService } from 'src/app/core/services/perfil-combo.service';
import { GlobalService } from 'src/app/core/globals/global.service';

@Component({
  selector: 'app-upload',
  template: `
              <div class="container">
                <form [formGroup]="formGroup">
                  <div class="row">
                    <div class="col">
                      Carga de Soportes<br>
                      <app-file-upload formControlName="file" [progress]="progress" (change)="selectFile($event)"></app-file-upload>
                    </div>
                    <div class="col txt-r">
                      <button [disabled]="!selectedFiles" (click)="upload()" class="btn right"
                              [ngClass]="{'myblue': globalService.aguila,'myorange': !globalService.aguila}">
                        <i class="ti-cloud-up"></i>&nbsp;
                        Importar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            `,
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @Input() inTipo: string;
  @Input() inIdEmpleado: number;
  @Input() typeDocument: number;
  @Input() calificacionId: number;
  formGroup: FormGroup;
  isdisabled: boolean = false;

  file: any;
  fileName: any;
  valid: boolean = false;
  progress;
  selectedFiles: FileList;
  currentFile: File;

  constructor(private fb: FormBuilder, private cargar: PerfilComboService, private cd: ChangeDetectorRef, public globalService: GlobalService) {
  }

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
    this.cargar.upload(this.currentFile, this.calificacionId, this.typeDocument).subscribe(
        respuesta => {
          console.log('llego');
        });
    this.cargar.accion.next('upload');
  }
}
