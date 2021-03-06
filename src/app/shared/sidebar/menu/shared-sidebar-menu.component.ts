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
                this.hardcodeAdministrative_monitoring(this.menu);
                break;
            case "Compliance":
                this.hardcodeCompliance(this.menu);
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
    hardcodeSafe(menu){
        menu.map((item, indice)=>{
            if(item.children && item.children.length > 0) {
                this.hardcodeSafe(item.children);
            }
            if (item.label == "Home")               item.order = 0;
            else if (item.label == "PPA")           item.order = 1;
                else if (item.label == "Data Mining")           item.order = 0;
                    else if (item.label == "Monitoring station")  item.order = 0;
                    else if (item.label == "Energy Meters")       item.order = 1;
                    else if (item.label == "Event Log")           item.order = 2;
                    else if (item.label == "Financial Indices")   item.order = 3;
                        else if (item.label == "Indices")   item.order = 0;
                            else if (item.label == "Financial")           item.order = 0;
                            else if (item.label == "Economic proposal")   item.order = 1;
                            else if (item.label == "Salary increase")     item.order = 2;
                        else if (item.label == "Costs")     item.order = 1;
                else if (item.label == "Data Quality")          item.order = 1;
                    else if (item.label == "Detection and Format Correction")           item.order = 0;
                        else if (item.label == "Supervision Station")           item.order = 0;
                        else if (item.label == "Energy Meters")           item.order = 1;
                    else if (item.label == "Detection and Correction by Procedure")     item.order = 1;
                        else if (item.label == "Supervision Station")     item.order = 0;
                        else if (item.label == "Energy Meters")           item.order = 1;
                else if (item.label == "Events Log")            item.order = 2;
                else if (item.label == "MM Out of Line")        item.order = 3;
                else if (item.label == "Billing" && item.idFather==121)         item.order = 4;
                else if (item.label == "PPA Catalogs")          item.order = 5;

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
                else if (item.label == "Billing" && item.idFather==122)         item.order = 2;
                else if (item.label == "Analytic")        item.order = 3;
            else if (item.label == "Configuration") item.order = 3;
            else item.order = indice+30;
        });
        this.ordenar(menu);
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
    hardcodeAdministrative_monitoring(menu) {
        /*
        this.menu.push({
            id: "hardcode",
            idFather: "",
            icon: "insert_chart",
            label: "phase 3v6",
            url: "phase3v6"
        });
        //*/
        
        menu.map((item, indice)=>{
            if(item.children && item.children.length > 0) {
                this.hardcodeAdministrative_monitoring(item.children);
            }
            if (item.label == "home")               item.order = 0;
            else if (item.label == "Phase2v1")     item.order = 1;
            else if (item.label == "phase 3")     item.order = 2;
            else if (item.label == "Dashboard 4")     item.order = 3;
            else if (item.label == "Dashboard 5")     item.order = 3;
          
            else item.order = indice+30;
        });
        this.ordenar(menu);
    }
    hardcodeCompliance(menu){
        menu.map((item, indice)=>{
            if(item.children && item.children.length > 0) {
                this.hardcodeCompliance(item.children);
            }
            if (item.label == "Home")               item.order = 0;
            else if (item.label == "Catálogos")     item.order = 1;
                else if (item.label == "authorities")     item.order = 0;
                else if (item.label == "categories")     item.order = 1;
            else if (item.label == "Cumplimiento Legal")     item.order = 2;
                else if (item.label == "Configuración de Cumplimiento")     item.order = 0;
                else if (item.label == "Aprobación / Generación de Tareas")     item.order = 1;
                else if (item.label == "Asignación de Responsabilidades" && item.id==202)     item.order = 2;
                else if (item.label == "Configuración de Planeación")     item.order = 3;
                else if (item.label == "Seguimiento de Tareas")     item.order = 4;
            else if (item.label == "Cumplimiento Interno")     item.order = 3;
                else if (item.label == "Configuración de Cumplimiento")     item.order = 0;
                else if (item.label == "Aprobación / Generacion de Tareas")     item.order = 1;
                else if (item.label == "Asignación de Responsabilidades" && item.id==207)     item.order = 2;
                else if (item.label == "Configuración de Planeación")     item.order = 3;
                else if (item.label == "Seguimiento de Tareas")     item.order = 4;
            else if (item.label == "legalAgreement")     item.order = 4;
            else if (item.label == "Cumplimiento Adquisiciones")     item.order = 5;
            else if (item.label == "Competencia de los Recursos")     item.order = 6;
                else if (item.label == "Personal")     item.order = 0;
                    else if (item.label == "Alta de Personal")     item.order = 0;
                    else if (item.label == "Evaluación de Competencias para el Personal")     item.order = 1;
                else if (item.label == "Proveedores")     item.order = 1;
                    else if (item.label == "Alta de Proveedores")     item.order = 0;
                    else if (item.label == "Evaluación de Proveedores")     item.order = 1;
                    else if (item.label == "Reevaluación de Proveedores")     item.order = 2;
            else item.order = indice+30;
        });
        this.ordenar(menu);
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
