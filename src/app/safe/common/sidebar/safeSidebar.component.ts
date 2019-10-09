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
  @Input() asideOpen;
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
            this.asideOpen = !this.asideOpen;
            break;
        }
      }
    });

  }
  ngOnInit() { }


  clickMenu(item) {
    let option = 0;
    let catalog: string = "";
    let typeWeather: string = "";
    let typeCharge: string = "";
    let typeEnergy: string = "";
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
      case 'Contrato Afectado':
        option = 9;
        catalog = "contractAffected";
        break;
      case 'Equipos':
        option = 9;
        catalog = "listEquipment";
        break;
      case 'Unidades de Generación':
        option = 9;
        catalog = "generationUnits";
        break;
      case 'Valores de Tolerancia':
        option = 9;
        catalog = "valuesTolerance";
        break;
      case 'Fuentes Generadoras':
        option = 9;
        catalog = "generatingSources";
        break;
      case 'Tipos de Despacho':
        option = 9;
        catalog = "typesOffice";
        break;
      case 'Tipos MEM':
        option = 9;
        catalog = "typesMem";
        break;
      case 'Estatus de Bitácora':
        option = 9;
        catalog = "statusBinnacle";
        break;
      case 'Estatus de Factura':
        option = 9;
        catalog = "statusInvoice";
        break;
      case 'Estatus de Pago Factura':
        option = 9;
        catalog = "statusInvoicePayment";
        break;
      case 'Estatus de Aprobación Bitácora':
        option = 9;
        catalog = "statusBinnacleApproval";
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
      case 'Facturas':
        option = 20;
        break;
      case 'Estado de Cuenta Diario':
        option = 22;
        break;
      case 'Tipos de Cambio':
        option = 25;
        break;
      case 'INPP':
        option = 26;
        break;
      case 'USPPI':
        option = 27;
        break;
      case 'Notas de Crédito':
        option = 28;
        break;
      case 'Notas de Débito':
        option = 30;
        break;
      case 'Carga Humedad':
        option = 32;
        typeWeather = "Humedad";
        break;
      case 'Carga Presión Barométrica':
        option = 32;
        typeWeather = "Presión Barométrica";
        break;
      case 'Carga Temperatura':
        option = 32;
        typeWeather = "Temperatura";
        break;
      case 'Consulta Clima':
        option = 33;
        break;
      case 'Carga Cargo Fijo':
        option = 34;
        typeCharge = "Cargo Fijo"
        break;
      case 'Carga Cargo Variable':
        option = 34;
        typeCharge = "Cargo Variable"
        break;
      case 'Carga Gas':
        option = 34;
        typeCharge = "Gas"
        break;
      case 'Carga HR / MW':
        option = 34;
        typeCharge = "HR / MW"
        break;
      case 'Carga Margen x MM':
        option = 34;
        typeCharge = "Margen x MM"
        break;
      case 'Carga Otros':
        option = 34;
        typeCharge = "Otros"
        break;
      case 'Consulta Cargos':
        option = 35;
        break;
      case 'Carga Poder Calorífico Inferior':
        option = 36;
        typeEnergy = "Poder Calorífico Inferior"
        break;
      case 'Carga Factor de Potencia':
        option = 36;
        typeEnergy = "Factor de Potencia"
        break;

        
      case 'Consulta Variables Energía':
        option = 37;
        break;
      case 'Modelo Matemático - Mercado':
          option = 38;
          break;
      case 'Modelo Matemático - PPA':
          option = 39;
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
    } else if (option == 32) {
      this.eventService.sendMainSafe(new EventMessage(option, typeWeather));
    } else if (option == 34) {
      this.eventService.sendMainSafe(new EventMessage(option, typeCharge));
    } else if (option == 36) {
      this.eventService.sendMainSafe(new EventMessage(option, typeEnergy));  
    } else {
      this.eventService.sendMainSafe(new EventMessage(option, item));
    }
  }


}
