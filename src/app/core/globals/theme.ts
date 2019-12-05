import { Injectable } from '@angular/core';
import { SecurityService } from 'src/app/core/services/security.service';
import { GlobalService } from './global.service';


@Injectable({
  providedIn: 'root'
})
export class ThemeService {
    constructor(
        public globalService:GlobalService,
        public securityService: SecurityService
    ) { }
    
    getLogo(){     
        let plant = this.globalService.plant;
        let logo = "";
        switch(plant.name){
            case "AGUILA":
                logo ="/assets/images/skins/shape_1.png";
            break;
            case "SOL":
                logo ="/assets/images/skins/logobotonsol.png";
            break;
        }
        //return plant.logo; // lo ideal

        return logo;
    }
    getNameLabel(){
        let plant = this.globalService.plant;
        let label = "";
        switch(plant.name){
            case "AGUILA":
                label ="EAT";
            break;
            case "SOL":
                label ="EST";
            break;
        }
        //return plant.label; // lo ideal
        return label;
    }
    visibilityTag(tag){
        
        let plant = this.globalService.plant;
        let visibility = true;
        if(tag == 'getCTUnoDiesel' || tag == 'getCTDosDiesel'){
            switch(plant.name){
                case "AGUILA":
                    visibility = true;
                break;
                case "SOL":
                    visibility = false;
                break;
            }
        }
        //return plant.label; // lo ideal
        return visibility;
    }
    getNameLabelApp(){
        let app = this.globalService.app;
        let label = "";
        switch(app.name){
            case "Administrative_monitoring":
                label ="Monitoreo";
                break;
            case "Safe":
                label ="Safe";
                break;
            case "Compliance":
                label ="Compliance";
                break;
            case "Efh":
                label ="EFH";
                break;
            default:
                label ="default";
                break;
        }

        //return app.label; // lo ideal
        return label;
    }
    getLogoApp(){
        let app = this.globalService.app;
        let logo = "";
        switch(app.name){
            case "Administrative_monitoring":
                logo ="/assets/img/common/ico_mod/MonitoreoAdministrativo-v2.png";
                break;
            case "Safe":
                logo ="/assets/img/common/ico_mod/Safe-v2.png";
                break;
            case "Compliance":
                logo = "/assets/img/common/ico_mod/Compliance-v2.png";
                break;
            case "Security":
                logo = "/assets/img/common/ico_mod/Compliance-v2.png";
                break;
            case "Efh":
                logo = "/assets/img/efh2.png";
                break;
            default:
                logo ="default";
                break;
        }
        //return app.logo; // lo ideal
        return logo;
    }


    setApp(name){
        let apps = this.securityService.loadApps();
        for(let i = 0; i < apps.length; i++){
          if(apps[i].name == name){
            this.globalService.app = apps[i];
            break;
          }
        }
    }
		

}
