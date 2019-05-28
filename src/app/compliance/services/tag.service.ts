import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TagPrecedente } from '../models/TagPrecedente';
import { Tag } from '../models/Tag';
import { TagActividadInDTO } from '../models/TagActividadInDTO';
import { OrderCatalogDTO } from '../models/OrderCatalogDTO';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept-Language': 'es-419,es;q=0.9',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: 'authkey',

  })
};

@Injectable({
    providedIn: 'root'
})
export class TagService {

  private baseCatalagoUrl = environment.mnUrl;
  private baseMicroTagUrl = environment.mtUrl;
  private baseSeguridadUrl = environment.pgUrl;
  private baseMicroExamenUrl = environment.cnUrl;

  constructor(private http: HttpClient) { }

  getlistCatalogoOrdenados(catalogos: Array<OrderCatalogDTO>) {
    console.dir(catalogos);
    return this.http.post( `${ this.baseCatalagoUrl }listCatalogosOrdenados`, catalogos, httpOptions);
  }

  getCatalogo(nameCat: Array<any>) {
    return this.http.get(`${ this.baseCatalagoUrl }listCatalogos/${nameCat}`, httpOptions);
  }

  getEstatusMaestroOpcion() {
    return this.http.get( `${ this.baseCatalagoUrl }getEstatusMaestroOpcion`, httpOptions);
  }

  save(tag: Tag) {
    console.dir(tag);
    return this.http.post( `${ this.baseMicroTagUrl }guardar`, tag, httpOptions);
  }

  getActividadPorTag(actividad: string) {
    return this.http.get( `${ this.baseMicroTagUrl }${actividad}`, httpOptions);
  }

  getActividadesPrecedentes(padre: string, tags: string[]) {
    return this.http.get( `${ this.baseMicroTagUrl }getActividadesPrecedentes/${padre}/${tags}`, httpOptions);
  }

  /*
  getPrecedentesPorTag(padre: string, tags: string[]){
    return this.http.get( `${ this.baseMicroTagUrl }getPrecedentesPorTag/${padre}/${tags}`, httpOptions);
  }
  */

  agregarPrecedentes(tag: string, tags: string[]) {
    return this.http.get( `${ this.baseMicroTagUrl }agregarPrecedentes/${tag}/${tags}`, httpOptions);
  }

  eliminarPrecedente(tagPrecedente: TagPrecedente) {
    console.log(tagPrecedente);
    return this.http.post( `${ this.baseMicroTagUrl }eliminarPrecedente`, tagPrecedente, httpOptions);
  }

  obtenTagPorFiltros(plantaId: string) {
    return this.http.get( `${ this.baseMicroTagUrl }obtenTagPorFiltros/${plantaId}`, httpOptions);
  }

  eliminarTag(tagId: number) {
    return this.http.get( `${ this.baseMicroTagUrl }tag/eliminar/${tagId}`, httpOptions);
  }

  // Actividades
  getCatalogoActividades() {
    return this.http.get( `${ this.baseMicroTagUrl }actividad/all`, httpOptions);
  }

  getPrefijoConsecutivo(actividadId: number) {
    return this.http.get( `${ this.baseMicroTagUrl }actividad/obtenerConsecutivo/${actividadId}`, httpOptions);
  }

  getActividad(actividadId: number) {
    return this.http.get( `${ this.baseMicroTagUrl }actividad/obtenerActividad/${actividadId}`, httpOptions);
  }

  crearActividad(actividad: TagActividadInDTO) {
    console.dir(actividad);
    return this.http.post( `${ this.baseMicroTagUrl }actividad/crear`, actividad, httpOptions);
  }

  editarActividad(actividad: TagActividadInDTO) {
    console.dir(actividad);
    return this.http.post( `${ this.baseMicroTagUrl }actividad/editar`, actividad, httpOptions);
  }

  eliminarActividad(actividadId: number) {
    return this.http.get( `${ this.baseMicroTagUrl }actividad/eliminar/${actividadId}`, httpOptions);
  }

}