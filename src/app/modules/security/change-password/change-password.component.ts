import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '@app/core/services';
import { ConfigDirectivasService } from '@app/core/services/seguridad/configDirectivas.service';
import { SweetService } from '@app/core/services/sweet.service';
import { CustomValidators } from '@app/Utileria/CustomValidators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-change-password',
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
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  loginForm: UntypedFormGroup;
  error: string;
  uuid: string;
  hidePwd: boolean = true;
  hidePwdRepeat: boolean = true;

  longitudMinCaracter: number = 0;
  numeroMinContrasena: number = 0;
  mayusculasMinContrasena: number = 0;
  caracteresEspMinContrasena: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private sweet: SweetService,
    public _ConfigDirectiva: ConfigDirectivasService,
    public spinner: NgxSpinnerService
  ) {
    this.CargarComplejidadContr();
    this.uuid = this.activatedRoute.snapshot.params["uuid"];
  }

  ngOnInit() {
    this.CargarComplejidadContr();
    let passwordValid = Validators.compose([
      Validators.required,
      Validators.minLength(8),
      CustomValidators.patternValidator(/\d/, { hasNumber: true }),
      CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
      CustomValidators.patternValidator(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,70}$/, { hasSpecialCharacters: true }),
    ]);

    this.loginForm = this.formBuilder.group({
      correo: [{ value: '', disabled: true }, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
      password: ['', []],
      passwordRepeat: ['', []]
    });
    //get data after resolve user
    this.loginForm.setValue({
      correo: this.activatedRoute.snapshot.data[0].correo,
      password: '',
      passwordRepeat: ''
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
      if (this.f['password'].value !== this.f['passwordRepeat'].value) {
        this.error = "Contraseñas no coinciden";
        this.validarFueraDelBtn();
        this.spinner.hide();
        return;
      }
      await this.authenticationService.changePassword(this.uuid, this.f['password'].value);
      this.sweet.showSwalExito("Contraseña Restablecida", "Su contraseña ha sido cambiada correctamente.")
        .then(() => {
          this.router.navigate(["/login"]);
        });
        this.spinner.hide();
    } catch (err) {
      if (err.status && (err.status !== 500 || err.status !== 0)) {
        this.error = err.error;
        setTimeout(() => this.error = '', 30000);
      } else {
        this.error = err.error;
      }
       this.spinner.hide();
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
  }

  limpiarCampoError() {
    this.error = "";
  }

  validarFueraDelBtn() {
    if (this.f['password'].value !== '' && this.f['passwordRepeat'].value !== '') {
      if (this.f['password'].value !== this.f['passwordRepeat'].value) {
        this.error = "Contraseñas no coinciden";
      }
    }
  }

  CargarComplejidadContr() {
    let correoComple = this.activatedRoute.snapshot.data[0].correo

    ;
    this._ConfigDirectiva.CargarComplejidadCo(correoComple).subscribe(r => {
      this.longitudMinCaracter = r.longitudMinCaracter
      this.numeroMinContrasena = r.numeroMinContrasena
      this.mayusculasMinContrasena = r.mayusculasMinContrasena
      this.caracteresEspMinContrasena = r.caracteresEspMinContrasena

      if (r != null) {
        this.setValidatorsPass();
      }
    });
  }

  setValidatorsPass() {
    let passwordValidators = [];
    passwordValidators.push(Validators.required);
    if (this.longitudMinCaracter) {
      passwordValidators.push(Validators.minLength(this.longitudMinCaracter));
    }
    if (this.numeroMinContrasena) {
      passwordValidators.push(this.patternValidator(/\d/g,'hasNumber',this.numeroMinContrasena));
    }
    if (this.mayusculasMinContrasena) {
      passwordValidators.push(this.patternValidator(/[A-Z]/g,'hasCapitalCase',this.mayusculasMinContrasena));
    }
    if (this.caracteresEspMinContrasena) {
      passwordValidators.push(this.patternValidator(/[!@#$%^&*]/g,'hasSpecialCharacters',this.caracteresEspMinContrasena));
    }

    let passwordValid = Validators.compose([
      Validators.required,
      ...passwordValidators
    ]);

    this.loginForm.get('password').setValidators(passwordValid);
    this.loginForm.get('password').updateValueAndValidity();
    this.loginForm.get('passwordRepeat').setValidators(passwordValid);
    this.loginForm.get('passwordRepeat').updateValueAndValidity();
  }

  patternValidator(pattern: RegExp, nombreValidator?: string, cantidadMin?: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null; // Si el valor está vacío, no hay nada que validar
      }
      const matches = value.match(pattern);
      return matches && matches.length >= cantidadMin ? null : { [nombreValidator]: { value } };
    };
  }
}
