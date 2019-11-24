
import { TagPrecedente } from './TagPrecedente';

export class Tag {

    public idTag: number;
    public tag: string;
    public description: string;
    public idActivity: number;
    public classificationActivity: number;
    public idTypeCompliance: number;
    public requisitoLegal: string;
    public idAuthority: number;
    public idApplicationType: number;
    public unitPeriod: number;
    public period: number;
    public idDaysType: number;
    public active: boolean;
    public precedents: Array<TagPrecedente>;
    constructor(
        idTag: number,
        tag: string,
        description: string,
        idActivity: number,
        classificationActivity: number,
        idTypeCompliance: number,
        requisitoLegal: string,
        idAuthority: number,
        idApplicationType: number,
        unitPeriod: number,
        period: number,
        idDaysType: number,
        active: boolean,
        precedents: Array<TagPrecedente>
    ) {
        this.idTag = idTag;
        this.tag = tag;
        this.description = description;
        this.idActivity = idActivity;
        this.classificationActivity = classificationActivity;
        this.idTypeCompliance = idTypeCompliance;
        this.requisitoLegal = requisitoLegal;
        this.idAuthority = idAuthority;
        this.idApplicationType = idApplicationType;
        this.unitPeriod = unitPeriod;
        this.period = period;
        this.idDaysType = idDaysType;
        this.active = active;
        this.precedents = precedents;
    }
}
