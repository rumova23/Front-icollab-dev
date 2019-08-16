import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TagPrecedente } from '../models/TagPrecedente';
import { Tag } from '../models/Tag';
import { TagActividadInDTO } from '../models/TagActividadInDTO';
import { OrderCatalogDTO } from '../models/OrderCatalogDTO';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/core/globals/global.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept-Language': 'es-419,es;q=0.9',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: 'authkey',

    //X-TENANT-ID : 'aguila'
  })
};

@Injectable({
    providedIn: 'root'
})
export class TagService {
  private baseCatalagoUrl = environment.mnUrl;
  private baseMicroTagUrl = environment.mtUrl;
  
  parameters:any;

  constructor(private http: HttpClient
             ,private globalService: GlobalService) { }

  setXTenantId(plantSelected){
    console.log("setXTenantId(plantSelected)");
    console.log("plantSelected");
    console.log(plantSelected);
    console.log("this.parameters");
    console.log(this.parameters);    

  let user = JSON.parse(localStorage.getItem('user'));
      console.log("user");
      console.dir(user);  
      user = user['username'];
      console.log("user");
      console.dir(user);

    if (plantSelected){
      let p1 = new HttpParams().set("X-TENANT-ID","aguila")
                               .set("user",user);
      this.parameters = p1;
    } 
    else{
      let p2 = new HttpParams().set("X-TENANT-ID","sol")
                               .set("user",user);      
      this.parameters = p2;
    }
    
  }


  getlistCatalogoOrdenados(catalogos: Array<OrderCatalogDTO>) {
    this.setXTenantId(this.globalService.aguila);
    console.dir(catalogos); 
    //return this.http.post( `${ this.baseCatalagoUrl }catalog/list`, catalogos, httpOptions);
    return this.http.post( `${ this.baseCatalagoUrl }catalog/list`, catalogos, {params : this.parameters });
  }

  getCatalogo(nameCat: Array<any>) {
    this.setXTenantId(this.globalService.aguila);    
    return this.http.get(`${ this.baseCatalagoUrl }catalog/listCatalogos/${nameCat}`, {params : this.parameters });
  }

  getEstatusMaestroOpcion() {
    this.setXTenantId(this.globalService.aguila);    
    return this.http.get( `${ this.baseCatalagoUrl }catalog/getEstatusMaestroOpcion`, {params : this.parameters });
  }

  save(tag: Tag) : Observable<any> {
    this.setXTenantId(this.globalService.aguila);    
    console.dir(tag);
    return this.http.post( `${ this.baseMicroTagUrl }save`, tag, {params : this.parameters });
  }

  getActividadPorTag(actividad: string) {
    this.setXTenantId(this.globalService.aguila);    
    return this.http.get( `${ this.baseMicroTagUrl }${actividad}`, {params : this.parameters });
  }

  getActividadesPrecedentes(padre) : Observable<any> {
    this.setXTenantId(this.globalService.aguila);    
    return this.http.get( `${ this.baseMicroTagUrl }getActividadesPrecedentes/${padre}`, {params : this.parameters });
  }

  /*
  getPrecedentesPorTag(padre: string, tags: string[]){
    return this.http.get( `${ this.baseMicroTagUrl }getPrecedentesPorTag/${padre}/${tags}`, httpOptions);
  }
  */

  agregarPrecedentes(tag, tags) : Observable<any> {
    this.setXTenantId(this.globalService.aguila);    
    return this.http.get( `${ this.baseMicroTagUrl }agregarPrecedentes/${tag}/${tags}`, {params : this.parameters });
  }

  eliminarPrecedente(tagPrecedente): Observable<any> {
    this.setXTenantId(this.globalService.aguila);    
    return this.http.post( `${ this.baseMicroTagUrl }eliminarPrecedente`, tagPrecedente, {params : this.parameters });
  }

  obtenTagPorFiltros(plantaId) : Observable<any> {
    this.setXTenantId(this.globalService.aguila);    
    return this.http.get( `${ this.baseMicroTagUrl }getAll`, {params : this.parameters });
  }
  /*
  obtenTagPorFiltros(plantaId) : Observable<any> {
    return this.http.get( `${ this.baseMicroTagUrl }obtenTagPorFiltros/${plantaId}`, httpOptions);
  }*/

  eliminarTag(tagId: number) : Observable<any> {
    this.setXTenantId(this.globalService.aguila);    
    return this.http.get( `${ this.baseMicroTagUrl }eliminar/${tagId}`, {params : this.parameters });
  }

  // Actividades
  getCatalogoActividades(status) : Observable<any> {
    this.setXTenantId(this.globalService.aguila); 
    return this.http.get( `${ this.baseMicroTagUrl }actividad/all/${status}`, {params : this.parameters });
  }

  getPrefijoConsecutivo(actividadId: number) {
    this.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.baseMicroTagUrl }actividad/obtenerConsecutivo/${actividadId}`, {params : this.parameters });
  }

  getActividad(actividadId: number) {
    this.setXTenantId(this.globalService.aguila);    
    return this.http.get( `${ this.baseMicroTagUrl }actividad/obtenerActividad/${actividadId}`, {params : this.parameters });
  }

  crearActividad(actividad: TagActividadInDTO, selectedPlant) {
    this.setXTenantId(selectedPlant);
    console.dir(actividad);
    return this.http.post( `${ this.baseMicroTagUrl }actividad/crear`, actividad, {params : this.parameters });
  }

  editarActividad(actividad: TagActividadInDTO) {
    this.setXTenantId(this.globalService.aguila);    
    console.dir(actividad);
    return this.http.post( `${ this.baseMicroTagUrl }actividad/editar`, actividad, {params : this.parameters });
  }
  setEditClonated(actividad, plantSelected){
    this.setXTenantId(plantSelected);
    return this.http.post( `${ this.baseMicroTagUrl }actividad/editedclonated` , actividad, {params : this.parameters });
  }
  




  eliminarActividad(idActivity: number) {
    this.setXTenantId(this.globalService.aguila);    
    return this.http.get( `${ this.baseMicroTagUrl }actividad/eliminar/${idActivity}`, {params : this.parameters });
  }
  outCatalogItemCloned(referenceclone:string){
    this.setXTenantId(!this.globalService.aguila);
    return this.http.get( `${ this.baseMicroTagUrl }actividad/deleteclonated/${referenceclone}`, {params : this.parameters });
  }


}