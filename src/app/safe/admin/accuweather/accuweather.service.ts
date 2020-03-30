import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { GlobalService } from "src/app/core/globals/global.service";
import { Observable } from 'rxjs';
@Injectable({
	providedIn: "root"
})
export class AccuweatherService {
	private endPoint = environment.weatherUrl;
	///getForecastTemperaturaAll
	parameters: any;
	constructor(private http: HttpClient, private globalService: GlobalService) { }
	getWeatherTypeFromTo(dateInit="2000-01-01",dateFint="2030-01-01",idsTypeWeather=[1,4,5]): Observable<any>{
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.post( `${ this.endPoint }getWeatherTypeFromTo/${dateInit}/${dateFint}`, idsTypeWeather, {params : this.parameters });
	}
}
