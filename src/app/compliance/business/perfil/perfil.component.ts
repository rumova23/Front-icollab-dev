import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Combo } from '../../models/Combo';
import { Detalle } from '../../models/Detalle';
import { Empleado } from '../../models/Empleado';
import { PerfilComboService } from 'src/app/core/services/perfil-combo.service';
import { DatePipe} from '@angular/common';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
    providers: [DatePipe]
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
              private formBuilder: FormBuilder,
              public toastr: ToastrManager,
              public datePipe: DatePipe) {
      this.perfilForm = this.formBuilder.group({
          empleadoId: new FormControl('', Validators.required),
          materno: new FormControl('', Validators.required),
          nombres: new FormControl('', Validators.required),
          paterno: new FormControl('', Validators.required),
          carrera: new FormControl('', Validators.required),
          genero: new FormControl('', Validators.required),
          gradoEstudio: new FormControl('', Validators.required),
          fechanacimiento: new FormControl(new Date(), Validators.required),
          posicion: new FormControl('', Validators.required),
          departamento: new FormControl('', Validators.required),
          jefes: new FormControl('', Validators.required),
          puesto: new FormControl('', Validators.required),
          horario: new FormControl('', Validators.required),
          lugar: new FormControl('', Validators.required),
          fechaInicioPuesto: new FormControl(new Date(), Validators.required),
          personal: new FormControl('', Validators.required),
          descGralPuesto: new FormControl('', Validators.required)});
      this.perfilForm.value.empleadoId = 0;
      this.perfilForm.controls.empleadoId.disable();

  }
  resuelveDS(poRespuesta, data: Array<any>, comp: string ) {
    if ( !poRespuesta ) {
      console.log('El back no responde');
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
    if( this.inIdEmpleado != 0) {
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
    this.arryCata = ['genero', 'gradoEstudio', 'posicion','departamento','puestoTrab',
                    'jefe','horario','lugar', 'persona'];
    this.cmbos.getCatalogo(this.arryCata).subscribe(
      poRespuesta => {
        this.resuelveDS(poRespuesta, this.generos, this.arryCata[0]);
        this.resuelveDS(poRespuesta, this.grados, this.arryCata[1]);
        this.resuelveDS(poRespuesta, this.posiciones, this.arryCata[2]);
        this.resuelveDS(poRespuesta, this.departamentos, this.arryCata[3]);
        this.resuelveDS(poRespuesta, this.puestoTrabs, this.arryCata[4]);
        this.resuelveDS(poRespuesta, this.jefes, this.arryCata[5]);
        this.resuelveDS(poRespuesta, this.horarios, this.arryCata[6]);
        this.resuelveDS(poRespuesta, this.lugares, this.arryCata[7]);
        this.resuelveDS(poRespuesta, this.personas, this.arryCata[8]);
      }
    );
    if ( this.inTipo === 'ver') {
      this.isdisabled = true;
      this.isdisableIdEmp = true;
    }
    if ( this.inTipo === 'guardar' || this.inTipo === 'editar') {
      this.isdisableIdEmp = true;
    }
    this.cmbos.getEmpleado(this.inIdEmpleado).subscribe(
      respuesta => {
          respuesta.genero  =  this.generos.filter(entity => Number(entity.value) === respuesta.generoId)[0];
          respuesta.gradoEstudio  =  this.grados.filter(entity => Number(entity.value) === respuesta.gradoEstudioId)[0];
          respuesta.fechanacimiento = new Date(respuesta.fechanacimiento);
          this.perfilForm.patchValue(respuesta);
      }
    );
    this.cmbos.getEmpleadoDetalles(this.inIdEmpleado).subscribe(
      respuesta => {
          respuesta.posicion = this.posiciones.filter(entity => Number(entity.value) === respuesta.posicionId)[0];
          respuesta.departamento = this.departamentos.filter(entity => Number(entity.value) === respuesta.departamentoId)[0];
          respuesta.jefes = this.jefes.filter(entity => Number(entity.value) === respuesta.jefeInmediatoId)[0];
          respuesta.horario = this.horarios.filter(entity => Number(entity.value) === respuesta.horarioTrabajoId)[0];
          respuesta.lugar = this.lugares.filter(entity => Number(entity.value) === respuesta.lugarTrabajoId)[0];
          respuesta.personal = this.personas.filter(entity => Number(entity.value) === respuesta.personalCargoId)[0];
          respuesta.puesto = this.puestoTrabs.filter(entity => Number(entity.value) === respuesta.puestoTrabajoId)[0];
          respuesta.fechaInicioPuesto = new Date(respuesta.fechaInicioPuesto);
          this.perfilForm.patchValue(respuesta);
      }
    );



  }
  get f() { return this.perfilForm.controls; }

  dateLessThan(fNaci: string, fStartJob: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let f = group.controls[fNaci];
      let t = group.controls[fStartJob];
      if (f.value > t.value) {
        this.toastr.errorToastr('Fecha de nacimiento no puede ser superior a fecha de Inicio Laboral.', 'Lo siento,');
        return {
          dates: 'Date from should be less than Date to'
        };
      }
      return {};
    };
  }

  guardarEmpleado() {
      const value = this.perfilForm.value;
      const detalle: Detalle = new Detalle();
      detalle.departamentoId  = this.perfilForm.value.departamento.value;
      detalle.horarioTrabajoId  = this.perfilForm.value.horario.value;
      detalle.jefeInmediatoId  = this.perfilForm.value.jefes.value;
      detalle.lugarTrabajoId  = this.perfilForm.value.lugar.value;
      detalle.posicionId  = this.perfilForm.value.posicion.value;
      detalle.personalCargoId  = this.perfilForm.value.personal.value;
      detalle.empleadoId = this.inIdEmpleado;
      detalle.empleadoDetalleId = 0;

      const employee = this.perfilForm.value;
      employee.detalle = detalle;
      console.log(employee);
      employee.generoId  = this.perfilForm.value.genero.value;
      employee.gradoEstudioId  = this.perfilForm.value.gradoEstudio.value;

      this.cmbos.getSave(employee).subscribe(
      respuesta => {
          console.dir(respuesta);
          if ( respuesta.exito === 1) {
              this.toastr.successToastr('Perfil de empleado creado satisfactoriamente.', '¡Se ha logrado!');
          }
      });
  }

  onSubmit() {
    this.submitted = true;
    this.guardarEmpleado();
  }
}
