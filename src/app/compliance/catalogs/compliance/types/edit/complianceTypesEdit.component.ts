import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { CatalogoMaestroService } from 'src/app/core/services/catalogo-maestro.service';
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
  selector: 'app-complianceTypesEdit'
 ,templateUrl: './complianceTypesEdit.component.html'
})
export class ComplianceTypesEditComponent implements OnInit {

  @Input() maestroOpcionId: string;

  @Input() accion: string;
  @Input() nombreCatalogo: string;
  titulo: string;  
  autoridadesForm: FormGroup;
  soloLectura: boolean;
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
  valueActiveStatus;

  submitted = false;

  nRow = 0;
  nMax = this.nRow;
  registroExistente:boolean = false;
  disabledSave:boolean = false;
  result;

  verClonar:boolean = false;

  constructor(
    private catalogoMaestroService: CatalogoMaestroService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public toastr: ToastrManager,
    private router: Router,
    public globalService: GlobalService,
    private eventService: EventService) {
    this.autoridadesForm = this.formBuilder.group({});
  }


  get f() { return this.autoridadesForm.controls; }

  
  ngOnInit() {
    this.submitted = false;

    this.autoridadesForm = this.formBuilder.group({
      maestroOpcionId: ['',''],
      nombreOpcion: [ '', Validators.required],
      opcionDescripcion: ['', Validators.required],
      orden: ['',''],
      estatus: ['',''],
    });

    console.log("this.catalogType");
    console.dir(this.catalogType);
    this.accion = this.catalogType.action;
        
    if (this.accion === 'editar') {
      this.deshabiliarEstatus = false;
      this.disabledSave = true;
      this.titulo = "Editar / Catálogo de Autoridades";
    } else if (this.accion === 'ver') {
      this.deshabiliarEstatus = true;
      this.titulo = "Consultar / Catálogo de Autoridades";
    } else {
      this.checkedEstatus = true;
      this.deshabiliarEstatus = false;
      this.titulo = "Agregar / Catálogo de Autoridades";
    }

    if (this.accion === 'editar' || this.accion === 'ver') {
      if (this.accion === 'ver') {
        this.soloLectura = true;
        this.autoridadesForm.controls['nombreOpcion'].disable();
        this.autoridadesForm.controls['opcionDescripcion'].disable();
      } else {
        this.autoridadesForm.controls['nombreOpcion'].disable();
        this.autoridadesForm.controls['opcionDescripcion'].disable();
        this.soloLectura = false;
      }

      this.obtenerDatosAutoridad(true);
    }

  }

  dataSubmit = {}
  obtenerDatosAutoridad(putData){
    console.log("obtenerDatosAutoridad(..)");
    this.catalogoMaestroService.getCatalogoIndividual('authority').subscribe(
      dataBack => {
        console.log("dataBack");
        console.dir(dataBack);
        //console.dir(dataBack['result']);
        this.result = dataBack;

        this.nRow = 0;
        for (let element of this.result) {
          this.nRow = element.id;
          if (this.nRow > this.nMax){
            this.nMax = this.nRow; 
          }

          if (this.catalogType.id === element.id && putData){
            console.log("element.id");
            console.log(element.id);
            this.autoridadesForm.controls['nombreOpcion'].setValue(element.code);
            this.autoridadesForm.controls['opcionDescripcion'].setValue(element.description);
            this.checkedEstatus = element.active;
          }

          if (!putData){
            if (this.autoridadesForm.controls['nombreOpcion'].value === element.code
             || this.autoridadesForm.controls['opcionDescripcion'].value === element.description){
              this.registroExistente = true;
            }
          }          
        }

        if (this.registroExistente && this.accion === 'nuevo'){
          this.toastr.errorToastr('El nombre o la descripción ya existe, favor de modificar.', 'Lo siento,');
          this.registroExistente = false;
          return;
        }

        if (!putData){
          console.log("=================================================================");

          this.dataSubmit['code'] = this.autoridadesForm.controls['nombreOpcion'].value;
          this.dataSubmit['description'] = this.autoridadesForm.controls['opcionDescripcion'].value;
          this.dataSubmit['active'] = this.checkedEstatus;
          this.dataSubmit['catalog'] = 'authority';

          if (this.accion === 'nuevo') {
            this.dataSubmit['id'] = this.nMax + 1;
            this.dataSubmit['order'] = this.nMax + 1;
            this.dataSubmit['save'] = true;
          }
          if (this.accion === 'editar') {
            this.dataSubmit['id'] = this.catalogType.id;
            this.dataSubmit['order'] = this.catalogType.id;
            this.dataSubmit['save'] = false;
          }
  
          console.log("this.dataSubmit");
          console.dir(this.dataSubmit);
    
          //alert("-------");
           this.catalogoMaestroService.setCatalogoIndividual(this.dataSubmit,this.globalService.aguila).subscribe( 
             dataBack => { 
              console.log("//////");
              console.dir(dataBack);
              if (this.accion === 'nuevo') {
                this.toastr.successToastr('La autoridad fue creada con éxito.', '¡Se ha logrado!');
              }
              if (this.accion === 'editar') {
                this.toastr.successToastr('La autoridad fue actualizada con éxito.', '¡Se ha logrado!');
              }

              if (this.accion === 'nuevo') {
                this.soloLectura = true;
                this.autoridadesForm.controls['nombreOpcion'].disable();
                this.autoridadesForm.controls['opcionDescripcion'].disable();
                this.verClonar = true;
              }
              else{
                this.eventService.sendMainCompliance(new EventMessage(4, {}));
              }

           });
        }
              
      }
    ).add(() => {
      //this.addBlock(2, null);
    });

  }
  
  clonar(){
    this.dataSubmit['id'] = this.dataSubmit['id'] + 1000;
    this.catalogoMaestroService.setCatalogoIndividual(this.dataSubmit,!this.globalService.aguila).subscribe( 
      dataBack => { 
       console.log("//////");
       console.dir(dataBack);
       this.toastr.successToastr('La autoridad fue clonada con éxito.', '¡Se ha logrado!');
       this.eventService.sendMainCompliance(new EventMessage(4, {}));
      });

  }


  async delay(ms: number) {
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



  onSubmit() {
    this.submitted = true;
    if (this.autoridadesForm.invalid) {
      this.toastr.errorToastr('Todos los campos son obligatorios, verifique.', 'Lo siento,');
      return;
    }
    console.log("this.autoridadesForm.controls");    
    console.log(this.autoridadesForm.controls);

    this.obtenerDatosAutoridad(false);

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

    if (this.accion === 'editar') {
      this.disabledSave = false;
    }
  }

  inUpperCase(){
    console.log(this.autoridadesForm.controls['nombreOpcion'].value);
    //this.autoridadesForm.controls['nombreOpcion'] = 
    //this.autoridadesForm.controls['nombreOpcion'].value.toUpperCase();   
  }

}
