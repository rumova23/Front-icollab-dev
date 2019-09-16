import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Respuesta } from 'src/app/compliance/models/Respuesta';
import { Tema } from 'src/app/compliance/models/Tema';
import { PerfilComboService } from 'src/app/core/services/perfil-combo.service';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventBlocked } from 'src/app/core/models/EventBlocked';

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
  grupResSkill = [[], [], []];
  grupOpcSkill = [[], [], []];
  grupPregSkill = [[], [], []];
  SaveRespuestas: Array<Respuesta>;
  examenReservacionId: number;
  entidadEstatusId: number;
  terminadoId: number;
  isdisabled = false;
  isdisabledFinish = true;

  constructor(private cdRef: ChangeDetectorRef,
              private ruteo: ActivatedRoute,
              private preguntas: PerfilComboService,
              public  toastr: ToastrManager,
              private eventService: EventService) {

  }



  ngOnInit() {
    /*
    this.preguntas.obtenEstatusTerminado('TX_EXAMEN_RESERVACION', 'Terminado').subscribe(
        data => {
          this.terminadoId = data.entidadEstatusId;
        }
    );
    */

    if (this.inTipo === 'ver') {
      this.isdisabled = true;
    }


    this.temas = [];
    this.idTemas = [ 'DEFAULT' ];
    this.preguntas.obtenPreguntasExamen('DEFAULT', this.inIdEmpleado).subscribe(reservacion => {
            let jj = -1;
            this.pregs = [];

            this.examenReservacionId = reservacion.examenReservacionId;

      // tslint:disable-next-line:prefer-for-of
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
                                           , null
                                           , this.resp)
                                );
                    this.grupPregSkill[ins][jj] = pregunta.preguntaId;
                    this.grupOpcSkill[ins][jj]  = pregunta.respuestaPresentacionId;
                // this.selectRadio(i, j, this.examenReservacionId, pregunta.preguntaId);
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
            this.isdisabledFinish = false;
            this.toastr.successToastr('Se ha guardado la sección de Conocimiento y Habilidades', '¡Se ha logrado!');
          }
        );



  }


  terminaExamen() {
    let mensaje = '';
    let sonTodas = true;
    for (let i = 0; i < this.grupPregSkill.length; i++) {
      for (let j = 0; j < this.grupPregSkill[i].length; j++) {
        if ( this.grupOpcSkill[i][j] == null && sonTodas) {
          sonTodas = false;
          mensaje += 'Para terminar el examen, Todas las preguntas deben contestarse.';
          break;
        }

        if ( this.grupResSkill[i][j] == null && mensaje.length < 70) {
          sonTodas = false;
          mensaje += 'Para terminar el examen, Todas las justificaciones deben contestarse.';
          break;
        }
      }
    }

    if (sonTodas) {
      this.preguntas.terminaExamen(this.examenReservacionId).subscribe(
          respuesta => {
            this.toastr.successToastr('Se actualizo a examen Finalizado', '¡Se ha logrado!');
          }
      );

    } else {
      this.toastr.errorToastr(mensaje, 'Lo siento,');
    }
  }


  // Loading
  private addBlock(type, msg): void {
    this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
  }


}
