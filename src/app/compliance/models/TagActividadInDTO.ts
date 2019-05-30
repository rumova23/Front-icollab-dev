
export class TagActividadInDTO {

    public actividadId: number;
    public nombre: string;
    public prefijo: string;
    public entidadEstatusId: number;
    public tareaPorVencer: number;
    public tareaProximaVencer: number;
    public tareaTiempo: number;
    
    constructor(
        actividadId: number,
        nombre: string,
        prefijo: string,
        entidadEstatusId: number,
        tareaPorVencer: number,
        tareaProximaVencer: number,
        tareaTiempo: number
    ) {
        this.actividadId = actividadId;
        this.nombre = nombre;
        this.prefijo = prefijo;
        this.entidadEstatusId = entidadEstatusId;
        this.tareaPorVencer = tareaPorVencer;
        this.tareaProximaVencer = tareaProximaVencer;
        this.tareaTiempo = tareaTiempo;
    }
}