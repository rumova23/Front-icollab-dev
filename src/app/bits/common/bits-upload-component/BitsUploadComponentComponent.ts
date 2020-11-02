import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CarasDocument } from 'src/app/compliance/models/CarasDocument';
import { Documents } from 'src/app/compliance/models/Documents';
import { GlobalService } from 'src/app/core/globals/global.service';
import { EventBlocked } from 'src/app/core/models/EventBlocked';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { EfhService } from 'src/app/core/services/efh.service';
import { EventService } from 'src/app/core/services/event.service';
import { EfhUploadComponent } from 'src/app/efh/upload/efh-upload.component';
import { IncidentService } from '../../services/incident.service';


@Component({
  selector: 'app-bits-upload-component',
  templateUrl: './bits-upload-component.component.html',
  styles: []
})
export class BitsUploadComponentComponent implements OnInit, OnDestroy {

    @Input() inIdEventConfig: number;
    @Input() inAccion: string;
    @Input() inTypeConfig: number;
  
    typeDocuments = ['Documentos'];
    titleDocument: Array<any>;
    submitted = false;
    isdisabled = false;
    subscription;
  constructor(
    public globalService: GlobalService,
    private eventService: EventService,
    private efhService: IncidentService,
    private confirmationDialogService: ConfirmationDialogService,
    public toastr: ToastrManager
  ) {
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
              
          }).add(() => {
          
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
                          if (error.error['text'] === 'OK') {
                              this.toastr.successToastr('Documento eliminado con éxito.', '¡Se ha logrado!');
                              this.efhService.accion.next('upload');
                          } else {
                              this.toastr.errorToastr('Ocurrió un error al intentar eliminar el archivo', 'Lo siento,');
                              
                          }
                      }).add(() => {
                      
                  });
              }
          })
          .catch(() => console.log('Canceló eliminar'));
  }
}
