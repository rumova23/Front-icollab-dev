
export class DatosCumplimiento {

    public nivelCumplimiento: number;
    public cumplimientoTotal: number;

    constructor(
        nivelCumplimiento: number,
        cumplimientoTotal: number
    ) {
        this.nivelCumplimiento = nivelCumplimiento;
        this.cumplimientoTotal = cumplimientoTotal;
    }
}