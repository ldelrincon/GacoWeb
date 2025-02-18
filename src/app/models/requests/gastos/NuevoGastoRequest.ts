export interface NuevoGastoRequest {
  concepto: string;
  fecha: string; // Se maneja como string en formato YYYY-MM-DD
  descripcion: string;
  monto: number;
  factura: boolean;
  rutaPdffactura?: string | null;
  rutaXmlfactura?: string | null;
}
