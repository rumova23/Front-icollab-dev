import { Component, OnInit, ChangeDetectorRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import { Router } from "@angular/router";
import { GlobalService } from 'src/app/core/globals/global.service';
import { Combo } from 'src/app/compliance/models/Combo';
import { OrderCatalogDTO } from 'src/app/compliance/models/OrderCatalogDTO'; 
import { TagService } from 'src/app/compliance/services/tag.service';
import { Tag } from 'src/app/compliance/models/Tag';
import { TagPrecedente } from 'src/app/compliance/models/TagPrecedente';
import { TagActividadDTO } from 'src/app/compliance/models/TagActividadDTO';

import { CatalogType } from 'src/app/compliance/models/CatalogType';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventService } from 'src/app/core/services/event.service';
import { EventBlocked } from 'src/app/core/models/EventBlocked';

@Component({
  selector    : 'app-configActivities'
 ,templateUrl : './configActivities.component.html'
})
export class ConfigActivitiesComponent implements OnInit {
  //Simulación tuxpan
  plantaDefault = this.globalService.plantaDefaultId; // "70"; //"Planta Tuxpan II";

  @Input() accion: string;
  @Input() tagId: string;
  comboActividades: Array<Combo>;
  
  comboTipoCumplimiento: Array<Combo>;
  comboAutoridad: Array<Combo>;
  comboTipoAplicacion: Array<Combo>;
  comboPeriodoEntrega: Array<Combo>;
  comboTipoDias: Array<Combo>;
  //comboPlanta: Array<Combo>;
  comboEstatus: Array<Combo>;
  listaCombos: Array<any>;
  
  cabeceraTagPrecedentes: string[] = ['tagId', 'tagPadre', 'tagHijo', 'tagHijoNombreCumplimiento', 'opcion'];
  columnas: string[] = ['tagId', 'tag', 'descripcion', 'assignPrecedent'];
  titulo: String;

  tagPrecedentes: MatTableDataSource<any>;
  registrosParaAsignar: MatTableDataSource<any>;
  registros_x_pagina = [50, 100, 250, 500];
  registros_x_pagina1 = [50, 100, 250, 500];
  data: any[] = [];

  configActividadesForm: FormGroup;
  //plantas: Array<TagPlanta>


  idsTagPrecedentes;

  existeTagId: boolean;   //Muestra la tabla correspondiente a los precedentes
  tablaAgregarPrecedentes: boolean //Muestra la tabla de los precedentes para poder asignar
  isPrecedentes: boolean;

  habilitarActividad: boolean;
  soloLectura: boolean;
  deshabiliarEstatus: boolean = true;
  idActivo: String;
  catalogType: CatalogType;
  serviceSubscription: any;

  checkedCheckBox = false;
  indeterminateCheckBox = false;
  labelPositionCheckBox = 'after';
  disabledCheckBox = false;
  checkedEstatus = false;
  valueActiveStatus;
  checkedActivoId;
  checkedInactivoId;

  constructor(private cdRef: ChangeDetectorRef,
    private tagService: TagService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public toastr: ToastrManager,
    private router: Router,
    public globalService: GlobalService,
    private eventService: EventService) {

    this.serviceSubscription = this.eventService.onChangePlant.subscribe({
      next: (event: EventMessage) => {
        switch (event.id) {
          case 100:
            this.changePlant();
            //this.onClickPlanta();
            break;
          }
        }
      });
    }

  applyFilter(filterValue: string) {
    this.registrosParaAsignar.filter = filterValue.trim().toLowerCase();
  }


  applyFilter1(filterValue1: string) {
    this.tagPrecedentes.filter = filterValue1.trim().toLowerCase();
  }

  changePlant() {
    this.plantaDefault = this.globalService.plantaDefaultId;
  }

  resuelveDS(poRespuesta: Object, combo: Array<any>, comp: string) {
    if (!poRespuesta) {
      console.log("El back no responde");
    } else {
      let catalogs : any;
      catalogs = poRespuesta;
      catalogs.forEach(element => {
        if ( element.catalog === comp ){
          element.data.forEach ( elementCatalog => {
            let value = elementCatalog.id; 
            let label = elementCatalog.code;
            combo.push(new Combo(value, label));
          })
        }
      });

    }
  }


  entidadEstatus: any;

  @ViewChild(MatPaginator) paginatorRegisters: MatPaginator;
  @ViewChild(MatSort) sortRegisters: MatSort;
  @ViewChild(MatPaginator) paginatorTagPrecedentes: MatPaginator;
  @ViewChild(MatSort) sortTagPrecedentes: MatSort;

  ngOnInit() {

    this.addBlock(1, "Cargando...");

    this.accion = this.catalogType.action;
    this.existeTagId = false;
    this.tablaAgregarPrecedentes = false;
    this.isPrecedentes = false;

    this.habilitarActividad = false;

    this.comboActividades = new Array<Combo>();
    
    this.comboTipoCumplimiento = new Array<Combo>();
    this.comboAutoridad = new Array<Combo>();
    this.comboTipoAplicacion = new Array<Combo>();
    this.comboPeriodoEntrega = new Array<Combo>();
    this.comboTipoDias = new Array<Combo>();
    //this.comboPlanta = new Array<Combo>();
    //this.plantas = new Array<TagPlanta>();
    this.comboEstatus = new Array<Combo>();
    
    let statusConsult: string = null;
    if ( this.accion === 'edit' || 'ver' ){
      statusConsult = 'TODOS'
    }

    this.listaCombos = Array<OrderCatalogDTO>();
    this.listaCombos.push( new OrderCatalogDTO('typeCompliance', 1, 1));
    this.listaCombos.push( new OrderCatalogDTO('authority', 1, 1));
    this.listaCombos.push( new OrderCatalogDTO('typeApplication',1, 1));
    this.listaCombos.push( new OrderCatalogDTO('deliveryPeriod', 1, 1));
    this.listaCombos.push( new OrderCatalogDTO('typeDay', 1, 1));
    //this.listaCombos.push( new OrderCatalogDTO('legalRequirement', 1, 1)); 
    
    //this.addBlock(1, "Cargando...");
     
    this.tagService.getlistCatalogoOrdenados(this.listaCombos).subscribe(
      poRespuesta => {
        this.resuelveDS(poRespuesta, this.comboTipoCumplimiento, 'typeCompliance');
        this.resuelveDS(poRespuesta, this.comboAutoridad, 'authority');
        this.resuelveDS(poRespuesta, this.comboTipoAplicacion, 'typeApplication');
        this.resuelveDS(poRespuesta, this.comboPeriodoEntrega, 'deliveryPeriod');
        this.resuelveDS(poRespuesta, this.comboTipoDias, 'typeDay');
        //this.resuelveDS(poRespuesta, this.comboPlanta, 'legalRequirement');
      }
    ).add(() => {
      this.addBlock(2, null);
    });
    
    //this.addBlock(1, "Cargando...");
    /*
    this.tagService.getEstatusMaestroOpcion().subscribe(
      catalogoResult => {
        console.log(catalogoResult)
        this.entidadEstatus = catalogoResult;
        this.entidadEstatus.forEach(element => {
          if ( element.estatus.nombre === 'Activo' ){
            this.checkedActivoId = element.estatus.estatusId;
          }

          if ( element.estatus.nombre === 'Inactivo' ){
            this.checkedInactivoId = element.estatus.estatusId;
          }
          //this.addBlock(2, null);
        });
      },
      error => {
        console.log("Error al obtener catalgo de estatus.");
        console.log(<any>error)
        //this.addBlock(2, null);
        this.toastr.errorToastr('Error al cargar estatus maestro.', 'Lo siento,');
      }
    ).add(() => {
      this.addBlock(2, null);
    });*/

    this.addBlock(1, "Cargando...");
    let statusConsultActivity = 'ACTIVOS';
    if ( this.accion === 'edit' || this.accion === 'ver' ){
      statusConsultActivity = 'TODOS'
    }else if ( this.accion === 'nuevo'){
      statusConsultActivity = 'ACTIVOS'
    }
    this.tagService.getCatalogoActividades(statusConsultActivity).subscribe(
      catalogoResult => {
        console.log(catalogoResult)
        let actividad: any;
        actividad = catalogoResult;
        actividad.forEach(element => {
          let combo: Combo;
          combo = new Combo(element.idActivity, element.name);
          this.comboActividades.push(combo);
        });
        this.addBlock(2, null);
      },
      error => {
        console.log("Error al obtener catalgo de actividades.");
        console.log(<any>error)
        this.addBlock(2, null);
        this.toastr.errorToastr('Error al cargar catálogo de actividades.', 'Lo siento,');
      }
    ).add(() => {
      this.addBlock(2, null);
    });

    this.configActividadesForm = this.formBuilder.group({
      fIdTag: ['', ''],
      fTag: ['', Validators.required],
      fDescripcion: ['', Validators.required],
      fActividad: ['', Validators.required],
      fClasificacionActividad: ['', Validators.required],
      fTipoCumplimiento: ['', Validators.required],
      fRequisitoLegal: ['', Validators.required],
      fAutoridad: ['', Validators.required],
      fTipoAplicacion: ['', Validators.required],
      fPeriodoEntrega: ['', Validators.required],
      fTipoDias: ['', Validators.required],
      //fPlanta: ['', Validators.required],
      
    });

    
    this.idsTagPrecedentes = [];

    if (this.accion === 'edit') {
      this.deshabiliarEstatus = false;
      this.titulo = "Editar / Configuración de Cumplimiento";
    } else if (this.accion === 'ver') {
      this.deshabiliarEstatus = true;
      this.titulo = "Consultar / Configuración de Cumplimiento";
    } else {
      this.checkedEstatus = true;
      this.deshabiliarEstatus = false;
      this.titulo = "Agregar / Configuración de Cumplimiento";
      this.configActividadesForm.controls['fTag'].disable();
    }

    if (this.accion === 'edit' || this.accion === 'ver') {
      this.obtenerActividadurl();
    }

  }

  get f() { return this.configActividadesForm.controls; }

  submitted = false;
  onSubmit() {

    //this.onClickPlanta();

    this.submitted = true;
    // stop here if form is invalid
    if (this.configActividadesForm.invalid) {
      console.log('Error!! :-)\n\n' + JSON.stringify(this.configActividadesForm.value));

      this.toastr.errorToastr('Todos los campos son obligatorios, verifique.', 'Lo siento,');
      //alert("Todos los campos son obligatorios, verifique");
      return;
    }

    this.guardarConfiguracionActividad();

  }

  chanceCheck(){
    if (this.checkedEstatus)
      this.checkedEstatus = false;
    else{
      this.checkedEstatus = true;
    }
  }

  //Guarda o Actualiza un TAG
  guardarConfiguracionActividad() {

    let tagId = 0; //ID TAG, AUTONUMERICO

    if (this.configActividadesForm.controls['fIdTag'].value > 0) {
      tagId = this.configActividadesForm.controls['fIdTag'].value
    }

    /*
    this.plantas = new Array<TagPlanta>();
    this.configActividadesForm.controls['fPlanta'].value.forEach(element => {
      let planta: TagPlanta
      planta = new TagPlanta(element)
      this.plantas.push(planta)
    });

    let idStatus;
    if (this.checkedEstatus){
      idStatus = this.checkedActivoId;
    }else{
      idStatus = this.checkedInactivoId;
    }
    */

    let listTagPrecedentes = [];
    if (this.tagPrecedentes != null){
      if (this.tagPrecedentes.data != null){
        listTagPrecedentes = new Array<TagPrecedente>();
        this.tagPrecedentes.data.forEach(element => {
          listTagPrecedentes.push(element.elementTag)
        })
      }
    }

    let actividad = new Tag(
      tagId,
      this.configActividadesForm.controls['fTag'].value,
      this.configActividadesForm.controls['fDescripcion'].value,
      this.configActividadesForm.controls['fActividad'].value,
      this.configActividadesForm.controls['fClasificacionActividad'].value,
      this.configActividadesForm.controls['fTipoCumplimiento'].value,
      this.configActividadesForm.controls['fRequisitoLegal'].value,
      this.configActividadesForm.controls['fAutoridad'].value,
      this.configActividadesForm.controls['fTipoAplicacion'].value,
      this.configActividadesForm.controls['fPeriodoEntrega'].value,
      this.configActividadesForm.controls['fTipoDias'].value,
      this.checkedEstatus,
      //this.plantas,
      listTagPrecedentes,
    );

    this.tagService.save(actividad).subscribe(
      respuesta => {
        if ( respuesta.clave == 0){
          this.idsTagPrecedentes = [];
          this.habilitarActividad = true;
          this.configActividadesForm.controls['fIdTag'].setValue(respuesta.entity.idTag);
          this.existeTagId = true;

          this.toastr.successToastr('Configuración de actividad guardada con éxito.', '¡Se ha logrado!');
        }else{
          this.toastr.errorToastr('Ya existe una actividad con los mismos datos capturados.', '¡Lo siento!');
        }
       
      },
      error => {
        console.log(<any>error);
        this.existeTagId = false;
        this.toastr.errorToastr('Error al guardar la configuración de actividad.', 'Lo siento,');
        
      }
    );
  }

  regresar(){
    this.eventService.sendChangePage(new EventMessage(8, {} ,'Compliance.Características'));
  }

  //Obtiene la información de un TAG
  obtenerActividadurl() {
    this.addBlock(1, "Cargando...");
    this.tagId = this.catalogType.id;
    this.tagService.getActividadPorTag(this.tagId).subscribe(
      respuesta => {
        let tagActividad: Tag
        tagActividad = <Tag>respuesta;
        if (tagActividad != null && tagActividad.idTag) {
          this.configActividadesForm.controls['fTag'].setValue(tagActividad.tag);
          this.configActividadesForm.controls['fIdTag'].setValue(tagActividad.idTag);
          this.configActividadesForm.controls['fDescripcion'].setValue(tagActividad.description);
          this.configActividadesForm.controls['fClasificacionActividad'].setValue(tagActividad.classificationActivity);
          this.configActividadesForm.controls['fRequisitoLegal'].setValue(tagActividad.requisitoLegal);
          this.configActividadesForm.controls['fActividad'].patchValue(tagActividad.idActivity);
          this.configActividadesForm.controls['fTipoCumplimiento'].patchValue(tagActividad.idTypeCompliance);
          this.configActividadesForm.controls['fAutoridad'].patchValue(tagActividad.idAuthority);
          this.configActividadesForm.controls['fTipoAplicacion'].patchValue(tagActividad.idApplicationType);
          this.configActividadesForm.controls['fPeriodoEntrega'].patchValue(tagActividad.idDeliveryPeriod);
          this.configActividadesForm.controls['fTipoDias'].patchValue(tagActividad.idDaysType);
          
          this.valueActiveStatus = tagActividad.active;
          this.checkedEstatus = tagActividad.active;
          /*
          if (this.checkedActivoId === tagActividad.entidadEstatusId  ){
            this.checkedEstatus = true;
          }else{
            this.checkedEstatus = false;
          }
          /*
          let arreglo: Array<String>;
          arreglo = new Array<String>();
          tagActividad.plantas.forEach(element => {
            arreglo.push(element.plantaId.toString())
          });
          this.configActividadesForm.controls['fPlanta'].patchValue(arreglo);
          */
          if ( tagActividad.precedents != null ){
            let listObj = [];
            let i = 0;
            let element: TagPrecedente;
            for (element of tagActividad.precedents) {
              i += 1;
              let obj               = {};
              obj['tagId']          = element.idTagPrecedent;
              obj['tagPadre']       = element.tagPadre.tag;
              obj['tagHijo']        = element.tagHijo.tag;
              obj['elementTag']     = element;
              listObj.push(obj);
            }
  
            this.tagPrecedentes = new MatTableDataSource<any>(listObj);
            this.tagPrecedentes.paginator = this.paginatorTagPrecedentes;
            this.tagPrecedentes.sort = this.sortTagPrecedentes;
            this.existeTagId = true; 
          }

          this.idsTagPrecedentes = [];
          
          if (this.accion === 'ver') {
            this.soloLectura = true;
            this.configActividadesForm.controls['fTag'].disable();
            this.configActividadesForm.controls['fDescripcion'].disable();
            this.configActividadesForm.controls['fActividad'].disable();
            this.configActividadesForm.controls['fClasificacionActividad'].disable();
            this.configActividadesForm.controls['fTipoCumplimiento'].disable();
            this.configActividadesForm.controls['fRequisitoLegal'].disable();
            this.configActividadesForm.controls['fAutoridad'].disable();
            this.configActividadesForm.controls['fTipoAplicacion'].disable();
            this.configActividadesForm.controls['fPeriodoEntrega'].disable();
            this.configActividadesForm.controls['fTipoDias'].disable();
            this.habilitarActividad = false;
            this.existeTagId = true;
          } else {
            this.soloLectura = false;
            this.configActividadesForm.controls['fTag'].disable();
            this.configActividadesForm.controls['fActividad'].disable();
            this.configActividadesForm.controls['fAutoridad'].disable();
            this.configActividadesForm.controls['fTipoAplicacion'].disable();
            this.configActividadesForm.controls['fPeriodoEntrega'].disable();
            this.configActividadesForm.controls['fTipoDias'].disable();
            this.configActividadesForm.controls['fTipoCumplimiento'].disable();

            this.configActividadesForm.controls['fDescripcion'].enable();            
            this.configActividadesForm.controls['fClasificacionActividad'].enable();
            this.configActividadesForm.controls['fRequisitoLegal'].enable();
            this.tablaAgregarPrecedentes=false;
            this.existeTagId = true;
            //this.habilitarActividad = false;
            
          }


        } else {
          this.limpiarFormulario();
          this.existeTagId = false;
          this.toastr.infoToastr('No se encontró información del Tag buscado.', 'Lo siento,');
          //alert("No se encontró información del Tag buscado")
        }

        this.addBlock(2, null);
      },
      error => {
        console.log(<any>error);
        this.addBlock(2, null);
        this.toastr.errorToastr('Error al cargar detalles de la actividad.', 'Lo siento,');
      }
    )/*.add(() => {
      this.delay(1000, 2);
      this.delayStatus(500);
    });*/
  }

  //Compara valores del combo para seleccionar la opción correspondiente
  compareFn(combo1: number, combo2: number) {
    console.log(combo1 && combo2 && combo1 === combo2);
    return combo1 && combo2 && combo1 === combo2;
  }

  limpiarFormulario() {
    this.habilitarActividad = false;
    let arreglo: Array<number>;
    arreglo = new Array<number>();

    this.configActividadesForm.reset({
      fIdTag: '', fDescripcion: '',
      //fTag: { value: '' },
      fClasificacionActividad: '',
      fRequisitoLegal: '',
      fActividad: { value: '', disabled: false },
      fTipoCumplimiento: { value: '', disabled: false },
      fAutoridad: { value: '', disabled: false },
      fTipoAplicacion: { value: '', disabled: false },
      fPeriodoEntrega: { value: '', disabled: false },
      fTipoDias: { value: '', disabled: false },
      //fPlanta: { value: arreglo, disabled: false },
      //fCheckStatus: { checked:true }
    });
    
    //this.tagPrecedentes = null;
    this.idsTagPrecedentes = [];
    this.existeTagId = false;
  }

  ordenar(numberTable: number){
    console.log("ORDENAR TABLA NO. " + numberTable)
    if ( numberTable == 1){
      if (this.registrosParaAsignar != null){
        this.registrosParaAsignar.paginator = this.paginatorRegisters;
        this.registrosParaAsignar.sort = this.sortRegisters;
      }
    }else{
      if ( this.tagPrecedentes != null ){
        this.tagPrecedentes.paginator = this.paginatorTagPrecedentes;
        this.tagPrecedentes.sort = this.sortTagPrecedentes;
      }
    }
    this.addBlock(2, null);
  }

  //Muestra las actividades que pueden ser agregadas como precedentes
  mostrarPrecedentes() {
    this.addBlock(1, "Cargando...");
    let tag = this.configActividadesForm.controls['fTag'].value;
    this.tagService.getActividadesPrecedentes(tag).subscribe(
      data => {
        let listObj = [];
        for (let element of data) {
          let obj               = {};
          obj['tagId']          = element.idTag;
          obj['tag']            = ""+element.tag;
          obj['descripcion']    = element.description;
          obj['elementTag']     = element;
          listObj.push(obj);
        }

        this.registrosParaAsignar = new MatTableDataSource<any>(listObj);
        this.registrosParaAsignar.paginator = this.paginatorRegisters;
        this.registrosParaAsignar.sort = this.sortRegisters;

        this.addBlock(2, null);

        if (this.registrosParaAsignar.data.length > 0) {
          this.isPrecedentes = true;
          this.tablaAgregarPrecedentes = true;
          this.idsTagPrecedentes = []
        } else {
          this.tablaAgregarPrecedentes = false;
          this.toastr.errorToastr('No hay actividades que puedan ser asignadas como precedentes.', 'Lo siento,');
        }
      },
      error => {
        console.log(<any>error);
        this.addBlock(2, null);
        this.toastr.errorToastr('Error al cargar lista de precedentes.', 'Lo siento,');
      }
    )/*.add(() => {
      this.delay(1000, 1);
      //this.addBlock(2, null);
    });*/
  }

  //Agrega las actividades precedentes a la actividad actual
  agregarPrecedentes() {
    let tag = this.configActividadesForm.controls['fTag'].value;
    if (this.idsTagPrecedentes.length > 0) {
      this.addBlock(1, "Cargando...");
      this.tagService.agregarPrecedentes(tag, this.idsTagPrecedentes).subscribe(
        respuesta => {
          console.log("======================>" + respuesta);
          console.log(respuesta);

          let listObj = [];
          for (let element of respuesta) {
            let obj               = {};
            obj['tagId']          = element.idTagPrecedent;
            obj['tagPadre']       = element.tagPadre.tag;
            obj['tagHijo']        = element.tagHijo.tag;
            obj['tagHijoNombreCumplimiento']  = element.tagHijo.classificationActivity;
            obj['elementTag']     = element;
            listObj.push(obj);
          }

          this.tagPrecedentes = new MatTableDataSource<any>(listObj);
          this.tagPrecedentes.paginator = this.paginatorTagPrecedentes;
          this.tagPrecedentes.sort = this.sortTagPrecedentes;

          this.isPrecedentes = false;
          this.tablaAgregarPrecedentes = false;
          this.addBlock(2, null);
        
        },
        error => {
          console.log(<any>error);
          this.addBlock(2, null);
          this.toastr.errorToastr('Error al agregar precedentes.', 'Lo siento,');
        }
      )/*.add(() => {
        this.delay(1000, 2);
        //this.addBlock(2, null);
      });*/

    }else{
      this.toastr.errorToastr('Debe seleccionar por lo menos 1 tag a asignar.', 'Lo siento,');
    }

    console.log("agregarPrecedente: tagPrecedentes");
    console.log(this.tagPrecedentes);

  }

  agregarQuitarId(tag: string) {

    if (this.idsTagPrecedentes.indexOf(tag) < 0) {
      this.idsTagPrecedentes.push(tag);
    } else {
      this.idsTagPrecedentes.splice(this.idsTagPrecedentes.indexOf(tag), 1);
    }

    console.log("Agregar/Quitar ID");
    console.log(this.idsTagPrecedentes);

  }

  eliminarPrecedente(tagPrecedente: any) {
    if (!this.soloLectura) {
      this.addBlock(1, "Cargando...");
      this.tagService.eliminarPrecedente(tagPrecedente).subscribe(
        result => {
          console.log(result);

          if (result != null){
            let listObj = [];
            let i = 0;
            for (let element of result) {
              i += 1;
              let obj               = {};
              obj['tagId']          = element.idTagPrecedent;
              obj['tagPadre']       = element.tagPadre.tag;
              obj['tagHijo']        = element.tagHijo.tag;
              obj['elementTag']     = element;
              listObj.push(obj);
            }

            this.tagPrecedentes = new MatTableDataSource<any>(listObj);
            this.tagPrecedentes.paginator = this.paginatorTagPrecedentes;
            this.tagPrecedentes.sort = this.sortTagPrecedentes;
            
          }else{
            this.tagPrecedentes=null;
          }

          this.isPrecedentes = false;
          this.tablaAgregarPrecedentes = false;
          
          this.addBlock(2, null);
        },
        error => {
          console.log(<any>error);
          this.addBlock(2, null);
          this.toastr.errorToastr('Error al eliminar precedente.', 'Lo siento,');
        })/*.add(() => {
          this.delay(1000, 2);
          //this.addBlock(2, null);
        });*/
    }
  }

  

  //Asigna el nombre del tag con base en el catalogo de actividades y un consecutivo
  asignarNombreTag(actividadId: any) {
    this.tagService.getPrefijoConsecutivo(actividadId).subscribe(
      respuesta => {
        let tagActividadDTO: TagActividadDTO;
        tagActividadDTO = <TagActividadDTO>respuesta;
        console.log(tagActividadDTO.siguienteCodigoTag);
        this.configActividadesForm.controls['fTag'].setValue(tagActividadDTO.siguienteCodigoTag);
      },
      error => {
        console.log(" Error al asignar nombre de TAG");
      }
    );

  }

  /*
  onClickPlanta() {

    let plantasSeleccionadas = new Array<String>();
    if (this.configActividadesForm.controls['fPlanta'].value != null && this.configActividadesForm.controls['fPlanta'].value != "") {
      this.configActividadesForm.controls['fPlanta'].value.forEach(element => {
        let planta: TagPlanta
        planta = new TagPlanta(element)
        plantasSeleccionadas.push(planta.plantaId.toString())
      });
    }

    let arreglo: Array<String>;
    arreglo = new Array<String>();
    this.comboPlanta.forEach(element => {
      if (element.value == this.plantaDefault) {
        arreglo.push(element.value.toString())
      }
    });

    plantasSeleccionadas.forEach(element => {
      arreglo.push(element)
    });


    this.configActividadesForm.controls['fPlanta'].patchValue(arreglo);
  }
  */

  //Loadin
  private addBlock(type, msg): void {
    this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
  }

  async delay(ms: number, numberTable: number) {
    await new Promise(
      resolve => 
        setTimeout(()=>
          resolve(), ms)).then(() => {
            this.ordenar(numberTable);
          });
  }
/*
  async delayStatus(ms: number) {
    await new Promise(
      resolve => setTimeout(() => resolve(), ms)).then(() => { this.validStatus(); });
  }

  validStatus(){
    if (this.checkedActivoId === this.valueActiveStatus  ){
      this.checkedEstatus = true;
    }else{
      this.checkedEstatus = false;
    }
    console.log(" Pone check en: " + this.checkedEstatus )
  }
*/
}
