import { Deserializable } from 'src/app/compliance/models/deserializable';
import { PiServerData } from './piServerData';
export class PiServerBox implements Deserializable{
    name ?: string = null;
    data  : PiServerData[] = [];
    
    deserialize(input: any): this {
        Object.assign(this, input);
        this.data = input.data.map(dat => new PiServerData().deserialize(dat));

        return this;
    }
}
