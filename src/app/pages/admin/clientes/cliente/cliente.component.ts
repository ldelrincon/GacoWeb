import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDivider } from '@angular/material/divider';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    FlexLayoutModule,
    MatDivider
  ],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent implements OnInit {
  clientesForm!: FormGroup;

  // Opciones para los select de Régimen Fiscal y Municipio
  regimenesFiscales = [
    { id: 1, nombre: 'General de Ley' },
    { id: 2, nombre: 'Régimen Simplificado' }
  ];

  municipios = [
    { id: 1, nombre: 'Municipio 1' },
    { id: 2, nombre: 'Municipio 2' }
  ];

  estados = [
    { id: 1, nombre: 'estados 1' },
    { id: 2, nombre: 'estado 2' }
  ];


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.clientesForm = this.fb.group({
      Nombre: ['', [Validators.required, Validators.maxLength(250)]],
      RFC: ['', [Validators.required, Validators.maxLength(300)]],
      Telefono: ['', [Validators.required, Validators.maxLength(300)]],
      Correo: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(300)]
      ],
      Direccion: ['', [Validators.required, Validators.maxLength(500)]],
      CodigoPostal: ['', [Validators.required, Validators.maxLength(15)]],
      RazonSocial: ['', [Validators.required, Validators.maxLength(300)]],
      Codigo: ['', [Validators.required, Validators.maxLength(30)]],
      IdRegimenFiscal: [null, [Validators.required]],
      IdCatMunicipio: [null, [Validators.required]],
      FechaCreacion: [{ value: new Date(), disabled: true }, Validators.required],
      FechaModificacion: [{ value: null, disabled: true }],
      IdCatEstatus: [1, [Validators.required]] // Valor por defecto
    });
  }

  onSubmit(): void {
    if (this.clientesForm.valid) {
      console.log('Formulario válido, datos enviados:', this.clientesForm.value);
    } else {
      console.log('Formulario no válido.');
    }
  }

  onCancel(): void {
    this.clientesForm.reset();
  }
}
