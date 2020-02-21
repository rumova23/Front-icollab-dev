import { Injectable      } from '@angular/core';
import { Inject          } from '@angular/core';
import { App             } from 'src/app/core/models/App';
import { EventMessage    } from '../models/EventMessage';
import { Plant           } from 'src/app/security/models/Plant';
import { SecurityService } from 'src/app/core/services/security.service';
import { HttpParams      } from '@angular/common/http';
import { DOCUMENT        } from '@angular/common';

@Injectable({
	providedIn: 'root'
})
export class GlobalService {
	aguila  = true; // no se debe seguir usando ya que puede haber n plantas  ahora se debe usar la variable plant
	plantaDefaultId = '1';  // ahora se debe usar la variable plant el default es la primera planta que llega

	public socketConnect       = false;
	public plant: Plant        = { id: 0 , name: 'Default'             };
	public app: App            = { id: 0 , name: 'Default'             };  // Representa al modulo activo
	public page: EventMessage  = { id: 0 , data: {}, descriptor: 'none' };
	public aside_open          = false;

	constructor(@Inject(DOCUMENT) private _document,public securityService: SecurityService) {
		try {
			//para desarrollo, si entra sin pasar por login, que cargue la planta por defecto
			this.setPlant(JSON.parse(localStorage.getItem('plant')));
		} catch (e) {

		}
	}

	setPlant(plant: Plant): void {
		localStorage.setItem('plant', JSON.stringify(plant));
		this.plant = plant;
		this.setTheme();
	}
	getPlant(): Plant {
		return this.plant;
	}
	setTheme(){
		this.aguila = (this.plant.name=="AGUILA") ? true : false;   // no se debe seguir usando ya que puede haber n plantas  ahora se debe usar la variable plant
		let url = `assets/css/theme/${this.plant.name.toLowerCase()}/default.css`;
		let element = this._document.getElementById("plant_theme");
		if(element) element.setAttribute('href',url);
	}
	setApp(name): void {
        const apps = this.securityService.loadApps();
        for (let i = 0; i < apps.length; i++) {
          if (apps[i].name === name) {
            this.app = apps[i];
            break;
          }
        }
	}
	getApp(): App {
		return this.app;
	}
	setPage(page: EventMessage) {
		this.page = page;
	}
	getPage(): EventMessage {
		return this.page;
	}
	setXTenantId(si) {
		/**
		 * ¡¡¡ !!!
		 *
		 * Deprecated : no se debe seguir usando ya que puede haber n plantas
		 * ahora se debe usar la función setXTenantId_Plant
		 *
		 */
		const user = JSON.parse(localStorage.getItem('user')).username;
		return si ? new HttpParams().set('X-TENANT-ID', 'aguila').set('user', user) : new HttpParams().set('X-TENANT-ID', 'sol').set('user', user);
	}
	setXTenantId_Plant(plantSelectedName: string = this.plant.name) {
		const user = JSON.parse(localStorage.getItem('user')).username;
		return new HttpParams().set('X-TENANT-ID', plantSelectedName.toLowerCase()).set('user', user);
	}

}
