import { Detalle } from './Detalle';

export class Empleado {
    private carrera: string
    private claveGenerico: number
    private detalle: Detalle
    private empleadoId: number
    private estatusGenerico: string
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
    private posicion: string
    private departamento: string
    private jefeInmediato: string
    private puestoTrabajo: string

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
        userId: number,
        foto: any,
        posicion: string,
        departamento: string,
        jefeInmediato: string,
        puestoTrabajo: string
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
        this.foto = foto;
        this.posicion = posicion;
        this.departamento = departamento;
        this.jefeInmediato = jefeInmediato;
        this.puestoTrabajo = puestoTrabajo;
    }


}
