
export enum TablaRelacionDocumento {
    Proyecto = 1,
    Expediente = 2,
    Contrato = 3,
    Permiso = 4,
    Solicitud = 5,
    Autorizaciones = 6,
    DetProcesos = 7
}

export enum Documento {
    Aprobado = 1,
    Rechazado = 2,
    Pendiente = 3,
}

export enum DocumentType {
    Image = 'image/jpeg',
    ImagePng = 'image/png',
    Pdf = 'application/pdf',
    Docx = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    Doc = 'application/msword',
    Xlsx = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    Xls = 'application/vnd.ms-excel',
    XML = 'text/xml',
    vDOCX = 'application/octet-stream',

    kmz = 'application/octet-stream',
    cpg = 'application/octet-stream',
    dbf = 'application/octet-stream',
    prj = 'application/octet-stream',
    qpj = 'application/octet-stream',
    shp = 'application/octet-stream',
    shx = 'application/octet-stream',

    kmz1 = 'application/vnd.google-earth.kmz',
    cpg1 = 'application/vnd.google-earth.kmz',
    dbf1 = 'application/vnd.google-earth.kmz',
    prj1 = 'application/vnd.google-earth.kmz',
    qpj1 = 'application/vnd.google-earth.kmz',
    shp1 = 'application/vnd.google-earth.kmz',
    shx1 = 'application/vnd.google-earth.kmz',




}