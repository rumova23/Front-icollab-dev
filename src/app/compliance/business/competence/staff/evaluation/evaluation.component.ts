import {Component, OnInit, ViewChild} from '@angular/core';
import { GlobalService } from '../../../../../core/globals/global.service';
import { EventService } from '../../../../../core/services/event.service';
import { EventMessage } from '../../../../../core/models/EventMessage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ToastrManager} from 'ng6-toastr-notifications';
import {DatePipe} from '@angular/common';
import {PersonalCompetenteService} from '../../../../services/personal-competente.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {EventBlocked} from '../../../../../core/models/EventBlocked';
import {Constants} from '../../../../../core/globals/Constants';
import {SecurityService} from '../../../../../core/services/security.service';

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
  dataEmpleadoEvaluaciones: any[] = [];
  result;
  dataSource;
  comboStatus = [];
  menu: any[];
  nombreCatalogo = 'Personal';
  nombreSubCatalogo = 'Evaluación de Competencias para el Personal';
  showAdd = false;
  showView = false;
  showUpdate = false;
  showDelete = false;

  constructor(private globalService: GlobalService,
              private eventService: EventService,
              private formBuilder: FormBuilder,
              public toastr: ToastrManager,
              private datePipe: DatePipe,
              private securityService: SecurityService,
              private personalService: PersonalCompetenteService
  ) {
    this.menu = securityService.getMenu('Compliance');
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    for (const option of this.menu) {
      if (option.children) {
        let flag = true;
        while ( flag ) {
          flag = false;
          for (let ins = 0; ins < option.children.length; ins++) {
            if ((option.children[ins].label === this.nombreCatalogo) || option.children[ins].children) {
              if (option.children[ins].children) {
                const subChildren = option.children[ins].children;
                for (let sub = 0; sub < subChildren.length; sub++) {
                  if (subChildren[sub].label === this.nombreSubCatalogo) {
                    if (subChildren[sub].actions) {
                      for (let action = 0; action < subChildren[sub].actions.length ; action++) {

                        if (subChildren[sub].actions[action] === 'CREAR') {
                          this.showAdd = true;
                        }
                        if (subChildren[sub].actions[action] === 'VER') {
                          this.showView = true;
                        }
                        if (subChildren[sub].actions[action] === 'EDITAR') {
                          this.showUpdate = true;
                        }
                        if (subChildren[sub].actions[action] === 'BORRAR') {
                          this.showDelete = true;
                        }
                      }
                    }
                  }
                }
              }

            }
          }
        }
      }
    }
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

  getDataSource() {
    this.dataEmpleadoEvaluaciones = [];
    this.addBlock(1, 'Cargando...');
    this.personalService.getEmpleadosEvaluaciones().subscribe(
        dataBack => {
          debugger;
          this.result = dataBack;
          let i = 0;
          for (const element of this.result) {
            i += 1;
            const obj            = {};
            obj['id'] = element.empleadoId;
            obj['numEmp'] = element.userId;
            obj['name'] = element.nombres;
            obj['lastName'] = element.paterno;
            obj['secondName'] = element.materno;
            obj['department'] = element.departamento;
            obj['totalRating'] = element.calificacionFinal !== undefined && element.calificacionFinal > 0 ? parseFloat(element.calificacionFinal).toFixed(2) : 0;
            obj['competence'] = element.competencia;
            obj['totalEvaluations'] = element.totalEvaluaciones;
            obj['userUpdated'] = element.userUpdated;
            const dateUpdated = element.dateUpdated;
            obj['dateHourUpdate'] = '.';
            if (dateUpdated) {
              obj['dateHourUpdate'] = this.datePipe.transform(new Date(dateUpdated) , 'dd/MM/yyyy HH:mm:ss');
            }
            obj['status']      = element.entidadEstatus;
            obj['element']     = element;
            obj['order'] = i;

            this.dataEmpleadoEvaluaciones.push(obj);
          }

          this.displayedColumnsOrder = [
            {key: 'order', label: 'No.'}
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
          this.columnsToDisplay = [ 'order', 'numEmp', 'name', 'lastName', 'secondName', 'department', 'totalRating', 'competence', 'totalEvaluations', 'userUpdated', 'dateHourUpdate', 'status'];

          if (this.showView) {
            this.displayedColumnsActions.push({key: 'sys_see', label: 'Ver'});
            this.columnsToDisplay.push('sys_see');
          }
          if (this.showUpdate) {
            this.displayedColumnsActions.push({key: 'sys_edit', label: 'Editar'});
            this.columnsToDisplay.push('sys_edit');
          }
          if (this.showUpdate) {
            this.displayedColumnsActions.push({key: 'sys_delete', label: 'Eliminar'});
            this.columnsToDisplay.push('sys_delete');
          }
          this.dataSource = new MatTableDataSource<any>(this.dataEmpleadoEvaluaciones);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        errorData => {
          debugger;
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
          this.addBlock(2, null);
        }
    ).add(() => {
      this.addBlock(2, null);
    });

  }
  filtros() {}

  action(idEmpleado, tipo, n) {
    this.eventService.sendChangePage(new
    EventMessage(11, {
      idEmpleado: idEmpleado,
      tipo: tipo
    },'Compliance.evaluatePersonal.11'));
  }

  private addBlock(type, msg): void {
    this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
  }

}
