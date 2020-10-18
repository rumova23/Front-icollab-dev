import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { Validate } from 'src/app/core/helpers/util.validator.';
import { Constants } from 'src/app/core/globals/Constants';
import { PaymentMethodSat } from '../../models/PaymentMethodSat';


@Component({
  selector: 'app-paymentMethodsSat',
  templateUrl: './paymentMethodsSat.component.html',
  styleUrls: ['./paymentMethodsSat.component.scss']
})

export class  PaymentMethodsSatComponent implements OnInit {
  cols: any[];
  rowsPorPage = [50, 100, 250, 500];
  paymentMethodsSat:Array<PaymentMethodSat>;
  constructor(
    private catalogService: CatalogService,
    public toastr: ToastrManager,
    private globalService: GlobalService,
  ) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.loadCatalog();
    this.cols = [
      'id',
      'name',
      'code',
      'active'
    ];
  }

  private loadCatalog() {
    this.catalogService.getSat('paymentMethod')
      .subscribe(
        data => {
          this.paymentMethodsSat = data;
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Métodos de Pago');
        });
  }

  getStatus(element) {
    return Validate(element.active) 
    ? element.active ? "Activo": "Inactivo": "Inactivo";
  }
}
