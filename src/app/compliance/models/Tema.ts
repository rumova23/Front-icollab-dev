export class Tema {
    public value: string;
    public label: string;
    public color: string;
    public respuestaPresentacionId: string;
    public justificacion: string;
    public pregu: Array<any>;

    constructor(
        value: string,
        label: string,
        color: string,
        respuestaPresentacionId: string,
        justificacion: string,
        pregu: Array<any>,
    ) {
        this.value = value;
        this.label = label;
        this.color = color;
        this.respuestaPresentacionId = respuestaPresentacionId;
        this.justificacion = justificacion;
        this.pregu = pregu;
    }
}
