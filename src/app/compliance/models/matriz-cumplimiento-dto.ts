import {TagOutDTO} from './tag-out-dto';
import {Deserializable} from './deserializable';
import {CumplimientoIntegranteDTO} from './cumplimiento-integrante-dto';
import {EntidadEstausDTO} from './entidad-estaus-dto';

export class MatrizCumplimientoDTO implements Deserializable  {

    public  matrizCumplimientoId: number;
    public  anio: number;
    public  entidadEstatus: EntidadEstausDTO;
    public  matriz: Array<TagOutDTO>;
    public  cumplimientoIntegrantes: Array<CumplimientoIntegranteDTO>;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
