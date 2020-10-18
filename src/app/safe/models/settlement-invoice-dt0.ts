import {Deserializable} from '../../compliance/models/deserializable';
import {ConceptDTO} from './concept-dto';

export class SettlementInvoiceDT0 implements Deserializable  {
    public id: number;
    public type: string;
    public transmitter: string;
    public rfc: string;
    public businessName: string;
    public domicile: string;
    public fuf: string;
    public datePayment: Date;
    public bankReference: string;
    public dateOperation: Date;
    public idSettlement: number;
    public folioFactura: string;
    public totalAmount: number;
    public iva: number;
    public totalNet: number;
    public totalAmountDifference: number;
    public ivaDifference: number;
    public totalNetDifference: number;
    public concepts: Array<ConceptDTO>;

    public tipoFuf: string;
    public liquidacion: number;
    public fuecd: string;
    public isProcedencia: number;
    public idInvoice: number;
    public entidadEstatusId: number;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
