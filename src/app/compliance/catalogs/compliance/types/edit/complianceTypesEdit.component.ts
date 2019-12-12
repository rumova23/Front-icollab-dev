import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CatalogoMaestroService } from 'src/app/core/services/catalogo-maestro.service';
import { GlobalService } from 'src/app/core/globals/global.service';
import { Combo } from 'src/app/compliance/models/Combo';
import { CatalogType } from 'src/app/compliance/models/CatalogType';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { DatePipe } from '@angular/common';
import {ResponseVO} from '../../../../models/response-vo';

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
  providers: [DatePipe]
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
  deshabiliarEstatus = true;
  valueActiveStatus;
  submitted = false;
  nRow = 0;
  nMax = this.nRow;
  registroExistente = false;
  disabledSave = false;
  result;
  verClonar = false;
  showEditClonated = false;
  checkedClonar = false;
  checkedEditClonated = false;
  dataSubmit = {}
  origen: string;
  cloned = false;
  hasCloned = false;
  constructor(
    private catalogoMaestroService: CatalogoMaestroService,
    private formBuilder: FormBuilder,
    public  toastr: ToastrManager,
    public  globalService: GlobalService,
    private eventService: EventService,
    private datePipe: DatePipe) {
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
  obtenerDatosAutoridad(putData) {
    this.catalogoMaestroService.getCatalogoIndividual('authority').subscribe(
      dataBack => {
        this.result = dataBack;
        this.nRow = 0;
        for (let element of this.result) {
          this.nRow = element.id;
          if (this.nRow > this.nMax) {
            this.nMax = this.nRow;
          }
          if (this.catalogType.id === element.id && putData){
            this.autoridadesForm.controls['nombreOpcion'].setValue(element.code);
            this.autoridadesForm.controls['opcionDescripcion'].setValue(element.description);
            this.checkedEstatus = element.active;
            this.origen = element.referenceclone;
            this.cloned = element.cloned;
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

        //ngOnInit() -- accion === 'editar' || this.accion === 'ver'
        if (putData) {
          if (!this.cloned) {
            this.dataSubmit['catalog']        = 'authority';
            this.dataSubmit['referenceclone'] = this.origen;
            this.dataSubmit['code']           = this.autoridadesForm.controls['nombreOpcion'].value;
            this.dataSubmit['description']    = this.autoridadesForm.controls['opcionDescripcion'].value;
            this.dataSubmit['save']           = false;
            this.catalogoMaestroService.hasClonated(this.dataSubmit,!this.globalService.aguila).subscribe(
              response => {
                this.hasCloned = response["success"];
             });
          }
        }
        else { //onSubmit() -- accion === 'editar' || this.accion === 'ver'

          this.dataSubmit['code'] = this.autoridadesForm.controls['nombreOpcion'].value;
          this.dataSubmit['description'] = this.autoridadesForm.controls['opcionDescripcion'].value;
          this.dataSubmit['active'] = this.checkedEstatus;
          this.dataSubmit['catalog'] = 'authority';

          if (this.accion === 'nuevo') {
              //this.dataSubmit['id'] = this.nMax + 1;
              //this.dataSubmit['order'] = this.nMax + 1;
            this.dataSubmit['save'] = true;
            this.origen = this.datePipe.transform(new Date() ,'ddMMyyyyHHmmssSSS');
            this.dataSubmit['referenceclone'] = this.origen;
            this.dataSubmit['cloned'] = 0;
          }
          if (this.accion === 'editar') {
            this.dataSubmit['id'] = this.catalogType.id;
            this.dataSubmit['order'] = this.catalogType.id;
            this.dataSubmit['save'] = false;
            if (this.cloned) {
              this.dataSubmit['referenceclone'] = "DESLIGADO";
            } else {
              this.dataSubmit['referenceclone'] = this.origen;
            }
            this.dataSubmit['cloned'] = this.cloned;
            this.dataSubmit['active'] = this.checkedEstatus;
          }
          if (this.accion === 'editar') {
            this.catalogoMaestroService.updateIndividual(this.dataSubmit, this.globalService.aguila).subscribe(
                (responseVo: ResponseVO) => {
                  if (responseVo.success) {
                    this.toastr.successToastr('La autoridad fue actualizada con éxito.', '¡Se ha logrado!');
                  } else {
                    this.toastr.errorToastr(responseVo.message, '¡Error codigo: ' + responseVo.code + '!');
                  }
                });
          } else {
            this.catalogoMaestroService.setCatalogoIndividual(this.dataSubmit, this.globalService.aguila).subscribe(
                (responseVo: ResponseVO) => {
                  if (this.accion === 'nuevo') {
                    if (responseVo.success) {
                      this.toastr.successToastr('La autoridad fue creada con éxito.', '¡Se ha logrado!');
                    } else {
                      this.toastr.errorToastr(responseVo.message, '¡Error codigo: ' + responseVo.code + '!');
                    }
                  }


                  if (this.accion === 'nuevo') {
                    this.soloLectura = true;
                    this.autoridadesForm.controls['nombreOpcion'].disable();
                    this.autoridadesForm.controls['opcionDescripcion'].disable();
                    this.deshabiliarEstatus = true;
                    this.disabledSave = true;
                    this.verClonar = true;
                  } else {
                    this.deshabiliarEstatus = true;
                    this.disabledSave = true;

                    this.showEditClonated = this.hasCloned;
                  }
                });
          }
        }
      }
    ).add(() => {
      //this.addBlock(2, null);
    });

  }
  clonar() {
    this.dataSubmit['cloned'] = 1;
    this.catalogoMaestroService.setCatalogoIndividual(this.dataSubmit,!this.globalService.aguila).subscribe(
        (responseVo: ResponseVO) => {
          if (responseVo.success) {
            this.toastr.successToastr('La autoridad fue clonada con éxito.', '¡Se ha logrado!');
            this.eventService.sendChangePage(new EventMessage(4, {}, 'Compliance.Autoridades'));
          } else {
            this.toastr.errorToastr(responseVo.message, '¡Error codigo: ' + responseVo.code + '!');
          }
      }
    );
  }

  editClonated() {
    this.dataSubmit['cloned'] = 1;
    this.catalogoMaestroService.setEditClonated(this.dataSubmit,!this.globalService.aguila).subscribe( 
      dataBack => {
       this.toastr.successToastr('La actualización de elementos clonados se logró con éxito.', '¡Se ha logrado!');
       this.eventService.sendChangePage(new EventMessage(4, {} ,"Compliance.Autoridades"));
      }
    );
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
  }

  onSubmit() {
    this.submitted = true;
    if (this.autoridadesForm.invalid) {
      this.toastr.errorToastr('Todos los campos son obligatorios, verifique.', 'Lo siento,');
      return;
    }
    this.obtenerDatosAutoridad(false);
  }
  // Compara valores del combo para seleccionar la opción correspondiente
  compareFn(combo1: number, combo2: number) {
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
  changeCheck() {
    if (this.checkedEstatus)
      this.checkedEstatus = false;
    else {
      this.checkedEstatus = true;
    }

    if (this.accion === 'editar') {
      this.disabledSave = false;
    }
  }
  changeClonar() {
    this.checkedClonar = !this.checkedClonar;
  }
  changeEditClonated() {
    this.checkedEditClonated = !this.checkedEditClonated;
  }
  regresar(){
    if ( (this.accion === 'nuevo' || this.accion === 'editar') 
        && !this.checkedClonar){
      this.catalogoMaestroService.getCatalogoIndividual('authority').subscribe(
        dataBack => {
          this.result = dataBack;
  
          for (let element of this.result) { 
            if (element.code === this.autoridadesForm.controls['nombreOpcion'].value){
              this.dataSubmit['id'] = element.id;
            }
          }

          this.dataSubmit['save'] = false;
          if (this.accion === 'nuevo'){
            this.dataSubmit['referenceclone'] = "NO_CLONADO";
          }
          else{
            this.dataSubmit['referenceclone'] = this.datePipe.transform(new Date() ,'ddMMyyyyHHmmssSSS');
          }
          this.catalogoMaestroService.setCatalogoIndividual(this.dataSubmit,this.globalService.aguila).subscribe( 
            dataBack => { 
          });

        })
    }


    
    this.eventService.sendChangePage(new EventMessage(4, {} ,"Compliance.Autoridades"));
  }
}
