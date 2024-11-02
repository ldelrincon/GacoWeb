export class ActividadHistorial {
    idActividadHistorial: number;
    idPantalla: number;
    idRelacion: number;
    idActividad: number;
    idUsuario: number;
    fecha: string;
    fechaStr: string;
    pantalla: string;
    usuario: string;
    actividad: string;
}

export class ActividadHistorialFiltros {
    idActividad: number;
    usuario: string;
    fechaCreacionInicio: string;
    fechaCreacionHasta: string;
}

export class ActividadesFiltros {
    success: boolean;
    actividadHistorial: ActividadHistorialFiltros;
}
