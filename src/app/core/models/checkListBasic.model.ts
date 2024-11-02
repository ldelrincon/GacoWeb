export class CheckListBasic {
    activo: boolean;
    docGuardado: boolean;
    documentoActivo: boolean;
    fechaCreacion: string;
    idDocumento: number;
    idDocumentoRelacion: number;
    idEstatus: number;
    idTipoDocumento: number;
    nombreArchivo: string;
    nombreArchivoCorto: string;
    tipoDocumento: string;
    extension: string;
}


export class CheckListBasicResponse {
    success: boolean;
    documentos: CheckListBasic[];
}
