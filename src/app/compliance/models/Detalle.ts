export class Detalle {
    private empleadoId: number;
    private empleadoDetalleId: number;

    private posicionId: number;
    private departamentoId: number;

    private puestoTrabajoId: number;
    private jefeInmediatoId: number;
    private horarioTrabajoId: number;

    private lugarTrabajoId: number;
    private fechaInicioPuesto: string;
    private personalCargoId: number;

    private descGralPuesto: string;

    private estidadEstatusID: number;
    private tipoEmpleadoId: number;

    private posicion: string;
    private departamento: string;
    private jefeInmediato: string;
    private puestoTrabajo: string;

    constructor(
        departamentoId: number,
        empleadoDetalleId: number,
        empleadoId: number,
        estidadEstatusID: number,
        fechaInicioPuesto: string,
        horarioTrabajoId: number,
        jefeInmediatoId: number,
        lugarTrabajoId: number,
        personalCargoId: number,
        posicionId: number,
        tipoEmpleadoId: number,
        descGralPuesto: string,
        puestoTrabajoId: number,
        posicion: string,
        departamento: string,
        jefeInmediato: string,
        puestoTrabajo: string
    ) {
        this.departamentoId = departamentoId;
        this.empleadoDetalleId = empleadoDetalleId;
        this.empleadoId = empleadoId;
        this.estidadEstatusID = estidadEstatusID;
        this.fechaInicioPuesto = fechaInicioPuesto;
        this.horarioTrabajoId = horarioTrabajoId;
        this.jefeInmediatoId = jefeInmediatoId;
        this.lugarTrabajoId = lugarTrabajoId;
        this.personalCargoId = personalCargoId;
        this.posicionId = posicionId;
        this.tipoEmpleadoId = tipoEmpleadoId;
        this.descGralPuesto = descGralPuesto;
        this.puestoTrabajoId = puestoTrabajoId;
        this.posicion = posicion;
        this.departamento = departamento;
        this.jefeInmediato = jefeInmediato;
        this.puestoTrabajo = puestoTrabajo;
    }

}
