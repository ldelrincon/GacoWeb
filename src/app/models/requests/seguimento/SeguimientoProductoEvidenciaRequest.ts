import { EvidenciaReporteServicioRequest } from "../reporte-solicitud/EvidenciaReporteServicioRequest";
import { ProductoReporteServicioRequest } from "../reporte-solicitud/ProductoReporteServicioRequest";

export interface SeguimientoProductoEvidenciaRequest {
  seguimiento: string,
  idReporteServicio: number,
  productos?: ProductoReporteServicioRequest[];
  evidencias?: EvidenciaReporteServicioRequest[];
  proximaVisita?: Date;
  descripcionProximaVisita: string;
}
