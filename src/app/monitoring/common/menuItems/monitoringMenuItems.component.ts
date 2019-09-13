import { Component }  from '@angular/core';
import { OnInit }     from '@angular/core';
import { trigger }    from '@angular/animations';
import { state }      from '@angular/animations';
import { style }      from '@angular/animations';
import { transition } from '@angular/animations';
import { animate }    from '@angular/animations';
import { Input }      from '@angular/core';

import { menuItem }      from './monitoringMenuItem';
import { EventService }  from 'src/app/core/services/event.service';
import { EventMessage }  from 'src/app/core/models/EventMessage';
import { GlobalService } from 'src/app/core/globals/global.service';

@Component({
  selector    : 'app-monitoringMenuItems'
 ,templateUrl : './monitoringMenuItems.component.html'
 ,styleUrls   : ['./monitoringMenuItems.component.scss']
 ,animations  : [
    trigger('icon180', [
      state('hide' ,style({ transform : 'rotate(-90deg)' }))
     ,state('view' ,style({ transform : 'rotate(180deg)' }))
     ,transition('view <=> hide',
        animate('225ms cubic-bezier(0.4 ,0.0 ,0.2 ,1)')
     )
    ])
  ]
})
export class MonitoringMenuItemsComponent implements OnInit {

  viewHide       : boolean = false;
  @Input() aside_open;
  @Input() item      : menuItem;
  @Input() deep      : number = 0;  
  indent             : number = 12;
  units              : string = 'px';

  constructor(private eventService: EventService
             ,public globalService: GlobalService) { }

  ngOnInit() {
  }

  itemSelected(item: menuItem) {
    let option = 0;
    let data = {};    
    if (item.children && item.children.length) {
      this.viewHide = !this.viewHide;
    }
    else{
      switch (item.label) {
        case 'Inicio':
          option = 101;
          data = item;
          break;
        case 'Fase 2':
          option = 2;
          break;
  
        case 'Fase 3':
          option = 3;
          break;
        case 'Fase 2 Mockup':
          option = 4;
          break;

        default:
          option = 101;
          data = item;
      }
      //console.log(item);
      //console.log(option);

      this.eventService.sendMainMonitoring(new EventMessage(option, data));
    }
  }


    

}
