import { SeguimientoService } from './../../../../services/seguimiento.service';
import { ReporteServicioService } from './../../../../services/reporte-servicio.service';
import { Component, inject } from '@angular/core';
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
    FormsModule,
  ],
  templateUrl: './seguimento.component.html',
  styleUrl: './seguimento.component.css'
})
export class SeguimentoComponent {
  // #Variables.
  private IdReporteServicio?: number;
  reporteServicio: any;
  seguimentos: any;

  options = [
    { value: 3, label: 'En Seguimento' },
    { value: 4, label: 'Facturar' },
    { value: 5, label: 'Finalizar' },
  ];

  stats: any[] = [
    {
      id: 1,
      time: '09.30 am',
      color: 'primary',
      subtext: 'Payment received from John Doe of $385.90',
    },
    {
      id: 2,
      time: '10.30 am',
      color: 'accent',
      title: 'New sale recorded',
      link: '#ML-3467',
    },
    {
      id: 3,
      time: '12.30 pm',
      color: 'success',
      subtext: 'Payment was made of $64.95 to Michael',
    },
    {
      id: 4,
      time: '12.30 pm',
      color: 'warning',
      title: 'New sale recorded',
      link: '#ML-3467',
    },
    {
      id: 5,
      time: '12.30 pm',
      color: 'error',
      title: 'New arrival recorded',
      link: '#ML-3467',
    },
    {
      id: 6,
      time: '12.30 pm',
      color: 'success',
      subtext: 'Payment Done',
    },
  ];

  selectedValue: number = 0;

  // #Inyeccion.
  private route = inject(ActivatedRoute);
  private swalLoading = inject(LoadingService);
  private reporteServicioService = inject(ReporteServicioService);
  private seguimientoService = inject(SeguimientoService);

  ngOnInit(): void {

    const ReporteServicioId = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(ReporteServicioId))) {
      this.IdReporteServicio = Number(this.route.snapshot.paramMap.get('id'));
      this.fnObtenerReporteServicioPorId(this.IdReporteServicio);
      this.fnObtenerSeguimentos(this.IdReporteServicio);
    }
  }

  fnObtenerReporteServicioPorId(id: number) {
    this.swalLoading.showLoading();
    this.reporteServicioService.ReporteServicioSeguimentoPorId(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.reporteServicio = response.data;
          this.selectedValue = this.reporteServicio.idCatEstatus;
          console.log('reporteServicio:', this.reporteServicio);
        }
        this.swalLoading.close();
      },
      error: (err) => {
        console.error('Error al cargar el reporte de solicitud', err);
        this.swalLoading.close();
      }
    });
  }

  fnObtenerSeguimentos(idReporteServicio: number) {
    this.swalLoading.showLoading();
    this.seguimientoService.ReporteServicioSeguimentoPorId(idReporteServicio).subscribe({
      next: (response) => {
        if (response.success) {
          this.seguimentos = response.data;
          console.log('fnObtenerSeguimentos:', this.seguimentos);
        }
        this.swalLoading.close();
      },
      error: (err) => {
        console.error('Error al cargar los seguimientos', err);
        this.swalLoading.close();
      }
    });
  }

  onEstatusChange(event: any): void {
    console.log('Nuevo estatus seleccionado:', event.value);
    // Aquí puedes realizar acciones adicionales
  }
}
