export interface ActualizarClienteRequest {
  id: number;
  telefono: string
  rfc: string
  direccion: string
  idCatEstatus: number;
  nombre: string
  codigo: string
  idCatMunicipio: number;
  codigoPostal: string
  razonSocial: string
  idRegimenFiscal: number;
  correo: string;
}
