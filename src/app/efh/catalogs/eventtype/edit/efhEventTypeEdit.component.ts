import { Component, OnInit, Input       } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrManager                  } from 'ng6-toastr-notifications';
import { CatalogoMaestroService         } from 'src/app/core/services/catalogo-maestro.service';
import { GlobalService                  } from 'src/app/core/globals/global.service';
import { Combo                          } from 'src/app/compliance/models/Combo';
import { CatalogType                    } from 'src/app/compliance/models/CatalogType';
import { EventService                   } from 'src/app/core/services/event.service';
import { EventMessage                   } from 'src/app/core/models/EventMessage';
import { DatePipe                       } from '@angular/common';

export interface Inputs {
  label: string;
  inputtype: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'app-event-type-edit',
  templateUrl: './efhEventTypeEdit.component.html',
  styleUrls: ['./efhEventTypeEdit.component.scss'],
  providers: [DatePipe]
})
export class EfhEventTypeEditComponent implements OnInit {

  @Input() maestroOpcionId: string;
  @Input() accion: string;
  @Input() nombreCatalogo: string;
  titulo: string;
  eventTypeForm: FormGroup;
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
  verClonar        : boolean = false;
  showEditClonated : boolean = false;
  checkedClonar : boolean = false;
  checkedEditClonated : boolean = false;
  dataSubmit = {}
  origen: string;
  cloned: boolean = false;
  hasCloned: boolean = false;

  constructor(private catalogoMaestroService: CatalogoMaestroService,
              private formBuilder: FormBuilder,
              public  toastr: ToastrManager,
              public  globalService: GlobalService,
              private eventService: EventService,
              private datePipe: DatePipe) {
    this.eventTypeForm = this.formBuilder.group({});
  }

  get f() { return this.eventTypeForm.controls; }

  ngOnInit() {
    this.submitted = false;
    this.eventTypeForm = this.formBuilder.group({
      maestroOpcionId: ['', ''],
      nombreOpcion: [ '', Validators.required],
      opcionDescripcion: ['', Validators.required],
      orden: ['', ''],
      estatus: ['', ''],
    });

    this.accion = this.catalogType.action;
    if (this.accion === 'editar') {
      this.deshabiliarEstatus = false;
      this.disabledSave = true;
      this.titulo = 'Editar / Catálogo de Tipos de Evento';
    } else if (this.accion === 'ver') {
      this.deshabiliarEstatus = true;
      this.titulo = 'Consultar / Catálogo de Tipos de Evento';
    } else {
      this.checkedEstatus = true;
      this.deshabiliarEstatus = false;
      this.titulo = 'Agregar / Catálogo de Tipos de Evento';
    }

    if (this.accion === 'editar' || this.accion === 'ver') {
      if (this.accion === 'ver') {
        this.soloLectura = true;
        this.eventTypeForm.controls['nombreOpcion'].disable();
        this.eventTypeForm.controls['opcionDescripcion'].disable();
      } else {
        this.eventTypeForm.controls['nombreOpcion'].disable();
        this.eventTypeForm.controls['opcionDescripcion'].disable();
        this.soloLectura = false;
      }
      this.obtenerDatosTiposEvento(true);
    }
  }

  obtenerDatosTiposEvento(putData) {
    this.catalogoMaestroService.getCatalogoIndividual('typeEvent').subscribe(
        dataBack => {
          this.result = dataBack;

          this.nRow = 0;
          for (let element of this.result) {
            this.nRow = element.id;
            if (this.nRow > this.nMax) {
              this.nMax = this.nRow;
            }

            if (this.catalogType.id === element.id && putData) {
              this.eventTypeForm.controls['nombreOpcion'].setValue(element.code);
              this.eventTypeForm.controls['opcionDescripcion'].setValue(element.description);
              this.checkedEstatus = element.active;
              this.origen = element.referenceclone;
              this.cloned = element.cloned;
            }

            if (!putData) {
              if (this.eventTypeForm.controls['nombreOpcion'].value === element.code
                  || this.eventTypeForm.controls['opcionDescripcion'].value === element.description) {
                this.registroExistente = true;
              }
            }
          }

          if (this.registroExistente && this.accion === 'nuevo') {
            this.toastr.errorToastr('El nombre o la descripción ya existe, favor de modificar.', 'Lo siento,');
            this.registroExistente = false;
            return;
          }

          if (putData) {
            if (!this.cloned) {
              this.dataSubmit['catalog']        = 'typeEvent';
              this.dataSubmit['referenceclone'] = this.origen;
              this.dataSubmit['code']           = this.eventTypeForm.controls['nombreOpcion'].value;
              this.dataSubmit['description']    = this.eventTypeForm.controls['opcionDescripcion'].value;
              this.dataSubmit['save']           = false;
              this.catalogoMaestroService.hasClonated(this.dataSubmit, !this.globalService.aguila).subscribe(
                  response => {
                    this.hasCloned = response['success'];
                  });
            }
          } else {
            this.dataSubmit['code'] = this.eventTypeForm.controls['nombreOpcion'].value;
            this.dataSubmit['description'] = this.eventTypeForm.controls['opcionDescripcion'].value;
            this.dataSubmit['active'] = this.checkedEstatus;
            this.dataSubmit['catalog'] = 'typeEvent';

            if (this.accion === 'nuevo') {
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
                this.dataSubmit['referenceclone'] = 'DESLIGADO';
              } else {
                this.dataSubmit['referenceclone'] = this.origen;
              }

              this.dataSubmit['cloned'] = this.cloned;
            }

            this.catalogoMaestroService.setCatalogoIndividual(this.dataSubmit, this.globalService.aguila).subscribe(
                dataBack => {
                  if (this.accion === 'nuevo') {
                    this.toastr.successToastr('El tipo de evento fue creado con éxito.', '¡Se ha logrado!');
                  }
                  if (this.accion === 'editar') {
                    this.toastr.successToastr('El tipo de evento fue actualizado con éxito.', '¡Se ha logrado!');
                  }

                  if (this.accion === 'nuevo') {
                    this.soloLectura = true;
                    this.eventTypeForm.controls['nombreOpcion'].disable();
                    this.eventTypeForm.controls['opcionDescripcion'].disable();
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
    ).add(() => {
      //this.addBlock(2, null);
    });
  }

  clonar() {
    this.dataSubmit['cloned'] = 1;
    this.catalogoMaestroService.setCatalogoIndividual(this.dataSubmit, !this.globalService.aguila).subscribe(
        dataBack => {
          this.toastr.successToastr('El tipo de evento fue clonado con éxito.', '¡Se ha logrado!');
          this.eventService.sendChangePage(new EventMessage(4, {} , 'Efh.Tipo de evento'));
        }
    );
  }

  editClonated() {
    this.dataSubmit['cloned'] = 1;
    this.catalogoMaestroService.setEditClonated(this.dataSubmit, !this.globalService.aguila).subscribe(
        dataBack => {
          this.toastr.successToastr('La actualización de elementos clonados se logró con éxito.', '¡Se ha logrado!');
          this.eventService.sendChangePage(new EventMessage(4, {} , 'Efh.Tipo de evento'));
        }
    );
  }

  async delay(ms: number) {
    await new Promise(
        resolve => setTimeout(() => resolve(), ms)).then(() => { this.validStatus(); });
  }

  validStatus() {
    if (this.checkedActivoId === this.valueActiveStatus  ) {
      this.checkedEstatus = true;
    } else {
      this.checkedEstatus = false;
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.eventTypeForm.invalid) {
      this.toastr.errorToastr('Todos los campos son obligatorios, verifique.', 'Lo siento,');
      return;
    }
    this.obtenerDatosTiposEvento(false);
  }

  compareFn(combo1: number, combo2: number) {
    return combo1 && combo2 && combo1 === combo2;
  }

  changeCheck() {
    if (this.checkedEstatus) {
      this.checkedEstatus = false;
    } else {
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

  regresar() {
    if ( (this.accion === 'nuevo' || this.accion === 'editar')
        && !this.checkedClonar) {
      this.catalogoMaestroService.getCatalogoIndividual('typeEvent').subscribe(
          dataBack => {
            this.result = dataBack;

            for (let element of this.result) {
              if (element.code === this.eventTypeForm.controls['nombreOpcion'].value) {
                this.dataSubmit['id'] = element.id;
              }
            }

            this.dataSubmit['save'] = false;
            if (this.accion === 'nuevo') {
              this.dataSubmit['referenceclone'] = 'NO_CLONADO';
            } else {
              this.dataSubmit['referenceclone'] = this.datePipe.transform(new Date() ,'ddMMyyyyHHmmssSSS');
            }
            this.catalogoMaestroService.setCatalogoIndividual(this.dataSubmit, this.globalService.aguila).subscribe(
                dataBack => {
                });

          });
    }
    this.eventService.sendChangePage(new EventMessage(4, {} , 'Efh.Tipo de evento'));
  }
}
