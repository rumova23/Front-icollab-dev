import {Deserializable} from './deserializable';
import {TagDTO} from './tag-dto';
import {ActorDTO} from './actor-dto';
import {EntidadEstausDTO} from './entidad-estaus-dto';

export class ComplianceDTO implements Deserializable {
    public complianceId: number;
    public fechaProgramadaFinal: Date;
    public fechaProgramadaInicio: Date;
    public fechaRealFin: Date;
    public fechaRealInicio: Date;
    public fechaUltimaModicacion: Date;
    public tagDTO: TagDTO;
    public entidadEstatus: EntidadEstausDTO;
    public estatusInterno: EntidadEstausDTO;
    public periodo1: number;
    public periodo2: number;
    public actores: Array<ActorDTO>;
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
