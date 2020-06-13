import {Deserializable} from '../../compliance/models/deserializable';

export class BinnacleEventConfigurationDTO implements Deserializable {
    public binnacleEventConfigurationID: number;
    public powerMw: number;
    public disabledPowerMw = true;
    public eventsClassificationId: number;
    public disabledEventsClassificationId: boolean;
    public eventsId: number;
    public disabledEventsId: boolean;
    public fuelsId: Array<number>;
    public disabledFuelsId: boolean;
    public unitsId: Array<number>;
    public disabledUnitsId: boolean;
    public impactContractsId: Array<number>;
    public disabledImpactContractsId: boolean;
    public realsCcdvId: Array<number>;
    public disabledRealsCcdvId: boolean;
    public toleranceBandsId: Array<number>;
    public disabledToleranceBandsId: boolean;
    public marketTypesId: Array<number>;
    public disabledMarketTypesId: boolean;
    public mwOffered: number;
    public disabledMwOffered: boolean;
    public relatedServicesId: Array<number>;
    public disabledRelatedServicesId: boolean;
    public licenseNumber: string;
    public disabledLicenseNumber: boolean;
    public conceptoLicencia: string;
    public disabledConceptoLicencia: boolean;
    public equipmentId: Array<number>;
    public disabledEquipmentId: boolean;
    public initialCharge: number;
    public disabledInitialCharge: boolean;
    public finalCharge: number;
    public disabledFinalCharge: boolean;
    public mwPowerLoss: number;
    public disabledMwPowerLoss: boolean;
    public workOrderId: string;
    public disabledWorkOrderId: boolean;
    public billingAffects: boolean;
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
