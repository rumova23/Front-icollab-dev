import {Deserializable} from '../../compliance/models/deserializable';

export class InvoiceProductDTO implements Deserializable {
    public id: number;
    public idInvoice: number;
    public idProduct: number;
    public code: string;
    public description: string;
    public quantity: number;
    public unitValue: number;
    public discount: number;
    public amount: number;
    public mw: number;
    public percentageIva: number;
    public amountIva: number;
    public taxiKey: number;
    public typeFactor: string;
    public base: number;
    public rateQuota: string;
    public idTypeDocument: number;
    public idSettlementInvoice: number;
    public idConcept: number;
    public unityText: string;
    public unityKey: string;
    public codeClient: string;
    public folioUnique: string;
    public concept: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
