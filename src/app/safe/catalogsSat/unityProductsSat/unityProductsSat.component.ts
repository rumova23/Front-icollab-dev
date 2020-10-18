import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { Validate } from 'src/app/core/helpers/util.validator.';
import { Constants } from 'src/app/core/globals/Constants';
import { ProductSat } from '../../models/ProductSat';
import { UnityProductSat } from '../../models/UnityProductSat';

@Component({
  selector: 'app-unityProductsSat',
  templateUrl: './unityProductsSat.component.html',
  styleUrls: ['./unityProductsSat.component.scss']
})

export class  UnityProductsSatComponent implements OnInit {
  cols: any[];
  rowsPorPage = [50, 100, 250, 500];
  unityProductsSat:Array<UnityProductSat>;
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
    this.catalogService.getSat('unityProduct')
      .subscribe(
        data => {
          this.unityProductsSat = data;
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Unidades de Producto SAT');
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
