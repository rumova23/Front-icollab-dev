import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Respuesta } from 'src/app/compliance/models/Respuesta';
import { Tema } from 'src/app/compliance/models/Tema';
import { PerfilComboService } from 'src/app/core/services/perfil-combo.service';
import { GlobalService } from 'src/app/core/globals/global.service';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventBlocked } from 'src/app/core/models/EventBlocked';
import {EntidadEstausDTO} from '../../../models/entidad-estaus-dto';
import {Entidad} from '../../../models/Entidad';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  @Input() inIdEmpleado: number;
  @Input() inTipo: string;
  @Input() entidadEstausTerminado: EntidadEstausDTO;

  temas: Array<any>;
  idTemas: Array<any>;
  pregs: Array<any>;
  resp: Array<any>;
  grupResSkill = [[], [], []];
  grupOpcSkill = [[], [], []];
  grupPregSkill = [[], [], []];
  SaveRespuestas: Array<Respuesta>;
  examenReservacionId: number;
  entidadEstatusId: number;
  terminadoId: number;
  isdisabled = false;
  isdisabledFinish = false;

  constructor(private cdRef: ChangeDetectorRef,
		public  globalService            : GlobalService,
              private ruteo: ActivatedRoute,
              private preguntas: PerfilComboService,
              public  toastr: ToastrManager,
              private eventService: EventService) {
  }

  ngOnInit() {

          if (this.inTipo === 'ver') {
            this.isdisabled = true;
          }

          this.temas = [];
          this.idTemas = [ 'DEFAULT' ];
          this.preguntas.obtenPreguntasExamen('DEFAULT', this.inIdEmpleado).subscribe(reservacion => {
              console.dir(reservacion);
            let jj = -1;
            this.pregs = [];

            this.examenReservacionId = reservacion.examenReservacionId;

            if (reservacion.entidadEstatusId === this.entidadEstausTerminado.entidadEstatusId) {
              this.isdisabledFinish = true;
              this.isdisabled = true;
            }
            for (let ins = 0; ins < reservacion.preguntasExamen.length; ins++) {
                  jj = -1;
                  this.pregs = [];

                  reservacion.preguntasExamen[ins].preguntas.forEach( pregunta => {
                    jj++;
                    this.resp = [];
                    pregunta.respuestas.forEach( or => {
                      if (or.respuesta !== 'No') {
                        this.resp.push(new Tema(or.respuestaId, or.respuesta, '1', null, null, null));
                      } else {
                        this.resp.push(new Tema(or.respuestaId, or.respuesta, null, null, null, null));
                      }
                    });

                    this.pregs.push( new Tema( pregunta.preguntaId
                                           , pregunta.pregunta
                                           , null
                                           , pregunta.respuestaPresentacionId
                                           , pregunta.justificacion
                                           , this.resp)
                                );
                    this.grupPregSkill[ins][jj] = pregunta.preguntaId;
                    this.grupOpcSkill[ins][jj]  = pregunta.respuestaPresentacionId;
                    this.grupResSkill[ins][jj]  = pregunta.justificacion;
              });
                  this.temas.push( new Tema(
              reservacion.preguntasExamen[ins].temaId,
              reservacion.preguntasExamen[ins].tema,
              reservacion.preguntasExamen[ins].color,
              null,
              null,
              this.pregs) );
            }
        });
  }
  onSubmit() {
    this.SaveRespuestas = [];
    for (let i = 0; i < this.grupPregSkill.length; i++) {
      for (let j = 0; j < this.grupPregSkill[i].length; j++) {
        if ( this.grupOpcSkill[i][j] != null) {
          this.SaveRespuestas.push( new Respuesta( this.grupPregSkill[i][j], this.grupOpcSkill[i][j], this.grupResSkill[i][j] ) );
        }
      }
    }

    this.preguntas.respuestaExamen(this.examenReservacionId, this.SaveRespuestas).subscribe(
          respuesta => {
            this.toastr.successToastr('Se ha guardado la sección de Conocimiento y Habilidades', '¡Se ha logrado!');
          }
        );
  }

  terminaExamen() {
    let mensaje = '';
    let sonTodas = true;
    this.SaveRespuestas = [];
    for (let i = 0; i < this.grupPregSkill.length; i++) {
      for (let j = 0; j < this.grupPregSkill[i].length; j++) {
        if ( this.grupOpcSkill[i][j] != null && this.grupResSkill[i][j] != null) {
          this.SaveRespuestas.push( new Respuesta( this.grupPregSkill[i][j], this.grupOpcSkill[i][j], this.grupResSkill[i][j] ) );
        } else {
          if ( this.grupOpcSkill[i][j] == null) {
            sonTodas = false;
            mensaje += 'Para terminar el examen, Todas las preguntas deben contestarse.';
            break;
          }

          if ( this.grupResSkill[i][j] == null) {
            sonTodas = false;
            mensaje += 'Para terminar el examen, Todas las justificaciones deben contestarse.';
            break;
          }
        }
      }
    }

    this.preguntas.respuestaExamen(this.examenReservacionId, this.SaveRespuestas).subscribe(
        respuesta => {
          this.toastr.successToastr('Se ha guardado la sección de Conocimiento y Habilidades', '¡Se ha logrado!');
        }
    );

    if (sonTodas) {
      this.preguntas.terminaExamen(this.examenReservacionId).subscribe(
          respuesta => {
            this.isdisabledFinish = true;
            this.isdisabled = true;
            this.toastr.successToastr('Se actualizo a examen Finalizado', '¡Se ha logrado!');
            this.preguntas.accion.next('califica');
          }
      );

    } else {
      this.toastr.errorToastr(mensaje, 'Lo siento,');
    }
  }
}
