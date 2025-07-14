import { BusquedaFiltrosClienteRequest } from "./BusquedaFiltrosClienteRequest";

export interface BusquedaClienteRequest {
  busqueda: BusquedaFiltrosClienteRequest,
  numeroPagina: number,
  cantidadPorPagina: number,
}
