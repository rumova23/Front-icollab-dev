import {CatalogDTO} from './CatalogDTO';
import {TagActividadOutDTO} from './tag-actividad-out-dto';
import {Deserializable} from './deserializable';

export class TagOutDTO implements Deserializable  {
    public daysType: CatalogDTO;
    public activity: TagActividadOutDTO;
    public classificationActivity: string;
    public applicationType: CatalogDTO;
    public legalRequirement: CatalogDTO;
    public active: boolean;
    // public Set<TagPrecedenteDTO> precedents;
    public complianceId: number;
    public idTag: number;
    public tag: string;
    public description: string;
    public typeCompliance: CatalogDTO;
    public authority: CatalogDTO;
    public period: number;
    public unitPeriod: CatalogDTO;
    public countCompliance: number;


    public userCreated: string;
    public dateCreated: string;
    public userUpdated: string;
    public dateUpdated: string;
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
