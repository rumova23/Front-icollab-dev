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
import {Combo} from '../../../models/Combo';
import {RegisterPersonal, RegisterPersonalImp} from '../../competence/staff/addstaff/complianceAddStaff.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {ConfirmationDialogService} from '../../../../core/services/confirmation-dialog.service';
import {OrderCatalogDTO} from '../../../models/OrderCatalogDTO';


export interface Personalcompetente {
    orden: number;
    empleadoId: number;
    numEmpleado: string;
    nombre: string;
    apPaterno: string;
    apMaterno: string;
    genero: string;
    posicion: string;
    departamento: string;
    lugartrabajo: string;
    lugarDeTrabajo: string;
    usuarioModifico: string;
    fechaHoraUltimaModificacion: string;
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
    numEmpleado: string;
    nombre: string;
    apPaterno: string;
    apMaterno: string;
    genero: string;
    posicion: string;
    departamento: string;
    lugartrabajo: string;
    lugarDeTrabajo: string;
    status: string;
    ver: string;
    editar: string;
    usuarioModifico: string;
    fechaHoraUltimaModificacion: string;
    pdf: string;
    eliminar: string;
    nuevoexamen: string;
    mensajeEliminar: string;
    constructor(orden: number, empleadoId: number, numEmpleado: string, nombre: string,
                apPaterno: string, apMaterno: string, genero: string,
                posicion: string, departamento: string,
                lugarDeTrabajo: string, status: string,
                usuarioModifico: string, fechaHoraUltimaModificacion: string,
                ver: string, editar: string,
                pdf: string, eliminar: string,
                nuevoexamen: string, mensajeEliminar: string
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
        this.lugarDeTrabajo = lugarDeTrabajo;
        this.status = status;
        this.ver = ver;
        this.editar = editar;
        this.usuarioModifico = usuarioModifico;
        this.fechaHoraUltimaModificacion = fechaHoraUltimaModificacion;
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
    comboStatus: Array<any>;
    filterForm: FormGroup;
    titulo: string = 'Personal Interno';
    inTitulo: string = 'Confirmacion';
    registros = new MatTableDataSource<Personalcompetente>();
    columnas: string[] = ['orden', 'numEmpleado', 'nombre', 'apPaterno', 'apMaterno', 'genero', 'posicion', 'departamento', 'lugarDeTrabajo', 'usuarioModifico', 'fechaHoraUltimaModificacion', 'status', 'ver', 'editar',  'eliminar', 'nuevoexamen'];
    generos: Array<any>;
    lugares: Array<any>;
    arryCata: Array<any>;
    result;
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
    registros_x_pagina = [10, 20, 30];

    constructor(private personal: PersonalCompetenteService,
                private catalogoMaestroService: CatalogoMaestroService,
                private preguntas: PerfilComboService,
                private eventService: EventService,
                public toastr: ToastrManager
        ,public globalService: GlobalService,
                private datePipe: DatePipe,
                private formBuilder: FormBuilder,
                private confirmationDialogService: ConfirmationDialogService,
                private cmbos: PerfilComboService) {
    }

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
        this.cargaTabla();
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

    cargaTabla() {
        this.addBlock(1, null);
        this.elementData = [];
        this.generos = [];
        this.lugares = [];
        this.arryCata = Array<OrderCatalogDTO>();
        this.arryCata.push( new OrderCatalogDTO('gender', 1, 1));
        this.arryCata.push( new OrderCatalogDTO('employeePlace',1,1));
        this.cmbos.getlistCatalogoOrdenados(this.arryCata).subscribe(
            poRespuesta => {
                this.generos = this.resuelveDS(poRespuesta, 'gender');
                this.lugares = this.resuelveDS(poRespuesta, 'employeePlace');
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
                                    let empleadoStrId = resul['empleados'][key].userId;
                                    let nombres = resul['empleados'][key].nombres;
                                    let paterno = resul['empleados'][key].paterno;
                                    let materno = resul['empleados'][key].materno;

                                    let generoId = this.generos.find(x => x.value === parseInt(resul['empleados'][key].generoId, 10)).label;
                                    let posicion = resul['empleados'][key].posicion;
                                    let departamento = resul['empleados'][key].departamento;
                                    let lugarTrabajo = resul['empleados'][key].lugarTrabajoId != null ? this.lugares.find(x => x.value === parseInt(resul['empleados'][key].lugarTrabajoId, 10)).label: 'por definir';
                                    let status = resul['empleados'][key].estidadEstatus;
                                    let usuarioCreo = resul['empleados'][key].userCreated;
                                    let usuarioModifico = resul['empleados'][key].userUpdated != null ? resul['empleados'][key].userUpdated : usuarioCreo;
                                    let fechaCreo = resul['empleados'][key].dateCreated;
                                    let fechaUltimaModificacion = resul['empleados'][key].dateUpdated != null ? this.datePipe.transform(new Date(resul['empleados'][key].dateUpdated), 'dd/MM/yyyy HH:mm') : this.datePipe.transform(new Date(fechaCreo), 'dd/MM/yyyy HH:mm');

                                    this.elementData.push(new PersonalcompetenteImp(
                                        index,
                                        empleadoId,
                                        empleadoStrId,
                                        nombres,
                                        paterno,
                                        materno,
                                        generoId,
                                        posicion,
                                        departamento,
                                        lugarTrabajo,
                                        status,
                                        usuarioModifico,
                                        fechaUltimaModificacion,
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
        );
    }


    valorModal: number;
    eliminar($event, empleadoId: number) {
        this.valorModal = $event;
        /*si modal regresa 1 es que aceptado la operacion */
        if (this.valorModal == 1) {
            this.personal.deleteEliminar(empleadoId).subscribe(
                respuesta => {
                    if (respuesta['status'] == "exito") {
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
            },'Compliance.Personal Competente.11'
        ));
    }

    private addBlock(type, msg): void {
        this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
    }

    getTimeLocale(dateString: string): Date {
        const toConvertDate = new Date(dateString);
        const offsetTimeZone = toConvertDate.getTimezoneOffset() * 60000;
        return new Date(toConvertDate.getTime() + offsetTimeZone);
    }

    search(): Personalcompetente[] {
        let arrayElements: Personalcompetente[] = this.elementData;

        if(this.filterForm.controls['fEmpNum'].value != ''){
            arrayElements = arrayElements.filter(personal => {
                return personal.numEmpleado.toString() === this.filterForm.controls['fEmpNum'].value ? true : false;
            });
        }
        if(this.filterForm.controls['fNames'].value != ''){
            arrayElements = arrayElements.filter(personal => {
                return personal.nombre.toString().toUpperCase() === this.filterForm.controls['fNames'].value.toString().toUpperCase() ? true : false;
            });
        }
        if(this.filterForm.controls['fLastName'].value != ''){
            arrayElements = arrayElements.filter(personal => {
                return personal.apPaterno.toString().toUpperCase() === this.filterForm.controls['fLastName'].value.toString().toUpperCase() ? true : false;
            });
        }
        if(this.filterForm.controls['fSecondName'].value != ''){
            arrayElements = arrayElements.filter(personal => {
                return personal.apMaterno.toString().toUpperCase() === this.filterForm.controls['fSecondName'].value.toString().toUpperCase() ? true : false;
            });
        }
        if(this.filterForm.controls['fPosition'].value != ''){
            arrayElements = arrayElements.filter(personal => {
                console.log(personal.posicion.toString())
                return personal.posicion.toString() === this.filterForm.controls['fPosition'].value.toString() ? true : false;
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
                return personal.status.toString() === this.filterForm.controls['fEst'].value ? true : false;
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

            this.registros = new MatTableDataSource<Personalcompetente>(this.search());
            this.registros.paginator = this.paginator;
            this.registros.sort = this.sort;

        }else{
            let arrayElementData: Personalcompetente[] = this.elementData;
            this.registros = new MatTableDataSource<Personalcompetente>(arrayElementData);
            this.registros.paginator = this.paginator;
            this.registros.sort = this.sort;
        }
    }

    resuelveDS(poRespuesta: Object, comp: string) {
        let catalogArray = [];
        if (!poRespuesta) {
            console.log("El back no responde");
        } else {
            let catalogs: any;
            catalogs = poRespuesta;
            catalogs.forEach(element => {
                if ( element.catalog === comp ){
                    element.data.forEach ( elementCatalog => {
                        let value = elementCatalog.id;
                        let label = elementCatalog.code;
                        catalogArray.push(new Combo(value, label));
                    });
                }
            });
        }
        return catalogArray;
    }
}
