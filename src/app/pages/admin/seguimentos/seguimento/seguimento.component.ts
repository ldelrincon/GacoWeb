import { SeguimientoService } from './../../../../services/seguimiento.service';
import { ReporteServicioService } from './../../../../services/reporte-servicio.service';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { IconsModule } from '../../../../icons/icons.module';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../../../services/loading.service';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SeguimientoModalComponent } from '../../../components/seguimiento-modal/seguimiento-modal.component';
import Swal from 'sweetalert2';
import { CambiarEstatusEnSeguimentoRequest } from '../../../../models/requests/reporte-solicitud/CambiarEstatusEnSeguimentoRequest';
import { CatalogosService } from '../../../../services/catalogos.service';
import { VerEvidenciaModalComponent } from '../../../components/ver-evidencia-modal/ver-evidencia-modal.component';

@Component({
  selector: 'app-seguimento',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    FlexLayoutModule,
    MatDivider,
    MatIconModule,
    IconsModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './seguimento.component.html',
  styleUrl: './seguimento.component.css'
})
export class SeguimentoComponent {
  // #Variables.
  private IdReporteServicio?: number;
  reporteServicio: any;
  seguimentos$: any;

  selectedValue!: number; // Se inicializa en ngOnInit
  previousValue!: number; // Guarda el valor anterior
  catalogoEstatus: any[] = [];

  // #Inyeccion.
  private route = inject(ActivatedRoute);
  private swalLoading = inject(LoadingService);
  private reporteServicioService = inject(ReporteServicioService);
  private seguimientoService = inject(SeguimientoService);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private catalogosService = inject(CatalogosService);

  ngOnInit(): void {
    const ReporteServicioId = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(ReporteServicioId))) {
      this.IdReporteServicio = Number(this.route.snapshot.paramMap.get('id'));
      this.fnObtenerReporteServicioPorId(this.IdReporteServicio);
      this.fnObtenerSeguimentos(this.IdReporteServicio);
      this.fnCatalogoEstatus();
    }
  }

  fnObtenerReporteServicioPorId(id: number) {
    this.swalLoading.showLoading();
    this.reporteServicioService.ReporteServicioSeguimentoPorId(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.reporteServicio = response.data;
          // #Seleccionar status actual.
          this.selectedValue = this.reporteServicio.idCatEstatus;
          this.previousValue = this.reporteServicio.idCatEstatus;
          //console.log('reporteServicio:', this.reporteServicio);
        }
        this.swalLoading.close();
      },
      error: (err) => {
        //console.error('Error al cargar el reporte de solicitud', err);
        this.swalLoading.close();
      }
    });
  }

  fnObtenerSeguimentos(idReporteServicio: number) {
    this.swalLoading.showLoading();
    this.seguimientoService.ReporteServicioSeguimentoPorId(idReporteServicio).subscribe({
      next: (response) => {
        if (response.success) {
          this.seguimentos$ = response.data;
          // this.cdr.detectChanges();
          //console.log('fnObtenerSeguimentos:', this.seguimentos$);
        }
        this.swalLoading.close();
      },
      error: (err) => {
        //console.error('Error al cargar los seguimientos', err);
        this.swalLoading.close();
      }
    });
  }

  fnCatalogoEstatus() {
    this.swalLoading.showLoading();
    this.catalogosService.ListaCatEstatus().subscribe({
      next: (response) => {
        if (response.success) {
          this.catalogoEstatus = response.data;
          console.log(this.catalogoEstatus);
        }
        this.swalLoading.close();
      },
      error: (err) => {
        this.swalLoading.close();
      }
    });
  }

  onEstatusChange(event: any): void {
    //console.log('Nuevo estatus seleccionado:', event.value);
    // Aquí puedes realizar acciones adicionales
  }

  openAgregarSeguimientoModal() {
    const dialogRef = this.dialog.open(SeguimientoModalComponent, {
      // panelClass: 'modal-lg'
      width: '70vw',
      height: '80vh',
      data: { idReporteServicio: this.IdReporteServicio }
    });

    dialogRef.afterClosed().subscribe((result) => {

      window.location.reload();
      //   const ReporteServicioId = this.route.snapshot.paramMap.get('id');
      // if (!isNaN(Number(ReporteServicioId))) {
      //   this.IdReporteServicio = Number(this.route.snapshot.paramMap.get('id'));
      //   this.fnObtenerSeguimentos(this.IdReporteServicio);
      // }
    });
  }

  onStatusChange(event: any) {
    const newStatus = this.catalogoEstatus.find(x => x.id == event.value)?.estatus ?? "";
    //console.log(this.previousValue, this.selectedValue, newValue);
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas cambiar el estatus a "${newStatus}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cambiar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const request: CambiarEstatusEnSeguimentoRequest = {
          id: this.IdReporteServicio ?? 0,
          idEstatus: event.value
        };
        this.fnCambiarStatus(request, event.value, newStatus);

      } else {
        this.selectedValue = this.previousValue;
      }
    });
  }

  fnCambiarStatus(request: CambiarEstatusEnSeguimentoRequest, newValue: number, newText: string) {
    // Cambiar estatus.
    this.swalLoading.showLoading("Cambio de estatus Reporte de Solicitud", `Cambiando el estatus a '${newText}'...`);
    this.reporteServicioService.CambiarEstatusEnSeguimento(request).subscribe({
      next: (response) => {
        if (response.success) {
          this.swalLoading.close();
          Swal.fire({
            title: '¡Cambio realizado!',
            text: `El estatus ha sido cambiado a '${newText}'.`,
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            if (result.isConfirmed) {
              this.previousValue = newValue;
              window.location.reload();
            }
          });
        }
        else {
          this.selectedValue = this.previousValue;
          this.swalLoading.showError("Formulario inválido", response.message);
        }
      },
      error: (err) => {
        this.selectedValue = this.previousValue;
        this.swalLoading.showError("Cambio de estatus Reporte de Solicitud", this.getErrorMessage(err));
      }
    });
  }

  getErrorMessage(err: any): string {
    if (err.error && err.error.message) {
      return err.error.message; // Mensaje específico del backend.
    }
    if (err.message) {
      return err.message; // Mensaje genérico.
    }
    return 'Ocurrió un error desconocido. Por favor, intenta nuevamente.';
  }

  getDescripcionDelEstatus(id: number): string {
    return this.catalogoEstatus.find(x => x.id == id)?.descripcion ?? "";
  }

  openVerEvidenciaModal(id: number) {
    const dialogRef = this.dialog.open(VerEvidenciaModalComponent, {
      // panelClass: 'modal-lg'
      data: { id: id },
      maxWidth: '90vh',
      maxHeight: '90vh',
      width: 'auto',
      height: 'auto',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((result) => {

    });
  }
}
