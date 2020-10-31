import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Tag } from '../models/Tag';
import { TagActividadInDTO } from '../models/TagActividadInDTO';
import { OrderCatalogDTO } from '../models/OrderCatalogDTO';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/core/globals/global.service';
import { EPs } from 'src/app/core/globals/endpoints';

@Injectable({
    providedIn: 'root'
})
export class TagService {
  parameters: any;

  constructor(private http: HttpClient,
              private globalService: GlobalService) { }


  getEntidadEstatus(entidad: string, estatus: string): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get(`${ EPs.statusMaster.status}${entidad}/${estatus}`, {params : this.parameters });
  }
  obtenCatalogoOpcion(maestro: string, opcion: string) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${ EPs.mastercatalog.mastercatalog.status }${maestro}/${opcion}`, {params : this.parameters });
  }
  getlistCatalogoOrdenados(catalogos: Array<OrderCatalogDTO>) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.post( `${ EPs.catalog.catalog.list }`, catalogos, {params : this.parameters });
  }

  getCatalogo(nameCat: Array<any>) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get(`${ EPs.catalog.catalog.listCatalog }/${nameCat}`, {params : this.parameters });
  }

  getEstatusMaestroOpcion() {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${ EPs.catalog.catalog.estatusOpcion }`, {params : this.parameters });
  }

  save(tag: Tag): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.post( `${ EPs.tags.save }`, tag, {params : this.parameters });
  }

  getActividadPorTag(actividad: string) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${ EPs.tags.tag }${actividad}`, {params : this.parameters });
  }

  getActividadesPrecedentes(padre): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${ EPs.tags.precedingActivity }/${padre}`, {params : this.parameters });
  }

  agregarPrecedentes(tag, tags): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${ EPs.tags.precedingAdd }/${tag}/${tags}`, {params : this.parameters });
  }

  eliminarPrecedente(tagPrecedente): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.post( `${ EPs.tags.precedingDelete }`, tagPrecedente, {params : this.parameters });
  }

  obtenTagPorFiltros(anio: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${ EPs.tracing.legal.get.matrizAnio }/${anio}`, {params : this.parameters });
  }

  obtenTagCatalogos(params: HttpParams): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    console.log(this.parameters.get("X-TENANT-ID"));
    params = params.set ( "X-TENANT-ID", this.parameters.get ( "X-TENANT-ID" ) )
                   .set ( "user", this.parameters.get ( "user" ) );
    return this.http.get( `${ EPs.tracing.legal.get.catalog }`, {params : params });
  }

  obtenTagFiltros(params: HttpParams): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    console.log(this.parameters.get("X-TENANT-ID"));
    params = params.set ( "X-TENANT-ID", this.parameters.get ( "X-TENANT-ID" ) )
                   .set ( "user", this.parameters.get ( "user" ) );
    return this.http.get( `${ EPs.tracing.legal.get.matriz }`, {params : params });
  }
  obtenMatriz(anio: number, a: number, b: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${  EPs.tracing.legal.get.matriz }/${anio}/${a}/${b}`, {params : this.parameters });
  }

  eliminarTag(tagId: number) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${ EPs.tags.delete }/${tagId}`, {params : this.parameters });
  }

  // Actividades
  getCatalogoActividades(status): Observable<any> {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${ EPs.tags.activity.all }/${status}`, {params : this.parameters });
  }

  getPrefijoConsecutivo(actividadId: number) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${ EPs.tags.activity.getConsecutive }/${actividadId}`, {params : this.parameters });
  }

  getActividad(actividadId: number) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${ EPs.tags.activity.getActivity }/${actividadId}`, {params : this.parameters });
  }

  crearActividad(actividad: TagActividadInDTO, selectedPlant) {
    this.parameters = this.globalService.setXTenantId_Plant(selectedPlant);
    return this.http.post( `${ EPs.tags.activity.create }`, actividad, {params : this.parameters });
  }

  actualizarPorClonacion(actividadId: number, referenceclone: string) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.post( `${ EPs.tags.activity.edit.fatherclone }/${actividadId}/${referenceclone}`, null, {params : this.parameters });
  }

  editarActividad(actividad: TagActividadInDTO) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.post( `${ EPs.tags.activity.ed }`, actividad, {params : this.parameters });
  }
  setEditClonated(actividad, plantSelected) {
    this.parameters = this.globalService.setXTenantId(plantSelected);
    return this.http.post( `${ EPs.tags.activity.editedclonated }` , actividad, {params : this.parameters });
  }

  eliminarActividad(idActivity: number) {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${ EPs.tags.activity.delete }/${idActivity}`, {params : this.parameters });
  }
  outCatalogItemCloned(referenceclone: string) {
    this.parameters = this.globalService.setXTenantId(!this.globalService.aguila);
    return this.http.get( `${ EPs.tags.activity.deleteclonated }/${referenceclone}`, {params : this.parameters });
  }

  comboUnitPeriod() {
    this.parameters = this.globalService.setXTenantId_Plant(this.globalService.plant.name);
    return this.http.get( `${ EPs.mastercatalog.mastercatalog.unitPeriod }`, {params : this.parameters });
  }
}
