
export class Entidad {
    
  [x: string]: any;

    public entidadId: number;
    public nombre: string;

    constructor(
        entidadId: number,
        nombre: string
    ) {
        this.entidadId = entidadId;
        this.nombre = nombre;
    }
}