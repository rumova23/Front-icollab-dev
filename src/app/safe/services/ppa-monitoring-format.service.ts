import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from 'src/app/core/globals/global.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PpaMonitoringFormatService {

	parameters: any;
	constructor(private http: HttpClient,private globalService: GlobalService) { }
	
	get(tag: String = "PCO 1", data:any = [{"nameParameter": "year","valueParameter": 2020},{"nameParameter": "mount","valueParameter": 3}]): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();		
		return this.http.post(environment.dgctags +"obtenTag/"+ tag, data, {params : this.parameters });
	}
	getTags():Observable<any>{
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get( `${ environment.dgctags }obtenTag/all`, {params : this.parameters });
	}

	entradaManual(data): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.post(environment.dycformato + 'upload/zip', data, {params : this.parameters });
	}
}
