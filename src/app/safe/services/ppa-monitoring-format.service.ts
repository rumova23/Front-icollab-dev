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
	constructor(private http: HttpClient, private globalService: GlobalService) { }

	get(tag: String = 'PCO 1', data: any = [{nameParameter: 'year', valueParameter: 2020}, {nameParameter: 'mount', valueParameter: 3}]): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.post(environment.dgctags + 'obtenTag/' + tag, data, {params : this.parameters });
	}
	getTags(): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get( `${ environment.dgctags }obtenTag/all`, {params : this.parameters });
	}

	entradaManual(year: number, mount: number, data): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.post(environment.dycformato + 'upload/zip/' + year + '/' + mount, data, {params : this.parameters });
	}

	obtenBitacoraLoadRaw(): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(environment.dycformato + 'loadRaw/bitacora', {params : this.parameters });
	}

	preocesaCorreccion(year: number, mount: number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(environment.dycformato + 'loadRaw/correccion/' + year + '/' + mount, {params : this.parameters });
	}

	preocesaDeteccion(year: number, mount: number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(environment.dycformato + 'loadRaw/deteccion/' + year + '/' + mount, {params : this.parameters });
	}
}
