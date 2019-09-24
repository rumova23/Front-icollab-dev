import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MarketService } from '../../services/market.service';
import { Client } from '../../models/Client';
import { Constants } from 'src/app/core/globals/Constants';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventService } from 'src/app/core/services/event.service';
import { Invoice } from '../../models/Invoice';
import { CreditNote } from '../../models/CreditNote';



@Component({
  selector: 'app-creditNotes',
  templateUrl: './creditNotes.component.html',
  styleUrls: ['./creditNotes.component.scss']
})

export class CreditNotesComponent implements OnInit {
 
  loading: boolean;
  cols: any[];
  filters = [
    { label: "Actividad", inputtype: "text" },
    { label: "Prefijo", inputtype: "text" },
    { label: "Activo", inputtype: "text" },
  ];
  filterBtn = { label: "buscar" };
  rowsPorPage = [50, 100, 250, 500];
  creditNotes:Array<CreditNote>;
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
          this.getCreditNotes();
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Clientes');
        });
  }

  private getCreditNotes() {
    this.marketService.getCreditNotes(3)
      .subscribe(
        data => {
          this.creditNotes = data;

          for(var i = 0; i < this.creditNotes.length; i++) {
            this.creditNotes[i].client = this.clients.filter(entity =>
              entity.id ===  this.creditNotes[i].idClient)[0];
          }
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Notas de crédito');
        });
  }

  newEntity() {
    this.eventService.sendMainSafe(new
      EventMessage(29, { readOnly: false, edit: false, new: true, creditNote: {} }));
  }

  getStatus(entity: Client) {
    return (entity.active) ? "Activo " : "Inactivo";
  }

  action(creditNote: CreditNote, option: number) {
    switch (option) {
      case 2:
        this.eventService.sendMainSafe(new
          EventMessage(29, { readOnly: true, edit: false, new: false, creditNote: creditNote }));
        break;
      case 3:
        this.eventService.sendMainSafe(new
          EventMessage(29, { readOnly: false, edit: true, new: false, creditNote: creditNote }));
        break;
    }
  }

}
