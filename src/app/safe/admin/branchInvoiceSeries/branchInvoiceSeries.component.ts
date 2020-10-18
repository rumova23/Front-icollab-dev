import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MarketService } from '../../services/market.service';
import { Product } from '../../models/Product';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { Constants } from 'src/app/core/globals/Constants';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { PlantBranchOffice } from '../../models/PlantBranchOffice';
import { BranchOfficeInvoiceSerie } from '../../models/BranchOfficeInvoiceSerie';
import { CatalogOrderGeneric } from 'src/app/core/models/CatalogOrderGeneric';


@Component({
  selector: 'app-branchInvoiceSeries',
  templateUrl: './branchInvoiceSeries.component.html',
  styleUrls: ['./branchInvoiceSeries.component.scss']
})

export class BranchInvoiceSeriesComponent implements OnInit {
  loading: boolean;
  cols: any[];
  rowsPorPage = [50, 100, 250, 500];
  systems: Array<CatalogOrderGeneric> = [];
  plantBranches : Array<PlantBranchOffice> = [];
  branchOfficeInvoiceSeries: Array<BranchOfficeInvoiceSerie>;
  constructor(
    private marketService: MarketService,
    private catalogService: CatalogService,
    public toastr: ToastrManager,
    private eventService: EventService,
    public globalService: GlobalService,
  ) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.getSystems();
    this.cols = [
      'serie',
      'number',
      'plantBranchOffice',
      'sys',
      'active',
      'ver'
    ];
    this.loading = false;
  }

  private getSystems() {
    this.catalogService.get('sys')
      .subscribe(
        data => {
          this.systems = data;
          console.log(this.systems);
          this.getPlantBranches();
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Sistemas');
        });
  }

  getPlantBranches() {
    this.marketService.getPlantBranches(this.globalService.plantaDefaultId)
      .subscribe(
        data => {
          this.plantBranches = data;
          console.log(this.plantBranches);
          this.getBranchOfficeInvoiceSeries();
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Sucursales de la planta');
        });
  }

  getBranchOfficeInvoiceSeries() {
    this.marketService.getBranchOfficeInvoiceSeries()
      .subscribe(
        data => {
          this.branchOfficeInvoiceSeries = data;
          console.log(this.branchOfficeInvoiceSeries);
          for(var i = 0; i <  this.branchOfficeInvoiceSeries.length; i++) {
            this.branchOfficeInvoiceSeries[i].plantBranchOffice = 
              this.plantBranches.filter(entity =>
              entity.id ===  this.branchOfficeInvoiceSeries[i].idPlantBranchOffice)[0];
              this.branchOfficeInvoiceSeries[i].sys 
              = this.systems.filter(entity =>
                entity.id ===  this.branchOfficeInvoiceSeries[i].idSys)[0];
          }
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Sucursales de la planta');
        });
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }

  newEntity() {
    this.eventService.sendMainSafe(new
      EventMessage(19, { readOnly: false, edit: false, new: true, user: {} }));
  }

  getStatus(entity: Product) {
    return (entity.active) ? "Activo " : "Inactivo";
  }

  action(branchOfficeInvoiceSerie: BranchOfficeInvoiceSerie, option: number) {
    switch (option) {
      case 2:
        this.eventService.sendMainSafe(new
          EventMessage(19, { readOnly: true, edit: false, new: false, branchOfficeInvoiceSerie:branchOfficeInvoiceSerie }));
        break;
      case 3:
        this.eventService.sendMainSafe(new
          EventMessage(19, { readOnly: false, edit: true, new: false, branchOfficeInvoiceSerie: branchOfficeInvoiceSerie }));
        break;
    }
  }

}
