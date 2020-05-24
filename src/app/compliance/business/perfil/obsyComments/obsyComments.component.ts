import { Component, OnInit, Input } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Documents } from 'src/app/compliance/models/Documents';
import { CarasDocument } from 'src/app/compliance/models/CarasDocument';
import { Comentario } from 'src/app/core/models/comentario';
import { PerfilComboService } from 'src/app/core/services/perfil-combo.service';
import { GlobalService } from 'src/app/core/globals/global.service';

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
      new Comentario(comenta.idUsr, comenta.nombre, comenta.observacion, comenta.fecha_modificacion));
  }

  getDocumentos() {
    for (let i = 0; i < this.typeDocuments.length; i++) {
      let documents: Documents;
      let carasDocumnts: Array<CarasDocument>;
      carasDocumnts =  [];
      this.comentarios.obtenCalificacion(this.inIdEmpleado).subscribe(calificacion => {
        this.calificacionId = calificacion.calificacionId;
        this.comentarios.obtenDocumentos(this.calificacionId, this.typeDocuments[i]).subscribe(docto => {
          for (let j = 0; j < docto.length; j++) {
            carasDocumnts.push(new CarasDocument(docto[j].fileName, 'png', docto[j].fileId));
          }
        });
      });
      documents = new Documents(this.typeDocuments[i], carasDocumnts);
      this.titleDocument.push(documents);
    }
  }

  obtieneObservaciones() {
    this.comentarios.obtenCalificacion(this.inIdEmpleado).subscribe(
      calificacion => {
        this.comentarios.getComentarios(calificacion.calificacionId).subscribe(
          data => {
            data.comentario.forEach(comenta => {
              this.resuelveDS(comenta);
            });
          });
      });
  }

  guardarObserv() {
    this.dataObservationSumbit = {};
    const obsva = this.obsForm.controls.fObserva.value;
    this.comentarios.obtenCalificacion(this.inIdEmpleado).subscribe(
      calificacion => {
        this.dataObservationSumbit['observacion'] = obsva;
        this.dataObservationSumbit['calificacionId'] = calificacion.calificacionId;
        this.dataObservationSumbit['fechaObservacion'] = new Date();
        this.dataObservationSumbit['activo'] = true;
        this.dataObservationSumbit['save'] = true;
        this.comentarios.guardaObservacion(this.dataObservationSumbit).subscribe(comenta => {
          this.observacioes.push(
            new Comentario(comenta.idUsr, comenta.nombre, comenta.observacion, comenta.fecha_modificacion));
          this.obsForm.controls.fObserva.setValue('');
          this.toastr.successToastr('La observación fue registrada con éxito.', '¡Se ha logrado!');
        });
      });
  }

  downloadFile(fileId: number) {
    this.comentarios.downloadFile(fileId).subscribe(
        result => {
        });
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
}
