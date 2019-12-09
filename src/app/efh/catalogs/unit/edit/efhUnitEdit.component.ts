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
  selector: 'app-efh-unit-edit',
  templateUrl: './efhUnitEdit.component.html',
  styleUrls: ['./efhUnitEdit.component.scss'],
  providers: [DatePipe]
})
export class EfhUnitEditComponent implements OnInit {

  @Input() maestroOpcionId: string;
  @Input() accion: string;
  @Input() nombreCatalogo: string;
  titulo: string;
  unitForm: FormGroup;
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
  dataSubmit = {}
  origen: string;
  cloned: boolean = false;

  constructor(private catalogoMaestroService: CatalogoMaestroService,
              private formBuilder: FormBuilder,
              public  toastr: ToastrManager,
              public  globalService: GlobalService,
              private eventService: EventService,
              private datePipe: DatePipe) {
    this.unitForm = this.formBuilder.group({});
  }

  get f() { return this.unitForm.controls; }

  ngOnInit() {
    this.submitted = false;
    this.unitForm = this.formBuilder.group({
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
      this.titulo = 'Editar / Catálogo de Unidades';
    } else if (this.accion === 'ver') {
      this.deshabiliarEstatus = true;
      this.titulo = 'Consultar / Catálogo de Unidades';
    } else {
      this.checkedEstatus = true;
      this.deshabiliarEstatus = false;
      this.titulo = 'Agregar / Catálogo de Unidades';
    }

    if (this.accion === 'editar' || this.accion === 'ver') {
      if (this.accion === 'ver') {
        this.soloLectura = true;
        this.unitForm.controls['nombreOpcion'].disable();
        this.unitForm.controls['opcionDescripcion'].disable();
      } else {
        this.unitForm.controls['nombreOpcion'].disable();
        this.soloLectura = false;
      }
      this.obtenerDatosTiposEvento(true);
    }
  }

  obtenerDatosTiposEvento(putData) {
    this.catalogoMaestroService.getCatalogoIndividual('unit').subscribe(
        dataBack => {
          this.result = dataBack;

          this.nRow = 0;
          for (let element of this.result) {
            this.nRow = element.id;
            if (this.nRow > this.nMax) {
              this.nMax = this.nRow;
            }

            if (this.catalogType.id === element.id && putData) {
              this.unitForm.controls['nombreOpcion'].setValue(element.code);
              this.unitForm.controls['opcionDescripcion'].setValue(element.description);
              this.checkedEstatus = element.active;
              this.origen = element.referenceclone;
              this.cloned = element.cloned;
            }

            if (!putData) {
              if (this.unitForm.controls['nombreOpcion'].value === element.code) {
                this.registroExistente = true;
              }
            }
          }

          if (this.registroExistente && this.accion === 'nuevo') {
            this.toastr.errorToastr('El nombre ya existe, favor de modificar.', 'Lo siento,');
            this.registroExistente = false;
            return;
          }

          if (!putData) {
            this.dataSubmit['code'] = this.unitForm.controls['nombreOpcion'].value;
            this.dataSubmit['description'] = this.unitForm.controls['opcionDescripcion'].value;
            this.dataSubmit['active'] = this.checkedEstatus;
            this.dataSubmit['catalog'] = 'unit';

            if (this.accion === 'nuevo') {
              this.dataSubmit['save'] = true;
              this.dataSubmit['referenceclone'] = 'NO_CLONADO';
              this.dataSubmit['cloned'] = 0;
            }
            if (this.accion === 'editar') {
              this.dataSubmit['id'] = this.catalogType.id;
              this.dataSubmit['order'] = this.catalogType.id;
              this.dataSubmit['save'] = false;
              this.dataSubmit['referenceclone'] = this.origen;
              this.dataSubmit['cloned'] = this.cloned;
            }

            this.catalogoMaestroService.setCatalogoIndividual(this.dataSubmit, this.globalService.aguila).subscribe(
                dataBack => {
                  if (this.accion === 'nuevo') {
                    this.toastr.successToastr('La unidad fue creada con éxito.', '¡Se ha logrado!');
                  }
                  if (this.accion === 'editar') {
                    this.toastr.successToastr('La unidad fue actualizada con éxito.', '¡Se ha logrado!');
                  }

                  if (this.accion === 'nuevo') {
                    this.soloLectura = true;
                    this.unitForm.controls['nombreOpcion'].disable();
                    this.unitForm.controls['opcionDescripcion'].disable();
                    this.deshabiliarEstatus = true;
                    this.disabledSave = true;
                  } else {
                    this.deshabiliarEstatus = true;
                    this.unitForm.controls['opcionDescripcion'].disable();
                    this.disabledSave = true;
                  }
                });
          }
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
    if (this.unitForm.invalid) {
      this.toastr.errorToastr('Todos los campos son obligatorios, verifique.', 'Lo siento,');
      return;
    }
    this.obtenerDatosTiposEvento(false);
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

  changeDescription() {
    if (this.accion === 'editar') {
      this.disabledSave = false;
    }
  }

  regresar() {
    this.eventService.sendChangePage(new EventMessage(4, {} , 'Efh.Unidad'));
  }

}
