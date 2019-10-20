import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdministratorComplianceService} from '../services/administrator-compliance.service';
import {Combo} from '../../models/Combo';
import {Task} from '../../models/Task';
import {PerfilComboService} from '../../../core/services/perfil-combo.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {Compliance} from '../../models/Compliance';
import {DOCUMENT} from '@angular/common';

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
  munecoTasks: Array<Task>;
  persona: any;
  titulo = 'Planeacion Tareas';
  submitted = false;
  tiposCumplimientos: Array<any>;
  actividades: Array<any>;
  tagTasks: Array<any>;
  checkboxDisabled: Array<any>;
  headTasks = ['#', 'Tarea', 'Ejecutor', 'Responsable', 'Supervisor'];
  tipoPerfil = ['Ejecutor', 'Responsable', 'Supervisor'];
  constructor(
      private administratorComplianceService: AdministratorComplianceService,
      private formBuilder: FormBuilder,
      public  toastr: ToastrManager,
      @Inject (DOCUMENT) document) {
    this.filtrosForm = this.formBuilder.group({
      fFechaInicio: ['', Validators.required],
      fFechaFin: ['', Validators.required],
      fPersonaId: [{ value: '', disabled: false }, Validators.required],
      fTipoCumplimiento: [{ value: '', disabled: false }, Validators.required],
      fActividad: [{ value: '', disabled: false }, Validators.required]
    });
  }
  ngOnInit() {
    this.personas = [];
    this.tiposCumplimientos = [];
    this.actividades = [];
    this.tagTasks = [];
    this.checkboxDisabled = [];
    this.munecoTasks = [];
    this.initCombos();
  }

  onSubmit() {
    this.administratorComplianceService.getPersonalCompetente( new Date(this.fFechaInicio.value).getTime(),
        new Date(this.fFechaFin.value).getTime()).subscribe(
        (respuesta: Array<any>) => {
          this.personas = [];
          respuesta.forEach(elementActual => {
            const value = elementActual.empleadoId;
            const label = elementActual.nombres + ' ' + elementActual.paterno + ' ' + elementActual.materno;
            this.personas.push(new Combo(value, label));
          }
        );
          this.toastr.successToastr('Numero de personas disponibles en el periodo seleccionado: .' + this.personas.length, '¡Se ha logrado!');
        }
    );
  }
  initCombos() {
    this.administratorComplianceService.initComboTiposCumplimientos().subscribe(
        (respuesta: Array<any>) => {
          this.tiposCumplimientos = [];
          respuesta.forEach(elementActual => {
                const value = elementActual.maestroOpcionId;
                const label = elementActual.opcion.codigo;
                this.tiposCumplimientos.push(new Combo(value, label));
              }
          );
        }
    );

    this.administratorComplianceService.initComboActividades().subscribe(
        (respuesta: Array<any>) => {
          this.actividades = [];
          respuesta.forEach(elementActual => {
                const value = elementActual.idActivity;
                const label = elementActual.name;
                this.actividades.push(new Combo(value, label));
              }
          );
        }
    );
  }
  getTasks() {
    if (this.filtrosForm.controls.fTipoCumplimiento.value > 0 && this.filtrosForm.controls.fActividad.value > 0) {
      this.administratorComplianceService.getTasks(
          this.filtrosForm.controls.fTipoCumplimiento.value,
          this.filtrosForm.controls.fActividad.value).subscribe(
          (respuesta: Array<any>) => {
            this.tagTasks = respuesta;
            this.toastr.successToastr('Numero de tareas encontradas: ' + this.tagTasks.length, '¡Se ha logrado!');
            respuesta.forEach(elementActual => {
              this.checkboxDisabled.push(true);
                }
            );
          }
      );
    }
  }

  habilitarCheck(index) {
    this.checkboxDisabled[index] =  !this.checkboxDisabled[index];
  }

  armaMuneco(triger) {
      if (triger.checked) {
          let index = 0;
          let asignado = false;
          for (index = 0; index <  this.munecoTasks.length; ++index) {
              if (this.munecoTasks[index].tagId === this.tagTasks[+triger.source.name].idTag) {
                  asignado = true;
                  break;
              }
          }
          if (asignado) {
              this.toastr.errorToastr('Solo un Rol por Actividad', '!Informacion¡');
          } else {
              this.munecoTasks.push(new Task(
                  new Date(this.fFechaInicio.value).getTime(),
                  new Date(this.fFechaFin.value).getTime(),
                  this.filtrosForm.controls.fPersonaId.value,
                  this.filtrosForm.controls.fTipoCumplimiento.value,
                  this.filtrosForm.controls.fActividad.value,
                  this.tagTasks[+triger.source.name].idTag,
                  triger.source.value)
              );
          }
        }
      if (!triger.checked) {
      let index = 0;
      for (index = 0; index <  this.munecoTasks.length; ++index) {
        if (this.munecoTasks[index].tagId === this.tagTasks[+triger.source.name].idTag) {
          break;
        }
      }
      this.munecoTasks.splice(index, 1);
    }
      console.dir(this.munecoTasks);
  }
  get f() { return this.filtrosForm.controls; }

  saveTasks() {
    if (this.munecoTasks.length > 0) {
      this.munecoTasks.forEach((task: Task) => {
        this.administratorComplianceService.guardaTask(task).subscribe(
            (respuesta: Array<any>) => {
              this.toastr.successToastr('Tarea generada con exito.', '¡Se ha logrado!');
            });
      });
    } else {
      this.toastr.errorToastr('Debe Existir  almenos una tarea seleccionada', '!Informacion Insuficiente¡');
    }
  }
}
