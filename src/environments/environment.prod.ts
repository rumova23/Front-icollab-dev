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
  ,appVersion : 'Desarrollo V 1.0'
  , mnUrl      : 'http://localhost:1155/'  // micro catalago maestro
  , micro_catalago_maestro      : 'http://localhost:1155/'  // micro catalago maestro
  , sgUrl      : 'http://localhost:8400/'  // seguridad
  , pgUrl      : 'http://localhost:1144/'  // micro examen
  , cnUrl      : 'http://localhost:1122/'  // evaluacion
  ,knUrl       : 'http://localhost:1133/knowledge/'  // conocimiento  
  , fdUrl      : 'http://localhost:1211/'  // filedb
  , mtUrl      : 'http://localhost:1188/'  // micro tag
  , coUrl      : 'http://localhost:1199/'  // micro compliance seguimiento
  , estatus_maestro      : 'http://localhost:1177/'  // micro estatus maestro
  ,securityUrl     : 'http://localhost:11122/security/'  // estatus maestro,
  ,mercadoUrl     : 'http://localhost:11120/'  // estatus maestro
};
