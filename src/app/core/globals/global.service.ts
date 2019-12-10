import { Injectable      } from '@angular/core';
import { App             } from 'src/app/core/models/App';
import { EventMessage    } from '../models/EventMessage';
import { Plant           } from 'src/app/security/models/Plant';
import { SecurityService } from 'src/app/core/services/security.service';
import { HttpParams      } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class GlobalService {
	aguila  = true; // no se debe seguir usando ya que puede haber n plantas  ahora se debe usar la variable plant
	plantaDefaultId = '1';  // ahora se debe usar la variable plant
	languge         = 'es'; // solo es un parche que simulara multiples idiomas para monitoreo fase 3

	public socketConnect       = false;
	public plant: Plant         = { id: 0 , name: 'Default'             };
	public app: App           = { id: 0 , name: 'Default'             };  // Representa al modulo activo
	public page: EventMessage  = { id: 0 , data: {}, descriptor: 'none' };
	public aside_open       = false;

	constructor(public securityService: SecurityService) {
		try {
			this.plant = JSON.parse(localStorage.getItem('plant'));
		} catch (e) {

		}
	}

	setPlant(plant: Plant): void {
		localStorage.setItem('plant', JSON.stringify(plant));
		this.plant = plant;
	}
	getPlant(): Plant {
		return this.plant;
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
	setXTenantId_Plant(plantSelectedName: string) {
		const user = JSON.parse(localStorage.getItem('user')).username;
		return new HttpParams().set('X-TENANT-ID', plantSelectedName.toLowerCase()).set('user', user);
	}

}
