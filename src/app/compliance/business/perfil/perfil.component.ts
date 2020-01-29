import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Combo } from '../../models/Combo';
import { Detalle } from '../../models/Detalle';
import { Empleado } from '../../models/Empleado';
import { PerfilComboService } from 'src/app/core/services/perfil-combo.service';
import { OrderCatalogDTO } from 'src/app/compliance/models/OrderCatalogDTO'; 
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { GlobalService } from 'src/app/core/globals/global.service';
import { DatePipe } from '@angular/common';

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
  title = 'Perfil de Puesto';
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


  constructor(
    private cmbos: PerfilComboService,
    private formBuilder: FormBuilder,
    public toastr: ToastrManager,
    public globalService: GlobalService,
    private eventService: EventService,
    private datePipe: DatePipe) {
  }
  ngOnInit() {
    //console.clear();

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
      fNumEmpo: [{ value:'', disabled: this.isdisableIdEmp }, Validators.required],
      fNombres: [{ value:'', disabled: this.isdisabled }, Validators.required],
      fAPaterno: [{ value:'', disabled: this.isdisabled }, Validators.required],
      fAMaterno: [{ value:'', disabled: this.isdisabled }, Validators.required],
      fGenero: [{ value:'', disabled: this.isdisabled }, Validators.required],
      fNaci: [{ value:'', disabled: this.isdisabled }, Validators.required],
      fGrado: [{ value:'', disabled: this.isdisabled }, Validators.required],
      fCarrera: [{ value:'', disabled: this.isdisabled }, Validators.required],
      fPosicion: [{ value:'', disabled: this.isdisabled }, Validators.required],
      fDepto: [{ value:'', disabled: this.isdisabled }, Validators.required],
      fPueTrab: [{ value:'', disabled: this.isdisabled }, Validators.required],
      fJefInm: [{ value:'', disabled: this.isdisabled }, Validators.required],
      fHorTrab: [{ value:'', disabled: this.isdisabled }, Validators.required],
      fLugTrab: [{ value:'', disabled: this.isdisabled }, Validators.required],
      fStartJob: [{ value:'', disabled: this.isdisabled }, Validators.required],
      fPerCarg: [{ value:'', disabled: this.isdisabled }, Validators.required],
      fDescGralPust: [{ value:'', disabled: this.isdisabled }, Validators.required]
    });    
    

    if(this.inTipo == "ver" || this.inTipo == "editar"){

      this.cmbos.getEmpleado(this.inIdEmpleado).subscribe(
        respuesta => {
          const currentDate = new Date().toISOString().substring(0, 10);

          this.perfilForm.controls['fNumEmpo'].setValue(respuesta[ 'empleadoId' ]);
          this.perfilForm.controls['fAMaterno'].setValue(respuesta[ 'materno' ]);
          this.perfilForm.controls['fNombres'].setValue(respuesta[ 'nombres' ]);
          this.perfilForm.controls['fAPaterno'].setValue(respuesta[ 'paterno' ]);
          this.perfilForm.controls['fCarrera'].setValue(respuesta[ 'carrera' ]);

          this.perfilForm.controls['fGenero'].patchValue(respuesta[ 'generoId' ]+'');
          this.perfilForm.controls['fGrado'].setValue(respuesta[ 'gradoEstudioId' ]+'');
          
          let bornD = this.datePipe.transform(
               (new Date(respuesta['fechanacimiento'].substring(0, 10))).getTime() + (60*60*24*1000)
               ,'yyyy-MM-dd');

          this.perfilForm.controls['fNaci'].setValue(bornD);

          this.gender         = respuesta[ 'generoId' ];
          this.educationLevel = respuesta[ 'gradoEstudioId' ];
        }
      );

      this.cmbos.getEmpleadoDetalles(this.inIdEmpleado).subscribe(
        respuesta => {
          this.perfilForm.controls['fPosicion'].setValue(respuesta[ 'posicionId' ]+'');
          this.perfilForm.controls['fDepto'].setValue(respuesta[ 'departamentoId' ]+'');
          this.perfilForm.controls['fPueTrab'].setValue(respuesta[ 'puestoTrabajoId' ]+'');
          this.perfilForm.controls['fJefInm'].setValue(respuesta[ 'jefeInmediatoId' ]+'');
          this.perfilForm.controls['fHorTrab'].setValue(respuesta[ 'horarioTrabajoId' ]+'');
          this.perfilForm.controls['fLugTrab'].setValue(respuesta[ 'lugarTrabajoId' ]+'');
          let jobD = this.datePipe.transform(
            (new Date(respuesta['fechaInicioPuesto'].substring(0, 10))).getTime() + (60*60*24*1000)
            ,'yyyy-MM-dd');
          this.perfilForm.controls['fStartJob'].setValue(jobD);
          this.perfilForm.controls['fPerCarg'].setValue(respuesta[ 'personalCargoId' ]+'');
          this.perfilForm.controls['fDescGralPust'].setValue(respuesta[ 'descGralPuesto' ]);

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
    this.posiciones = [];
    this.departamentos = [];
    this.puestoTrabs = [];
    this.jefes = [];
    this.horarios = [];
    this.lugares = [];
    this.personas = []; 

    this.arryCata = Array<OrderCatalogDTO>();
    this.arryCata.push( new OrderCatalogDTO('gender', 1, 1));
    this.arryCata.push( new OrderCatalogDTO('educationLevel', 1, 1));
    this.arryCata.push( new OrderCatalogDTO('position', 1, 1));
    this.arryCata.push( new OrderCatalogDTO('department', 1, 1));
    this.arryCata.push( new OrderCatalogDTO('workstation', 1, 1));
    this.arryCata.push( new OrderCatalogDTO('employeeBoss', 1, 1));
    this.arryCata.push( new OrderCatalogDTO('workingHour', 1, 1));
    this.arryCata.push( new OrderCatalogDTO('employeePlace', 1, 1));
    this.arryCata.push( new OrderCatalogDTO('employeeDependent', 1, 1));

    this.cmbos.getlistCatalogoOrdenados(this.arryCata).subscribe(
      poRespuesta => {

        this.resuelveDS(poRespuesta, this.generos, 'gender');
        this.resuelveDS(poRespuesta, this.grados, 'educationLevel');
        this.resuelveDS(poRespuesta, this.posiciones,'position');
        this.resuelveDS(poRespuesta, this.departamentos, 'department');
        this.resuelveDS(poRespuesta, this.puestoTrabs,'workstation');
        this.resuelveDS(poRespuesta, this.jefes,'employeeBoss');
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


  guardarEmpleado(){
    let det = new Detalle( this.perfilForm.controls['fDepto'].value,
                           0,
                           this.inIdEmpleado,
                           1,
                           this.perfilForm.controls['fStartJob'].value,
                           this.perfilForm.controls['fHorTrab'].value,
                           this.perfilForm.controls['fJefInm'].value,
                           this.perfilForm.controls['fLugTrab'].value,
                           this.perfilForm.controls['fPerCarg'].value,
                           this.perfilForm.controls['fPosicion'].value,
                           0,
                           this.perfilForm.controls['fDescGralPust'].value
                           ,this.perfilForm.controls['fPueTrab'].value);
                          
    let emp = new Empleado( this.perfilForm.controls['fCarrera'].value,
                            1, 
                            det,
                            this.inIdEmpleado,
                            'exito',
                            1, 
                            this.perfilForm.controls['fNaci'].value,
                            this.perfilForm.controls['fGenero'].value,
                            this.perfilForm.controls['fGrado'].value,
                            this.perfilForm.controls['fAMaterno'].value,
                            '',
                            this.perfilForm.controls['fNombres'].value,
                            this.perfilForm.controls['fAPaterno'].value,
                            1);
    
    this.cmbos.getSave(emp).subscribe(
      respuesta => {

        this.toastr.successToastr('El empleado fue Creado con éxito.', '¡Se ha logrado!');
        this.eventService.sendChangePage(new EventMessage(10, {},'Compliance.Personal Competente'));
      }
    );
  }



  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid 
    if (this.perfilForm.invalid) {
      this.toastr.errorToastr('Error al guardar el empleado.', 'Lo siento,');      
      return;
    }

    this.guardarEmpleado();
  }




}
