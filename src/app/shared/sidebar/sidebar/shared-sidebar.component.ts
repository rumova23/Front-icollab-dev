import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared-sidebar',
  templateUrl: './shared-sidebar.component.html',
  styleUrls: ['./shared-sidebar.component.scss']
})
export class SharedSidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getgender(){
    let generoId = JSON.parse(localStorage.getItem('user'));
    //console.log("generoId");
    //console.dir(generoId);  
    generoId = generoId['generoId'];
    //console.log("generoId");
    //console.dir(generoId);
    return generoId;
  }

}
