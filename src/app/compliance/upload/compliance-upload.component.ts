import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GlobalService} from '../../core/globals/global.service';
import {EfhService} from '../../core/services/efh.service';
import {ConfirmationDialogService} from '../../core/services/confirmation-dialog.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {Documents} from '../models/Documents';
import {CarasDocument} from '../models/CarasDocument';
import {PersonalCompetenteService} from '../services/personal-competente.service';
import {EventMessage} from '../../core/models/EventMessage';
import {EventBlocked} from '../../core/models/EventBlocked';
import {EventService} from '../../core/services/event.service';

@Component({
  selector: 'app-compliance-upload',
  templateUrl: './compliance-upload.component.html',
  styleUrls: ['./compliance-upload.component.scss']
})
export class ComplianceUploadComponent implements OnInit, OnDestroy {
  @Input() inEmployeeId: number;
  @Input() inAccion: string;

  typeDocuments = ['Soportes'];
  titleDocument: Array<any>;
  submitted = false;
  isdisabled = false;
  subscription;

  constructor(public globalService: GlobalService,
              private eventService: EventService,
              private personalCompetenteService: PersonalCompetenteService,
              private confirmationDialogService: ConfirmationDialogService,
              public toastr: ToastrManager) {
    this.titleDocument = [];
    this.subscription = this.personalCompetenteService.accion.subscribe(
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
      this.personalCompetenteService.getDocuments(this.inEmployeeId).subscribe(
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
    
    this.personalCompetenteService.downloadFile(fileId).subscribe(
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
              
              this.personalCompetenteService.deleteFile(fileId).subscribe(
                result => {
                  this.toastr.successToastr('Documento eliminado con éxito.', '¡Se ha logrado!');
                  this.personalCompetenteService.accion.next('upload');
                },
                error => {
                  if (error.error['text'] === 'OK') {
                    this.toastr.successToastr('Documento eliminado con éxito.', '¡Se ha logrado!');
                    this.personalCompetenteService.accion.next('upload');
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
