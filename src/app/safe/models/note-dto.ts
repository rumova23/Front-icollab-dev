import {Deserializable} from '../../compliance/models/deserializable';

export class NoteDTO implements Deserializable {
    public noteId: number;
    public note: string;
    public visible: boolean;
    public usuario: string;
    public update: Date;
    public updateString: string;
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
