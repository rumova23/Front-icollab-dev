import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ToastrManager} from 'ng6-toastr-notifications';
import {PersonalCompetenteService} from 'src/app/compliance/services/personal-competente.service';
import {DatePipe} from '@angular/common';
import {EventService} from '../../../../../core/services/event.service';
import {PerfilComboService} from '../../../../../core/services/perfil-combo.service';
import {CatalogoMaestroService} from '../../../../../core/services/catalogo-maestro.service';
import {GlobalService} from '../../../../../core/globals/global.service';
import {EventMessage} from '../../../../../core/models/EventMessage';
import {EventBlocked} from '../../../../../core/models/EventBlocked';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Combo} from '../../../../models/Combo';

export interface RegisterPersonal {
  orden: number;
  empleadoId: number;
  numEmpleado: string;
  nombre: string;
  apPaterno: string;
  apMaterno: string;
  genero: string;
  posicion: string;
  departamento: string;
  puesto: string;
  lugarDeTrabajo: string;
  usuarioModifico: string;
  fechaHoraUltimaModificacion: string;
  estatus:string;
  ver: string;
  editar: string;
  // pdf: string;
  eliminar: string;
  mensajeEliminar: string;
}

export class RegisterPersonalImp implements RegisterPersonal {
  orden: number;
  empleadoId: number;
  numEmpleado: string;
  nombre: string;
  apPaterno: string;
  apMaterno: string;
  genero: string;
  posicion: string;
  departamento: string;
  puesto: string;
  lugarDeTrabajo: string;
  usuarioModifico: string;
  fechaHoraUltimaModificacion: string;
  estatus:string;
  ver: string;
  editar: string;
  //pdf: string;
  eliminar: string;
  mensajeEliminar: string;
  constructor(orden: number, empleadoId: number, numEmpleado: string, nombre: string,
              apPaterno: string, apMaterno: string, genero: string,
              posicion: string, departamento: string, puesto: string,
              lugarDeTrabajo: string, usuarioModifico: string, fechaHoraUltimaModificacion: string,
              estatus:string, ver: string, editar: string,/// pdf: string,
              eliminar: string, mensajeEliminar: string
  ) {
    this.orden = orden;
    this.empleadoId = empleadoId;
    this.numEmpleado = numEmpleado;
    this.nombre = nombre;
    this.apPaterno = apPaterno;
    this.apMaterno = apMaterno;
    this.genero = genero;
    this.posicion = posicion;
    this.departamento = departamento;
    this.puesto = puesto;
    this.lugarDeTrabajo = lugarDeTrabajo;
    this.usuarioModifico = usuarioModifico;
    this.fechaHoraUltimaModificacion = fechaHoraUltimaModificacion;
    this.estatus = estatus;
    this.ver = ver;
    this.editar = editar;
    // this.pdf = pdf;
    this.eliminar = eliminar;
    this.mensajeEliminar = mensajeEliminar;
  }
}

@Component({
  selector: 'app-compliance-add-staff',
  templateUrl: './complianceAddStaff.component.html',
  styleUrls: ['./complianceAddStaff.component.scss'],
  providers: [DatePipe]
})
export class ComplianceAddStaffComponent implements OnInit {
  comboStatus: Array<any>;
  filterForm: FormGroup;
  elementData: Array<RegisterPersonal>;
  titulo: string = 'Personal Interno';
  inTitulo: string = 'Confirmacion';
  registros = new MatTableDataSource<RegisterPersonal>();
  columnas: string[] = ['orden', 'numEmpleado', 'nombre', 'apPaterno', 'apMaterno', 'genero', 'posicion', 'departamento', 'puesto', 'lugarDeTrabajo','Usuario Modifico','Fecha_y_Hora_de_Ultima_Modificación','Estatus', 'ver', 'editar',  'eliminar'];
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
              public toastr: ToastrManager,
              public globalService: GlobalService,
              private datePipe: DatePipe,
              private formBuilder: FormBuilder,
  ) { }


  getCatalog(index, catalog) {
    this.catalogoMaestroService.getCatalogoIndividual(catalog).subscribe(
        (dataBack) => {
          console.log("dataBack");
          console.log(dataBack);
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
    this.getDataSource();

    this.comboStatus = [];

    this.comboStatus.push(new Combo("",""));
    this.comboStatus.push(new Combo("1","Activo"));
    this.comboStatus.push(new Combo("0","Inactivo"));

    this.filterForm = this.formBuilder.group({
      fEmpNum: ['', Validators.required],
      fNames: ['', Validators.required],
      fLastName: ['', Validators.required],
      fSecondName: ['', Validators.required],
      fPosition: ['', Validators.required],
      fEst: ['', Validators.required],
      fLastHour: ['', Validators.required],
      fLastDate: ['', Validators.required],
      fDepto: ['', Validators.required],
      fJob: ['', Validators.required],
    });
  }

  getDataSource() {
    debugger;
    this.addBlock(1, null);
    this.elementData = [];
    this.personal.getEmpleados().subscribe(
        dataBack => {
          let estatus = dataBack['status'];
          if( estatus === 'exito' ){
            let index: number = 1;
            Object.keys(dataBack['empleados']).forEach(key => {
              const empleadoId = dataBack['empleados'][key].empleadoId;
              let empleadoStrId = dataBack['empleados'][key].empleadoStrId;
              let nombres = dataBack['empleados'][key].nombres;
              let paterno = dataBack['empleados'][key].paterno;
              let materno = dataBack['empleados'][key].materno;
              let generoId = dataBack['empleados'][key].generoId;
              let entidadEstatus = dataBack['empleados'][key].estidadEstatus;
              let posicionId = dataBack['empleados'][key].posicionId;
              let departamentoId = dataBack['empleados'][key].departamentoId;
              let puestoId = dataBack['empleados'][key].puestoId;
              let lugarTrabajoId = dataBack['empleados'][key].lugarTrabajoId;
              let userCreated = dataBack['empleados'][key].userCreated;
              let dateCreated = dataBack['empleados'][key].dateCreated;
              let userUpdated = dataBack['empleados'][key].userUpdated;
              let dateUpdated = dataBack['empleados'][key].dateUpdated != null ? this.datePipe.transform(new Date(dataBack['empleados'][key].dateUpdated), 'dd/MM/yyyy HH:mm') : "00/00/00 00:00";
              this.elementData.push(new RegisterPersonalImp(index, empleadoId, empleadoStrId, nombres, paterno, materno, generoId, posicionId, departamentoId, puestoId, lugarTrabajoId, userUpdated, dateUpdated, estatus, 'home-compliance/',
                  'home-compliance/',
                  'home-compliance',
                  'Esta seguro de eliminar el empleado numero: ' + empleadoStrId));
              index++;
            });

            console.log( this.elementData)
            this.registros = new MatTableDataSource<RegisterPersonal>(this.elementData);
            this.registros.paginator = this.paginator;
            this.registros.sort = this.sort;

            this.addBlock(2, null);
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
              this.eventService.sendChangePage(new EventMessage(10, {},'Compliance.registerPersonal'));
            }
          }
      );
    }
  }

  action(idEmpleado, tipo) {
    this.eventService.sendChangePage(new
    EventMessage(11, {
      idEmpleado: idEmpleado,
      tipo: tipo
    },'Compliance.registerPersonal.11'));
  }

  private addBlock(type, msg): void {
    this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
  }

  getTimeLocale(dateString: string): Date {
    const toConvertDate = new Date(dateString);
    const offsetTimeZone = toConvertDate.getTimezoneOffset() * 60000;
    return new Date(toConvertDate.getTime() + offsetTimeZone);
  }

  search(): RegisterPersonalImp[] {
    debugger;
    let arrayElements: RegisterPersonalImp[] = this.elementData;

    if(this.filterForm.controls['fEmpNum'].value != ''){
      arrayElements = arrayElements.filter(personal => {
        return personal.numEmpleado.toString() === this.filterForm.controls['fEmpNum'].value ? true: false;
      });
    }
    if(this.filterForm.controls['fNames'].value != ''){
      arrayElements = arrayElements.filter(personal => {
        return personal.nombre.toString().toUpperCase() === this.filterForm.controls['fNames'].value ? true: false;
      });
    }
    if(this.filterForm.controls['fLastName'].value != ''){
      arrayElements = arrayElements.filter(personal => {
        return personal.apPaterno.toString().toUpperCase() === this.filterForm.controls['fLastName'].value ? true: false;
      });
    }
    if(this.filterForm.controls['fSecondName'].value != ''){
      arrayElements = arrayElements.filter(personal => {
        return personal.apMaterno.toString().toUpperCase() === this.filterForm.controls['fSecondName'].value ? true: false;
      });
    }
    if(this.filterForm.controls['fPosition'].value != ''){
      arrayElements = arrayElements.filter(personal => {
        console.log(personal.posicion.toString())
        return personal.posicion.toString() === this.filterForm.controls['fPosition'].value.toString() ? true: false;
      });
    }if(this.filterForm.controls['fDepto'].value != ''){
      arrayElements = arrayElements.filter(personal => {
        return personal.departamento.toString() === this.filterForm.controls['fDepto'].value ? true : false;
      });
    }
    if(this.filterForm.controls['fJob'].value != ''){
      arrayElements = arrayElements.filter(personal => {
        console.log(personal.lugarDeTrabajo.toString())
        return personal.lugarDeTrabajo.toString() === this.filterForm.controls['fJob'].value ? true : false;
      });
    }
    if(this.filterForm.controls['fEst'].value != ''){
      arrayElements = arrayElements.filter(personal => {
        return personal.estatus.toString() === this.filterForm.controls['fEst'].value ? true: false;
      });
    }
    if(this.filterForm.controls['fLastDate'].value != '' && this.filterForm.controls['fLastHour'].value != ''){
      let dateLastUpdate = this.datePipe.transform(new Date(this.filterForm.controls['fLastDate'].value), 'dd/MM/yyyy') + ' ' + this.filterForm.controls['fLastHour'].value
      arrayElements = arrayElements.filter(personal => {
        return personal.fechaHoraUltimaModificacion.toString() === dateLastUpdate ? true : false;
      });
    }else if(this.filterForm.controls['fLastDate'].value === '' && this.filterForm.controls['fLastHour'].value != ''){
      this.toastr.errorToastr("Debe introducir una fecha", 'Lo siento,');
    }else if(this.filterForm.controls['fLastDate'].value != '' && this.filterForm.controls['fLastHour'].value === ''){
      this.toastr.errorToastr("Debe introducir una hora", 'Lo siento,');
    }

    return arrayElements;
  }

  filtros(){
    if(this.filterForm.controls['fEmpNum'].value != '' || this.filterForm.controls['fNames'].value != ''
        || this.filterForm.controls['fLastName'].value != '' || this.filterForm.controls['fSecondName'].value != ''
        || this.filterForm.controls['fPosition'].value != '' || this.filterForm.controls['fDepto'].value != ''
        || this.filterForm.controls['fJob'].value != '' || this.filterForm.controls['fEst'].value != ''
        || this.filterForm.controls['fLastDate'].value != '' || this.filterForm.controls['fLastHour'].value != ''){

      this.registros = new MatTableDataSource<RegisterPersonal>(this.search());
      this.registros.paginator = this.paginator;
      this.registros.sort = this.sort;

    }else{
      this.toastr.errorToastr("Debe llenar por lo menos 1 campo", 'Lo siento,');
    }
  }
}
