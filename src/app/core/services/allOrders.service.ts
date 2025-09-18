import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Response, Orders } from '../models/api.interface';

@Injectable({
  providedIn: 'root',
})
export class AllOrdersService {
  private http = inject(HttpClient);

  getAllOrders(): Observable<Response<Orders>> {
    return this.http.get<Response<Orders>>(`${environment.baseUrl}/orders/`);
  }
}
