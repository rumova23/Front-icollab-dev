import {Deserializable} from './deserializable';

export class  TagActividadOutDTO implements Deserializable  {
    public idActivity: number;
    public name: string;
    public prefix: string;
    public consecutive: number;
    public timeTask: number;
    public taskOvercome: number;
    public taskNextOvercome: number;
    public active: boolean;
    public siguienteCodigoTag: string;
    public referenceclone: string;
    public cloned: boolean;
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

}
