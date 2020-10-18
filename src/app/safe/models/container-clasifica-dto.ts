import {Deserializable} from '../../compliance/models/deserializable';

export class ContainerClasificaDTO implements Deserializable {
    public opcionPadreId: number;
    public nodesAssociated: Array<number>;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
