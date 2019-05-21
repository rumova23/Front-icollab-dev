import { Component, OnInit,Input } from '@angular/core';
import { GlobalService } from 'src/app/core/globals/global.service';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { SecurityService } from 'src/app/core/services/security.service';

@Component({
  selector: 'app-complianceSidebar',
  templateUrl: './complianceSidebar.component.html',
  styleUrls: ['./complianceSidebar.component.scss']
})
export class ComplianceSidebarComponent implements OnInit {
  @Input() aside_open;
  /*
  menu = [
    {
      id:'catalogos',
      label:'Catálogos',
      icon:'/assets/images/skins/layer_7_ek1.png',
      url:'/catalogos',
      children:[
        {label:'Catálogo de Autoridades'},
        {label:'Catálogo de Categorías'},
        {label:'Configuración de Cumplimientos'},
        {label:'Cambio de Password'},
      ]
    },
    {
      id:'cumplimiento',
      label:'Cumplimiento de Adquisiciones',
      icon:'/assets/images/skins/layer_10_ek1.png',
      url:'/cumplimiento-adquisiciones',
      children:[
        {label:'Personal Competente',url:'/cumplimiento-adquisiciones'}
      ]
    },
    {
      id:'dashboard',
      label:'Dashboard',
      icon:'/assets/images/skins/layer_14_ek1.png',
      url:'/dashboard-a',
      children:[
      ]
    },
    {
      id:'cumplimientoLegal',
      label:'Cumplimiento Legal',
      icon:'/assets/images/skins/layer_10_ek1.png',
      url:'/cumplimiento-legal',
      children:[
      ]
    }
  ]; */
  menu = [];
  serviceSubscription: any;
  constructor(private globalService: GlobalService,  
    private eventService: EventService,
    private securityService: SecurityService) {
      this.menu = securityService.getMenu('Compliance');
      this.serviceSubscription = this.eventService.onChangeMainCompliance.subscribe({
        next: (event: EventMessage) => {
          switch (event.id) {
            case 1:
              this.aside_open = !this.aside_open;
              break;
          }
        }
      });

     }
  ngOnInit() {}
  
  toggleMenu() {
    this.eventService.sendMainCompliance(new EventMessage(1, null))
  }
  clickMenu(item) {
    console.log(item);
    let option = 0;
    let data = {};
    switch (item.label) {
      case 'Catálogos':
        option = 3;
        data = item;
        break;
      case 'Catálogo de Autoridades':
        option = 4;
        break;  
      case 'Catálogo de Categorías':
        option = 6;
        data = item;
        break;  
      case 'Configuración de Cumplimientos':
        option = 8;
        data = item;
        break;    
    }
    this.eventService.sendMainCompliance(new EventMessage(option, data));
  }
}
