
export class TagActividadInDTO {

    public actividadId: number;
    public nombre: string;
    public prefijo: string;
    public entidadEstatusId: number;
    
    constructor(
        actividadId: number,
        nombre: string,
        prefijo: string,
        entidadEstatusId: number 
    ) {
        this.actividadId = actividadId;
        this.nombre = nombre;
        this.prefijo = prefijo;
        this.entidadEstatusId = entidadEstatusId;
    }
}