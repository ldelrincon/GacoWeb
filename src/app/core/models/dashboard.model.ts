export class Dashboard {
  totalProyectos: number = 0;
  totalExpedientes: number = 0;
  totalNuevos: number = 0;
  totalProceso: number = 0;
  totalCompletos: number = 0;
  autorizacionTotal: number = 0;
  calculoPorAutorizar: number = 0;
  solicituPorAutorizar: number = 0;
  pagoPorAutorizar: number = 0;
  asignacionPorAutorizar: number = 0;
  totalContratos: number = 0;
  totalDiagnosticos: number = 0;
  censosPorAutorizar: number = 0;

  //Variabless de dashboard bandeja de proyectos
  idEncProyecto: number = 0;
  nombreProyecto: string = "";
  registros: number = 0;
  check: boolean = false;

  //Variables de dashboard estapa proyecto
  totalEtapa: number = 0;
  totalDesarrollo: number = 0;
  totalConstruccion: number = 0;
  totalOperacion: number = 0;
  totalCancelado: number = 0;
  totalSolicitud: number = 0;

  //Variables tipos de proyectos dashboard
  tipoProyecto: string = "";
  countAprobados: number = 0;
  propietarios: number = 0;
  porcentajeExpediente: number = 0;
  longitud: string = "";
  strMedida: string = "";
  idRegimenPropiedad: number = 0;
  regimenPropiedad: string = "";

  //Variables bandeja de proyecto
  segmentoProyecto: string = "";
  ubicacion: string = "";
  nombreEmpresa: string = "";
  nombreCorto: string = "";
  noExpedienteIenova: string = "";
  idEncExpediente: number = 0;
  propietario: string = "";

  //Variables de segmento de proyecto
  totalTipoGasElectrico: number = 0;
  totalTipoGas: number = 0;
  totalTipoElectrico: number = 0;

  totalTipoLineal: number = 0;
  totalTipoPuntual: number = 0;

  totalDesarrolloGas = 0;
  totalDesarrolloElectrico = 0;
  totalConstruccionGas = 0;
  totalConstruccionElectrico = 0;
  totalOperacionGas = 0;
  totalOperacionElectrico = 0;

  consecutivo = 0;
  apellidoPaterno = '';
  apellidoMaterno = '';
  idCatEstatus = 0;
  kmInicio?: number;
  kmFin?: number;
  superficie: number;
  idUnidadMedida: number;
  idEstatusProyecto: number;
  estatusExpediente: number;
  secuencia: number
}
