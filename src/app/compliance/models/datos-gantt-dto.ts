import {Deserializable} from './deserializable';
import {DatosDTO} from './datos-dto';
import {DiaGantt} from './dia-gantt';

export class DatosGanttDTO implements Deserializable {
    public tag: string;
    public actividad: string;
    public listaAnios: Array<DatosDTO>;
    public listaMeses: Array<DatosDTO>;
    public listaNombreDias: Array<DatosDTO>;
    public listaNumeroDias: Array<DatosDTO>;
    public ganttProgramado: Array<DiaGantt>;
    public ganttReal: Array<DiaGantt>;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
