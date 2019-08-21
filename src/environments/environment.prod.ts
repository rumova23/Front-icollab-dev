/*
Puertos:

microservicio            &    master & dev

estatus-maestro                1177   1178
base-conocimiento              1133   1134
configuracion-evaluacion       1122   1123
micro-catalogo-maestro		     1155   1156
micro-examen                   1144   1145
micro-tag                      1188   1189
micro-compliance-seguimiento   1199   1200
*/
/*
export const environment = {
  production: false
  ,appVersion : 'Desarrollo V 1.0'
  ,sgUrl      : 'http://localhost:8400/'  //seguridad port:8400
  ,fdUrl      : 'http://localhost:1211/'  //filedb
  ,micro_catalago_maestro      : 'http://201.149.85.14:8383/catalogomaestro/'  //micro catalago maestro port:1155
  ,mnUrl      : 'http://201.149.85.14:8383/catalogomaestro/'  //micro catalago maestro port:1155
  ,pgUrl      : 'http://201.149.85.14:8383/microexamen/'  //micro examen port:1144
  ,cnUrl      : 'http://201.149.85.14:8383/evaluacionexamen/' //evaluacion port:1122
  ,mtUrl      : 'http://201.149.85.14:8383/tags/'  //micro tag port:1188
  ,coUrl      : 'http://201.149.85.14:8383/micro-seguimiento/'  //micro compliance seguimiento
  ,estatus_maestro      : 'http://201.149.85.14:8383/estatus-maestro/'  // estatus maestr
  ,securityUrl     : 'http://201.149.85.14:11122/security/'  // estatus maestro,
  ,mercadoUrl     : 'http://201.149.85.14:11120/'  // estatus maestro
};
*/
/*  
export const environment = {
  production: false
  ,appVersion : 'Desarrollo V 0.0.0.1'
  ,sgUrl      : 'http://localhost:8400/'  //seguridad port:8400
  ,fdUrl      : 'http://localhost:1211/'  //filedb
  ,micro_catalago_maestro      : 'http://201.149.85.14:8484/catalogomaestro-dev/'  //micro catalago maestro port:1155
  ,mnUrl      : 'http://201.149.85.14:8484/catalogomaestro-dev/'  //micro catalago maestro port:1155
  ,pgUrl      : 'http://201.149.85.14:8484/microexamen-dev/'  //micro examen port:1144
  ,cnUrl      : 'http://201.149.85.14:8484/evaluacionexamen-dev/' //evaluacion port:1122
  ,mtUrl      : 'http://201.149.85.14:8484/tags-dev/'  //micro tag port:1188
  ,coUrl      : 'http://201.149.85.14:8484/micro-seguimiento-dev/'  //micro compliance seguimiento
  ,estatus_maestro      : 'http://201.149.85.14:8383/estatus-maestro-dev/'  // estatus maestro
};

*/
export const environment = {
  production: false
  ,appVersion  : 'Desarrollo V 1.0'
  ,securityUrl : 'http://200.52.85.140:11123/security/'  // estatus maestro,
  //,sgUrl       : 'http://200.52.85.140:8400/'      // seguridad
  ,sgUrl      : 'http://200.52.85.140:11123/'    // seguridad

  ,mnUrl      : 'http://200.52.85.140:1155/'  // micro catalago maestro
  ,micro_catalago_maestro : 'http://200.52.85.140:1155/'  // micro catalago maestro

  ,mtUrl      : 'http://200.52.85.140:1188/tag/'  // micro tag

  ,pgUrl       : 'http://200.52.85.140:1144/exam/'  // micro examen 
  ,knUrl       : 'http://200.52.85.140:1133/knowledge/'  // conocimiento   
  ,cnUrl       : 'http://200.52.85.140:1122/'  // evaluacion
  ,fdUrl       : 'http://200.52.85.140:1211/'  // filedb
  ,coUrl       : 'http://200.52.85.140:1199/'  // micro compliance seguimiento
  ,micro_seguimiento : 'http://200.52.85.140:1199/'  // micro compliance seguimiento  
  ,estatus_maestro   : 'http://200.52.85.140:1177/'  // micro estatus maestro

  ,mercadoUrl  : 'http://200.52.85.140:11123/market/'  // estatus maestro
  
  ,fuecdUrl      : 'http://200.52.85.140:11123/fuecd/'   // fuecd
  ,weatherUrl    : 'http://200.52.85.140:11123/weather/'   // weather
  ,pmlUrl        : 'http://200.52.85.140:1114/'
  ,catalog       : 'http://200.52.85.140:11123/catalog/'  // micro catalago maestro
  ,modelMarket   : 'http://200.52.85.140:11123/mmmercado/'  // estatus maestro
  ,trUrl         : 'http://200.52.85.140:11123/tr/'   // weather
  ,monitoringUrl : 'http://200.52.85.140:1212/ftpconsumer/'  // Monitoreo FTP
};