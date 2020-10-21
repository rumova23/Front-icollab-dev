import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MaestroOpcion } from '../models/maestro-opcion';
import { OrderCatalogDTO } from '../../compliance/models/OrderCatalogDTO';
import { GlobalService } from 'src/app/core/globals/global.service';
import { EPs } from '../globals/endpoints';


@Injectable({
  providedIn: 'root'
})
export class CatalogoMaestroService {
  parameters:any;

  constructor(private http: HttpClient,
              public globalService: GlobalService) { }

  getCatalogoIndividual(catalogo) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ EPs.catalog.catalog.get }` + catalogo , {params : this.parameters });
  }

  setCatalogoIndividual(catalogo, plantSelected) {
    this.parameters = this.globalService.setXTenantId(plantSelected);
    return this.http.post( `${ EPs.catalog.catalog.save }` , catalogo, {params : this.parameters });
  }

  updateIndividual(catalogo, plantSelected) {
    this.parameters = this.globalService.setXTenantId(plantSelected);
    return this.http.post( `${ EPs.catalog.catalog.udpate }` , catalogo, {params : this.parameters });
  }
  setEditClonated(catalogo, plantSelected) {
    this.parameters = this.globalService.setXTenantId(plantSelected);
    return this.http.post( `${ EPs.catalog.catalog.editedclonated }` , catalogo, {params : this.parameters });
  }
  hasClonated(catalogo, plantSelected) {
    this.parameters = this.globalService.setXTenantId(plantSelected);
    return this.http.post( `${ EPs.catalog.catalog.hasclonated }` , catalogo, {params : this.parameters });
  }

  outCatalogoItem(catalogName: string , id: number) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.delete( `${ EPs.catalog.catalog.delete }${catalogName}/${id}`, {params : this.parameters });
  }
  outCatalogItemCloned(catalogName: string, referenceclone: string) {
    this.parameters = this.globalService.setXTenantId(!this.globalService.aguila);
    return this.http.delete( `${ EPs.catalog.catalog.deleteclonated }/${catalogName}/${referenceclone}`, {params : this.parameters });
  }

  getlistCatalogoOrdenados(catalogos: Array<OrderCatalogDTO>) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ EPs.catalog.catalog.list }`, catalogos, {params : this.parameters });
  }

  getCatalogo(nameCat): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(`${ EPs.catalog.admin.catalog}${nameCat}`, {params : this.parameters });
  }

  getOpcion(idOpcion: string): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get(`${ EPs.catalog.catalogOption.id}${idOpcion}`, {params : this.parameters });
  }
  salvarOpcion(opcionNombre: string, opcionDescripcion: string, estatus: string, orden: string, maestroNombre: string): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(`${ EPs.catalog.catalogOption.catalog}` + maestroNombre + '/' + opcionNombre + '/' + opcionDescripcion + '/' + estatus + '/' + orden, null, {params : this.parameters });
  }

  updateOpcion(opcionNombre: string, opcionDescripcion: string, estatus: string, orden: string, maestroOpcionId: string) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(`${ EPs.catalog.catalogOption.catalog.update}` + `/` + opcionNombre + `/` + opcionDescripcion + `/` + estatus + `/` + orden + `/` + maestroOpcionId, null, {params : this.parameters });
  }

  updateEstatus(maestroOpcionId: string) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(`${ EPs.catalog.catalogOption.catalog.update.estatus }` + maestroOpcionId, null, {params : this.parameters });
  }

  borrarEstatus(maestroOpcionId: string) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post(`${ EPs.catalog.catalogOption.catalog.delete}` + maestroOpcionId, null, {params : this.parameters });
  }
}
