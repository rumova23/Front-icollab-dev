import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Empleado } from 'src/app/compliance/models/Empleado';
import { Respuesta } from 'src/app/compliance/models/Respuesta';
import { GlobalService } from 'src/app/core/globals/global.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept-Language': 'es-419,es;q=0.9',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, content-type',
  })
};

const httpOptions2 = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7Fasunn4b0E6QxQs',
    'Accept-Language': 'es-ES,es;q=0.9,mk;q=0.8,en;q=0.7',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
};

@Injectable({
  providedIn: 'root'
})
export class PerfilComboService {

  private baseUrl = environment.catalogUrl;
  private baseUrl2 = environment.microexamenUrl;
  private baseUrl3 = environment.evaluacionExamenUrl;
  private baseknUrl = environment.knowledgeUrl;

  parameters:any;
  user:any;

  constructor(private http: HttpClient
             ,private globalService: GlobalService) { }

  setXTenantId(plantSelected){
    /*
    console.log("setXTenantId(plantSelected)");
    console.log("plantSelected");
    console.log(plantSelected);
    console.log("this.parameters");
    console.log(this.parameters);    
    */
      this.user = JSON.parse(localStorage.getItem('user'));
      //console.log("this.user");
      //console.dir(this.user);  
      this.user = this.user['username'];
      //console.log("this.user");
      //console.dir(this.user);

    if (plantSelected){
      let p1 = new HttpParams().set("X-TENANT-ID","aguila")
                               .set("user", this.user);
      this.parameters = p1;
    } 
    else{
      let p2 = new HttpParams().set("X-TENANT-ID","sol")
                               .set("user", this.user);      
      this.parameters = p2;
    }
    
  }


  getlistCatalogoOrdenados(nameCatalogs: Array<any>) {
    this.setXTenantId(this.globalService.aguila);
    console.log("nameCat"); 
    console.log(nameCatalogs); 
    //return this.http.post( `${ this.baseUrl }list`, nameCat, httpOptions);
    return this.http.post( `${ this.baseUrl }catalog/list`, nameCatalogs, {params : this.parameters });
  }

  getSave(empleado: Empleado) {
    this.setXTenantId(this.globalService.aguila);
    //return this.http.put( `${ this.baseUrl2 }actualizaEmpleado`, empleado, httpOptions);
    return this.http.put( `${ this.baseUrl2 }actualizaEmpleado`, empleado, {params : this.parameters });
  }

  getEmpleado(id: number) {
    this.setXTenantId(this.globalService.aguila);
    //return this.http.get( `${ this.baseUrl2 }empleado/${id}`, httpOptions);
    return this.http.get( `${ this.baseUrl2 }empleado/${id}`, {params : this.parameters });
  }

  getEmpleadoDetalles(id: number) {
    this.setXTenantId(this.globalService.aguila);    
    //return this.http.get( `${ this.baseUrl2 }empleadoDetalle/${id}`, httpOptions);
    return this.http.get( `${ this.baseUrl2 }empleadoDetalle/${id}`, {params : this.parameters });
  }


  generaExamen(empleadoIdentifier: number, config:String): Observable<any> {
    this.setXTenantId(this.globalService.aguila);        
    console.log('generaExamen(empleadoId: number): ' + empleadoIdentifier);
    let RequestBody = {
       empleadoId    : empleadoIdentifier
      ,configuracion : config
    };
    //let RequestBody = empleadoId;

    //return this.http.post(`${this.baseUrl2}` + 'genera?empleadoId=' + empleadoId, httpOptions);
    return this.http.post(`${this.baseUrl2}` + 'genera', RequestBody , {params : this.parameters });
  }

  obtenPreguntasExamen(configuracionExamen: string): Observable<any> {
    this.setXTenantId(this.globalService.aguila);    
    console.log("configuracionExamen"); 
    console.log(configuracionExamen); 
    //return this.http.get(`${this.baseUrl2}examen/preguntas/${configuracionExamen}/${empleadoId}`, httpOptions);
    return this.http.get(`${this.baseknUrl}examen/${configuracionExamen}/`, {params : this.parameters });
  }


  respuestaExamen(examenReservacionId: number, resulta: Array<Respuesta>) {
    this.setXTenantId(this.globalService.aguila);        
    //return this.http.post( `${ this.baseUrl2 }guardaexamen?examenReservacionId=` + examenReservacionId, resulta, httpOptions);
    return this.http.post( `${ this.baseUrl2 }guardaexamen?examenReservacionId=` + examenReservacionId, resulta, {params : this.parameters });
  }


  getValoresAptitudes(examenReservacionId: number, preguntaId:number) {
    this.setXTenantId(this.globalService.aguila);
    //return this.http.get( `${ this.baseUrl }valoresAptitudes/${list}`, httpOptions);
    return this.http.post( `${ this.baseUrl2 }valorRespuesta?examenReservacionId=` + examenReservacionId 
                             + `&preguntaId=` + preguntaId, {},{params : this.parameters });
  }

  
  postValoresHabilidades(idEmpleado: number, resulta: Array<any>) {
    this.setXTenantId(this.globalService.aguila);        
    //return this.http.post( `${ this.baseUrl2 }guardarSicometricoEmpleado?idEmpleado=` + idEmpleado, resulta, httpOptions);
    return this.http.post( `${ this.baseUrl2 }guardarSicometricoEmpleado?idEmpleado=` + idEmpleado, resulta, {params : this.parameters });
  }




  getScalas(val: string) {
    this.setXTenantId(this.globalService.aguila);        
    //return this.http.get(`${this.baseUrl3}` + 'evalucionConfiguracion/get/' + val , httpOptions);
    return this.http.get(`${this.baseUrl3}` + 'evalucionConfiguracion/get/' + val , {params : this.parameters });
  }

  public getReservacionesEmpleado(calificacionId: number): Observable<any>   {
    this.setXTenantId(this.globalService.aguila);        
    //return this.http.get(`${this.baseUrl2}obten/reservacion/${calificacionId}`, httpOptions);
    return this.http.get(`${this.baseUrl2}obten/reservacion/${calificacionId}`, {params : this.parameters });
  }



  obtenCalificacion(empleadoId: number): Observable<any> {
    this.setXTenantId(this.globalService.aguila);        
    //return this.http.get(`${this.baseUrl2}obten/calificacion/${empleadoId}`, httpOptions);
    return this.http.get(`${this.baseUrl2}obten/calificacion/${empleadoId}`, {params : this.parameters });
  }

  terminaExamen(examenReservacionId: number): Observable<any>  {
    this.setXTenantId(this.globalService.aguila);        
    //return this.http.post(`${this.baseUrl2}terminaExamen?examenReservacionId=` + examenReservacionId , httpOptions);
    return this.http.post(`${this.baseUrl2}terminaExamen?examenReservacionId=` + examenReservacionId + "&user=" + this.user, {params : this.parameters });
  }


  obtenEstatusTerminado(entidad: string, estatus: string): Observable<any> {
    this.setXTenantId(this.globalService.aguila);        
    //return this.http.get( `${ this.estatus_maestro }entidadEstatus/${entidad}/${estatus}`, httpOptions);
    //return this.http.get( `${ this.estatus_maestro }entidadEstatus/${entidad}/${estatus}`, {params : this.parameters });
    return null;
  }


  getGraficas(examenReservacionId: number): Observable<any> {
    this.setXTenantId(this.globalService.aguila);        
    //return this.http.get(`${this.baseUrl2}obten/calificacion/reservacion/${examenReservacionId}`, httpOptions);
    return this.http.get(`${this.baseUrl2}obten/calificacion/reservacion/${examenReservacionId}`, {params : this.parameters });
  }


  getComentarios(calificacionId: number): Observable<any>  {
    this.setXTenantId(this.globalService.aguila);        
    //return this.http.get(`${this.baseUrl2}getObservaciones/${calificacionId}`, httpOptions);
    return this.http.get(`${this.baseUrl2}getObservaciones/${calificacionId}`, {params : this.parameters });
  }


  postObservaciones(calificacionId: number, observacion: string): Observable<any> {
    this.setXTenantId(this.globalService.aguila);        
    //return this.http.post( `${ this.baseUrl2 }guardaObservacion/${calificacionId}/${observacion}`, httpOptions);
    return this.http.post( `${ this.baseUrl2 }guardaObservacion/${calificacionId}/${observacion}`, {params : this.parameters });
  }


  upload(fileObj: File, idExamenReservacion: number) {
    this.setXTenantId(this.globalService.aguila);        
    const file: FormData = new FormData();
    const idTipoDocumento: number = idExamenReservacion;
    file.append('file', fileObj);
    // tslint:disable-next-line:max-line-length
    //return this.http.post(`${ this.baseUrl2 }guardarArchivos?idExamenReservacion=` + idExamenReservacion + `&idTipoDocumento=` + idTipoDocumento, file);
    return this.http.post(`${ this.baseUrl2 }guardarArchivos?idExamenReservacion=` + idExamenReservacion + `&idTipoDocumento=` + idTipoDocumento, file);
  }
}
