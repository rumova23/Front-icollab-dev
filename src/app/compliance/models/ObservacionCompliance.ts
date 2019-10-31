export class ObservacionCompliance {
    private observacionId: number;
    private observacion: string;
    private fechaObservacion: string;
    constructor(
        observacionId: number,
        observacion: string,
        fechaObservacion: string) {
        this.observacionId = observacionId;
        this.observacion = observacion;
        this.fechaObservacion = fechaObservacion;
    }
}
