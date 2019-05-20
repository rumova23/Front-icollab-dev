import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { CatalogoMaestroService } from 'src/app/core/services/catalogo-maestro.service';
import { EstatusMaestroService } from 'src/app/core/services/estatus-maestro.service';
import { GlobalService } from 'src/app/core/globals/global.service';
import { Combo } from 'src/app/compliance/models/Combo';
import { CatalogType } from 'src/app/compliance/models/CatalogType';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';

export interface Inputs {
  label: string;
  inputtype: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
}
@Component({
  selector: 'app-complianceTypesEdit',
  templateUrl: './complianceTypesEdit.component.html',
  styleUrls: ['./complianceTypesEdit.component.scss']
})
export class ComplianceTypesEditComponent implements OnInit {


  constructor(
    private catalogoMaestroService: CatalogoMaestroService,
    private estatusMaestroService: EstatusMaestroService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public toastr: ToastrManager,
    private router: Router,
    private globalService: GlobalService,
    private eventService: EventService) {
    this.perfilForm = this.formBuilder.group({});
  }
  titulo: string;
  @Input() maestroOpcionId: string;
  @Input() accion: string;
  @Input() nombreCatalogo: string;
  perfilForm: FormGroup;
  estatus: string;
  entidadEstatusId: string;
  orden: string;
  isReadOnly = false;
  editarEstatusActivo = true;
  catalogType: CatalogType;
  comboEstatus = new Array<Combo>();

  submitted = false;

  get f() { return this.perfilForm.controls; }

  ngOnInit() {

    this.estatusMaestroService.getEstatusMaestroOpcion().subscribe(
      catalogoResult => {
        console.log(catalogoResult)
        let entidadEstatus: any;
        entidadEstatus = catalogoResult;
        entidadEstatus.forEach(element => {
          let combo: Combo;
          combo = new Combo(element.estatus.estatusId.toString(), element.estatus.nombre);
          this.comboEstatus.push(combo);
          if (element.estatus.nombre === 'Activo' && this.accion == null) {
            this.perfilForm.controls.fComboEstatus.patchValue(`${element.estatus.estatusId.toString()}`);
          }
        });
      },
      error => {
        console.log('Error al obtener catalgo de estatus.');
        console.log(error as any);
      }
    );

    this.estatusMaestroService.getEntidadEstatus('CAT_MAESTRO_OPCION', 'Activo').subscribe(data => {
      this.entidadEstatusId = data.entidadEstatusId;
    });

    this.titulo = ((this.catalogType.action === 'nuevo') ? "Nuevo" 
    : (this.catalogType.action === 'edit') ? "Edit" : "Ver")
     + " Catálogo / " + this.catalogType.name;

    //this.maestroOpcionId = this.route.snapshot.params.maestroOpcionId;
    this.maestroOpcionId =  this.catalogType.id;
    //this.accion = this.route.snapshot.params.accion;
    this.accion =  this.catalogType.action;
    //this.nombreCatalogo = this.route.snapshot.params.nombreCatalogo;
    this.nombreCatalogo =  this.catalogType.name;

    if (this.accion === 'edit') {
      this.catalogoMaestroService.getOpcion(this.maestroOpcionId).subscribe(data => {
        this.perfilForm.controls.maestroOpcionId.setValue(data.maestroOpcionId);
        this.perfilForm.controls.nombreOpcion.setValue(data.opcion.codigo);
        this.perfilForm.controls.opcionDescripcion.setValue(data.opcion.descripcion);
        this.perfilForm.controls.orden.setValue(data.orden);
        this.perfilForm.controls.fComboEstatus.patchValue(`${data.entidadEstatusId}`);
        this.isReadOnly = true;
      });
    }
    if (this.accion === 'nuevo') {
      // @ts-ignore
      this.catalogoMaestroService.getOpcion('1').subscribe(data => {
        this.perfilForm.controls.maestroOpcionId.setValue(data.maestroOpcionId);
        this.perfilForm.controls.nombreOpcion.setValue('');
        this.perfilForm.controls.opcionDescripcion.setValue('');
        this.perfilForm.controls.orden.setValue('');
        this.perfilForm.controls.fComboEstatus.patchValue(`${this.entidadEstatusId}`);
      });
    }
    if (this.accion === 'ver') {
      this.catalogoMaestroService.getOpcion(this.maestroOpcionId).subscribe(data => {
        this.perfilForm.controls.maestroOpcionId.setValue(data.maestroOpcionId);
        this.perfilForm.controls.nombreOpcion.setValue(data.opcion.codigo);
        this.perfilForm.controls.opcionDescripcion.setValue(data.opcion.descripcion);
        this.perfilForm.controls.orden.setValue(data.orden);
        this.perfilForm.controls.fComboEstatus.patchValue(`${data.entidadEstatusId}`);
        // @ts-ignore
        this.perfilForm.controls.fComboEstatus.disable(true);
      });
      this.isReadOnly = true;
    }

    this.perfilForm = this.formBuilder.group({
      maestroOpcionId: [{ value: '', disabled: true }],
      nombreOpcion: [{ value: '', disabled: this.isReadOnly }],
      opcionDescripcion: [{ value: '', disabled: this.isReadOnly }],
      orden: [{ value: '', disabled: this.isReadOnly }],
      estatus: [{ value: '', disabled: this.isReadOnly }],
      fComboEstatus: ['', '']
    });
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.perfilForm.controls);
    if (this.accion === 'edit') {
      this.perfilForm.controls.orden.setValue('1');
      if (this.perfilForm.controls.fComboEstatus.value === '' + this.entidadEstatusId) {
        this.perfilForm.controls.estatus.setValue('Activo');
      } else {
        this.perfilForm.controls.estatus.setValue('Inactivo');
      }
      this.catalogoMaestroService.updateOpcion(
        this.perfilForm.controls.nombreOpcion.value,
        this.perfilForm.controls.opcionDescripcion.value,
        this.perfilForm.controls.estatus.value,
        this.perfilForm.controls.orden.value,
        this.maestroOpcionId
      ).subscribe(data => {
        this.toastr.successToastr('El Catálogo fue actualizada con exito.', 'Success!');
        //this.router.navigateByUrl('/catalogo/' + this.nombreCatalogo);
        this.eventService.sendMainCompliance(new 
          EventMessage(this.getOptionCatalog(), {}));
      });
    }
    if (this.accion === 'nuevo') {
      // tslint:disable-next-line:max-line-length
      // @ts-ignore
      this.catalogoMaestroService.salvarOpcion(
        this.perfilForm.controls.nombreOpcion.value,
        this.perfilForm.controls.opcionDescripcion.value,
        'Activo',
        '1',
        this.nombreCatalogo
      ).subscribe(data => {
        if (data.mensajeGenerico === 'La opción ya existe') {
          this.toastr.errorToastr(data.mensajeGenerico, 'Oops!');
        } else {
          this.toastr.successToastr(data.mensajeGenerico, 'Success!');
          //this.router.navigateByUrl('/catalogo/' + this.nombreCatalogo);
          this.eventService.sendMainCompliance(new 
            EventMessage(this.getOptionCatalog(), {}));
        }
      });
    }
  }
  clickStatus() {
    this.editarEstatusActivo = !this.editarEstatusActivo
    // tslint:disable-next-line:triple-equals
    if (this.editarEstatusActivo === false) {
      this.perfilForm.controls.estatus.setValue('Inactivo');
    } else {
      this.perfilForm.controls.estatus.setValue('Activo');
    }
  }
  // Compara valores del combo para seleccionar la opción correspondiente
  compareFn(combo1: number, combo2: number) {
    console.log(combo1 && combo2 && combo1 === combo2);
    return combo1 && combo2 && combo1 === combo2;
  }

  getOptionCatalog() {
    let option : number = 0;
    switch(this.nombreCatalogo) {
      case 'AUTORIDAD':
        option = 4;
        break;
    }
    return option;
  }
}
