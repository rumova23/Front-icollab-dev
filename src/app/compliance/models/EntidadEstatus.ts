import { Entidad } from './Entidad';

export class EntidadEstatus {

    public actividadId: number;
    public entidad: Entidad;
    public estatus: Entidad;

    constructor(
        actividadId: number,
        entidad: Entidad,
        estatus: Entidad
    ) {
        this.actividadId = actividadId;
        this.entidad = entidad;
        this.estatus = estatus;
    }
}