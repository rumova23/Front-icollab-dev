
import { TagPrecedente } from './TagPrecedente'
import { TagPlanta } from './TagPlanta';

export class Tag {

    public tagId: number;
    public tag: string;
    public descripcion: string;
    
    public actividadId: number;
    public clasificacionActividad: number;
    public tipoCumplimientoId: number;
    public requisitoLegal: string;
    public autoridadId: number;
    public tipoAplicacionId: number;
    public periodoEntregaId: number;
    public tipoDiasId: number;
    public entidadEstatusId: number;
    public plantas: Array <TagPlanta>;
    public precedentes : Array<TagPrecedente>;
    
    constructor(
        tagId: number,
        tag: string,
        descripcion: string,
        actividadId: number,
        clasificacionActividad: number,
        tipoCumplimientoId: number,
        requisitoLegal: string,
        autoridadId: number,
        tipoAplicacionId: number,
        periodoEntregaId: number,
        tipoDiasId: number,
        entidadEstatusId: number,
        plantas: Array<TagPlanta>,
        precedentes: Array<TagPrecedente>        
    ) {
        this.tagId = tagId;
        this.tag = tag;
        this.descripcion = descripcion;
        this.actividadId = actividadId;
        this.clasificacionActividad = clasificacionActividad;
        this.tipoCumplimientoId = tipoCumplimientoId;
        this.requisitoLegal = requisitoLegal;
        this.autoridadId = autoridadId;
        this.tipoAplicacionId = tipoAplicacionId;
        this.periodoEntregaId = periodoEntregaId;
        this.tipoDiasId = tipoDiasId;
        this.entidadEstatusId = entidadEstatusId;
        this.plantas = plantas;
        this.precedentes = precedentes; 
    }

}