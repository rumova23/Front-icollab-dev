import {Deserializable} from '../../compliance/models/deserializable';
import {SettlementDT0} from './settlement-dt0';

export class EconomicProposalDTO implements Deserializable  {
    public economicProposalId: number;
    public proyecto: string;
    public numeroMesCod: number;
    public mesAnio: Date;
    public cfcAm: number;
    public cfomMtm: number;
    public cfomDm: number;
    public cfomMom: number;
    public cvoM: number;
    public ccaM: number;
    public pdgM: number;
    public pi: number;
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
