import { Role } from './enums/role.enum';


export class UsuarioTokenResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
}

export class Usuario {
    id: number; 
}

export class UsuarioDecoded {
    IdUsuario: number;
}

export class UsuarioBloqueado {

    idUsuario: number;
    usuario: string;
    nombreCompleto: string;
    catMotivoBloqueado: string;
    ipUser: string;
    idCatMotivoBloqueo: number;

 }

 export class UsuariosActivos {
    idUsuario: number;
    Correo: string;
    nombreCompleto: string;
    telefono: string;
    extension: string;
    area: string;
    titulo: string;
    perfil: string;
    puesto: string;
 }
