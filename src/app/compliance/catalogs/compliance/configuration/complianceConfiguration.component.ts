import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
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
  registros: MatTableDataSource<Tag>;

  columnas: string[] = ['orden','tag','nombre','clasificacion','cumplimiento_legal','autoridad','tipo_aplicacion','periodo_entrega','estatus','ver','modificar','eliminar'];
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

  constructor(
    private tagService: TagService,
    private formBuilder: FormBuilder,
    public toastr: ToastrManager,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService,
    private globalService: GlobalService,
    private eventService: EventService
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
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
    this.tagService.obtenTagPorFiltros(this.globalService.plantaDefaultId).subscribe(
      respuesta => {
        console.dir( respuesta );
        let datos: any;
        datos = respuesta;
        this.registros =  new MatTableDataSource<Tag>(datos);
        this.registros.paginator = this.paginator;
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
    this.tagService.eliminarTag(tag.tagId).subscribe(
      respuesta => {
        let res: any;
        res = respuesta;
        if ( res.clave == 0 ){
          this.obtenerListaTags();
          this.toastr.successToastr(res.mensaje, 'Success!');
        }else{
          this.toastr.errorToastr(res.mensaje, 'Success!');
        }
      },
      error => {
        console.log(<any> error);
        this.toastr.errorToastr('Error al eliminar el tag.', 'Oops!');
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
