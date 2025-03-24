export interface DetGastoRequest {
  idGasto: number;
  fecha: string; // Se maneja como string porque en JSON, Date se serializa como string
  descripcion: string;
  monto: number;
  factura: boolean;
  rutaPdfFactura?: string | null;
  rutaXmlFactura?: string | null;
  idCatEstatus: number;
}
