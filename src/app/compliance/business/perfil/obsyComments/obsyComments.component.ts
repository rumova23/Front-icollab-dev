import { Component, OnInit, Input } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Documents } from 'src/app/compliance/models/Documents';
import { CarasDocument } from 'src/app/compliance/models/CarasDocument';
import { Comentario } from 'src/app/core/models/comentario';
import { PerfilComboService } from 'src/app/core/services/perfil-combo.service';
import { GlobalService } from 'src/app/core/globals/global.service';
import {ConfirmationDialogService} from '../../../../core/services/confirmation-dialog.service';
import {EventMessage} from '../../../../core/models/EventMessage';
import {EventBlocked} from '../../../../core/models/EventBlocked';
import {EventService} from '../../../../core/services/event.service';
import {Constants} from '../../../../core/globals/Constants';
import {Comment} from '../../../../efh/models/Comment';

@Component({
  selector: 'app-obsyComments',
  templateUrl: './obsyComments.component.html',
  styleUrls: ['./obsyComments.component.scss']
})
export class ObsyCommentsComponent implements OnInit {
  @Input() inIdEmpleado: number;
  @Input() inTipo: string;
  calificacionId: number;
  headObservaciones = ['#', 'Nombre', 'Observaciones', 'Fecha de ultima modificación', 'Visible', 'Editar', 'Eliminar'];
  typeDocuments = ['Evidencias'];
  observacioes: Array<any>;
  titleDocument: Array<any>;
  obsForm: FormGroup;
  submitted = false;
  isdisabled = false;
  isAddObvsDisabled = true;
  currentComment: any;
  dataObservationSumbit = {};

  // tslint:disable-next-line:max-line-length
  constructor(
    private comentarios: PerfilComboService,
    public globalService: GlobalService,
    private eventService: EventService,
    private confirmationDialogService: ConfirmationDialogService,
    private formBuildier: FormBuilder, public toastr: ToastrManager) {
      this.observacioes = [];
      this.titleDocument = [];
      this.calificacionId = 0;
      this.comentarios.accion.subscribe(accion => {
        this.titleDocument = [];
        if (accion === 'upload') {
          this.ngOnInit();
        }
      });
  }
  ngOnInit() {
    if (this.inTipo === 'ver') {
      this.isdisabled = true;
    }
    this.obsForm = this.formBuildier.group({
      fObserva: [{ value: '', disabled: this.isdisabled }, Validators.required]
    });
    this.obtieneObservaciones();
    this.getDocumentos();
  }

  get f() { return this.obsForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.guardarObserv();
  }

  resuelveDS(comenta) {
    this.observacioes.push(
      new Comment(comenta.observacionId,  '0', comenta.usuario, comenta.observacion, comenta.fechaObservacion, comenta.activo, true));
  }

  getDocumentos() {
    for (let i = 0; i < this.typeDocuments.length; i++) {
      let documents: Documents;
      let carasDocumnts: Array<CarasDocument>;
      carasDocumnts =  [];
      this.comentarios.obtenCalificacion(this.inIdEmpleado).subscribe(
          calificacion => {
                    this.calificacionId = calificacion.calificacionId;
                    this.comentarios.obtenDocumentos(this.calificacionId, this.typeDocuments[i]).subscribe(
                        docto => {
                                for (let j = 0; j < docto.length; j++) {
                                    carasDocumnts.push(new CarasDocument(docto[j].fileName, 'png', docto[j].fileId));
                                }
                             },
                        error1 => {
                        });
                },
          error => {
          });
      documents = new Documents(this.typeDocuments[i], carasDocumnts);
      this.titleDocument.push(documents);
    }
  }

  obtieneObservaciones() {
    this.addBlock(1, 'Cargando...');
    this.comentarios.obtenCalificacion(this.inIdEmpleado).subscribe(
      calificacion => {
          debugger;
              this.comentarios.getComentarios(calificacion.calificacionId).subscribe(
                data => {
                    debugger;
                        data.comentario.forEach(comenta => {
                          this.resuelveDS(comenta);
                        });
                  },
                  error1 => {
                    debugger;
                    this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
                    this.addBlock(2, null);
                  });
        },
        error => {
          debugger;
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
          this.addBlock(2, null);
        }).add(() => {
      this.addBlock(2, null);
    });
  }

  guardarObserv() {
    this.dataObservationSumbit = {};
    const obsva = this.obsForm.controls.fObserva.value;
    this.addBlock(1, 'Cargando...');
    this.comentarios.obtenCalificacion(this.inIdEmpleado).subscribe(
      calificacion => {
        this.dataObservationSumbit['observacion'] = obsva;
        this.dataObservationSumbit['calificacionId'] = calificacion.calificacionId;
        this.dataObservationSumbit['fechaObservacion'] = new Date();
        this.dataObservationSumbit['activo'] = true;
        this.dataObservationSumbit['save'] = true;
        this.comentarios.guardaObservacion(this.dataObservationSumbit).subscribe(
            comenta => {
              this.observacioes.push(
                      new Comment(comenta.observacionId, calificacion.calificacionId, comenta.usuario, comenta.observacion, comenta.fechaObservacion, comenta.activo, true));
              this.obsForm.controls.fObserva.setValue('');
              this.toastr.successToastr('La observación fue registrada con éxito.', '¡Se ha logrado!');
            },
            error1 => {
              this.toastr.errorToastr('Ocurrió un error al intentar registrar la observación', 'Lo siento,');
              this.addBlock(2, null);
            });
        },
        error => {
          this.toastr.errorToastr('Ocurrió un error al intentar eliminar la observación', 'Lo siento,');
          this.addBlock(2, null);
        }).add(() => {
      this.addBlock(2, null);
    });
  }

  downloadFile(fileId: number, fileName: string) {
    this.addBlock(1, 'Descargando archivo...');
    this.comentarios.downloadFile(fileId).subscribe(
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
          this.addBlock(2, null);
        }).add(() => {
      this.addBlock(2, null);
    });
  }

  deleteFile(fileId: number) {
    this.confirmationDialogService.confirm('Por favor, confirme..',
        'Está seguro de eliminar el archivo?')
        .then((confirmed) => {
          if (confirmed) {
            this.comentarios.deleteFile(fileId).subscribe(
                result => {
                  this.toastr.successToastr('Documento eliminado con éxito.', '¡Se ha logrado!');
                  this.comentarios.accion.next('upload');
                },
                error => {
                  if (error.error['text'] === 'OK') {
                    this.toastr.successToastr('Documento eliminado con éxito.', '¡Se ha logrado!');
                    this.comentarios.accion.next('upload');
                  } else {
                    this.toastr.errorToastr('Ocurrió un error al intentar eliminar el archivo', 'Lo siento,');
                  }
                });
          }
        })
        .catch(() => console.log('Canceló eliminar'));
  }

  enableSaveButton() {
    if (this.inTipo !== 'ver') {
      this.isAddObvsDisabled = false;
    }
  }

  setToEdit(comment: any) {
    this.currentComment = comment;
    this.obsForm.controls.fObserva.setValue(comment.observacion);
  }

  eliminarRegistro(comment: any) {

  }

  visibleObservation(comment: any) {

  }

  private addBlock(type, msg): void {
    this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
  }
}
