import { Router, RouterModule } from '@angular/router';
import { AccesoService } from './../../services/acceso.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../models/requests/LoginRequest';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCheckboxModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private accesoService = inject(AccesoService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public formLogin: FormGroup = this.formBuild.group({
    correo: ['', Validators.required],
    contrasena: ['', Validators.required],
  });

  iniciarSesion() {
    if (this.formLogin.invalid) return;

    const request: LoginRequest = {
      correo: this.formLogin.value.correo,
      password: this.formLogin.value.contrasena,
    };

    this.accesoService.Login(request).subscribe({
      next: (response) => {
        // console.log(response)
        if (response.success) {
          localStorage.setItem('token', response.data.token);
          this.router.navigate(['admin']);
        }
        else {
          alert("Las credenciales son incorrectas");
        }
      },
      error: (error) => {
        console.log(error.message);
      }
    });
  }

  registrarse() {
    this.router.navigate(['registro']);
  }
}
