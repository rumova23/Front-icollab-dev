import {Deserializable} from '../../compliance/models/deserializable';
import {SettlementDT0} from './settlement-dt0';

export class AccountStatusDT0 implements Deserializable  {
    public id: number;
    public fuecd: string;
    public competitorKey: string;
    public subcuentKey: string;
    public dateOperation: Date;
    public dateEmission: Date;
    public systemKey: string;
    public entidadEstatusId: number;
    public settlements: Array<SettlementDT0>;
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
