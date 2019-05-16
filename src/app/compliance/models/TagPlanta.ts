
export class TagPlanta {

    public catTagPlantaId: number
    public tagId: number
    public plantaId: number
    public entidadEstatusId: number 
    
    constructor(
        plantaId: number 
    ) {
        this.plantaId = plantaId;
    }/*
    constructor(
        tagPlantaId: number,
        tagId: number,
        plantaId: number,
        entidadEstatusId: number 
    ) {
        this.tagPlantaId = tagPlantaId;
        this.tagId = tagId;
        this.plantaId  = plantaId;
        this.entidadEstatusId = entidadEstatusId;
    }*/
    
}