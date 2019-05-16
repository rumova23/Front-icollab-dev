import { Tag } from './Tag';

export class TagPrecedente {

    public tagPrecedenteId: number;
    public tagPadre: Tag;
    public tagHijo: Tag;
    
    constructor(
        tagPrecedenteId: number,
        tagPadre: Tag,
        tagHijo: Tag
    ) {
        this.tagPrecedenteId = tagPrecedenteId;
        this.tagPadre = tagPadre;
        this.tagHijo = tagHijo;
    }
}