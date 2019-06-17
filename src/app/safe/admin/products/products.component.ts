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


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  loading: boolean;
  cols: any[];
  filters = [
    { label: "Actividad", inputtype: "text" },
    { label: "Prefijo", inputtype: "text" },
    { label: "Activo", inputtype: "text" },
  ];
  filterBtn = { label: "buscar" };
  rowsPorPage = [50, 100, 250, 500];
  products: Array<Product>;
  ratesIvaSat: Array<RateIvaSat>;
  count: number;
  constructor(
    private marketService: MarketService,
    public toastr: ToastrManager,
    private eventService: EventService,
    private globalService: GlobalService,
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.loadProducts();
    this.cols = [
      'id',
      'name',
      'description',
      'price',
      'active',
      "rateIvaTransfer",
      "ver",
      "modificar"
    ];
    this.loading = false;
  }

  private loadProducts() {
    this.marketService.loadProducts(2)
      .subscribe(
        data => {
          this.products = data.resultado;
          this.loadRatesIvaSat();
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
        });
  }

  private loadRatesIvaSat() {
    this.marketService.loadRatesIvaSat(2)
      .subscribe(
        data => {
          this.ratesIvaSat = data.resultado;
          for (var i = 0; i < this.products.length; i++) {
            this.products[i].rateIvaSat = this.ratesIvaSat.filter(entity =>
              entity.id === this.products[i].idRateIvaSat)[0];
          }
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
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
