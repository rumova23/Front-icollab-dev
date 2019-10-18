export class Task {
    public fechaInicio: number;
    public fechaFinal: number;
    public actorId: number;
    public tipoCumplimientoId: number;
    public actividadId: number;
    public tagId: number;
    public tipoPerfil: string;
    constructor(
        fechaInicio: number,
        fechaFinal: number,
        actorId: number,
        tipoCumplimientoId: number,
        actividadId: number,
        tagId: number,
        tipoPerfil: string,
    ) {
    this.fechaInicio = fechaInicio;
    this.fechaFinal = fechaFinal;
    this.actorId = actorId;
    this.tipoCumplimientoId = tipoCumplimientoId;
    this.actividadId = actividadId;
    this.tagId = tagId;
    this.tipoPerfil = tipoPerfil;
    }
}
