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
  selector: 'app-branchCreditNoteSeries',
  templateUrl: './branchCreditNoteSeries.component.html',
  styleUrls: ['./branchCreditNoteSeries.component.scss']
})

export class BranchCreditNoteSeriesComponent implements OnInit {
  loading: boolean;
  cols: any[];
  rowsPorPage = [50, 100, 250, 500];
  systems: Array<CatalogOrderGeneric> = [];
  plantBranches : Array<PlantBranchOffice> = [];
  branchOfficeCreditNoteSeries: Array<BranchOfficeInvoiceSerie>;
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
          this.getBranchOfficeCreditNoteSeries();
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Sucursales de la planta');
        });
  }

  getBranchOfficeCreditNoteSeries() {
    this.marketService.getBranchOfficeInvoiceSeries()
      .subscribe(
        data => {
          this.branchOfficeCreditNoteSeries = data;
          console.log(this.branchOfficeCreditNoteSeries);
          for(var i = 0; i <  this.branchOfficeCreditNoteSeries.length; i++) {
            this.branchOfficeCreditNoteSeries[i].plantBranchOffice = 
              this.plantBranches.filter(entity =>
              entity.id ===  this.branchOfficeCreditNoteSeries[i].idPlantBranchOffice)[0];
              this.branchOfficeCreditNoteSeries[i].sys 
              = this.systems.filter(entity =>
                entity.id ===  this.branchOfficeCreditNoteSeries[i].idSys)[0];
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
      EventMessage(4, { readOnly: false, edit: false, new: true, user: {} }));
  }

  getStatus(entity: Product) {
    return (entity.active) ? "Activo " : "Inactivo";
  }

  action(product: Product, option: number) {
    switch (option) {
      case 2:
        this.eventService.sendMainSafe(new
          EventMessage(4, { readOnly: true, edit: false, new: false, product: product }));
        break;
      case 3:
        this.eventService.sendMainSafe(new
          EventMessage(4, { readOnly: false, edit: true, new: false, product: product }));
        break;
    }
  }

}
