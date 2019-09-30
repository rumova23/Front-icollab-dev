
export class DatosGraficaGant {

    public listaAnios: Array<any>;
    public listaMeses: Array <any>;
    public listaNombreDias: Array <any>;
    public listaDatoslineaDeTiempo: Array<any>;

    constructor(
        listaAnios: Array <any>,
        listaMeses: Array <any>,
        listaNombreDias: Array <any>,
        listaDatoslineaDeTiempo: Array <any>
    ) {
        this.listaAnios = listaAnios;
        this.listaMeses = listaMeses;
        this.listaNombreDias = listaNombreDias;
        this.listaDatoslineaDeTiempo = listaDatoslineaDeTiempo;
    }
}
