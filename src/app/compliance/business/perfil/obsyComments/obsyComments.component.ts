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
  resultService;

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
        if (accion === 'updateobsycomments') {
            this.observacioes = [];
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
    this.getObservations();
    this.getDocumentos();
  }

  get f() { return this.obsForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.saveObservation();
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

  getObservations() {
    
    this.comentarios.obtenCalificacion(this.inIdEmpleado).subscribe(
        calificacion => {
            this.comentarios.getComentarios(calificacion.calificacionId).subscribe(
                data => {
                    this.resultService = data;
                    for (const element of this.resultService) {
                        if (this.inTipo === 'ver') {
                            if (element.activo) {
                                this.observacioes.push(new Comment(element.observacionId, element.calificacionId, element.usuario, element.observacion, new Date(element.dateUpdated), element.activo, true));
                            }
                        } else {
                            this.observacioes.push(new Comment(element.observacionId, element.calificacionId, element.usuario, element.observacion, new Date(element.dateUpdated), element.activo, true));
                        }
                    }
                },
                error1 => {
                    this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
                    
                }
            );
        },
        error => {
            this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
            
        }
    ).add(() => {
        
    });
  }

  saveObservation() {
    this.dataObservationSumbit = {};
    const obsva = this.obsForm.controls.fObserva.value;
    
    this.comentarios.obtenCalificacion(this.inIdEmpleado).subscribe(
      calificacion => {
            this.dataObservationSumbit['observacion'] = obsva;
            this.dataObservationSumbit['calificacionId'] = calificacion.calificacionId;
            this.dataObservationSumbit['fechaObservacion'] = new Date();
            this.dataObservationSumbit['activo'] = true;
            this.dataObservationSumbit['save'] = true;
            this.comentarios.guardaObservacion(this.dataObservationSumbit).subscribe(
            comenta => {
                this.toastr.successToastr('La observación fue registrada con éxito.', '¡Se ha logrado!');
                this.comentarios.accion.next('updateobsycomments');
            },
            error1 => {
                this.toastr.errorToastr('Ocurrió un error al intentar registrar la observación', 'Lo siento,');
                
            });
        },
        error => {
            this.toastr.errorToastr('Ocurrió un error al intentar eliminar la observación', 'Lo siento,');
            
        }).add(() => {
      
    });
  }

  updateObservation(comment: any) {
    this.dataObservationSumbit = {};
    this.dataObservationSumbit['observacionId'] = comment.id;
    this.dataObservationSumbit['calificacionId'] = comment.ideventconfig;
    this.dataObservationSumbit['observacion'] = comment.observacion;
    this.dataObservationSumbit['fechaObservacion'] = new Date();
    this.dataObservationSumbit['activo'] = comment.active;
    this.dataObservationSumbit['save'] = false;
    
    this.comentarios.guardaObservacion(this.dataObservationSumbit).subscribe(
        data => {
            this.toastr.successToastr('La observación fue actualizada con éxito.', '¡Se ha logrado!');
            this.comentarios.accion.next('updateobsycomments');
        },
        error => {
            this.toastr.errorToastr(error.error['text'], 'Lo siento, no fue posible actualizar la observación');
            
        }
    ).add(() => {
        
    });
  }

  visibleObservation(comment: any) {
    this.dataObservationSumbit = {};
    this.dataObservationSumbit['observacionId'] = comment.id;
    this.dataObservationSumbit['calificacionId'] = comment.ideventconfig;
    this.dataObservationSumbit['observacion'] = comment.observacion;
    this.dataObservationSumbit['fechaObservacion'] = new Date();
    this.dataObservationSumbit['activo'] = !comment.active;
    this.dataObservationSumbit['save'] = false;
    
    this.comentarios.guardaObservacion(this.dataObservationSumbit).subscribe(
        data => {
            this.toastr.successToastr('La observación fue actualizada con éxito.', '¡Se ha logrado!');
            this.comentarios.accion.next('updateobsycomments');
        },
        error => {
            this.toastr.errorToastr(error.error['text'], 'Lo siento, no fue posible eliminar la observación');
            
        }
    ).add(() => {
        
    });
  }

  setToEdit(comment: any) {
    this.currentComment = comment;
    this.obsForm.controls.fObserva.setValue(comment.observacion);
  }

  addObservation() {
     const obser = this.obsForm.controls.fObserva.value;
     if (obser === null || obser === '') {
         this.toastr.errorToastr('No se puede agregar una observación vacía', 'Lo siento,');
     } else {
         if (this.currentComment) {
             this.currentComment.observacion = this.obsForm.controls.fObserva.value;
             this.updateObservation(this.currentComment);
             this.currentComment = null;
         } else {
             this.saveObservation();
         }
     }

        /*
    } else {
        const obser = this.obsForm.controls.observations.value;
        if (obser === null || obser === '') {
            this.toastr.errorToastr('No se puede agregar una observación vacía', 'Lo siento,');
        } else {
            this.obsForm.controls.observations.setValue('');
            if (this.inTipo === 'nuevo') {
                if (this.currentComment) {
                    const updateItem = this.observacioes.find(item => item.observacion === this.currentComment.observacion);
                    const index = this.observacioes.indexOf(updateItem);
                    this.observacioes[index].observacion = obser;
                    this.currentComment = null;
                } else {
                    this.observacioes.push(new Comment('1', '', 'tester', obser, new Date(), true, false));
                }
            } else {
                this.saveObservation();
            }
            this.isAddObvsDisabled = true;
        }
    }*/
  }

  eliminarRegistro(comment: any) {
     this.confirmationDialogService.confirm('Por favor, confirme..',
         'Está seguro de eliminar la observación?')
         .then((confirmed) => {
             if (confirmed) {
                 this.comentarios.eliminaObservacion(comment.id)
                     .subscribe(
                         data => {
                             this.toastr.successToastr('La observación fué eliminada correctamente', '¡Se ha logrado!');
                             this.comentarios.accion.next('updateobsycomments');
                         }
                         , error => {
                             if (error.error['text'] === 'OK') {
                                 this.toastr.successToastr('La observación fué eliminada correctamente', '¡Se ha logrado!');
                                 this.comentarios.accion.next('updateobsycomments');
                             } else {
                                 this.toastr.errorToastr(error.error['text'], 'Lo siento,');
                             }
                         },
                     );
             }
         })
         .catch(() => console.log('Canceló eliminar'));
  }

  downloadFile(fileId: number, fileName: string) {
    
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
          
        }).add(() => {
      
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

}
