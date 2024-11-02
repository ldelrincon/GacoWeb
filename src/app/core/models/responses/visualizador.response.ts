import { Document } from '../common/documento.model';


export class VisualizadorResponse {
    success: boolean;
    lista: Document[];
}

export class VisualizadorData {
    idTablaRelacion: number;
    idRelacion: number;
}

export class DocumentoResponse {
    success: boolean;
    documento: Document;
}