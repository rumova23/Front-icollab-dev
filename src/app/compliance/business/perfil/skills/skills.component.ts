import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Respuesta } from 'src/app/compliance/models/Respuesta';
import { Tema } from 'src/app/compliance/models/Tema';
import { PerfilComboService } from 'src/app/core/services/perfil-combo.service';
import { GlobalService } from 'src/app/core/globals/global.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skillsV2.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  @Input() inIdEmpleado : number;
  @Input() inTipo : string;
  temas : Array<any>;
  idTemas : Array<any>;
  pregs : Array<any>;
  resp : Array<any>;
  grupRes = [[], [], [], [], [], [], [], [], [], [], []];
  grupOpc = [[], [], [], [], [], [], [], [], [], [], []];
  grupPreg = [[], [], [], [], [], [], [], [], [], [], []];
  SaveRespuestas: Array<Respuesta>;
  examenReservacionId: number;
  entidadEstatusId: number;
  terminadoId: number;
  isdisabled = false;


  constructor(private cdRef: ChangeDetectorRef,
              private ruteo: ActivatedRoute,
              private preguntas: PerfilComboService,
              public  toastr: ToastrManager,
              public globalService: GlobalService
              ) { 

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
    //this.preguntas.obtenPreguntasExamen('DEFAULT', this.inIdEmpleado).subscribe(

  
    this.preguntas.obtenPreguntasExamen('1').subscribe(
        reservacion => {
          console.log("PPPPPPPPPPPPPPP");
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
  
        }
    );



  }



  onSubmit() {
    this.SaveRespuestas = [];
    for (let i = 0; i < this.grupPreg.length; i++) {
      for (let j = 0; j < this.grupPreg[i].length; j++) {
        if ( this.grupOpc[i][j] != null) {
          this.SaveRespuestas.push( new Respuesta( this.grupPreg[i][j], this.grupOpc[i][j], this.grupRes[i][j] ) );
        }
      }
    }

    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    this.preguntas.generaExamen(this.inIdEmpleado, 'DEFAULT').subscribe(
      data => {
        console.log("@@@@@@@@@@@@@@@@@@@@@");
        console.log(data);
        this.examenReservacionId = data["examenReservacionId"];  
        console.log("this.examenReservacionId=" + this.examenReservacionId );

        this.preguntas.postRespuetaExamen(this.examenReservacionId, this.SaveRespuestas).subscribe(
          respuesta => {
            console.dir( respuesta  );

            this.isdisabled = true;            
            this.toastr.successToastr('Se Actualizo. Para examen de habilidades', '¡Se ha logrado!');
          }
        );        

      }
    );    


  }


  terminaExamen() {
    let mensaje = '';
    let sonTodas = true;
    for (let i = 0; i < this.grupPreg.length; i++) {
      for (let j = 0; j < this.grupPreg[i].length; j++) {
        if ( this.grupOpc[i][j] == null) {
          sonTodas = false;
          mensaje += 'Para terminar el examen, Todas las preguntas deben contestarse.'
          break;
        }

        if ( this.grupRes[i][j] == null) {
          sonTodas = false;
          mensaje += 'Para terminar el examen, Todas las justificaciones deben contestarse.'
          break;
        }
      }
    }

    if (sonTodas) {
      this.onSubmit();

      /*
      this.preguntas.terminaExamen(this.examenReservacionId).subscribe(
          respuesta => {
            this.toastr.successToastr('Se Actualizo. Para examen de habilidades', '¡Se ha logrado!');
          }
      );
      */
    } else {
      this.toastr.errorToastr(mensaje, 'Lo siento,');
    }
  }

}
