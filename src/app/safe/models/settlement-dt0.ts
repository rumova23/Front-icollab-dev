import {Deserializable} from '../../compliance/models/deserializable';
import {SettlementInvoiceDT0} from './settlement-invoice-dt0';

export class SettlementDT0 implements Deserializable  {
    public id: number;
    public number: string;
    public idAccountStatus: number;
    public settlementInvoices: Array<SettlementInvoiceDT0>;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
