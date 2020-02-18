import {Deserializable} from '../../compliance/models/deserializable';
import {AnnexedDTO} from './annexed-dto';

export class ConceptDTO implements Deserializable  {
    public id: number;
    public ful: string;
    public group: string;
    public description: string;
    public totalAmount: number;
    public iva: number;
    public totalNet: number;
    public idSettlementInvoice: number;
    public totalAmountDifference: number;
    public ivaDifference: number;
    public totalNetDifference: number;
    public annexeds: Array<AnnexedDTO>;
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
