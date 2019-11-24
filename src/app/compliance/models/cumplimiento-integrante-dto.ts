import {MatrizCumplimientoDTO} from './matriz-cumplimiento-dto';
import {Deserializable} from './deserializable';

export class CumplimientoIntegranteDTO implements Deserializable  {

    public cumplimientoIntegranteId: number;
    public estatusResponsabilidad: number;
    public username: string;
    public entidadEstatusId: number;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
