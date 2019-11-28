import { Deserializable } from 'src/app/compliance/models/deserializable';
import { Value } from './value';

export class Item implements Deserializable {
    public Value     ?: Value;
    public WebId     ?: string;
    public Name      ?: string;
    public Timestamp ?: string;
    public Items     ?: Item[];


    deserialize(input: any): this {
        
        // Assign input to our object BEFORE deserialize our cars to prevent already deserialized cars from being overwritten.
        Object.assign(this, input);
        
        debugger;
        // Iterate over all cars for our user and map them to a proper `Car` model
        if(input.Items){
            this.Items = input.Items.map(item => new Item().deserialize(item));
        }

        debugger;
        return this;
    }
}
