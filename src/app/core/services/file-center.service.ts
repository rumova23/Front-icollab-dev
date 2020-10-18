import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../globals/global.service';
import { Observable } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FileCenter } from '../models/FileCenter';
import { EPs } from '../globals/endpoints';

@Injectable({
	providedIn: 'root'
})
export class FileCenterService {

	parameters: any;
	constructor(
		private http: HttpClient,
		private globalService: GlobalService,
		public toastr: ToastrManager,
	) { }
	download(file: FileCenter): void {
		this.parameters = this.globalService.setXTenantId_Plant();
		this.http.get<Blob>(`${EPs.clientexternalapis.fileCenter}/${file.id}`, { params: this.parameters, responseType: 'blob' as 'json' })
		.subscribe(result=>{
			let dataType = result.type;
			let binaryData = [];
			binaryData.push(result);
			let downloadLink = document.createElement('a');
			downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
			downloadLink.setAttribute('download', file.fileName);
			downloadLink.click();
		},error=>{
			this.toastr.errorToastr("Error al descargar archivo", 'Lo siento,');
		},()=>{
			
		});
		;
	}
	uploadFile(fileCenter  : FileCenter): Observable<any>{
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.post(`${EPs.clientexternalapis.fileCenter}`,fileCenter, {params : this.parameters });
	}
}
