import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

import { Router, ActivatedRoute } from '@angular/router';
import { Respuesta } from 'src/app/compliance/models/Respuesta';
import { Tema } from 'src/app/compliance/models/Tema';
import { PerfilComboService } from 'src/app/core/services/perfil-combo.service';


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
  examenReservacionId: number;
  entidadEstatusId: number;
  terminadoId: number;
  pregs: Array<any>;
  totalPreg: Array<any>;
  resp: Array<any>;
  grupOpc = [[], []];
  grupPreg = [[], []];
  SaveRespuestas: Array<Respuesta>;
  SaveOpciones: Array<any>;
  arryCata: Array<any>;

  isdisabled = false;
  submitted = false;
  idRadio: string;
  isdisabledFinish = true;

  constructor(
      private cdRef: ChangeDetectorRef,
      private ruteo: ActivatedRoute,
      private router: Router,
      private preguntas: PerfilComboService,
      public toastr: ToastrManager) {
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
    this.totalPreg = [];
    this.idTemas = [ 'PSICOMETRICO DEFAULT'];

    this.preguntas.obtenPreguntasExamen('PSICOMETRICO DEFAULT', this.inIdEmpleado).subscribe(
      reservacion => {

        this.examenReservacionId = reservacion.examenReservacionId;
        // if ( reservacion.estatusGenerico === 'exito') {

          // this.entidadEstatusId = reservacion.entidadEstatusId;
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
              // this.selectRadio(i,j,this.examenReservacionId, pregunta.preguntaId);
            });
            this.temas.push( new Tema(
              reservacion.preguntasExamen[ins].temaId,
              reservacion.preguntasExamen[ins].tema,
              reservacion.preguntasExamen[ins].color,
              null,
              null,
              this.pregs));
          }

          // });
        // }
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

          this.isdisabledFinish = false;
          this.toastr.successToastr('Se ha guardado la sección de Comportamiento Personal', '¡Se ha logrado!');
        }
    );
  }


  terminaExamen() {
    let sonTodas = true;
    for (let i = 0; i < this.grupPreg.length; i++) {
      for (let j = 0; j < this.grupPreg[i].length; j++) {
        if ( this.grupOpc[i][j] == null) {
          sonTodas = false;
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
      this.toastr.errorToastr('Para terminar el examen, Todas las preguntas deben contestarse.', 'Lo siento,');
    }
  }


}
