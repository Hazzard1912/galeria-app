import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface RespuestaImagenes {
  imagenes: Imagen[];
}

interface Imagen {
  ruta: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  cargarImagenes(token: string): Observable<RespuestaImagenes> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const options = { headers };
    const url = `${this.baseUrl}/uploads`;
    return this.http.get<RespuestaImagenes>(url, options);
  }

  subirArchivo(token: string, archivo: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const options = { headers };
    const formData = new FormData();
    formData.append('archivo', archivo);
    const url = `${this.baseUrl}/uploads`;
    return this.http.post(url, formData, options);
  }
}
