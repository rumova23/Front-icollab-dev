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
    
    getBackgroundColor(){
        let plant = this.globalService.plant;
        let color = "";
        switch(plant.name){
            case "AGUILA":
                color ="#0F5787";
            break;
            case "SOL":
                color ="#D67700";
            break;
        }
        //return plant.backgroundColor; // lo ideal
        return color;
    }
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
}
