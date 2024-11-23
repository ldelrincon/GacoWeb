import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-solicitud',
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
    MatDivider,
    MatCheckbox,
    MatIcon
  ],
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.css'
})
export class SolicitudComponent implements OnInit {
  reporteServiciosForm!: FormGroup;

  // Datos simulados (deberían cargarse desde un servicio en un entorno real)
  clientes = [
    { id: 1, nombre: 'Cliente 1' },
    { id: 2, nombre: 'Cliente 2' },
    { id: 3, nombre: 'Cliente 3' },
  ];

  usuarios = [
    { id: 1, nombre: 'Usuario Encargado 1' },
    { id: 2, nombre: 'Usuario Encargado 2' },
  ];

  tecnicos = [
    { id: 1, nombre: 'Técnico 1' },
    { id: 2, nombre: 'Técnico 2' },
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  // Inicializar el formulario con validaciones
  private initForm(): void {
    this.reporteServiciosForm = this.fb.group({
      Titulo: ['', [Validators.required, Validators.maxLength(300)]],
      Descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      Accesorios: ['', Validators.maxLength(500)],
      ServicioPreventivo: [false],
      ServicioCorrectivo: [false],
      ObservacionesRecomendaciones: ['', [Validators.required, Validators.maxLength(500)]],
      FechaInicio: [null], // Fecha opcional
      IdCliente: [null, Validators.required],
      IdUsuarioEncargado: [null, Validators.required],
      IdUsuarioTecnico: [null, Validators.required],
    });
  }

  // Método para manejar el envío del formulario
  onSubmit(): void {
    if (this.reporteServiciosForm.valid) {
      const formData = this.reporteServiciosForm.value;
      console.log('Datos del formulario enviados:', formData);
      // Aquí podrías llamar a un servicio para guardar los datos
    } else {
      console.error('Formulario inválido. Por favor, verifica los campos.');
    }
  }

  // Método para manejar la cancelación
  onCancel(): void {
    this.reporteServiciosForm.reset();
    console.log('Formulario reseteado.');
  }

  // Métodos de ayuda para los selectores (opcional)
  getClienteNombre(id: number): string {
    return this.clientes.find(cliente => cliente.id === id)?.nombre || '';
  }

  getUsuarioEncargadoNombre(id: number): string {
    return this.usuarios.find(usuario => usuario.id === id)?.nombre || '';
  }

  getTecnicoNombre(id: number): string {
    return this.tecnicos.find(tecnico => tecnico.id === id)?.nombre || '';
  }

  onUsuarioEncargadoSeleccionado(event: any): void {
    console.log('UsuarioEncargado seleccionado:', event);
  }
}
