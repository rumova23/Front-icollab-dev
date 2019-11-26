import {Component, Input, OnInit            } from '@angular/core';
import {CatalogType                         } from '../../../../../compliance/models/CatalogType';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CatalogoMaestroService              } from '../../../../../core/services/catalogo-maestro.service';
import {DatePipe                            } from '@angular/common';
import {EventMessage                        } from '../../../../../core/models/EventMessage';
import { EventService                       } from 'src/app/core/services/event.service';
import {ToastrManager                       } from 'ng6-toastr-notifications';
import {GlobalService                       } from '../../../../../core/globals/global.service';

@Component({
  selector: 'app-efh-edit-event',
  templateUrl: './efhEditEvent.component.html',
  styleUrls: ['./efhEditEvent.component.scss'],
  providers: [DatePipe]
})
export class EfhEditEventComponent implements OnInit {
  @Input() accion: string;
  catalogType: CatalogType;
  eventForm: FormGroup;
  eventTypesArr = [];
  unitsArr = [];
  fuelTypesArr = [];
  checkedEstatus = false;
  deshabiliarEstatus = false;
  disabledSave = false;
  checkedClonar = false;
  checkedEditClonated = false;

  constructor(
      private catalogoMaestroService: CatalogoMaestroService,
      private formBuilder: FormBuilder,
      public  toastr: ToastrManager,
      public  globalService: GlobalService,
      private eventService: EventService,
      private datePipe: DatePipe) {
    this.eventForm = this.formBuilder.group({});
  }

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      eventTypeControl: [null, [Validators.required]],
      unitControl: [ null, [Validators.required]],
      fuelTypeControl: [ null, [Validators.required]]
    });
    this.getCatalogs();
  }

  getCatalogs() {
    this.eventTypesArr = [
      {
        id: 1,
        name: 'Disparo'
      },
      {
        id: 2,
        name: 'Rechazo de Carga'
      }
    ];
    this.unitsArr = [
      {
        id: 1,
        name: 'TG1'
      },
      {
        id: 2,
        name: 'TG2'
      }
    ];
    this.fuelTypesArr = [
      {
        id: 1,
        name: 'Gas'
      },
      {
        id: 2,
        name: 'Diesel'
      }
    ];
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

  regresar() {
    if ( (this.accion === 'nuevo' || this.accion === 'editar')
        && !this.checkedClonar) {
    }
    this.eventService.sendChangePage(new EventMessage(4, {} ,'EFH.Evento'));
  }

}
