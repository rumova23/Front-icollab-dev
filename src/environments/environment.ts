// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
/*
export const environment = {
  production: false
  ,appVersion : 'Desarrollo V 1.0'
  ,sgUrl      : 'http://200.52.85.140:8400/'  //seguridad port:8400
  ,fdUrl      : 'http://200.52.85.140:1211/'  //filedb
  ,micro_catalago_maestro      : 'http://201.149.85.14:8383/catalogomaestro/'  //micro catalago maestro port:1155
  ,mnUrl      : 'http://201.149.85.14:8383/catalogomaestro/'  //micro catalago maestro port:1155
  ,pgUrl      : 'http://201.149.85.14:8383/microexamen/'  //micro examen port:1144
  ,cnUrl      : 'http://201.149.85.14:8383/evaluacionexamen/' //evaluacion port:1122
  ,mtUrl      : 'http://201.149.85.14:8383/tags/'  //micro tag port:1188
  ,coUrl      : 'http://201.149.85.14:8383/micro-seguimiento/'  //micro compliance seguimiento
  ,estatus_maestro      : 'http://201.149.85.14:8383/estatus-maestro/'  // estatus maestr
  ,securityUrl     : 'http://201.149.85.14:11122/security/'  // estatus maestro,
  ,mercadoUrl     : 'http://201.149.85.14:11120/'  // estatus maestro
  ,pmlUrl     : 'http://200.52.85.140:1114/pml/rest/'
};
//*/
export const environment = {
  production: false
  ,appVersion : 'Desarrollo V 1.0'
  , mnUrl      : 'http://localhost:1155/'  // micro catalago maestro
  , micro_catalago_maestro      : 'http://localhost:1155/'  // micro catalago maestro
  , sgUrl      : 'http://localhost:8400/'  // seguridad
  , pgUrl      : 'http://localhost:1144/'  // micro examen
  , cnUrl      : 'http://localhost:1122/'  // evaluacion
  ,knUrl       : 'http://localhost:1133/knowledge/'  // conocimiento 
  ,micro_seguimiento : 'http://200.52.85.140:1199/'  // micro compliance seguimiento    
  , fdUrl      : 'http://localhost:1211/'  // filedb
  , mtUrl      : 'http://localhost:1188/'  // micro tag
  , coUrl      : 'http://localhost:1199/'  // micro compliance seguimiento 
  , estatus_maestro      : 'http://localhost:1177/'  // micro estatus maestro
  ,securityUrl     : 'http://localhost:11122/security/'  // estatus maestro,
  ,mercadoUrl     : 'http://localhost:11120/'  // estatus maestro
  ,fuecdUrl        : 'http://200.52.85.140:11123/fuecd/'   // fuecd  
  ,weatherUrl      : 'http://200.52.85.140:11123/weather/'   // weather  
  ,monitoringUrl   : 'http://200.52.85.140:1212/ftpconsumer/'  // Monitoreo FTP  
  ,pmlUrl          : 'http://200.52.85.140:1114/'
  ,trUrl           : 'http://200.52.85.140:11123/tr/'   // weather    
  ,modelMarket     : 'http://200.52.85.140:11123/mmmercado/'  // estatus maestro 
  ,catalog         : 'http://200.52.85.140:11123/catalog/'  // micro catalago maestro   
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
