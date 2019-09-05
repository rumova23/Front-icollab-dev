import { Injectable }  from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from  'src/environments/environment';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MonitoringPhase3Service {
	//application/json
	headers = new HttpHeaders().append("Accept","text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8")
								.append("Accept-Language","en-US,en;q=0.9,es;q=0.8");

	public conexiondirectaPI = false
	private baseUrl          = null;
	private UrlPIAguila      = 'https://192.168.1.175/piwebapi/streams/';
	private UrlPISol         = 'https://192.168.1.240/piwebapi/streams/';
	//private UrlPIAguila    = 'https://piserver/piwebapi/streams/';
	//private UrlPISol       = 'https://pitv/piwebapi/streams/';

	constructor(private http: HttpClient) { }

	public getTag(tag,aguila) {
		this.baseUrl = aguila ? this.UrlPIAguila : this.UrlPISol;
		return this.http.get(`${this.baseUrl}` + tag+'/value', {headers:this.headers, responseType : "text"} )
		.pipe(
			catchError(this.handleError) // then handle the error
		);
	}
	private handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
		// Ocurrió un error del lado del cliente o de la red. Manejarlo en consecuencia.
		//console.log('An error occurred:', error.error.message);
		} else {
		/*
			El backend devolvió un código de respuesta fallido.
			El cuerpo de respuesta puede contener pistas sobre lo que salió mal,
		*/
		/*console.log(
			`Backend returned code ${error.status}, ` +
			`body was: ${error.error}`);*/
		}
		// devuelve un observable con un mensaje de error orientado al usuario
		return throwError(
		'Algo malo sucedio;');
	};
	public getTagsAguila(){
		let urlBack = 'http://200.52.85.140:1119/pi/getTagsAguila';
		//let urlBack = 'http://172.20.141.102:1119/pi/getTagsAguila';
		//let urlBack = 'http://201.149.85.14:1119/pi/getTagsAguila';
		//let urlBack = 'http://localhost:1119/pi/getTagsAguila';
		
		return this.http.get(urlBack, {headers:this.headers, responseType : "text"} )
		.pipe(
		catchError(this.handleError) // then handle the error
		);
	}

	public getTagsSol(){
		let urlBack = 'http://200.52.85.140:1119/pi/getTagsSol'; // ip publica del nuevo servidor 
		//let urlBack = 'http://172.20.141.102:1119/pi/getTagsSol'; // modelo matematico desde la ip interna al pi
		//let urlBack = 'http://201.149.85.14:1119/pi/getTagsSol'; // ip publica del de modelo matematico 
		//let urlBack = 'http://localhost:1119/pi/getTagsSol';
		
		return this.http.get(urlBack, {headers:this.headers, responseType : "text"} )
		.pipe(
		catchError(this.handleError) // then handle the error
		);
	}
}
