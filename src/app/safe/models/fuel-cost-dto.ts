import {Deserializable} from '../../compliance/models/deserializable';

export class FuelCostDTO implements Deserializable {
    private concepto: string;
    private m3: number;
    private gjoule;
    private ctoUnit;
    private MXN: number;
    private usd: number;
    private usdGjoule: number;
    private ajustes: string;
    private mes: number;
    private facturado: number;
    private ajustado: number;
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
