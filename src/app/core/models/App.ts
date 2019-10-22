export interface App {
    id        : Number;
    name      : string;
    idFather? : Number;
    children? : App[];  // menu
}