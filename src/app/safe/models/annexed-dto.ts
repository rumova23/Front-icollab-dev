import {Deserializable} from '../../compliance/models/deserializable';
import {TimeRegisterDTO} from './time-register-dto';

export class AnnexedDTO implements Deserializable  {
    public id: number;
    public element: string;
    public node: string;
    public idConcept: number;
    public timeRegisters: Array<TimeRegisterDTO>;
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
