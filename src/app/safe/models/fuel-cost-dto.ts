import {Deserializable} from '../../compliance/models/deserializable';

export class FuelCostDTO implements Deserializable {
    public fuelCostId: number;
    public concepto: string;
    public indexId: number;
    public m3: number;
    public gjoule;
    public ctoUnit;
    public MXN: number;
    public usd: number;
    public usdGjoule: number;
    public ajustes: string;
    public mes: Date;
    public facturado: number;
    public ajustado: number;

    public dateOp: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
