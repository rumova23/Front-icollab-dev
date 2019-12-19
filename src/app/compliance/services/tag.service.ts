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
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TagService {
  private baseCatalagoUrl = environment.catalogUrl;
  private baseMicroTagUrl = environment.tagsUrl;
  private seguimientoUrl = environment.seguimientoUrl;
  private mastercatalog = environment.mastercatalog;
  private estatusmaestro = environment.estatusmaestro;
  parameters: any;

  constructor(private http: HttpClient,
              private globalService: GlobalService) { }


  getEntidadEstatus(entidad: string, estatus: string): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get(`${this.estatusmaestro}${entidad}/${estatus}`, {params : this.parameters });
  }
  obtenCatalogoOpcion(maestro: string, opcion: string) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${ this.baseCatalagoUrl }mastercatalog/mastercatalog/${maestro}/${opcion}`, {params : this.parameters });
  }
  getlistCatalogoOrdenados(catalogos: Array<OrderCatalogDTO>) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    // return this.http.post( `${ this.baseCatalagoUrl }catalog/list`, catalogos, httpOptions);
    return this.http.post( `${ this.baseCatalagoUrl }catalog/list`, catalogos, {params : this.parameters });
  }

  getCatalogo(nameCat: Array<any>) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get(`${ this.baseCatalagoUrl }catalog/listCatalogos/${nameCat}`, {params : this.parameters });
  }

  getEstatusMaestroOpcion() {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${ this.baseCatalagoUrl }catalog/getEstatusMaestroOpcion`, {params : this.parameters });
  }

  save(tag: Tag): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.post( `${ this.baseMicroTagUrl }guardar`, tag, {params : this.parameters });
  }

  getActividadPorTag(actividad: string) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${ this.baseMicroTagUrl }${actividad}`, {params : this.parameters });
  }

  getActividadesPrecedentes(padre): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${ this.baseMicroTagUrl }getActividadesPrecedentes/${padre}`, {params : this.parameters });
  }

  /*
  getPrecedentesPorTag(padre: string, tags: string[]){
    return this.http.get( `${ this.baseMicroTagUrl }getPrecedentesPorTag/${padre}/${tags}`, httpOptions);
  }
  */

  agregarPrecedentes(tag, tags): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${ this.baseMicroTagUrl }agregarPrecedentes/${tag}/${tags}`, {params : this.parameters });
  }

  eliminarPrecedente(tagPrecedente): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.post( `${ this.baseMicroTagUrl }eliminarPrecedente`, tagPrecedente, {params : this.parameters });
  }

  obtenTagPorFiltros(anio: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${ this.seguimientoUrl }legal/obten/matriz/${anio}`, {params : this.parameters });
  }

  obtenMatriz(anio: number, a: number, b: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${ this.seguimientoUrl }legal/obten/matriz/${anio}/${a}/${b}`, {params : this.parameters });
  }
  /*
  obtenTagPorFiltros(plantaId) : Observable<any> {
    return this.http.get( `${ this.baseMicroTagUrl }obtenTagPorFiltros/${plantaId}`, httpOptions);
  }*/

  eliminarTag(tagId: number) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${ this.baseMicroTagUrl }eliminar/${tagId}`, {params : this.parameters });
  }

  // Actividades
  getCatalogoActividades(status): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${ this.baseMicroTagUrl }actividad/all/${status}`, {params : this.parameters });
  }

  getPrefijoConsecutivo(actividadId: number) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${ this.baseMicroTagUrl }actividad/obtenerConsecutivo/${actividadId}`, {params : this.parameters });
  }

  getActividad(actividadId: number) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${ this.baseMicroTagUrl }actividad/obtenerActividad/${actividadId}`, {params : this.parameters });
  }

  crearActividad(actividad: TagActividadInDTO, selectedPlant) {
    this.parameters = this.globalService.setXTenantId_Plant(selectedPlant);
    return this.http.post( `${ this.baseMicroTagUrl }actividad/crear`, actividad, {params : this.parameters });
  }

  actualizarPorClonacion(actividadId: number, referenceclone: string) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.post( `${ this.baseMicroTagUrl }actividad/edit/fatherclone/${actividadId}/${referenceclone}`, null, {params : this.parameters });
  }

  editarActividad(actividad: TagActividadInDTO) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.post( `${ this.baseMicroTagUrl }actividad/editar`, actividad, {params : this.parameters });
  }
  setEditClonated(actividad, plantSelected) {
    this.parameters = this.globalService.setXTenantId(plantSelected);
    return this.http.post( `${ this.baseMicroTagUrl }actividad/editedclonated` , actividad, {params : this.parameters });
  }

  eliminarActividad(idActivity: number) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${ this.baseMicroTagUrl }actividad/eliminar/${idActivity}`, {params : this.parameters });
  }
  outCatalogItemCloned(referenceclone: string) {
    this.parameters = this.globalService.setXTenantId(!this.globalService.aguila);
    return this.http.get( `${ this.baseMicroTagUrl }actividad/deleteclonated/${referenceclone}`, {params : this.parameters });
  }

  comboUnitPeriod() {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${ this.mastercatalog }mastercatalog/mastercatalog/UNIT_PERIOD`, {params : this.parameters });
  }
}
