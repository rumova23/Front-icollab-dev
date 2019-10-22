import { Injectable      } from '@angular/core';
import { App             } from 'src/app/core/models/App';
import { EventMessage    } from '../models/EventMessage';
import { Plant           } from 'src/app/security/models/Plant';
import { SecurityService } from 'src/app/core/services/security.service';

@Injectable({
  	providedIn: 'root'
})
export class GlobalService {
	aguila:boolean  = true; // no se debe seguir usando ya que puede haber n plantas  ahora se debe usar la variable plant
	plantaDefaultId = "1";  // ahora se debe usar la variable plant
	languge         = "es"; // solo es un parche que simulara multiples idiomas para monitoreo fase 3 

	public socketConnect : boolean       = false;
	public plant         : Plant         = { id:0 ,name:"Default" };
	public app           : App           = { id:0 ,name:"Default" };  // Representa al modulo activo
	public page          : EventMessage  = { id:0 ,data:{}        };
	public aside_open    : boolean       = false;

	constructor(public securityService: SecurityService) {
		if(this.plant.id == 0) this.plant = this.securityService.loadPlants()[0];
	}

	setPlant(plant:Plant):void{
		this.plant = plant;
	}
	getPlant():Plant{
		return this.plant;
	}
	setApp(name):void{
        let apps = this.securityService.loadApps();
        for(let i = 0; i < apps.length; i++){
          if(apps[i].name == name){
            this.app = apps[i];
            break;
          }
        }
	}
	getApp():App{
		return this.app;
	}
}
