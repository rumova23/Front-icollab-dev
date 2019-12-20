import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, Sort } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrManager } from 'ng6-toastr-notifications';
import { GlobalService } from 'src/app/core/globals/global.service';
import { TagService } from 'src/app/compliance/services/tag.service';
import { SecurityService } from 'src/app/core/services/security.service';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { CatalogType } from 'src/app/compliance/models/CatalogType';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventService } from 'src/app/core/services/event.service';
import { EventBlocked } from 'src/app/core/models/EventBlocked';
import { DatePipe } from '@angular/common';
import {Combo} from '../../../models/Combo';
import {AdministratorComplianceService} from '../../../administration/services/administrator-compliance.service';
import {User} from '../../../../security/models/User';
import {MatrizCumplimientoDTO} from '../../../models/matriz-cumplimiento-dto';
import {TagOutDTO} from '../../../models/tag-out-dto';
import {GenerigResponseDTO} from '../../../models/GenerigResponseDTO';
import {MaestroOpcionDTO} from '../../../models/maestro-opcion-dto';
import {EntidadEstausDTO} from '../../../models/entidad-estaus-dto';

@Component({
  selector: 'app-complianceConfiguration',
  templateUrl: './complianceConfiguration.component.html',
  styleUrls: ['./complianceConfiguration.component.scss']
  , providers: [DatePipe]
})
export class ComplianceConfigurationComponent implements OnInit {
    nombreCatalogo = 'Características';
  titulo = 'Matriz Cumplimiento';
  registros;
  administradores;
  data: any[] = [];
  userResult;
  tiposCumplimientos: Array<any>;
  actividades: Array<any>;
  anios: Array<any>;
  isSupervisor = false;
  isFree = false;
  idMatrizFree: number;
    statusMatriz: string;
  menu: any[];
  showAdd = false;
  showView = false;
  showUpdate = false;
  showDelete = false;
  plural = "";

  columnas: string[] = ['order', 'tag', 'nombre', 'clasificacion', 'cumplimiento_legal', 'periodo_entrega', 'countTasks', 'autoridad', 'tipo_aplicacion', 'userUpdated', 'dateUpdated', 'estatus'];
  columnasResponsabilidad: string[] = ['order', 'admin', 'responsabilidad'];
  filtros = [
    {label: 'TAG', inputtype: 'text'},
    {label: 'Nombre', inputtype: 'text'},
    {label: 'Clasificación', inputtype: 'select'},
    {label: 'Cumplimiento Legal', inputtype: 'text'},
    {label: 'Autoridad', inputtype: 'text'},
    {label: 'Tipo de Aplicación', inputtype: 'text'},
    {label: 'Periodo de Entrega', inputtype: 'text'},
    {label: 'Estatus', inputtype: 'text'},
  ];
  filtrobtn = {label: 'buscar'};
  registros_x_pagina = [50, 100, 250, 500];

  filtrosForm: FormGroup;

  serviceSubscription: any;

  constructor(
    private tagService: TagService,
    private formBuilder: FormBuilder,
    public toastr: ToastrManager,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService,
    public globalService: GlobalService,
    private eventService: EventService,
    private datePipe: DatePipe,
    private administratorComplianceService: AdministratorComplianceService,
    private securityService: SecurityService) {
      this.menu = securityService.getMenu('Compliance');
      this.serviceSubscription = this.eventService.onChangePlant.subscribe({
      next: (event: EventMessage) => {
        switch (event.id) {
          case 100:
            this.obtenerListaTags((new Date()).getFullYear());
            break;
        }
      }
    });
   }
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
      this.tagService.getEntidadEstatus('TX_MATRIZ_CUMPLIMIENTO', 'Aprobada').subscribe( (data: EntidadEstausDTO) => {
        this.idMatrizFree = data.entidadEstatusId;
      });
      for (const option of this.menu) {
          if (option.children) {
              let flag = true;
              while ( flag ) {
                  flag = false;
                  for (let ins = 0; ins < option.children.length; ins++) {

                      console.dir("nombres: " + option.children[ins]['label']);
                      if (option.children[ins]['label'] === this.nombreCatalogo) {
                          if (option.children[ins].actions) {
                              for (let action = 0; action < option.children[ins].actions.length ; action++) {
                                  if (option.children[ins].actions[action] === 'CREAR') {
                                      this.showAdd = true;
                                  }
                                  if (option.children[ins].actions[action] === 'VER') {
                                      this.showView = true;
                                  }
                                  if (option.children[ins].actions[action] === 'EDITAR') {
                                      this.showUpdate = true;
                                  }
                                  if (option.children[ins].actions[action] === 'BORRAR') {
                                      this.showDelete = true;
                                  }
                              }
                          }
                      }
                  }
              }
          }
      }

      const user = JSON.parse(localStorage.getItem('user'));
      console.dir(user);
      user.roles.forEach( role => {
          if (role.name === 'ROLE_ADMIN_CUMPLIMIENTO_COMPLIANCE') {
              this.isSupervisor = true;
          }
      });
      this.addBlock(1, 'Cargando...');
      this.filtrosForm = this.formBuilder.group({
        fTipoCumplimiento: [{ value: '', disabled: false }, Validators.required],
        fActividad: [{ value: '', disabled: false }, Validators.required],
        fAnio: [{ value: '', disabled: false }, Validators.required]
    });


    /*
    this.securityService.loadUsers().subscribe( userResult => {
      this.addBlock(2, null);
      this.userResult = userResult;
    */
      const currentYear = (new Date()).getFullYear();
      this.filtrosForm.controls.fAnio.setValue(currentYear);
      this.obtenerListaTags(currentYear);

    /*
    },
    error =>{
      this.addBlock(2, null);
      this.toastr.errorToastr('Error al cargar lista de usuarios.', 'Lo siento,');
    });
    */
      this.tiposCumplimientos = [];
      this.actividades = [];
      this.anios = [];
      this.initCombos();
  }
  formatPeriodo_entrega(period, code){
    period > 1 ? this.plural="S" :this.plural="";
    if(code == "MES" && period > 1)this.plural="ES"
    return period + ' ' + code + this.plural;
  }
  sortData(sort: Sort) {}
  get f() { return this.filtrosForm.controls; }

  obtenerListaTags(anio: number) {
    this.addBlock(1, 'Cargando...');
    this.data = [];
    this.tagService.obtenTagPorFiltros(anio).subscribe( (data: MatrizCumplimientoDTO) => {
        this.statusMatriz = data.entidadEstatus.estatus.nombre;
        if (data.entidadEstatus.entidadEstatusId === this.idMatrizFree) {
            this.isFree = true;
        }
        this.administradores =  new MatTableDataSource<any>(data.cumplimientoIntegrantes);
        console.dir(data.matriz);
        this.registros =  new MatTableDataSource<TagOutDTO>(data.matriz);
        this.registros.paginator = this.paginator;
        let dateUpdated = null;
        let autoridad = null;
        this.registros.sortingDataAccessor = (item, property) => {
          switch(property) {
              case 'tag': return item.tag;
              case 'nombre': return item.classificationActivity;
              case 'clasificacion': return item.activity.name;
              case 'cumplimiento_legal': return item.typeCompliance.code;
              case 'periodo_entrega': return item.period + ' ' + (item.unitPeriod && item.unitPeriod.code) ? item.unitPeriod.code : '';
              case 'autoridad': return (item.authority && item.authority.code) ? item.authority.code : '';
              case 'tipo_aplicacion': return item.applicationType.code;
              case 'estatus': return item.active;
              case 'dateUpdated' : dateUpdated = ((item.dateUpdated != null) ? item.dateUpdated : item.dateCreated);
                                   return new Date(dateUpdated).getTime();
              case 'userUpdated': return (item.userUpdated) ? item.userUpdated : item.userCreated;
              default: return item[property];
            }
      }
        this.registros.sort = this.sort;
        this.addBlock(2, null);

            if (this.showView) {
                // this.displayedColumnsActions.push({key:'see',label:'Ver'});
                this.columnas.push('ver');
            }
            if (this.showUpdate) {
                // this.displayedColumnsActions.push({key:'update',label:'Editar'});
                this.columnas.push('modificar');
            }
            if (this.showUpdate) {
                // this.displayedColumnsActions.push({key:'delete',label:'Eliminar'});
                this.columnas.push('eliminar');
            }
      },
      error => {
        this.addBlock(2, null);
        this.toastr.errorToastr('Error al cargar lista de tags.', 'Lo siento,');

      }
    );
  }

  public eliminarTag(tag: any) {
    this.confirmationDialogService.confirm('Por favor, confirme..',
          'Está seguro de eliminar el Cumplimiento? ' + tag.tag)
    .then((confirmed) => {
        if ( confirmed ) {
            this.eliminarTagConfirm(tag);
        }
      })
    .catch(() => console.log('Cancelo'));
  }

  eliminarTagConfirm(tag: any) {
      this.tagService.eliminarTag(tag.idTag).subscribe(
      respuesta => {
        // this.addBlock(2, null);
        let res: any;
        res = respuesta;
        if ( res.clave === 0 ) {
          this.obtenerListaTags((new Date()).getFullYear());
          this.toastr.successToastr(res.mensaje, '¡Se ha logrado!');
        } else {
          this.toastr.errorToastr(res.mensaje, 'Lo siento,');
        }
      },
      error => {
        // this.addBlock(2, null);
        this.toastr.errorToastr('Error al eliminar el tag.', 'Lo siento,');
      }
    );

  }

  action(option: number, id: any) {
    let type: CatalogType = {};
    switch (option) {
       case 1:
       type = {id, action: 'nuevo',
        name: null};
       break;
       case 2:
       type = {id, action: 'ver',
       name: null};
       break;
       case 3:
       type = {id, action: 'edit',
        name: null};
       break;
    }
    this.eventService.sendChangePage(new EventMessage(9, type , 'Compliance.Características.ABC'));
 }

  // Loadin
  private addBlock(type, msg): void {
    this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
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
        const currentYear = (new Date()).getFullYear();
        const nextYear = currentYear + 1;
        this.anios.push(new Combo(currentYear.toString(), currentYear.toString()));
        this.anios.push(new Combo(nextYear.toString(), nextYear.toString()));
    }

    aprobarMatriz() {
        this.administratorComplianceService.apruebaMatrizCumplimiento(this.filtrosForm.controls.fAnio.value).subscribe(
            response => {
                this.toastr.successToastr('Se aprobo correctamente la matriz de cumplimiento', '¡Se ha logrado!');
                this.obtenerListaTags(this.filtrosForm.controls.fAnio.value);
            });
    }
    liberarMatriz() {
        this.addBlock(1, 'Cargando...');
        this.administratorComplianceService.liberaMatrizCumplimiento(this.filtrosForm.controls.fAnio.value).subscribe(
            (responseLiberacion: GenerigResponseDTO) => {
                this.toastr.successToastr(responseLiberacion.mensaje, '¡Se ha logrado!');
                this.obtenerListaTags(this.filtrosForm.controls.fAnio.value);
                this.addBlock(2, null);
            });
    }
    getTasks() {
        if (this.filtrosForm.controls.fTipoCumplimiento.value > 0 && this.filtrosForm.controls.fActividad.value > 0) {
            this.administratorComplianceService.getTasks(
                this.filtrosForm.controls.fAnio.value,
                this.filtrosForm.controls.fTipoCumplimiento.value,
                this.filtrosForm.controls.fActividad.value).subscribe(
                (data: MatrizCumplimientoDTO) => {
                    console.dir(data);
                    this.registros =  new MatTableDataSource<any>(data.matriz);
                    this.administradores =  new MatTableDataSource<any>(data.cumplimientoIntegrantes);
                    this.registros.paginator = this.paginator;
                    this.registros.sort = this.sort;
                    this.addBlock(2, null);
                }
            );
        }
    }

    obtenMatrizCumplimiento() {
        this.obtenerListaTags(this.filtrosForm.controls.fAnio.value);
    }
}
