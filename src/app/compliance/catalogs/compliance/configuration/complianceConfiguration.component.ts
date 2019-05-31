import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrManager } from 'ng6-toastr-notifications';
import { GlobalService } from 'src/app/core/globals/global.service';
import { Tag } from 'src/app/compliance/models/Tag';
import { TagService } from 'src/app/compliance/services/tag.service';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { CatalogType } from 'src/app/compliance/models/CatalogType';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventService } from 'src/app/core/services/event.service';


@Component({
  selector: 'app-complianceConfiguration',
  templateUrl: './complianceConfiguration.component.html',
  styleUrls: ['./complianceConfiguration.component.scss']
})
export class ComplianceConfigurationComponent implements OnInit {
  titulo: String = "Configuración de cumplimientos";
  registros;
  data: any[] = [];

  columnas: string[] = ['order','tag','nombre','clasificacion','cumplimiento_legal','autoridad','tipo_aplicacion','userUpdated','dateUpdated','estatus','ver','modificar','eliminar'];
  filtros = [
    {label:"TAG",inputtype:"text"},
    {label:"Nombre",inputtype:"text"},
    {label:"Clasificación",inputtype:"select"},
    {label:"Cumplimiento Legal",inputtype:"text"},
    {label:"Autoridad",inputtype:"text"},
    {label:"Tipo de Aplicación",inputtype:"text"},
    {label:"Periodo de Entrega",inputtype:"text"},
    {label:"Estatus",inputtype:"text"},
  ];
  filtrobtn = {label:"buscar"};
  registros_x_pagina = [50,100,250,500];

  filtrosForm: FormGroup;

  serviceSubscription: any;

  constructor(
    private tagService: TagService,
    private formBuilder: FormBuilder,
    public toastr: ToastrManager,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService,
    private globalService: GlobalService,
    private eventService: EventService
  ) {
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
    this.filtrosForm = this.formBuilder.group({
      fTag: ['', ''],
      fNombre: ['', '']
    })
    this.obtenerListaTags();
  }

  get f() { return this.filtrosForm.controls; }

  obtenerListaTags() {
    console.log( 'la planta id: ' + this.globalService.plantaDefaultId)
    this.data = [];
    this.tagService.obtenTagPorFiltros(this.globalService.plantaDefaultId).subscribe( data => {
        console.dir( data );
        let listObj = [];
        let i = 0;
        debugger;
        for (let element of data) {
          i += 1;
          let obj                   = {};
          obj['order']              = i;
          obj['tag']                = element.tag;
          obj['nombre']             = element.descripcion;
          obj['clasificacion']      = element.actividad.nombre;
          obj['cumplimiento_legal'] = element.tipoCumplimiento.opcion.descripcion;
          obj['autoridad']          = element.autoridad.opcion.codigo;
          obj['tipo_aplicacion']    = element.tipoAplicacion.opcion.descripcion;
          obj['periodo_entrega']    = element.periodoEntrega.opcion.descripcion;
          obj['estatus']            = element.estatus.estatus.nombre;
          obj['userUpdated']        = element.userUpdated;
          obj['dateUpdated']        = element.dateUpdated;
          obj['see']                = 'sys_see';
          obj['edit']               = 'sys_edit';
          obj['delete']             = 'sys_delete';
          obj['element']            = element;
          listObj.push(obj);
        }

        this.registros =  new MatTableDataSource<any>(listObj);
        this.registros.paginator = this.paginator;
        this.registros.sort = this.sort;
      },
      error => {
        console.log(<any> error);
      }
    );
  }

  public eliminarTag(tag: any) {
    this.confirmationDialogService.confirm('Por favor, confirme..',
          'Está seguro de eliminar el Cumplimiento? ' + tag.tag)
    .then((confirmed) => {
        if (confirmed){
          this.eliminarTagConfirm(tag);
        }
      })
    .catch(() => console.log('Cancelo'));
  }
  eliminarTagConfirm(tag: any){
    console.log(tag);
    this.tagService.eliminarTag(tag.element.tagId).subscribe(
      respuesta => {
        let res: any;
        res = respuesta;
        if ( res.clave == 0 ){
          this.obtenerListaTags();
          this.toastr.successToastr(res.mensaje, '¡Se ha logrado!');
        }else{
          this.toastr.errorToastr(res.mensaje, 'Success!');
        }
      },
      error => {
        console.log(<any> error);
        this.toastr.errorToastr('Error al eliminar el tag.', 'Lo siento,');
      }
    )
    
  }

  action(option: number, id: any) {
    let type: CatalogType = {};
    switch(option) {
       case 1:
       type = {id: id, action: 'nuevo',
        name: null}
       break;
       case 2:
       type = {id: id, action: 'ver',
       name: null}
       break;
       case 3:
       type = {id: id, action: 'edit',
        name: null}
       break;
    }
    console.log(type);
    this.eventService.sendMainCompliance(new EventMessage(9, type));
 }

}
