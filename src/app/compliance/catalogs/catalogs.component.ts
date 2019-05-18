import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core/globals/global.service';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';

@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.scss']
})
export class CatalogsComponent implements OnInit {
  titulo: String = 'Catálogos';

  catalogos = [
    { label: "Catálogo de Autoridades", routerLink: "/catalogo/AUTORIDAD" },
    { label: "Catálogo de Categorías", routerLink: "/catalogo-actividades" },
    { label: "Configuración de Cumplimientos", routerLink: "/configuracion-cumplimiento" },
    /*
    {label:"Catálogo de Tipos de Cumplimiento" ,  routerLink:"/catalogo/TIPO_CUMPLIMIENTO"},
    {label:"Catálogo de Empleados" ,              routerLink:"/catalogo-empleados"},

    {label:"Catálogo de Clasificación de Actividades (zona maritima, vigencia del programa interno...)" , 
                                                  routerLink:"/catalogo-clasificacion-actividades"},

    {label:"Catálogo de Tipos de Aplicaciones" ,  routerLink:"/catalogo-tipo-aplicaciones"},
    {label:"Catálogo de Departamentos" ,          routerLink:"/catalogo-departamentos"},
    {label:"Catálogo de Períodos" ,               routerLink:"/catalogo-periodos"},
    {label:"Catálogo de Tipo de Días" ,           routerLink:"/catalogo-tipo-dias"},
    {label:"Tipo de Documentos Entregados" ,      routerLink:"/tipo-doc-entregados"},
    {label:"Estatus de Actividad" ,               routerLink:"/estatus-actividad"},
    */

  ];
  constructor(private globalService: GlobalService,
    private eventService: EventService) { }

  ngOnInit() {
  }

  selectCatalog(catalog) {
    console.log(catalog);
    let option = 0;
    switch(catalog.label) {
        case 'Catálogo de Autoridades':
        option = 4;
        break;
        case 'Catálogo de Categorías':
        option = 6;
        break;
        case 'Configuración de Cumplimientos':
        option = 8;
        break;
        
    }
    this.eventService.sendMainCompliance(new EventMessage(option, catalog));
  }

}
