import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GlobalService} from '../../core/globals/global.service';
import {FormBuilder} from '@angular/forms';
import {ToastrManager} from 'ng6-toastr-notifications';
import {Documents} from '../../compliance/models/Documents';
import {CarasDocument} from '../../compliance/models/CarasDocument';
import {PerfilComboService} from '../../core/services/perfil-combo.service';
import {EfhService} from '../../core/services/efh.service';
import {Constants} from '../../core/globals/Constants';
import {ConfirmationDialogService} from '../../core/services/confirmation-dialog.service';
import {EventMessage} from '../../core/models/EventMessage';

@Component({
  selector: 'app-efh-upload',
  templateUrl: './efh-upload.component.html',
  styleUrls: ['./efh-upload.component.scss']
})
export class EfhUploadComponent implements OnInit, OnDestroy {
  @Input() inIdEventConfig: number;
  @Input() inAccion: string;
  @Input() inTypeConfig: number;

  typeDocuments = ['Documentos'];
  titleDocument: Array<any>;
  submitted = false;
  isdisabled = false;
  subscription;

  constructor(public globalService: GlobalService,
              private efhService: EfhService,
              private confirmationDialogService: ConfirmationDialogService,
              public toastr: ToastrManager) {
    this.titleDocument = [];
    this.subscription = this.efhService.accion.subscribe(
          accion => {
              console.log('Accion upload: ' + accion);
              if (accion === 'upload') {
                  this.ngOnInit();
              }
          }
      );
  }

  ngOnInit() {
    this.titleDocument = [];
    console.log('Cargando componente');
    if (this.inAccion === 'ver') {
      this.isdisabled = true;
    }
    this.getDocumentos();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  getDocumentos() {
      for (let i = 0; i < this.typeDocuments.length; i++) {
          let documents: Documents;
          let carasDocumnts: Array<CarasDocument>;
          carasDocumnts =  [];
          this.efhService.getDocuments(this.inTypeConfig, this.inIdEventConfig, this.typeDocuments[i]).subscribe(
              docto => {
                  for (let j = 0; j < docto.length; j++) {
                      carasDocumnts.push(new CarasDocument(docto[j].fileName, docto[j].fileType, docto[j].fileId));
                  }
              },
              error => {
                  const error1 = error;
              }
          );
          documents = new Documents(this.typeDocuments[i], carasDocumnts);
          this.titleDocument.push(documents);
      }
  }

  downloadFile(fileId: number, fileName: string) {
      this.efhService.downloadFile(this.inTypeConfig, fileId).subscribe(
          result => {
              let dataType = result.type;
              let binaryData = [];
              binaryData.push(result);
              let downloadLink = document.createElement('a');
              downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
              downloadLink.setAttribute('download', fileName);
              downloadLink.click();
          },
          error => {
              const error1 = error;
          });
  }

  deleteFile(fileId: number) {
      this.confirmationDialogService.confirm('Por favor, confirme..',
          'Está seguro de eliminar el archivo?')
          .then((confirmed) => {
              if (confirmed) {
                  this.efhService.deleteFile(this.inTypeConfig, fileId).subscribe(
                      result => {
                          this.toastr.successToastr('Documento eliminado con éxito.', '¡Se ha logrado!');
                          this.efhService.accion.next('upload');
                      },
                      error => {
                          debugger;
                          if (error.error['text'] === 'OK') {
                              this.toastr.successToastr('Documento eliminado con éxito.', '¡Se ha logrado!');
                              this.efhService.accion.next('upload');
                          } else {
                              this.toastr.errorToastr('Ocurrió un error al intentar eliminar el archivo', 'Lo siento,');
                          }
                      });
              }
          })
          .catch(() => console.log('Canceló eliminar'));
  }

}
