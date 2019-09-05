
export class Constants {

    public static ERROR_LOAD: string = "Error al cargar los datos, favor de verificar";

    public static ERROR_SAVE: string = "Error al guardar los datos, favor de verificar";
    
    public static LOADING_MEESSAGE: string = "Por favor espere...";

    public static SAVE_SUCCESS: string = "Guardado correcto";

    public static DATE_FORMAT_PLANT = "YYYY-MM-DD";
    public static DATE_FORMAT_WEATHER = "YYYY/MM/DD";


    public static OPTIONS = {
        path: '/socketcluster/',
        //hostname: 'localhost',
        //hostname: '201.149.85.14',
        //hostname: '172.20.141.102',
        hostname:'200.52.85.140',
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