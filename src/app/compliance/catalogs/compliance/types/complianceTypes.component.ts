import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';

import { ActivatedRoute } from '@angular/router';
import { MaestroOpcion } from 'src/app/core/models/maestro-opcion';
import { CatalogoMaestroService } from 'src/app/core/services/catalogo-maestro.service';
import { EstatusMaestroService } from 'src/app/core/services/estatus-maestro.service';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { GlobalService } from 'src/app/core/globals/global.service';
import { EventService } from 'src/app/core/services/event.service';
import { CatalogType } from 'src/app/compliance/models/CatalogType';
import { EventMessage } from 'src/app/core/models/EventMessage';



@Component({
  selector: 'app-complianceTypes',
  templateUrl: './complianceTypes.component.html',
  styleUrls: ['./complianceTypes.component.scss']
})
export class ComplianceTypesComponent implements OnInit {
  dataSource;
  data: any[] = [];
  displayedColumns : any[]    = [];
  columnsToDisplay : string[] = [];

  

  // tslint:disable-next-line:variable-name
  @Input() nombreCatalogo: string;
  entidadEstatusId: string;

  // tslint:disable-next-line:ban-types
  titulo: String;
  registros: MatTableDataSource<MaestroOpcion>;
  columnas: string[] = ['Orden', 'Opcion', 'Descripcion', 'Estatus', 'Ver', 'Modificar','Eliminar' ];
  filtros = [
    {label: 'Tipo de cumplimiento', inputtype: 'text'},
    {label: 'Activo', inputtype: 'text'},
  ];
  filtrobtn = {label: 'buscar'};
  // tslint:disable-next-line:variable-name
  registros_x_pagina = [50, 100, 250, 500];


  constructor(
                private catalogoMaestroService: CatalogoMaestroService,
                private estatusMaestroService: EstatusMaestroService,
                private route: ActivatedRoute, private globalService: GlobalService,
                private confirmationDialogService: ConfirmationDialogService,
                public toastr: ToastrManager,
                private eventService: EventService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    
    this.dataSource = new MatTableDataSource<any>(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    //this.nombreCatalogo = this.route.snapshot.params.nombreCatalogo;
    this.titulo = 'Catálogos / ' + this.nombreCatalogo;
    this.cargaDatos();
    this.estatusMaestroService.getEntidadEstatus( 'CAT_MAESTRO_OPCION', 'Activo').subscribe(data => {
      this.entidadEstatusId = data.entidadEstatusId;
    });
  }

  action(option: number, id: any) {
     let type: CatalogType = {};
     switch(option) {
        case 1:
        type = {id: id, action: 'nuevo',
         name: this.nombreCatalogo}
        break;
        case 2:
        type = {id: id, action: 'ver',
        name: this.nombreCatalogo}
        break;
        case 3:
        type = {id: id, action: 'edit',
         name: this.nombreCatalogo}
        break;
     }
     console.log(type);
     this.eventService.sendMainCompliance(new EventMessage(5, type));
  }
  testing(a){
debugger;
  }
  cargaDatos() {
    this.data = [];
    this.catalogoMaestroService.getCatalogo( this.nombreCatalogo ).subscribe(data => {
      let i = 0;
      for (let element of data) {
        i += 1;
        let obj             = {};
        obj['order']        = i;
        obj['id']           = element.maestroOpcionId;
        obj['name']         = element.opcion.codigo;
        obj['description']  = element.opcion.descripcion;
        obj['status']       = (element.entidadEstatusId == this.entidadEstatusId) ? 'Activo' : 'Inactivo';
        obj['see']          =  'sys_see';
        obj['edit']         =  'sys_edit';
        obj['delete']       =  'sys_delete';
        obj['delete']       =  'sys_delete';
        obj['element']      =  element;
        
        this.data.push(obj);
      }
      this.displayedColumns = [
        {key:'order',label:'#'},
        {key:'id',label:'ID'},
        {key:'name',label:'Nombre'},
        {key:'description',label:'Descripción'},
        {key:'status',label:'Estatus'},
        {key:'see',label:'Ver'},
        {key:'edit',label:'Editar'},
        {key:'delete',label:'Eliminar'}
      ];
      this.columnsToDisplay= ['order','name','description','status','see','edit','delete'];
      
      this.dataSource = new MatTableDataSource<any>(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.registros =  new MatTableDataSource<MaestroOpcion>(data);
      this.registros.paginator = this.paginator;
      this.registros.sort = this.sort;
      //debugger;
    });
  }

  /*cargaDatos() {
    this.catalogoMaestroService.getCatalogo( this.nombreCatalogo ).subscribe(data => {
      this.registros =  new MatTableDataSource<MaestroOpcion>(data);
      this.registros.paginator = this.paginator;
      this.registros.sort = this.sort;
    });
  }*/

  eliminarRegistro(maestroOpcion: any) {
      this.confirmationDialogService.confirm('Por favor, confirme..',
          'Está seguro de eliminar el registro? ')
          .then((confirmed) => {
            if (confirmed) {
              this.catalogoMaestroService.borrarEstatus(
                  maestroOpcion.maestroOpcionId
              ).subscribe(data => {
                this.cargaDatos();
                this.toastr.successToastr('El registro fue correctamente eliminado', 'Success!');
              });
            }
          })
          .catch(() => console.log('Cancelo'));
  }
}
