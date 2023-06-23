import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

interface Respuesta {
  msg: string;
}

interface Login {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.baseUrl;

  validateToken(token: string): Observable<string> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const options = { headers };
    return this.http
      .get<Respuesta>(`${this.baseUrl}/usuario/validate-token`, options)
      .pipe(map((respuesta) => respuesta.msg));
  }

  constructor(private http: HttpClient, private router: Router) {}

  login(correo: string, password: string): Observable<Login> {
    const body = { correo, password };
    return this.http.post<Login>(`${this.baseUrl}/auth/login`, body);
  }

  create(correo: string, password: string) {
    const body = { correo, password };
    return this.http.post<Respuesta>(`${this.baseUrl}/usuario`, body);
  }

  redirectToLogin(): void {
    this.router.navigate(['login']);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
