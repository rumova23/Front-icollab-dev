import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PerfilComboService} from '../../../../../../core/services/perfil-combo.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {GlobalService} from '../../../../../../core/globals/global.service';
import {EventService} from '../../../../../../core/services/event.service';
import {OrderCatalogDTO} from '../../../../../models/OrderCatalogDTO';
import {Empleado} from '../../../../../models/Empleado';
import {Detalle} from '../../../../../models/Detalle';
import {EventMessage} from '../../../../../../core/models/EventMessage';
import {Combo} from '../../../../../models/Combo';

@Component({
  selector: 'app-compliance-profile',
  templateUrl: './complianceProfile.component.html',
  styleUrls: ['./complianceProfile.component.scss']
})
export class ComplianceProfileComponent implements OnInit {
    @Input() inIdEmpleado: number;
    @Input() inTipo: string;
    @Input() isViewable: string;
    @Input() accion: string;
    title = 'Perfil de Puesto';
    title2 = 'Competencia de los recursos / Alta de personal / Agregar ';
    title3 = 'Datos personales / '
    generos: Array<any>;
    grados: Array<any>;
    posiciones: Array<any>;
    departamentos: Array<any>;
    puestoTrabs: Array<any>;
    jefes: Array<any>;
    horarios: Array<any>;
    lugares: Array<any>;
    personas: Array<any>;
    arryCata: Array<any>;

    perfilForm: FormGroup;
    submitted = false;

    disabledSave = true;
    checkedEstatus = false;
    checkedStopProgrammed = true;
    deshabiliarEstatus = false;
    isdisabled: boolean = false;
    isdisableIdEmp: boolean = false;

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
    imageUrl: string | ArrayBuffer = "../../../assets/img/foto.png";
    fileName: string = "No file selected";
    file: File;
    photo;
    byteArray;

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


        if(this.inTipo == "ver"){
            this.isdisabled = true;
            this.isdisableIdEmp = true;
        }

        if(this.inTipo == "guardar" || this.inTipo == "editar"){
            this.isdisableIdEmp = true;
        }

        this.perfilForm = this.formBuilder.group({
            // fPhoto: [{ value:'', disabled: this.isdisabled }, Validators.required],
            fEnterprise: [{ value:'', disabled: this.isdisabled }, Validators.required],
            fEmpNum: [{ value:'', disabled: this.isdisableIdEmp }, Validators.required],
            fNames: [{ value:'', disabled: this.isdisableIdEmp }, Validators.required],
            fLastName: [{ value:'', disabled: this.isdisableIdEmp }, Validators.required],
            fSecondName: [{ value:'', disabled: this.isdisableIdEmp }, Validators.required],
            fGender: [{ value:'', disabled: this.isdisabled }, Validators.required],
            fDateBirth: [{ value:'', disabled: this.isdisabled }, Validators.required],
            fLevelStudy: [{ value:'', disabled: this.isdisabled }, Validators.required],
            fCareer: [{ value:'', disabled: this.isdisabled }, Validators.required],
            fPosition: [{ value:'', disabled: this.isdisabled }, Validators.required],
            fDepto: [{ value:'', disabled: this.isdisabled }, Validators.required],
            fJob: [{ value:'', disabled: this.isdisabled }, Validators.required],
            fImmBoss: [{ value:'', disabled: this.isdisabled }, Validators.required],
            fWorkHours: [{ value:'', disabled: this.isdisabled }, Validators.required],
            fWorkplace: [{ value:'', disabled: this.isdisabled }, Validators.required],
            fStartJob: [{ value:'', disabled: this.isdisabled }, Validators.required],
            fPerCarg: [{ value:'', disabled: this.isdisabled }, Validators.required],
            fJobDescription: [{ value:'', disabled: this.isdisabled }, Validators.required]
        });

        if(this.inTipo == "ver" || this.inTipo == "editar"){

            this.cmbos.getEmpleado(this.inIdEmpleado).subscribe(
                respuesta => {
                    const currentDate = new Date().toISOString().substring(0, 10);

                    this.perfilForm.controls['fEmpNum'].setValue(respuesta[ 'empleadoId' ]);
                    this.perfilForm.controls['fSecondName'].setValue(respuesta[ 'materno' ]);
                    this.perfilForm.controls['fNames'].setValue(respuesta[ 'nombres' ]);
                    this.perfilForm.controls['fLastName'].setValue(respuesta[ 'paterno' ]);
                    this.perfilForm.controls['fCareer'].setValue(respuesta[ 'carrera' ]);

                    this.perfilForm.controls['fGender'].patchValue(respuesta[ 'generoId' ]+'');
                    this.perfilForm.controls['fLevelStudy'].setValue(respuesta[ 'gradoEstudioId' ]+'');

                    let bornD = this.datePipe.transform(
                        (new Date(respuesta['fechanacimiento'].substring(0, 10))).getTime() + (60*60*24*1000)
                        ,'yyyy-MM-dd');

                    this.perfilForm.controls['fDateBirth'].setValue(bornD);

                    this.gender         = respuesta[ 'generoId' ];
                    this.educationLevel = respuesta[ 'gradoEstudioId' ];
                }
            );

            this.cmbos.getEmpleadoDetalles(this.inIdEmpleado).subscribe(
                respuesta => {
                    this.perfilForm.controls['fPosition'].setValue(respuesta[ 'posicionId' ]+'');
                    this.perfilForm.controls['fDepto'].setValue(respuesta[ 'departamentoId' ]+'');
                    this.perfilForm.controls['fJob'].setValue(respuesta[ 'puestoTrabajoId' ]+'');
                    this.perfilForm.controls['fImmBoss'].setValue(respuesta[ 'jefeInmediatoId' ]+'');
                    this.perfilForm.controls['fWorkHours'].setValue(respuesta[ 'horarioTrabajoId' ]+'');
                    this.perfilForm.controls['fWorkplace'].setValue(respuesta[ 'lugarTrabajoId' ]+'');
                    let jobD = this.datePipe.transform(
                        (new Date(respuesta['fechaInicioPuesto'].substring(0, 10))).getTime() + (60*60*24*1000)
                        ,'yyyy-MM-dd');
                    this.perfilForm.controls['fStartJob'].setValue(jobD);
                    this.perfilForm.controls['fPerCarg'].setValue(respuesta[ 'personalCargoId' ]+'');
                    this.perfilForm.controls['fJobDescription'].setValue(respuesta[ 'descGralPuesto' ]);

                    this.position          = respuesta[ 'posicionId' ];
                    this.department        = respuesta[ 'departamentoId' ];
                    this.workstation       = respuesta[ 'puestoTrabajoId' ];
                    this.employeeBoss      = respuesta[ 'jefeInmediatoId' ];
                    this.workingHour       = respuesta[ 'horarioTrabajoId' ];
                    this.employeePlace     = respuesta[ 'lugarTrabajoId' ];
                    //fecha-inicio-laboral
                    this.employeeDependent = respuesta[ 'personalCargoId' ];

                }
            );
        }
    }

    setCombos(){
        this.generos = [];
        this.grados = [] ;
        this.horarios = [];
        this.lugares = [];
        this.personas = [];

        this.arryCata = Array<OrderCatalogDTO>();
        this.arryCata.push( new OrderCatalogDTO('gender', 1, 1));
        this.arryCata.push( new OrderCatalogDTO('educationLevel', 1, 1));
        this.arryCata.push( new OrderCatalogDTO('workingHour', 1, 1));
        this.arryCata.push( new OrderCatalogDTO('employeePlace', 1, 1));
        this.arryCata.push( new OrderCatalogDTO('employeeDependent', 1, 1));
        debugger
        this.cmbos.getlistCatalogoOrdenados(this.arryCata).subscribe(
            poRespuesta => {
                this.resuelveDS(poRespuesta, this.generos, 'gender');
                this.resuelveDS(poRespuesta, this.grados, 'educationLevel');
                this.resuelveDS(poRespuesta, this.horarios,'workingHour');
                this.resuelveDS(poRespuesta, this.lugares,'employeePlace');
                this.resuelveDS(poRespuesta, this.personas,'employeeDependent');
            }
        );

    }

    resuelveDS(poRespuesta: Object, combo: Array<any>, comp: string) {
        if (!poRespuesta) {
            console.log("El back no responde");
        } else {
            let catalogs : any;
            catalogs = poRespuesta;
            catalogs.forEach(element => {
                if ( element.catalog === comp ){
                    element.data.forEach ( elementCatalog => {
                        let value = elementCatalog.id;
                        let label = elementCatalog.code;
                        combo.push(new Combo(value, label));
                    })
                }
            });

        }
    }

    get f() { return this.perfilForm.controls; }

    dateLessThan(fNaci: string, fStartJob: string) {
        return (group: FormGroup): {[key: string]: any} => {
            let f = group.controls[fNaci];
            let t = group.controls[fStartJob];
            if (f.value > t.value) {

                this.toastr.errorToastr('Fecha de nacimiento no puede ser superior a fecha de Inicio Laboral.', 'Oops!');
                return {
                    dates: "Date from should be less than Date to"
                };
            }
            return {};
        }
    }

    saveEmployee(){
        let det = new Detalle( this.perfilForm.controls['fDepto'].value,
            0,
            this.inIdEmpleado,
            1,
            this.perfilForm.controls['fStartJob'].value,
            this.perfilForm.controls['fWorkHours'].value,
            this.perfilForm.controls['fImmBoss'].value,
            this.perfilForm.controls['fWorkplace'].value,
            this.perfilForm.controls['fPerCarg'].value,
            this.perfilForm.controls['fPosition'].value,
            0,
            this.perfilForm.controls['fJobDescription'].value
            ,this.perfilForm.controls['fJob'].value);

        let emp = new Empleado( this.perfilForm.controls['fCareer'].value,
            1,
            det,
            this.inIdEmpleado,
            'exito',
            1,
            this.perfilForm.controls['fDateBirth'].value,
            this.perfilForm.controls['fGender'].value,
            this.perfilForm.controls['fLevelStudy'].value,
            this.perfilForm.controls['fSecondName'].value,
            '',
            this.perfilForm.controls['fNames'].value,
            this.perfilForm.controls['fLastName'].value,
            1,
            this.byteArray);

        this.cmbos.getSave(emp).subscribe(
            respuesta => {

                this.toastr.successToastr('El empleado fue Creado con éxito.', '¡Se ha logrado!');
                this.eventService.sendChangePage(new EventMessage(10, {},'Compliance.registerPersonal'));
            }
        );
    }

    onSubmit() {
        debugger;
        this.submitted = true;
        // stop here if form is invalid
        if (this.perfilForm.invalid) {
            this.toastr.errorToastr('Error al guardar el empleado.', 'Lo siento,');
            return;
        }

        this.saveEmployee();
    }

    onChange(file: File){
        debugger
        if(file) {
            this.fileName = file.name;
            this.file = file;

            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = (e:any) => {
                this.photo = atob(e.target.result);

                const byteNumbers = new Array(this.photo.length);
                for (let i = 0; i < this.photo.length; i++) {
                    byteNumbers[i] = this.photo.charCodeAt(i);
                }
                this.byteArray = new Uint8Array(byteNumbers);
                this.imageUrl = reader.result;
            };
        }
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
}
