import { Deserializable } from 'src/app/compliance/models/deserializable';

export class PiServerValue  implements Deserializable {
    
    public Name      ?: string = null;
    public Timestamp ?: string = null;
    public Value      : number = null;
  
    deserialize(input: any): this {
      Object.assign(this, input);
      return this;
    }

}
