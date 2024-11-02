export class ConfigDirectivasModel {
    idCatConfigDirectivas: number;
    cantidadIntentosPassword: number;
    periodicidadCambioPassword: number;
    historialDeContrasena : number;
    cambioPasswordInicioPrimeraVez?: boolean;
    cambioPasswordInicioPrimeraVezStr: string;
    idUsuarioCreacion: number;
    idUsuarioModificacion: number;
    intentosCambioPassword: number;
    fechaCreacion: Date;
    fechaModificacion: Date;
    fechaCreacionStr: string;
    fechaModificacionStr:string;

    longitudMinCaracter?: number;
    numeroMinContrasena?: number;
    mayusculasMinContrasena?: number;
    caracteresEspMinContrasena?: number;

    }