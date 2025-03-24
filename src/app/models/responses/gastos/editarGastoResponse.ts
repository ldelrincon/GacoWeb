import { DetGastoResponse } from "./detGastoResponse";

export interface EditarGastoResponse {
  id: number;
  idUsuarioCreacion: number;
  concepto: string;
  fechaCreacion: string; // Se maneja como string porque Date en JSON se serializa como string
  fechaModificacion?: string | null;
  idCatEstatus: number;
  detGastos: DetGastoResponse[];
}
