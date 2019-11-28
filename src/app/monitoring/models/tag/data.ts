import { Datum } from './datum';
import { Deserializable } from 'src/app/compliance/models/deserializable';
export class Data implements Deserializable{
   
    data          : Datum[];
    
    deserialize(input: any): this {
        // Assign input to our object BEFORE deserialize our cars to prevent already deserialized cars from being overwritten.
        Object.assign(this, input);
        
        debugger;
        // Iterate over all cars for our user and map them to a proper `Car` model
        this.data = input.data.map(dat => new Datum().deserialize(dat));

        debugger;
        return this;
    }
}
