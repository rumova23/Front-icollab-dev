import { Component, OnInit, ChangeDetectorRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { Router } from "@angular/router";
import { GlobalService } from 'src/app/core/globals/global.service';
import { Combo } from 'src/app/compliance/models/Combo';
import { TagPlanta } from 'src/app/compliance/models/TagPlanta';
import { OrderCatalogDTO } from 'src/app/compliance/models/OrderCatalogDTO';
import { TagService } from 'src/app/compliance/services/tag.service';
import { Tag } from 'src/app/compliance/models/Tag';
import { TagPrecedente } from 'src/app/compliance/models/TagPrecedente';
import { TagActividadDTO } from 'src/app/compliance/models/TagActividadDTO';
import { CatalogType } from 'src/app/compliance/models/CatalogType';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventService } from 'src/app/core/services/event.service';


@Component({
  selector: 'app-configActivities',
  templateUrl: './configActivities.component.html',
  styleUrls: ['./configActivities.component.scss']
})
export class ConfigActivitiesComponent implements OnInit {
  //Simulación tuxpan
  plantaDefault = this.globalService.plantaDefaultId; // "70"; //"Planta Tuxpan II";

  @Input() accion: string;
  @Input() tagId: string;
  comboActividades: Array<Combo>;
  comboClasificacionActividades: Array<Combo>;
  comboTipoCumplimiento: Array<Combo>;
  comboAutoridad: Array<Combo>;
  comboTipoAplicacion: Array<Combo>;
  comboPeriodoEntrega: Array<Combo>;
  comboTipoDias: Array<Combo>;
  comboPlanta: Array<Combo>;
  comboEstatus: Array<Combo>;
  listaCombos: Array<any>;
  //cabeceraTagPrecedentesAux: Array<String>;
  cabeceraTagPrecedentesAux = ['ID_ACTIVIDAD', 'ACTIVIDAD', 'DESCRIPCION', 'ASIGNAR_PRECEDENTE'];
  cabeceraTagPrecedentes: Array<String>;
  titulo: String;

  tagPrecedentes: any
  tagPrecedentesParaAsiganar: MatTableDataSource<Tag>;
  registros_x_pagina = [50, 100, 250, 500];

  configActividadesForm: FormGroup;
  plantas: Array<TagPlanta>


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

  constructor(private cdRef: ChangeDetectorRef,
    private tagService: TagService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public toastr: ToastrManager,
    private router: Router,
    private globalService: GlobalService,
    private eventService: EventService) { 
    this.serviceSubscription = this.eventService.onChangePlant.subscribe({
      next: (event: EventMessage) => {
        switch (event.id) {
          case 100:
            this.changePlant();
            this.onClickPlanta();
            break;
        }
      }
    });
    }

  changePlant() {
    this.plantaDefault = this.globalService.plantaDefaultId;
  }

  resuelveDS(poRespuesta: Object, data: Array<any>, comp: string) {
    if (!poRespuesta) {
      console.log("El back no responde");
    } else {
      let estatus = poRespuesta['status'];
      if (estatus === 'exito') {
        if (poRespuesta[comp] != null) {
          Object.keys(poRespuesta[comp]).forEach(key => {
            let value = [poRespuesta[comp][key].value];
            let label = [poRespuesta[comp][key].label];
            data.push(new Combo(value[0], label[0]));
          });
          console.log(data);
        }
      } else {
        console.log('El sistema indica diferente a exito para: ' + comp);
      }
    }
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
   //this.accion = this.route.snapshot.params.accion;
   this.accion = this.catalogType.action;


    this.existeTagId = false;
    this.tablaAgregarPrecedentes = false;
    this.isPrecedentes = false;

    this.habilitarActividad = false;

    this.comboActividades = new Array<Combo>();
    this.comboClasificacionActividades = new Array<Combo>();
    this.comboTipoCumplimiento = new Array<Combo>();
    this.comboAutoridad = new Array<Combo>();
    this.comboTipoAplicacion = new Array<Combo>();
    this.comboPeriodoEntrega = new Array<Combo>();
    this.comboTipoDias = new Array<Combo>();
    this.comboPlanta = new Array<Combo>();
    this.plantas = new Array<TagPlanta>();
    this.comboEstatus = new Array<Combo>();

    this.listaCombos = Array<OrderCatalogDTO>();
    this.listaCombos.push( new OrderCatalogDTO('TIPO_CUMPLIMIENTO','ORDEN'));
    this.listaCombos.push( new OrderCatalogDTO('AUTORIDAD', null));
    this.listaCombos.push( new OrderCatalogDTO('TIPO_APLICACION','ORDEN'));
    this.listaCombos.push( new OrderCatalogDTO('PERIODO_ENTREGA','ORDEN'));
    this.listaCombos.push( new OrderCatalogDTO('TIPO_DIAS', null));
    this.listaCombos.push( new OrderCatalogDTO('PLANTA', null));
    
    this.tagService.getlistCatalogoOrdenados(this.listaCombos).subscribe(
      poRespuesta => {
        this.resuelveDS(poRespuesta, this.comboTipoCumplimiento, 'TIPO_CUMPLIMIENTO');
        this.resuelveDS(poRespuesta, this.comboAutoridad, 'AUTORIDAD');
        this.resuelveDS(poRespuesta, this.comboTipoAplicacion, 'TIPO_APLICACION');
        this.resuelveDS(poRespuesta, this.comboPeriodoEntrega, 'PERIODO_ENTREGA');
        this.resuelveDS(poRespuesta, this.comboTipoDias, 'TIPO_DIAS');
        this.resuelveDS(poRespuesta, this.comboPlanta, 'PLANTA');
      }
    );

    this.tagService.getEstatusMaestroOpcion().subscribe(
      catalogoResult => {
        console.log(catalogoResult)
        let entidadEstatus: any;
        entidadEstatus = catalogoResult;
        entidadEstatus.forEach(element => {
          let combo: Combo;
          combo = new Combo(element.estatus.estatusId.toString(), element.estatus.nombre);
          this.comboEstatus.push(combo);
          if (element.estatus.nombre == "Activo" && this.accion == null) {
            this.configActividadesForm.controls['fComboEstatus'].patchValue(`${element.estatus.estatusId.toString()}`);
          }
        });
      },
      error => {
        console.log("Error al obtener catalgo de estatus.");
        console.log(<any>error)
      }
    );

    this.tagService.getCatalogoActividades().subscribe(
      catalogoResult => {
        console.log(catalogoResult)
        let actividad: any;
        actividad = catalogoResult;
        actividad.forEach(element => {
          let combo: Combo;
          combo = new Combo(element.actividadId, element.nombre);
          this.comboActividades.push(combo);
        });
      },
      error => {
        console.log("Error al obtener catalgo de actividades.");
        console.log(<any>error)
      }

    )


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
      fPlanta: ['', Validators.required],
      fComboEstatus: ['', Validators.required]
    });

    //this.cabeceraTagPrecedentesAux = ['ID ACTIVIDAD', 'ACTIVIDAD', 'DESCRIPCIÓN', 'ASIGNAR PRECEDENTE'];
    this.cabeceraTagPrecedentes = ['ACTIVIDAD', 'ACTIVIDAD PADRE', 'ACTIVIDAD HIJO', 'OPCIONES'];
    this.idsTagPrecedentes = [];

    if (this.accion === 'edit') {
      this.deshabiliarEstatus = false;
      this.titulo = "Editar / Configuración de Cumplimiento";
    } else if (this.accion === 'ver') {
      this.deshabiliarEstatus = true;
      this.titulo = "Consultar / Configuración de Cumplimiento";
    } else {
      this.deshabiliarEstatus = false;
      this.titulo = "Agregar / Configuración de Cumplimiento";
    }

    if (this.accion === 'edit' || this.accion === 'ver') {
      this.obtenerActividadurl();
    }

  }

  get f() { return this.configActividadesForm.controls; }

  submitted = false;
  onSubmit() {

    this.onClickPlanta();

    this.submitted = true;
    // stop here if form is invalid
    if (this.configActividadesForm.invalid) {
      console.log('Error!! :-)\n\n' + JSON.stringify(this.configActividadesForm.value));

      this.toastr.errorToastr('Todos los campos son obligatorios, verifique.', 'Oops!');
      //alert("Todos los campos son obligatorios, verifique");
      return;
    }

    this.guardarConfiguracionActividad();

  }

  //Guarda o Actualiza un TAG
  guardarConfiguracionActividad() {

    let tagId = 0; //ID TAG, AUTONUMERICO

    if (this.configActividadesForm.controls['fIdTag'].value > 0) {
      tagId = this.configActividadesForm.controls['fIdTag'].value
    }

    this.plantas = new Array<TagPlanta>();
    this.configActividadesForm.controls['fPlanta'].value.forEach(element => {
      let planta: TagPlanta
      planta = new TagPlanta(element)
      this.plantas.push(planta)
    });

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
      this.configActividadesForm.controls['fComboEstatus'].value,
      this.plantas,
      this.tagPrecedentes,
    );

    this.tagService.save(actividad).subscribe(
      respuesta => {
        this.idsTagPrecedentes = [];
        this.habilitarActividad = true;
        this.configActividadesForm.controls['fIdTag'].setValue(respuesta['tagId']);
        this.existeTagId = true;

        this.toastr.successToastr('Configuración de actividad guardada con éxito.', 'Success!');
       
      },
      error => {
        console.log(<any>error);
        this.existeTagId = false;
        this.toastr.errorToastr('Error al guardar la configuración de actividad.', 'Oops!');
        
      }
    );
  }

  regresar(){
    this.eventService.sendMainCompliance(new EventMessage(8, {}));
  }

  //Obtiene la información de un TAG
  obtenerActividad(tagId) {
    //console.log("Saliste");

    this.tagService.getActividadPorTag(tagId).subscribe(
      respuesta => {
        let tagActividad: Tag
        tagActividad = <Tag>respuesta;
        if (tagActividad != null && tagActividad.tagId) {
          this.configActividadesForm.controls['fIdTag'].setValue(tagActividad.tagId);
          this.configActividadesForm.controls['fDescripcion'].setValue(tagActividad.descripcion);
          this.configActividadesForm.controls['fClasificacionActividad'].setValue(tagActividad.clasificacionActividad);
          this.configActividadesForm.controls['fRequisitoLegal'].setValue(tagActividad.requisitoLegal);
          this.configActividadesForm.controls['fActividad'].patchValue(tagActividad.actividadId);
          this.configActividadesForm.controls['fTipoCumplimiento'].patchValue(`${tagActividad.tipoCumplimientoId}`);
          this.configActividadesForm.controls['fAutoridad'].patchValue(`${tagActividad.autoridadId}`);
          this.configActividadesForm.controls['fTipoAplicacion'].patchValue(`${tagActividad.tipoAplicacionId}`);
          this.configActividadesForm.controls['fPeriodoEntrega'].patchValue(`${tagActividad.periodoEntregaId}`);
          this.configActividadesForm.controls['fTipoDias'].patchValue(`${tagActividad.tipoDiasId}`);
          this.configActividadesForm.controls['fComboEstatus'].patchValue(`${tagActividad.entidadEstatusId}`);

          let arreglo: Array<String>;
          arreglo = new Array<String>();
          tagActividad.plantas.forEach(element => {
            arreglo.push(element.plantaId.toString())
          });

          this.configActividadesForm.controls['fPlanta'].patchValue(arreglo);

          this.tagPrecedentes = tagActividad.precedentes;
          this.idsTagPrecedentes = [];
          this.habilitarActividad = true;
          this.existeTagId = true;
        } else {
          this.limpiarFormulario();
          this.existeTagId = false;
          this.toastr.infoToastr('No se encontró información del Tag buscado.', 'Info');
          //alert("No se encontró información del Tag buscado")
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  //Obtiene la información de un TAG
  obtenerActividadurl() {
    //this.tagId = this.route.snapshot.params.tagId;
    this.tagId = this.catalogType.id;
    this.tagService.getActividadPorTag(this.tagId).subscribe(
      respuesta => {
        let tagActividad: Tag
        tagActividad = <Tag>respuesta;
        if (tagActividad != null && tagActividad.tagId) {
          this.configActividadesForm.controls['fTag'].setValue(tagActividad.tag);
          this.configActividadesForm.controls['fIdTag'].setValue(tagActividad.tagId);
          this.configActividadesForm.controls['fDescripcion'].setValue(tagActividad.descripcion);
          this.configActividadesForm.controls['fClasificacionActividad'].setValue(tagActividad.clasificacionActividad);
          this.configActividadesForm.controls['fRequisitoLegal'].setValue(tagActividad.requisitoLegal);
          this.configActividadesForm.controls['fActividad'].patchValue(tagActividad.actividadId);
          this.configActividadesForm.controls['fTipoCumplimiento'].patchValue(`${tagActividad.tipoCumplimientoId}`);
          this.configActividadesForm.controls['fAutoridad'].patchValue(`${tagActividad.autoridadId}`);
          this.configActividadesForm.controls['fTipoAplicacion'].patchValue(`${tagActividad.tipoAplicacionId}`);
          this.configActividadesForm.controls['fPeriodoEntrega'].patchValue(`${tagActividad.periodoEntregaId}`);
          this.configActividadesForm.controls['fTipoDias'].patchValue(`${tagActividad.tipoDiasId}`);
          this.configActividadesForm.controls['fComboEstatus'].patchValue(`${tagActividad.entidadEstatusId}`);

          let arreglo: Array<String>;
          arreglo = new Array<String>();
          tagActividad.plantas.forEach(element => {
            arreglo.push(element.plantaId.toString())
          });

          this.configActividadesForm.controls['fPlanta'].patchValue(arreglo);

          this.tagPrecedentes = tagActividad.precedentes;
          this.idsTagPrecedentes = [];
          this.habilitarActividad = true;
          this.existeTagId = true;

          if (this.accion === 'ver') {
            this.soloLectura = true;
          } else {
            this.soloLectura = false;
          }


        } else {
          this.limpiarFormulario();
          this.existeTagId = false;
          this.toastr.infoToastr('No se encontró información del Tag buscado.', 'Info');
          //alert("No se encontró información del Tag buscado")
        }
      },
      error => {
        console.log(<any>error);
      }
    );
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
    arreglo.push(62);
    arreglo.push(63);

    this.configActividadesForm.reset({
      fIdTag: '', fDescripcion: '',
      fClasificacionActividad: '',
      fRequisitoLegal: '',
      fActividad: { value: '', disabled: false },
      fTipoCumplimiento: { value: '', disabled: false },
      fAutoridad: { value: '', disabled: false },
      fTipoAplicacion: { value: '', disabled: false },
      fPeriodoEntrega: { value: '', disabled: false },
      fTipoDias: { value: '', disabled: false },
      fPlanta: { value: arreglo, disabled: false }
    });
    this.tagPrecedentes = null;
    this.idsTagPrecedentes = [];
    this.existeTagId = false;
  }

  //Muestra las actividades que pueden ser agregadas como precedentes
  mostrarPrecedentes() {
    let tag = this.configActividadesForm.controls['fTag'].value;
    let tags: string[] = new Array<string>();
    tags.push(tag);

    if (this.tagPrecedentes == null) {
      this.tagPrecedentes = []
    }

    this.tagPrecedentes.forEach(tagPrecedente => {
      tags.push(tagPrecedente.tagHijo.tag);
    });

    this.tagService.getActividadesPrecedentes(tag, tags).subscribe(
      respuesta => {
        //console.dir( respuesta  );
        let datos: any;
        datos = respuesta;
        this.tagPrecedentesParaAsiganar = new MatTableDataSource<Tag>(datos);
        this.tagPrecedentesParaAsiganar.paginator = this.paginator;
        if (this.tagPrecedentesParaAsiganar.data.length > 0) {
          this.isPrecedentes = true;
          this.tablaAgregarPrecedentes = true;
          this.idsTagPrecedentes = []
        } else {
          this.tablaAgregarPrecedentes = false;
          this.toastr.errorToastr('No hay actividades que puedan ser asignadas como precedentes.', 'Oops!');
          //alert("No hay actividades que puedan ser asignadas como precedentes");
        }
      },
      error => {
        console.log(<any>error);
      }
    );

    console.log("moststrarPrecedentes tagPrecedentesParaAsiganar");
    console.log(this.tagPrecedentesParaAsiganar);

  }

  //Agrega las actividades precedentes a la actividad actual
  agregarPrecedentes() {
    let tag = this.configActividadesForm.controls['fTag'].value;
    if (this.idsTagPrecedentes.length > 0) {

      this.tagService.agregarPrecedentes(tag, this.idsTagPrecedentes).subscribe(
        respuesta => {
          this.tagPrecedentes = respuesta;
          this.isPrecedentes = true;
          this.tablaAgregarPrecedentes = false;
        },
        error => {
          console.log(<any>error);
        }
      );

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

  eliminarPrecedente(tagPrecedente: TagPrecedente) {
    if (!this.soloLectura) {
      this.tagService.eliminarPrecedente(tagPrecedente).subscribe(
        result => {
          console.log(result);
          this.tagPrecedentes = result;
          this.isPrecedentes = false;
          this.tablaAgregarPrecedentes = false;
        },
        error => {
          console.log(<any>error);
        });
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

}
