import { Deserializable } from 'src/app/compliance/models/deserializable';

export class PiServerValue  implements Deserializable {
    
    public Name      ?: string = null;
    public Timestamp ?: string = null;
    public Value      : string = null;
  
    deserialize(input: any): this {
      return Object.assign(this, input);
    }

}
