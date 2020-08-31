import {Deserializable} from '../../compliance/models/deserializable';

export class FuelCostDTO implements Deserializable {
    public concepto: string;
    public indexId: number;
    public m3: number;
    public gjoule;
    public ctoUnit;
    public MXN: number;
    public usd: number;
    public usdGjoule: number;
    public ajustes: string;
    public mes: number;
    public facturado: number;
    public ajustado: number;
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}