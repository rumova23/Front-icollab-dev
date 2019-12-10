import {Deserializable} from './deserializable';
import {TagOutDTO} from './tag-out-dto';
import {CumplimientoIntegranteDTO} from './cumplimiento-integrante-dto';

export class ResponseVO implements Deserializable  {

    public success: boolean;
    public message: string;
    public code: number;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
