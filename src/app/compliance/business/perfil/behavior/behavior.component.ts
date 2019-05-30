import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

import { Router, ActivatedRoute } from '@angular/router';
import { PerfilComboService } from 'src/app/compliance/services/perfil-combo.service';
import { Respuesta } from 'src/app/compliance/models/Respuesta';
import { Tema } from 'src/app/compliance/models/Tema';


@Component({
  selector: 'app-behavior',
  templateUrl: './behavior.component.html',
  styleUrls: ['./behavior.component.scss']
})
export class BehaviorComponent implements OnInit {
  @Input() inIdEmpleado: number;
  @Input() inTipo: string;
  temas: Array<any>;
  idTemas: Array<any>;
  reserExamen: number;
  pregs: Array<any>;
  totalPreg: Array<any>;
  resp: Array<any>;
  grupOpc = [[], [], [], [], [], [], [], [], [], [], []];
  grupPreg = [[], [], [], [], [], [], [], [], [], [], []];
  SaveRespuestas: Array<Respuesta>;


  SaveOpciones: Array<any>;
  arryCata: Array<any>;

  isdisabled: boolean = false;
  submitted = false;

  constructor(private cdRef: ChangeDetectorRef,
    private ruteo: ActivatedRoute,
    private router: Router,
    private preguntas: PerfilComboService, public toastr: ToastrManager) { }


  resuelveDS(poRespuesta: Object, comp: string) {
    if (!poRespuesta) {
      console.log("El back no responde");
    } else {
      let estatus = poRespuesta['estatusGenerico'];
      if (estatus === 'exito') {
        let index = 0;
        Object.keys(poRespuesta[comp]).forEach(key => {
          let value = [poRespuesta[comp][key].temaId];
          let label = [poRespuesta[comp][key].tema];
          let color = [poRespuesta[comp][key].color];
          let pregu = [poRespuesta[comp][key].preguntas][0];
          this.pregs = [];
          pregu.forEach(pg => {
            let value = pg.preguntaId;
            let label = pg.pregunta;
            let optRes = pg.respuestas;
            this.resp = [];
            optRes.forEach(or => {
              let value = or.respuestaId;
              let label = or.respuesta;
              this.resp.push(new Tema(value, label, null, null));
            });
            this.pregs.push(new Tema(value, label, null, this.resp));
          });
          this.temas.push(new Tema(value[0], label[0], color[0], this.pregs));
        });
      } else {
        console.log('El sistema indica diferente a exito');
      }
    }
  }

  ngOnInit() {
    if (this.inTipo == "ver") {
      this.isdisabled = true;
    }
    this.temas = [];
    this.totalPreg = [];
    this.idTemas = ['SICOMETRICO DEFAULT'];
    this.preguntas.getPreguntas(this.idTemas, 1).subscribe(
      poRespuesta => {
        this.reserExamen = poRespuesta[0]['examenReservacionId'];
        this.resuelveDS(poRespuesta[0], 'preguntasExamen');
      }
    );
  }

  onSubmit() {
    this.SaveRespuestas = [];
    let totalResp: number = 0;
    for (var _i = 0; _i < this.grupPreg.length; _i++) {
      for (var _j = 0; _j < this.grupPreg[_i].length; _j++) {
        if (this.grupOpc[_i][_j] == null) {
          totalResp++;
        }
        this.SaveRespuestas.push(new Respuesta(this.grupPreg[_i][_j], this.grupOpc[_i][_j], null));
      }
    }

    if (totalResp > 0) {
      this.toastr.errorToastr('Error, Debe de seleccionar todo los options.', 'Lo siento,');
      //alert('ERROR!! :-)\n\n' + "debe de seleccionar todo los options");
      return;
    }
    this.preguntas.postRespuetaExamen(this.reserExamen, this.SaveRespuestas).subscribe(
      respuesta => {
        console.dir(respuesta);
      }
    );
  }
}
