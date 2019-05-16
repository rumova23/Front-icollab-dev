import { Component, OnInit, Input } from '@angular/core';
import { PersonalCompetenteService } from 'src/app/compliance/services/personal-competente.service';

export class ActiHijo {
  private id: number;
  private valor: string;

  constructor(
      id: number,
      valor: string
  ) {
      this.id = id;
      this.valor = valor;
  }
}

export class Acti {
  private id: number;
  private valor: string;
  private hijo: Array<any>;

  constructor(
      id: number,
      valor: string,
      hijo: Array<any>
  ) {
      this.id = id;
      this.valor = valor;
      this.hijo = hijo;
  }
}

export interface categoria{
  nombre:String;
  actividades:actividades[];
}
export interface actividades {
  tag: string;
  actividad: string;
  aguila: string;
  sol: string;
  status: string;
  ejecutor: string;
  responsable: string;
  supervisor:string;
}

@Component({
  selector: 'app-responsibilities',
  templateUrl: './responsibilities.component.html',
  styleUrls: ['./responsibilities.component.scss']
})
export class ResponsibilitiesComponent implements OnInit {
  @Input() inIdEmpleado: number;
  @Input() inTipo: string;
  @Input() isViewable: string;

  actividades: Array<any>;
  cumplimientos: Array<any>;
  tags: Array<any>;
  SaveRespuestas: Array<string>;
  plantas: Array<any>;
  perfiles: Array<any>;
  plantaOpc = [];
  plantaPerfilOpc = [];
  plantaOpcTag = []
  salvarPP: Array<any>;

  tagsId= [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
  tagsValor= [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

  tags_asignados=[];
  constructor( public tagsServ: PersonalCompetenteService ) { 
    
  }
 
  alert = function(arg){
    console.log(arg);
  }

  resuelveDS(poRespuesta: Object ){
    if ( !poRespuesta ){
      console.log("El back no responde");
    } else {
      let estatus = poRespuesta[ 'status' ];
      if ( estatus === 'exito'){
        this.actividades = [];
        Object.keys(poRespuesta[ 'actvs' ]).forEach( key => {
          let id = [poRespuesta[ 'actvs' ][key].id];
          let desc = [poRespuesta[ 'actvs' ][key].desc];
          let cumpli = [poRespuesta[ 'actvs' ][key].cumplimi][0];
         // this.pregs = [];
         cumpli.forEach( cumpli =>{ 
          this.cumplimientos  = [];
          let idC = cumpli.id;
          let descC = cumpli.desc;
          let tags = cumpli.tagsRes;
          this.tags = [];
          tags.forEach( tg =>{
            let idT = tg.id;
            let descT = tg.desc;
            this.tags.push(new ActiHijo( idT, descT));
          });
          this.cumplimientos.push( new Acti( idC, descC, this.tags) ); 
        } );
        this.actividades.push( new Acti( id[0], desc[0], this.cumplimientos) );
        });
      } else {
        console.log(poRespuesta[ 'mensaje' ]);
      }
    }
  }  

  resueveDSPlanta(poRespuesta: Object, obcj: Array<any>, comp: string ){
    if ( !poRespuesta ){
      console.log("El back no responde");
    } else {
      let estatus = poRespuesta[ 'status' ];
      if ( estatus === 'exito'){
        Object.keys(poRespuesta[ comp ]).forEach( key => {
          let id = [poRespuesta[ comp ][key].id];
          let desc = [poRespuesta[ comp ][key].desc];
          obcj.push(new ActiHijo(id[0],desc[0]));
        });
      } else {
        console.log(poRespuesta[ 'mensaje' ]);
      }
    }
  } 

  ngOnInit() {
    this.plantas = [];
    this.perfiles = [];
    this.tagsServ.getTagsAsignacion(this.inIdEmpleado).subscribe(
      poRespuesta => {
      this.resuelveDS(poRespuesta);
    });
    this.tagsServ.getPlantaPerfil().subscribe(
      poRespuesta => {
        this.resueveDSPlanta(poRespuesta, this.plantas, 'planta');
        this.resueveDSPlanta(poRespuesta, this.perfiles, 'perfil');
      }
    );

  }

  salvarTarea( ){
    this.SaveRespuestas = [];
    for (var _i = 0; _i < this.tagsId.length; _i++) {
      for (var _j = 0; _j < this.tagsId[_i].length; _j++) {
        if( this.tagsValor[_i][_j] != null){
          this.SaveRespuestas.push(this.tagsId[_i][_j] + ":" + this.tagsValor[_i][_j] );
        }
      }
    }

    this.tagsServ.salvarTags( this.SaveRespuestas, this.inIdEmpleado ).subscribe(
      respuesta => {
        if ( !respuesta ){
          console.log("El back no responde");
        } else {
          let estatus = respuesta[ 'status' ];
          if ( estatus === 'exito'){
            debugger;
          } else {
            console.log(respuesta[ 'mensaje' ]);
          }
        }
    });
  }

  onChange(event, item) {
    console.log( event, item);
  }
  valorModal: number;
  
  eliminar($event, empleadoId: number ){
    this.valorModal = $event;
    /*si modal regresa 1 es que aceptado la operacion */
    if(this.valorModal == 1){
      debugger;
    } 
  }
  
  salvarPlantaPerfil(){
    this.salvarPP  = [];
    let index: number = 0;
    let indexT: number = 0;
    this.plantaOpcTag.forEach( tag=>{
      this.plantaOpc.forEach(
        perf =>{
          /*let campos: string = "{ 'empleado': " + this.inIdEmpleado + ", 'planta':" + this.plantaOpc[index] + ", 'perfil':" + this.plantaPerfilOpc[index]+" }";*/
          let campos: string = this.inIdEmpleado + ":" + this.plantaOpc[index] + ":" + this.plantaPerfilOpc[index]+ ":" + this.plantaOpcTag[indexT];
          this.salvarPP.push(campos);
          index++;
        }
      );
      indexT++;
    }); 

    this.tagsServ.salvarPlantaPerfilEmpleado(this.salvarPP).subscribe(
      resultado =>{
        debugger;
    });
  }

}
