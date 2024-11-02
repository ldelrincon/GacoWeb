
import { ReferenceModel } from './PersonalReference.model';

export class SolicitudModel {
idEncSolicitud: number;
idEncSolicitudStr?: string;
loanAppliedTo: string;
interestRate: string;
loanAmount: number = 0;
ltv: string;
lTVInt: number;
loanTerm: number;
currency: string;
loanOriginationFee: string;
acceptanceLoanOriginationFeeTotal: boolean;
isApplicableFees?: boolean;
isApplicableMLS? : boolean;
acceptanceLoan: string;
acceptanceMLS : string;
address: string;
state: string;
city: string;
zip: string;
yearOfConstruction: number;
estimatedValue: number = 0;
buildingConstructionSurface: number=0;
totalSurfaceResidence: number=0;
groundSurface: number=0;
mlsNumber: string;
purposeLoan: string;
idCatEtapa: number;
etapa: string;
representanteLegal: boolean;
representanteLegalstr: string;
idUsuarioCreacion: number;
objInfoAcreditado: InfoAcreditadoModel;
objInfoCoAcreditado: InfoCoAcreditadoModel;
lstReferencia?: ReferenceModel[] = [];
objRepresentanteLegal: AbogadoModel;
objExpMedicoAcreditado: ExpedienteMedicoModel[] = [];
objExpMedicoCoAcreditado: ExpedienteMedicoModel[] = [];
isAutorizationMarketing?: boolean;
isSpouseCoBorrower?: boolean;
intDetalle:number;
folioDL: string;

idLoanTerm:number;
idInterestRate:number;
idLTV: number;
colonia: string;
}

export class InfoAcreditadoModel {
    idCatInformacionAcreditado?: number;
    idEncSolicitud?: number;
    idEncSolicitudStr?: string;
    borrowersName?: string;
    currentClient: boolean;
    currentClistr: string;
    accountClient: string;
    accountClientStr: string;
    clabe: number;
    clabeStr: string;
    dateOfBirth: Date; 
    placeOfBirth: string;
    nationality: string;
    ssN_TAXID: number;
    passportId: string;
    addressInMexico?: string;
    tempPermRecidence?: boolean;
    tempRecstr?: string;
    address?: string;
    state?: string;
    city?: string;
    zip?: string;
    addressOwnership?: string;
    yearsOfResidence?: number = 0;
    homePhone?: string;
    pep: boolean;
    PEPstr: string;
    phoneNumber?: string;
    email?: string;
    educationDegree: string;
    idCatMaritalStatus: number;
    maritalPropertySystem: string;
    dependents: boolean;
    depenstr: string;
    dependentsQuantity: number;
    ages: string;
    parentage: string;
    employerName: string;
    employerAddress: string;
    economicActivity: string;
    selfEmployed: boolean;
    selfEmpstr: string;
    yearsOnThePosition: number;
    position: string;
    companyPhoneNumber: string;
    substitutes: SustitutosModel[];
    fechaCreacion?: Date;
    fechaModificacion?: Date;
    idUsuarioCreacion?: number;
    idUsuarioModificacion?: number;
    activo?: boolean;
    age: number;
    gender: boolean;
    genderStr: string;
    countryResidence: string;
    tieneConyuge?: boolean;
    coBorrowersName ?: string;
    coBorrowersEmail ?: string;
    questionAddressMexico?: boolean;
    questionAddressMexicostr: string;
    curp: string;
    rfc: string;    
    isSpouseCoBorrower?: boolean;
    county: string;
    ageBuyer: number;
}

export class SustitutosModel{
    idSustituto: number;
    idCatInformacionAcreditado: number;
    name: string;
    nationality: string;
    passportID: string;
    activo: boolean;
    fechaNacimiento: string;
    participacion: string;
}

export class InfoCoAcreditadoModel {
    idCatInformacionAcreditado?: number;
    idEncSolicitud?: number;
  idEncSolicitudStr?: string;

    borrowersName: string;
    participatesLoan: boolean;
    participatesLoanStr: string;
    currentClient: boolean;
    currentClistr: string;
    pep: boolean;
    PEPstr: string;
    dateOfBirth: Date; 
    placeOfBirth: string;
    ssN_TAXID: number;
    passportId: string;
    economicActivity?: string;
    dependents: boolean;
    depenstr: string;
    dependentsQuantity: number;
    ages: string;
    parentage: string;
    homePhone: string;
    phoneNumber: string;
    email: string;
    addressInMexico?: string;
    tempPermRecidence: boolean;
    tempRecstr: string;
    employerName: string;
    employerAddress: string;
    selfEmployed: boolean;
    selfEmpstr: string;
    yearsOnThePosition: number;
    position: string;
    companyPhoneNumber: string;
    substitutes: SustitutosModel[];
    fechaCreacion?: Date;
    fechaModificacion?: Date;
    idUsuarioCreacion?: number;
    idUsuarioModificacion?: number;
    activo?: boolean;
    nationality: string;
    addressDifferentBorrower?: boolean;    
    address?: string;
    state?: string;
    city?: string;
    zip?: string;
    yearsOfResidence?: number;
    addressBorrower?: string;
    stateBorrower?: string;
    cityBorrower?: string;
    zipBorrower?: string;
    yearsOfResidenceBorrower?: number;    
    homePhoneBorrower: string;
    
    addressCoBorrower?: string;
    stateCoBorrower?: string;
    cityCoBorrower?: string;
    zipCoBorrower?: string;
    yearsOfResidenceCoBorrower?: number;
    homePhoneCoBorrower: string;
    addressInMexicoCoBorrower: string;
    curp: string;
    rfc: string;    
    isSpouseCoBorrower?: boolean;
    idCatMaritalStatus?: number;
    questionAddressMexico?: boolean;    
}

export class AbogadoModel {
    nombreAbogado: string;
	nacionalidad: string;
	passportId: string;
    IdNumber : string;
	address: string;
	state: string;
	city: string;
	zipCode: string;
    Celular : string;
    Email : string;
    rfc: string;
    curp:string;
    idEncSolicitud?: number;
    idEncSolicitudStr?: string;
    idCatAbogado?: number;
}

export class ExpedienteMedicoModel{
    idCatEnfermedad: number;
    enfermedad: string;
    enfermedad_EN: string;
    activo: boolean;
    idRelAcreditadoEnfermedad: number;
    idEncSolicitud: number;
    idEncSolicitudStr?: string;
    isCoBorrower: boolean;
    tieneEnfermedad ?: boolean;
    tieneEnfermedadStr ?: string;
}

export class validarSustitutos{
    ispassportId: boolean = false;

}