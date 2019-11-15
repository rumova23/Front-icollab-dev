import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { PersonalCompetenteService } from 'src/app/compliance/services/personal-competente.service';
import { CatalogoMaestroService } from 'src/app/core/services/catalogo-maestro.service';
import { PerfilComboService } from 'src/app/core/services/perfil-combo.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { GlobalService } from 'src/app/core/globals/global.service';
import { EventBlocked } from 'src/app/core/models/EventBlocked';


export interface Personalcompetente {
  orden: number; // Este es unnúmero consecutivo que pertenece al orden en el que aparece en la tabla
  empleadoId: number;
  nEmpleado: string;
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
  mensajeEliminar: string;
}


export class PersonalcompetenteImp implements Personalcompetente {
  orden: number;
  empleadoId: number;
  nEmpleado: string;
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
  mensajeEliminar: string;
  constructor(orden: number, empleadoId: number, nEmpleado: string, nombre: string,
    appaterno: string, apmaterno: string, genero: string,
    posicion: string, departamento: string, puesto: string,
    lugartrabajo: string, fechevaluacion: string, status: string,
    ver: string, editar: string, pdf: string, eliminar: string
    ,nuevoexamen: string, mensajeEliminar: string
    ) {
    this.orden = orden;
    this.empleadoId = empleadoId;
    this.nEmpleado = nEmpleado;
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
    this.eliminar = eliminar;
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
  elementData: Array<Personalcompetente>;
  titulo: string = 'Personal Competente';
  inTitulo: string = 'Confirmacion';
  registros = new MatTableDataSource<Personalcompetente>();
  columnas: string[] = ['orden', 'nEmpleado', 'nombre', 'appaterno', 'apmaterno', 'genero', 'posicion', 'departamento', 'puesto', 'lugartrabajo', 'fechevaluacion', 'status', 'ver', 'editar',  'eliminar', 'nuevoexamen'];
  filters = [
    { label: "Nombre", inputtype: "text" },
    { label: "Apellido paterno", inputtype: "text" },
    { label: "Apellido Materno", inputtype: "text" },
    { label: "Género", inputtype: "select", options: [] },
    { label: "Posición", inputtype: "select", options: [] },
    { label: "Departamento", inputtype: "select", options: [] },
    { label: "Puesto", inputtype: "select", options: [] },
    { label: "Lugar de trabajo", inputtype: "select", options: [] },
  ];
  filtrobtn = { label: "buscar" };
  registros_x_pagina = [5, 10, 20, 30];

  constructor(private personal: PersonalCompetenteService,
    private catalogoMaestroService: CatalogoMaestroService,
    private preguntas: PerfilComboService,
    private eventService: EventService,
    public toastr: ToastrManager
   ,public globalService: GlobalService) {
  }

  getCatalog(index, catalog) {
    //this.catalogoMaestroService.getCatalogo(catalog).subscribe(
    this.catalogoMaestroService.getCatalogoIndividual(catalog).subscribe(
      (dataBack) => {
      console.log("dataBack");
      console.log(dataBack);
      //for (const cat of data) {
        //this.filters[index].options.push({ value: cat.opcion.codigo, viewValue: cat.opcion.codigo });
      //}
    });
  }


  loadCatalogs() {
    this.getCatalog(3, 'gender');
    this.getCatalog(4, 'position');
    this.getCatalog(5, 'department');
    this.getCatalog(6, 'workstation');
    this.getCatalog(7, 'employeePlace');
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.cargaTabla();
    //this.loadCatalogs();
  }

  alert = function (arg) {
    alert(arg);
  }

  resetSearch(){
    
  }

  cargaTabla() {
    
		this.addBlock(1, null);
    this.elementData = [];
    this.personal.getEmpleados().subscribe(
      resul => {

      if (!resul) {
        console.log('El back no responde');
      } else {
        let estatus = resul['status'];

        if (estatus === 'exito') {
          let index: number = 1;
          Object.keys(resul['empleados']).forEach(key => {
            const empleadoId = resul['empleados'][key].empleadoId;
            let empleadoStrId = resul['empleados'][key].empleadoStrId;
            let nombres = resul['empleados'][key].nombres;
            let paterno = resul['empleados'][key].paterno;
            let materno = resul['empleados'][key].materno;

            let generoId = resul['empleados'][key].generoId;
            let posicionId = resul['empleados'][key].posicionId;
            let departamentoId = resul['empleados'][key].departamentoId;
            let puestoId = resul['empleados'][key].puestoId;
            let lugarTrabajoId = resul['empleados'][key].lugarTrabajoId;
            
            this.elementData.push(new PersonalcompetenteImp(index, empleadoId, empleadoStrId, nombres, paterno, materno,
              generoId, posicionId, departamentoId, puestoId, lugarTrabajoId, 'por definir', 'por definir',
              'home-compliance/',
              'home-compliance/',
              'home-compliance/',
              'home-compliance/',
              'home-compliance',
              'Esta seguro de eliminar el empleado numero: ' + empleadoStrId));
            index++;
          });

          this.registros = new MatTableDataSource<Personalcompetente>(this.elementData);
          this.registros.paginator = this.paginator;
          this.registros.sort = this.sort;

          
				  this.addBlock(2, null);
        } else {
          console.log(resul['mensaje']);
        }
      }
    });

  }


  valorModal: number;
  eliminar($event, empleadoId: number) {
    this.valorModal = $event;
    /*si modal regresa 1 es que aceptado la operacion */
    if (this.valorModal == 1) {
      this.personal.deleteEliminar(empleadoId).subscribe(
        respuesta => {
          if (respuesta['status'] == "exito") {
            //alert('SUCCESS!! :-)\n\n' + JSON.stringify('Eliminacion exitosa'));
            //this.cargaTabla();

            this.eventService.sendChangePage(new EventMessage(10, {},'Compliance.Personal Competente')); 
          }
        }
      );
    }
  }

  generarExamen(empleadoId: number) {
    this.preguntas.generaExamen(empleadoId, '').subscribe(data => {
      this.toastr.successToastr('Se generaron los examenes correctamente', '¡Se ha logrado!');
    }
    );
  }


  action(idEmpleado, tipo) {
    this.eventService.sendChangePage(new
      EventMessage(11, { 
        idEmpleado: idEmpleado,
        tipo: tipo
      },'Compliance.Personal Competente.11'));
  }

	private addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
	}
}
