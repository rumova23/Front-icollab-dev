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
import {EntidadEstatusDTO} from '../../../models/entidad-estatus-dto';
import * as moment from 'moment';
import { IdLabel } from 'src/app/core/models/IdLabel';
import { ColumnLabel } from '../../../../core/models/ColumnLabel';
import { OrderCatalogDTO } from 'src/app/compliance/models/OrderCatalogDTO';

@Component({
  selector: 'app-complianceConfiguration',
  templateUrl: './complianceConfiguration.component.html',
  styleUrls: ['./complianceConfiguration.component.scss']
  , providers: [DatePipe]
})
export class ComplianceConfigurationComponent implements OnInit {
  nombreCatalogo = 'Características';
  titulo = 'Características';
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

  
  columnasResponsabilidad: string[] = ['order', 'admin', 'responsabilidad'];
 
  filtrobtn = {label: 'buscar'};
  registros_x_pagina = [50, 100, 250, 500];

  filtrosForm: FormGroup;

  serviceSubscription: any;

  tableData;
  tableDataFiltered;
  tablaColumnsLabels : ColumnLabel[] = [
    { key:'order'               ,label: '#' },
    { key:"tag"                 ,label:'TAG'},
    { key:"nombre"              ,label:'Nombre del Cumplimiento'},
    { key:"clasificacion"       ,label:'Categoría'},
    { key:"cumplimiento_legal"  ,label:'Tipo de Cumplimiento'},
    { key:"autoridad"           ,label:'Autoridad'},
    { key:"tipo_aplicacion"     ,label:'Tipo de Aplicación'},
    { key:"grupo"               ,label:'Grupo'},
    { key:"periodo_entrega"     ,label:'Período de Entrega'},
    { key:"countTasks"          ,label:'Generados'},
    { key:"estatus"             ,label:'Estatus'},
    { key:"userUpdated"         ,label:'Usuario Última Modificación'},
    { key:"dateUpdated"         ,label:'Fecha y Hora de Última Modificación', dateFormat:'dd/MM/yyyy HH:mm'},
  ];
  tableColumnsDisplay: string[] = [
    'order',
    'tag',
    'nombre',
    'clasificacion',
    'cumplimiento_legal',
    'periodo_entrega',
    'autoridad',
    'tipo_aplicacion',
    'grupo',
    'userUpdated',
    'dateUpdated',
    'estatus'
  ];
  tableRowXPage = [50, 100, 250, 500];
  formFiltersTable     : FormGroup;
  formFiltersTypeTable : FormGroup;
  formDeliveryPeriod   : FormGroup;
  formFilterDate       : FormGroup;
  formDeliveryPeriodSubmited = false;
  optionsFiltersType   : IdLabel[] = [{id:1,label:'Todos'},{id:2,label:'Al menos uno'}];
  optionsPeriod        : IdLabel[] = [];
  comboAutoridad       : IdLabel[] = [];
  comboTipoAplicacion  : IdLabel[] = [];
  comboGrupo           : IdLabel[] = [];
  comboEstatus         : IdLabel[] = [{id:'Activo',label:'Activo'},{id:'Inactivo',label:'Inactivo'}];
  comboUnitPeriod      : any[]     = [];
  filteredAutoTag      : string[];
  filteredAutoName     : string[];

  optionsClasificacion : IdLabel[];

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
      this.tagService.getEntidadEstatus('TX_MATRIZ_CUMPLIMIENTO', 'Aprobada').subscribe( (data: EntidadEstatusDTO) => {
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
      this.formFiltersTable = this.formBuilder.group({
        tag:[null],
        nombre:[null],
        clasificacion:[null],
        periodo_entrega:[null],
        autoridad:[null],
        tipo_aplicacion:[null],
        grupo:[null],
        estatus:[null],
        sDateUpdated:[null],
      });
      this.formFiltersTypeTable = this.formBuilder.group({
        typeFilter:[2,Validators.required]
      });
      this.formDeliveryPeriod = this.formBuilder.group({
        n:[null,Validators.required],
        t:[null,Validators.required]
      });
      this.formFilterDate = this.formBuilder.group({
        dateUpdated:[null]
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
        this.setTableData(data.matriz);

        this.administradores =  new MatTableDataSource<any>(data.cumplimientoIntegrantes);
        
        
 
        let dateUpdated = null;
        let autoridad = null;
        

        this.addBlock(2, null);

        
        if (this.showView) {
            if(!this.tableColumnsDisplay.includes('sys_see'))this.tableColumnsDisplay.push('sys_see');
        }
        if (this.showUpdate) {
            if(!this.tableColumnsDisplay.includes('sys_edit'))this.tableColumnsDisplay.push('sys_edit');
        }
        if (this.showUpdate) {
            if(!this.tableColumnsDisplay.includes('sys_delete'))this.tableColumnsDisplay.push('sys_delete');
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
                    this.setTableData(data.matriz);
                    this.administradores =  new MatTableDataSource<any>(data.cumplimientoIntegrantes);
                    this.addBlock(2, null);
                }
            );
        }
    }

    obtenMatrizCumplimiento() {
        this.obtenerListaTags(this.filtrosForm.controls.fAnio.value);
    }
    setTableData(matriz:TagOutDTO[]){
      
      this.tableData = matriz
      .sort((a, b) =>  moment((a.dateUpdated != null) ? a.dateUpdated : a.dateCreated).toDate().getTime() - moment((b.dateUpdated != null) ? b.dateUpdated : b.dateCreated).toDate().getTime())
      .map((e:TagOutDTO,i)=>{
        let dateUpdated = ((e.dateUpdated != null) ? e.dateUpdated : e.dateCreated);
        return {
          'order':i+1,
          'idTag':e.idTag,
          'tag':e.tag,
          'nombre':e.classificationActivity,
          'clasificacion':e.activity.name,
          'cumplimiento_legal':e.typeCompliance.code,
          'periodo_entrega':this.formatPeriodo_entrega(e.period,  (e.unitPeriod && e.unitPeriod.code) ? e.unitPeriod.code : '' ),
          'countTasks':e.countCompliance,
          'autoridad': (e.authority && e.authority.code) ? e.authority.code : '',
          'tipo_aplicacion':e.applicationType.code,
          'grupo':'',
          'userUpdated':(e.userUpdated) ? e.userUpdated : e.userCreated,
          'dateUpdated':dateUpdated,
          'estatus': (e.active) ? 'Activo' : 'Inactivo',
          'sDateUpdated':this.datePipe.transform(new Date(dateUpdated),'dd/MM/yyyy')
        };
      });
      this.initAutoComplete();

      this.tableDataFiltered = [].concat(this.tableData);
    }
    initAutoComplete() {
      this.filteredAutoTag     = this.tableData.map(d=>d.tag).filter((el,index,arr)=>arr.indexOf(el) === index);
      this.filteredAutoName    = this.tableData.map(d=>d.nombre).filter((el,index,arr)=>arr.indexOf(el) === index);

      let statusConsultActivity = 'TODOS'; // 'TODOS' || 'ACTIVOS'
      this.tagService.getCatalogoActividades(statusConsultActivity)
        .subscribe(catalogoResult => {
          this.optionsClasificacion = catalogoResult.map(e=>{return {id:e.name,label:e.name};});
        },
        error => {
          this.toastr.errorToastr('Error al cargar catálogo de Categoría.', 'Lo siento,');
        }
      );
      
      this.tagService.comboUnitPeriod().subscribe(
      (lista: Array<MaestroOpcionDTO>) => {
        console.dir(lista);
        this.comboUnitPeriod = lista.map(e=>{return {id:e.maestroOpcionId.toString(),singular:e.opcion.codigo,plural:e.opcion.codigo +''+ (e.opcion.codigo == 'MES' ?'ES':'S')};});
        this.optionsPeriod   = this.comboUnitPeriod.map(e=>{return {id:e.id,label:e.singular}}); 
      });

      let listaCombos = Array<OrderCatalogDTO>();
      listaCombos.push( new OrderCatalogDTO('typeCompliance', 1, 1));
      listaCombos.push( new OrderCatalogDTO('authority', 1, 1));
      listaCombos.push( new OrderCatalogDTO('typeApplication', 1, 1));
      listaCombos.push( new OrderCatalogDTO('typeDay', 1, 1));
      listaCombos.push( new OrderCatalogDTO('group', 1, 1));
      this.tagService.getlistCatalogoOrdenados(listaCombos).subscribe(
        (catalogs:any) => {
          /*this.resuelveDS(catalogs, this.comboAutoridad, 'authority');
          this.resuelveDS(poRespuesta, this.comboTipoCumplimiento, 'typeCompliance');
          this.resuelveDS(poRespuesta, this.comboTipoAplicacion, 'typeApplication');
          this.resuelveDS(poRespuesta, this.comboTipoDias, 'typeDay');
          this.resuelveDS(poRespuesta, this.comboGrupo, 'group');//*/
          catalogs.forEach(element => {
            if ( element.catalog === 'authority' )
              this.comboAutoridad = element.data.map(e=>{return {id:e.code,label:e.code};});
            else if ( element.catalog === 'typeApplication' )
              this.comboTipoAplicacion = element.data.map(e=>{return {id:e.code,label:e.code};});
            else if ( element.catalog === 'group' )
              this.comboGrupo = element.data.map(e=>{return {id:e.code,label:e.code};});
            
          });
        }
      ).add(() => {
        this.addBlock(2, null);
      });

    }
    
    onFiltersTable(){      
      let isEmptyFilters = true;
      for (const key in this.formFiltersTable.value) {
        const filter = this.formFiltersTable.value[key];
        if(filter !== null && filter !== '' ){
          isEmptyFilters = false
        }
      }
      isEmptyFilters ? this.limpiarFiltros() : this.tableDataFiltered = this.search();
    }
    limpiarFiltros(){
      this.tableDataFiltered = this.tableData.concat([]);
      this.formFiltersTable.reset();
      this.formDeliveryPeriod.reset();
      this.formFilterDate.reset();
      this.formDeliveryPeriodSubmited = false;
    }
    search(){
      const typeSearch = this.formFiltersTypeTable.value.typeFilter.toString() === '1' ? 'AND' : 'OR'; // 1. OR \ 2. AND for search conditions
      let arrayElements: any[] = this.tableData;
      let resultElements: any[] = [];
      let values = this.formFiltersTable.value;
      if (typeSearch === 'OR') {
        resultElements = arrayElements.filter(o =>{
          for (const key in values) {
              const filter = values[key];
              if(filter !== null && filter !== '' && o[key].toLowerCase().startsWith(filter.trim().toLowerCase())){
                return true;
              }
          }
          return false;          
        });
      }else{
        resultElements = arrayElements.filter(o =>{
          let r = true;
          for (const key in values) {
              const filter = values[key];
              if(filter !== null && filter !== '' && !o[key].toLowerCase().startsWith(filter.trim().toLowerCase())){
                r = false;
              }
          }
          return r;          
        });
      }
      return resultElements;
    }
    isnumeric(v){
      if ( isNaN( Number(v)) || 0 === Number(v) ) {
        // para no permitir letras, que en firefox si permite insertarlas
        v = null;
        this.formDeliveryPeriod.controls.n.setValue(null);        
      }
      if ( Number(v) > 1) {
        this.optionsPeriod = this.comboUnitPeriod.map(e=>{return {id:e.id,label:e.plural}}); 
      } else if( Number(v) <= 1) {
        this.optionsPeriod = this.comboUnitPeriod.map(e=>{return {id:e.id,label:e.singular}}); 
      }
      this.onchangePeriod();
    }
    onchangePeriod(){
      this.formDeliveryPeriodSubmited = true;
      let t = (this.formDeliveryPeriod.value.t !== null) ? ' ' +this.optionsPeriod.filter(e=>e.id == this.formDeliveryPeriod.value.t)[0].label : ''; 
      let n = (this.formDeliveryPeriod.value.n !== null) ? this.formDeliveryPeriod.value.n : '';
      let s = n + t;

      if(this.formDeliveryPeriod.value.n == null && this.formDeliveryPeriod.value.t == null ){
        s = null;
        this.formDeliveryPeriodSubmited = false;
        this.formDeliveryPeriod.reset();
      } 
      this.formFiltersTable.controls.periodo_entrega.setValue(s);
    }
    onBlurPeriod(){
      if(this.formDeliveryPeriod.value.n == null && this.formDeliveryPeriod.value.t == null ){
        this.formDeliveryPeriod.reset();
      } 
    }
    onChangeDateUpdate(v){
      let d = this.datePipe.transform(new Date(v),'dd/MM/yyyy');
      this.formFiltersTable.controls.sDateUpdated.setValue(d);
    }

    
    
}
