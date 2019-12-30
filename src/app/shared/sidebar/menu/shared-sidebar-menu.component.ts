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
            || app.name == "Safe") {
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
                this.hardcodemockUp();
                break;
            case "Safe":
                this.hardcodeSafe();
                break;
            default:
                break;
        }
    }
    hardcodeSafe(){
        let item0 = null;
        let item1 = null;
        let item2 = null;
        let item3 = null;
        let array = [];
        for (let option of this.menu) {
            if (option.label == "Home") item0 = option;
            else if (option.label == "PPA") item1 = option;
            else if (option.label == "Market") item2 = option;
            else if (option.label == "Configuration") item3 = option;
            else array.push(option);
        }
        this.menu = [];
        this.menu[0] = item0;
        this.menu[1] = item1;
        this.menu[2] = item2;
        this.menu[3] = item3;
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
        this.menu.push({
            id: "Mm Market",
            idFather: "",
            icon: "insert_chart",
            label: "Mm Market",
            url: "Mm Market"
        });
    }
    hardcodeCompliance() {
        let item0 = null;
        let item1 = null;
        let item2 = null;
        let autoridades= null;
        let categorias = null;
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
        }

    }
    hardcodemockUp() {
        this.menu = [
            {
                id: "Link-MockUp",
                idFather: "",
                label: "Link-MockUp",
                icon: "/assets/images/skins/layer_7_ek1.png",
                children: [
                    { id: "1", idFather: "2", icon: "", label: "planned-powers-ppa" },
                    { id: "1", idFather: "2", icon: "", label: "heat-rate-record" },
                    { id: "1", idFather: "2", icon: "", label: "sales-offers" },
                    { id: "1", idFather: "2", icon: "", label: "sales-offers-V2" },
                    { id: "1", idFather: "2", icon: "", label: "registration-customer" },
                    { id: "1", idFather: "2", icon: "", label: "Legal-Compliance" },
                    { id: "1", idFather: "2", icon: "", label: "New Event" },
                    { id: "1", idFather: "2", icon: "", label: "Monitoreo nivel 2" },
                    { id: "1", idFather: "2", icon: "", label: "planned-powers-ppa-B" },
                    { id: "1", idFather: "2", icon: "", label: "planned-powers-ppa-C" },
                    { id: "1", idFather: "2", icon: "", label: "Potencias Planeadas del PPA por hora y por día y Potencia Planeada Máxima Real DemostradaD" },
                    { id: "1", idFather: "2", icon: "", label: "Potencias Planeadas del PPA por hora y por día y Potencia Planeada Máxima Real DemostradaE" },
                    { id: "1", idFather: "2", icon: "", label: "Planeación de variables" },
                    { id: "1", idFather: "2", icon: "", label: "Potencias Planeadas del PPA por hora y por día y Potencia Planeada Máxima Real DemostradaG" },
                    { id: "1", idFather: "2", icon: "", label: "Importación" },
                    { id: "1", idFather: "2", icon: "", label: "planned-powers-ppa-" }
                ]
            }
        ];
    }
}
