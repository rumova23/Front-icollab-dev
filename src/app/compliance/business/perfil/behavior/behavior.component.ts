import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

import { Router, ActivatedRoute } from '@angular/router';
import { Respuesta } from 'src/app/compliance/models/Respuesta';
import { Tema } from 'src/app/compliance/models/Tema';
import { PerfilComboService } from 'src/app/core/services/perfil-combo.service';


@Component({
  selector: 'app-behavior',
  templateUrl: './behaviorV2.component.html',
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
  grupOpc = [[], [], [], [], [], [], [], [], [], [], []];
  grupPreg = [[], [], [], [], [], [], [], [], [], [], []];
  SaveRespuestas: Array<Respuesta>;
  SaveOpciones: Array<any>;
  arryCata: Array<any>;

  isdisabled = false;
  submitted = false;
  idRadio: string;
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
    console.log(" ===========================      BehaviorComponent       ===========================")
    console.log(" ===========================      BehaviorComponent       ===========================")

    if (this.inTipo === 'ver') {
      this.isdisabled = true;
    }
    this.temas = [];
    this.totalPreg = [];
    this.idTemas = [ 'PSICOMETRICO DEFAULT'];

    //this.preguntas.obtenPreguntasExamen('PSICOMETRICO DEFAULT', this.inIdEmpleado).subscribe(
    this.preguntas.generaExamen(this.inIdEmpleado, 'PSICOMETRICO DEFAULT').subscribe(
      data => {
        console.log("$$$$$$$$$$$$$$$");
        console.log(data);
        this.examenReservacionId = data["examenReservacionId"];  
        console.log("this.examenReservacionId=" + this.examenReservacionId );
      }
    );

    this.preguntas.obtenPreguntasExamen('2').subscribe(  
      reservacion => {
        console.log("BBBBBBBBBBBBBBBBB");
        console.dir(reservacion);

        //if ( reservacion.estatusGenerico === 'exito') {
          //this.examenReservacionId = reservacion.examenReservacionId;
          //this.entidadEstatusId = reservacion.entidadEstatusId;
          let i = 0;
          let j = -1;          
          let tema = "";
          this.pregs = [];

          for (let ins=0; ins < reservacion.length; ins++) {
            j += 1;
            console.log("i=" + i + " j=" + j);

            if ((tema !=reservacion[ins]["tema"]) || (ins == reservacion.length - 1)){
              tema = reservacion[ins]["tema"];               
              console.log("ins=" + ins + " | tema=" + tema );
              console.log("reservacion[ins].tema=" + reservacion[ins].tema);
              if (ins>0){
                this.temas.push( new Tema(
                  reservacion[ins-1].temaId,
                  reservacion[ins-1].tema,
                  reservacion[ins-1].color,
                  null,
                  null,
                  this.pregs) );

                i += 1;
                j = -1;
                this.pregs = [];
              }             
            }

            reservacion[ins].preguntas.forEach( pregunta => {  
              const optRes = pregunta.respuestas;
              this.resp = [];
              optRes.forEach( or => {
                if (or.respuesta!="No"){
                  this.resp.push(new Tema(or.respuestaId, or.respuesta, '1', null, null, null));
                }
                else{
                  this.resp.push(new Tema(or.respuestaId, or.respuesta, null, null, null, null));
                }
              });

              this.pregs.push( new Tema( pregunta.preguntaId
                                         ,pregunta.pregunta
                                         ,null
                                         ,pregunta.respuestaPresentacionId
                                         ,null
                                         ,this.resp) 
                              );
              this.grupPreg[i][j] = pregunta.preguntaId;
              this.grupOpc[i][j]  = pregunta.respuestaPresentacionId;
            });

          }
          //});
        //}
      }
    );

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

    this.preguntas.postRespuetaExamen(this.examenReservacionId, this.SaveRespuestas).subscribe(
        respuesta => {
          console.dir( respuesta  );

          this.isdisabled = true;
          this.toastr.errorToastr('Para terminar el examen, Todas las preguntas deben contestarse.', 'Lo siento,');

        }
    );
  }


  terminaExamen() {
    let sonTodas = true;
    for (let i = 0; i < this.grupPreg.length; i++) {
      for (let j = 0; j < this.grupPreg[i].length; j++) {
        if ( this.grupOpc[i][j] == null) {
          sonTodas = false;
          break;
        }
      }
    }
    if (sonTodas) {
      this.onSubmit();

      /*
      this.preguntas.terminaExamen(this.examenReservacionId).subscribe(
          respuesta => {
            this.toastr.successToastr('Se Actualizo a examen Finalizado. Para examen psicométrico', '¡Se ha logrado!');
          }
      );
      */

    } else {
      this.toastr.errorToastr('Para terminar el examen, Todas las preguntas deben contestarse.', 'Lo siento,');
    }
  }

  
}
