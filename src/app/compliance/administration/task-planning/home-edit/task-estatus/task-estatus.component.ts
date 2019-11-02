import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Combo} from '../../../../models/Combo';
import {AdministratorComplianceService} from '../../../services/administrator-compliance.service';
import {ComplianceDTO} from '../../../../models/compliance-dto';

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

  titulo = 'Control de la Tarea';
  submitted = false;
  fFechaInicioProgramada = new FormControl(new Date());
  fFechaFinProgramada = new FormControl(new Date());
  fFechaInicioReal = new FormControl(new Date());
  fFechaFinReal = new FormControl(new Date());
  fFechaUltimaModificacion = new FormControl(new Date());
  estatusForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private administratorComplianceService: AdministratorComplianceService) {
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
    this.estatusForm.controls.fPeriodoEntrega.setValue(this.compliance.tagDTO.deliveryPeriod.id);
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

    console.dir(this.compliance.entidadEstatus);
    console.dir(this.comboEstatus);
    this.estatusForm.controls.fEstatusTarea.setValue('' + this.compliance.entidadEstatus.entidadEstatusId);
    this.estatusForm.controls.fEstatusInterno.setValue('' + this.compliance.estatusInterno.entidadEstatusId);
  }

  onSubmit() {
  }

  get f() { return this.estatusForm.controls; }

  // Compara valores del combo para seleccionar la opción correspondiente
  compareFn(combo1: number, combo2: number) {
    console.log(combo1 && combo2 && combo1 === combo2);
    return combo1 && combo2 && combo1 === combo2;
  }
}
