import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PerfilComboService } from 'src/app/core/services/perfil-combo.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import { GlobalService } from 'src/app/core/globals/global.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { OrderCatalogDTO } from 'src/app/compliance/models/OrderCatalogDTO';
import { EventService } from 'src/app/core/services/event.service';
import { Detalle } from '../../models/Detalle';
import { Empleado } from '../../models/Empleado';
import { Combo } from '../../models/Combo';
import { DomSanitizer } from '@angular/platform-browser';
import {split} from 'ts-node';
import {Constants} from '../../../core/globals/Constants';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil_v2.component.html',
    styleUrls: ['./perfil.component.scss'],
    providers: [DatePipe]
})
export class PerfilComponent implements OnInit {
    @Input() inIdEmpleado: number;
    @Input() inTipo: string;
    @Input() isViewable: string;
    @Input() accion: string;
    title = 'Datos Personales / Perfil de Puesto';
    generos: Array<any>;
    grados: Array<any>;
    horarios: Array<any>;
    lugares: Array<any>;
    personas: Array<any>;
    enterprisePreffix: Array<any>;
    arryCata: Array<any>;
    perfilForm: FormGroup;
    submitted = false;

    disabledSave = true;
    checkedEstatus = false;
    deshabiliarEstatus = false;
    isdisabled: boolean = false;
    isdisableIdEmp: boolean = false;
    isdisableEnterprisePreffix: boolean = false;
    isdisabledName: boolean = false;
    requiredPhoto: boolean = true;

    labBotAcep = 'Guardar';

    gender;
    educationLevel;
    position;
    department;
    workstation;
    employeeBoss;
    workingHour;
    employeePlace;
    employeeDependent;
    enterprise;
    imageUrl: string | ArrayBuffer = '../../../assets/img/foto.png';
    fileName: string = 'No file selected';
    file: File;
    photo;
    byteArray;
    elementData: any[] = [];
    result;

    constructor(private cmbos: PerfilComboService,
                private formBuilder: FormBuilder,
                public toastr: ToastrManager,
                public globalService: GlobalService,
                private eventService: EventService,
                private datePipe: DatePipe) { }

    ngOnInit() {
        if ( this.inIdEmpleado > 0) {
            this.labBotAcep = 'Modificar';
        }

        this.setCombos();


        if (this.inTipo === 'ver') {
            this.isdisabled = true;
            this.isdisableIdEmp = true;
            this.isdisableEnterprisePreffix = true;
            this.deshabiliarEstatus = true;
            this.isdisabledName = true;
        }

        if (this.inTipo === 'guardar' || this.inTipo === 'editar') {
            this.isdisableIdEmp = true;
            this.deshabiliarEstatus = false;
        }

        if (this.inTipo === 'editar') {
            this.isdisabledName = true;
            this.isdisableEnterprisePreffix = true;
        }

        if (this.inTipo === 'guardar') {
            this.checkedEstatus = true;
        }

        this.perfilForm = this.formBuilder.group({
            fEnterprise: [{ value: '', disabled: this.isdisableEnterprisePreffix }, Validators.required],
            fEmpNum: [{ value: '', disabled: this.isdisableIdEmp }, Validators.required],
            fNames: [{ value: '', disabled: this.isdisabledName }, Validators.required],
            fLastName: [{ value: '', disabled: this.isdisabledName }, Validators.required],
            fSecondName: [{ value: '', disabled: this.isdisabledName }, Validators.required],
            fGender: [{ value: '', disabled: this.isdisabled }, Validators.required],
            fDateBirth: [{ value: '', disabled: this.isdisabled }, Validators.required],
            fLevelStudy: [{ value: '', disabled: this.isdisabled }, Validators.required],
            fCareer: [{ value: '', disabled: this.isdisabled }, Validators.required],
            fPosition: [{ value: '', disabled: this.isdisabled }, Validators.required],
            fDepto: [{ value: '', disabled: this.isdisabled }, Validators.required],
            fJob: [{ value: '', disabled: this.isdisabled }, Validators.required],
            fImmBoss: [{ value: '', disabled: this.isdisabled }, Validators.required],
            fWorkHours: [{ value: '', disabled: this.isdisabled }, Validators.required],
            fWorkplace: [{ value: '', disabled: this.isdisabled }, Validators.required],
            fStartJob: [{ value: '', disabled: this.isdisabled }, Validators.required],
            fPerCarg: [{ value: '', disabled: this.isdisabled }, Validators.required],
            fJobDescription: [{ value: '', disabled: this.isdisabled }, Validators.required],
            fPhoto: [{ value: '', disabled: this.isdisabled }, Validators.required]
        });

        if (this.inTipo === "ver" || this.inTipo === "editar") {
            this.cmbos.getEmpleado(this.inIdEmpleado).subscribe(
                respuesta => {
                    const currentDate = new Date().toISOString().substring(0, 10);
                    this.perfilForm.controls['fEmpNum'].setValue(respuesta[ 'userId' ]);
                    this.enterprise = (respuesta['userId'] as string).split('-')[0];
                    this.perfilForm.controls['fEnterprise'].setValue(this.enterprisePreffix.find(x => x.label === this.enterprise).value);
                    this.perfilForm.controls['fSecondName'].setValue(respuesta[ 'materno' ]);
                    this.perfilForm.controls['fNames'].setValue(respuesta[ 'nombres' ]);
                    this.perfilForm.controls['fLastName'].setValue(respuesta[ 'paterno' ]);
                    this.perfilForm.controls['fCareer'].setValue(respuesta[ 'carrera' ]);

                    this.perfilForm.controls['fGender'].patchValue(respuesta[ 'generoId' ]+'');
                    this.perfilForm.controls['fLevelStudy'].setValue(respuesta[ 'gradoEstudioId' ]+'');

                    let bornD = this.datePipe.transform(
                        (new Date(respuesta['fechanacimiento'].substring(0, 10))).getTime() + (60 * 60 * 24 * 1000)
                        , 'yyyy-MM-dd');

                    this.perfilForm.controls['fDateBirth'].setValue(bornD);

                    this.gender         = respuesta['generoId'];
                    this.educationLevel = respuesta['gradoEstudioId'];
                    this.checkedEstatus = respuesta['estidadEstatus'];
                    if (respuesta['foto'] !== null) {
                        this.imageUrl = 'data:image/jpeg;base64,' + respuesta['foto'];
                    }
                }
            );

            this.cmbos.getEmpleadoDetalles(this.inIdEmpleado).subscribe(
                respuesta => {
                    this.perfilForm.controls['fPosition'].setValue(respuesta['posicion'] !== null ? respuesta['posicion'] : '');
                    this.perfilForm.controls['fDepto'].setValue(respuesta['departamento'] !== null ? respuesta['departamento'] : '');
                    this.perfilForm.controls['fJob'].setValue(respuesta['puestoTrabajo'] !== null ? respuesta['puestoTrabajo'] : '');
                    this.perfilForm.controls['fImmBoss'].setValue(respuesta['jefeInmediato'] !== null ? respuesta['jefeInmediato'] : '');
                    this.perfilForm.controls['fWorkHours'].setValue(respuesta['horarioTrabajoId'] + '');
                    this.perfilForm.controls['fWorkplace'].setValue(respuesta['lugarTrabajoId'] + '');
                    let jobD = this.datePipe.transform(
                        (new Date(respuesta['fechaInicioPuesto'].substring(0, 10))).getTime() + (60 * 60 * 24 * 1000)
                        , 'yyyy-MM-dd');
                    this.perfilForm.controls['fStartJob'].setValue(jobD);
                    this.perfilForm.controls['fPerCarg'].setValue(respuesta['personalCargoId'] + '');
                    this.perfilForm.controls['fJobDescription'].setValue(respuesta['descGralPuesto']);

                    this.position          = respuesta['posicionId'];
                    this.department        = respuesta['departamentoId'];
                    this.workstation       = respuesta['puestoTrabajoId'];
                    this.employeeBoss      = respuesta['jefeInmediatoId'];
                    this.workingHour       = respuesta['horarioTrabajoId'];
                    this.employeePlace     = respuesta['lugarTrabajoId'];
                    this.employeeDependent = respuesta['personalCargoId'];

                }
            );
        }
    }

    setCombos() {
        this.generos = [];
        this.grados = [] ;
        this.horarios = [];
        this.lugares = [];
        this.personas = [];
        this.enterprisePreffix = [];

        this.arryCata = Array<OrderCatalogDTO>();
        this.arryCata.push( new OrderCatalogDTO('gender', 1, 1));
        this.arryCata.push( new OrderCatalogDTO('educationLevel', 1, 1));
        this.arryCata.push( new OrderCatalogDTO('workingHour', 1, 1));
        this.arryCata.push( new OrderCatalogDTO('employeePlace', 1, 1));
        this.arryCata.push( new OrderCatalogDTO('employeeDependent', 1, 1));
        this.arryCata.push( new OrderCatalogDTO('enterprisePreffix', 1, 1));

        this.cmbos.getlistCatalogoOrdenados(this.arryCata).subscribe(
            poRespuesta => {
                this.resuelveDS(poRespuesta, this.generos, 'gender');
                this.resuelveDS(poRespuesta, this.grados, 'educationLevel');
                this.resuelveDS(poRespuesta, this.horarios, 'workingHour');
                this.resuelveDS(poRespuesta, this.lugares, 'employeePlace');
                this.resuelveDS(poRespuesta, this.personas, 'employeeDependent');
                this.resuelveDS(poRespuesta, this.enterprisePreffix, 'enterprisePreffix');
            }
        );

    }

    resuelveDS(poRespuesta: Object, combo: Array<any>, comp: string) {
        if (!poRespuesta) {
            console.log('El back no responde');
        } else {
            let catalogs: any;
            catalogs = poRespuesta;
            catalogs.forEach(element => {
                if ( element.catalog === comp ) {
                    element.data.forEach ( elementCatalog => {
                        let value = elementCatalog.id;
                        let label = elementCatalog.code;
                        combo.push(new Combo(value, label));
                    });
                }
            });

        }
    }

    get f() { return this.perfilForm.controls; }

    saveEmployee() {
        let empresaPrefijo = this.enterprisePreffix.find(x => x.value === parseInt(this.perfilForm.controls['fEnterprise'].value, 10)).label;
        let det = new Detalle(
            null,
            0,
            this.inIdEmpleado,
            this.checkedEstatus === true ? 1 : 0,
            this.perfilForm.controls['fStartJob'].value,
            this.perfilForm.controls['fWorkHours'].value,
            null,
            this.perfilForm.controls['fWorkplace'].value,
            this.perfilForm.controls['fPerCarg'].value,
            null,
            0,
            this.perfilForm.controls['fJobDescription'].value,
            null,
            this.perfilForm.controls['fPosition'].value,
            this.perfilForm.controls['fDepto'].value,
            this.perfilForm.controls['fImmBoss'].value,
            this.perfilForm.controls['fJob'].value);
        let emp = new Empleado( this.perfilForm.controls['fCareer'].value,
            1,
            det,
            this.inIdEmpleado,
            this.checkedEstatus,
            this.checkedEstatus === true ? 1 : 0,
            this.perfilForm.controls['fDateBirth'].value,
            this.perfilForm.controls['fGender'].value,
            this.perfilForm.controls['fLevelStudy'].value,
            this.perfilForm.controls['fSecondName'].value,
            '',
            this.perfilForm.controls['fNames'].value,
            this.perfilForm.controls['fLastName'].value,
            1,
            this.byteArray,
            empresaPrefijo);

        this.cmbos.getSave(emp).subscribe(
            respuesta => {
                this.toastr.successToastr('El empleado fue Creado con éxito.', '¡Se ha logrado!');
                this.eventService.sendChangePage(new EventMessage(10, {}, 'Compliance.Personal Competente'));
            },
            error => {
                this.toastr.errorToastr(Constants.ERROR_SAVE, 'Lo siento,');
            }
        );
    }

    onSubmit() {
        this.submitted = true;

        if (this.requiredPhoto) {
            this.toastr.errorToastr('Se debe agregar una fotografía.', 'Lo siento,');
            return;
        }

        if (this.perfilForm.invalid) {
            this.toastr.errorToastr('Valida los datos ingresados.', 'Lo siento,');
            return;
        }

        let dateBirth = new Date(this.perfilForm.controls['fDateBirth'].value);
        let dateStartJob = new Date(this.perfilForm.controls['fStartJob'].value);

        if ((dateStartJob.getFullYear() - dateBirth.getFullYear()) < 18) {
            this.toastr.errorToastr('La persona debe ser mayor de edad.', 'Lo siento,');
            return;
        }

        this.saveEmployee();
    }

    onChange(file: File) {
        if (file) {
            this.fileName = file.name;
            this.file = file;

            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = (e: any) => {
                this.photo = e.target.result;
                if ( this.photo.includes('jpeg')) {
                    this.byteArray = this.photo.replace(/^data:image\/jpeg;base64,/, '');
                } else if ( this.photo.includes('png')) {
                    this.byteArray = this.photo.replace(/^data:image\/png;base64,/, '');
                } else if (this.photo.includes('jpg')) {
                    this.byteArray = this.photo.replace(/^data:image\/jpg;base64,/, '');
                }
                this.imageUrl = reader.result;
                this.requiredPhoto = false;
            };
        }
    }

    regresar() {
        this.eventService.sendChangePage(new EventMessage(10, {} , 'Compliance.Personal Competente'));
    }

    changeCheck() {
        if (this.checkedEstatus) {
            this.checkedEstatus = false;
        } else {
            this.checkedEstatus = true;
        }

        if (this.accion === 'editar') {
            this.disabledSave = false;
        }
    }

    /*
    validatePersonalName(): boolean {

        let arrayElements: any[] = this.elementData;
        let flag: boolean = false;

        if (this.perfilForm.controls['fNames'].value !== '') {
            arrayElements = arrayElements.filter(personal => {
                return personal.name.toString().toUpperCase() === this.perfilForm.controls['fNames'].value.toString().toUpperCase() ? true : false;
            });
        }
        if (this.perfilForm.controls['fLastName'].value !== '') {
            arrayElements = arrayElements.filter(personal => {
                return personal.lastName.toString().toUpperCase() === this.perfilForm.controls['fLastName'].value.toString().toUpperCase() ? true : false;
            });
        }
        if (this.perfilForm.controls['fSecondName'].value !== '') {
            arrayElements = arrayElements.filter(personal => {
                return personal.secondName.toString().toUpperCase() === this.perfilForm.controls['fSecondName'].value.toString().toUpperCase() ? true : false;
            });
        }

        if (arrayElements.length > 0) {
            flag = true;
        } else {
            flag = false;
        }
        return flag;
    }

    getDataSource() {
        this.elementData = [];
        this.personal.getEmpleados().subscribe(
            dataBack => {
                this.result = dataBack;
                let i = 1;
                for (const element of this.result.empleados){

                    const obj ={};

                    obj['name'] = element.nombres;
                    obj['lastName'] = element.paterno;
                    obj['secondName'] = element.materno;

                    this.elementData.push(obj);
                }
            });
    } */
}
