import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MarketService } from '../../services/market.service';
import { Client } from '../../models/Client';
import { Constants } from 'src/app/core/globals/Constants';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventService } from 'src/app/core/services/event.service';



@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})

export class ClientsComponent implements OnInit {
 
  loading: boolean;
  cols: any[];
  filters = [
    { label: "Actividad", inputtype: "text" },
    { label: "Prefijo", inputtype: "text" },
    { label: "Activo", inputtype: "text" },
  ];
  filterBtn = { label: "buscar" };
  rowsPorPage = [50, 100, 250, 500];
  clients:Array<Client>;
  constructor(public globalService: GlobalService,
    private marketService: MarketService,
    private eventService: EventService,
    private toastr: ToastrManager) { }

  ngOnInit() {
    this.getClients();
    this.cols = [
      'id',
      'number',
      'classification',
      'businessGroup',
      'commercialBusiness',
      "tradename",
      "ver",
      "modificar"
    ];
    this.loading = false;
    
  }

  private getClients() {
    this.marketService.getClients(3)
      .subscribe(
        data => {
          this.clients = data;
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
        });
  }

  newEntity() {
    this.eventService.sendMainSafe(new
      EventMessage(8, { readOnly: false, edit: false, new: true, client: {} }));
  }

  getStatus(entity: Client) {
    return (entity.active) ? "Activo " : "Inactivo";
  }

  action(client: Client, option: number) {
    switch (option) {
      case 2:
        this.eventService.sendMainSafe(new
          EventMessage(8, { readOnly: true, edit: false, new: false, client: client }));
        break;
      case 3:
        this.eventService.sendMainSafe(new
          EventMessage(8, { readOnly: false, edit: true, new: false, client: client }));
        break;
    }
  }

}
