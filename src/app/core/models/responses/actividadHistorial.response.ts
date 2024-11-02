import { ActividadHistorial } from '../actividadesHistorial.model';
import { Paginador } from '../common/paginador.model';


export class ActividadHistorialResponse {
    success: boolean;
    lista: ActividadHistorial[];
    totalRegistros: number;
    paginador: Paginador
}