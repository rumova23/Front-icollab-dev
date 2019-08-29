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
  templateUrl: './obsyCommentsV2.component.html',
  styleUrls: ['./obsyComments.component.scss']
})
export class ObsyCommentsComponent implements OnInit {
  @Input() inIdEmpleado: number;
  @Input() inTipo: string;
  calificacionId: number;
  headObservaciones = ['#', 'Nombre', 'Observaciones', 'Fecha de ultima modificación'];
  observacioes: Array<any>;
  obsForm: FormGroup;
  submitted = false;
  isdisabled = false;
  // tslint:disable-next-line:max-line-length
  titleDocument = [new Documents('Documentos', [new CarasDocument('pdf 1', 'pdf'), new CarasDocument('png 3', 'png'), new CarasDocument('video 3', 'video')]),
  new Documents('Registros', [new CarasDocument('txt 2', 'txt'), new CarasDocument('zip 3', 'zip')]),
  // tslint:disable-next-line:max-line-length
  new Documents('Referencias', [new CarasDocument('pdf 4', 'pdf'), new CarasDocument('word 5', 'doc'), new CarasDocument('excel 6', 'xls')])];

  constructor(
    private comentarios: PerfilComboService,
    public globalService: GlobalService,
    private formBuildier: FormBuilder, public toastr: ToastrManager) {
    this.observacioes = [];
  }
  ngOnInit() {
    if (this.inTipo === 'ver') {
      this.isdisabled = true;
    }
    this.obsForm = this.formBuildier.group({
      fObserva: [{ value: '', disabled: this.isdisabled }, Validators.required]
    });
    this.obtieneObservaciones();
  }

  get f() { return this.obsForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.obsForm.invalid) {
      this.toastr.errorToastr('Error, Debe de escribir un comentario.', 'Oops!');
      return;
    }
    this.guardarObserv();
    this.toastr.successToastr('Observacion enviada satisfactoriamente.', 'Success!');
  }

  resuelveDS(comenta) {
    this.observacioes.push(
      new Comentario(comenta.idUsr, comenta.nombre, comenta.observacion, comenta.fecha_modificacion));
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
    const obsva = this.obsForm.controls.fObserva.value
    this.comentarios.obtenCalificacion(this.inIdEmpleado).subscribe(
      calificacion => {
        this.comentarios.postObservaciones(calificacion.calificacionId, obsva).subscribe(comenta => {
          this.observacioes.push(
            new Comentario(comenta.idUsr, comenta.nombre, comenta.observacion, comenta.fecha_modificacion));
        });
      });
  }
}
