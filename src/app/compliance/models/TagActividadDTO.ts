import { EntidadEstatus } from './EntidadEstatus';

export class TagActividadDTO {

    public actividadId: number;
    public nombre: string;
    public prefijo: string;
    public consecutivo: number;
    public estatus: EntidadEstatus;

    public siguienteCodigoTag: string;
    
    constructor(
        actividadId: number,
        nombre: string,
        prefijo: string,
        consecutivo: number,
        estatus: EntidadEstatus,
        siguienteCodigoTag: string
    ) {
        this.actividadId = actividadId;
        this.nombre = nombre;
        this.prefijo = prefijo;
        this.consecutivo = consecutivo;
        this.estatus = estatus;
        this.siguienteCodigoTag = siguienteCodigoTag;
    }
}