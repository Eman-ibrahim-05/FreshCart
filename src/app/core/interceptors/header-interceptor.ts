import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const cookies = inject(CookieService);
  let token = cookies.get('token');
  if (!token) {
    token = localStorage.getItem('token') || '';
  }
  if (token) {
    req = req.clone({
      setHeaders: {
        token,
      },
    });
  }
  return next(req);
};
