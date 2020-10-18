import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from "@angular/router";
import { GlobalService } from 'src/app/core/globals/global.service';
import { Entity } from 'src/app/core/models/Entity';
import { Product } from 'src/app/safe/models/Product';
import { UnityProductSat } from 'src/app/safe/models/UnityProductSat';
import { Constants } from 'src/app/core/globals/Constants';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { UnityProduct } from 'src/app/safe/models/UnityProduct';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { MoneySat } from 'src/app/safe/models/MoneySat';
import { Money } from 'src/app/safe/models/Money';



@Component({
  selector: 'app-moneysEdit',
  templateUrl: './moneysEdit.component.html',
  styleUrls: ['./moneysEdit.component.scss']
})
export class MoneysEditComponent implements OnInit {
  moneyForm: FormGroup;
  entity: Entity;
  money: Money;
  moneySelect: Money;
  moneysSat: Array<MoneySat>
  count: number;
  constructor(
    public toastr: ToastrManager,
    private router: Router,
    private fb: FormBuilder,
    private globalService: GlobalService,
    private catalogService: CatalogService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.loadMoneysSat();
    this.moneyForm = this.fb.group({
      'code': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'active': new FormControl(false),
      'order': new FormControl('', Validators.required),
      'moneySat': new FormControl('', Validators.required)
    });
  }

  loadMoneysSat() {
    this.catalogService.getSat('money')
      .subscribe(
        data => {
          this.moneysSat = data;
          console.log(this.moneySelect);
            if (this.entity.readOnly) {
              this.moneySelect.moneySat = this.moneysSat.filter(unity =>
                unity.id === this.moneySelect.idMoneySat)[0];
              this.moneyForm.patchValue(this.moneySelect);
              this.moneyForm.disable()
            } else if (this.entity.edit) {
              this.moneySelect.moneySat = this.moneysSat.filter(unity =>
                unity.id === this.moneySelect.idMoneySat)[0];
              this.moneyForm.patchValue(this.moneySelect);
            } else {
              this.money = {} as Money;
            }
          console.log(this.moneySelect);
        },
        errorData => {
          console.log(errorData);
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Unidas de Producto');

        });
  }

  getTitle() {
    return ((this.entity.readOnly) ?
      "Consultar " : (this.entity.edit) ? "Editar " : "Agregar ") + " Moneda";
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }

  save(value) {
    this.money = value;
    this.money.id = (this.moneySelect !== null && this.moneySelect !== undefined &&
      this.moneySelect.id !== null && this.moneySelect.id !== undefined
    ) ? this.moneySelect.id : 0;
    this.money.save = this.entity.new;
    this.money.idMoneySat = this.money.moneySat.id;
    this.catalogService.saveMoney(this.money)
      .subscribe(
        data => {
          this.eventService.sendMainSafe(new EventMessage(16, null));
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_SAVE, '');
        });
  }

}
