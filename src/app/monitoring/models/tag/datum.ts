import { Deserializable } from 'src/app/compliance/models/deserializable';
import { Item } from './item';

export class Datum  implements Deserializable{

    error_response : boolean;
    link           : string;
    plantId        : string;
    Items          : Item[];
    
    deserialize(input: any): this {
        // Assign input to our object BEFORE deserialize our cars to prevent already deserialized cars from being overwritten.
        Object.assign(this, input);
        
        debugger;
        // Iterate over all cars for our user and map them to a proper `Car` model
        this.Items = input.Items.map(item => new Item().deserialize(item));

        debugger;
        return this;
    }
}
