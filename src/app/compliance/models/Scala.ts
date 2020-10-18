import { Rango } from './Rango';

export class Scala {
    public value: string;
    public label: string;
    public rango: Rango;

    constructor(
        value: string,
        label: string,
        rango: Rango,
    ) {
        this.value = value;
        this.label = label;
        this.rango = rango; 
    }
}
