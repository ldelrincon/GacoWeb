import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { IconsModule } from '../../../icons/icons.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { LoadingService } from '../../../services/loading.service';
import { ClienteService } from '../../../services/cliente.service';
import { NuevoClienteRequest } from '../../../models/requests/clientes/NuevoClienteRequest';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [
    MatCardModule,
    FullCalendarModule,
    IconsModule,
    MatIconModule,
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
    MatAutocompleteModule,
    FormsModule
  ],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'
})
export class CalendarioComponent {
 calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    events: [
      { title: 'Tarea 1', date: '2026-03-20' },
      { title: 'Tarea 2', date: '2026-03-22' }
    ]
  };

  handleDateClick(arg: any) {
    const title = prompt('Nombre de la tarea');
    if (title) {
      this.calendarOptions.events = [
        ...(this.calendarOptions.events as any[]),
        { title, date: arg.dateStr }
      ];
    }
  }
}
