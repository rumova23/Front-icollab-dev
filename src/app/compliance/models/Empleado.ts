import { Detalle } from './Detalle';

export class Empleado {
    public carrera: string
    public claveGenerico: number
    public detalle: Detalle
    public empleadoId: number
    public estatusGenerico: string
    public estidadEstatus: number
    public fechanacimiento: string
    public generoId: number
    public gradoEstudioId: number
    public materno: string
    public mensajeGenerico: string
    public nombres: string
    public paterno: string
    public userId: number

    constructor(
        carrera: string,
        claveGenerico: number,
        detalle: Detalle,
        empleadoId: number,
        estatusGenerico: string,
        estidadEstatus: number,
        fechanacimiento: string,
        generoId: number,
        gradoEstudioId: number,
        materno: string,
        mensajeGenerico: string,
        nombres: string,
        paterno: string,
        userId: number
    ) {
        this.carrera = carrera;
        this.claveGenerico = claveGenerico;
        this.detalle = detalle;
        this.empleadoId = empleadoId;
        this.estatusGenerico = estatusGenerico;
        this.estidadEstatus = estidadEstatus;
        this.fechanacimiento = fechanacimiento;
        this.generoId = generoId;
        this.gradoEstudioId = gradoEstudioId;
        this.materno = materno;
        this.mensajeGenerico = mensajeGenerico;
        this.nombres = nombres;
        this.paterno = paterno;
        this.userId = userId;
    }


}
