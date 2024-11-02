import { Component, Injectable, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CustomValidators } from '../../../Utileria/CustomValidators';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationService } from '../../../core/services';
import { User } from '../../../core/models/seguridad/user.model';
import { SweetService } from '../../../core/services/sweet.service';
import { NgxSpinnerService } from 'ngx-spinner';

import swal from "sweetalert2";
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  InfoPerfilForm: UntypedFormGroup;

  submitted = false;

  hide = true;
  hideC = true;
  hideCO = true;

  buttonType;
  showOtp = false;
  userSession: any;
  rol: any;
  isDocumentosRequridos: number = 0;
  StatusDocumentDenied: boolean = false;
  public sweet2 = swal;



  // usuarioMod: crearUsuarioNuevo = new crearUsuarioNuevo();
  mostrarOcultar: boolean = false;
  mostrarOcultarA: boolean = false;
  mostrarOcultarB: boolean = false;
  VerBtnMedia: boolean = false;
  VerBtnBack: boolean = false;
  ocultaA: boolean = false;
  ocultaB: boolean = false;
  error: string;
  correoRepetido: string;

  formInvalid = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private sweet: SweetService,
    public spinner: NgxSpinnerService,
    private http: HttpClient
  ) {
    if (this.authenticationService.userValue) {
      this.router.navigate(["/home"]);
    }
  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      correo: ['', Validators.compose([ Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ]) ],
      // password: ['', Validators.required ]
      password: ['', Validators.compose([
        // 1. Password Field is Required
        Validators.required,
        // 2. check whether the entered password has a number
        // CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        // // 3. check whether the entered password has upper case letter
        // CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // // 4. check whether the entered password has a lower-case letter
        // CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        // // 5. check whether the entered password has a special character
        // CustomValidators.patternValidator(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,70}$/, { hasSpecialCharacters: true }),

        //  CustomValidators.patternValidator(/[!@#$%/&*]/, { hasSpecialCharacters: true }),
        // // 6. Has a minimum length of 8 characters
        // Validators.minLength(8)
      ])],
      // CodigoOtp: []
    });

    this.InfoPerfilForm = this.formBuilder.group({
      Nombre: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      ApellidoPaterno: ["", []],
      ApellidoMaterno: ["", []],
      CrearCorreo: ['',
        [Validators.required,
        Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      CrearContrasena: ['',
        Validators.compose([
          Validators.required,
          CustomValidators.patternValidator(/\d/, { hasNumber: true }),
          CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
          CustomValidators.patternValidator(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,70}$/, { hasSpecialCharacters: true }),
          Validators.minLength(8)])],
      ConfirmarContraena: ['', Validators.compose([
        Validators.required,
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidators.patternValidator(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,70}$/, { hasSpecialCharacters: true }),
        Validators.minLength(8)])],
      ProfesionistaIndustria: ["", []],

    });
  }

  get f() { return this.loginForm.controls; }
  get formg() { return this.InfoPerfilForm.controls; }


  async onSubmit(buttonType) {
    console.log("INICIANDO LA SESION . . ");
    // this.spinner.show()
    try {
      this.submitted = true;
      // stop here if form is invalid
      this.formInvalid = false;

      if (this.loginForm.invalid) {
        this.formInvalid = true;
        return;
      }
      this.spinner.show();

      if (buttonType === "login") {

        let respuesta = await this.authenticationService.loginA(this.f['correo'].value, this.f['password'].value);


        if (!respuesta.isError) {
          this.authenticationService.setObjLogin(this.f['correo'].value, this.f['password'].value);
          this.router.navigate(["/home"]);
          this.spinner.hide();

        } else {
          this.spinner.hide();

          console.log('mensaje', respuesta.MsgError);

        }

      }
      if (buttonType === "singUp") {
        await this.authenticationService.singUp(this.f['correo'].value, this.f['password'].value);
        this.sweet.showSwalExito("Cuenta nueva", "Le enviaremos un correo electrónico para verificar su cuenta.");
        this.spinner.hide();

      }
      //await loading.dismiss();
    } catch (err) {
      this.spinner.hide();

      if (err.error == '666') {

        this.sweet2.fire({
          title: "",
          html: `
              <br>
              <div style="font-size: 18px;text-align: justify;">
              This account has recently been deactivated. If you believe this is an error, please contact us through the following email help@intercamdreamloan.com.
              </div>`,
          icon: "warning",
          showCancelButton: false,
          confirmButtonText: "OK",
          cancelButtonText: "No",
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          // confirmButtonClass: "btn btn-success",
          // cancelButtonClass: "btn btn-danger",
          buttonsStyling: false,
        }).then((result) => {
          if (result.value) {
            this.sweet2.close();
          } else {
            this.sweet2.close();
          }
        });
      } else if (err.error.uuid === undefined) {
        if (err.status && (err.status !== 500 || err.status !== 0)) {
          this.error = err.error;
          if (err.error == "We've sent you an email with a verification code") {
            this.showOtp = true;
          }
          setTimeout(() => this.error = '', 40000);
        }
        else {
          // this.error = "We are having some problems, please try again later.";
        }
      }
      else {
        this.router.navigate(["/changepassword/" + err.error.uuid]);
      }

    }
  }


  // NUEVO LOGIN
  async login(buttonType) {
    try {
      // this.spinner.show()
      this.submitted = true;
      this.formInvalid = false;
      this.spinner.hide();

      if (this.loginForm.invalid) {
        this.formInvalid = true;
        return;
      }
      if (buttonType === "login") {
        let respuesta = await this.authenticationService.loginA(this.f['correo'].value, this.f['password'].value);

        if (respuesta.object != null) {
          this.authenticationService.setObjLogin(this.f['correo'].value, this.f['password'].value);

          let user: User = respuesta.object;

          this.authenticationService.saveToken(user.jwtToken);
          this.authenticationService.saveSession(user);

          // this.authenticationService.setObjLogin('', '');

          this.sweet.showSwalExito("Bienvenido",respuesta.object.correo);

          this.router.navigate(["/home"]);

        } else if (!respuesta.isError) {
          this.authenticationService.setObjLogin(this.f['correo'].value, this.f['password'].value);
          this.router.navigate(["/codigo-otp"]);
          this.spinner.hide();

        } else {
          this.spinner.hide();

          console.log('mensaje', respuesta.msgError);
        }
      }
      if (buttonType === "singUp") {
        await this.authenticationService.singUp(this.f['correo'].value, this.f['password'].value);
        this.sweet.showSwalExito("Nueva Cuenta", "Enviamos un correo electrónico para verificar su cuenta.");
         this.spinner.hide();

      }
       this.spinner.hide();
    } catch (err) {
      this.spinner.hide();

      if (err.error == '666') {
        this.sweet2.fire({
          title: "",
          html: `
          <br>
          <div style="font-size: 18px;text-align: justify;">
          Esta cuenta ha sido desactivada recientemente.
          Si cree que se trata de un error, comuníquese con nosotros a través del siguiente correo electrónico help@intercamdreamloan.com.
          </div>`,
          icon: "warning",
          showCancelButton: false,
          confirmButtonText: "OK",
          cancelButtonText: "No",
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false,
        }).then((result) => {
          if (result.value) {
             this.spinner.hide();

            this.sweet2.close();
          } else {
             this.spinner.hide();

            this.sweet2.close();
          }
        });
      } else if (err.error.uuid === undefined) {

        if (err.status && (err.status !== 500 || err.status !== 0)) {
          this.error = err.error;
          setTimeout(() => this.error = '', 40000);
          this.spinner.hide();
          if (err.error == "Se ha enviado un correo electrónico con el código de autenticación.") {
            this.showOtp = true;
          }
        }
        else {
          this.spinner.hide();
          this.error = "Estamos teniendo algunos problemas, inténtalo de nuevo más tarde.";
        }
         this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.router.navigate(["/changepassword/" + err.error.uuid]);
      }
    }
  }

  validarUsuarioActivo() {
  }

  mensajeBienvenida(correo: string, mensaje: string, documentoRequerido: number) {
    let traduccion = "";
    // this.translate.stream("LOGION").subscribe((t) => {
    //   traduccion = t;
    // });
    this.sweet2.fire({
      title: "",
      html: `<div style="font-size: 1.875em; font-weight: 600; font-family: 'Inter', sans-serif !important;">
                        Welcome
                      </div>
                      <br>
                      <div style="font-size: 18px;">
                        ${correo}
                      </div>
                      <br>
                      <div style="font-size: 18px;text-align: justify; font-family: 'Inter', sans-serif;">
                      ${mensaje}
                      </div>
                      <br>
                      ${(this.rol == 1 || this.rol == 3 || this.rol == 5) && documentoRequerido == 1 ? `<div><span >${traduccion['MSG-WELCOME']}</span></div>` : ''}
                      `,
      icon: "success",
      showCancelButton: false,
      confirmButtonText: "OK",
      cancelButtonText: "No",
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {
        this.sweet2.close();
        // this.spinner.hide();

      } else {
        this.sweet2.close();
        // this.spinner.hide();

      }
    });
    // this.spinner.hide();

  }

  obtenerMensajeDocumetosRequeridosWelcome(correo: string, mensaje: string) {
    // this.solicitudServe.obtenerMensajeDocumetosRequeridosWelcome().subscribe(r => {
    //   this.isDocumentosRequridos = r;
    //   this.mensajeBienvenida(correo, mensaje, this.isDocumentosRequridos)
    // });
  }

  IrPagNombresPerfil() {
    this.mostrarOcultar = true;
  }

  validarNombreUsuario(): boolean {
    this.InfoPerfilForm.controls['Nombre'].setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(150)]);
    this.InfoPerfilForm.controls['Nombre'].updateValueAndValidity();
    const control = this.InfoPerfilForm.get('Nombre');
    control.markAsTouched();
    return control.valid;
  }




}

