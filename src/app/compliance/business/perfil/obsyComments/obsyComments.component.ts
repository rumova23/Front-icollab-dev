import { Component, OnInit, Input } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Documents } from 'src/app/compliance/models/Documents';
import { CarasDocument } from 'src/app/compliance/models/CarasDocument';
import { PerfilComboService } from 'src/app/compliance/services/perfil-combo.service';
import { Comentario } from 'src/app/core/models/comentario';


@Component({
  selector: 'app-obsyComments',
  templateUrl: './obsyComments.component.html',
  styleUrls: ['./obsyComments.component.scss']
})
export class ObsyCommentsComponent implements OnInit {
  @Input() inIdEmpleado: number;
  @Input() inTipo: string;
  headObservaciones = ['#', 'Nombre', 'Observaciones', 'Fecha de ultima modificación'];
  observacioes: Array<any>;
  obsForm: FormGroup;
  submitted = false;
  isdisabled: boolean = false;

  titleDocument = [new Documents('Documentos', [new CarasDocument('pdf 1', 'pdf'), new CarasDocument('png 3', 'png'), new CarasDocument('video 3', 'video')]),
  new Documents('Registros', [new CarasDocument('txt 2', 'txt'), new CarasDocument('zip 3', 'zip')]),
  new Documents('Referencias', [new CarasDocument('pdf 4', 'pdf'), new CarasDocument('word 5', 'doc'), new CarasDocument('excel 6', 'xls')])];

  constructor(
    private comentarios: PerfilComboService,
    private formBuildier: FormBuilder, public toastr: ToastrManager) { }

  resuelveDS(poRespuesta: Object, data: Array<any>, comp: string) {
    if (!poRespuesta) {
      console.log("El back no responde");
    } else {
      let estatus = poRespuesta['status'];
      if (estatus === 'exito') {
        Object.keys(poRespuesta[comp]).forEach(key => {
          let id = [poRespuesta[comp][key].idUsr][0];
          let nombre = [poRespuesta[comp][key].nombre][0];
          let observacion = [poRespuesta[comp][key].observacion][0];
          let fecha_modificacion = [poRespuesta[comp][key].fecha_modificacion][0];
          data.push(new Comentario(id, nombre, observacion, fecha_modificacion));
        });
      } else {
        console.log('El sistema indica diferente a exito');
      }
    }
  }

  obtieneObservaciones() {
    this.observacioes = [];
    this.comentarios.getComentarios(2).subscribe(
      poRespuesta => {
        this.resuelveDS(poRespuesta, this.observacioes, 'comentario');
      }
    );
  }

  ngOnInit() {
    if (this.inTipo == "ver") {
      this.isdisabled = true;
    }
    this.obsForm = this.formBuildier.group({
      fObserva: [{ value: '', disabled: this.isdisabled }, Validators.required]
    });
    this.obtieneObservaciones();

  }

  get f() { return this.obsForm.controls; }

  guardarObserv() {
    let obsva = this.obsForm.controls['fObserva'].value
    this.comentarios.postObservaciones(2, obsva).subscribe(respuesta => {
      this.obtieneObservaciones();
    });

  }

  onSubmit() {
    this.submitted = true;
    if (this.obsForm.invalid) {
      this.toastr.errorToastr('Error, Debe de escribir un comentario.', 'Oops!');
      //alert('Error!! :-)\n\n' + JSON.stringify(this.obsForm.value))
      return;
    }

    this.guardarObserv();

    this.toastr.successToastr('Observacion enviada satisfactoriamente.', 'Success!');
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.obsForm.value))

  }
}
