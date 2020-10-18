export class Grafica {
    public chartType: string;
    public cd_1: Array<any>;
    public cl_1: Array<any>;
    public cc_1: Array<any>;
    
    public border: number;
    public respon: boolean;
    public porcen: string;
    public totRea: string;
    public puntua:  string;


    constructor(
        chartType: string,
        cd_1: Array<any>,
        cl_1: Array<any>,
        cc_1: Array<any>,
        border: number,
        respon: boolean,
        porcen: string,
        totRea: string,
        puntua:  string,
    ) {
        this.chartType = chartType;
        this.cd_1 = cd_1;
        this.cl_1 = cl_1;
        this.cc_1 = cc_1;
        this.border = border;
        this.respon = respon;
        this.porcen = porcen;
        this.totRea = totRea;
        this.puntua = puntua;
    }
}
