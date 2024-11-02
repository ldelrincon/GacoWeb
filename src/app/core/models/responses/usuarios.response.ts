import { Usuario, UsuarioBloqueado, UsuariosActivos } from '../usuario.model';


export class UsuariosResponse {
    lista: UsuarioBloqueado[];
    paginador: any;
}

export class UsuariosResponseActivo {
    lista: UsuariosActivos[];
    paginador: any;
}

export class UsuariosResponseLogin {
    lista: UsuariosActivos[];
}