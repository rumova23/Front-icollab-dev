const hostGateway = 'http://200.52.85.140:11123/';
// const hostLocal = 'http://localhost:11123/';
// const hostGateway = 'http://192.168.100.26:11123/';
export const environment = {
  production: false
  , appVersion  : 'Desarrollo V 1.0'
  , securityUrl             : hostGateway + 'security/'
  , catalogUrl              : hostGateway + 'catalog/'
  , mastercatalog              : hostGateway + 'mastercatalog/'
  , tagsUrl                 : hostGateway + 'tags/'
  , microexamenUrl          : hostGateway + 'microexamen/'
  , evaluacionExamenUrl     : hostGateway + 'configuration/'
  , knowledgeUrl            : hostGateway + 'knowledge/'
  , seguimiento             : hostGateway + 'seguimiento/'
  , estatusmaestro          : hostGateway + 'estatusmaestro/'
  , marketUrl               : hostGateway + 'market/'
  , fuecdUrl                : hostGateway + 'fuecd/'
  , weatherUrl              : hostGateway + 'weather/'
  , ftpconsumerUrl          : hostGateway + 'ftpconsumer/'
  , pmlUrl                  : hostGateway + 'pml/'
  , trUrl                   : hostGateway + 'tr/'
  , mmmercadoUrl            : hostGateway + 'mmmercado/'
  , microuploaddbUrl        : hostGateway + 'microuploaddb/'
  ,urlTrPi                  : 'http://200.52.85.140:1119/'  // micro Bi
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
