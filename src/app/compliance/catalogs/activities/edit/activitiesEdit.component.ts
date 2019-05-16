import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from "@angular/router";
import { Combo } from 'src/app/compliance/models/Combo';
import { GlobalService } from 'src/app/core/globals/global.service';
import { TagActividadDTO } from 'src/app/compliance/models/TagActividadDTO';
import { TagActividadInDTO } from 'src/app/compliance/models/TagActividadInDTO';
import { TagService } from 'src/app/compliance/services/tag.service';


export interface Inputs {
  label: String;
  inputtype: String;
  value?: String;
  checked?: boolean;
  disabled?: boolean;
}
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
  comboEstatus = new Array<Combo>();
  titulo: String;

  inputs: Inputs[] = [
    { label: "ID Actividad", inputtype: "text", value: "223696585", disabled: true },
    { label: "Actividad", inputtype: "text" },
    { label: "Prefijo", inputtype: "text" },
    { label: "Activo", inputtype: "checkbox", checked: true },
  ];
  constructor(
    private route: ActivatedRoute,
    private tagService: TagService,
    private formBuilder: FormBuilder,
    public toastr: ToastrManager,
    private router: Router,
    private globalService: GlobalService
  ) { }

  get f() { return this.actividadesForm.controls; }

  ngOnInit() {

    this.actividadesForm = this.formBuilder.group({
      fActividadId: ['', ''],
      fActividad: ['', Validators.required],
      fPrefijo: ['', Validators.required],
      fComboEstatus: ['', '']
    });

    this.accion = this.route.snapshot.params.accion;

    this.comboEstatus = new Array<Combo>();

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
            this.actividadesForm.controls['fComboEstatus'].patchValue(`${element.estatus.estatusId.toString()}`);
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
      this.deshabiliarEstatus = false;
      this.titulo = "Agregar / Catálogo de Categorías";
    }

    if (this.accion === 'editar' || this.accion === 'ver') {
      this.obtenerDatosActividad();
    }


  }

  obtenerDatosActividad() {
    this.actividadId = this.route.snapshot.params.actividadId;
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
            this.actividadesForm.controls['fComboEstatus'].patchValue(`${tagActividad.estatus.estatus.estatusId}`);

            if (this.accion === 'ver') {
              this.soloLectura = true;
            } else {
              this.soloLectura = false;
            }

          } else {
            this.toastr.infoToastr('No se encontró información del Tag buscado.', 'Info');
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
    // stop here if form is invalid
    if (this.actividadesForm.invalid) {
      console.log('Error!! :-)\n\n' + JSON.stringify(this.actividadesForm.value));
      this.toastr.errorToastr('Todos los campos son obligatorios, verifique.', 'Oops!');
      return;
    }

    if (this.actividadesForm.controls['fActividadId'].value == 0) {
      this.crearActividad();
    } else {
      this.actualizarActividad();
    }

  }



  crearActividad() {

    let actividad = new TagActividadInDTO(0,
      this.actividadesForm.controls['fActividad'].value,
      this.actividadesForm.controls['fPrefijo'].value,
      this.actividadesForm.controls['fComboEstatus'].value);
    this.tagService.crearActividad(actividad).subscribe(
      result => {
        console.log(result);
        this.toastr.successToastr('La actividad fue Creada con éxito.', 'Success');
        this.router.navigateByUrl('/catalogo-actividades');
      },
      error => {
        console.log(<any>error);
        this.toastr.errorToastr('Error al guardar la actividad.', 'Oops!');
      });

  }

  actualizarActividad() {

    let actividad = new TagActividadInDTO(this.actividadesForm.controls['fActividadId'].value,
      this.actividadesForm.controls['fActividad'].value,
      this.actividadesForm.controls['fPrefijo'].value,
      this.actividadesForm.controls['fComboEstatus'].value);
    this.tagService.editarActividad(actividad).subscribe(
      result => {
        console.log(result);
        this.toastr.successToastr('La actividad fue actualizada con éxito.', 'Success');
        //this.router.navigateByUrl('/catalogo-actividades/editar/'+this.actividadId);
        this.router.navigateByUrl('/catalogo-actividades');
      },
      error => {
        console.log(<any>error);
        this.toastr.errorToastr('Error al Editar la actividad.', 'Oops!');
      });

  }

  //Compara valores del combo para seleccionar la opción correspondiente
  compareFn(combo1: number, combo2: number) {
    console.log(combo1 && combo2 && combo1 === combo2);
    return combo1 && combo2 && combo1 === combo2;
  }

}
