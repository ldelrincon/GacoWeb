import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  /**
   * Muestra un mensaje de loading con SweetAlert2.
   * @param message Mensaje a mostrar en el loading. Por defecto: "Cargando..."
   */
  showLoading(message: string = 'Cargando...') {
    Swal.fire({
      title: message,
      allowOutsideClick: false, // Evita que el usuario cierre el loading clickeando fuera
      didOpen: () => {
        Swal.showLoading(); // Muestra el spinner de carga
      },
    });
  }

  /**
   * Cierra el loading actual.
   */
  close() {
    Swal.close();
  }

  /**
   * Muestra un mensaje de éxito.
   * @param title Título de la alerta.
   * @param message Mensaje adicional de la alerta.
   */
  showSuccess(title: string, message: string = '') {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      timer: 2000, // Alerta automática que desaparece
      showConfirmButton: false,
    });
  }

  /**
   * Muestra un mensaje de error.
   * @param title Título de la alerta.
   * @param message Mensaje adicional de la alerta.
   */
  showError(title: string, message: string = '') {
    Swal.fire({
      icon: 'error',
      title: title,
      text: message,
    });
  }
}
