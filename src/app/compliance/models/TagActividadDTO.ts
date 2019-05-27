import { EntidadEstatus } from './EntidadEstatus';

export class TagActividadDTO {

    public actividadId: number;
    public nombre: string;
    public prefijo: string;
    public consecutivo: number;
    public tareaPorVencer: number;
    public tareaProximaVencer: number;
    public tareaTiempo: number;
    public estatus: EntidadEstatus;
    public siguienteCodigoTag: string;
    
    constructor(
        actividadId: number,
        nombre: string,
        prefijo: string,
        consecutivo: number,
        tareaPorVencer: number,
        tareaProximaVencer: number,
        tareaTiempo: number, 
        estatus: EntidadEstatus,
        siguienteCodigoTag: string
    ) {
        this.actividadId = actividadId;
        this.nombre = nombre;
        this.prefijo = prefijo;
        this.consecutivo = consecutivo;
        this.tareaPorVencer = tareaPorVencer;
        this.tareaProximaVencer = tareaProximaVencer;
        this.tareaTiempo = tareaTiempo;
        this.estatus = estatus;
        this.siguienteCodigoTag = siguienteCodigoTag;
    }
}