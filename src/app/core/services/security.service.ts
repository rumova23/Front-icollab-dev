import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Role } from 'src/app/security/models/Role';
import { Parameter } from 'src/app/security/models/Parameter';
import { Grant } from 'src/app/security/models/Grant';
import { User } from 'src/app/security/models/User';
import { TreeviewItem } from 'ngx-treeview';
import { RoleGrant } from 'src/app/security/models/RoleGrant';
import { Validate } from '../helpers/util.validator.';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


const HEADERS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept-Language': 'es-419,es;q=0.9',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};


@Injectable({ providedIn: 'root' })
export class SecurityService {
  private currentUser;

  parameters:any;
  constructor(private http: HttpClient, private router: Router) {
  }


  setUserId() {
    let user = JSON.parse(localStorage.getItem('user'));
    user = user['username'];
    this.parameters = new HttpParams().set('user', user);
  }


  getTreeSample(): TreeviewItem[] {
    const childrenCategory = new TreeviewItem({
      text: 'Children', value: 1, collapsed: true, children: [
        { text: 'Baby 3-5', value: 11 },
        { text: 'Baby 6-8', value: 12 },
        { text: 'Baby 9-12', value: 13 }
      ]
    });
    const itCategory = new TreeviewItem({
      text: 'IT', value: 9, children: [
        {
          text: 'Programming', value: 91, children: [{
            text: 'Frontend', value: 911, children: [
              { text: 'Angular 1', value: 9111 },
              { text: 'Angular 2', value: 9112 },
              { text: 'ReactJS', value: 9113, disabled: true }
            ]
          }, {
            text: 'Backend', value: 912, children: [
              { text: 'C#', value: 9121 },
              { text: 'Java', value: 9122 },
              { text: 'Python', value: 9123, checked: false, disabled: true }
            ]
          }]
        },
        {
          text: 'Networking', value: 92, children: [
            { text: 'Internet', value: 921 },
            { text: 'Security', value: 922 }
          ]
        }
      ]
    });
    return [childrenCategory, itCategory];
  }

  /*
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  } */

  public getCurrentUser(): User {
    if(Validate(localStorage.getItem('user'))) {
      return JSON.parse(localStorage.getItem('user'));
    }
    return null;
  }

  public getToken(): User {
    if(Validate(localStorage.getItem('user'))) {
      return JSON.parse(localStorage.getItem('user')).token;
    }
    return null;
  }

  public getNameUser(): string {
    if(Validate(localStorage.getItem('user'))) {
      return JSON.parse(localStorage.getItem('user')).name;
    }
    return null;
  }

  public getLastNameUser(): string {
    if(Validate(localStorage.getItem('user'))) {
      return JSON.parse(localStorage.getItem('user')).lastName;
    }
    return null;
  }

  /*
  login(username: string, password: string) {
    console.dir(username);
    console.dir(password);

    return this.http.post<any>(`${this.baseUrl}` + 'compliace/security/login', { 'username': username, 'password': password }, httpOptions)
      .pipe(map(user => {
        console.dir(user);
        // login successful if there's a jwt token in the response
        if (user && user.access_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        catchError(this.handleError<any>('login'))
        return user;
      }));
  } */

  getMenu(name: string): any[] {
    const user = this.getCurrentUser();
    if (!Validate(user)) {
      return [];
    }
    const app = user.apps.filter(app => app.name === name)[0];
    if (!Validate(app)) {
      return [];
    }
    return app.children;
  }

  login(login: any): Observable<any> {
    return this.http.post(environment.securityUrl + 'user/login', login);
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  saveUser(usuario: User): Observable<any> {
    return this.http.post(environment.securityUrl + 'user/save', usuario);
  }

  loadUsers(): Observable<any> {
    return this.http.get(environment.securityUrl + 'user/list');
  }

  getUser(idUser): Observable<any> {
    return this.http.get(environment.securityUrl + 'user/get/' + idUser);
  }

  loadRoles(): Observable<any> {
    return this.http.get(environment.securityUrl + 'role/list');
  }

  saveRole(role: Role): Observable<any> {
    return this.http.post(environment.securityUrl + 'role/save', role);
  }

  loadPlants() {
    return JSON.parse(localStorage.getItem('user')).plants;
    // return this.http.get(environment.securityUrl + 'plant/list');
  }

  getPlant(idPlant): Observable<any> {
    return this.http.get(environment.securityUrl + 'plant/get/' + idPlant);
  }

  loadApps() {
    return JSON.parse(localStorage.getItem('user')).apps;
    // return this.http.get(environment.securityUrl + 'app/list');
  }

  loadParameters(): Observable<any> {
    return this.http.get(environment.securityUrl + 'parameter/list');
  }

  saveParameter(parameter: Parameter): Observable<any> {
    return this.http.post(environment.securityUrl + 'parameter/save', parameter);
  }

  loadGrants(): Observable<any> {
    return this.http.get(environment.securityUrl + 'grant/list');
  }

  saveGrant(grant: Grant): Observable<any> {
    return this.http.post(environment.securityUrl + 'grant/save', grant);
  }

  loadFathers(): Observable<any> {
    return this.http.get(environment.securityUrl + 'grant/father/list');
  }

  loadGrantsRole(idRole: any): Observable<any> {
    return this.http.get(environment.securityUrl + 'grant/list/' + idRole);
  }

  loadGrantsTree(idApp: number): Observable<any> {
    return this.http.get(environment.securityUrl + 'grant/tree/list/' + idApp);
  }

  changePassword(changePassword: any): Observable<any> {
    this.setUserId();
    return this.http.post(environment.securityUrl + 'user/password/change', changePassword ,{params : this.parameters });
  }

  saveRoleGrants(roleGrant: RoleGrant): Observable<any> {
    return this.http.post(environment.securityUrl + 'grant/role/save', roleGrant);
  }
}
