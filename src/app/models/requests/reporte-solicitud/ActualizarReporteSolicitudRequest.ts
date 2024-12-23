import { EvidenciaReporteServicioRequest } from "./EvidenciaReporteServicioRequest";
import { ProductoReporteServicioRequest } from "./ProductoReporteServicioRequest";

export interface ActualizarReporteServicioRequest {
  id: number;
  idCatSolicitud: number;
  idUsuarioCreacion: number;
  idCliente: number;
  titulo: string;
  descripcion: string;
  fechaInicio?: Date;
  accesorios: string;
  servicioPreventivo: boolean;
  servicioCorrectivo: boolean;
  observacionesRecomendaciones: string;
  idUsuarioTecnico: number;
  usuarioEncargado: string;

  productos?: ProductoReporteServicioRequest[];
  evidencias?: EvidenciaReporteServicioRequest[];
  proximaVisita?: Date;
  descripcionProximaVisita: string;
}
