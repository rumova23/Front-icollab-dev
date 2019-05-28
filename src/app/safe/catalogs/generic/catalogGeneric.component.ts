import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MarketService } from '../../services/market.service';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { Constants } from 'src/app/core/globals/Constants';


@Component({
  selector: 'app-catalogGeneric',
  templateUrl: './catalogGeneric.component.html',
  styleUrls: ['./catalogGeneric.component.scss']
})

export class CatalogGenericComponent implements OnInit {
  loading: boolean;
  cols: any[];
  filters = [
    { label: "Actividad", inputtype: "text" },
    { label: "Prefijo", inputtype: "text" },
    { label: "Activo", inputtype: "text" },
  ];
  filterBtn = { label: "buscar" };
  rowsPorPage = [50, 100, 250, 500];
  generics: Array<any>;
  catalog: string;
  constructor(
    private marketService: MarketService,
    public toastr: ToastrManager,
    private eventService: EventService,
    private globalService: GlobalService,
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.cols = [
      'id',
      'name',
      'active',
      "ver",
      "modificar"
    ];
    this.loading = false;
    this.loadData();
  }

  private loadData() {
    switch (this.catalog) {
      case 'sys':
        this.marketService.loadSystems(2)
          .subscribe(
            data => {
              this.generics = data.resultado;
            },
            errorData => {
              this.toastr.errorToastr(Constants.ERROR_LOAD, 'Sistemas');
            });
        break;
      case 'typeProduct':
        this.marketService.loadTypeProducts(2)
          .subscribe(
            data => {
              this.generics = data.resultado;
            },
            errorData => {
              this.toastr.errorToastr(Constants.ERROR_LOAD, 'Tipos de Producto');
            });
        break;
      case 'paymentCondition':
        this.marketService.loadPaymentConditions(2)
          .subscribe(
            data => {
              this.generics = data.resultado;
            },
            errorData => {
              this.toastr.errorToastr(Constants.ERROR_LOAD, 'Condiciones de Pago');
            });
        break;
      case 'typePerson':
        this.marketService.loadTypePersons(2)
          .subscribe(
            data => {
              this.generics = data.resultado;
            },
            errorData => {
              this.toastr.errorToastr(Constants.ERROR_LOAD, 'Tipos de Persona');
            });
        break;
      case 'typeClient':
        this.marketService.loadTypeClients(2)
          .subscribe(
            data => {
              this.generics = data.resultado;
            },
            errorData => {
              this.toastr.errorToastr(Constants.ERROR_LOAD, 'Tipos de Client');
            });
        break;
        case 'country':
            this.marketService.loadCountries(2)
              .subscribe(
                data => {
                  this.generics = data.resultado;
                },
                errorData => {
                  this.toastr.errorToastr(Constants.ERROR_LOAD, 'Países');
                });
            break;
          case 'bank':
              this.marketService.loadBanks(2)
                .subscribe(
                  data => {
                    this.generics = data.resultado;
                  },
                  errorData => {
                    this.toastr.errorToastr(Constants.ERROR_LOAD, 'Bancos');
                  });
              break;    
    }
  }

  getTitle() {
    let title: string = "";
    switch (this.catalog) {
      case 'sys':
        title = "Sistemas";
        break;
      case 'typeProduct':
        title = "Tipos de Producto";
        break;
      case 'paymentCondition':
        title = "Condiciones de Pago";
        break;
      case 'typePerson':
        title = "Tipos de Persona";
        break;
      case 'typeClient':
        title = "Tipos de Cliente";
        break; 
      case 'country':
            title = "Países";
            break;     
      case 'bank':
              title = "Bancos";
              break;         
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }

  newEntity() {
    this.eventService.sendMainSafe(new
      EventMessage(10, {
        readOnly: false, edit: false, new: true, generic: {},
        catalog: this.catalog
      }));
  }

  action(generic: any, option: number) {
    switch (option) {
      case 2:
        this.eventService.sendMainSafe(new
          EventMessage(10, {
            readOnly: true, edit: false, new: false, generic: generic,
            catalog: this.catalog
          }));
        break;
      case 3:
        this.eventService.sendMainSafe(new
          EventMessage(10, {
            readOnly: false, edit: true, new: false, generic: generic,
            catalog: this.catalog
          }));
        break;
    }
  }

}
