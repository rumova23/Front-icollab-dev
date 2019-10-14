import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdministratorComplianceService} from '../services/administrator-compliance.service';

@Component({
  selector: 'app-task-planning',
  templateUrl: './task-planning.component.html',
  styleUrls: ['./task-planning.component.scss']
})
export class TaskPlanningComponent implements OnInit {
  filtrosForm: FormGroup;
  fFechaInicio = new FormControl(new Date());
  fFechaFin = new FormControl((new Date()));
  personas: Array<any>;
  constructor(
      private administratorComplianceService: AdministratorComplianceService,
      private formBuilder: FormBuilder) {
    this.filtrosForm = this.formBuilder.group({
      fFechaInicio: ['', Validators.required],
      fFechaFin: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.personas = [];
    this.filtrosForm = this.formBuilder.group({
      fPersona: [{ value: '', disabled: false }, Validators.required]
    });
  }

  onSubmit() {
    this.administratorComplianceService.getPersonalCompetente( new Date(this.fFechaInicio.value).getTime(),
        new Date(this.fFechaFin.value).getTime()).subscribe(
        respuesta => {
          console.dir(respuesta);
        }
    );
  }
}
