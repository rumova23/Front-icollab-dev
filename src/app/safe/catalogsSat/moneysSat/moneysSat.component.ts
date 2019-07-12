import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { Validate } from 'src/app/core/helpers/util.validator.';
import { MoneySat } from '../../models/MoneySat';
import { Constants } from 'src/app/core/globals/Constants';


@Component({
  selector: 'app-moneysSat',
  templateUrl: './moneysSat.component.html',
  styleUrls: ['./moneysSat.component.scss']
})

export class MoneysSatComponent implements OnInit {
  cols: any[];
  rowsPorPage = [50, 100, 250, 500];
  count: number;
  moneysSat:Array<MoneySat>;
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
      'decimals',
      "percentageVariation"
    ];
  }

  private loadCatalog() {
    this.catalogService.getSat('money')
      .subscribe(
        data => {
          console.log(data);
          this.moneysSat = data;
          console.log(this.moneysSat);
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Monedas');
        });
  }

  getStatus(element) {
    return Validate(element.active) 
    ? element.active ? "Activo": "Inactivo": "Inactivo";
  }

}
