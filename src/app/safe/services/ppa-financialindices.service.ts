import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from 'src/app/core/globals/global.service';
import { Observable } from 'rxjs';
import { EPs } from 'src/app/core/globals/endpoints';

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
		return this.http.get(EPs.clientexternalapis.usppi.id + `/${year}/${month}`, {params : this.parameters });
	}
	usppiFindByDateOpBetween(from,to):Observable<any>{
		///usppi/date-op-between/2019-01-01/2020-05-01
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(EPs.clientexternalapis.usppi.dateOpBetween + `${from}/${to}`, {params : this.parameters });
	}
	usppiQueryExternalData(year: number,month:number): Observable<any> {
		//localhost:1030/usppi/2020/01/get-data-external?user=tester
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(EPs.clientexternalapis.usppi.id + `/${year}/${month}/get-data-external`, {params : this.parameters });
	}
	usppiFinalize(year: number,month:number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.put(EPs.clientexternalapis.usppi.id + `/${year}/${month}/finalize`,{}, {params : this.parameters });
	}
	usppiEdit(usppi): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.put(EPs.clientexternalapis.usppi.id, usppi, { params : this.parameters });
	}
	usppidownload(year: number,month:number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get<Blob>(EPs.clientexternalapis.usppi.id + `/${year}/${month}/download-file`, {params : this.parameters, responseType: 'blob' as 'json' });
	}
	usppidownloadById(id:number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get<Blob>(EPs.clientexternalapis.usppi.id + `/${id}/download-file`, {params : this.parameters, responseType: 'blob' as 'json' });
	}
	usppiUploadFile(year: number,month:number,usppi,fileObj): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		let obj = {'file':fileObj, 'object':usppi};
		return this.http.post(EPs.clientexternalapis.usppi.id + `/${year}/${month}/upload-file`,fileObj, {params : this.parameters });
	}

	salaryIncreaseFindByDateOp(year: number,month:number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(EPs.clientexternalapis.salaryIncrease.id + `/${year}/${month}`, {params : this.parameters });
	}
	salaryIncreaseSaveAndEdit(year: number,month:number,salary): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.post(EPs.clientexternalapis.salaryIncrease.id + `/${year}/${month}`,salary ,{params : this.parameters });
	}
	salaryUploadFile(year: number,month:number,usppi,fileObj): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.post(EPs.clientexternalapis.salaryIncrease.id + `/${year}/${month}/upload-file`,fileObj, {params : this.parameters });
	}
	salaryFinalize(year: number,month:number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.put(EPs.clientexternalapis.salaryIncrease.id + `/${year}/${month}/finalize`,{}, {params : this.parameters });
	}
	salaryFindByDateOpBetween(from,to):Observable<any>{
		///usppi/date-op-between/2019-01-01/2020-05-01
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(EPs.clientexternalapis.salaryIncrease.dateOpBetween + `/${from}/${to}`, {params : this.parameters });
	}



	

	waterCostIncreaseFindByDateOp(year: number,month:number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(EPs.clientexternalapis.watercost.id + `/${year}/${month}`, {params : this.parameters });
	}
	waterCostIncreaseSaveAndEdit(year: number,month:number,salary): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.post(EPs.clientexternalapis.watercost.id + `/${year}/${month}`,salary ,{params : this.parameters });
	}
	waterCostUploadFile(year: number,month:number,usppi,fileObj): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.post(EPs.clientexternalapis.watercost.id + `/${year}/${month}/upload-file`,fileObj, {params : this.parameters });
	}
	waterCostFinalize(year: number,month:number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.put(EPs.clientexternalapis.watercost.id + `/${year}/${month}/finalize`,{}, {params : this.parameters });
	}
	waterCostFindByDateOpBetween(from,to):Observable<any>{
		///usppi/date-op-between/2019-01-01/2020-05-01
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(EPs.clientexternalapis.watercost.dateOpBetween + `/${from}/${to}`, {params : this.parameters });
	}



	
	inppFindByDateOp(year: number,month:number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(EPs.clientexternalapis.inpp.id + `/${year}/${month}`, {params : this.parameters });
	}
	inppNew(year: number,month:number,obj): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.post(EPs.clientexternalapis.inpp.id + `/${year}/${month}`,obj, {params : this.parameters });
	}
	inppEdit(obj): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.put(EPs.clientexternalapis.inpp.id,obj, {params : this.parameters });
	}
	inppFindByDateOpBetween(from,to):Observable<any>{
		///usppi/date-op-between/2019-01-01/2020-05-01
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(EPs.clientexternalapis.inpp.dateOpBetween + `/${from}/${to}`, {params : this.parameters });
	}
	inppFinalize(year: number,month:number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.put(EPs.clientexternalapis.inpp.id + `/${year}/${month}/finalize`,{}, {params : this.parameters });
	}

	
	tcFindByDateOp(year: number,month:number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(EPs.clientexternalapis.tc.id + `/${year}/${month}`, {params : this.parameters });
	}
	tcNew(year: number,month:number,obj): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.post(EPs.clientexternalapis.tc.id + `/${year}/${month}`,obj, {params : this.parameters });
	}
	tcEdit(obj): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.put(EPs.clientexternalapis.tc.id,obj, {params : this.parameters });
	}
	tcFindByDateOpBetween(from,to):Observable<any>{
		///usppi/date-op-between/2019-01-01/2020-05-01
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(EPs.clientexternalapis.tc.dateOpBetween + `/${from}/${to}`, {params : this.parameters });
	}
	tcFinalize(year: number,month:number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.put(EPs.clientexternalapis.tc.id + `/${year}/${month}/finalize`,{}, {params : this.parameters });
	}
}
