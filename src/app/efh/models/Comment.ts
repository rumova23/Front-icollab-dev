export class Comment {
    private id: string;
    private ideventconfig: string;
    private nombre: string;
    private observacion: string;
    private fecha_modificacion: Date;
    private active: boolean;
    private saved: boolean;

    constructor(
        id: string,
        ideventconfig: string,
        nombre: string,
        observacion: string,
        // tslint:disable-next-line:variable-name
        fecha_modificacion: Date,
        active: boolean,
        saved: boolean
    ) {
        this.id = id;
        this.ideventconfig = ideventconfig;
        this.nombre = nombre;
        this.observacion = observacion;
        this.fecha_modificacion = fecha_modificacion;
        this.active = active;
        this.saved = saved;
    }
}
