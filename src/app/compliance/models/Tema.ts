export class Tema {
    public value: string;
    public label: string;
    public color: string;
    public pregu: Array<any>;

    constructor(
        value: string,
        label: string,
        color: string,
        pregu: Array<any>,
    ) {
        this.value = value;
        this.label = label;
        this.color = color;
        this.pregu = pregu;
    }
}
