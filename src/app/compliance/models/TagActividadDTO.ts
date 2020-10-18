import { EntidadEstatus } from './EntidadEstatus';

export class TagActividadDTO {

    public idActivity: number;
    public name: string;
    public prefix: string;
    public consecutive: number;
    public timeTask: number;
    public taskOvercome: number;
    public taskNextOvercome: number;
    public active: boolean;
    public siguienteCodigoTag: string;
    public referenceclone:string;
    public cloned:boolean;

    constructor(
        idActivity: number,
        name: string,
        prefix: string,
        consecutive: number,
        timeTask: number,
        taskOvercome: number,
        taskNextOvercome: number, 
        active: boolean,
        siguienteCodigoTag: string,
        referenceclone:string,
        cloned:boolean
    ) {
        this.idActivity = idActivity;
        this.name = name;
        this.prefix = prefix;
        this.consecutive = consecutive;
        this.timeTask = timeTask;
        this.taskOvercome = taskOvercome;
        this.taskNextOvercome = taskNextOvercome;
        this.active = active;
        this.siguienteCodigoTag = siguienteCodigoTag;
        this.referenceclone = referenceclone;
        this.cloned = cloned;
    }
}