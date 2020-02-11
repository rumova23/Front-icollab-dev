import {Deserializable} from '../../compliance/models/deserializable';
import {AnnexedDTO} from './annexed-dto';

export class ConceptDTO implements Deserializable  {
    private id: number;
    private ful: string;
    private group: string;
    private description: string;
    private totalAmount: number;
    private iva: number;
    private totalNet: number;
    private idSettlementInvoice: number;
    private totalAmountDifference: number;
    private ivaDifference: number;
    private totalNetDifference: number;
    private annexeds: Array<AnnexedDTO>;
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
