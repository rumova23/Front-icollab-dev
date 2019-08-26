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
      icon: 'business',
      label: 'Fase 3'
    },{
      id: 'Fase 2',
      idFather:'',
      icon: 'business',
      label: 'Fase 2'
    }
  ]; 
  constructor(private globalService: GlobalService,  
    private eventService: EventService,
    private securityService: SecurityService) {

      //this.menu = securityService.getMenu('Compliance');
       console.log("+++++++");
       console.dir(this.menu);
/*
      let temp0:menuItem;
      let flag0:boolean = true;
      while ( flag0 ){
        flag0 = false;          
        for (let ins=0; ins < this.menu.length -1; ins++) {
          if ( parseInt(this.menu[ins]['url']) > parseInt(this.menu[ins+1]['url'])){
            temp0 = this.menu[ins]; 
            this.menu[ins] = this.menu[ ins + 1];
            this.menu[ins + 1] = temp0;
            flag0 = true; 
          }
        }
      }

      for (let option of this.menu) {
        //console.log("option")
        //console.dir(option)
        if (option.children){
          let temp:menuItem;
          let flag:boolean = true;
          while ( flag ){
            flag = false;          
            for (let ins=0; ins < option.children.length -1; ins++) {
              if ( parseInt(option.children[ins]['url']) > parseInt(option.children[ins+1]['url'])){
                temp = option.children[ins]; 
                option.children[ins] = option.children[ins + 1];
                option.children[ins + 1] = temp;
                flag = true;
              }
                
              //console.log("++");
              //console.log(option.children[ins]['label']);
              if (option.children[ins]['label']=='Cumplimiento Legal'){
                if (!option.children[ins].children){
                  option.children[ins].children = new Array();
                  let childrenA:any  = {};
                  childrenA['label'] ="Características";
                  childrenA['icon']  ="gavel";
                  option.children[ins].children.push(childrenA);
                  let childrenB:any  = {};
                  childrenB['label'] ="Planeación";
                  childrenB['icon']  ="event_available";
                  option.children[ins].children.push(childrenB);
                }
              }

              if (option.children[ins]['label']=='Cumplimiento Adquisiciones'){
                if (!option.children[ins].children){
                  option.children[ins].children = new Array();
                  let childrenA:any  = {};
                  childrenA['label'] ="Personal Competente";
                  childrenA['icon']  ="person";
                  option.children[ins].children.push(childrenA);
                  let childrenB:any  = {};
                  childrenB['label'] ="Proveedor Calificado";
                  childrenB['icon']  ="perm_contact_calendar";
                  option.children[ins].children.push(childrenB);
                  let childrenC:any  = {};
                  childrenC['label'] ="Dependencias y Organismos Aplicables";
                  childrenC['icon']  ="business";
                  option.children[ins].children.push(childrenC);
                }
              }
            }
          }
          console.log("****  SALIENDO DEL while *****");
        }
      }
      console.dir(this.menu);
//*/
      this.serviceSubscription = this.eventService.onChangeMainMonitoring.subscribe({
        next: (event: EventMessage) => {
          switch (event.id) {
            case 1:
              this.aside_open = !this.aside_open;
              break;
          }
        }
      });
  }

  ngOnInit() {
  }

  @ViewChildren(CollapseComponent) collapses: CollapseComponent[];
  toggleMenu(i) {
    this.eventService.sendMainMonitoring(new EventMessage(1, null));
    this.collapses.forEach((collapse: CollapseComponent, index) => {
      (index == i) ? collapse.show() : collapse.hide();
    });
  }

}
