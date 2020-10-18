export class Respuesta {

    public pregunta: string;
    public resOpcion: string;
    public resText: string;

    constructor(
        pregunta: string,
        resOpcion: string,
        resText: string,
    ) {
        this.pregunta = pregunta;
        this.resOpcion = resOpcion;
        this.resText = resText;
    }
}
