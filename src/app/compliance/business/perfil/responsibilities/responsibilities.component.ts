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

  actividadesAsignados: Array<any>;
  cumplimientosAsignados: Array<any>;
  tagsAsignados: Array<any>;
  SaveRespuestas: Array<string>;
  plantas: Array<any>;
  perfiles: Array<any>;
  plantaOpc = [];
  plantaPerfilOpc = [];
  plantaOpcTag = []
  salvarPP: Array<any>;

  tagsId = [[], [], [], [], [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
  tagsValor = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

  constructor( public tagsServ: PersonalCompetenteService ) {
    this.actividades = [];
    this.tags = [];
    this.cumplimientos = [];

    this.actividadesAsignados = [];
    this.tagsAsignados = [];
    this.cumplimientosAsignados = [];
  }

  resuelveDS(respTagDTO) {
    respTagDTO.actvs.forEach( actividad => {
      actividad.cumplimi.forEach( cumplimiento => {
        cumplimiento.tagsRes.forEach( tg => {
          this.tags.push(new ActiHijo( tg.id, tg.desc));
        });
        this.cumplimientos.push( new Acti( cumplimiento.id, cumplimiento.desc, this.tags) );
      } );
      this.actividades.push( new Acti( actividad.id, actividad.desc, this.cumplimientos) );
    });
  }

  resuelveDSAsignados(respTagDTO) {
    respTagDTO.actvs.forEach( actividad => {
      actividad.cumplimi.forEach( cumplimiento => {
        cumplimiento.tagsRes.forEach( tg => {
          this.tagsAsignados.push(new ActiHijo( tg.id, tg.desc));
        });
        this.cumplimientosAsignados.push( new Acti( cumplimiento.id, cumplimiento.desc, this.tags) );
      } );
      this.actividadesAsignados.push( new Acti( actividad.id, actividad.desc, this.cumplimientos) );
    });
  }
  ngOnInit() {
    this.plantas = [];
    this.perfiles = [];
    this.tagsServ.getTagsAsignacion(this.inIdEmpleado).subscribe(
    respTagDTO => {
      this.resuelveDS(respTagDTO);
    });
    this.tagsServ.getTagsAsignado(this.inIdEmpleado).subscribe(
    respTagDTO => {
      this.resuelveDSAsignados(respTagDTO);
    });
    this.tagsServ.getPlantaPerfil().subscribe (
      poRespuesta => {
        poRespuesta.planta.forEach(planta => {
          this.plantas.push(new ActiHijo(planta.id, planta.desc));
        });

        poRespuesta.perfil.forEach(perfil => {
          this.perfiles.push(new ActiHijo(perfil.id, perfil.desc));
        });
      }
    );
  }

  salvarTarea( ) {
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
    });
  }

}
