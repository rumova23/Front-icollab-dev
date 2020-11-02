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
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import {EntidadEstatusDTO} from '../../../../models/entidad-estatus-dto';

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
  conditionSearch: Array<any> = [];
  condition;
  entidadEstatusTerminado: EntidadEstatusDTO;

  filteredfEmpNum     : string[];
  filteredfNames      : string[];
  filteredfLastName   : string[];
  filteredfSecondName : string[];
  filteredfDepto      : string[];
  filteredfRating     : string[];
  filteredfCompetence : string[];

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
    this.conditionSearch = [];
    this.condition = '1';

    this.comboStatus.push(new Combo('', ''));
    this.comboStatus.push(new Combo('1', 'Activo'));
    this.comboStatus.push(new Combo('0', 'Inactivo'));

    this.conditionSearch.push(new Combo('1', 'Todos'));
    this.conditionSearch.push(new Combo('2', 'Al menos uno'));

    this.filterForm = this.formBuilder.group({
      fEmpNum: [''],
      fNames: [''],
      fLastName: [''],
      fSecondName: [''],
      fCompetence: [''],
      fEst: ['', Validators.required],
      fLastDate: ['', Validators.required],
      fDepto: [''],
      fRating: [''],
      fSearchCondition: ['', null]
    });
    //this.initAutoComplete();
  }
  
  initAutoComplete() {
      this.filteredfEmpNum     = this.dataEmpleadoEvaluaciones.map(d=>d.numEmp.toLowerCase()                 ).filter((el,index,arr)=>arr.indexOf(el) === index);
      this.filteredfNames      = this.dataEmpleadoEvaluaciones.map(d=>d.name.toLowerCase()                   ).filter((el,index,arr)=>arr.indexOf(el) === index);
      this.filteredfLastName   = this.dataEmpleadoEvaluaciones.map(d=>d.lastName.toLowerCase()               ).filter((el,index,arr)=>arr.indexOf(el) === index);
      this.filteredfSecondName = this.dataEmpleadoEvaluaciones.map(d=>d.secondName.toLowerCase()             ).filter((el,index,arr)=>arr.indexOf(el) === index);
      this.filteredfDepto      = this.dataEmpleadoEvaluaciones.map(d=>d.department.toLowerCase()             ).filter((el,index,arr)=>arr.indexOf(el) === index);
      this.filteredfRating     = this.dataEmpleadoEvaluaciones.map(d=>d.totalRating.toString().toLowerCase() ).filter((el,index,arr)=>arr.indexOf(el) === index);
      this.filteredfCompetence = this.dataEmpleadoEvaluaciones.map(d=>d.competence.toLowerCase()             ).filter((el,index,arr)=>arr.indexOf(el) === index);
  }
  getDataSource() {
    this.dataEmpleadoEvaluaciones = [];
    
    this.personalService.getEmpleadosEvaluaciones().subscribe(
        dataBack => {

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
            obj['status']      = element.entidadEstatus;
            obj['competenceDesc'] = element.competencia;
            if (element.competencia === 'Activo') {
              obj['totalRating'] = '-';
              obj['competence'] = '-';
              obj['totalEvaluations'] = element.totalEvaluaciones === 0 ? element.totalEvaluaciones : element.totalEvaluaciones - 1;
            } else {
              obj['totalRating'] = element.calificacionFinal !== undefined && element.calificacionFinal > 0 ? parseFloat(element.calificacionFinal).toFixed(2) : '-';
              obj['competence'] = element.competencia;
              obj['totalEvaluations'] = element.totalEvaluaciones;
            }

            obj['userUpdated'] = element.userUpdated;
            const dateUpdated = element.dateUpdated;
            obj['dateHourUpdate'] = '.';
            if (dateUpdated) {
              obj['dateHourUpdate'] = this.datePipe.transform(new Date(dateUpdated) , 'dd/MM/yyyy HH:mm:ss');
            }
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
          this.dataSource = new MatTableDataSource<any>(this.dataEmpleadoEvaluaciones);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          this.perfilService.obtenEstatusTerminado('TX_EXAMEN_RESERVACION', 'Terminado').subscribe(
              (entidadEstatus: EntidadEstatusDTO) => {
                this.entidadEstatusTerminado = entidadEstatus;
              });
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
          
        }
    ).add(() => {
      
      this.initAutoComplete();
    });

  }

  filtros() {
    let values = this.filterForm.value;
    const typeSearch = this.filterForm.controls['fSearchCondition'].value.toString() === '1' ? 'AND' : 'OR'; // 1. OR \ 2. AND for search conditions
    if (
      values.fEmpNum      !== '' ||
      values.fNames       !== '' ||
      values.fLastName    !== '' ||
      values.fSecondName  !== '' ||
      values.fDepto       !== '' ||
      values.fRating      !== '' ||
      values.fCompetence  !== '' ||
      values.fEst         !== '' ||
      (values.fLastDate   !== '')
      ) {

      this.dataSource = new MatTableDataSource<any>(this.search(typeSearch));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    } else {
      let arrayElementData: any[] = this.dataEmpleadoEvaluaciones;
      this.dataSource = new MatTableDataSource<any>(arrayElementData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  limpiarFiltros() {
    this.filterForm.controls['fEmpNum'    ].setValue('');
    this.filterForm.controls['fNames'     ].setValue('');
    this.filterForm.controls['fLastName'  ].setValue('');
    this.filterForm.controls['fSecondName'].setValue('');
    this.filterForm.controls['fDepto'     ].setValue('');
    this.filterForm.controls['fRating'    ].setValue('');
    this.filterForm.controls['fCompetence'].setValue('');
    this.filterForm.controls['fLastDate'  ].setValue('');

    let arrayElementData: any[] = this.dataEmpleadoEvaluaciones;
    this.dataSource = new MatTableDataSource<any>(arrayElementData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  action(idEmpleado, tipo) {
    let descriptor = 'Compliance.evaluatePersonal.11';
    if (tipo === 'historial') {
      descriptor = 'Compliance.evaluatePersonal.history';
    }
    this.eventService.sendChangePage(new
    EventMessage(11, {
      idEmpleado: idEmpleado,
      tipo: tipo,
      entidadEstatusTerminado: this.entidadEstatusTerminado
    }, descriptor));
  }

  search(typeCondition: string): any[] {
    let arrayElements: any[] = this.dataEmpleadoEvaluaciones;
    let resultElements: any[] = [];
    let values = this.filterForm.value;
    let dateLastUpdate =  values.fLastDate !== '' ? this.datePipe.transform(this.getTimeLocale(values.fLastDate), 'dd/MM/yyyy') : null;
    if (typeCondition === 'OR') {
      resultElements = arrayElements.filter(o =>
        ( values.fEmpNum     !== '' && o.numEmp.toLowerCase().startsWith(values.fEmpNum.toLowerCase()                    ) ) ||
        ( values.fNames      !== '' && o.name.toLowerCase().startsWith(values.fNames.toLowerCase()                       ) ) ||
        ( values.fLastName   !== '' && o.lastName.toLowerCase().startsWith(values.fLastName.toLowerCase()                ) ) ||
        ( values.fSecondName !== '' && o.secondName.toLowerCase().startsWith(values.fSecondName.toLowerCase()            ) ) ||
        ( values.fDepto      !== '' && o.department.toLowerCase().startsWith(values.fDepto.toLowerCase()                 ) ) ||
        ( values.fRating     !== '' && o.totalRating.toString().startsWith(values.fRating.toLowerCase()                  ) ) ||
        ( values.fCompetence !== '' && o.competence.toLowerCase().startsWith(values.fCompetence.toLowerCase()            ) ) ||
        ( values.fEst        !== '' && (o.status.toLowerCase() =='activo'?'1':'0').startsWith(values.fEst.toLowerCase()  ) ) ||
        ( values.fLastDate   !== '' && o.dateHourUpdate.toString().startsWith(dateLastUpdate))
      );
    } else {
      let valuesMap = new Map([
          ['fEmpNum',     'numEmp'],
          ['fNames',      'name'],
          ['fLastName',   'lastName'],
          ['fSecondName', 'secondName'],
          ['fDepto',      'department'],
          ['fRating',     'totalRating'],
          ['fCompetence', 'competence'],
          ['fEst',        'status']
      ]);
      resultElements = arrayElements.filter(o => {
        let respuesta = true;
        
        for (const key in values) {
          if (values.hasOwnProperty(key)) {
            const element = values[key];
            if (dateLastUpdate != null) {
              if (!o.dateHourUpdate.toString().includes(dateLastUpdate)){
                respuesta = false;
              }
            }
            if (element !== '' && !['fSearchCondition', 'fLastDate'].includes(key)) {
              try {
                if(key == 'fEst'){
                  if(! (o[valuesMap.get(key)].toLowerCase() =='activo'?'1':'0').startsWith(element.toLowerCase())){
                    respuesta = false;
                  }
                }
                else if (! o[valuesMap.get(key)].toString().toLowerCase().startsWith(element.toLowerCase())) {
                  respuesta = false;
                }
                
              } catch (error) {
              }
            }
          }
        }
        return respuesta;
      });
    }

    return resultElements;
  }

  generarExamen(empleadoId: number) {
    
    this.perfilService.generaExamen(empleadoId, '').subscribe(
        data => {
          this.toastr.successToastr('Se generaron los examenes correctamente', '¡Se ha logrado!');
          this.eventService.sendChangePage(new
              EventMessage(11, {
                idEmpleado: empleadoId,
                tipo: 'editar'
              }, 'Compliance.evaluatePersonal.11'));
        },
        error => {
          this.toastr.errorToastr('Error al crear el exámen, favor de verificar', 'Lo siento,');
          
        }
    ).add(() => {
      
    });
  }

  getTimeLocale(dateString: string): Date {
    const toConvertDate = new Date(dateString);
    const offsetTimeZone = toConvertDate.getTimezoneOffset() * 60000;
    return new Date(toConvertDate.getTime() + offsetTimeZone);
  }

}
