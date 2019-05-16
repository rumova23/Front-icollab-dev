import { Component, OnInit,Input } from '@angular/core';
import { GlobalService } from 'src/app/core/globals/global.service';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';

@Component({
  selector: 'app-complianceSidebar',
  templateUrl: './complianceSidebar.component.html',
  styleUrls: ['./complianceSidebar.component.scss']
})
export class ComplianceSidebarComponent implements OnInit {
  @Input() aside_open;
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
  ];
  serviceSubscription: any;
  constructor(private globalService: GlobalService,  
    private eventService: EventService) {
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
  
  clickMenu(item) {
    console.log(item);
    let option = 0;
    switch (item.label) {
      case 'Cambio de Password':
        option = 3;
        break;
    }
    this.eventService.sendMainCompliance(new EventMessage(option, item));
  }
}
