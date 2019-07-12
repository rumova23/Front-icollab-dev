import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { Validate } from 'src/app/core/helpers/util.validator.';
import { Constants } from 'src/app/core/globals/Constants';
import { UseCfdiSat } from '../../models/UseCfdiSat';


@Component({
  selector: 'app-usesCfdiSat',
  templateUrl: './usesCfdiSat.component.html',
  styleUrls: ['./usesCfdiSat.component.scss']
})

export class UsesCfdiSatComponent implements OnInit {
  cols: any[];
  rowsPorPage = [50, 100, 250, 500];
  usesCfdiSat:Array<UseCfdiSat>;
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
      'forPhysicalPerson',
      "forMoralPerson"
    ];
  }

  private loadCatalog() {
    this.catalogService.getSat('useCfdi')
      .subscribe(
        data => {
          console.log(data);
          this.usesCfdiSat = data;
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Tasas Iva');
        });
  }

  getStatus(element) {
    return Validate(element.active) 
    ? element.active ? "Activo": "Inactivo": "Inactivo";
  }

  getForPhysicalPerson(element) {
    return Validate(element.forPhysicalPerson) 
    ? element.forPhysicalPerson ? "Sí": "No": "No";
  }

  getForMoralPerson(element) {
    return Validate(element.forMoralPerson) 
    ? element.forMoralPerson ? "Sí": "No": "No";
  }
}
