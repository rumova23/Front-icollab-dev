export class Comment {
    private id: string;
    private nombre: string;
    private observacion: string;
    private fecha_modificacion: Date;
    private saved: boolean;

    constructor(
        id: string,
        nombre: string,
        observacion: string,
        // tslint:disable-next-line:variable-name
        fecha_modificacion: Date,
        saved: boolean
    ) {
        this.id = id;
        this.nombre = nombre;
        this.observacion = observacion;
        this.fecha_modificacion = fecha_modificacion;
        this.saved = saved;
    }
}
