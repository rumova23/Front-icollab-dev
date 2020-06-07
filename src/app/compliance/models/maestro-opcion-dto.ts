import {MaestroDTO} from './maestro-dto';
import {OpcionDTO} from './opcion-dto';

export class MaestroOpcionDTO {
    public maestroOpcionId: number;
    public maestro: MaestroDTO;
    public opcionPadreId: number;
    public padre: MaestroDTO;
    public opcion: OpcionDTO;
    public orden: number;
    public entidadEstatusId: number;
}
