import {Deserializable} from './deserializable';

export class DatosDTO  implements Deserializable {
    public valor: string;
    public cellSpacing: number;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
