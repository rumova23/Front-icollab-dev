import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { debug } from 'util';
import { PersonalCompetenteService } from 'src/app/compliance/services/personal-competente.service';

export interface Personalcompetente {
  orden: number; // Este es unnúmero consecutivo que pertenece al orden en el que aparece en la tabla
  empleadoId: number;
  n_empleado:string;
  nombre: string;
  appaterno: string;
  apmaterno: string;
  genero: string;
  posicion: string;
  departamento: string;
  puesto: string;
  lugartrabajo: string;
  fechevaluacion: string;
  status:string;
  ver: string;
  editar:string;
  pdf: string;
  eliminar: string;
  nuevoexamen:string;
  mensajeEliminar:string;
}

export class PersonalcompetenteImp implements Personalcompetente {
  orden: number;
  empleadoId: number;
  n_empleado: string;
  nombre: string;
  appaterno: string;
  apmaterno: string;
  genero: string;
  posicion: string;
  departamento: string;
  puesto: string;
  lugartrabajo: string;
  fechevaluacion: string;
  status: string;
  ver: string;
  editar: string;
  pdf: string;
  eliminar: string;
  nuevoexamen: string;
  mensajeEliminar:string;
    constructor(orden: number,   empleadoId: number, n_empleado:string, nombre: string, 
                appaterno: string, apmaterno: string, genero: string, 
                posicion: string, departamento: string, puesto: string, 
                lugartrabajo: string, fechevaluacion: string, status: string, 
                ver: string, editar:string, pdf: string, eliminar: string, nuevoexamen:string, mensajeEliminar:string) {
                  this.orden = orden;
                  this.empleadoId = empleadoId;
                  this.n_empleado = n_empleado;
                  this.nombre = nombre;
                  this.appaterno = appaterno;
                  this.apmaterno = apmaterno;
                  this.genero = genero;
                  this.posicion = posicion;
                  this.departamento = departamento;
                  this.puesto = puesto;
                  this.lugartrabajo = lugartrabajo;
                  this.fechevaluacion = fechevaluacion;
                  this.status = status;
                  this.ver = ver;
                  this.editar = editar;
                  this.pdf = pdf;
                  this.eliminar= eliminar;
                  this.nuevoexamen = nuevoexamen;
                  this.mensajeEliminar = mensajeEliminar;
   }
}
@Component({
  selector: 'app-competentStaff',
  templateUrl: './competentStaff.component.html',
  styleUrls: ['./competentStaff.component.scss']
})
export class CompetentStaffComponent implements OnInit {
  
  element_data: Array<Personalcompetente>;
  titulo: string = "Personal Competente";
  inTitulo: string = "Confirmacion";
  registros = new MatTableDataSource<Personalcompetente>();
  columnas: string[] = ['orden','n_empleado','nombre','appaterno','apmaterno','genero','posicion','departamento','puesto','lugartrabajo','fechevaluacion','status','ver','editar','pdf','eliminar','nuevoexamen'];
  filtros = [
    {label:"Nombre",inputtype:"text"},
    {label:"Apellido paterno",inputtype:"text"},
    {label:"Apellido Materno",inputtype:"text"},
    {label:"Género",inputtype:"text"},
    {label:"Posición",inputtype:"text"},
    {label:"Departamento",inputtype:"text"},
    {label:"Puesto",inputtype:"text"},
    {label:"Lugar de trabajo",inputtype:"text"},
  ];
  filtrobtn = {label:"buscar"};
  registros_x_pagina = [5, 10, 20, 30];

  constructor(private personal: PersonalCompetenteService ) { }
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  ngOnInit() {
    debugger;
    this.cargaTabla();
  }
  
  alert = function(arg){
    alert(arg);
  }

  cargaTabla(){
    this.element_data = [];
    this.personal.getEmpleados().subscribe(resul => {
      
      if ( !resul ){
        console.log("El back no responde");
      } else {
        let estatus = resul[ 'status' ];
       
        if ( estatus === 'exito'){
          let index: number = 1;
          Object.keys(resul[ 'empleados' ]).forEach( key => {
            let empleadoId = resul[ 'empleados' ][key].empleadoId;
            let empleadoStrId = resul[ 'empleados' ][key].empleadoStrId;
            let nombres = resul[ 'empleados' ][key].nombres;
            let paterno = resul[ 'empleados' ][key].paterno;
            let materno = resul[ 'empleados' ][key].materno;
            let generoId = resul[ 'empleados' ][key].generoId;
            let posicionId = resul[ 'empleados' ][key].posicionId;
            let departamentoId = resul[ 'empleados' ][key].departamentoId;
            let puestoId = resul[ 'empleados' ][key].puestoId;
            let lugarTrabajoId = resul[ 'empleados' ][key].lugarTrabajoId;
            this.element_data.push(new PersonalcompetenteImp(index,empleadoId,empleadoStrId,nombres,paterno,materno,
                                                             generoId, posicionId,departamentoId,puestoId,lugarTrabajoId,"por definir","por definir",
                                                             "home-compliance/",
                                                             "home-compliance/",
                                                             "home-compliance/",
                                                             "home-compliance/",
                                                             "home-compliance", "Esta seguro de eliminar el empelado numero: " + empleadoStrId))
            index++;
          });
          this.registros = new MatTableDataSource<Personalcompetente>(this.element_data);
          this.registros.paginator = this.paginator;
          this.registros.sort = this.sort;
        } else {
          console.log(resul[ 'mensaje' ]);
        }
      }
    });
  }

  
  valorModal: number;
  eliminar($event, empleadoId: number ){
    this.valorModal = $event;
    /*si modal regresa 1 es que aceptado la operacion */
    if(this.valorModal == 1){
      this.personal.deleteEliminar(empleadoId).subscribe(
        respuesta => {
          if(respuesta[ 'status' ] == "exito"){
            alert('SUCCESS!! :-)\n\n' + JSON.stringify('Eliminacion exitosa'));
            this.cargaTabla();
          }
        }
      );
    } 
  }

}
