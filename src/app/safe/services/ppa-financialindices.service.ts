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
	usppidownload(year: number,month:number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get<Blob>(environment.externalData + `usppi/${year}/${month}/download-file`, {params : this.parameters, responseType: 'blob' as 'json' });
	}
	usppidownloadById(id:number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get<Blob>(environment.externalData + `usppi/${id}/download-file`, {params : this.parameters, responseType: 'blob' as 'json' });
	}
	usppiUploadFile(year: number,month:number,usppi,fileObj): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		let obj = {'file':fileObj, 'object':usppi};
		return this.http.post(environment.externalData + `usppi/${year}/${month}/upload-file`,fileObj, {params : this.parameters });
	}

	salaryIncreaseFindByDateOp(year: number,month:number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(environment.externalData + `salary-increase/${year}/${month}`, {params : this.parameters });
	}
	salaryIncreaseSaveAndEdit(year: number,month:number,salary): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.post(environment.externalData + `salary-increase/${year}/${month}`,salary ,{params : this.parameters });
	}
	salaryUploadFile(year: number,month:number,usppi,fileObj): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.post(environment.externalData + `salary-increase/${year}/${month}/upload-file`,fileObj, {params : this.parameters });
	}
	
	salaryFinalize(year: number,month:number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.put(environment.externalData + `salary-increase/${year}/${month}/finalize`,{}, {params : this.parameters });
	}
	salaryFindByDateOpBetween(from,to):Observable<any>{
		///usppi/date-op-between/2019-01-01/2020-05-01
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(environment.externalData + `salary-increase/date-op-between/${from}/${to}`, {params : this.parameters });
	}
}
