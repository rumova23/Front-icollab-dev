import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { Validate } from 'src/app/core/helpers/util.validator.';
import { Constants } from 'src/app/core/globals/Constants';
import { ProductSat } from '../../models/ProductSat';


@Component({
  selector: 'app-productsSat',
  templateUrl: './productsSat.component.html',
  styleUrls: ['./productsSat.component.scss']
})

export class  ProductsSatComponent implements OnInit {
  cols: any[];
  rowsPorPage = [50, 100, 250, 500];
  productsSat:Array<ProductSat>;
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
      'includeIvaTransfer',
      'includeIepsTransfer'
    ];
  }

  private loadCatalog() {
    this.catalogService.getSat('product')
      .subscribe(
        data => {
          this.productsSat = data;
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Productos');
        });
  }

  getStatus(element) {
    return Validate(element.active) 
    ? element.active ? "Activo": "Inactivo": "Inactivo";
  }

  getIncludeIvaTransfer(element) {
    return Validate(element.includeIvaTransfer) 
    ? element.includeIvaTransfer ? "Sí": "No": "No";
  }

  getIncludeIepsTransfer(element) {
    return Validate(element.includeIepsTransfer) 
    ? element.includeIepsTransfer ? "Sí": "No": "No";
  }
}
