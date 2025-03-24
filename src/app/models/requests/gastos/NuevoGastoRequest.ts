import { DetGastoRequest } from "./detGastoRequest";

export interface NuevoGastoRequest {
  concepto: string;
  idCatEsatus: number;
  detGastos?: DetGastoRequest[] | null;
}
