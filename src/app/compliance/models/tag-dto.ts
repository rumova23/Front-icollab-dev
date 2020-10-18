import {ActivityDTO} from './activity-dto';
import {CatalogDTO} from './CatalogDTO';

export class TagDTO {
    public idTag: number;
    public active: boolean;
    public classificationActivity: string;
    public dateCreated: Date;
    public dateUpdated: Date;
    public description: string;
    public legalRequirement: string;
    public requisitoLegal: string;
    public precedents: null;
    public tag: string;
    public activity: ActivityDTO;
    public applicationType: CatalogDTO;
    public authority: CatalogDTO;
    public daysType: CatalogDTO;
    public period: number;
    public unitPeriod: CatalogDTO;
    public typeCompliance: CatalogDTO;
}
