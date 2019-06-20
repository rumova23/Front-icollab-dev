
export class Constants {

    public static ERROR_LOAD: string = "Error al cargar los datos, favor de verificar";

    public static ERROR_SAVE: string = "Error al guardar los datos, favor de verificar";
    
    public static LOADING_MEESSAGE: string = "Por favor espere...";

    public static DATE_FORMAT_PLANT = "YYYY-MM-DD";

    public static OPTIONS = {
        path: '/socketcluster/',
        hostname: 'localhost',
        port:8001,
        autoConnect: true,
        autoReconnect: false,
        secure: false,
        rejectUnauthorized: false,
        connectTimeout: 10000,
        ackTimeout: 10000,
        channelPrefix: null,
        disconnectOnUnload: true,
        multiplex: true,
        authEngine: null,
        codecEngine: null,
        subscriptionRetryOptions: {}
    };
   
}