export interface GastoResponse {
  id: number;
  idUsuarioCreacion: number;
  nombreUsuarioCreacion: string;
  concepto: string;
  montoTotal: number;
  fechaCreacion: string; // Se maneja como string en formato ISO
  fechaModificacion: string; // Se maneja como string en formato ISO
  idCatEstatus: number;
  nombreCatEstatus: string;
}
