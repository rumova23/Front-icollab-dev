import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Respuesta } from 'src/app/compliance/models/Respuesta';
import { PerfilComboService } from 'src/app/compliance/services/perfil-combo.service';
import { Tema } from 'src/app/compliance/models/Tema';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  @Input() inIdEmpleado: number;
  @Input() inTipo: string;
  temas: Array<any>;
  idTemas: Array<any>;
  pregs: Array<any>;
  resp: Array<any>;
  grupOpc = [[], [], [], [], [], [], [], [], [], [], []];
  grupRes = [[], [], [], [], [], [], [], [], [], [], []];
  grupPreg = [[], [], [], [], [], [], [], [], [], [], []];
  SaveRespuestas: Array<Respuesta>;
  reserExamen: number;
  isdisabled: boolean = false;


  constructor(private cdRef: ChangeDetectorRef,
    private ruteo: ActivatedRoute,
    private preguntas: PerfilComboService, public toastr: ToastrManager) { }

  resuelveDS(poRespuesta: Object, comp: string) {
    if (!poRespuesta) {
      console.log("El back no responde");
    } else {
      let estatus = poRespuesta['estatusGenerico'];
      if (estatus === 'exito') {
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
    this.idTemas = ['DEFAULT'];
    this.preguntas.getPreguntas(this.idTemas, 1).subscribe(
      poRespuesta => {
        this.reserExamen = poRespuesta[0]['examenReservacionId'];
        this.resuelveDS(poRespuesta[0], 'preguntasExamen');
      }
    );
  }

  onSubmit() {
    let tOpc: number = 0;
    let tRes: number = 0;
    this.SaveRespuestas = [];
    for (var _i = 0; _i < this.grupPreg.length; _i++) {
      for (var _j = 0; _j < this.grupPreg[_i].length; _j++) {
        if (this.grupOpc[_i][_j] == null) {
          tOpc++;
        }
        if (this.grupRes[_i][_j] == null) {
          tRes++;
        }
        this.SaveRespuestas.push(new Respuesta(this.grupPreg[_i][_j], this.grupOpc[_i][_j], this.grupRes[_i][_j]));
      }
    }
    if (tOpc > 0) {
      this.toastr.errorToastr('Error, Debe de seleccionar todo las opciones si o no.', 'Lo siento,');
      //alert('ERROR!! :-)\n\n' + "debe de seleccionar todo las opciones si o no");
      return;
    }
    if (tRes) {
      this.toastr.errorToastr('Error, Debe de escribir en todas las respuestas abiertas.', 'Lo siento,');
      //alert('ERROR!! :-)\n\n' + "debe de escribir en todas las respuestas abiertas");
      return;
    }
    this.preguntas.postRespuetaExamen(this.reserExamen, this.SaveRespuestas).subscribe(
      respuesta => {
        console.dir(respuesta);
      }
    );

  }

}
