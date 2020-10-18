import { Maestro } from './maestro';
import { Codigo } from './codigo';
export interface MaestroOpcion {
    maestroOpcionId: string;
    maestro: Maestro;
    padre: Maestro;
    codigo: Codigo;
    orden: string;
    ver: string;
    modificar: string;
    eliminar: string;
    mensajeGenerico: string;
}
