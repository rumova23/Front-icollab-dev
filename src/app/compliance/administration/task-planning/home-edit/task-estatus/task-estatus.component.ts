import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Combo} from '../../../../models/Combo';
import {AdministratorComplianceService} from '../../../services/administrator-compliance.service';
import {ComplianceDTO} from '../../../../models/compliance-dto';
import {ToastrManager} from 'ng6-toastr-notifications';

@Component({
  selector: 'app-task-estatus',
  templateUrl: './task-estatus.component.html',
  styleUrls: ['./task-estatus.component.scss']
})
export class TaskEstatusComponent implements OnInit {
  @Input() accion: string;
  @Input() compliance: ComplianceDTO;
  @Input() comboPeriodoEntrega: Array<any>;
  @Input() comboTipoDias: Array<any>;
  @Input() comboEstatus: Array<any>;
  @Input() comboEstatusInterno: Array<any>;
  @Input() comboUnitPeriod: Array<any>;

  a326 = 1;
  titulo = 'Control de la Tarea';
  submitted = false;
  fFechaInicioProgramada = new FormControl(new Date());
  fFechaFinProgramada = new FormControl(new Date());
  fFechaInicioReal = new FormControl(new Date());
  fFechaFinReal = new FormControl(new Date());
  fFechaUltimaModificacion = new FormControl(new Date());
  estatusForm: FormGroup;

  hiddenDivButtonFreeTask = false;

  hiddenDivButtonAcceptTask = false;

  constructor(
      private formBuilder: FormBuilder,
      private administratorComplianceService: AdministratorComplianceService,
      public  toastr: ToastrManager) {
    this.estatusForm = this.formBuilder.group({
      fFechaInicioProgramada: ['', Validators.required],
      fFechaFinProgramada: ['', Validators.required],
      fFechaInicioReal: ['', Validators.required],
      fFechaFinReal: ['', Validators.required],
      fFechaUltimaModificacion: ['', Validators.required],
      fPeriodoEntrega: [{ value: '', disabled: false }, Validators.required],
      fTipoDias: [{ value: '', disabled: false }, Validators.required],
      fEstatusTarea: [{ value: '', disabled: false }, Validators.required],
      fEstatusInterno: [{ value: '', disabled: false }, Validators.required]
    });
  }

  ngOnInit() {
    this.estatusForm.controls.fPeriodoEntrega.setValue(this.compliance.tagDTO.unitPeriod.id);
    this.estatusForm.controls.fTipoDias.setValue(this.compliance.tagDTO.daysType.id);
    if (this.compliance.fechaProgramadaInicio) {
      this.fFechaInicioProgramada = new FormControl(new Date(this.compliance.fechaProgramadaInicio));
    }
    if (this.compliance.fechaProgramadaFinal) {
      this.fFechaFinProgramada = new FormControl(new Date(this.compliance.fechaProgramadaFinal));
    }
    if (this.compliance.fechaRealInicio) {
      this.fFechaInicioReal = new FormControl(new Date(this.compliance.fechaRealInicio));
    }
    if (this.compliance.fechaRealFin) {
      this.fFechaFinReal = new FormControl(new Date(this.compliance.fechaRealFin));
    }
    if (this.compliance.fechaUltimaModicacion) {
      this.fFechaUltimaModificacion = new FormControl(new Date(this.compliance.fechaUltimaModicacion));
    }

    this.estatusForm.controls.fEstatusTarea.setValue('' + this.compliance.entidadEstatus.maestroOpcionId);
    this.estatusForm.controls.fEstatusInterno.setValue('' + this.compliance.estatusInterno.maestroOpcionId);

    if (this.accion === 'ver') {
     this.estatusForm.disable();
    }

    if (this.accion === 'editar') {
      this.estatusForm.controls.fEstatusTarea.disable();
      this.estatusForm.controls.fEstatusInterno.disable();
      this.estatusForm.controls.fFechaInicioReal.disable();
      this.estatusForm.controls.fFechaFinReal.disable();
      this.estatusForm.controls.fFechaUltimaModificacion.disable();

      if ( this.compliance.estatusInterno.opcion.codigo.toString() === 'Pendiente Aceptar Responsable' ) {
        this.hiddenDivButtonFreeTask = true;
        this.hiddenDivButtonAcceptTask = false;
      }

      if ( this.compliance.estatusInterno.opcion.codigo.toString() === 'Pendiente Cerrar Responsable' ) {
        this.hiddenDivButtonFreeTask = true;
        this.hiddenDivButtonAcceptTask = true;
      }
    }
  }

  onSubmit() {
  }

  get f() { return this.estatusForm.controls; }

  // Compara valores del combo para seleccionar la opción correspondiente
  compareFn(combo1: number, combo2: number) {
    console.log(combo1 && combo2 && combo1 === combo2);
    return combo1 && combo2 && combo1 === combo2;
  }

  guardaTarea() {
    this.compliance.tagDTO.unitPeriod.id = this.estatusForm.controls.fPeriodoEntrega.value;
    this.compliance.tagDTO.daysType.id = this.estatusForm.controls.fTipoDias.value;
    this.compliance.fechaProgramadaInicio =  new Date(this.fFechaInicioProgramada.value);
    this.compliance.fechaProgramadaFinal =  new Date(this.fFechaFinProgramada.value);
    console.dir(this.compliance);
    this.administratorComplianceService.updateTask(this.compliance).subscribe(
        response => {
          this.toastr.successToastr('Tarea Actualizada.', '¡Se ha logrado!');
    });
  }

  liberaTarea() {
    this.administratorComplianceService.freeTask(this.compliance.complianceId).subscribe(
        response => {
          this.toastr.successToastr('Tarea Liberada.', '¡Se ha logrado!');
          this.ngOnInit();
        });
  }

  acceptTask() {
    this.administratorComplianceService.acceptTask(this.compliance.complianceId).subscribe(
        response => {
          this.toastr.successToastr('Tarea Aceptada.', '¡Se ha logrado!');
          this.ngOnInit();
        });
  }

  isnumeric(link) {
    if ( isNaN( Number(this.a326)) || 0 === Number(this.a326) ) {
      this.a326 = 1;
      link.value = 1;
      this.formatPeriodo_entrega(false);
    } else if ( Number(this.a326) > 1) {
      this.formatPeriodo_entrega(true);
    } else if ( Number(this.a326) <= 1) {
      this.formatPeriodo_entrega(false);
    }
  }

  formatPeriodo_entrega(plural) {
    for (const period of this.comboUnitPeriod) {
      if (plural) {
        switch (period.label) {
          case 'DIA':
          case 'AÑO':
          case 'SEMANA':
          case 'HORA':
            period.label = period.label + 'S';
            break;
          case 'MES':
            period.label = 'MESES';
            break;
          default:
            break;
        }
      } else {

        switch (period.label) {
          case 'DIAS':
            period.label = 'DIA';
            break;
          case 'AÑOS':
            period.label = 'AÑO';
            break;
          case 'SEMANAS':
            period.label = 'SEMANA';
            break;
          case 'HORAS':
            period.label = 'HORA';
            break;
          case 'MESES':
            period.label = 'MES';
            break;
          default:
            break;
        }
      }
    }
  }
}
