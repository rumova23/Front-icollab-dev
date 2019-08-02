import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Combo } from '../../models/Combo';
import { Detalle } from '../../models/Detalle';
import { Empleado } from '../../models/Empleado';
import { PerfilComboService } from 'src/app/core/services/perfil-combo.service';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {


  @Input() inIdEmpleado: number;
  @Input() inTipo: string;
  @Input() isViewable: string;

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

  labBotAcep: string = "Guardar";

  constructor(private cmbos: PerfilComboService,
              private formBuilder: FormBuilder,public toastr: ToastrManager) { 
              }
  
  resuelveDS(poRespuesta: Object, data: Array<any>, comp: string ){
    if ( !poRespuesta ){
      console.log("El back no responde");
    } else {
      let estatus = poRespuesta[ 'status' ];
      if ( estatus === 'exito'){
        Object.keys(poRespuesta[ comp ]).forEach( key => {
          let value = [poRespuesta[ comp ][key].value];
          let label = [poRespuesta[ comp ][key].label];
          data.push( new Combo( value[0], label[0]) );
        });
      } else {
        console.log(poRespuesta[ 'mensaje' ]);
      }
    }
  }  

  ngOnInit() {
    if( this.inIdEmpleado != 0){
      this.labBotAcep = "Modificar"; 
    }

    this.generos = [];
    this.grados = [] ;
    this.posiciones = [];
    this.departamentos = [];
    this.puestoTrabs = [];
    this.jefes = [];
    this.horarios = [];
    this.lugares = [];
    this.personas = []; 
    this.arryCata = ['genero','gradoEstudio','posicion','departamento','puestoTrab',
                    'jefe','horario','lugar', 'persona'];
    this.cmbos.getCatalogo(this.arryCata).subscribe(
      poRespuesta => {
        this.resuelveDS(poRespuesta, this.generos, this.arryCata[0]);
        this.resuelveDS(poRespuesta, this.grados, this.arryCata[1]);
        this.resuelveDS(poRespuesta,this.posiciones,this.arryCata[2]);
        this.resuelveDS(poRespuesta,this.departamentos,this.arryCata[3]);
        this.resuelveDS(poRespuesta,this.puestoTrabs,this.arryCata[4]);
        this.resuelveDS(poRespuesta,this.jefes,this.arryCata[5]);
        this.resuelveDS(poRespuesta,this.horarios,this.arryCata[6]);
        this.resuelveDS(poRespuesta,this.lugares,this.arryCata[7]);
        this.resuelveDS(poRespuesta,this.personas,this.arryCata[8]);
      }  
    );
    
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
    this.cmbos.getEmpleado(this.inIdEmpleado).subscribe(
      respuesta => {
        console.log(respuesta);
        console.log(respuesta[ 'fechanacimiento' ]);
        const currentDate = new Date().toISOString().substring(0, 10);
        this.perfilForm.controls['fNumEmpo'].setValue(respuesta[ 'empleadoId' ]);
        this.perfilForm.controls['fAMaterno'].setValue(respuesta[ 'materno' ]);
        this.perfilForm.controls['fNombres'].setValue(respuesta[ 'nombres' ]);
        this.perfilForm.controls['fAPaterno'].setValue(respuesta[ 'paterno' ]);
        this.perfilForm.controls['fCarrera'].setValue(respuesta[ 'carrera' ]);
        this.perfilForm.controls['fGenero'].patchValue(respuesta[ 'generoId' ]+'');
        this.perfilForm.controls['fGrado'].setValue(respuesta[ 'gradoEstudioId' ]+'');
        //this.perfilForm.controls['fNaci'].setValue(respuesta[ 'fechanacimiento' ]);
        //this.perfilForm.patchValue({fNaci: respuesta[ 'fechanacimiento' ]});
        this.perfilForm.controls['fNaci'].setValue(currentDate);
      }
    );

    this.cmbos.getEmpleadoDetalles(this.inIdEmpleado).subscribe(
      respuesta => {
        this.perfilForm.controls['fPosicion'].setValue(respuesta[ 'posicionId' ]+'');
        this.perfilForm.controls['fDepto'].setValue(respuesta[ 'departamentoId' ]+'');
        this.perfilForm.controls['fPueTrab'].setValue(respuesta[ 'tipoEmpleadoId' ]+'');
        this.perfilForm.controls['fJefInm'].setValue(respuesta[ 'jefeInmediatoId' ]+'');
        this.perfilForm.controls['fHorTrab'].setValue(respuesta[ 'horarioTrabajoId' ]+'');
        this.perfilForm.controls['fLugTrab'].setValue(respuesta[ 'lugarTrabajoId' ]+'');
        this.perfilForm.controls['fStartJob'].patchValue(respuesta[ 'fechaInicioPuesto' ]+'');
        this.perfilForm.controls['fPerCarg'].setValue(respuesta[ 'personalCargoId' ]+'');
        this.perfilForm.controls['fDescGralPust'].setValue(respuesta[ 'descGralPuesto' ]);
      }
    );


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
                           this.perfilForm.controls['fDescGralPust'].value);
                          
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
                            this.perfilForm.controls['fNombres'].value,
                            1);
    
    this.cmbos.getSave(emp).subscribe(
      respuesta => {
        console.dir( respuesta  );
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid 
    if (this.perfilForm.invalid) {
      this.toastr.errorToastr('Error al dar de alta al Empleado.', 'Oops!');
        //alert('Error!! :-)\n\n' + JSON.stringify(this.perfilForm.value))
        return;
    }
    this.guardarEmpleado();
      // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.perfilForm.value))
      this.toastr.successToastr('Perfil de empleado creado satisfactoriamente.', 'Success!');
  }

}
