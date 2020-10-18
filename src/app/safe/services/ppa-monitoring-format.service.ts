import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from 'src/app/core/globals/global.service';
import { Observable,of  } from 'rxjs';
import { EPs } from 'src/app/core/globals/endpoints';

@Injectable({
  providedIn: 'root'
})
export class PpaMonitoringFormatService {
	respuestaDemoPreocesaCorreccion = {"year":2020,"mount":3,"totalDias":31,"analisisDayList":[{"day":1,"esperados":288,"encontrados":46944,"detectados":3,"corregidos":3},{"day":2,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":3,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":4,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":5,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":6,"esperados":288,"encontrados":46944,"detectados":3,"corregidos":3},{"day":7,"esperados":288,"encontrados":46944,"detectados":3,"corregidos":3},{"day":8,"esperados":288,"encontrados":46944,"detectados":3,"corregidos":3},{"day":9,"esperados":288,"encontrados":46944,"detectados":3,"corregidos":3},{"day":10,"esperados":288,"encontrados":46944,"detectados":3,"corregidos":3},{"day":11,"esperados":288,"encontrados":46944,"detectados":3,"corregidos":3},{"day":12,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":13,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":14,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":15,"esperados":288,"encontrados":46944,"detectados":3,"corregidos":3},{"day":16,"esperados":288,"encontrados":46944,"detectados":3,"corregidos":3},{"day":17,"esperados":288,"encontrados":46944,"detectados":3,"corregidos":3},{"day":18,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":19,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":20,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":21,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":22,"esperados":288,"encontrados":46944,"detectados":3,"corregidos":3},{"day":23,"esperados":288,"encontrados":46944,"detectados":3,"corregidos":3},{"day":24,"esperados":288,"encontrados":46944,"detectados":3,"corregidos":3},{"day":25,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":26,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":27,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":28,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":29,"esperados":288,"encontrados":46944,"detectados":3,"corregidos":3},{"day":30,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2},{"day":31,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":2}],"estatusValueList":[{"estatus":"Corregido por valor no aceptable","cantidad":3419},{"estatus":"Corregido por falta de valor","cantidad":8928},{"estatus":"Dato correcto","cantidad":1442917},{"estatus":"Dato correcto","cantidad":1442917},{"estatus":"Falta Valor","cantidad":8928},{"estatus":"Valor no aceptable","cantidad":3419}]};
	respuestaDemoPreocesaDeteccion  = {"year":2020,"mount":3,"totalDias":31,"analisisDayList":[{"day":1,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":0},{"day":2,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":0},{"day":3,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":0},{"day":4,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":0},{"day":5,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":0},{"day":6,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":0},{"day":7,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":0},{"day":8,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":0},{"day":9,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":0},{"day":10,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":0},{"day":11,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":0},{"day":12,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":0},{"day":13,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":0},{"day":14,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":0},{"day":15,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":0},{"day":16,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":0},{"day":17,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":0},{"day":18,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":0},{"day":19,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":0},{"day":20,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":0},{"day":21,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":0},{"day":22,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":0},{"day":23,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":0},{"day":24,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":0},{"day":25,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":0},{"day":26,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":0},{"day":27,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":0},{"day":28,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":0},{"day":29,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":0},{"day":30,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":0},{"day":31,"esperados":288,"encontrados":46944,"detectados":2,"corregidos":0}],"estatusValueList":[{"estatus":"Dato correcto","cantidad":1446336},{"estatus":"Valor no aceptable","cantidad":8928}]};
	loadRawBitacora=[{"fechaOperacionComercial": "2020/3","fuenteImportacion": "Load Manual","fechaUltimaModificacion": null,"estatusImportacion": "Crudos Correctos","usuario": null}];
	parameters: any;
	constructor(private http: HttpClient, private globalService: GlobalService) { }

	get(tag: String = 'PCO 1', data: any = [{nameParameter: 'year', valueParameter: 2020}, {nameParameter: 'mount', valueParameter: 3}]): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.post(EPs.dgctags.obtenTag.get + tag, data, {params : this.parameters });
	}

	getCatalogoOpcion(catalogo: string, opcion: string): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get( `${ EPs.mastercatalog.mastercatalog.status }${catalogo}/${opcion}`, {params : this.parameters });
	}

	getTags(etapaId: number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get( `${EPs.dgctags.obtenTag.stage}${etapaId}`, {params : this.parameters });
	}

	entradaManual(year: number, month: number, data): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.post(EPs.dycformato.upload.zip + year + '/' + month, data, {params : this.parameters });
	}

	uploadPerfil(data): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.post(EPs.dycformato.uploadPerfil, data, {params : this.parameters });
	}

	procesaCorreccionProfile(year: number, month: number): Observable<any> {
		// return of(this.respuestaDemoPreocesaCorreccion);
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(EPs.dycformato.profile.corrected + year + '/' + month, {params : this.parameters });
	}

	procesaDeteccionProfile(year: number, month: number): Observable<any> {
		// return of(this.respuestaDemoPreocesaDeteccion);
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(EPs.dycformato.profile.detected + year + '/' + month, {params : this.parameters });
	}

	procesaDeteccionProcedimientoProfile(year: number, month: number): Observable<any> {
		// return of(this.respuestaDemoPreocesaDeteccion);
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(EPs.dycformato.profile.norm.detected + year + '/' + month, {params : this.parameters });
	}

	procesaCorrecionProcedimientoProfile(year: number, month: number): Observable<any> {
		// return of(this.respuestaDemoPreocesaDeteccion);
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(EPs.dycformato.profile.norm.corrected + year + '/' + month, {params : this.parameters });
	}

	obtenBitacoraLoadRaw(): Observable<any> {
		// return of(this.loadRawBitacora);
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(EPs.dycformato.loadRaw.bitacora, {params : this.parameters });
	}

	procesaCorreccion(year: number, month: number): Observable<any> {
		// return of(this.respuestaDemoPreocesaCorreccion);
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(EPs.dycformato.loadRaw.correction + year + '/' + month, {params : this.parameters });
	}

	procesaDeteccion(year: number, month: number): Observable<any> {
		// return of(this.respuestaDemoPreocesaDeteccion);
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(EPs.dycformato.loadRaw.detection + year + '/' + month, {params : this.parameters });
	}

	procesaDeteccionProcedimiento(year: number, month: number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(EPs.dycformato.norm.detection + year + '/' + month, {params : this.parameters });
	}

	procesaCorreccionProcedimiento(year: number, month: number): Observable<any> {
		// return of(this.respuestaDemoPreocesaCorreccion);
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(EPs.dycformato.norm.correction + year + '/' + month, {params : this.parameters });
	}

	downloadExcel(year: number, month: number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(EPs.dycformato.download.id + year + '/' + month, {params : this.parameters });
	}

	downloadCrudosExcel(year: number, month: number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(EPs.dycformato.download.report.raw + year + '/' + month, {params : this.parameters });
	}

	downloadCrudosProfileExcel(year: number, month: number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(EPs.dycformato.download.profile.raw + year + '/' + month, {params : this.parameters });
	}

	downloadcrudosZip(year: number, month: number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(EPs.dycformato.download.zip + year + '/' + month, {params : this.parameters });
	}

	stagenorm(year: number, month: number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(EPs.dycformato.loadRaw.stagenorm + year + '/' + month, {params : this.parameters });
	}

	stageLoadRaw(year: number, month: number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(EPs.dycformato.loadRaw.stage + year + '/' + month, {params : this.parameters });
	}

	stageLoad(year: number, month: number): Observable<any> {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(EPs.dycformato.loadRaw.stageload + year + '/' + month, {params : this.parameters });
	}

    procesaModeloTiempo(year: number, month: number) {
		this.parameters = this.globalService.setXTenantId_Plant();
		return this.http.get(EPs.dycformato.mmmppa.calcFactor + year + '/' + month
			, {params : this.parameters , headers: new HttpHeaders({ timeout: `${4000000}` })});
    }
}
