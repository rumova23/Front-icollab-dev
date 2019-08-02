import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MaestroOpcion } from '../models/maestro-opcion';
import { OrderCatalogDTO } from '../../compliance/models/OrderCatalogDTO';
import { GlobalService } from 'src/app/core/globals/global.service';

/*
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept-Language': 'es-419,es;q=0.9',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'authkey',
    'X-TENANT-ID':'aguila'
  })
};
*/

const httpOptions = new HttpHeaders({
  'Content-Type': 'application/json',
  'Accept-Language': 'es-419,es;q=0.9',
  'Accept': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Authorization': 'authkey',
  'X-TENANT-ID':'aguila'
  });

@Injectable({
  providedIn: 'root'
})
export class CatalogoMaestroService {

  headers = new HttpHeaders().set("X-TENANT-ID","aguila");
  
  parameters:any;

  private micro_catalago_maestro = environment.micro_catalago_maestro;

  constructor(private http: HttpClient
             ,public globalService: GlobalService) { }

  setXTenantId(plantSelected){
    console.log("setXTenantId(plantSelected)");
    console.log("plantSelected");
    console.log(plantSelected);
    console.log("this.parameters");
    console.log(this.parameters);    

    if (plantSelected){
      let p1 = new HttpParams().set("X-TENANT-ID","aguila");
      this.parameters = p1;
    }
    else{
      let p2 = new HttpParams().set("X-TENANT-ID","sol");
      this.parameters = p2;
    }
    
  }

  getCatalogoIndividual(catalogo){
    console.log("¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡");
    this.setXTenantId(this.globalService.aguila);
    console.log("httpOptions");
    console.log(httpOptions);
    console.log("this.headers");
    console.log(this.headers);
    console.log("this.parameters");
    console.log(this.parameters); 
    //return this.http.get( `${ this.micro_catalago_maestro }catalog/get/` + catalogo ,httpOptions);
    //return this.http.get( `${ this.micro_catalago_maestro }catalog/get/` + catalogo , {headers:httpOptions});
    //return this.http.get( `${ this.micro_catalago_maestro }catalog/get/` + catalogo , {headers : this.headers });
    return this.http.get( `${ this.micro_catalago_maestro }catalog/get/` + catalogo , {params : this.parameters });
  }
  
  setCatalogoIndividual(catalogo, plantSelected){
    this.setXTenantId(plantSelected);
    return this.http.post( `${ this.micro_catalago_maestro }catalog/save` , catalogo, {params : this.parameters });
  }

  outCatalogoItem(catalogName:string ,id:number){
    this.setXTenantId(this.globalService.aguila);
    return this.http.delete( `${ this.micro_catalago_maestro }catalog/delete/` + catalogName + "/" + id, {params : this.parameters });    
  }

  getlistCatalogoOrdenados(catalogos: Array<OrderCatalogDTO>) {
    this.setXTenantId(this.globalService.aguila);
    console.log("catalogos");
    console.dir(catalogos);
    return this.http.post( `${ this.micro_catalago_maestro }catalog/list`, catalogos, {params : this.parameters });   
  }





  getCatalogo(nameCat): Observable<any> {
    //return this.http.get(`${this.micro_catalago_maestro}admin/catalogo/${nameCat}`, httpOptions);
    return this.http.get(`${this.micro_catalago_maestro}admin/catalogo/${nameCat}`, {headers:httpOptions});
  }

  getOpcion(idOpcion: string): Observable<any> {
    // @ts-ignore
    // @ts-ignore
    return this.http.get(`${this.micro_catalago_maestro}catalogoOpcion/id/${idOpcion}`, httpOptions);
  }
  // tslint:disable-next-line:max-line-length
  salvarOpcion(opcionNombre: string, opcionDescripcion: string, estatus: string, orden: string, maestroNombre: string): Observable<MaestroOpcion> {
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    return this.http.post(`${this.micro_catalago_maestro}catalogoOpcion/catalogo/` + maestroNombre + `/` + opcionNombre + `/` + opcionDescripcion + `/` + estatus + `/` + orden, httpOptions);
  }

  updateOpcion(opcionNombre: string, opcionDescripcion: string, estatus: string, orden: string, maestroOpcionId: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.post(`${this.micro_catalago_maestro}catalogoOpcion/catalogo/update/` + `/` + opcionNombre + `/` + opcionDescripcion + `/` + estatus + `/` + orden + `/` + maestroOpcionId, httpOptions);
  }

  updateEstatus(maestroOpcionId: string) {
    return this.http.post(`${this.micro_catalago_maestro}catalogoOpcion/catalogo/update/estatus/` + maestroOpcionId, httpOptions);
  }

  borrarEstatus(maestroOpcionId: string) {
    return this.http.post(`${this.micro_catalago_maestro}catalogoOpcion/catalogo/delete/` + maestroOpcionId, httpOptions);
  }
}
