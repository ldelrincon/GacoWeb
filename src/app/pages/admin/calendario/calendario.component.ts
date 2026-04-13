import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { LoadingService } from '../../../services/loading.service';
import { CalendarService } from '../../../services/calendar.service';
import { TareaModalComponent } from '../../components/tarea-modal/tarea-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [
    CommonModule,
    FullCalendarModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    TareaModalComponent
  ],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'
})
export class CalendarioComponent implements OnInit {
  private dialog = inject(MatDialog);
  private calendarService = inject(CalendarService);
  private swalLoading = inject(LoadingService);

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    locale: esLocale,
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    events: []
  };

  ngOnInit(): void {
    this.cargarTareas();
  }

  private cargarTareas(): void {
    this.swalLoading.showLoading('Cargando Tareas', 'Por favor espere...');

    this.calendarService.ObtenerTareas().subscribe({
      next: (response) => {
        this.swalLoading.close();
        if (response.success && response.data) {
          const tareas = response.data.map((tarea: any) => ({
            title: tarea.descripcion || tarea.titulo || 'Tarea sin título',
            date: new Date(tarea.fechaTarea).toISOString().split('T')[0],
            extendedProps: {
              id: tarea.idCalendario || tarea.id,
              usuarioAsignado: tarea.idUsuarioTarea,
              descripcion: tarea.descripcion
            }
          }));
          this.calendarOptions.events = tareas;
        } else {
          this.calendarOptions.events = [];
        }
      },
      error: (err) => {
        this.swalLoading.close();
        console.error('Error al cargar tareas', err);
        this.calendarOptions.events = [];
        Swal.fire('Error', 'No se pudieron cargar las tareas', 'error');
      }
    });
  }

  abrirModalNuevaTarea(): void {
    const dialogRef = this.dialog.open(TareaModalComponent, {
      width: '500px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarTareas();
      }
    });
  }

  private handleDateClick(arg: any): void {
    const dialogRef = this.dialog.open(TareaModalComponent, {
      width: '500px',
      disableClose: false,
      data: { fecha: arg.dateStr }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarTareas();
      }
    });
  }

  private handleEventClick(arg: EventClickArg): void {
    const tareasData = {
      id: arg.event.extendedProps['id'],
      descripcion: arg.event.extendedProps['descripcion'],
      usuarioAsignado: arg.event.extendedProps['usuarioAsignado'],
      fechaTarea: arg.event.startStr,
      esEdicion: true
    };

    console.log('handleEventClick Debug:', tareasData);

    const dialogRef = this.dialog.open(TareaModalComponent, {
      width: '500px',
      disableClose: false,
      data: tareasData
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarTareas();
      }
    });
  }
}
