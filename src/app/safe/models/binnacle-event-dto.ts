import {Deserializable} from '../../compliance/models/deserializable';
import {BinnacleDTO} from './binnacle-dto';
import {MaestroOpcionDTO} from '../../compliance/models/maestro-opcion-dto';
import {EntidadEstatusDTO} from '../../compliance/models/entidad-estatus-dto';
import {NoteDTO} from './note-dto';
import {BearerDTO} from './bearer-dto';
import {BinnacleEventConfigurationDTO} from './binnacle-event-configuration-dto';

export class BinnacleEventDTO implements Deserializable {

    public binnacleEventID: number;
    public binnacle: BinnacleDTO;
    public estatusEventoId: number;
    public estatusEvento: string;
    public estatusEventoDTO: EntidadEstatusDTO;
    public estatusAprobacionId: number;
    public estatusAprobacion: string;
    public estatusAprobacionDTO: EntidadEstatusDTO;
    public dateTimeStart: Date;
    public dateTimeStartString: string;
    public dateTimeStartLong: number;
    public dateTimeEndLong: number;
    public dateTimeEnd: Date;
    public dateTimeEndString: string;
    public yyyyMMddStart: string;
    public yyyyMMddEnd: string;
    public ha: string;
    public ma: string;
    public hb: string;
    public mb: string;
    public powerMw: number;
    public eventsClassificationId: number;
    public eventsClassification: string;
    public eventsClassificationDTO: MaestroOpcionDTO;
    public eventsId: number;
    public events: string;
    public eventsDTO: MaestroOpcionDTO;
    public fuelsId: number;
    public fuels: string;
    public fuelsDTO: MaestroOpcionDTO;
    public unitsId: number;
    public units: string;
    public unitsDTO: MaestroOpcionDTO;
    public impactContractsId: number;
    public impactContracts: string;
    public impactContractsDTO: MaestroOpcionDTO;
    public realsCcdvId: number;
    public realsCcdv: string;
    public realsCcdvDTO: MaestroOpcionDTO;
    public toleranceBandsId: number;
    public toleranceBands: string;
    public toleranceBandsDTO: MaestroOpcionDTO;
    public marketTypesId: number;
    public marketTypes: string;
    public marketTypesDTO: MaestroOpcionDTO;
    public mwOffered: number;
    public relatedServicesId: number;
    public relatedServices: string;
    public relatedServicesDTO: MaestroOpcionDTO;
    public licenseNumber: string;
    public licenseDescription: string;
    public equipmentId: number;
    public equipment: string;
    public equipmentDTO: MaestroOpcionDTO;
    public initialCharge: number;
    public finalCharge: number;
    public mwPowerLoss: number;
    // ***********************
    public workOrderId: string;
    // ************************
    public plantOperatorOpened: string;
    public plantOperatorClosed: string;
    public cenaceOperatorOpened: string;
    public cenaceOperatorClosed: string;
    public plantOperatorAccepted: string;
    public sourceEventId: number;
    public sourceEvent: string;

    public usuario: string;
    public userCreated: string;
    public userUpdated: string;

    public fechaYHoraDeUltimaModificacion: string;
    public dateCreated: Date;
    public dateUpdated: Date;

    public observations: Array<NoteDTO>;
    public bearers: Array<BearerDTO>;
    public order: number;


    public binnacleEventConfigurationDTO: BinnacleEventConfigurationDTO;

    public dateTimeStartFrom: Date;
    public dateTimeStartTo: Date;
    public fechaUltimaModificacionFrom: Date;
    public fechaUltimaModificacionTo: Date;
    public powerMwFrom: number;
    public powerMwTo: number;
    public mwOfferedFrom: number;
    public mwOfferedTo: number;
    public initialChargeFrom: number;
    public initialChargeTo: number;
    public finalChargeFrom: number;
    public finalChargeTo: number;
    public mwPowerLossFrom: number;
    public mwPowerLossTo: number;
    public typeFilter: number;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
