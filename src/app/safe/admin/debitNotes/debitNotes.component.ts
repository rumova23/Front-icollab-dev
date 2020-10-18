import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MarketService } from '../../services/market.service';
import { Client } from '../../models/Client';
import { Constants } from 'src/app/core/globals/Constants';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventService } from 'src/app/core/services/event.service';
import { Invoice } from '../../models/Invoice';
import { DebitNote } from '../../models/DebitNote';



@Component({
  selector: 'app-debitNotes',
  templateUrl: './debitNotes.component.html',
  styleUrls: ['./debitNotes.component.scss']
})

export class DebitNotesComponent implements OnInit {
 
  loading: boolean;
  cols: any[];
  filters = [
    { label: "Actividad", inputtype: "text" },
    { label: "Prefijo", inputtype: "text" },
    { label: "Activo", inputtype: "text" },
  ];
  filterBtn = { label: "buscar" };
  rowsPorPage = [50, 100, 250, 500];

  debitNotes:Array<DebitNote>;
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
          console.log(this.clients);
          this.getDebitNotes();
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
        });
  }

  private getDebitNotes() {
    this.marketService.getDebitNotes(3)
      .subscribe(
        data => {
          this.debitNotes = data;
          for(var i = 0; i < this.debitNotes.length; i++) {
            this.debitNotes[i].client = this.clients.filter(entity =>
              entity.id ===  this.debitNotes[i].idClient)[0];
          }
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Notas de débito');
        });
  }

  newEntity() {
    this.eventService.sendMainSafe(new
      EventMessage(31, { readOnly: false, edit: false, new: true, debitNote: {} }));
  }

  getStatus(entity: Client) {
    return (entity.active) ? "Activo " : "Inactivo";
  }

  action(debitNote: DebitNote, option: number) {
    switch (option) {
      case 2:
        this.eventService.sendMainSafe(new
          EventMessage(31, { readOnly: true, edit: false, new: false, debitNote: debitNote }));
        break;
      case 3:
        this.eventService.sendMainSafe(new
          EventMessage(31, { readOnly: false, edit: true, new: false, debitNote: debitNote }));
        break;
    }
  }

}
