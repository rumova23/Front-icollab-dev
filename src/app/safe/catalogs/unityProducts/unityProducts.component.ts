import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MarketService } from '../../services/market.service';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { UnityProductSat } from '../../models/UnityProductSat';
import { Constants } from 'src/app/core/globals/Constants';
import { UnityProduct } from '../../models/UnityProduct';


@Component({
  selector: 'app-unityProducts',
  templateUrl: './unityProducts.component.html',
  styleUrls: ['./unityProducts.component.scss']
})

export class UnityProductsComponent implements OnInit {
  loading: boolean;
  cols: any[];
  filters = [
    { label: "Actividad", inputtype: "text" },
    { label: "Prefijo", inputtype: "text" },
    { label: "Activo", inputtype: "text" },
  ];
  filterBtn = { label: "buscar" };
  rowsPorPage = [50, 100, 250, 500];
  unityProductsSat: Array<UnityProductSat>
  unityProducts: Array<UnityProduct>
  count: number;
  constructor(
    private marketService: MarketService,
    public toastr: ToastrManager,
    private eventService: EventService,
    private globalService: GlobalService,
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.loadUnityProductsSat();
    this.cols = [
      'id',
      'name',
      'description',
      "ver",
      "modificar"
    ];
    this.loading = false;
  }

  loadUnityProductsSat() {
    this.marketService.loadUnityProductsSat(2)
      .subscribe(
        data => {
          this.unityProductsSat = data.resultado;
          console.log(this.unityProductsSat);
          this.loadUnityProducts();
        },
        errorData => {
          console.log(errorData);
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');

        });
  }

  loadUnityProducts() {
    this.marketService.loadUnityProducts(2)
      .subscribe(
        data => {
          this.unityProducts = data.resultado;
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
      EventMessage(6, { readOnly: false, edit: false, new: true, unityProduct: {} }));
  }

  action(unityProduct: UnityProduct, option: number) {
    switch (option) {
      case 2:
        this.eventService.sendMainSafe(new
          EventMessage(6, { readOnly: true, edit: false, new: false, unityProduct: unityProduct }));
        break;
      case 3:
        this.eventService.sendMainSafe(new
          EventMessage(6, { readOnly: false, edit: true, new: false, unityProduct: unityProduct }));
        break;
    }
  }

}
