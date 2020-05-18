export class ChartControls{
    constructor(
        public typeGraph:string,
        public typeScale:string,
        public timeRefreseh  : number
    ){}
}
export enum TypeScaleType{
    static = 'static',
    dinamic = 'dinamic'
}
export enum TypeGraphType{
    area = 'area',
    spline = 'spline',
    column ='column'
}