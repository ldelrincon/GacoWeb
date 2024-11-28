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
import Swal from 'sweetalert2';
import { LoadingService } from '../../services/loading.service';

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
  public formBuild = inject(FormBuilder);

  formLogin: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private swalLoading: LoadingService) {
    // Inicializar el formulario con validaciones
    this.formLogin = this.fb.group({
      correo: ['', [Validators.required, Validators.email]], // Campo obligatorio y debe ser un correo válido
      contrasena: ['', [Validators.required, Validators.minLength(8)]], // Campo obligatorio y al menos 8 caracteres
    });
  }

  iniciarSesion() {
    this.swalLoading.showLoading("Login", "Iniciando session...");

    if (this.formLogin.valid) {
      const { correo, contrasena } = this.formLogin.value;

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
            this.swalLoading.showError("Las credenciales son incorrectas", response.message);
            this.formLogin.markAllAsTouched();
          }
        },
        error: (error) => {
          this.swalLoading.showError('Formulario inválido', error.message);
          this.formLogin.markAllAsTouched();
        }
      });
    } else {
      this.swalLoading.showError('Formulario inválido');
      this.formLogin.markAllAsTouched(); // Marca todos los campos como "tocados" para mostrar errores
    }
    this.swalLoading.close();
  }

  registrarse() {
    this.router.navigate(['registro']);
  }
}
