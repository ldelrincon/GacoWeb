  // The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  // Local
  serverUrlDocs: 'https://localhost:5002/api',

  //Control
  IsEncriptedOff: true,

   serverUrl: "http://localhost:5202/api",
  apiUrlCore: "https://localhost:7002/api",
  serverUrlPagos: "https://localhost:5001/api",
  UsuarioAzureLogIn: 'https://localhost/Saml2/SamlProtocol/OnPost',
  UsuarioAzureLogOut: 'https://localhost/Saml2/SamlProtocol/Logout',
  // authServer: 'https://localhost/ServicioTokens/',
  authServer: 'http://localhost:7119/',
  HubMessage: 'https://localhost:5001/message',
  apiUrlCatalogoGeograficos: 'https://dev.nezter.com/ApiGeoreferencia/api',
  serverUrlLP: 'https://dev.nezter.com/IntercamLibrePapelProdDocumentosExternos', // API
  urlControlLP: 'https://dev.nezter.com/IntercamLibrePapel/PlantillasExternas/EditorDeTextoExterno/Index', // control LP
  urlControlLP_PlantillasExternas: 'https://dev.nezter.com/IntercamLibrePapel/PlantillasExternas/PlantillasExternas/index',
  // Correo: "https://localhost:58977/api",
  keyEncriptacion: 'LM5792468097531013579246809753AS',
  EncryptIV: "lRCw1qlLMoGGQKKSPzisxA==",



  version: "0.1",
  sprint: 1,
  release: 1,
  idTablaRelacion: 0,
  idRelacion: 0,
};

//ng build --base-href "/IEnovaWeb/" --configuration QA
//ng build --base-href "/IEnovaWeb/" --prod
