import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ImageModule } from 'primeng/image';
import { ApiService } from 'src/app/services/api.service';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FileUploadModule, FileUploadEvent } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    MenuModule,
    ImageModule,
    FileUploadModule,
    ButtonModule,
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  items: MenuItem[] = [];

  imagenes: string[] = [];

  ngOnInit(): void {
    this.cargarImagenes();
  }

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  private cargarImagenes(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.apiService
        .cargarImagenes(token)
        .pipe(
          tap((imagenes) => {
            for (let imagen of imagenes.imagenes) {
              this.imagenes.push(imagen.ruta);
            }
          })
        )
        .subscribe();
    }
  }

  subirArchivo(event: FileUploadEvent) {
    const token = localStorage.getItem('token');
    if (token) {
      const archivo = event.files[0];
      console.log(archivo);
      this.apiService.subirArchivo(token, archivo).subscribe((respuesta) => {
        location.reload();
      });
    }
  }

  logout() {
    this.authService.logout();
  }
}
