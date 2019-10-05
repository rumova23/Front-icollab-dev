export interface App {
    id        : Number;
    idFather? : Number;
    name      : string;
    children? : App[];  
}