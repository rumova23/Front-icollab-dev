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



	

	waterCostIncreaseFindByDateOp(year: number,month:number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(environment.externalData + `watercost/${year}/${month}`, {params : this.parameters });
	}
	waterCostIncreaseSaveAndEdit(year: number,month:number,salary): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.post(environment.externalData + `watercost/${year}/${month}`,salary ,{params : this.parameters });
	}
	waterCostUploadFile(year: number,month:number,usppi,fileObj): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.post(environment.externalData + `watercost/${year}/${month}/upload-file`,fileObj, {params : this.parameters });
	}
	waterCostFinalize(year: number,month:number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.put(environment.externalData + `watercost/${year}/${month}/finalize`,{}, {params : this.parameters });
	}
	waterCostFindByDateOpBetween(from,to):Observable<any>{
		///usppi/date-op-between/2019-01-01/2020-05-01
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(environment.externalData + `watercost/date-op-between/${from}/${to}`, {params : this.parameters });
	}



	
	inppFindByDateOp(year: number,month:number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(environment.externalData + `inpp/${year}/${month}`, {params : this.parameters });
	}
	inppNew(year: number,month:number,obj): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.post(environment.externalData + `inpp/${year}/${month}`,obj, {params : this.parameters });
	}
	inppEdit(obj): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.put(environment.externalData + `inpp`,obj, {params : this.parameters });
	}
	inppFindByDateOpBetween(from,to):Observable<any>{
		///usppi/date-op-between/2019-01-01/2020-05-01
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(environment.externalData + `inpp/date-op-between/${from}/${to}`, {params : this.parameters });
	}
	inppFinalize(year: number,month:number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.put(environment.externalData + `inpp/${year}/${month}/finalize`,{}, {params : this.parameters });
	}

	
	tcFindByDateOp(year: number,month:number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(environment.externalData + `tc/${year}/${month}`, {params : this.parameters });
	}
	tcNew(year: number,month:number,obj): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.post(environment.externalData + `tc/${year}/${month}`,obj, {params : this.parameters });
	}
	tcEdit(obj): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.put(environment.externalData + `tc`,obj, {params : this.parameters });
	}
	tcFindByDateOpBetween(from,to):Observable<any>{
		///usppi/date-op-between/2019-01-01/2020-05-01
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(environment.externalData + `tc/date-op-between/${from}/${to}`, {params : this.parameters });
	}
	tcFinalize(year: number,month:number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.put(environment.externalData + `tc/${year}/${month}/finalize`,{}, {params : this.parameters });
	}
}
