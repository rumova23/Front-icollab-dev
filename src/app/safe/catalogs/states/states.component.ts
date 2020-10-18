import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { Constants } from 'src/app/core/globals/Constants';
import { Country } from '../../models/Country';
import { State } from '../../models/State';
import { CatalogService } from 'src/app/core/services/catalog.service';


@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})

export class StatesComponent implements OnInit {
  loading: boolean;
  cols: any[];
  filters = [
    { label: "Actividad", inputtype: "text" },
    { label: "Prefijo", inputtype: "text" },
    { label: "Activo", inputtype: "text" },
  ];
  filterBtn = { label: "buscar" };
  rowsPorPage = [50, 100, 250, 500];
  countries: Array<Country>;
  states: Array<State>;
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
    this.catalogService.loadStates(0, 3)
      .subscribe(
        data => {
          console.log(data);
          this.states = data;
        },
        errorData => {
          console.log(errorData);
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Estados');

        });
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }

  newEntity() {
    this.eventService.sendMainSafe(new
      EventMessage(15, { readOnly: false, edit: false, new: true, state: {} }));
  }

  action(state: State, option: number) {
    switch (option) {
      case 2:
        this.eventService.sendMainSafe(new
          EventMessage(15, { readOnly: true, edit: false, new: false, state: state }));
        break;
      case 3:
        this.eventService.sendMainSafe(new
          EventMessage(15, { readOnly: false, edit: true, new: false, state: state }));
        break;
    }
  }

}
