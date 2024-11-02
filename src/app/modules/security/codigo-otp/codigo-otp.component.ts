import { Component, Injectable } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationService } from '../../../core/services';
import { SweetService } from '../../../core/services/sweet.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from "sweetalert2";
import { HttpClientModule } from '@angular/common/http';
import { SolicitudService } from '@app/core/services/solicitud.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-codigo-otp',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule],
  templateUrl: './codigo-otp.component.html',
  styleUrl: './codigo-otp.component.scss'
})
export class CodigoOTPComponent {
  loginForm: UntypedFormGroup;
  isDocumentosRequridos: number = 0;
  rol: any;
  userSession: any;
  msgDeError: string;
  public sweet2 = swal;

  constructor(private formBuilder: UntypedFormBuilder,
    private authenticationService: AuthenticationService,
    private sweet: SweetService,
    private router: Router,
    private solicitudServe: SolicitudService,public spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({

     CodigoOtp:['',Validators.required]
    });
  }
  get f() { return this.loginForm.controls; }

  ConfirmarLogeoUsuarioIduOtp() {
    let dataLogin = this.authenticationService.getObjLogin();

    if (this.loginForm.invalid) {
      return
    }
      this.spinner.show()
      this.authenticationService.ConfirmarLogeoUsuarioIduOtp(dataLogin.dataCuenta, dataLogin.dataPass, this.loginForm.get('CodigoOtp').value).then(r => {

      if (r.object != null) {
        this.authenticationService.setObjLogin('', '');
        this.sweet.showSwalExito("Bienvenido", r.object.correo);
        this.router.navigate(["/home"]);
         this.spinner.hide();
      }
      else {
        this.msgDeError = 'Código erróneo';
        this.spinner.hide();
      }
       this.spinner.hide();

    }, error => {
       this.spinner.hide();
      console.log(error);

      this.authenticationService.clearSession();
      this.router.navigate(["/auth"]);
    });
     this.spinner.hide();

  }


  mensajeBienvenida(correo: string, mensaje: string, documentoRequerido: number) {
    this.sweet2.fire({
      title: "",
      html: `<div style="font-size: 1.875em; font-weight: 600;">
                        Welcome
                      </div>
                      <br>
                      <div style="font-size: 18px;">
                        ${correo}
                      </div>
                      <br>
                      <div style="font-size: 18px;text-align: justify;">
                      ${mensaje}
                      </div>
                      <br>
                      ${(this.rol == 1 || this.rol == 3 || this.rol == 5) && documentoRequerido == 1 ? `<div><span >Hola</span></div>` : ''}
                      `,
      icon: "success",
      showCancelButton: false,
      confirmButtonText: "OK",
      cancelButtonText: "No",
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {
        this.sweet2.close();
      } else {
        this.sweet2.close();
      }
    });

  }
}
