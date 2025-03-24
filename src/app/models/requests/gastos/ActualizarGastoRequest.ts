import { DetGastoRequest } from "./detGastoRequest";

export interface ActualizarGastoRequest {
  id: number;
  concepto: string;
  idCatEsatus: number;
  detGastos?: DetGastoRequest[] | null;
}
