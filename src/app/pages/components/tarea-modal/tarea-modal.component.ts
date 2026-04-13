import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_NATIVE_DATE_FORMATS, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IconsModule } from '../../../icons/icons.module';
import { LoadingService } from '../../../services/loading.service';
import { UsuarioService } from '../../../services/usuario.service';
import { CalendarService } from '../../../services/calendar.service';
import { NuevaTareaRequest } from '../../../models/requests/tareas/NuevaTareaRequest';
import { BusquedaUsuarioRequest } from '../../../models/requests/usuario/BusquedaUsuarioRequest';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tarea-modal',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    FormsModule,
    MatDialogModule,
    MatDivider,
    MatIconModule,
    IconsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es-MX' },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: { dateInput: 'DD/MM/YYYY' },
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        }
      }
    }
  ],
  templateUrl: './tarea-modal.component.html',
  styleUrl: './tarea-modal.component.css'
})
export class TareaModalComponent implements OnInit {
  tareaForm!: FormGroup;
  usuarios: any[] = [];
  isEdicion: boolean = false;
  isTerminar: boolean = false;
  idTarea: number = 0;

  private swalLoading = inject(LoadingService);
  private usuarioService = inject(UsuarioService);
  private calendarService = inject(CalendarService);
  private fb = inject(FormBuilder);

  constructor(
    public dialogRef: MatDialogRef<TareaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fnInitForm();
    this.idTarea = data?.id || 0;
    // Si tiene ID, es que viene del calendario para terminar
    this.isTerminar = this.idTarea > 0;
    this.isEdicion = this.isTerminar;
    console.log('Constructor Debug:', { idTarea: this.idTarea, isTerminar: this.isTerminar, isEdicion: this.isEdicion, data });
  }

  ngOnInit(): void {
    console.log('Modal Debug:', {
      isTerminar: this.isTerminar,
      isEdicion: this.isEdicion,
      idTarea: this.idTarea,
      data: this.data
    });
    this.cargarUsuarios();
    if (this.isEdicion && this.data) {
      this.llenarFormularioEdicion();
    }
  }

  fnInitForm() {
    this.tareaForm = this.fb.group({
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      usuarioAsignado: ['', [Validators.required]],
      fechaTarea: [new Date(), [Validators.required]]
    });
  }

  private llenarFormularioEdicion(): void {
    if (this.data?.descripcion) {
      this.tareaForm.patchValue({
        descripcion: this.data.descripcion,
        usuarioAsignado: this.data.usuarioAsignado,
        fechaTarea: new Date(this.data.fechaTarea)
      });
      // Si es terminar, deshabilitar los campos
      if (this.isTerminar) {
        this.tareaForm.disable();
      }
    }
  }

  cargarUsuarios(): void {
    const request: BusquedaUsuarioRequest = {
      busqueda: '',
      numeroPagina: 1,
      cantidadPorPagina: 100,
    };

    this.usuarioService.Busqueda(request).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.usuarios = response.data;
        } else {
          this.usuarios = [];
        }
      },
      error: (err) => {
        console.error('Error al cargar usuarios', err);
        this.usuarios = [];
        Swal.fire('Error', 'No se pudieron cargar los usuarios', 'error');
      }
    });
  }



  guardar(): void {
    console.log('Guardar Debug:', { isTerminar: this.isTerminar, isEdicion: this.isEdicion, idTarea: this.idTarea });

    if (this.isTerminar) {
      // Si es terminar, solo envía el ID sin validar el formulario
      this.swalLoading.showLoading('Terminando Tarea', 'Por favor espere...');
      this.calendarService.TerminarTarea(this.idTarea).subscribe({
        next: (response) => {
          this.swalLoading.close();
          if (response.success) {
            Swal.fire('Éxito', 'Tarea terminada correctamente', 'success');
            this.dialogRef.close({ id: this.idTarea });
          } else {
            Swal.fire('Error', response.message || 'No se pudo terminar la tarea', 'error');
          }
        },
        error: (err) => {
          this.swalLoading.close();
          Swal.fire('Error', err.error?.message || 'No se pudo terminar la tarea', 'error');
        }
      });
      return; // Salir sin ejecutar el resto
    }

    if (this.tareaForm.valid) {
      this.swalLoading.showLoading('Guardando Tarea', 'Por favor espere...');
      const fecha = this.tareaForm.value.fechaTarea;

      // Convertir a YYYY-MM-DD usando valores locales para evitar timezone issues
      let fechaFormato: string;
      if (fecha instanceof Date) {
        const year = fecha.getFullYear();
        const month = String(fecha.getMonth() + 1).padStart(2, '0');
        const day = String(fecha.getDate()).padStart(2, '0');
        fechaFormato = `${year}-${month}-${day}`;
      } else {
        const d = new Date(fecha);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        fechaFormato = `${year}-${month}-${day}`;
      }

      console.log('Guardando Tarea - Debug:', {
        fechaOriginal: fecha,
        fechaFormato: fechaFormato
      });

      const tarea: any = {
        descripcion: this.tareaForm.value.descripcion,
        idUsuarioTarea: this.tareaForm.value.usuarioAsignado,
        fechaTarea: fechaFormato
      };

      this.calendarService.GuardarTarea(tarea).subscribe({
        next: (response) => {
          this.swalLoading.close();
          if (response.success) {
            Swal.fire('Éxito', 'Tarea guardada correctamente', 'success');
            this.dialogRef.close(tarea);
          } else {
            Swal.fire('Error', response.message || 'No se pudo guardar la tarea', 'error');
          }
        },
        error: (err) => {
          this.swalLoading.close();
          Swal.fire('Error', err.error?.message || 'No se pudo guardar la tarea', 'error');
        }
      });
    } else {
      Swal.fire('Validación', 'Por favor complete todos los campos requeridos', 'warning');
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
