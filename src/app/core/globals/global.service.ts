import { Injectable } from '@angular/core';
import { App } from 'src/app/core/models/App';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  aguila:boolean  = true; // no se debe seguir usando ya que puede haber n plantas  ahora se debe usar la variable plant
  plantaDefaultId = "1";  // ahora se debe usar la variable plant
  languge         = "es"; // solo es un parche que simulara multiples idiomas para monitoreo fase 3 

  public socketConnect : boolean = false;
  plant;
  app : App;  // Representa al modulo activo
  page;
  constructor() { }
}
