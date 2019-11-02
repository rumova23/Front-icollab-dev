import {Deserializable} from "./deserializable";

export class DiaGantt implements Deserializable {
    public caseOption: string;
    public fechaString: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
