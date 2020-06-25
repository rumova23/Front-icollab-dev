import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from 'src/app/core/globals/global.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class PpaFinancialindicesService {

	parameters: any;
	constructor(
		private http: HttpClient,
		private globalService: GlobalService
	) { }
	
	usppiFindByDateOp(year: number,month:number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(environment.externalData + `usppi/${year}/${month}`, {params : this.parameters });
	}
	usppiFindByDateOpBetween(from,to):Observable<any>{
		///usppi/date-op-between/2019-01-01/2020-05-01

		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(environment.externalData + `usppi/date-op-between/${from}/${to}`, {params : this.parameters });
	}
	usppiQueryExternalData(year: number,month:number): Observable<any> {
		//localhost:1030/usppi/2020/01/get-data-external?user=tester
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(environment.externalData + `usppi/${year}/${month}/get-data-external`, {params : this.parameters });
	}
	usppiFinalize(year: number,month:number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.put(environment.externalData + `usppi/${year}/${month}/finalize`,{}, {params : this.parameters });
	}
	usppiEdit(usppi): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.put(environment.externalData +  `usppi`, usppi, { params : this.parameters });
	}
}
