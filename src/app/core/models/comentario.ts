export class Comentario {
    private id: string;
    private nombre: string;
    private observacion: string;
    private fecha_modificacion: Date;

    constructor(
        id: string,
        nombre: string,
        observacion: string,
        fecha_modificacion: Date
    ) {
        this.id = id;
        this.nombre = nombre;
        this.observacion = observacion;
        this.fecha_modificacion = fecha_modificacion;
    }




}
