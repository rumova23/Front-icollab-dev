import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { Validate } from 'src/app/core/helpers/util.validator.';
import { Constants } from 'src/app/core/globals/Constants';
import { PaymentWaySat } from '../../models/PaymentWaySat';


@Component({
  selector: 'app-paymentWaysSat',
  templateUrl: './paymentWaysSat.component.html',
  styleUrls: ['./paymentWaysSat.component.scss']
})

export class  PaymentWaysSatComponent implements OnInit {
  cols: any[];
  rowsPorPage = [50, 100, 250, 500];
  paymentWaysSat:Array<PaymentWaySat>;
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
      'active',
      'banked'
    ];
  }

  private loadCatalog() {
    this.catalogService.getSat('paymentWay')
      .subscribe(
        data => {
          this.paymentWaysSat = data;
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Formas de Pago');
        });
  }

  getStatus(element) {
    return Validate(element.active) 
    ? element.active ? "Activo": "Inactivo": "Inactivo";
  }

  getBanked(element) {
    return Validate(element.banked) 
    ? element.banked ? "Sí": "No": "No";
  }


}
