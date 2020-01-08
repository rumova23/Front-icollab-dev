import {Deserializable} from '../../compliance/models/deserializable';

export class BaseCatalogOutDTO implements Deserializable {
    public id: number;
    public code: string;
    public description: string;
    public active: boolean;
    public order: number;
    public referenceclone: string;
    public cloned: boolean;
    public userCreated: string;
    public dateCreated: string;
    public userUpdated: string;
    public dateUpdated: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
