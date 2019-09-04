import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Respuesta } from 'src/app/compliance/models/Respuesta';
import { Tema } from 'src/app/compliance/models/Tema';
import { PerfilComboService } from 'src/app/core/services/perfil-combo.service';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  @Input() inIdEmpleado : number;
  @Input() inTipo : string;
  temas : Array<any>;
  idTemas : Array<any>;
  pregs : Array<any>;
  resp : Array<any>;
  grupResSkill = [[], [], [], [], [], [], [], [], [], [], []];
  grupOpcSkill = [[], [], [], [], [], [], [], [], [], [], []];
  grupPregSkill = [[], [], [], [], [], [], [], [], [], [], []];
  SaveRespuestas: Array<Respuesta>;
  examenReservacionId: number;
  entidadEstatusId: number;
  terminadoId: number;
  isdisabled = false;


  constructor(private cdRef: ChangeDetectorRef,
              private ruteo: ActivatedRoute,
              private preguntas: PerfilComboService,
              public  toastr: ToastrManager) { 

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


  this.preguntas.generaExamen(this.inIdEmpleado, 'DEFAULT').subscribe(
    data => {
      console.log("DDDDDDDDDDDDDDDDDDD");
      console.log(data);
      this.examenReservacionId = data["examenReservacionId"];  
      console.log("this.examenReservacionId=" + this.examenReservacionId );    

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
              //console.log("i=" + i + " j=" + j);
  
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
                  j = 0;
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
                this.grupPregSkill[i][j] = pregunta.preguntaId;
                //this.grupOpc[i][j]  = pregunta.respuestaPresentacionId;
                this.selectRadio(i,j,this.examenReservacionId, pregunta.preguntaId);
              });
  
            }
  
        }
    );

   }
  );

  }


  selectRadio(i:number, j:number, examenReservacionId:number, preguntaId:number){
    this.preguntas.getValoresAptitudes(examenReservacionId, preguntaId).subscribe(
      valor => {
        console.log("===valor===");
        console.log(valor);
        this.grupOpcSkill[i][j] = valor["respuetaId"];
        this.grupResSkill[i][j] = valor["justificacion"];
        //console.log(i + "," + j + "=" + this.grupOpcSkill[i][j]);
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

        console.log("this.examenReservacionId=" + this.examenReservacionId );

        this.preguntas.respuestaExamen(this.examenReservacionId, this.SaveRespuestas).subscribe(
          respuesta => {
            console.dir( respuesta  );

            //this.isdisabled = true;            
            //this.toastr.successToastr('Se Actualizo. Para examen de habilidades', '¡Se ha logrado!');
          }
        );        



  }


  terminaExamen() {
    let mensaje = '';
    let sonTodas = true;
    for (let i = 0; i < this.grupPregSkill.length; i++) {
      for (let j = 0; j < this.grupPregSkill[i].length; j++) {
        if ( this.grupOpcSkill[i][j] == null) {
          sonTodas = false;
          mensaje += 'Para terminar el examen, Todas las preguntas deben contestarse.'
          break;
        }

        if ( this.grupResSkill[i][j] == null) {
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
