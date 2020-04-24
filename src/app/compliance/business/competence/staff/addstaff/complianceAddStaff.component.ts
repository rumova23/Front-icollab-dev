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
import {ConfirmationDialogService} from '../../../../../core/services/confirmation-dialog.service';
import {OrderCatalogDTO} from '../../../../models/OrderCatalogDTO';

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
    elementData: any[] = [];
    titulo: string = 'Personal Interno';
    inTitulo: string = 'Confirmacion';
    registros = new MatTableDataSource<RegisterPersonal>();
    columnas: string[] = ['orden', 'numEmpleado', 'nombre', 'apPaterno', 'apMaterno', 'genero', 'posicion', 'departamento', 'puesto', 'lugarDeTrabajo','Usuario Modifico','Fecha_y_Hora_de_Ultima_Modificación','Estatus', 'ver', 'editar',  'eliminar'];
    rowPerPage = [5, 10, 20, 30];
    displayedColumnsOrder: any[] = [];
    displayedColumnsActions: any[]    = [];
    columnsToDisplay: string[] = [];
    generos: Array<any>;
    lugares: Array<any>;
    arryCata: Array<any>;
    result;
    constructor(private personal: PersonalCompetenteService,
                private catalogoMaestroService: CatalogoMaestroService,
                private preguntas: PerfilComboService,
                private eventService: EventService,
                public toastr: ToastrManager,
                public globalService: GlobalService,
                private datePipe: DatePipe,
                private formBuilder: FormBuilder,
                private confirmationDialogService: ConfirmationDialogService,
                private cmbos: PerfilComboService
    ) { }

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
                    dataBack => {
                        this.result = dataBack;
                        let i = 1;
                        for (const element of this.result.empleados){

                            const obj ={};
                            obj['order'] = i;
                            obj['numEmployee'] = element.empleadoStrId;
                            obj['idEmployee'] = element.empleadoId;
                            obj['name'] = element.nombres;
                            obj['lastName'] = element.paterno;
                            obj['secondName'] = element.materno;
                            let generoId = element.generoId;
                            obj['gender'] = this.generos.find(x => x.value === parseInt(generoId, 10)).label;
                            obj['position'] = element.posicion;
                            obj['department'] = element.departamento;
                            obj['marketStall'] = element.puestoTrabajo;
                            let workPlaceId = element.lugarTrabajoId;
                            obj['workPlace'] = this.lugares.find(x => x.value === parseInt(workPlaceId, 10)).label;
                            let userCreated = element.userCreated;
                            obj['userUpdated'] = element.userUpdated != null ? element.userUpdated : userCreated ;
                            let dateCreated = element.dateCreated;
                            obj['dateUpdated'] = element.dateUpdated != null ? this.datePipe.transform(new Date(element.dateUpdated), 'dd/MM/yyyy HH:mm') : this.datePipe.transform(new Date(dateCreated), 'dd/MM/yyyy HH:mm');
                            // obj['status'] = element.estidadEstatus;
                            //     obj['element']     = element;
                            i++;

                            this.elementData.push(obj);
                        }

                        this.displayedColumnsOrder = [
                            {key: 'order', label: 'Orden'}
                            , {key: 'numEmployee', label: 'No.Empleado'}
                            , {key: 'name', label: 'Nombre'}
                            , {key: 'lastName', label: 'Apellido Paterno'}
                            , {key: 'secondName', label: 'Apellido Materno'}
                            , {key: 'gender', label: 'Genero'}
                            , {key: 'position', label: 'Posicion'}
                            , {key: 'department', label: 'Departamento'}
                            , {key: 'marketStall', label: 'Puesto'}
                            , {key: 'workPlace', label: 'Lugar de Trabajo'}
                            , {key: 'userUpdated', label: 'Usuario Modificó'}
                            , {key: 'dateUpdated', label: 'Fecha y Hora última modificación'}
                            // , {key: 'status', label: 'Estatus'}
                        ];

                        this.displayedColumnsActions = [];
                        this.columnsToDisplay = [ 'order', 'numEmployee', 'name', 'lastName', 'secondName', 'gender', 'position', 'department','marketStall','workPlace','userUpdated','dateUpdated'];

                        this.displayedColumnsActions.push({key: 'sys_see', label: 'Ver'});
                        this.columnsToDisplay.push('sys_see');
                        this.displayedColumnsActions.push({key: 'sys_edit', label: 'Editar'});
                        this.columnsToDisplay.push('sys_edit');
                        this.displayedColumnsActions.push({key: 'sys_delete', label: 'Eliminar'});
                        this.columnsToDisplay.push('sys_delete');

                        console.log( this.elementData)
                        //this.registros = new MatTableDataSource<RegisterPersonal>(this.elementData);
                        this.registros = new MatTableDataSource<any>(this.elementData);
                        this.registros.paginator = this.paginator;
                        this.registros.sort = this.sort;

                        this.addBlock(2, null);
                    });
            }
        );
    }

    /*  valorModal: number;
      eliminar($event, empleadoId: number) {
        debugger;
        this.valorModal = $event;
     */   /*si modal regresa 1 es que aceptado la operacion */
    /*    if (this.valorModal == 1) {
          this.personal.deleteEliminar(empleadoId).subscribe(
              respuesta => {
                if (respuesta['status'] == "exito") {
                  this.eventService.sendChangePage(new EventMessage(10, {},'Compliance.registerPersonal'));
                }
              }
          );
        }
      } */
    eliminar(empleadoId: number) {
        debugger
        this.confirmationDialogService.confirm('Por favor, confirme..',
            'Está seguro de eliminar el registro ?')
            .then((confirmed) => {
                if(confirmed){
                    this.personal.deleteEliminar(empleadoId).subscribe(
                        respuesta => {
                            if (respuesta['status'] == "exito") {
                                this.toastr.successToastr('El registro fue correctamente eliminado', '¡Se ha logrado!');
                                this.eventService.sendChangePage(new EventMessage(10, {},'Compliance.registerPersonal'));
                            }
                        }, error => {

                        }
                    );
                }
            })
            .catch(() => console.log('Canceló eliminar'));
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

    search(): any[] {
        debugger;
        let arrayElements: any[] = this.elementData;

        if(this.filterForm.controls['fEmpNum'].value != ''){
            arrayElements = arrayElements.filter(personal => {
                return personal.numEmployee.toString() === this.filterForm.controls['fEmpNum'].value ? true: false;
            });
        }
        if(this.filterForm.controls['fNames'].value != ''){
            arrayElements = arrayElements.filter(personal => {
                return personal.name.toString().toUpperCase() === this.filterForm.controls['fNames'].value.toString().toUpperCase() ? true: false;
            });
        }
        if(this.filterForm.controls['fLastName'].value != ''){
            arrayElements = arrayElements.filter(personal => {
                return personal.lastName.toString().toUpperCase() === this.filterForm.controls['fLastName'].value.toString().toUpperCase() ? true: false;
            });
        }
        if(this.filterForm.controls['fSecondName'].value != ''){
            arrayElements = arrayElements.filter(personal => {
                return personal.secondName.toString().toUpperCase() === this.filterForm.controls['fSecondName'].value.toString().toUpperCase() ? true: false;
            });
        }
        if(this.filterForm.controls['fPosition'].value != ''){
            arrayElements = arrayElements.filter(personal => {
                console.log(personal.posicion.toString())
                return personal.position.toString() === this.filterForm.controls['fPosition'].value.toString() ? true: false;
            });
        }if(this.filterForm.controls['fDepto'].value != ''){
            arrayElements = arrayElements.filter(personal => {
                return personal.department.toString() === this.filterForm.controls['fDepto'].value ? true : false;
            });
        }
        if(this.filterForm.controls['fJob'].value != ''){
            arrayElements = arrayElements.filter(personal => {
                console.log(personal.lugarDeTrabajo.toString())
                return personal.workPlace.toString() === this.filterForm.controls['fJob'].value ? true : false;
            });
        }
        if(this.filterForm.controls['fEst'].value != ''){
            arrayElements = arrayElements.filter(personal => {
                return personal.status.toString() === this.filterForm.controls['fEst'].value ? true: false;
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
            let arrayElementData: any[] = this.elementData;
            this.registros = new MatTableDataSource<RegisterPersonal>(arrayElementData);
            this.registros.paginator = this.paginator;
            this.registros.sort = this.sort;
            this.toastr.errorToastr("Debe llenar por lo menos 1 campo", 'Lo siento,');
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
