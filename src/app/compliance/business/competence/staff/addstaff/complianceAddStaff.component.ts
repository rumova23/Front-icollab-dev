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
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Combo} from '../../../../models/Combo';
import {ConfirmationDialogService} from '../../../../../core/services/confirmation-dialog.service';
import {OrderCatalogDTO} from '../../../../models/OrderCatalogDTO';
import {Constants} from '../../../../../core/globals/Constants';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import {Personalcompetente} from '../../../../models/Personalcompetente';
import {PersonalcompetenteImp} from '../../../../models/PersonalcompetenteImp';

@Component({
    selector: 'app-compliance-add-staff',
    templateUrl: './complianceAddStaff.component.html',
    styleUrls: ['./complianceAddStaff.component.scss'],
    providers: [DatePipe]
})
export class ComplianceAddStaffComponent implements OnInit {
    elementData: Array<Personalcompetente>;
    comboStatus: Array<any>;
    conditionSearch: Array<any>;
    filterForm: FormGroup;
    titulo = 'Competencia de los Recursos / Personal / Alta de Personal';
    subtitulo = 'Personal Interno';
    inTitulo = 'Confirmacion';
    registros = new MatTableDataSource<Personalcompetente>();
    columnas: string[] = ['orden', 'numEmpleado', 'nombre', 'apPaterno', 'apMaterno', 'genero', 'posicion', 'departamento', 'puesto', 'lugarDeTrabajo', 'usuarioModifico', 'fechaHoraUltimaModificacion', 'status', 'ver', 'editar',  'eliminar'];
    generos: Array<any>;
    lugares: Array<any>;
    arryCata: Array<any>;
    result;
    condition;
    stringToTrim = '';
    rowsPerPage = [50, 100, 250, 500];

    filteredfEmpNum     : string[];
    filteredfNames      : string[];
    filteredfLastName   : string[];
    filteredfSecondName : string[];
    filteredfPosition   : string[];
    filteredfDepto      : string[];
    filteredfJob        : string[];

    constructor(private personal: PersonalCompetenteService,
                private catalogoMaestroService: CatalogoMaestroService,
                private preguntas: PerfilComboService,
                private eventService: EventService,
                public toastr: ToastrManager,
                public globalService: GlobalService,
                private datePipe: DatePipe,
                private formBuilder: FormBuilder,
                private confirmationDialogService: ConfirmationDialogService,
                private cmbos: PerfilComboService) {
    }

    getCatalog(index, catalog) {
        this.catalogoMaestroService.getCatalogoIndividual(catalog).subscribe(
            (dataBack) => {
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
        this.conditionSearch = [];
        this.condition = '1';

        this.comboStatus.push(new Combo('', ''));
        this.comboStatus.push(new Combo('1', 'Activo'));
        this.comboStatus.push(new Combo('0', 'Inactivo'));

        this.conditionSearch.push(new Combo('1', 'Todos'));
        this.conditionSearch.push(new Combo('2', 'Al menos uno'));

        this.filterForm = this.formBuilder.group({
            fEmpNum: [''],
            fNames: [''],
            fLastName: [''],
            fSecondName: [''],
            fGender: [''],
            fPosition: [''],
            fEst: [''],
            fLastDate: [''],
            fDepto: [''],
            fJob: [''],
            fPlaceWork: [''],
            fSearchCondition: ['']
        });
    }
    initAutoComplete() {
        this.filteredfEmpNum      = this.elementData.map(d => d.numEmpleado.toLowerCase()   ).filter((el, index, arr) => arr.indexOf(el) === index);
        this.filteredfNames       = this.elementData.map(d => d.nombre.toLowerCase()        ).filter((el, index, arr) => arr.indexOf(el) === index);
        this.filteredfLastName    = this.elementData.map(d => d.apPaterno.toLowerCase()     ).filter((el, index, arr) => arr.indexOf(el) === index);
        this.filteredfSecondName  = this.elementData.map(d => d.apMaterno.toLowerCase()     ).filter((el, index, arr) => arr.indexOf(el) === index);
        this.filteredfPosition    = this.elementData.map(d => d.posicion.toLowerCase()      ).filter((el, index, arr) => arr.indexOf(el) === index);
        this.filteredfDepto       = this.elementData.map(d => d.departamento.toLowerCase()  ).filter((el, index, arr) => arr.indexOf(el) === index);
        this.filteredfJob         = this.elementData.map(d => d.puesto.toLowerCase()        ).filter((el, index, arr) => arr.indexOf(el) === index);
    }
    cargaTabla() {
        this.elementData = [];
        this.generos = [];
        this.lugares = [];
        this.arryCata = Array<OrderCatalogDTO>();
        this.arryCata.push( new OrderCatalogDTO('gender', 1, 1));
        this.arryCata.push( new OrderCatalogDTO('employeePlace', 1, 1));
        this.addBlock(1, 'Cargando...');
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
                                    let genero = this.generos.find(x => x.value === parseInt(resul['empleados'][key].generoId, 10)).label;
                                    let generoId = parseInt(resul['empleados'][key].generoId, 10);
                                    let posicion = resul['empleados'][key].posicion;
                                    let departamento = resul['empleados'][key].departamento;
                                    let puesto = resul['empleados'][key].puestoTrabajo;
                                    let lugarTrabajo = resul['empleados'][key].lugarTrabajoId != null ? this.lugares.find(x => x.value === parseInt(resul['empleados'][key].lugarTrabajoId, 10)).label : 'por definir';
                                    let lugarTrabajoId = parseInt(resul['empleados'][key].lugarTrabajoId, 10);
                                    let status = resul['empleados'][key].activo ? 'Activo' : 'Inactivo';
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
                                        genero,
                                        generoId,
                                        posicion,
                                        departamento,
                                        puesto,
                                        lugarTrabajo,
                                        lugarTrabajoId,
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


                                this.initAutoComplete();
                                this.addBlock(2, null);
                            } else {
                                console.log(resul['mensaje']);
                            }
                        }
                    });
            },
            error => {
                this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
                this.addBlock(2, null);
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
                    if (respuesta['status'] === 'exito') {
                        this.eventService.sendChangePage(new EventMessage(11, {}, 'Compliance.registerPersonal'));
                    }
                }
            );
        }
    }


    action(idEmpleado, tipo) {
        this.eventService.sendChangePage(new
        EventMessage(11, {
                idEmpleado: idEmpleado,
                tipo: tipo,
                elementData: this.elementData
            }, 'Compliance.registerPersonal.11'
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

    search(typeCondition: string): Personalcompetente[] {
        let arrayElements: Personalcompetente[] = this.elementData;
        let resultElements: Personalcompetente[] = [];
        let uniqueElements = new Set<Personalcompetente>();

        if (this.filterForm.controls['fEmpNum'].value !== '') {
            arrayElements = arrayElements.filter(personal => {
                return personal.numEmpleado.toString().toUpperCase() === this.filterForm.controls['fEmpNum'].value.toString().trimLeft().trimRight().toUpperCase() ? true : false;
            });
            if (typeCondition === 'OR') {
                resultElements = resultElements.concat(arrayElements);
                arrayElements = this.elementData;
            }
        }
        if (this.filterForm.controls['fNames'].value !== '') {
            arrayElements = arrayElements.filter(personal => {
                return personal.nombre.toString().toUpperCase() === this.filterForm.controls['fNames'].value.toString().trimLeft().trimRight().toUpperCase() ? true : false;
            });
            if (typeCondition === 'OR') {
                resultElements = resultElements.concat(arrayElements);
                arrayElements = this.elementData;
            }
        }
        if (this.filterForm.controls['fLastName'].value !== '') {
            arrayElements = arrayElements.filter(personal => {
                return personal.apPaterno.toString().toUpperCase() === this.filterForm.controls['fLastName'].value.toString().trimLeft().trimRight().toUpperCase() ? true : false;
            });
            if (typeCondition === 'OR') {
                resultElements = resultElements.concat(arrayElements);
                arrayElements = this.elementData;
            }
        }
        if (this.filterForm.controls['fSecondName'].value !== '') {
            arrayElements = arrayElements.filter(personal => {
                return personal.apMaterno.toString().toUpperCase() === this.filterForm.controls['fSecondName'].value.toString().trimLeft().trimRight().toUpperCase() ? true : false;
            });
            if (typeCondition === 'OR') {
                resultElements = resultElements.concat(arrayElements);
                arrayElements = this.elementData;
            }
        }
        if (this.filterForm.controls['fPosition'].value !== '') {
            arrayElements = arrayElements.filter(personal => {
                console.log(personal.posicion.toString())
                return personal.posicion.toString().toUpperCase() === this.filterForm.controls['fPosition'].value.toString().trimLeft().trimRight().toUpperCase() ? true : false;
            });
            if (typeCondition === 'OR') {
                resultElements = resultElements.concat(arrayElements);
                arrayElements = this.elementData;
            }
        }
        if (this.filterForm.controls['fDepto'].value !== '') {
            arrayElements = arrayElements.filter(personal => {
                return personal.departamento.toString().toUpperCase() === this.filterForm.controls['fDepto'].value.toString().trimLeft().trimRight().toUpperCase() ? true : false;
            });
            if (typeCondition === 'OR') {
                resultElements = resultElements.concat(arrayElements);
                arrayElements = this.elementData;
            }
        }
        if (this.filterForm.controls['fJob'].value !== '') {
            arrayElements = arrayElements.filter(personal => {
                return personal.puesto.toString().toUpperCase() === this.filterForm.controls['fJob'].value.toString().trimLeft().trimRight().toUpperCase() ? true : false;
            });
            if (typeCondition === 'OR') {
                resultElements = resultElements.concat(arrayElements);
                arrayElements = this.elementData;
            }
        }
        if (this.filterForm.controls['fEst'].value !== '') {
            arrayElements = arrayElements.filter(personal => {
                if (personal.status === null) {
                    return false;
                } else if (this.filterForm.controls['fEst'].value.toString() === '1' && personal.status.toString().toUpperCase() === 'ACTIVO') {
                    return true;
                } else if (this.filterForm.controls['fEst'].value.toString() === '0' && personal.status.toString().toUpperCase() === 'INACTIVO') {
                    return true;
                }
            });
        }
        if (this.filterForm.controls['fGender'].value !== '') {
            arrayElements = arrayElements.filter(personal => {
                if (personal.generoId === null) {
                    return false;
                } else if (this.filterForm.controls['fGender'].value.toUpperCase() === personal.generoId.toString().toUpperCase()) {
                    return true;
                }
            });
            if (typeCondition === 'OR') {
                resultElements = resultElements.concat(arrayElements);
                arrayElements = this.elementData;
            }
        }
        if (this.filterForm.controls['fPlaceWork'].value !== '') {
            arrayElements = arrayElements.filter(personal => {
                if (personal.lugarDeTrabajoId === null) {
                    return false;
                } else if (this.filterForm.controls['fPlaceWork'].value.toUpperCase() === personal.lugarDeTrabajoId.toString().toUpperCase()) {
                    return true;
                }
            });
            if (typeCondition === 'OR') {
                resultElements = resultElements.concat(arrayElements);
                arrayElements = this.elementData;
            }
        }
        if (this.filterForm.controls['fLastDate'].value !== '') {
            let dateLastUpdate = this.datePipe.transform(this.getTimeLocale(this.filterForm.controls['fLastDate'].value), 'dd/MM/yyyy');
            arrayElements = arrayElements.filter(personal => {
                return personal.fechaHoraUltimaModificacion.includes(dateLastUpdate) ? true : false;
            });
            if (typeCondition === 'OR') {
                resultElements = resultElements.concat(arrayElements);
                arrayElements = this.elementData;
            }
        }

        if (typeCondition === 'OR') {
            uniqueElements = new Set(resultElements);
            resultElements = Array.from(uniqueElements);
        }

        return typeCondition === 'AND' ? arrayElements : resultElements;
    }

    filtros() {
        const typeSearch = this.filterForm.controls['fSearchCondition'].value.toString() === '1' ? 'AND' : 'OR'; // 1. OR \ 2. AND for search conditions
        if (this.filterForm.controls['fEmpNum'].value !== '' || this.filterForm.controls['fNames'].value !== ''
            || this.filterForm.controls['fLastName'].value !== '' || this.filterForm.controls['fSecondName'].value !== ''
            || this.filterForm.controls['fPosition'].value !== '' || this.filterForm.controls['fDepto'].value !== ''
            || this.filterForm.controls['fJob'].value !== '' || this.filterForm.controls['fEst'].value !== ''
            || this.filterForm.controls['fLastDate'].value !== '' || this.filterForm.controls['fGender'].value !== ''
            || this.filterForm.controls['fPlaceWork'].value !== '') {

            this.registros = new MatTableDataSource<Personalcompetente>(this.search(typeSearch));
            this.registros.paginator = this.paginator;
            this.registros.sort = this.sort;

        } else {
            let arrayElementData: Personalcompetente[] = this.elementData;
            this.registros = new MatTableDataSource<Personalcompetente>(arrayElementData);
            this.registros.paginator = this.paginator;
            this.registros.sort = this.sort;
        }
    }

    limpiarFiltros() {
        this.filterForm.controls['fEmpNum'].setValue('');
        this.filterForm.controls['fNames'].setValue('');
        this.filterForm.controls['fLastName'].setValue('');
        this.filterForm.controls['fSecondName'].setValue('');
        this.filterForm.controls['fPosition'].setValue('');
        this.filterForm.controls['fDepto'].setValue('');
        this.filterForm.controls['fJob'].setValue('');
        this.filterForm.controls['fEst'].setValue('');
        this.filterForm.controls['fLastDate'].setValue('');
        this.filterForm.controls['fGender'].setValue('');
        this.filterForm.controls['fPlaceWork'].setValue('');

        let arrayElementData: Personalcompetente[] = this.elementData;
        this.registros = new MatTableDataSource<Personalcompetente>(arrayElementData);
        this.registros.paginator = this.paginator;
        this.registros.sort = this.sort;
    }

    resuelveDS(poRespuesta: Object, comp: string) {
        let catalogArray = [];
        if (!poRespuesta) {
            console.log("El back no responde");
        } else {
            let catalogs: any;
            catalogs = poRespuesta;
            catalogs.forEach(element => {
                if ( element.catalog === comp ) {
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
