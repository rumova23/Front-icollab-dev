import { Component, OnInit,Input, ViewChildren } from '@angular/core';
import { ViewChild } from '@angular/core';

import { GlobalService } from 'src/app/core/globals/global.service';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { SecurityService } from 'src/app/core/services/security.service';
import { CollapseComponent } from 'angular-bootstrap-md';

import { menuItem }   from '../menuItems/monitoringMenuItem';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector     : 'app-monitoringSidebar'
  ,templateUrl : './monitoringSidebar.component.html'
})
export class MonitoringSidebarComponent implements OnInit {
  @Input() aside_open;
  serviceSubscription: any;

  @Input() item : menuItem;
  @ViewChild('left')  left  : MatSidenav;
  @ViewChild('right') right : MatSidenav;  
  //menu : menuItem[];
  
  menu : menuItem[]= [
    /*{
      id: 'Dashboard',
      idFather:'',
      icon: 'business',
      label: 'Dashboard',
      children: [
        { 
          id: 'Fase 3',
          idFather:'Dashboard',
          icon:'business',
          label:'Fase 3',
        },
      ]
    },//*/
    {
      id: 'Fase 3',
      idFather:'',
      icon: 'pie_chart',
      label: 'Fase 3'
    },{
      id: 'Fase 2',
      idFather:'',
      icon: 'insert_chart',
      label: 'Fase 2'
    },{
      id: 'Fase 2 Mockup',
      idFather:'',
      icon: 'insert_chart',
      label: 'Fase 2 Mockup'
    },{
      id: 'Mm Market',
      idFather:'',
      icon: 'insert_chart',
      label: 'Mm Market'
    }
  ]; 
  constructor(private globalService: GlobalService,  
    private eventService: EventService,
    private securityService: SecurityService) {

      //this.menu = securityService.getMenu('Compliance');
       console.log("+++++++");
       console.dir(this.menu);

  }

  ngOnInit() {
  }

  @ViewChildren(CollapseComponent) collapses: CollapseComponent[];


}
