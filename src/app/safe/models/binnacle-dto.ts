import {Deserializable} from '../../compliance/models/deserializable';
import {EntidadEstatusDTO} from '../../compliance/models/entidad-estatus-dto';
import {YearMountDTO} from './year-mount-dto';

export class BinnacleDTO implements Deserializable {
    private binnacleId: number;
    private entidadEstatusId: number;
    private entidadEstatusDTO: EntidadEstatusDTO;
    private yearMountId: number;
    private yearMountDTO: YearMountDTO;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
