export interface RelSeguimentoProductoResponse {
  Id: number;
  IdSeguimento: number;
  IdProducto: number;
  IdUsuario: number;
  FechaCreacion: Date;
  FechaModificacion: Date;
  IdCatEstatus: number;
  Cantidad: number;
  Unidad: string;
  MontoGasto: number;
  MontoVenta: number;
  Codigo: string;
  Producto: string;
  Porcentaje: number;
}
