import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlistSubject = new BehaviorSubject<any[]>([]);
  wishlist$ = this.wishlistSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUserWishList(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/wishlist`).pipe(
      tap((res) => {
        this.wishlistSubject.next(res?.data || []);
      })
    );
  }

  addToWishList(id: string): Observable<any> {
    return this.http
      .post(`${environment.baseUrl}/wishlist`, { productId: id })
      .pipe(
        tap(() => {
          this.getUserWishList().subscribe();
        })
      );
  }

  removeFromWishList(id: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/wishlist/${id}`).pipe(
      tap(() => {
        this.getUserWishList().subscribe();
      })
    );
  }
}
