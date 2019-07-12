import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { Constants } from 'src/app/core/globals/Constants';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { CatalogGeneric } from '../../models/CatalogGeneric';


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
  generics: Array<CatalogGeneric>;
  catalog: string;
  constructor(
    private catalogService: CatalogService,
    public toastr: ToastrManager,
    private eventService: EventService,
    private globalService: GlobalService,
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.cols = [
      'id',
      'code',
      'description',
      'order',
      "ver",
      "modificar"
    ];
    this.loading = false;
    this.loadData();
  }

  private loadData() {
    if (!this.catalog.includes("status")) {
      this.catalogService.get(this.catalog)
        .subscribe(
          data => {
            console.log(data);
            this.generics = data;
          },
          errorData => {
            console.log(errorData);
            this.toastr.errorToastr(Constants.ERROR_LOAD, 'Catálogos');

          });
    } else {
      this.catalogService.getStatus(this.getStatus(), 3)
        .subscribe(
          data => {
            console.log(data);
            this.generics = data;
          },
          errorData => {
            console.log(errorData);
            this.toastr.errorToastr(Constants.ERROR_LOAD, 'Catálogos');

          });
    }

  }

  getStatus() {
    let entity: string = "";
    switch (this.catalog) {
      case 'statusBinnacle':
        entity = "BINNACLE";
        break;
      case 'statusInvoice':
        entity = "INVOICE";
        break;
      case 'statusInvoicePayment':
        entity = "INVOICE_PAYMENT";
        break;
      case 'statusBinnacleApproval':
          entity = "BINNACLE_APPROVAL";
          break;  
    }
    return entity;
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
      case 'contractAffected':
        title = "Contrato Afectado";
        break;
      case 'listEquipment':
        title = "Equipos";
        break;
      case 'generationUnits':
        title = "Unidades de Generación";
        break;
      case 'valuesTolerance':
        title = "Valores de Tolerancia";
        break;
      case 'generatingSources':
          title = "Fuentes Generadoras";
          break;  
      case 'typesOffice':
        title = "Tipos de Despacho";
        break;
      case 'typesMem':
        title = "Tipos MEM";
        break;
      case 'statusBinnacle':
        title = "Estatus Bitaćora";
        break;
      case 'statusInvoice':
          title = "Estatus de Factura";
          break;  
      case 'statusInvoicePayment':
          title = "Estatus de Pago Factura";
          break;       
      case 'statusBinnacleApproval':
          title = "Estatus de Aprobación Bitácora";
          break;   

    }
    return title;
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }

  visible() {
    return this.catalog !== "typesMem" 
    && !this.catalog.includes('status');
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
