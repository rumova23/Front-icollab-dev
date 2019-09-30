import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
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

@Component({
  selector: 'app-complianceConfiguration',
  templateUrl: './complianceConfiguration.component.html',
  styleUrls: ['./complianceConfiguration.component.scss']
  , providers: [DatePipe]
})
export class ComplianceConfigurationComponent implements OnInit {
  titulo: String = 'Características';
  registros;
  data: any[] = [];
  userResult;

  columnas: string[] = ['order', 'tag', 'nombre', 'clasificacion', 'cumplimiento_legal', 'autoridad', 'tipo_aplicacion', 'userUpdated', 'dateUpdated', 'estatus', 'ver', 'modificar', 'eliminar'];
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
    private eventService: EventService
   , private datePipe: DatePipe) {

    this.serviceSubscription = this.eventService.onChangePlant.subscribe({
      next: (event: EventMessage) => {
        switch (event.id) {
          case 100:
            this.obtenerListaTags();
            break;
        }
      }
    });

   }
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {

    this.addBlock(1, 'Cargando...');

    this.filtrosForm = this.formBuilder.group({
      fTag: ['', ''],
      fNombre: ['', '']
    });

    /*
    this.securityService.loadUsers().subscribe( userResult => {
      this.addBlock(2, null);
      this.userResult = userResult;
    */
    this.obtenerListaTags();
    /*
    },
    error =>{
      this.addBlock(2, null);
      this.toastr.errorToastr('Error al cargar lista de usuarios.', 'Lo siento,');
    });
    */

  }

  get f() { return this.filtrosForm.controls; }

  obtenerListaTags() {
    this.addBlock(1, 'Cargando...');
    this.data = [];
    this.tagService.obtenTagPorFiltros(this.globalService.plantaDefaultId).subscribe( data => {

        const listObj = [];
        let i = 0;
        let userDetail;
        for (const element of data) {
          i += 1;
          const obj                   = {};
          obj['order']              = i;
          obj['tag']                = element.tag;
          obj['nombre']             = element.classificationActivity;
          if (element.activity) {
            obj['clasificacion']      = element.activity.name;
          }
          obj['cumplimiento_legal'] = element.typeCompliance.code;

          if (element.authority != null) {
            obj['autoridad']          = element.authority.code;
          }
          obj['tipo_aplicacion']    = element.applicationType.code;
          obj['periodo_entrega']    = element.deliveryPeriod.code;
          // obj['estatus']            = element['']estatusGenerico;
          obj['estatus']            = (element.active) ? 'Activo' : 'Inactivo';

          obj['userUpdated'] = element.userUpdated == undefined ? element.userCreated : element.userUpdated;
          const dateUpdated = element.dateUpdated == undefined ? element.dateCreated : element.dateUpdated;

          obj['dateUpdated'] = '.';
          if (dateUpdated) {
            obj['dateUpdated'] = dateUpdated; // this.datePipe.transform(new Date(dateUpdated) ,'dd-MM-yyyy HH:mm')
          }


          obj['see']                = 'sys_see';
          obj['edit']               = 'sys_edit';
          obj['delete']             = 'sys_delete';
          obj['element']            = element;
          listObj.push(obj);
        }

        this.registros =  new MatTableDataSource<any>(listObj);
        this.registros.paginator = this.paginator;
        this.registros.sort = this.sort;

        this.addBlock(2, null);
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
        if (confirmed) {
          this.eliminarTagConfirm(tag);
        }
      })
    .catch(() => console.log('Cancelo'));
  }

  eliminarTagConfirm(tag: any) {
    this.tagService.eliminarTag(tag.element.idTag).subscribe(
      respuesta => {
        this.addBlock(2, null);
        let res: any;
        res = respuesta;
        if ( res.clave == 0 ) {
          this.obtenerListaTags();
          this.toastr.successToastr(res.mensaje, '¡Se ha logrado!');
        } else {
          this.toastr.errorToastr(res.mensaje, 'Lo siento,');
        }
      },
      error => {
        this.addBlock(2, null);
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
    this.eventService.sendMainCompliance(new EventMessage(9, type));
 }

  // Loadin
  private addBlock(type, msg): void {
    this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
  }

}
