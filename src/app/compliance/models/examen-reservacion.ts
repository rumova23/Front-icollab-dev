import { Empleado } from './Empleado';

export interface ExamenReservacion {
    examenReservacionId: number;
    empleado: Empleado;
    configuracionExamenId: number;
    entidadEstatusId: number;
}
