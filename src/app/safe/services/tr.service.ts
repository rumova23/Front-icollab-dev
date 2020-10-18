import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EPs } from 'src/app/core/globals/endpoints';



@Injectable({ providedIn: 'root' })
export class TrService {

  constructor(private http: HttpClient) {
  }

  getWeather(time): Observable<any> {
    return this.http.get( EPs.tr.weather.list + time);
  }

  getForecast(time): Observable<any> {
    return this.http.get( EPs.tr.forecast.list + time);
  }

  getTemperature(time): Observable<any> {
    return this.http.get( EPs.weather.temperature.list + time);
  }

  getHourly(time): Observable<any> {
    return this.http.get( EPs.tr.hourly.list + time);
  }

}
