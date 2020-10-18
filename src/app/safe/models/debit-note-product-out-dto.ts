import {Deserializable} from '../../compliance/models/deserializable';

export class DebitNoteProductOutDTO implements Deserializable {
    public id: number;

    public idDebitNote: number;

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

    public originalAmount: number;

    public modifiedAmount: number;

    public amountAjust: number;

    public iva: number;

    public total: number;

    public amountLetter: string;

    public folioUnique2: string;

    public concept2: string;

    public originalAmount2: number;

    public modifiedAmount2: number;

    public amountAjust2: number;

    public iva2: number;

    public total2: number;

    public amountLetter2: string;
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
