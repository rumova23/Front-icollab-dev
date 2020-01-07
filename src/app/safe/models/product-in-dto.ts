import {Deserializable} from '../../compliance/models/deserializable';
import {BaseCatalogOutDTO} from './base-catalog-out-dto';

export class ProductInDTO implements Deserializable {
    public code: string;
    public description: string;
    public active: boolean;
    public price: number;
    public idProductSat: number;
    public idRateIvaSat: number;
    public idUnityProduct: number;
    public idTypeProduct: number;
    public systems: Array<BaseCatalogOutDTO>;
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
