import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

type decodedUser = { id: string; name: string; role: string };

export interface UserData {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface UserDataLogin {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: BehaviorSubject<any> = new BehaviorSubject(null);
  isLogin: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        this.decodedToken(token);
        this.isLogin.next(true);
      }
    }
  }

  // Register
  register(data: UserData): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}/auth/signup`,
      data
    );
  }

  //Login
  login(data: UserDataLogin): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}/auth/signin`,
      data
    );
  }

  //Reset Password
  forgetPassword(email: string): Observable<{
    statusMsg: 'success' | 'fail';
    message: string;
  }> {
    return this.http.post<{
      statusMsg: 'success' | 'fail';
      message: string;
    }>(`${environment.baseUrl}/auth/forgotPasswords`, {
      email,
    });
  }

  //Verify Code
  verifyCode(code: string): Observable<{
    status?: 'Success' | 'fail';
    statusMsg?: 'success' | 'fail';
  }> {
    return this.http.post<{
      status?: 'Success' | 'fail';
      statusMsg?: 'success' | 'fail';
    }>(`${environment.baseUrl}/auth/verifyResetCode`, {
      resetCode: code,
    });
  }

  //Reset Password
  resetPassword(email: string, newPassword: string): Observable<any> {
    return this.http.put(
      `${environment.baseUrl}/auth/resetPassword`,
      { email, newPassword }
    );
  }

  //decode token
  decodedToken(token: string) {
    const decoded = jwtDecode(token);
    this.userData.next(decoded);
    return decoded;
  }

  logOut() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      this.userData.next(null);
      this.router.navigate(['/login']);
    }
  }
}
