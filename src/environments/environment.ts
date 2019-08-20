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
  ,appVersion  : 'Desarrollo V 1.0'
  ,securityUrl : 'http://200.52.85.140:11123/security/'  // security maestro,  
  ,sgUrl       : 'http://200.52.85.140:8400/'      // seguridad

  ,mnUrl       : 'http://200.52.85.140:1155/'  // micro catalago maestro
  ,micro_catalago_maestro : 'http://200.52.85.140:1155/'  // micro catalago maestro
  ,mtUrl      : 'http://200.52.85.140:1188/tag/'  // micro tag

  ,pgUrl      : 'http://200.52.85.140:1144/exam/'  // micro examen
  ,cnUrl      : 'http://200.52.85.140:1122/'  // evaluacion
  ,knUrl       : 'http://200.52.85.140:1133/knowledge/'  // conocimiento
  ,coUrl      : 'http://200.52.85.140:1199/'  // micro compliance seguimiento
  ,micro_seguimiento : 'http://200.52.85.140:1199/'  // micro compliance seguimiento  
  ,fdUrl      : 'http://200.52.85.140:1211/'  // filedb

  ,estatus_maestro : 'http://200.52.85.140:1177/'  // micro estatus maestro
  
  ,mercadoUrl      : 'http://200.52.85.140:11123/market/'  // estatus maestro
  ,fuecdUrl        : 'http://200.52.85.140:11123/fuecd/'   // fuecd
  ,weatherUrl      : 'http://200.52.85.140:11123/weather/'   // weather
  ,pmlUrl          : 'http://200.52.85.140:1114/'
  ,catalog         : 'http://200.52.85.140:11123/catalog/'  // micro catalago maestro
  ,modelMarket     : 'http://200.52.85.140:11123/mmmercado/'  // estatus maestro
  ,trUrl           : 'http://200.52.85.140:11123/tr/'   // weather
  ,monitoringUrl   : 'http://200.52.85.140:1212/ftpconsumer/'  // Monitoreo FTP
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
