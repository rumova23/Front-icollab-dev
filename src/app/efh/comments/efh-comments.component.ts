import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PerfilComboService} from '../../core/services/perfil-combo.service';
import {GlobalService} from '../../core/globals/global.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {Comentario} from '../../core/models/comentario';

@Component({
  selector: 'app-efh-comments',
  templateUrl: './efh-comments.component.html',
  styleUrls: ['./efh-comments.component.scss']
})
export class EfhCommentsComponent implements OnInit {
  @Input() inIdEventConfig: number;
  calificacionId: number;
  headObservaciones = ['#', 'Nombre', 'Observaciones', 'Fecha de ultima modificación'];
  typeDocuments = ['Documentos', 'Registros', 'Referencias'];
  observacioes: Array<any>;
  titleDocument: Array<any>;
  obsForm: FormGroup;
  submitted = false;
  isdisabled = false;

  constructor(private comentarios: PerfilComboService,
              public globalService: GlobalService,
              private formBuildier: FormBuilder, public toastr: ToastrManager) {
    this.observacioes = [];
  }

  ngOnInit() {
    this.obsForm = this.formBuildier.group({
      fObserva: [{ value: '', disabled: this.isdisabled }, Validators.required]
    });
    this.getObservations();
  }

  get f() { return this.obsForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.obsForm.invalid) {
      this.toastr.errorToastr('Error, Debe de escribir un comentario.', 'Oops!');
      return;
    }
    this.saveObservation();
    this.toastr.successToastr('Observacion enviada satisfactoriamente.', 'Success!');
  }

  resuelveDS(comenta) {
    this.observacioes.push(
        new Comentario(comenta.idUsr, comenta.nombre, comenta.observacion, comenta.fecha_modificacion));
  }

  getObservations() {
    this.comentarios.obtenCalificacion(this.inIdEventConfig).subscribe(
        calificacion => {
          this.comentarios.getComentarios(calificacion.calificacionId).subscribe(
              data => {
                data.comentario.forEach(comenta => {
                  this.resuelveDS(comenta);
                });
              });
        });
  }

  saveObservation() {
    const obsva = this.obsForm.controls.fObserva.value;
    this.comentarios.obtenCalificacion(this.inIdEventConfig).subscribe(
        calificacion => {
          this.comentarios.postObservaciones(calificacion.calificacionId, obsva).subscribe(comenta => {
            this.observacioes.push(
                new Comentario(comenta.idUsr, comenta.nombre, comenta.observacion, comenta.fecha_modificacion));
          });
        });
  }

}
