import {Deserializable} from '../../compliance/models/deserializable';
import {BinnacleDTO} from './binnacle-dto';
import {MaestroOpcionDTO} from '../../compliance/models/maestro-opcion-dto';
import {EntidadEstatusDTO} from '../../compliance/models/entidad-estatus-dto';

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
    public dateTimeEnd: Date;
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
    public conceptoLicencia: string;
    public equipmentId: number;
    public equipment: string;
    public equipmentDTO: MaestroOpcionDTO;
    public initialCharge: number;
    public finalCharge: number;
    public mwPowerLoss: number;
    public workOrderId: number;
    public workOrder: string;
    public workOrderDTO: MaestroOpcionDTO;
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}