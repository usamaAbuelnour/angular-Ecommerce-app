import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchProductsService {

  private http = inject(HttpClient)

  getProducts() {
    return this.http.get('https://dummyjson.com/products')
  }
  getProductByID(id: number) {
    return this.http.get(`https://dummyjson.com/products/${id}`)
  }
}
