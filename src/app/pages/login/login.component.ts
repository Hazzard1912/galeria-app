import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { emailValidator } from 'src/app/validators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formulario: FormGroup = this.fb.group({
    correo: ['', [Validators.required, emailValidator()]],
    password: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['usuario']);
    }
  }
  request() {
    const credentials = {
      correo: this.formulario.get('correo')?.value,
      password: this.formulario.get('password')?.value,
    };
    this.formulario.reset();
    this.authService
      .login(credentials.correo, credentials.password)
      .subscribe((login) => {
        if (login.token) {
          localStorage.setItem('token', login.token);
          this.router.navigate(['usuario']);
        }
      });
  }
}
