import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '@app/core/services';
import { SweetService } from '@app/core/services/sweet.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {

  loginForm: UntypedFormGroup;
  visibleSendEmail=true;
  visibleCheck=false;
  error = '';

  constructor(private formBuilder: UntypedFormBuilder,
    private authenticationService: AuthenticationService,
    private sweet : SweetService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      correo: [
        '',
        [Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        Validators.required]
      ],
    });
  }

  get f() { return this.loginForm.controls; }

  async onSubmit() {
    try {
     this.spinner.show();
      if (this.loginForm.invalid) {
         this.spinner.hide();
        return;
      }
      await this.authenticationService.forgotPassword(this.f['correo']?.value);
      this.sweet.showSwalExito("Restablecer", "Enviamos un correo electrónico para Restablecer contraseña.");
      this.mensajeDeError();
      this.visibleSendEmail = false;
      this.visibleCheck = true;
       this.spinner.hide();
    } catch (err) {
      this.visibleSendEmail = true;
      if(err.status && (err.status !== 500 || err.status !== 0 )){
        if(err.error=="Has alcanzado el límite de intentos. Si hay un usuario vinculado a esta cuenta, recibirás un correo electrónico para desbloquearlo"){
          // this.MensajeIntentos(err.error);
        }
        else{
          this.mensajeDeError();
        }
         this.visibleSendEmail = false;
         this.visibleCheck = true;
         setTimeout(() => this.error = '' , 5000);
      } else {
        this.error = "Estamos teniendo algunos problemas, inténtalo de nuevo más tarde.";
      }
      this.spinner.hide();
    }
  }

  mensajeDeError(){
    this.sweet.showSwalExito("","Si existe un usuario ligado a esta cuenta, recibirá un correo para restablecer su contraseña.");
  }
}
