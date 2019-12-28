import {Component, Input, OnInit} from '@angular/core';
import {GlobalService} from '../../core/globals/global.service';
import {FormBuilder} from '@angular/forms';
import {ToastrManager} from 'ng6-toastr-notifications';
import {Documents} from '../../compliance/models/Documents';
import {CarasDocument} from '../../compliance/models/CarasDocument';
import {PerfilComboService} from '../../core/services/perfil-combo.service';
import {EfhService} from '../../core/services/efh.service';

@Component({
  selector: 'app-efh-upload',
  templateUrl: './efh-upload.component.html',
  styleUrls: ['./efh-upload.component.scss']
})
export class EfhUploadComponent implements OnInit {
  @Input() inIdEventConfig: number;
  @Input() inAccion: string;
  typeDocuments = ['Documentos'];
  titleDocument: Array<any>;
  submitted = false;
  isdisabled = false;

  constructor(public globalService: GlobalService,
              private efhService: EfhService,
              public toastr: ToastrManager) {
    this.titleDocument = [];
    this.efhService.accion.subscribe(
        accion => {
            this.titleDocument = [];
            if (accion === 'upload') {
                this.ngOnInit();
            }
        }
    );
  }

  ngOnInit() {
    if (this.inAccion === 'ver') {
      this.isdisabled = true;
    }
    this.getDocumentos();
  }

  getDocumentos() {
    for (let i = 0; i < this.typeDocuments.length; i++) {
      let documents: Documents;
      let carasDocumnts: Array<CarasDocument>;
      carasDocumnts =  [];

      this.efhService.getDocuments(this.inIdEventConfig, this.typeDocuments[i]).subscribe(
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
    this.efhService.downloadFile(fileId).subscribe(
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

}
