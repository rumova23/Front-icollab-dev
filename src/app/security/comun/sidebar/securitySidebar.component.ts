import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from 'src/app/core/globals/global.service';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';

@Component({
  selector: 'app-securitySidebar',
  templateUrl: './securitySidebar.component.html',
  styleUrls: ['./securitySidebar.component.scss']
})
export class SecuritySidebarComponent implements OnInit {
  @Input() aside_open;
  menu = [
    {
      id: 1,
      label: 'Administración',
      icon: '/assets/images/skins/layer_7_ek1.png',
      children: [
        { id: 1,  label: 'Usuarios' },
        { id: 2,  label: 'Roles' },
        { id: 3,  label: 'Permisos' }
      ]
    }
  ];
  
  serviceSubscription: any;
  constructor(private globalService: GlobalService,
    private eventService: EventService) {
    this.serviceSubscription = this.eventService.onChangeMainSecurity.subscribe({
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
    switch(item.label) {
      case 'Usuarios':
      option = 3;
      break;
      case 'Roles':
      option = 5;
      break;
      case 'Permisos':
      option = 7;
      break;
    }
    this.eventService.sendMainSecurity(new EventMessage(option, item));
  }
}
