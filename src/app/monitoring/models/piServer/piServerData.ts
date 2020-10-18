import { Deserializable } from 'src/app/compliance/models/deserializable';
import { PiServerItem } from './piServerItem';


export class PiServerData  implements Deserializable{

    error_response : boolean = true;
    link           : string  = null;
    plantId        : string  = null;
    Items          : PiServerItem[]  = [];
    
    deserialize(input: any): this {
        /*
        Asigne información a nuestro objeto ANTES de deserializar nuestros Items 
        para evitar que se sobrescriban los Items ya deserializados.
        */
        Object.assign(this, input);
        /**
         * Iterar sobre todos los Items para nuestro Data y asignarlos a un modelo apropiado de `Item`
         */
        this.Items = input.Items.map(item => new PiServerItem().deserialize(item));

        return this;
    }
}
