import {Deserializable} from './deserializable';

export class EstatusDTO implements Deserializable {
    public estatusId: number;
    public nombre: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
