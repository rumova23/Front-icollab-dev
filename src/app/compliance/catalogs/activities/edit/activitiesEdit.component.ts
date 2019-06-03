import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from "@angular/router";
import { Combo } from 'src/app/compliance/models/Combo';
import { GlobalService } from 'src/app/core/globals/global.service';
import { TagActividadDTO } from 'src/app/compliance/models/TagActividadDTO';
import { TagActividadInDTO } from 'src/app/compliance/models/TagActividadInDTO';
import { GenerigResponseDTO } from 'src/app/compliance/models/GenerigResponseDTO';
import { TagService } from 'src/app/compliance/services/tag.service';
import { CatalogType } from 'src/app/compliance/models/CatalogType';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';

@Component({
  selector: 'app-activitiesEdit',
  templateUrl: './activitiesEdit.component.html',
  styleUrls: ['./activitiesEdit.component.scss']
})
export class ActivitiesEditComponent implements OnInit {

  @Input() accion: string;
  @Input() actividadId: number;

  actividadesForm: FormGroup;
  soloLectura: boolean;
  isChecked: boolean;
  deshabiliarEstatus: boolean = true;
  idEstatusActivo;
  titulo: String;
  catalogType: CatalogType;
  tareaPorVencer = 40 ;
  tareaProximaVencer = 30 ;
  tareaTiempo = 30;
  checkedEstatus = false;
  checkedActivoId;
  checkedInactivoId;

  constructor(
    private route: ActivatedRoute,
    private tagService: TagService,
    private formBuilder: FormBuilder,
    public toastr: ToastrManager,
    private router: Router,
    private globalService: GlobalService,
    private eventService: EventService
  ) { }

  get f() { return this.actividadesForm.controls; }

  ngOnInit() {

    this.actividadesForm = this.formBuilder.group({
      fActividadId: ['', ''],
      fActividad: ['', Validators.required],
      fPrefijo: ['', Validators.required],
      fTareaPorVencer: ['40', [Validators.min(1), Validators.max(100)] ],
      fTareaProximaVencer: ['30', [Validators.min(1), Validators.max(100)] ],
      fTareaTiempo: ['30', [Validators.min(1), Validators.max(100)] ]
    });

    //this.accion = this.route.snapshot.params.accion;
    this.accion = this.catalogType.action;

    this.tagService.getEstatusMaestroOpcion().subscribe(
      catalogoResult => {
        console.log(catalogoResult)
        let entidadEstatus: any;
        entidadEstatus = catalogoResult;
        entidadEstatus.forEach(element => {

          if ( element.estatus.nombre === 'Activo' ){
            this.checkedActivoId = element.estatus.estatusId;
          }

          if ( element.estatus.nombre === 'Inactivo' ){
            this.checkedInactivoId = element.estatus.estatusId;
          }
        });
      },
      error => {
        console.log("Error al obtener catalgo de estatus.");
        console.log(<any>error)
      }
    );



    if (this.accion === 'editar') {
      this.deshabiliarEstatus = false;
      this.titulo = "Editar / Catálogo de Categorías";
    } else if (this.accion === 'ver') {
      this.deshabiliarEstatus = true;
      this.titulo = "Consultar / Catálogo de Categorías";
    } else {
      this.checkedEstatus = true;
      this.deshabiliarEstatus = false;
      this.titulo = "Agregar / Catálogo de Categorías";
    }

    if (this.accion === 'editar' || this.accion === 'ver') {
      this.obtenerDatosActividad();
    }


  }

  obtenerDatosActividad() {
    //this.actividadId = this.route.snapshot.params.actividadId;
    this.actividadId = this.catalogType.id;
    console.log("Accion: " + this.accion);
    if (this.actividadId > 0) {
      this.tagService.getActividad(this.actividadId).subscribe(
        respuesta => {
          console.log(respuesta)
          let tagActividad: TagActividadDTO
          tagActividad = <TagActividadDTO>respuesta;
          if (tagActividad != null && tagActividad.actividadId) {
            this.actividadesForm.controls['fActividadId'].setValue(tagActividad.actividadId);
            this.actividadesForm.controls['fActividad'].setValue(tagActividad.nombre);
            this.actividadesForm.controls['fPrefijo'].setValue(tagActividad.prefijo);
            this.actividadesForm.controls['fTareaPorVencer'].setValue(tagActividad.tareaPorVencer);
            this.actividadesForm.controls['fTareaProximaVencer'].setValue(tagActividad.tareaProximaVencer);
            this.actividadesForm.controls['fTareaTiempo'].setValue(tagActividad.tareaTiempo);

            if (this.checkedActivoId === tagActividad.estatus.estatus.estatusId  ){
              this.checkedEstatus = true;
            }else{
              this.checkedEstatus = false;
            }
            
            if (this.accion === 'ver') {
              this.soloLectura = true;
              this.actividadesForm.controls['fPrefijo'].disable();
              this.actividadesForm.controls['fActividad'].disable();
            } else {
              this.actividadesForm.controls['fPrefijo'].enable();
              this.actividadesForm.controls['fActividad'].enable();
              this.soloLectura = false;
            }

          } else {
            this.toastr.infoToastr('No se encontró información del Tag buscado.', 'Lo siento,');
          }

        },
        error => {
          console.log("Error al obtener catalgo de actividades.");
          console.log(<any>error)
        }
      )
    }
  }


  submitted = false;
  onSubmit() {
    this.submitted = true;
/*
    if ( (this.actividadesForm.controls['fTareaPorVencer'].value 
          + this.actividadesForm.controls['fTareaProximaVencer'].value 
          + this.actividadesForm.controls['fTareaTiempo'].value) != 100 ){
            this.toastr.errorToastr('La suma de todos los porcentajes, debe ser igual a 100.', 'Lo siento,');
            return;
          }
*/
    if (this.actividadesForm.invalid) {
      this.toastr.errorToastr('Todos los campos son obligatorios, verifique.', 'Lo siento,');
      return;
    }

    if (this.actividadesForm.controls['fActividadId'].value == 0) {
      this.crearActividad();
    } else {
      this.actualizarActividad();
    }

  }



  crearActividad() {

    let idStatus;
    if (this.checkedEstatus){
      idStatus = this.checkedActivoId;
    }else{
      idStatus = this.checkedInactivoId;
    }

    let actividad = new TagActividadInDTO(0,
      this.actividadesForm.controls['fActividad'].value,
      this.actividadesForm.controls['fPrefijo'].value,
      idStatus,
      this.actividadesForm.controls['fTareaPorVencer'].value,
      this.actividadesForm.controls['fTareaProximaVencer'].value,
      this.actividadesForm.controls['fTareaTiempo'].value);
      
    this.tagService.crearActividad(actividad).subscribe(
      result => {
        console.log(result);
        let generigResponseDTO : any;
        generigResponseDTO = result;
        if ( generigResponseDTO.clave == 99 ){
          this.toastr.errorToastr('El nombre del CATÁLOGO o del PREFIJO ya existe, favor de modificar.', 'Lo siento,');
        }else{
          this.toastr.successToastr('La actividad fue Creada con éxito.', '¡Se ha logrado!');
          //this.router.navigateByUrl('/catalogo-actividades');
          this.eventService.sendMainCompliance(new EventMessage(6, {}));
        }
      },
      error => {
        console.log(<any>error);
        this.toastr.errorToastr('Error al guardar la actividad.', 'Lo siento,');
      });

  }

  regresar(){
    this.eventService.sendMainCompliance(new EventMessage(6, {}));
  }

  actualizarActividad() {

    let idStatus;
    if (this.checkedEstatus){
      idStatus = this.checkedActivoId;
    }else{
      idStatus = this.checkedInactivoId;
    }

    let actividad = new TagActividadInDTO(
      this.actividadesForm.controls['fActividadId'].value,
      this.actividadesForm.controls['fActividad'].value,
      this.actividadesForm.controls['fPrefijo'].value,
      idStatus,
      40,//this.actividadesForm.controls['fTareaPorVencer'].value,
      30,//this.actividadesForm.controls['fTareaProximaVencer'].value,
      30);//this.actividadesForm.controls['fTareaTiempo'].value);
      console.log(actividad);
    this.tagService.editarActividad(actividad).subscribe(
      result => {
        console.log(result);
        this.toastr.successToastr('La actividad fue actualizada con éxito.', '¡Se ha logrado!');
        //this.router.navigateByUrl('/catalogo-actividades/editar/'+this.actividadId);
        //this.router.navigateByUrl('/catalogo-actividades');
        this.eventService.sendMainCompliance(new EventMessage(6, {}));
      },
      error => {
        console.log(<any>error);
        this.toastr.errorToastr('Error al Editar la actividad.', 'Lo siento,');
      });

  }

  //Compara valores del combo para seleccionar la opción correspondiente
  compareFn(combo1: number, combo2: number) {
    console.log(combo1 && combo2 && combo1 === combo2);
    return combo1 && combo2 && combo1 === combo2;
  }

  chanceCheck(){
    if (this.checkedEstatus)
      this.checkedEstatus = false;
    else{
      this.checkedEstatus = true;
    }
  }

}
