export interface ResponseVO{
    //position = 0, value = "exito o fracaso de la operacion ", allowableValues = "true, false", required = true, example = "true"
    success : boolean;

    //position = 1, value = "datos del mensaje a mostrar", required = true, example = "ok"
    message : string;

    //position = 2, value = "codigo de la respuesta", required = true, example = "ok"
    code    : string|number;
}