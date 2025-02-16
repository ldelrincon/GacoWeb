import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  Inicio: number = 0;

  constructor() {}

  ngOnInit(): void {
    const inicioGuardado = localStorage.getItem('inicio');

    if (inicioGuardado=="0") {
      this.Inicio = 1;
      localStorage.setItem('inicio', '1'); // Guarda el estado en localStorage
      window.location.reload();
    }
  }

}

