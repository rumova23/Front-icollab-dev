import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public socketConnect:boolean = false;
  aguila:boolean  = true;
  plantaDefaultId = "1";
  constructor() { }
}
