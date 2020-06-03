import {Deserializable} from '../../compliance/models/deserializable';

export class YearMountDTO implements Deserializable  {

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
