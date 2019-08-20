import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MarketService } from '../../services/market.service';
import { Product } from '../../models/Product';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { Constants } from 'src/app/core/globals/Constants';
import { RateIvaSat } from '../../models/RateIvaSat';
import { CatalogOrder } from 'src/app/core/models/CatalogOrder';
import { CatalogOrderFind } from 'src/app/core/models/CatalogOrderFind';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { Fuecd } from '../../models/Fuecd';


@Component({
  selector: 'app-fuecd',
  templateUrl: './fuecd.component.html',
  styleUrls: ['./fuecd.component.scss']
})

export class FuecdComponent implements OnInit {
  loading: boolean;
  cols: any[];
  filters = [
    { label: "Actividad", inputtype: "text" },
    { label: "Prefijo", inputtype: "text" },
    { label: "Activo", inputtype: "text" },
  ];
  filterBtn = { label: "buscar" };
  rowsPorPage = [50, 100, 250, 500];
  fuecd: Array<Fuecd>;
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
    this.getFuecds();
    this.cols = [
      'id',
      'fuecd',
      'competitorKey',
      'subcuentKey',
      'dateOperation',
      "dateEmission",
      "systemKey",
      "invoice"
    ];
    this.loading = false;
  }

  private getFuecds() {
    this.marketService.getFuecds()
      .subscribe(
        data => {
          this.fuecd = data;
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'FUECD');
        });
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }

  newEntity() {
    this.eventService.sendMainSafe(new
      EventMessage(23, { readOnly: false, edit: false, new: true, user: {} }));
  }

  invoice(fuecd) {
    this.eventService.sendMainSafe(new
      EventMessage(24, { readOnly: false, edit: false, new: true, fuecd: fuecd }));
  }

}
