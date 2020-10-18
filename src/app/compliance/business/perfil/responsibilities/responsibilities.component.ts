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

export interface categoria {
  nombre: String;
  actividades: actividades[];
}
export interface actividades {
  tag: string;
  actividad: string;
  aguila: string;
  sol: string;
  status: string;
  ejecutor: string;
  responsable: string;
  supervisor: string;
}

@Component({
  selector: 'app-responsibilities',
  templateUrl: './responsibilities.component.html',
  styleUrls: ['./responsibilities.component.scss']
})
export class ResponsibilitiesComponent implements OnInit {

  constructor( public tagsServ: PersonalCompetenteService ) {
    this.actividades = [];
    this.tags = [];
    this.cumplimientos = [];

    this.actividadesAsignados = [];
    this.tagsAsignados = [];
    this.cumplimientosAsignados = [];
  }
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
  plantaOpcTag = [];
  salvarPP: Array<any>;

  tagsId = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
  tagsValor = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
  valorModal: number;

  resuelveDS(respTagDTO) {
    console.log('Pintando arbol para signar');
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

  resuelveDSAsignados(data) {
    console.log('Pintando arbol de lo asignado');
    data.actvs.forEach( actividad => {
      actividad.cumplimi.forEach( cumplimiento => {
        cumplimiento.tagsRes.forEach( tg => {
          this.tagsAsignados.push(new ActiHijo( tg.id, tg.desc));
        });
        this.cumplimientosAsignados.push( new Acti( cumplimiento.id, cumplimiento.desc, this.tagsAsignados) );
      } );
      this.actividadesAsignados.push( new Acti( actividad.id, actividad.desc, this.cumplimientosAsignados) );
    });
  }
  ngOnInit() {
    this.plantas = [];
    this.perfiles = [];
    this.tagsServ.getTagsAsignacion(this.inIdEmpleado).subscribe(
    data1 => {
      console.dir(data1);
      this.resuelveDS(data1);
    });
    this.tagsServ.getTagsAsignado(this.inIdEmpleado).subscribe(
    data => {
      console.dir(data);
      this.resuelveDSAsignados(data);
    });
    this.tagsServ.getPlantaPerfil().subscribe (
      poRespuesta => {
        poRespuesta.perfil.forEach(perfil => {
          this.perfiles.push(new ActiHijo(perfil.id, perfil.desc));
        });
      }
    );
  }

  salvarTarea( ) {
    this.SaveRespuestas = [];
    for (let _i = 0; _i < this.tagsId.length; _i++) {
      for (let _j = 0; _j < this.tagsId[_i].length; _j++) {
        if ( this.tagsValor[_i][_j] != null) {
          this.SaveRespuestas.push(this.tagsId[_i][_j] + ':' + this.tagsValor[_i][_j] );
        }
      }
    }

    this.tagsServ.salvarTags( this.SaveRespuestas, this.inIdEmpleado ).subscribe(respuesta => {
          if ( respuesta.status === 'exito') {
            console.log(respuesta.mensaje);
          } else {
            console.log(respuesta.mensaje);
          }
    });
  }

  onChange(event, item) {
    console.log( event, item);
  }
  eliminar($event, empleadoId: number ) {
    this.valorModal = $event;
    /*si modal regresa 1 es que aceptado la operacion */
    if (this.valorModal === 1) {
    }
  }
  salvarPlantaPerfil() {
    this.salvarPP  = [];
    let index = 0;
    let indexT = 0;
    this.plantaOpcTag.forEach( tag => {
      this.plantaOpc.forEach(
        perf => {
          const campos = this.inIdEmpleado + ':'
              + this.plantaOpc[index] + ':'
              + this.plantaPerfilOpc[index] + ':'
              + this.plantaOpcTag[indexT];
          this.salvarPP.push(campos);
          index++;
        }
      );
      indexT++;
    });

    this.tagsServ.salvarPlantaPerfilEmpleado(this.salvarPP).subscribe(
      resultado => {
    });
  }

}
