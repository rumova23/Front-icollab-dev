import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MarketService } from '../../services/market.service';
import { Client } from '../../models/Client';
import { Constants } from 'src/app/core/globals/Constants';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventService } from 'src/app/core/services/event.service';
import { Plant } from 'src/app/security/models/Plant';
import { SecurityService } from 'src/app/core/services/security.service';
import { Invoice } from '../../models/Invoice';



@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})

export class InvoicesComponent implements OnInit {
  loading: boolean;
  cols: any[];
  filters = [
    { label: "Actividad", inputtype: "text" },
    { label: "Prefijo", inputtype: "text" },
    { label: "Activo", inputtype: "text" },
  ];
  filterBtn = { label: "buscar" };
  rowsPorPage = [50, 100, 250, 500];

  invoices:Array<Invoice>;
  clients:Array<Client>;

  constructor(public globalService: GlobalService,
    private marketService: MarketService,
    private eventService: EventService,
    private toastr: ToastrManager) { }

  ngOnInit() {
    this.getClients();
    this.cols = [
      'id',
      'invoice',
      'date',
      'client',
      'ver'
    ];
    this.loading = false;
    
  }

  private getClients() {
    this.marketService.getClients(3)
      .subscribe(
        data => {
          this.clients = data;
          this.getInvoices();
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
        });
  }

  private getInvoices() {
    this.marketService.getInvoices(3)
      .subscribe(
        data => {
          this.invoices = data;
          for(var i = 0; i < this.invoices.length; i++) {
            this.invoices[i].client = this.clients.filter(entity =>
              entity.id ===  this.invoices[i].idClient)[0];
          }
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Facturas');
        });
  }

  newEntity() {
    this.eventService.sendMainSafe(new
      EventMessage(21, { readOnly: false, edit: false, new: true, plant: {} }));
  }

  getStatus(entity: Client) {
    return (entity.active) ? "Activo " : "Inactivo";
  }

   action(invoice: Invoice, option: number) {
    switch (option) {
      case 2:
        this.eventService.sendMainSafe(new
          EventMessage(21, { readOnly: true, edit: false, new: false, invoice: invoice }));
        break;
      case 3:
        this.eventService.sendMainSafe(new
          EventMessage(21, { readOnly: false, edit: true, new: false, invoice: invoice }));
        break;
    }
  }

}
