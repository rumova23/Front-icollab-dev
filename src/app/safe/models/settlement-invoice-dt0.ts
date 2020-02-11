import {Deserializable} from '../../compliance/models/deserializable';
import {ConceptDTO} from './concept-dto';

export class SettlementInvoiceDT0 implements Deserializable  {
    private id: number;
    private type: string;
    private transmitter: string;
    private rfc: string;
    private businessName: string;
    private domicile: string;
    private fuf: string;
    private datePayment: Date;
    private idSettlement: number;
    private folioFactura: string;
    private totalAmount: number;
    private iva: number;
    private totalNet: number;
    private totalAmountDifference: number;
    private ivaDifference: number;
    private totalNetDifference: number;
    private concepts: Array<ConceptDTO>;
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
