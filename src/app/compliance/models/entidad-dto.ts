import {Deserializable} from './deserializable';

export class EntidadDTO implements Deserializable {
    public entidadId: number;
    public nombre: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
