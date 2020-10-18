import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Constants } from 'src/app/core/globals/Constants';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { Validate } from 'src/app/core/helpers/util.validator.';
import { FiscalRegimeSat } from '../../models/FiscalRegimeSat';


@Component({
  selector: 'app-fiscalRegimensSat',
  templateUrl: './fiscalRegimensSat.component.html',
  styleUrls: ['./fiscalRegimensSat.component.scss']
})

export class FiscalRegimensSatComponent implements OnInit {
  cols: any[];
  filterBtn = { label: "buscar" };
  rowsPorPage = [50, 100, 250, 500];
  count: number;
  fiscalRegimesSat:Array<FiscalRegimeSat>;
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
    this.catalogService.getSat('fiscalRegime')
      .subscribe(
        data => {
          this.fiscalRegimesSat = data;
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Fiscal Regimen');
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
