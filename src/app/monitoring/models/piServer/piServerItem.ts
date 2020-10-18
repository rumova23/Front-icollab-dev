import { Deserializable } from 'src/app/compliance/models/deserializable';
import { PiServerValue } from './piServerValue';

export class PiServerItem implements Deserializable {
    public Value     ?: PiServerValue  = null;  
    public WebId     ?: string         = null;
    public Name      ?: string         = null;
    public Timestamp ?: string         = null;
    public Items     ?: PiServerItem[] = [];     
    //cuando los datos proviene de un (StreamsetsInterpolate) se anidan en este array
    //si proviene de un socket cuya peticion al PI es por /streamsets/value no se crea este segundo nivel 

    deserialize(input: any): this {
        Object.assign(this, input);
        if(input.Items){ 
            this.Items = input.Items.map(item => new PiServerItem().deserialize(item));
        }else{
            /** 
             * Esta condision se deve a que la respuesta del pi server aguila .175 es diferente a las demas peticiones  
             * en el objeto de PI Aguila no existe el objeto Value solo trae dentro del arreglo de items la propiedad Value como valor y no como objeto con valores
             * */

            if(input.Value != undefined && input.Value.Value != undefined){
                this.Value = new PiServerValue().deserialize(input.Value);
                if(this.Timestamp!=undefined && this.Value.Timestamp == null){
                    this.Value.Timestamp = this.Timestamp;
                }
            }else{
                this.Value = new PiServerValue().deserialize(input);
            }
        }
        
        return this;
    }

}
