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



@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.scss']
})

export class PlantsComponent implements OnInit {
 
  loading: boolean;
  cols: any[];
  filters = [
    { label: "Actividad", inputtype: "text" },
    { label: "Prefijo", inputtype: "text" },
    { label: "Activo", inputtype: "text" },
  ];
  filterBtn = { label: "buscar" };
  rowsPorPage = [50, 100, 250, 500];

  plants:Array<Plant>;

  constructor(private globalService: GlobalService,
    private marketService: MarketService,
    private securityService: SecurityService,
    private eventService: EventService,
    private toastr: ToastrManager) { }

  ngOnInit() {
    this.getPlant();
    this.cols = [
      'id',
      'name',
      "ver",
      "modificar"
    ];
    this.loading = false;
    
  }

  private getPlant() {
    this.securityService.getPlant(this.globalService.plantaDefaultId)
      .subscribe(
        data => {
          this.plants = data;
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Plantas');
        });
  }

  newEntity() {
    this.eventService.sendMainSafe(new
      EventMessage(8, { readOnly: false, edit: false, new: true, plant: {} }));
  }

  getStatus(entity: Client) {
    return (entity.active) ? "Activo " : "Inactivo";
  }

  action(plant: Plant, option: number) {
    switch (option) {
      case 2:
        this.eventService.sendMainSafe(new
          EventMessage(13, { readOnly: true, edit: false, new: false, plant: plant }));
        break;
      case 3:
        this.eventService.sendMainSafe(new
          EventMessage(13, { readOnly: false, edit: true, new: false, plant: plant }));
        break;
    }
  }

}
