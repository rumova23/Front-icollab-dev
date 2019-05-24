
export class DatosPie {

    public abierto: number;
    public cerrado: number;
    public abiertoFueraDeTiempo: number;
    public cerradoFueraDeTiempo: number;
    
    constructor(
        abierto: number,
        cerrado: number, 
        abiertoFueraDeTiempo: number,
        cerradoFueraDeTiempo: number
    ) {
        this.abierto = abierto;
        this.cerrado = cerrado;
        this.abiertoFueraDeTiempo = abiertoFueraDeTiempo;
        this.cerradoFueraDeTiempo = cerradoFueraDeTiempo;
    }
}