import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';



@Injectable({ providedIn: 'root' })
export class ProductService {

  constructor(private http: HttpClient) {
  }
  
  loadProducts(): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'product/list');
  }

  saveProduct(product: Product): Observable<any> {
    return this.http.post(environment.mercadoUrl + 'product/save', product);
  }

  loadTypeProducts(): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'typeProduct/list');
  }

  loadProductsSat(): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'productSat/list');
  }

  loadUnityProductsSat(): Observable<any> {
    return this.http.get(environment.mercadoUrl + 'unityProductSat/list');
  }

}
