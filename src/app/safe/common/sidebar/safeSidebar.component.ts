import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from 'src/app/core/globals/global.service';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { SecurityService } from 'src/app/core/services/security.service';
declare var $: any;

@Component({
  selector: 'app-safeSidebar',
  templateUrl: './safeSidebar.component.html',
  styleUrls: ['./safeSidebar.component.css']
})
export class SafeSidebarComponent implements OnInit {
  @Input() aside_open;
  /*
  menu = [
    {
      id: 'administración',
      label: 'Administración',
      icon: '/assets/images/skins/layer_7_ek1.png',
      children: [
        { label: 'Clientes' },
        { label: 'Productos' }
      ]
    },
    {
      id: 'cumplimiento',
      label: 'Cumplimiento de Adquisiciones',
      icon: '/assets/images/skins/layer_10_ek1.png',
      url: '/cumplimiento-adquisiciones',
      children: [
        { label: 'Personal Competente', url: '/cumplimiento-adquisiciones' }
      ]
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '/assets/images/skins/layer_14_ek1.png',
      url: '/dashboard-a',
      children: [
      ]
    },
    {
      id: 'cumplimientoLegal',
      label: 'Cumplimiento Legal',
      icon: '/assets/images/skins/layer_10_ek1.png',
      url: '/cumplimiento-legal',
      children: [
      ]
    }
  ]; */
  menu = [];
  serviceSubscription: any;
  constructor(private globalService: GlobalService,
    private eventService: EventService,
    private securityService: SecurityService) {
    this.menu = securityService.getMenu('Safe');
    this.serviceSubscription = this.eventService.onChangeMainSafe.subscribe({
      next: (event: EventMessage) => {
        switch (event.id) {
          case 1:
            this.aside_open = !this.aside_open;
            break;
        }
      }
    });

  }
  ngOnInit() { }


  clickMenu(item) {
    let option = 0;
    let catalog: string = "";
    switch (item.label) {
      case 'Servicios':
        option = 3;
        break;
      case 'Productos':
        option = 3;
        break;
      case 'Unidad de Productos':
        option = 5;
        break;
      case 'Clientes':
        option = 7;
        break;
      case 'Sistemas':
        option = 9;
        catalog = "sys";
        break;
      case 'Tipos de Cliente':
        option = 9;
        catalog = "typeClient";
        break;
      case 'Tipos de Producto':
        option = 9;
        catalog = "typeProduct";
        break;
      case 'Condiciones de Pago':
        option = 9;
        catalog = "paymentCondition";
        break;
      case 'Países':
        option = 9;
        catalog = "country";
        break;
      case 'Bancos':
        option = 9;
        catalog = "bank";
        break;
      case 'Pml':
        option = 11;
        break;
      case 'Planta':
        option = 12;
        break;
      case 'Plantas':
        option = 12;
        break;
      case 'Plantas':
        option = 12;
        break;
      case 'Estados':
        option = 14;
        break;
      case 'Monedas':
        option = 16;
        break;
      case 'Serie Facturas':
        option = 18;
        break;
      case 'Regímenes Fiscales SAT':
        option = 201;
        break;
      case 'Monedas SAT':
        option = 202;
        break;
      case 'Métodos de Pago SAT':
        option = 203;
        break;
      case 'Formas de Pago SAT':
        option = 204;
        break;
      case 'Productos SAT':
        option = 205;
        break;
      case 'Porcentajes de Iva':
        option = 206;
        break;
      case 'Unidades de Producto SAT':
        option = 207;
        break;
      case 'Usos CFDI SAT':
        option = 208;
        break;
      case 'Tipos de Relación SAT':
        option = 209;
        break;
    }
    if (option == 9) {
      this.eventService.sendMainSafe(new EventMessage(option, catalog));
    } else {
      this.eventService.sendMainSafe(new EventMessage(option, item));
    }
  }


}
