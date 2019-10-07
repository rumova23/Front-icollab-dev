import { Component         } from '@angular/core';
import { GlobalService     } from 'src/app/core/globals/global.service';

@Component({
  selector    : 'app-shared-sidebar',
  templateUrl : './shared-sidebar.component.html'
})
export class SharedSidebarComponent{

  constructor( public  globalService : GlobalService) { }

  getgender(){
    let generoId = JSON.parse(localStorage.getItem('user'));
    generoId = generoId['generoId'];
    return generoId;
  }

}
