export class GenerigResponseDTO {

    public clave: number;
    public mensaje: string;
    public entity: any;

    constructor(
        clave: number,
        mensaje: string,
        entity: any,
    ) {
        this.clave = clave;
        this.mensaje = mensaje;
        this.entity = entity;
    }
}
