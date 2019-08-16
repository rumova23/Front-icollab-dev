
export class TagActividadInDTO {

    public idActivity: number;
    public name: string;
    public prefix: string;
    public active: boolean;
    public timeTask: number;
    public taskNextOvercome: number;
    public taskOvercome: number;
    public referenceclone:string;
    public cloned:number;    

    constructor(
        idActivity: number,
        name: string,
        prefix: string,
        active: boolean,
        timeTask: number,
        taskNextOvercome: number,
        taskOvercome: number,
        referenceclone : string,
        cloned:number
    ) {
        this.idActivity = idActivity;
        this.name = name;
        this.prefix = prefix;
        this.active = active;
        this.timeTask = timeTask;
        this.taskNextOvercome = taskNextOvercome;
        this.taskOvercome = taskOvercome;
        this.referenceclone = referenceclone;
        this.cloned = cloned;
    }
}