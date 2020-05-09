import { Detalle } from './Detalle';

export class Empleado {
    private carrera: string
    private claveGenerico: number
    private detalle: Detalle
    private empleadoId: number
    private activo: boolean
    private estidadEstatus: number
    private fechanacimiento: string
    private generoId: number
    private gradoEstudioId: number
    private materno: string
    private mensajeGenerico: string
    private nombres: string
    private paterno: string
    private userId: number
    private foto: any
    private empresaPrefijo: string

    constructor(
        carrera: string,
        claveGenerico: number,
        detalle: Detalle,
        empleadoId: number,
        activo: boolean,
        estidadEstatus: number,
        fechanacimiento: string,
        generoId: number,
        gradoEstudioId: number,
        materno: string,
        mensajeGenerico: string,
        nombres: string,
        paterno: string,
        userId: number,
        foto: any,
        empresaPrefijo: string
    ) {
        this.carrera = carrera;
        this.claveGenerico = claveGenerico;
        this.detalle = detalle;
        this.empleadoId = empleadoId;
        this.activo = activo;
        this.estidadEstatus = estidadEstatus;
        this.fechanacimiento = fechanacimiento;
        this.generoId = generoId;
        this.gradoEstudioId = gradoEstudioId;
        this.materno = materno;
        this.mensajeGenerico = mensajeGenerico;
        this.nombres = nombres;
        this.paterno = paterno;
        this.userId = userId;
        this.foto = foto;
        this.empresaPrefijo = empresaPrefijo;
    }


}
