import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { Client } from '../models/Client';
import { Plant } from 'src/app/security/models/Plant';
import { BranchOfficeInvoiceSerie } from '../models/BranchOfficeInvoiceSerie';
import { Invoice } from '../models/Invoice';
import { TimeRegister } from '../models/TimeRegister';
import { CreditNote } from '../models/CreditNote';
import { DebitNote } from '../models/DebitNote';



@Injectable({ providedIn: 'root' })
export class TrService {

  constructor(private http: HttpClient) {
  }

  getWeather(date: string): Observable<any> {
    return this.http.get(environment.trUrl + 'weather/list?date=' + date);
  }

  getHourly(date: string): Observable<any> {
    return this.http.get(environment.trUrl + 'hourly/list?date=' + date);
  }

  getForecast(date: string): Observable<any> {
    return this.http.get(environment.trUrl + 'forecast/list?date=' + date);
  }

 
}
