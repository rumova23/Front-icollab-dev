import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

import { Router, ActivatedRoute } from '@angular/router';
import { Respuesta } from 'src/app/compliance/models/Respuesta';
import { Tema } from 'src/app/compliance/models/Tema';
import { PerfilComboService } from 'src/app/core/services/perfil-combo.service';
import {EntidadEstausDTO} from '../../../models/entidad-estaus-dto';


@Component({
  selector: 'app-behavior',
  templateUrl: './behaviorV2.component.html',
  styleUrls: ['./behavior.component.scss']
})
export class BehaviorComponent implements OnInit {
  @Input() inIdEmpleado: number;
  @Input() inTipo: string;
  @Input() entidadEstausTerminado: EntidadEstausDTO;
  temas: Array<any>;
  idTemas: Array<any>;
  examenReservacionId: number;
  entidadEstatusId: number;
  pregs: Array<any>;
  totalPreg: Array<any>;
  resp: Array<any>;
  grupOpc = [[], []];
  grupPreg = [[], []];
  SaveRespuestas: Array<Respuesta>;

  isdisabled = false;
  isdisabledFinishBehavior = false;
  submitted = false;
  accionCalifica = 'false';

  constructor(
      private cdRef: ChangeDetectorRef,
      private ruteo: ActivatedRoute,
      private router: Router,
      private preguntas: PerfilComboService,
      public toastr: ToastrManager) {
  }

  ngOnInit() {
      if (this.inTipo === 'ver') {
      this.isdisabled = true;
    }
      this.temas = [];
      this.totalPreg = [];
      this.idTemas = [ 'PSICOMETRICO DEFAULT'];



      this.preguntas.obtenPreguntasExamen('PSICOMETRICO DEFAULT', this.inIdEmpleado).subscribe(
      reservacion => {

        this.examenReservacionId = reservacion.examenReservacionId;

        if (reservacion.entidadEstatusId === this.entidadEstausTerminado.entidadEstatusId) {
            this.isdisabled = true;
            this.isdisabledFinishBehavior = true;
        }
        let j = -1;
        this.pregs = [];


        for (let ins = 0; ins < reservacion.preguntasExamen.length; ins++) {
            this.pregs = [];
            j = -1;

            reservacion.preguntasExamen[ins].preguntas.forEach( pregunta => {
              j++;
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
                                         , null
                                         , this.resp)
                              );
              this.grupPreg[ins][j] = pregunta.preguntaId;
              this.grupOpc[ins][j]  = pregunta.respuestaPresentacionId;
            });
            this.temas.push( new Tema(
              reservacion.preguntasExamen[ins].temaId,
              reservacion.preguntasExamen[ins].tema,
              reservacion.preguntasExamen[ins].color,
              null,
              null,
              this.pregs));
          }
   });
 }

  onSubmit() {
    this.SaveRespuestas = [];
    for (let i = 0; i < this.grupPreg.length; i++) {
      for (let j = 0; j < this.grupPreg[i].length; j++) {
        if ( this.grupOpc[i][j] != null) {
          this.SaveRespuestas.push( new Respuesta( this.grupPreg[i][j], this.grupOpc[i][j], null ) );
        }
      }
    }

    this.preguntas.respuestaExamen(this.examenReservacionId, this.SaveRespuestas).subscribe(
        respuesta => {
          this.toastr.successToastr('Se ha guardado la sección de Comportamiento Personal', '¡Se ha logrado!');
        }
    );
  }


  terminaExamen() {

      let sonTodas = true;
      this.SaveRespuestas = [];
      for (let i = 0; i < this.grupPreg.length; i++) {
          for (let j = 0; j < this.grupPreg[i].length; j++) {
              if ( this.grupOpc[i][j] != null) {
                  this.SaveRespuestas.push( new Respuesta( this.grupPreg[i][j], this.grupOpc[i][j], null ) );
              } else {
                  sonTodas = false;
              }
          }
      }

      this.preguntas.respuestaExamen(this.examenReservacionId, this.SaveRespuestas).subscribe(
          respuesta => {
              this.toastr.successToastr('Se ha guardado la sección de Comportamiento Personal', '¡Se ha logrado!');
          }
      );

      if (sonTodas) {
          this.preguntas.terminaExamen(this.examenReservacionId).subscribe(
              respuesta => {
                  this.isdisabledFinishBehavior = true;
                  this.isdisabled = true;
                  this.toastr.successToastr('Se actualizo a examen Finalizado', '¡Se ha logrado!');
                  this.preguntas.accion.next('califica');
              }
          );

      } else {
          this.toastr.errorToastr('Para terminar el examen, Todas las preguntas deben contestarse.', 'Lo siento,');
      }
  }
}
