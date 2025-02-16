import { DetalleGastoRequest } from "./DetalleGastoRequest";

export interface NuevoGastoRequest {
  idUsuarioCreacion: number;
  factura: boolean;
  rutaPdfFactura?: string;
  rutaXmlFactura?: string;
  fechaCreacion: string;  // Se maneja como ISO 8601 (YYYY-MM-DDTHH:mm:ss)
  fechaModificacion: string;
  idCatEstatus: number;
  detalleGastos: DetalleGastoRequest[];
}


