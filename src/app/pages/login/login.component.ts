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
import { CommonModule } from '@angular/common';

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
    MatCheckboxModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  private accesoService = inject(AccesoService);
  public formBuild = inject(FormBuilder);

  formLogin: FormGroup;
  isButtonDisabled: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private swalLoading: LoadingService) {
    // Inicializar el formulario con validaciones
    this.formLogin = this.fb.group({
      correo: ['', [Validators.required, Validators.email]], // Campo obligatorio y debe ser un correo válido
      contrasena: ['', [Validators.required, Validators.minLength(8)]], // Campo obligatorio y al menos 8 caracteres
    });
  }

  iniciarSesion() {
    this.swalLoading.showLoading("Login", "Iniciando session...");
    this.bloquearBoton();

    if (this.formLogin.valid) {
      const { correo, contrasena } = this.formLogin.value;

      const request: LoginRequest = {
        correo: this.formLogin.value.correo,
        password: this.formLogin.value.contrasena,
      };

      this.accesoService.Login(request).subscribe({
        next: (response) => {
          if (response.success) {
            localStorage.setItem('token', response.data.token);
            this.swalLoading.close();
            this.router.navigate(['admin']);
          }
          else {
            this.desbloquearBoton();
            this.swalLoading.showError("Las credenciales son incorrectas", response.message);
            this.formLogin.markAllAsTouched();
          }
        },
        error: (error) => {
          this.desbloquearBoton();
          this.swalLoading.showError('Formulario inválidoss', error.error.message);
          this.formLogin.markAllAsTouched();
        }
      });
    } else {
      this.desbloquearBoton();
      this.swalLoading.showError('Formulario inválido');
      this.formLogin.markAllAsTouched(); // Marca todos los campos como "tocados" para mostrar errores
    }
  }

  bloquearBoton() {
    this.isButtonDisabled = true;
  }

  desbloquearBoton() {
    this.isButtonDisabled = false;
  }
}
