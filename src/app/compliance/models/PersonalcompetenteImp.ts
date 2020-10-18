import {Personalcompetente} from './Personalcompetente';

export class PersonalcompetenteImp implements Personalcompetente {
    orden: number;
    empleadoId: number;
    numEmpleado: string;
    nombre: string;
    apPaterno: string;
    apMaterno: string;
    genero: string;
    generoId: number;
    posicion: string;
    departamento: string;
    puesto: string;
    lugarDeTrabajo: string;
    lugarDeTrabajoId: number;
    status: string;
    ver: string;
    editar: string;
    usuarioModifico: string;
    fechaHoraUltimaModificacion: string;
    pdf: string;
    eliminar: string;
    nuevoexamen: string;
    mensajeEliminar: string;
    constructor(orden: number, empleadoId: number, numEmpleado: string, nombre: string,
                apPaterno: string, apMaterno: string, genero: string, generoId: number,
                posicion: string, departamento: string, puesto: string,
                lugarDeTrabajo: string, lugarDeTrabajoId: number, status: string,
                usuarioModifico: string, fechaHoraUltimaModificacion: string,
                ver: string, editar: string,
                pdf: string, eliminar: string,
                nuevoexamen: string, mensajeEliminar: string
    ) {
        this.orden = orden;
        this.empleadoId = empleadoId;
        this.numEmpleado = numEmpleado;
        this.nombre = nombre;
        this.apPaterno = apPaterno;
        this.apMaterno = apMaterno;
        this.genero = genero;
        this.generoId = generoId;
        this.posicion = posicion;
        this.departamento = departamento;
        this.puesto = puesto;
        this.lugarDeTrabajo = lugarDeTrabajo;
        this.lugarDeTrabajoId = lugarDeTrabajoId;
        this.status = status;
        this.ver = ver;
        this.editar = editar;
        this.usuarioModifico = usuarioModifico;
        this.fechaHoraUltimaModificacion = fechaHoraUltimaModificacion;
        this.pdf = pdf;
        this.eliminar = eliminar;
        this.nuevoexamen = nuevoexamen;
        this.mensajeEliminar = mensajeEliminar;
    }
}
