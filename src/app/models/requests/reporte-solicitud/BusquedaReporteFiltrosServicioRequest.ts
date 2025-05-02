import { BusquedaFiltrosRequest } from "./BusquedaFiltrosRequest";

export interface BusquedaReporteFiltrosServicioRequest {
  busqueda: BusquedaFiltrosRequest
  numeroPagina: number,
  cantidadPorPagina: number,
}
