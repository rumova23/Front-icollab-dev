import {Component, Input, OnInit            } from '@angular/core';
import {CatalogType                         } from '../../../../../compliance/models/CatalogType';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CatalogoMaestroService              } from '../../../../../core/services/catalogo-maestro.service';
import {DatePipe                            } from '@angular/common';
import {EventMessage                        } from '../../../../../core/models/EventMessage';
import { EventService                       } from 'src/app/core/services/event.service';
import {ToastrManager                       } from 'ng6-toastr-notifications';
import {GlobalService                       } from '../../../../../core/globals/global.service';
import {Constants} from '../../../../../core/globals/Constants';

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
  resultService;
  eventTypesArr = [];
  unitsArr = [];
  fuelTypesArr = [];
  checkedEstatus = false;
  deshabiliarEstatus = false;
  disabledSave = false;
  checkedClonar = false;
  checkedEditClonated = true;
  isShotSectionVisible = true;
  isRejectSectionVisible = true;
  isRunbackSectionVisible = true;
  isStopSectionVisible = true;
  isDieselSectionVisible = true;
  shotControlsDisabled = true;
  rejectControlsDisabled = false;
  runbackControlsDisabled = false;
  stopControlsDisabled = false;
  dieselControlsDisabled = false;

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
    this.getCatalogs();
  }

  getCatalogs() {
    this.catalogoMaestroService.getCatalogoIndividual('typeEvent')
        .subscribe(
            data => {
              this.resultService = data;
              let i = 0;
              for (let element of this.resultService) {
                if (element.active === true) {
                  i += 1;
                  let obj            = {};
                  obj['order']       = i;
                  obj['id']          = element.id;
                  obj['name']        = element.code;
                  obj['description'] = element.description;
                  this.eventTypesArr.push(obj);
                }
              }
            },
            errorData => {
              this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
            }
        );

    this.catalogoMaestroService.getCatalogoIndividual('typeFuel')
        .subscribe(
            data => {
              this.resultService = data;
              let i = 0;
              for (let element of this.resultService) {
                if (element.active === true) {
                  i += 1;
                  let obj            = {};
                  obj['order']       = i;
                  obj['id']          = element.id;
                  obj['name']        = element.code;
                  obj['description'] = element.description;
                  this.fuelTypesArr.push(obj);
                }
              }
            },
            errorData => {
              this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
            }
        );

    this.catalogoMaestroService.getCatalogoIndividual('unit')
        .subscribe(
            data => {
              this.resultService = data;
              let i = 0;
              for (let element of this.resultService) {
                if (element.active === true) {
                  i += 1;
                  let obj            = {};
                  obj['order']       = i;
                  obj['id']          = element.id;
                  obj['name']        = element.code;
                  obj['description'] = element.description;
                  this.unitsArr.push(obj);
                }
              }
            },
            errorData => {
              this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
            }
        );
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
