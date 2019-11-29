import { Deserializable } from 'src/app/compliance/models/deserializable';
import { PiServerValue } from './piServerValue';

export class PiServerItem implements Deserializable {
    public Value     ?: PiServerValue  = null;
    public WebId     ?: string         = null;
    public Name      ?: string         = null;
    public Timestamp ?: string         = null;
    public Items     ?: PiServerItem[] = [];


    deserialize(input: any): this {
        
        // Asigne información a nuestro objeto ANTES de deserializar nuestros Items 
        // para evitar que se sobrescriban los item ya deserializados.
        Object.assign(this, input);
        // Iterar sobre todos los Items para nuestro Item y asignarlos a un modelo apropiado de `Item`
        if(input.Items){
            this.Items = input.Items.map(item => new PiServerItem().deserialize(item));
        }

        return this;
    }
}
