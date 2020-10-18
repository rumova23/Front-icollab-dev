import {Deserializable} from '../../compliance/models/deserializable';

export class YearMountDTO implements Deserializable  {

    public yearMountId: number;
    public yearMount: string;
    public year: number;
    public mount: number;
    public totalDay: number;
    public totalHour: number;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
