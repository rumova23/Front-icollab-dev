import { Deserializable } from 'src/app/compliance/models/deserializable';

export class Value  implements Deserializable {
    
    public IsSystem  ?: boolean;
    public Name      ?: string;
    public Timestamp ?: string;
    public Value      : string;
  
    deserialize(input: any): this {
      
      debugger;
      return Object.assign(this, input);
    }

}
