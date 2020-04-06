import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../../../core/globals/global.service';
import { EventService } from '../../../../../core/services/event.service';
import { EventMessage } from '../../../../../core/models/EventMessage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {
  titulo = 'Competencia de los recursos / Personal / Evaluación de competencias para el personal';
  titulo2 = 'Evaluación de Competencia';
  filterForm: FormGroup;
  displayedColumnsOrder: any[] = [];
  displayedColumnsActions: any[]    = [];
  columnsToDisplay: string[] = [];
  rowPerPage = [50, 100, 250, 500];

  dataSource;
  comboStatus=[];
  constructor(private globalService : GlobalService,
              private eventService : EventService,
              private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.getDataSource()

    this.filterForm = this.formBuilder.group({
      fEmpNum: ['', Validators.required],
      fNames: ['', Validators.required],
      fLastName: ['', Validators.required],
      fSecondName: ['', Validators.required],
      fCompetence: ['', Validators.required],
      fEst: ['', Validators.required],
      fLastHour: ['', Validators.required],
      fLastDate: ['', Validators.required],
      fDepto: ['', Validators.required],
      fRating: ['', Validators.required],
    });
  }

  getDataSource(){
    this.displayedColumnsOrder = [
      {key: 'number', label: 'No.'}
      , {key: 'numEmp', label: 'No.Empleado'}
      , {key: 'name', label: 'Nombre(s)'}
      , {key: 'lastName', label: 'Apellido Paterno'}
      , {key: 'secondName', label: 'Apellido Materno'}
      , {key: 'department', label: 'Departamento'}
      , {key: 'totalRating', label: 'Calificación Total'}
      , {key: 'competence', label: 'Competencia'}
      , {key: 'totalEvaluations', label: 'Total de Evaluaciones'}
      , {key: 'userUpdated', label: 'Usuario Modifico'}
      , {key: 'dateHourUpdate', label: 'Fecha y Hora de Ultima Modificación'}
      , {key: 'status', label: 'Estatus'}
    ];

    this.displayedColumnsActions = [];
    this.columnsToDisplay = [ 'number', 'numEmp', 'name', 'lastName', 'secondName', 'department', 'totalRating', 'competence', 'totalEvaluations', 'userUpdated', 'dateHourUpdate', 'status'];
  }
  filtros(){}
  action(idEmpleado, tipo,n) {
    this.eventService.sendChangePage(new
    EventMessage(11, {
      idEmpleado: idEmpleado,
      tipo: tipo
    },'Compliance.evaluatePersonal.11'));
  }

}
