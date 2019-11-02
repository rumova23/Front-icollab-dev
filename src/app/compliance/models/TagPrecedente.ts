import { Tag } from './Tag';

export class TagPrecedente {

    public idTagPrecedent: number;
    public tagPadre: Tag;
    public tagHijo: Tag;
    
    constructor(
        idTagPrecedent: number,
        tagPadre: Tag,
        tagHijo: Tag
    ) {
        this.idTagPrecedent = idTagPrecedent;
        this.tagPadre = tagPadre;
        this.tagHijo = tagHijo;
    }
}
