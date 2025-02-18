export interface EditarGastoResponse {
  id: number;
  idUsuarioCreacion: number;
  concepto: string;
  fecha: string; // Se maneja como string en formato YYYY-MM-DD
  descripcion: string;
  monto: number;
  factura: boolean;
  rutaPdffactura?: string | null;
  rutaXmlfactura?: string | null;
  fechaCreacion: string; // Se maneja como string en formato ISO
  fechaModificacion: string; // Se maneja como string en formato ISO
  idCatEstatus: number;
}
