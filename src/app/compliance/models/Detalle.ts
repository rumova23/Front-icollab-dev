export class Detalle {
    private departamentoId: number
    private empleadoDetalleId: number
    private empleadoId: number
    private estidadEstatusID: number
    private fechaInicioPuesto: string
    private horarioTrabajoId: number
    private jefeInmediatoId: number
    private lugarTrabajoId: number
    private personalCargoId: number
    private posicionId: number
    private tipoEmpleadoId: number
    private descGralPuesto: string

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
        descGralPuesto: string
    ) {
        this.departamentoId = departamentoId
        this.empleadoDetalleId = empleadoDetalleId
        this.empleadoId = empleadoId
        this.estidadEstatusID = estidadEstatusID
        this.fechaInicioPuesto = fechaInicioPuesto,
        this.horarioTrabajoId = horarioTrabajoId
        this.jefeInmediatoId = jefeInmediatoId
        this.lugarTrabajoId = lugarTrabajoId
        this.personalCargoId = personalCargoId
        this.posicionId = posicionId
        this.tipoEmpleadoId = tipoEmpleadoId
        this.descGralPuesto = descGralPuesto
    }

}
