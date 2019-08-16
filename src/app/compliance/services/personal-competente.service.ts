import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/core/globals/global.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept-Language': 'es-419,es;q=0.9',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, content-type',
  })
};

@Injectable({
  providedIn: 'root'
})
export class PersonalCompetenteService {
  private baseUrl2 = environment.pgUrl;
  private baseUrl = environment.mtUrl;
  private microSeguimiento = environment.micro_seguimiento;

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


  getEmpleados() {
    this.setXTenantId(this.globalService.aguila);
    return this.http.get(`${this.baseUrl2}personalCompetente/empleados`, httpOptions);
  }

  
  deleteEliminar(idEmpleado: number) {
    return this.http.delete(`${this.baseUrl2}personalCompetente/empleados?idEmpleado=` + idEmpleado, httpOptions);
  }


  getTagsAsignacion(idEmpleado: number): Observable<any> {
    return this.http.get(`${this.microSeguimiento}personalCompetente/tags/ASIGNACION/${idEmpleado}`, httpOptions);
  }

  getTagsAsignado(idEmpleado: number): Observable<any> {
    return this.http.get(`${this.microSeguimiento}personalCompetente/tags/ASIGNADO/${idEmpleado}`, httpOptions);
  }

  salvarTags(listtags: Array<string>, empleadoId: number): Observable<any> {
    return this.http.post(`${this.microSeguimiento}tags/empleados?empleadoId=` + empleadoId, listtags, httpOptions);
  }

  getPlantaPerfil(): Observable<any> {
    return this.http.get(`${this.baseUrl}tags/planta/perfilActor`, httpOptions);
  }

  salvarPlantaPerfilEmpleado(lista: Array<any>) {
    return this.http.post(`${this.baseUrl}tags/planta/perfilActor`, lista, httpOptions);
  }

}
