import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  checkedEstatus = false;
  checkedActivoId;
  checkedInactivoId;
  deshabiliarEstatus: boolean = true;

  submitted = false;

  get f() { return this.perfilForm.controls; }

  ngOnInit() {
    this.submitted = false;
    this.estatusMaestroService.getEstatusMaestroOpcion().subscribe(
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


          this.estatusMaestroService.getEntidadEstatus('CAT_MAESTRO_OPCION', 'Activo').subscribe(data => {
            this.entidadEstatusId = data.entidadEstatusId;

            // LLENA DATOS
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
              this.catalogoMaestroService.getOpcion(this.maestroOpcionId).subscribe(
                data => {
                this.perfilForm.controls.maestroOpcionId.setValue(data.maestroOpcionId);
                this.perfilForm.controls.nombreOpcion.setValue(data.opcion.codigo);
                this.perfilForm.controls.opcionDescripcion.setValue(data.opcion.descripcion);
                this.perfilForm.controls.orden.setValue(data.orden);
                this.perfilForm.controls.nombreOpcion.enable();
                this.perfilForm.controls.opcionDescripcion.enable();
                //this.perfilForm.controls.fComboEstatus.patchValue(`${data.entidadEstatusId}`);
                if (this.checkedActivoId === data.entidadEstatusId ){
                  this.checkedEstatus = true;
                }else{
                  this.checkedEstatus = false;
                }
        
                /*console.log("Estatus deb ser: " + this.checkedEstatus);
                console.log("Condición: " + this.checkedActivoId + " === " + data.entidadEstatusId + " = " + (this.checkedActivoId === data.entidadEstatusId) )*/
        
                this.deshabiliarEstatus = false;
                this.isReadOnly = false;
              });
            }
            if (this.accion === 'nuevo') {
              // @ts-ignore
              this.catalogoMaestroService.getOpcion('1').subscribe(data => {
                this.perfilForm.controls.maestroOpcionId.setValue(data.maestroOpcionId);
                this.perfilForm.controls.nombreOpcion.setValue('');
                this.perfilForm.controls.opcionDescripcion.setValue('');
                this.perfilForm.controls.orden.setValue('');
                this.perfilForm.controls.nombreOpcion.enable();
                this.perfilForm.controls.opcionDescripcion.enable();
                //this.perfilForm.controls.fComboEstatus.patchValue(`${this.entidadEstatusId}`);
                this.deshabiliarEstatus = false;
                this.checkedEstatus = true;
        
              });
            }
            if (this.accion === 'ver') {
              this.catalogoMaestroService.getOpcion(this.maestroOpcionId).subscribe(data => {
                this.perfilForm.controls.maestroOpcionId.setValue(data.maestroOpcionId);
                this.perfilForm.controls.nombreOpcion.setValue(data.opcion.codigo);
                this.perfilForm.controls.opcionDescripcion.setValue(data.opcion.descripcion);
                this.perfilForm.controls.orden.setValue(data.orden);
                this.perfilForm.controls.nombreOpcion.disable();
                this.perfilForm.controls.opcionDescripcion.disable();
                //this.perfilForm.controls.fComboEstatus.patchValue(`${data.entidadEstatusId}`);
                
                if (this.checkedActivoId === data.entidadEstatusId ){
                  this.checkedEstatus = true;
                }else{
                  this.checkedEstatus = false;
                }
                this.deshabiliarEstatus = true;
                // @ts-ignore
                //this.perfilForm.controls.fComboEstatus.disable(true);
              });
              this.isReadOnly = true;
            }
            // TERMINA LLENAR DATOS

          });


        });
      },
      error => {
        console.log('Error al obtener catalgo de estatus.');
        console.log(error as any);
      }
    );

    

    this.perfilForm = this.formBuilder.group({
      maestroOpcionId: ['',''],
      nombreOpcion: [ '', Validators.required],
      opcionDescripcion: ['', Validators.required],
      orden: ['',''],
      estatus: ['',''],
      //fComboEstatus: ['', '']
    });
  }
  onSubmit() {
    
    this.submitted = true;
    if (this.perfilForm.invalid) {
      this.toastr.errorToastr('Todos los campos son obligatorios, verifique.', 'Lo siento,');
      return;
    }

    console.log(this.perfilForm.controls);

    let estatusid;
      let estatusNombre;
      if ( this.checkedEstatus){
        estatusid = this.checkedActivoId
        estatusNombre = "Activo"
      }else{
        estatusid = this.checkedInactivoId;
        estatusNombre = "Inactivo"
      }

    if (this.accion === 'edit') {
      this.perfilForm.controls.orden.setValue('1');
      /*if (this.perfilForm.controls.fComboEstatus.value === '' + this.entidadEstatusId) {
        this.perfilForm.controls.estatus.setValue('Activo');
      } else {
        this.perfilForm.controls.estatus.setValue('Inactivo');
      }*/
      
      this.catalogoMaestroService.updateOpcion(
        this.perfilForm.controls.nombreOpcion.value,
        this.perfilForm.controls.opcionDescripcion.value,
        estatusNombre, //this.perfilForm.controls.estatus.value,
        this.perfilForm.controls.orden.value,
        this.maestroOpcionId
      ).subscribe(data => {
        this.toastr.successToastr('El Catálogo fue actualizada con exito.', '¡Se ha logrado!');
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
        estatusNombre, //'Activo',
        '1',
        this.nombreCatalogo
      ).subscribe(data => {
        if (data.mensajeGenerico === 'El catálogo ya existe') {
          this.toastr.errorToastr(data.mensajeGenerico, 'Lo siento,');
        } else {
          this.toastr.successToastr(data.mensajeGenerico, '¡Se ha logrado!');
          //this.router.navigateByUrl('/catalogo/' + this.nombreCatalogo);
          this.eventService.sendMainCompliance(new 
            EventMessage(this.getOptionCatalog(), {}));
        }
      });
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

  regresar(){
    this.eventService.sendMainCompliance(new EventMessage(4, {}));
  }

  changeCheck(){
    if (this.checkedEstatus)
      this.checkedEstatus = false;
    else{
      this.checkedEstatus = true;
    }
  }

}
