import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-seguimiento-modal',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './seguimiento-modal.component.html',
  styleUrl: './seguimiento-modal.component.css'
})
export class SeguimientoModalComponent {
  productos = [
    { nombre: 'Producto 1' },
    { nombre: 'Producto 2' }
  ];

  evidencias = [
    { descripcion: 'Evidencia 1' },
    { descripcion: 'Evidencia 2' }
  ];

  displayedColumns: string[] = ['nombre'];
  displayedColumnsEvidencias: string[] = ['descripcion'];

  constructor(public dialogRef: MatDialogRef<SeguimientoModalComponent>) { }

  agregarSeguimiento() {
    // Lógica para agregar seguimiento
    console.log('Seguimiento agregado');
    this.dialogRef.close();
  }
}
