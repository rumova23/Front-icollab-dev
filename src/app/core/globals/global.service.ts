import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public socketConnect = false;
  aguila  = true;
  plantaDefaultId = '1';
  constructor() { }
}
