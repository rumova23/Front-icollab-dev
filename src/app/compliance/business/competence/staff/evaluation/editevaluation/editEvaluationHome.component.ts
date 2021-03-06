import { Component, OnInit } from '@angular/core';
import {EntidadEstatusDTO} from '../../../../../models/entidad-estatus-dto';
import {PerfilComboService} from '../../../../../../core/services/perfil-combo.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {GlobalService} from '../../../../../../core/globals/global.service';
import {EventMessage} from '../../../../../../core/models/EventMessage';
import {EventService} from '../../../../../../core/services/event.service';

@Component({
  selector: 'app-edit-evaluation-home',
  templateUrl: './editEvaluationHome.component.html',
  styleUrls: ['./editEvaluationHome.component.scss']
})
export class EditEvaluationHomeComponent implements OnInit {
  title = 'Competencia de los Recursos / Evaluación de Competencia para el Personal / Evaluación';
  idEmpleado: number;
  tipo: string;
  isViewable = true;
  isdisabled = false;
  isBehaviorComplete = false;
  isSkillsComplete = false;
  finishedExam = false;
  entidadEstatusTerminado: EntidadEstatusDTO;

  constructor(private perfilComboService: PerfilComboService,
              public toastr: ToastrManager,
              private eventService: EventService,
              public  globalService: GlobalService) { }

  ngOnInit() {
  }

  guardaExamen() {
    this.perfilComboService.accionSkills.next('guardaExamenSkills');
    this.perfilComboService.accionBehavior.next('guardaExamenBehavior');
  }

  regresar() {
    this.eventService.sendChangePage(new EventMessage(11, {} , 'Compliance.evaluatePersonal'));
  }

  terminaExamen() {
    if (this.isBehaviorComplete && this.isSkillsComplete) {
      this.perfilComboService.accionSkills.next('terminaExamenSkills');
      this.perfilComboService.accionBehavior.next('terminaExamenBehavior');
      this.finishedExam = true;
    } else {
      this.toastr.errorToastr('Para terminar el examen, todas las preguntas deben ser contestadas.', 'Lo siento,');
    }
  }

  validaBehavior(isComplete: boolean) {
    this.isBehaviorComplete = isComplete;
    console.log('BehaviorComplete: ' + isComplete);
  }

  validaSkills(isComplete: boolean) {
    this.isSkillsComplete = isComplete;
    console.log('SkillsComplete: ' + isComplete);
  }

}
