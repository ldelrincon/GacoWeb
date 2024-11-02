export class Document {
    idDocumento: number;
    nombreArchivo: string;
    documentContent: string;
    extension: string;
    nombreExpediente: string;
    ruta: string;
    activo: boolean;
    fechaCreacion: string;
    fechaModificacion: string;
    fechaVencimiento: string;
    idUsuarioCreacion: number;
    idUsuarioModificacion: number;
    idEstatus?: number;
    idTablaRelacion: number;
    idRelacion: number;
    idDocumentoRelacion: number;
    comentario:string;
    tipoDocumento: string;
    idEncProyecto: number;
    nombreOriginalDoc: string;
    fechaNecesario: boolean;
    fechaDocumento: string;
    longitud: string;
    latitud: string;
    idTipoDocumento: number;
}