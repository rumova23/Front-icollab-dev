import {Deserializable} from '../../compliance/models/deserializable';
import {MaestroOpcionDTO} from '../../compliance/models/maestro-opcion-dto';

export class SpliceDTO  implements Deserializable {
    public order: number;
    public spliceId: number;
    public binnacleEventConfigurationId: number;

    public eventsClassificationId;
    public eventsClassification: string;
    public eventsClassificationDTO: MaestroOpcionDTO;

    public eventsId: number;
    public events: string;
    public eventsDTO: MaestroOpcionDTO;

    public restrictionLevelId: number;
    public restrictionLevel: string;
    public restrictionLevelDTO: MaestroOpcionDTO;

    public colorId: number;
    public color: string;
    public colorDTO: MaestroOpcionDTO;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
