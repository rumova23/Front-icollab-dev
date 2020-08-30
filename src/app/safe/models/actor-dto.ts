import {MaestroOpcionDTO} from '../../compliance/models/maestro-opcion-dto';
import {Deserializable} from '../../compliance/models/deserializable';

export class ActorDTO  implements Deserializable {
    public actorId: number;
    public rolId: number;
    public rol: string;
    public rolDTO: MaestroOpcionDTO;
    public username: string;
    public statusId: number;
    public status: string;
    public statusDTO: MaestroOpcionDTO;
    private actionId: number;
    private action: string;
    private actionDTO: MaestroOpcionDTO;

    public usuario: string;
    public update: Date;
    public updateString: string;

    public order: number;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
