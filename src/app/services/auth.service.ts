import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface Registration {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = 'http://95.111.253.41:8000';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  register(data: Registration): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, data).pipe(
      tap(res => {
        const token = res.token || res.access_token || res.data?.token;
        if (token) {
          localStorage.setItem('token', token);
        } else {
          console.error('No token found in registration response:', res);
        }
      })
    );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => {
        const token = res.token || res.access_token || res.data?.token;
        if (token) {
          localStorage.setItem('token', token);
        } else {
          console.error('No token found in login response:', res);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}