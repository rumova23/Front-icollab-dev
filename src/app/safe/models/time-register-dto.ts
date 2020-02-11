import {Deserializable} from '../../compliance/models/deserializable';

export class TimeRegisterDTO implements Deserializable  {
    public id: number;
    public hour: number;
    public potencyMda: number;
    public potencyMtr: number;
    public price: number;
    public amount: number;
    public idAnnexed: number;
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
