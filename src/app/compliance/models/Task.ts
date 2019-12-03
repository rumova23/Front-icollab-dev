import {Deserializable} from './deserializable';

export class Task implements Deserializable  {
    public complianceId: number;
    public supervisores: Array<number>;
    public ejecutores: Array<number>;
    public responsables: Array<number>;
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
