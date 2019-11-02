import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {DatosGraficaGant} from '../../../../models/datosGraficaGant';
import {DatosGanttDTO} from '../../../../models/datos-gantt-dto';
import {AdministratorComplianceService} from '../../../services/administrator-compliance.service';

@Component({
  selector: 'app-task-gantt',
  templateUrl: './task-gantt.component.html',
  styleUrls: ['./task-gantt.component.scss']
})
export class TaskGanttComponent implements OnInit {
  @Input() complianceId: number;
  datosGanttDTO: DatosGanttDTO;
  constructor(private administratorComplianceService: AdministratorComplianceService) {
  }
  ngOnInit() {
    this.obtenGantt();
  }
  obtenGantt() {
    this.administratorComplianceService.obtenGantt(this.complianceId).subscribe(
        (response: DatosGanttDTO) => {
          console.log('RTC');
          console.dir(response);
          console.log('RTC');
          this.datosGanttDTO = response;
        }
    );
  }
}
