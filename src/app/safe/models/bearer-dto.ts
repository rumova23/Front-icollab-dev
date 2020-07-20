import {Deserializable} from '../../compliance/models/deserializable';

export class BearerDTO implements Deserializable {
    public bearerId: number;
    public bearerName: string;
    public bearerType: string;
    public bearerContentType: string;
    public bearerSize: number;
    public bearerData: string;
    public bearerDownloadUri: string;

    public usuario: string;
    public update: Date;
    public updateString;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
