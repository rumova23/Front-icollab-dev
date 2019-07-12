import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { Validate } from 'src/app/core/helpers/util.validator.';
import { Constants } from 'src/app/core/globals/Constants';
import { RateIvaSat } from '../../models/RateIvaSat';


@Component({
  selector: 'app-ratesIvaSat',
  templateUrl: './ratesIvaSat.component.html',
  styleUrls: ['./ratesIvaSat.component.scss']
})

export class RatesIvaSatComponent implements OnInit {
  cols: any[];
  rowsPorPage = [50, 100, 250, 500];
  ratesIvaSat:Array<RateIvaSat>;
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
      'active',
      'exempt',
      'percentageIva'
    ];
  }

  private loadCatalog() {
    this.catalogService.getSat('rateIva')
      .subscribe(
        data => {
          this.ratesIvaSat = data;
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Tasas Iva');
        });
  }

  getStatus(element) {
    return Validate(element.active) 
    ? element.active ? "Activo": "Inactivo": "Inactivo";
  }

  getExempt(element) {
    return Validate(element.exempt) 
    ? element.exempt ? "Sí": "No": "No";
  }
}
