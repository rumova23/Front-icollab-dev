
export class DiagramaGant {

    public tag: string;
    public actividad: string;
    public planta: string;
    public colorSemana: Array <any>;
    
    constructor(
        tag: string,
        actividad: string,
        planta: string,
        colorSemana: Array <any>
    ) {
        this.tag = tag;
        this.actividad = actividad;
        this.planta = planta;
        this.colorSemana = colorSemana;
    }
}