export class CatUsuarioModel{
    idUsuario: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    correo: string;
    idPerfil: number;
    puesto: string;
    area: string;
    plazaSucursal?: number;
    plazaSucursalTXT?: string;
    telefono: string;

    estatus?: boolean;
    matricula: string;
    extension: string;
    fechaInicio: Date;
    fechaFin?: Date;

}
export class TipoRoles {
    idPerfil: number;
    descripcion: string;
    display: string;
    displayEN: string;
}

export class crearUsuarioNuevo{
    cunNombre: string = '';
    cunApellidoPaterno?: string = '';
    cunApellidoMaterno?: string = '';
    cunCorreo: string = '';
    cunContrasena: string = '';
    cunConfirmarC: string = '';
    cunProfesionistaIndustria?: boolean = false;
}