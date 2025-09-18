import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand ,Response } from '../models/api.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private http: HttpClient) {}

  getAllBrands(): Observable<Response<Brand>> {
    return this.http.get<Response<Brand>>(
      `${environment.baseUrl}/brands`
    );
  }

  getSpecificBrand(id: string): Observable<{ data: Brand }> {
    return this.http.get<{ data: Brand }>(
      `${environment.baseUrl}/brands/${id}`
    );
  }
}
