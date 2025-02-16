import { DetalleGastoRequest } from "./DetalleGastoRequest";

export interface ActualizarGastoRequest {
  id: number;
  idUsuarioCreacion: number;
  factura: boolean;
  rutaPdfFactura?: string;
  rutaXmlFactura?: string;
  fechaModificacion: string; // Formato ISO 8601 (YYYY-MM-DDTHH:mm:ss)
  idCatEstatus: number;
  detalleGastos: DetalleGastoRequest[];
}
