export interface DetGastoResponse {
  id: number;
  idGasto: number;
  fecha: string; // Se maneja como string porque Date en JSON se serializa como string
  descripcion: string;
  monto: number;
  factura: boolean;
  rutaPdfFactura?: string | null;
  rutaXmlFactura?: string | null;
  fechaCreacion: string;
  fechaModificacion?: string | null;
  idCatEstatus: number;
}
