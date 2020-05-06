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
import {Combo} from '../../../../models/Combo';
import {PerfilComboService} from '../../../../../core/services/perfil-combo.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {
  titulo = 'Competencia de los recursos / Personal / Evaluación de competencias para el personal';
  titulo2 = 'Evaluación de Competencias';
  filterForm: FormGroup;
  displayedColumnsOrder: any[] = [];
  displayedColumnsActions: any[]    = [];
  columnsToDisplay: string[] = [];
  rowPerPage = [50, 100, 250, 500];
  dataEmpleadoEvaluaciones: any[] = [];
  result;
  dataSource;
  comboStatus: Array<any>;
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
              private personalService: PersonalCompetenteService,
              private perfilService: PerfilComboService,
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

    this.comboStatus = [];

    this.comboStatus.push(new Combo('', ''));
    this.comboStatus.push(new Combo('1', 'Activo'));
    this.comboStatus.push(new Combo('0', 'Inactivo'));

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
            this.displayedColumnsActions.push({key: 'sys_edit', label: 'Nuevo / Editar'});
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
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
          this.addBlock(2, null);
        }
    ).add(() => {
      this.addBlock(2, null);
    });

  }

  filtros() {
    if (this.filterForm.controls['fEmpNum'].value !== '' || this.filterForm.controls['fNames'].value !== ''
        || this.filterForm.controls['fLastName'].value !== '' || this.filterForm.controls['fSecondName'].value !== ''
        || this.filterForm.controls['fRating'].value !== '' || this.filterForm.controls['fDepto'].value !== ''
        || this.filterForm.controls['fCompetence'].value !== '' || this.filterForm.controls['fEst'].value !== ''
        || this.filterForm.controls['fLastDate'].value !== '' || this.filterForm.controls['fLastHour'].value !== '') {

      this.dataSource = new MatTableDataSource<any>(this.search());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    } else {
      let arrayElementData: any[] = this.dataEmpleadoEvaluaciones;
      this.dataSource = new MatTableDataSource<any>(arrayElementData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  action(idEmpleado, tipo) {
    let descriptor = 'Compliance.evaluatePersonal.11';
    if (tipo === 'historial') {
      descriptor = 'Compliance.evaluatePersonal.history';
    }
    this.eventService.sendChangePage(new
    EventMessage(11, {
      idEmpleado: idEmpleado,
      tipo: tipo
    }, descriptor));
  }

  private addBlock(type, msg): void {
    this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
  }

  search(): any[] {
    let arrayElements: any[] = this.dataEmpleadoEvaluaciones;

    if (this.filterForm.controls['fEmpNum'].value !== '') {
      arrayElements = arrayElements.filter(personal => {
        return personal.numEmpleado.toString() === this.filterForm.controls['fEmpNum'].value ? true : false;
      });
    }
    if (this.filterForm.controls['fNames'].value !== '') {
      arrayElements = arrayElements.filter(personal => {
        return personal.name.toString().toUpperCase() === this.filterForm.controls['fNames'].value.toString().toUpperCase() ? true : false;
      });
    }
    if (this.filterForm.controls['fLastName'].value !== '') {
      arrayElements = arrayElements.filter(personal => {
        return personal.lastName.toString().toUpperCase() === this.filterForm.controls['fLastName'].value.toString().toUpperCase() ? true : false;
      });
    }
    if (this.filterForm.controls['fSecondName'].value !== '') {
      arrayElements = arrayElements.filter(personal => {
        return personal.secondName.toString().toUpperCase() === this.filterForm.controls['fSecondName'].value.toString().toUpperCase() ? true : false;
      });
    }
    if (this.filterForm.controls['fDepto'].value !== '') {
      arrayElements = arrayElements.filter(personal => {
        return personal.department != null && personal.department.toString().toUpperCase() === this.filterForm.controls['fDepto'].value.toString().toUpperCase() ? true : false;
      });
    }
    if (this.filterForm.controls['fRating'].value !== '') {
      arrayElements = arrayElements.filter(personal => {
        return personal.totalRating != null && personal.totalRating.toString().toUpperCase() === this.filterForm.controls['fRating'].value.toString() ? true : false;
      });
    }
    if (this.filterForm.controls['fCompetence'].value !== '') {
      arrayElements = arrayElements.filter(personal => {
        return personal.competence !=null && personal.competence.toString().toUpperCase() === this.filterForm.controls['fCompetence'].value.toString().toUpperCase() ? true : false;
      });
    }
    if (this.filterForm.controls['fEst'].value !== '') {
      arrayElements = arrayElements.filter(personal => {
        if (personal.status === null) {
          return false;
        } else if (this.filterForm.controls['fEst'].value.toString() === '1' && personal.status.toString().toUpperCase() === 'ACTIVO') {
          return true;
        } else if (this.filterForm.controls['fEst'].value.toString() === '0' && personal.status.toString().toUpperCase() === 'INACTIVO') {
          return true;
        }
      });
    }
    if (this.filterForm.controls['fLastDate'].value !== '' && this.filterForm.controls['fLastHour'].value !== '') {
      let dateLastUpdate = this.datePipe.transform(new Date(this.filterForm.controls['fLastDate'].value), 'dd/MM/yyyy') + ' ' + this.filterForm.controls['fLastHour'].value
      arrayElements = arrayElements.filter(personal => {
        return personal.fechaHoraUltimaModificacion.toString() === dateLastUpdate ? true : false;
      });
    } else if (this.filterForm.controls['fLastDate'].value === '' && this.filterForm.controls['fLastHour'].value !== '') {
      this.toastr.errorToastr('Debe introducir una fecha', 'Lo siento,');
    } else if (this.filterForm.controls['fLastDate'].value !== '' && this.filterForm.controls['fLastHour'].value === '') {
      this.toastr.errorToastr('Debe introducir una hora', 'Lo siento,');
    }

    return arrayElements;
  }

  eliminarRegistro(maestroOpcion: any) {

  }

  generarExamen(empleadoId: number) {
    this.perfilService.generaExamen(empleadoId, '').subscribe(data => {
          this.toastr.successToastr('Se generaron los examenes correctamente', '¡Se ha logrado!');
        }
    );
  }

}
