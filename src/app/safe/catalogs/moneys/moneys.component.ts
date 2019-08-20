import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { Constants } from 'src/app/core/globals/Constants';
import { State } from '../../models/State';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { Money } from '../../models/Money';


@Component({
  selector: 'app-moneys',
  templateUrl: './moneys.component.html',
  styleUrls: ['./moneys.component.scss']
})

export class MoneysComponent implements OnInit {
  loading: boolean;
  cols: any[];
  filters = [
    { label: "Actividad", inputtype: "text" },
    { label: "Prefijo", inputtype: "text" },
    { label: "Activo", inputtype: "text" },
  ];
  filterBtn = { label: "buscar" };
  rowsPorPage = [50, 100, 250, 500];
  moneys: Array<Money>;
  constructor(
    private catalogService: CatalogService,
    private toastr: ToastrManager,
    private eventService: EventService,
    public globalService: GlobalService,
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.loadCountries();
    this.cols = [
      'id',
      'code',
      'description',
      "ver",
      "modificar"
    ];
    this.loading = false;
  }

  loadCountries() {
    this.catalogService.loadMoneys(3)
      .subscribe(
        data => {
          console.log(data);
          this.moneys = data;
        },
        errorData => {
          console.log(errorData);
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Estados');

        });
  }

  newEntity() {
    this.eventService.sendMainSafe(new
      EventMessage(17, { readOnly: false, edit: false, new: true, money: {} }));
  }

  action(money: Money, option: number) {
    switch (option) {
      case 2:
        this.eventService.sendMainSafe(new
          EventMessage(17, { readOnly: true, edit: false, new: false, money: money }));
        break;
      case 3:
        this.eventService.sendMainSafe(new
          EventMessage(17, { readOnly: false, edit: true, new: false, money: money }));
        break;
    }
  }

}
