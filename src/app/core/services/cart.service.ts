import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { cartResponse } from '../models/api.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  addProductToCart(productId: string): Observable<any> {
    return this.http.post(`${environment.baseUrl}/cart`, { productId });
  }

  updateProductQuantity(
    productId: string,
    count: number
  ): Observable<cartResponse> {
    return this.http.put<cartResponse>(
      `${environment.baseUrl}/cart/${productId}`,
      { count }
    );
  }

  deleteSpecificProduct(productId: string): Observable<cartResponse> {
    return this.http.delete<cartResponse>(
      `${environment.baseUrl}/cart/${productId}`
    );
  }

  deleteCart(): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/cart`, {
      headers: {
        token: localStorage?.getItem('token') || '',
      },
    });
  }

  getUserCart(): Observable<cartResponse> {
    return this.http.get<cartResponse>(`${environment.baseUrl}/cart`);
  }

  CashOnDelivery(
    cart_id: string,
    shippingAddress: { details: string; phone: string; city: string }
  ): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/orders/${cart_id}`, {
      shippingAddress,
    });
  }

  checkOutSession(
    cart_id: string,
    shippingAddress: { details: string; phone: string; city: string }
  ): Observable<{ session: { url: string } }> {
    return this.http.post<{ session: { url: string } }>(
      `${environment.baseUrl}/orders/checkout-session/${cart_id}?url=${environment.frontend}`,
      { shippingAddress }
    );
  }
}
