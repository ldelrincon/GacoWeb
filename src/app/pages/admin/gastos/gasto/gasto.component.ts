import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { CatalogosService } from '../../../../services/catalogos.service';
import { LoadingService } from '../../../../services/loading.service';
import { GastoService } from '../../../../services/gasto.service';
import { ActualizarGastoRequest } from '../../../../models/requests/gastos/ActualizarGastoRequest';
import { UtilidadesService } from '../../../../services/utilidades.service';
import { NuevoGastoRequest } from '../../../../models/requests/gastos/NuevoGastoRequest';

@Component({
  selector: 'app-gasto',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './gasto.component.html',
  styleUrl: './gasto.component.css'
})
export class GastoComponent implements OnInit {
  gastoForm!: FormGroup;
  grupogastos: any[] = [];
  grupogastosFiltrados: any;

  private fb = inject(FormBuilder);
  private catalogos = inject(CatalogosService);
  private swalLoading = inject(LoadingService);
  private gastoService = inject(GastoService);
  private route = inject(ActivatedRoute);
  private utilidadesService = inject(UtilidadesService);

  ngOnInit(): void {
    // this.fnInitForm();
    // this.fnCargarCatGrupogastos();

    // const gastoId = this.route.snapshot.paramMap.get('id');
    // if (!isNaN(Number(gastoId))) {
    //   this.fnObtenergastoPorId(Number(gastoId));
    // }
  }

  fnObtenergastoPorId(id: number) {
    this.gastoService.GastoPorId(id).subscribe({
      next: (response) => {
        if (response.success) {
          const gasto = response.data;

          // Asignar el objeto completo al formulario.
          this.gastoForm.patchValue({
            ...gasto,
          });
        }
      },
      error: (err) => {
        console.error('Error al guardar gasto', err);
      }
    });
  }

  fnInitForm() {
    this.gastoForm = this.fb.group({
      id: [null],
      idCatEstatus: [null, [Validators.required]],
      gasto: ['', [Validators.required, Validators.maxLength(250)]],
    });
  }

  onSubmit(): void {
    this.swalLoading.showLoading("Guardar Cliente", "Guardando cliente...");
    try {
      if (this.gastoForm.valid) {
        const formValue = this.gastoForm.value;

        if (this.gastoForm.value.id) {
          // Actualizar cliente.
          const actualizarRequest: ActualizarGastoRequest = {
            ...formValue,
            idCatGrupogasto: formValue.idCatGrupogasto?.id,
          };
          this.gastoService.ActualizarGasto(actualizarRequest).subscribe({
            next: (response) => {
              if (response.success) {
                this.gastoForm.reset();
                this.swalLoading.close();
                this.swalLoading.showSuccess("Actualizar gasto", "Cliente guardado correctamente");
              }
              else {
                this.swalLoading.close();
                this.swalLoading.showError("Formulario inválido", response.message);
              }
            },
            error: (err) => {
              this.swalLoading.close();
              console.log(err, this.utilidadesService.getErrorMessage(err));
              this.swalLoading.showError("Actualizar Cliente", this.utilidadesService.getErrorMessage(err));
            }
          });
        }
        else {
          // Guardar nuevo gasto.
          const nuevoRequest: NuevoGastoRequest = {
            ...formValue,
            idCatGrupogasto: formValue.idCatGrupogasto?.id,
          };
          this.gastoService.NuevoGasto(nuevoRequest).subscribe({
            next: (response) => {
              if (response.success) {
                this.gastoForm.reset();
                this.swalLoading.close();
                this.swalLoading.showSuccess("Nuevo gasto", "gasto guardado correctamente");
              }
              else {
                this.swalLoading.close();
                this.swalLoading.showError("Formulario inválido", response.message);
              }
            },
            error: (err) => {
              this.swalLoading.close();
              this.swalLoading.showError("Guardar gasto", this.utilidadesService.getErrorMessage(err));
            }
          });
        }
      } else {
        // Cerrar cargando.
        this.swalLoading.close();
        this.swalLoading.showError("Guardar gasto", 'Formulario no válido.');
      }
    }
    catch (ex: any) {
      // Cerrar cargando.
      this.swalLoading.close();
      this.swalLoading.showError("Guardar gasto", ex.message);
    }
  }

  onCancel(): void {
    this.gastoForm.reset();
  }

  get buttonText(): string {
    // return this.gastoForm.value.id ? 'Actualizar' : 'Guardar';
    return "Guardar";
  }
}
