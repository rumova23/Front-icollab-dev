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
	
	get(tag: String = "olas del mar", data:any = [{"nameParameter": "dateIni","valueParameter": "1995-01-01"},{"nameParameter": "dateEnd","valueParameter": "2025-01-01"}]): Observable<any> {
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
