import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {

  constructor() { }

  fnEstatusReporteServicio(id: number): string {
    let css: string = '';
    if (id) {
      switch (id) {
        case 1: return 'activo'; break;
        case 2: return 'inactivo'; break;
        case 3: return 'trabajando'; break;
        case 4: return 'facturado'; break;
        case 5: return 'terminado'; break;
        case 6: return 'nuevo'; break;
        case 7: return 'espera-de-oc'; break;
        case 8: return 'cotizado'; break;
        case 9: return 'autorizado'; break;
        case 10: return 'trabajo-no-realizado'; break; // Personalizado
        case 11: return 'pagado'; break; // Personalizado
        default: return ''; break;
      }
    }
    return css;
  }

  fnTipoServicio(id: number): string {
    switch (id) {
      case 1: return 'servicio';
      case 2: return 'proyecto';
      case 3: return 'cotizacion';
      default: return '';
    }
  }

  fnGetMimeType(extension: string): string {
    const mimeTypes: { [key: string]: string } = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'bmp': 'image/bmp',
      'webp': 'image/webp',
      'svg': 'image/svg+xml',
      'tiff': 'image/tiff',
      'ico': 'image/vnd.microsoft.icon',
      'pdf': 'application/pdf'
    };

    return mimeTypes[extension.toLowerCase()] || 'application/octet-stream'; // Valor por defecto
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
}
