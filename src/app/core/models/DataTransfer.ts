export interface DataTransfer<T>{
    dto    ?: T;
    action ?: String; // nuevo/editar/ver
    name   ?: String;
}