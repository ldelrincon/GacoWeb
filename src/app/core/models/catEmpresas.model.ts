export class CatEmpresasModel {
    idCatSyEmpresa: number;
    idEmpresa: number;
    codigoEmpresa?: string;
    razonSocial?: string;
    nombreEmpresa?: string;
    rFC?: string;
    apoderado?: string;
    telefono?: string;
    correo?: string;
    direccion?: string;
    calle?: string;
    numeroExterior?: string;
    numeroInterior?: string;
    colonia?: string;
    codigoPostal?: string;
    alcaldiaMunicipio?: string;
    estado?: string;
    pais?: string;
    activo?: boolean;
    estatus?: boolean;
    idUsuarioCreacion: number;
    idUsuarioModificacion: number;
    fechaCreacion: Date;
    fechaModificacion: Date;

}

export class ModulosEmp {
    idModulo: number;
    idCatSyEmpresa: number;
    
    codModulo?: string;
    nombreEmpresa?: string;
    nombreEmpresaStr?: string;
    modulo?: string;
    activo?: boolean;
    estatus?: boolean;
    idUsuarioCreacion: number;
    idUsuarioModificacion: number;
    fechaCreacion: Date;
    fechaModificacion: Date;
}


export class ModProyectos {
    idModulo: number;
    codPantalla?: string; 
    
    activo?: boolean;
    estatus?: boolean;
    rutaItem?: string;
    pantalla?: string;

    nombreEsp?: string;
    nombreIng?: string;
    idPantallaPrincipal: number;
    idPermisoTener: any;
    icono?: string;


    idCatSyEmpresa: number;
    comboCodigoEmpresa?: string;
    comboNombreEmpresa?: string;

    idPantalla?: number;
    display?: string;
    isCatalogo?: boolean;
    idPermisoAsignados?: number;
    
    ver:boolean;
    agregar:boolean;
    modificar:boolean;
    usar:boolean;
    aprobar:boolean;
    eliminar:boolean;
    importar: boolean;
    exportar: boolean;
    imprimir: boolean;

    verP:boolean;
    agregarP:boolean;
    modificarP:boolean;
    usarP:boolean;
    aprobarP:boolean;
    eliminarP:boolean;
    importarP: boolean;
    exportarP: boolean;
    imprimirP: boolean;
    idUsuario?: number;

    lstModulosHijos?: any[];

}