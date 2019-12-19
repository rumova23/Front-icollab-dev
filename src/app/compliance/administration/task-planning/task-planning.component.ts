import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdministratorComplianceService} from '../services/administrator-compliance.service';
import {Combo} from '../../models/Combo';
import {Task} from '../../models/Task';
import {ToastrManager} from 'ng6-toastr-notifications';
import { DOCUMENT, DatePipe } from '@angular/common';
import {CatalogType} from '../../models/CatalogType';
import {EventMessage} from '../../../core/models/EventMessage';
import {EventService} from '../../../core/services/event.service';
import {MatrizCumplimientoDTO} from '../../models/matriz-cumplimiento-dto';
import {TagOutDTO} from '../../models/tag-out-dto';
import {trigger} from '@angular/animations';
import {ComplianceService} from '../../services/compliance.service';

@Component({
  selector: 'app-task-planning',
  templateUrl: './task-planning.component.html',
  styleUrls: ['./task-planning.component.scss']
})
export class TaskPlanningComponent implements OnInit {
  filtrosForm: FormGroup;
  tagsActorPerfil: any = [];
  anios: Array<any>;
  personas: Array<any>;
  munecoTasks: Array<Task>;
  persona: any;
  titulo = 'Asignacion Tareas';
  submitted = false;
  tiposCumplimientos: Array<any>;
  actividades: Array<any>;
  tagTasks: Array<TagOutDTO>;
  checkboxDisabled: Array<any>;
  headTasks = ['#', 'Tarea', 'Periodo', 'Cantidad', 'Ejecutor', 'Responsable', 'Supervisor'];
  tipoPerfil = ['Ejecutor', 'Responsable', 'Supervisor'];
  matrizCumplimiento: MatrizCumplimientoDTO;
  constructor(
      private complianceService: ComplianceService,
      private administratorComplianceService: AdministratorComplianceService,
      private formBuilder: FormBuilder,
      public  toastr: ToastrManager,
      @Inject (DOCUMENT) document,
      private datePipe: DatePipe,
      private eventService: EventService) {
      this.filtrosForm = this.formBuilder.group({
        fAnio: ['', Validators.required],
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
    this.anios = [];
    this.initCombos();
  }

  onSubmit() {
  }
  initCombos() {

      this.complianceService.getListMatrizCumplimiento().subscribe((lista: Array<MatrizCumplimientoDTO>) => {
          lista.forEach((cumplimiento: MatrizCumplimientoDTO) => {
              this.anios.push(new Combo(cumplimiento.anio.toString(), cumplimiento.anio.toString()));
          });
      });

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

      this.administratorComplianceService.getPersonalCompetente().subscribe(
          (respuesta: Array<any>) => {
              this.personas = [];
              respuesta.forEach(elementActual => {
                  console.log('elementActual.empleadoId: ' + elementActual.empleadoId);
                  const value = elementActual.empleadoId;
                  const label = elementActual.nombres + ' ' + elementActual.paterno + ' ' + elementActual.materno;
                  this.personas.push(new Combo(value, label));
                  }
              );
          }
      );
  }
  getTasks() {
    if (this.filtrosForm.controls.fTipoCumplimiento.value > 0 && this.filtrosForm.controls.fActividad.value > 0) {
      this.administratorComplianceService.getTasks(
          this.filtrosForm.controls.fAnio.value,
          this.filtrosForm.controls.fTipoCumplimiento.value,
          this.filtrosForm.controls.fActividad.value).subscribe(
          (matrizCumplimiento: MatrizCumplimientoDTO) => {
              console.log('RTC');
              console.dir(matrizCumplimiento);
              console.log('RTC');
              this.matrizCumplimiento = matrizCumplimiento;
              this.tagTasks = matrizCumplimiento.matriz;
              this.toastr.successToastr('Numero de tareas encontradas: ' + this.tagTasks.length, '¡Se ha logrado!');
              this.tagTasks.forEach((elementActual: TagOutDTO) => {
                  this.tagsActorPerfil.push({tagId: elementActual.idTag, ejecutor: [], responsable: [], supervisor: []});
                  this.checkboxDisabled.push(true);
                }
            );
          }
      );
    }
  }


  get f() { return this.filtrosForm.controls; }

  asignaTarea() {
      let tasks: Array<Task>;
      tasks = [];
      let task = null;
      this.tagTasks.forEach((elementActual: TagOutDTO) => {
          task = new Task();
          task.complianceId = elementActual.complianceId;
          task.ejecutores = this.actorSeleccionado('ejecutor_' + elementActual.idTag);
          task.supervisores = this.actorSeleccionado('supervisor_' + elementActual.idTag);
          task.responsables = this.actorSeleccionado('responsable_' + elementActual.idTag);
          tasks.push(task);
      });
      this.administratorComplianceService.guardaListTask(tasks).subscribe( a => {
          this.toastr.successToastr('Asignacion de tareas: correctamente ' + this.tagTasks.length, '¡Se ha logrado!');
      },
          error => {
              this.toastr.errorToastr('No esta disponible la asignacion de tareas. Intentelo mas tarde. ' + this.tagTasks.length, '¡Error!');
          });
  }
  actorSeleccionado(selectId) {
      const actores = [];
      const select = document.getElementById(selectId) as HTMLSelectElement;
      for (let i = 0; i < select.options.length; i++) {
          if (select.options[i].selected) {
              actores.push(select.options[i].value);
          }
      }
      return actores;
  }

    action(option: number, id: any) {
        let type: CatalogType = {};
        switch (option) {
            case 1:
                type = {id, action: 'ver',
                    name: null
                };
                break;
            case 2:
                type = {id, action: 'editar',
                    name: null
                };
                break;
        }
        this.eventService.sendChangePage(new EventMessage(7, type, 'Compliance.Categorías.ABC'));
    }

    agregarActor(nameCharge) {
        const select = document.getElementById(nameCharge) as HTMLSelectElement;
        const tagIdActor = nameCharge.split('_');
        console.log(tagIdActor[1] + ' : ' + tagIdActor[0]);
        const tagId = tagIdActor[1];
        if (tagIdActor[0] === 'ejecutor') {
            this.habilitarDesHabilitarOpcion('responsable_' + tagId, nameCharge);
            this.habilitarDesHabilitarOpcion('supervisor_' + tagId, nameCharge);
        }
        if (tagIdActor[0] === 'responsable') {
            this.habilitarDesHabilitarOpcion('ejecutor_' + tagId, nameCharge);
            this.habilitarDesHabilitarOpcion('supervisor_' + tagId, nameCharge);
        }
        if (tagIdActor[0] === 'supervisor') {
            this.habilitarDesHabilitarOpcion('ejecutor_' + tagId, nameCharge);
            this.habilitarDesHabilitarOpcion('responsable_' + tagId, nameCharge);
        }
    }
    habilitarDesHabilitarOpcion(selectId: string, nameCharge: string ) {
        const select = document.getElementById(nameCharge) as HTMLSelectElement;
        const selectAfectado = document.getElementById(selectId) as HTMLSelectElement;
        for (let i = 0; i < select.options.length; i++) {
            if (!select.options[i].disabled) {
                selectAfectado.options[i].disabled = select.options[i].selected;
            }
        }
    }
}
