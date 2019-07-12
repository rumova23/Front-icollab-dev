import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { Validate } from 'src/app/core/helpers/util.validator.';
import { Constants } from 'src/app/core/globals/Constants';
import { TypeRelationSat } from '../../models/TypeRelationSat';

@Component({
  selector: 'app-typesRelationSat',
  templateUrl: './typesRelationSat.component.html',
  styleUrls: ['./typesRelationSat.component.scss']
})

export class TypesRelationSatComponent implements OnInit {
  cols: any[];
  rowsPorPage = [50, 100, 250, 500];
  typesRelationSat: Array<TypeRelationSat>;
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
    this.catalogService.getSat('typeRelation')
      .subscribe(
        data => {
          this.typesRelationSat = data;
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Tipos de relación SAT');
        });
  }

  getStatus(element) {
    return Validate(element.active)
      ? element.active ? "Activo" : "Inactivo" : "Inactivo";
  }

  getIncludeIvaTransfer(element) {
    return Validate(element.includeIvaTransfer)
      ? element.includeIvaTransfer ? "Sí" : "No" : "No";
  }

  getIncludeIepsTransfer(element) {
    return Validate(element.includeIepsTransfer)
      ? element.includeIepsTransfer ? "Sí" : "No" : "No";
  }
}
