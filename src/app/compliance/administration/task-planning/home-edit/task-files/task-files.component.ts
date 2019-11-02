import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GlobalService} from '../../../../../core/globals/global.service';
import {AdministratorComplianceService} from '../../../services/administrator-compliance.service';

@Component({
  selector: 'app-task-files',
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
                        <mdb-icon far icon="save" class="mr-1"></mdb-icon> Importar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            `,
  styleUrls: ['./task-files.component.scss']
})
export class TaskFilesComponent implements OnInit {
  @Input() typeDocument: number;
  @Input() complianceId: number;

  formGroup: FormGroup;
  progress;
  selectedFiles: FileList;
  currentFile: File;

  constructor(private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              public globalService: GlobalService,
              private administratorComplianceService: AdministratorComplianceService) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      file: [null, Validators.required]
    });
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.currentFile = this.selectedFiles.item(0);
    this.administratorComplianceService.upload(this.currentFile, this.complianceId, this.typeDocument).subscribe(
        respuesta => {
          console.log('exito: archivo guardado');
          this.administratorComplianceService.accion.next('upload');
        });
  }
}
