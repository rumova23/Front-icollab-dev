import { Component }  from '@angular/core';
import { OnInit }     from '@angular/core';
import { trigger }    from '@angular/animations';
import { state }      from '@angular/animations';
import { style }      from '@angular/animations';
import { transition } from '@angular/animations';
import { animate }    from '@angular/animations';
import { Input }      from '@angular/core';

import { menuItem }      from './menuItem';
import { EventService }  from 'src/app/core/services/event.service';
import { EventMessage }  from 'src/app/core/models/EventMessage';
import { GlobalService } from 'src/app/core/globals/global.service';

@Component({
  selector    : 'app-menu-items'
 ,templateUrl : './menu-items.component.html'
 ,styleUrls   : ['./menu-items.component.scss']
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
export class MenuItemsComponent implements OnInit {

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
    console.log("menu-items.component.ts itemSelected(...");
    console.log(item.label);
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
        case 'Autoridades':
          option = 4;
          break;
        case 'Categorías':
          option = 6;
          data = item;
          break;  
        case 'Características':
          option = 8;
          data = item;
          break;

          case 'Personal Competente':
            option = 10;
            data = item;
            break;
          case 'legalAgreement':
            option = 12;
            data = item;
            break;



          case 'Cumplimiento Interno':

          break;



        default:
          option = 101;
          data = item;
      }


      this.eventService.sendMainCompliance(new EventMessage(option, data));
    }
  }


    

}
