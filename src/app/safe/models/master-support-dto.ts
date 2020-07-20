import {Deserializable} from '../../compliance/models/deserializable';
import {MaestroOpcionDTO} from '../../compliance/models/maestro-opcion-dto';
import {BearerDTO} from './bearer-dto';

export class MasterSupportDTO implements Deserializable {
    public supportId: number;
    public appId: number;
    public app: string;
    public appDTO: MaestroOpcionDTO;
    public entityProcesId: number;
    public entityProcess: string;
    public entityProcessDTO: MaestroOpcionDTO;
    public recordObservedId: number;

    public bearers: Array<BearerDTO>;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
