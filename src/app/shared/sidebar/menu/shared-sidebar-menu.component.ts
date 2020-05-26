import { Component } from "@angular/core";
import { Input, ViewChildren } from "@angular/core";
import { ViewChild } from "@angular/core";

import { GlobalService } from "src/app/core/globals/global.service";
import { SecurityService } from "src/app/core/services/security.service";
import { CollapseComponent } from "angular-bootstrap-md";

import { menuItem } from "../items/menuItem";
import { MatSidenav } from "@angular/material/sidenav";

@Component({
    selector: "app-shared-sidebar-menu",
    templateUrl: "./shared-sidebar-menu.component.html"
})
export class SharedSidebarMenuComponent {
    @Input() item: menuItem;
    @ViewChild("left") left: MatSidenav;
    @ViewChild("right") right: MatSidenav;
    @ViewChildren(CollapseComponent) collapses: CollapseComponent[];

    menu: menuItem[];

    constructor(private globalService: GlobalService, private securityService: SecurityService) {
        let app = globalService.app;
        this.menu = securityService.getMenu(app.name);
        if (this.menu == undefined 
            || app.name == "Compliance" 
            || app.name == "Administrative_monitoring"
            || app.name == "Safe"
            || app.name == "Default"
            || app.name == "Efh") {
            this.hardcode(app.name);
        }
    }
    hardcode(name) {
        switch (name) {
            case "Administrative_monitoring":
                this.hardcodeAdministrative_monitoring();
                break;
            case "Compliance":
                this.hardcodeCompliance();
                break;
            case "Mock_Up":
            case "Default":
                this.hardcodemockUp();
                break;
            case "Safe":
                this.hardcodeSafe(this.menu);
                break;
            case "Efh":
                this.hardcodeEfh();
                break;
            default:
                break;
        }
    }
    ordenar(lst){
        lst.sort((a,b)=>{
            if (a['order'] > b['order']) {
                return 1;
            }
            if (a['order'] < b['order']) {
                return -1;
            }
            return 0;
        });
    }
    setOrderSafe(menu){
        menu.map((item, indice)=>{
            if(item.children && item.children.length > 0) {
                this.setOrderSafe(item.children);
            }
            if (item.label == "Home")               item.order = 0;
            else if (item.label == "PPA")           item.order = 1;
            
                else if (item.label == "Data Mining")           item.order = 0;
                else if (item.label == "Data Quality")          item.order = 1;
                    else if (item.label == "Detection and Format Correction")           item.order = 0;
                    else if (item.label == "Detection and Correction by Procedure")     item.order = 1;


            else if (item.label == "Market")        item.order = 2;
                else if (item.label == "Planning")        item.order = 0;
                    else if (item.label == "Environmental Variables") item.order = 0;
                    else if (item.label == "Energy Variables")        item.order = 1;
                    else if (item.label == "Charges and Costs")       item.order = 2;
                    else if (item.label == "MDA" && item.idFather==127) item.order = 3;
                else if (item.label == "Projection")      item.order = 1;
                    else if (item.label == "MDA" && item.idFather==128)   item.order = 0;
                        else if (item.label == "Oferta MDA Aceptada Participante") item.order = 0;
                        else if (item.label == "Resultados MDA CENACE")   item.order = 1;
                    else if (item.label == "MTR") item.order = 1;
                        else if (item.label == "Proyeccion MTR Participante") item.order = 0;
                        else if (item.label == "MTR Participante")            item.order = 1;
                        else if (item.label == "MTR CENACE")         item.order = 2;
                else if (item.label == "Billing")         item.order = 2;
                else if (item.label == "Analytic")        item.order = 3;
            else if (item.label == "Configuration") item.order = 3;
            else item.order = indice+30;
        });
        this.ordenar(menu);
    }
    hardcodeSafe(menu){
        this.setOrderSafe(menu);
        
        this.menu.push({
            id: "hardcode",
            idFather: "",
            icon: "insert_chart",
            label: "New Event",
            url: "SafeNewEventComponent"
        });

        console.log(menu);     
    }
    hardcodeEfh() {
        let item0 = null;
        let item1 = null;
        let item2 = null;
        let array = [];
        for (let option of this.menu) {
            if (option.label == "Inicio") item0 = option;
            else if (option.label == "Catálogos") item1 = option;
            else if (option.label == "Configuración") item2 = option;
            else array.push(option);
        }
        this.menu = [];
        this.menu[0] = item0;
        this.menu[1] = item1;
        this.menu[2] = item2;
        for (const iterator of array) {
            this.menu.push(iterator);
        }


        for (let option of this.menu) {
            if (option.label == "Market") {
                for (let cat of option.children) {
                    if (cat.label == "Billing") {
                        let facturas = null;
                        let notasdecredito = null;
                        let notasdedebito = null;
                        let estadosdecuenta = null;
                        for (let cat3 of cat.children) {
                            if (cat3.label == "Facturas") {
                                facturas = cat3;
                            }else if(cat3.label == "Notas de Crédito"){
                                notasdecredito = cat3;
                            }else if(cat3.label == "Notas de Débito"){
                                notasdedebito = cat3;
                            }else if(cat3.label == "Account statements"){
                                estadosdecuenta = cat3;
                            }

                        }
                        cat.children=[];
                        cat.children.push(facturas);
                        cat.children.push(notasdecredito);
                        cat.children.push(notasdedebito);
                        cat.children.push(estadosdecuenta);
                    }
                }
            }
        }
    }
    hardcodeAdministrative_monitoring() {
        ///*

        this.menu.push({
            id: "hardcode",
            idFather: "",
            icon: "insert_chart",
            label: "phase 3v6",
            url: "phase3v6"
        });

        
        //*/
    }
    hardcodeCompliance() {
        let item0 = null;
        let item1 = null;
        let item2 = null;
        let autoridades= null;
        let categorias = null;
        let personal = null;
        let proveedores = null;
        let altaProveedores = null;
        let evaluacionProveedores = null;
        let reevaluacionProveedores = null;
        let array = [];
        for (let option of this.menu) {
            if (option.label == "Home") item0 = option;
            else if (option.label == "Catálogos") item1 = option;
            else if (option.label == "Configuración de Cumplimientos Legales") item2 = option;
            else array.push(option);
        }
        this.menu = [];
        this.menu[0] = item0;
        this.menu[1] = item1;
        this.menu[2] = item2;
        for (const iterator of array) {
            this.menu.push(iterator);
        }
        
        for (let option of this.menu) {
            if (option.label == "Catálogos") {
                for (let cat of option.children) {
                    if (cat.label == "authorities") {
                        autoridades = cat;
                    }else if (cat.label == "categories") {
                        categorias =cat;
                    }
                }
                option.children=[];
                option.children.push(autoridades);
                option.children.push(categorias);
            }
            if (option.label == "Competencia de los Recursos") {
                for (let cat of option.children) {
                    if (cat.label == "Personal") {
                        personal = cat;
                    }else if (cat.label == "Proveedores") {
                        for(let submenu of cat.children) {
                            if (submenu.label == "Alta de Proveedores") {
                                altaProveedores = submenu;
                            } else if (submenu.label == "Evaluación de Proveedores") {
                                evaluacionProveedores = submenu;
                            } else if (submenu.label == "Reevaluación de Proveedores") {
                                reevaluacionProveedores = submenu;
                            }
                        }
                        cat.children = [];
                        cat.children.push(altaProveedores);
                        cat.children.push(evaluacionProveedores);
                        cat.children.push(reevaluacionProveedores);

                        proveedores = cat;
                    }
                }
                option.children=[];
                option.children.push(personal);
                option.children.push(proveedores);
            }
        }

    }
    hardcodemockUp() {
        /*
        this.menu = [
            
            { id: "1", idFather: "", icon: "",url:"", label: "planned-powers-ppa" },
            { id: "1", idFather: "", icon: "",url:"", label: "heat-rate-record" },
            { id: "1", idFather: "", icon: "",url:"", label: "sales-offers" },
            { id: "1", idFather: "", icon: "",url:"", label: "sales-offers-V2" },
            { id: "1", idFather: "", icon: "",url:"", label: "registration-customer" },
            { id: "1", idFather: "", icon: "",url:"", label: "Legal-Compliance" },
            { id: "1", idFather: "", icon: "",url:"", label: "New Event" },
            { id: "1", idFather: "", icon: "",url:"", label: "Monitoreo nivel 2" },
            { id: "1", idFather: "", icon: "",url:"", label: "planned-powers-ppa-B" },
            { id: "1", idFather: "", icon: "",url:"", label: "planned-powers-ppa-C" },
            { id: "1", idFather: "", icon: "",url:"", label: "Potencias Planeadas del PPA por hora y por día y Potencia Planeada Máxima Real DemostradaD" },
            { id: "1", idFather: "", icon: "",url:"", label: "Potencias Planeadas del PPA por hora y por día y Potencia Planeada Máxima Real DemostradaE" },
            { id: "1", idFather: "", icon: "",url:"", label: "Planeación de variables" },
            { id: "1", idFather: "", icon: "",url:"", label: "Potencias Planeadas del PPA por hora y por día y Potencia Planeada Máxima Real DemostradaG" },
            { id: "1", idFather: "", icon: "",url:"", label: "Importación" },
            { id: "1", idFather: "", icon: "",url:"", label: "planned-powers-ppa-" }
    
        ];//*/
        
        this.menu = [
            
            { id: "1", idFather: "", icon: "view_quilt",url:"Components", label: "Components" },
    
        ];
    }
}
