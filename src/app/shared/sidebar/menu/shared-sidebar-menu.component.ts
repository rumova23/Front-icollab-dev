import { Component           } from '@angular/core';
import { Input, ViewChildren } from '@angular/core';
import { ViewChild           } from '@angular/core';

import { GlobalService       } from 'src/app/core/globals/global.service';
import { SecurityService     } from 'src/app/core/services/security.service';
import { CollapseComponent   } from 'angular-bootstrap-md';

import { menuItem            } from '../items/menuItem';
import { MatSidenav          } from '@angular/material/sidenav';

@Component({
  selector    : 'app-shared-sidebar-menu',
  templateUrl : './shared-sidebar-menu.component.html'
})
export class SharedSidebarMenuComponent{
	@Input() item             : menuItem;
	@ViewChild('left')  left  : MatSidenav;
	@ViewChild('right') right : MatSidenav;  
	@ViewChildren(CollapseComponent) collapses: CollapseComponent[];
	
	menu : menuItem[];

	constructor(
		private globalService   : GlobalService,  
		private securityService : SecurityService
	) {
		let app   = globalService.app;
		this.menu = securityService.getMenu(app.name);
		if(this.menu == undefined || app.name == "Compliance" || app.name == "Administrative_monitoring"){
			this.hardcode(app.name);
		}
	}
	hardcode(name){
		switch (name) {
			case "Administrative_monitoring":
				this.hardcodeAdministrative_monitoring();
				break;
			case "Compliance":
				this.hardcodeCompliance();
				break;
			case "Mock_Up":
				this.hardcodemockUp();
				break;
			default:
				break;
		}
	}
	hardcodeAdministrative_monitoring(){
		/*this.menu = [
			{
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
			},
			{
			id: 'Fase 3',
			idFather:'',
			icon: 'pie_chart',
			label: 'Fase 3',
			url: 'Fase 3'
			},{
			id: 'Fase 2',
			idFather:'',
			icon: 'insert_chart',
			label: 'Fase 2',
			url: 'Fase 2'
			},{
			id: 'Mm Market',
			idFather:'',
			icon: 'insert_chart',
			label: 'Mm Market',
			url: 'Mm Market'
			}
		]; //*/
		this.menu.push({
			id: 'Mm Market',
			idFather:'',
			icon: 'insert_chart',
			label: 'Mm Market',
			url: 'Mm Market'
		});
	}
	hardcodeCompliance(){
		/*this.menu.push(
			{
				icon: "library_books",
				id: "1",
				idFather: "1",
				label: "legalAgreement",
				url: "legalAgreement",
				children:[
					{
						children:[],
						icon: "library_books",
						id: "2",
						idFather: "1",
						label: "legalAgreement",
						url: "legalAgreement"
					}
				],
			}
		);//*/
		
		  
	
		  let temp0:menuItem;
		  let flag0:boolean = true;
		  /*
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
		  }//*/
		  let mytemporalinicio = this.menu[2];
		  this.menu[2] = this.menu[1];
		  this.menu[1] = this.menu[0];
		  this.menu[0] = mytemporalinicio;
		  for (let option of this.menu) {
			  if(option.label == "Catálogos"){
				  let temporal = option.children[0];
				  option.children[0] = option.children[1];
				  option.children[1] = temporal;
			  }

			if (option.children){
			  let temp:menuItem;
			  let flag:boolean = true;
			  while ( flag ){
				
				flag = false;          
				for (let ins=0; ins < option.children.length; ins++) {
					/*
				  if ( parseInt(option.children[ins]['url']) > parseInt(option.children[ins+1]['url'])){
					temp = option.children[ins]; 
					option.children[ins] = option.children[ins + 1];
					option.children[ins + 1] = temp;
					flag = true;
				  }//*/
				  
				  if (option.children[ins]['label']=='Cumplimiento Legal'){
					if (!option.children[ins].children){
						
					  option.children[ins].children = new Array();
					  let childrenA:any  = {};
					  childrenA['label'] ="Características";
					  childrenA['icon']  ="gavel";
					  childrenA['url']  ="Características";
					  option.children[ins].children.push(childrenA);
					  let childrenB:any  = {};
					  childrenB['label'] ="Planeación";
					  childrenB['url'] ="Planeación";
					  childrenB['icon']  ="event_available";
					  //option.children[ins].children.push(childrenB);
					}
				  }
				  
				  if (option.children[ins]['label']=='Cumplimiento Adquisiciones'){
					
					if (!option.children[ins].children){
					  option.children[ins].children = new Array();
					  let childrenA:any  = {};
					  childrenA['label'] ="Personal Competente";
					  childrenA['url'] ="Personal Competente";
					  childrenA['icon']  ="person";
					  option.children[ins].children.push(childrenA);
					  let childrenB:any  = {};
					  childrenB['label'] ="Proveedor Calificado";
					  childrenB['url'] ="Proveedor Calificado";
					  childrenB['icon']  ="perm_contact_calendar";
					  option.children[ins].children.push(childrenB);
					  let childrenC:any  = {};
					  childrenC['label'] ="Dependencias y Organismos Aplicables";
					  childrenC['url'] ="Dependencias y Organismos Aplicables";
					  childrenC['icon']  ="business";
					  option.children[ins].children.push(childrenC);
					}
				  }
				}
			  }
			}
		  }
	}
	hardcodemockUp(){
		this.menu = [
			{
			  id:'Link-MockUp',
			  idFather:"",
			  label:'Link-MockUp',
			  icon:'/assets/images/skins/layer_7_ek1.png',
			  children:[
				{id:"1", idFather:"2", icon:"" ,label:"planned-powers-ppa"},
				{id:"1", idFather:"2", icon:"" ,label:"heat-rate-record"},
				{id:"1", idFather:"2", icon:"" ,label:"sales-offers"},
				{id:"1", idFather:"2", icon:"" ,label:"sales-offers-V2"},
				{id:"1", idFather:"2", icon:"" ,label:"registration-customer"},
				{id:"1", idFather:"2", icon:"" ,label:"Legal-Compliance"},
				{id:"1", idFather:"2", icon:"" ,label:"New Event"},
				{id:"1", idFather:"2", icon:"" ,label:"Monitoreo nivel 2"},
				{id:"1", idFather:"2", icon:"" ,label:"planned-powers-ppa-B"},
				{id:"1", idFather:"2", icon:"" ,label:"planned-powers-ppa-C"},
				{id:"1", idFather:"2", icon:"" ,label:"Potencias Planeadas del PPA por hora y por día y Potencia Planeada Máxima Real DemostradaD"},
				{id:"1", idFather:"2", icon:"" ,label:"Potencias Planeadas del PPA por hora y por día y Potencia Planeada Máxima Real DemostradaE"},
				{id:"1", idFather:"2", icon:"" ,label:"Planeación de variables"},
				{id:"1", idFather:"2", icon:"" ,label:"Potencias Planeadas del PPA por hora y por día y Potencia Planeada Máxima Real DemostradaG"},
				{id:"1", idFather:"2", icon:"" ,label:"Importación"},
				{id:"1", idFather:"2", icon:"" ,label:"planned-powers-ppa-"}
	
			  ]
			},
		  ];
	}

}
