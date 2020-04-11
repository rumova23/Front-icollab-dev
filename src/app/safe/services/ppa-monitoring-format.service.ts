import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from 'src/app/core/globals/global.service';
import { Observable,of  } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PpaMonitoringFormatService {
 	respuestaDemoPreocesaCorreccion = {"year":2020,"mount":3,"totalDias":31,"analisisDayList":[{"day":1,"esperados":288,"encontrados":46944,"detectados":3,"corregidos":3},{"day":2,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":3,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":4,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":5,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":6,"esperados":288,"encontrados":46944,"detectados":3,"corregidos":3},{"day":7,"esperados":288,"encontrados":46944,"detectados":3,"corregidos":3},{"day":8,"esperados":288,"encontrados":46944,"detectados":3,"corregidos":3},{"day":9,"esperados":288,"encontrados":46944,"detectados":3,"corregidos":3},{"day":10,"esperados":288,"encontrados":46944,"detectados":3,"corregidos":3},{"day":11,"esperados":288,"encontrados":46944,"detectados":3,"corregidos":3},{"day":12,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":13,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":14,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":15,"esperados":288,"encontrados":46944,"detectados":3,"corregidos":3},{"day":16,"esperados":288,"encontrados":46944,"detectados":3,"corregidos":3},{"day":17,"esperados":288,"encontrados":46944,"detectados":3,"corregidos":3},{"day":18,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":19,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":20,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":21,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":22,"esperados":288,"encontrados":46944,"detectados":3,"corregidos":3},{"day":23,"esperados":288,"encontrados":46944,"detectados":3,"corregidos":3},{"day":24,"esperados":288,"encontrados":46944,"detectados":3,"corregidos":3},{"day":25,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":26,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":27,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":28,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":29,"esperados":288,"encontrados":46944,"detectados":3,"corregidos":3},{"day":30,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":31,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2}],"estatusValueList":[{"estatus":"Corregido por valor no aceptable","cantidad":3419},{"estatus":"Corregido por falta de valor","cantidad":8928},{"estatus":"Dato correcto","cantidad":1442917},{"estatus":"Dato correcto","cantidad":1442917},{"estatus":"Falta Valor","cantidad":8928},{"estatus":"Valor no aceptable","cantidad":3419}]};
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
		return of(this.respuestaDemoPreocesaCorreccion);
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(environment.dycformato + 'loadRaw/correccion/' + year + '/' + mount, {params : this.parameters });
	}

	preocesaDeteccion(year: number, mount: number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(environment.dycformato + 'loadRaw/deteccion/' + year + '/' + mount, {params : this.parameters });
	}
}
