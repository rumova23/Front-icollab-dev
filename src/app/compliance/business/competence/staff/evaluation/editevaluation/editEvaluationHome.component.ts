import { Component, OnInit } from '@angular/core';
import {EntidadEstausDTO} from '../../../../../models/entidad-estaus-dto';
import {PerfilComboService} from '../../../../../../core/services/perfil-combo.service';

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
  isdisabledFinishBehavior = false;

  entidadEstausTerminado: EntidadEstausDTO;

  constructor(private perfilComboService: PerfilComboService) { }

  ngOnInit() {
    this.perfilComboService.obtenEstatusTerminado('TX_EXAMEN_RESERVACION', 'Terminado').subscribe(
        (entidadEstatus: EntidadEstausDTO) => {
          this.entidadEstausTerminado = entidadEstatus;
        });
  }

  guardaExamen() {
    this.perfilComboService.accion.next('guardaExamen');
  }

  terminaExamen() {

  }

}
