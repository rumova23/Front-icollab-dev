import {Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter} from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

import { Router, ActivatedRoute } from '@angular/router';
import { Respuesta } from 'src/app/compliance/models/Respuesta';
import { Tema } from 'src/app/compliance/models/Tema';
import { PerfilComboService } from 'src/app/core/services/perfil-combo.service';
import {EntidadEstausDTO} from '../../../models/entidad-estaus-dto';
import {EventMessage} from '../../../../core/models/EventMessage';
import {EventBlocked} from '../../../../core/models/EventBlocked';
import {EventService} from '../../../../core/services/event.service';
import {Constants} from '../../../../core/globals/Constants';


@Component({
  selector: 'app-behavior',
  templateUrl: './behaviorV2.component.html',
  styleUrls: ['./behavior.component.scss']
})
export class BehaviorComponent implements OnInit {
  @Input() inIdEmpleado: number;
  @Input() inTipo: string;
  @Input() entidadEstausTerminado: EntidadEstausDTO;
  @Output() isComplete = new EventEmitter<boolean>();
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
      private eventService: EventService,
      private cdRef: ChangeDetectorRef,
      private ruteo: ActivatedRoute,
      private router: Router,
      private preguntas: PerfilComboService,
      public toastr: ToastrManager) {
      this.preguntas.accion.subscribe(accion => {
          if (accion === 'guardaExamen') {
              this.guardaExamen();
          }
          if (accion === 'terminaExamen') {
              this.terminarExamen();
          }
      });
  }

  ngOnInit() {
      if (this.inTipo === 'ver') {
        this.isdisabled = true;
      }
      this.temas = [];
      this.totalPreg = [];
      this.idTemas = [ 'PSICOMETRICO DEFAULT'];

      this.addBlock(1, null);
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
                this.validaExamen();
           },
          error => {
              this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
              this.addBlock(2, null);
          }).add(() => {
          this.addBlock(2, null);
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

  validaExamen() {
      let flag = true;
      for (let i = 0; i < this.grupPreg.length; i++) {
          for (let j = 0; j < this.grupPreg[i].length; j++) {
              if ( this.grupOpc[i][j] == null && flag) {
                  this.isComplete.emit(false);
                  flag = false;
                  break;
              }
          }
      }
  }

  guardaExamen() {
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
              this.validaExamen();
          }
      );

      /*
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
      } */
  }

  terminarExamen() {
      this.preguntas.terminaExamen(this.examenReservacionId).subscribe(
          respuesta => {
              this.isdisabledFinishBehavior = true;
              this.isdisabled = true;
              this.toastr.successToastr('Se actualizo a examen Finalizado', '¡Se ha logrado!');
              this.preguntas.accion.next('califica');
          }
      );
  }

  private addBlock(type, msg): void {
      this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
  }
}
