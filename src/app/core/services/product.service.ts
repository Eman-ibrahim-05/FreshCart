import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/api.interface';
import { Product } from '../models/api.interface';
import { environment } from '../../../environments/environment.development';

interface PaginationParameters {
  limit?: number;
  page?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProducts({
    limit = 20,
    page = 1,
  }: PaginationParameters): Observable<Response<Product>> {
    const params = new HttpParams()
      .set('limit', String(limit))
      .set('page', String(page));

    return this.http.get<Response<Product>>(
      `${environment.baseUrl}/products`,
      { params }
    );
  }

  getSpecificProduct(id: string): Observable<{ data: Product }> {
    return this.http.get<{ data: Product }>(`${environment.baseUrl}/products/${id}`);
  }
}
