export interface ResponseVO {
    //"exito o fracaso de la operacion ", example = "true")
    success :boolean;
    //"datos del mensaje a mostrar",example = "ok")
    message :String;
    //"codigo de la respuesta",example = "ok")
    code :number|String;
}
