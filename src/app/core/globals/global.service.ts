import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  aguila:boolean = true;

  plantaDefaultId = "1";

  constructor() { }
}
