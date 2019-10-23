
import { Tag } from './Tag';

export class Compliance {


    public tag: string;
    public complianceId: number;
    public tagPlantaId: number;
    public entidadEstatusId: number;
    public fechaProgramadaInicio: string;
    public fechaProgramadaFinal: string;
    public fechaRealInicio: string;
    public fechaRealFin: string;
    public fechaUltimaModicacion: string
    public tagDTO: Tag;
    public complianceProcedenteDTO: Array <any>; // precedentes
    public complianceEmpleadoDTO: Array <any>; // actores
    constructor(
        tag: string,
        complianceId: number,
        tagPlantaId: number,
        entidadEstatusId: number,
        fechaProgramadaInicio: string,
        fechaProgramadaFinal: string,
        fechaRealInicio: string,
        fechaRealFin: string,
        fechaUltimaModicacion: string,
        tagDTO: Tag,
        complianceProcedenteDTO: Array <any>,
        complianceEmpleadoDTO: Array <any>
    ) {
        this.tag = tag;
        this.complianceId = complianceId;
        this.tagPlantaId = tagPlantaId;
        this.entidadEstatusId = entidadEstatusId;
        this.fechaProgramadaInicio  = fechaProgramadaInicio;
        this.fechaProgramadaFinal = fechaProgramadaFinal;
        this.fechaRealInicio = fechaRealInicio;
        this.fechaRealFin = fechaRealFin;
        this.fechaUltimaModicacion = fechaUltimaModicacion;
        this.tagDTO = tagDTO;
        this.complianceProcedenteDTO = complianceProcedenteDTO;
        this.complianceEmpleadoDTO = complianceEmpleadoDTO;
    }
}
