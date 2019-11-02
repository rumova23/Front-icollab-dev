import {Deserializable} from './deserializable';
import {EntidadDTO} from './entidad-dto';
import {EstatusDTO} from './estatus-dto';

export class EntidadEstausDTO implements Deserializable {
    public entidadEstatusId: number;
    public entidad: EntidadDTO;
    public estatus: EstatusDTO;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
