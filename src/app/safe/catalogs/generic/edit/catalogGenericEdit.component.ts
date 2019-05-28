import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from "@angular/router";
import { GlobalService } from 'src/app/core/globals/global.service';
import { Entity } from 'src/app/core/models/Entity';
import { MarketService } from 'src/app/safe/services/market.service';
import { Constants } from 'src/app/core/globals/Constants';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { CatalogGeneric } from 'src/app/safe/models/CatalogGeneric';



@Component({
  selector: 'app-catalogGenericEdit',
  templateUrl: './catalogGenericEdit.component.html',
  styleUrls: ['./catalogGenericEdit.component.scss']
})
export class CatalogGenericEditComponent implements OnInit {
  genericForm: FormGroup;
  entity: Entity;
  catalogGeneric: CatalogGeneric;
  catalogGenericSelected: CatalogGeneric;
  catalog: string;
  constructor(
    public toastr: ToastrManager,
    private router: Router,
    private fb: FormBuilder,
    private globalService: GlobalService,
    private marketService: MarketService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.genericForm = this.fb.group({
      'name': new FormControl('', Validators.required),
      'active': new FormControl(false),
    });
    if (this.entity.readOnly) {
      this.genericForm.patchValue(this.catalogGenericSelected);
      this.genericForm.disable()
    } else if (this.entity.edit) {
      this.genericForm.patchValue(this.catalogGenericSelected);
    } else {
      this.catalogGeneric = {} as CatalogGeneric;
    }
  }

  getTitle() {
    const verbose = ((this.entity.readOnly) ?
      "Consultar " : (this.entity.edit) ? "Editar " : "Agregar ");
    let title = "";
    switch (this.catalog) {
      case 'sys':
        title = "Sistema";
        break;
      case 'typeProduct':
        title = "Tipo de Producto";
        break;
      case 'paymentCondition':
        title = "Condición de Pago";
        break;
      case 'typePerson':
        title = "Tipo de Persona";
        break;
      case 'typeClient':
        title = "Tipo de Cliente";
        break;
      case 'country':
        title = "País";
        break;
      case 'bank':
        title = "Banco";
        break;
    }
    return verbose + ' ' + title;
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }

  save(value) {
    console.log(value);
    this.catalogGeneric = value;
    this.catalogGeneric.id = (this.catalogGenericSelected !== null && this.catalogGenericSelected !== undefined &&
      this.catalogGenericSelected.id !== null && this.catalogGenericSelected.id !== undefined
    ) ? this.catalogGenericSelected.id : 0;
    this.catalogGeneric.save = this.entity.new;
    console.log(this.catalogGeneric);
    switch (this.catalog) {
      case 'sys':
        this.marketService.saveSystem(this.catalogGeneric)
          .subscribe(
            data => {
              this.eventService.sendMainSafe(new EventMessage(9, this.catalog));
            },
            errorData => {
              this.toastr.errorToastr(Constants.ERROR_SAVE, '');
            });
        break;
      case 'typeProduct':
        this.marketService.saveTypeProduct(this.catalogGeneric)
          .subscribe(
            data => {
              this.eventService.sendMainSafe(new EventMessage(9, this.catalog));
            },
            errorData => {
              this.toastr.errorToastr(Constants.ERROR_SAVE, '');
            });
        break;
      case 'paymentCondition':
        this.marketService.savePaymentCondition(this.catalogGeneric)
          .subscribe(
            data => {
              this.eventService.sendMainSafe(new EventMessage(9, this.catalog));
            },
            errorData => {
              this.toastr.errorToastr(Constants.ERROR_SAVE, '');
            });
        break;
      case 'typePerson':
        this.marketService.saveTypePerson(this.catalogGeneric)
          .subscribe(
            data => {
              this.eventService.sendMainSafe(new EventMessage(9, this.catalog));
            },
            errorData => {
              this.toastr.errorToastr(Constants.ERROR_SAVE, '');
            });
        break;
      case 'typeClient':
        this.marketService.saveTypeClient(this.catalogGeneric)
          .subscribe(
            data => {
              this.eventService.sendMainSafe(new EventMessage(9, this.catalog));
            },
            errorData => {
              this.toastr.errorToastr(Constants.ERROR_SAVE, '');
            });
        break;
      case 'country':
        this.marketService.saveCountry(this.catalogGeneric)
          .subscribe(
            data => {
              this.eventService.sendMainSafe(new EventMessage(9, this.catalog));
            },
            errorData => {
              this.toastr.errorToastr(Constants.ERROR_SAVE, '');
            });
        break;
      case 'bank':
        this.marketService.saveBank(this.catalogGeneric)
          .subscribe(
            data => {
              this.eventService.sendMainSafe(new EventMessage(9, this.catalog));
            },
            errorData => {
              this.toastr.errorToastr(Constants.ERROR_SAVE, '');
            });
        break;
    }

  }

}
