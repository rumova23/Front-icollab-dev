import {Deserializable} from '../../compliance/models/deserializable';

export class BinnacleEventConfigurationDTO implements Deserializable {
    public binnacleEventConfigurationID: number;

    public powerMw: number;
    public disabledPowerMw = true;
    public requiredPowerMw = true;

    public eventsClassificationId: number;
    public disabledEventsClassificationId: boolean;
    public requiredEventsClassificationId: boolean;

    public eventsId: number;
    public disabledEventsId: boolean;

    public fuelsId: Array<number>;
    public disabledFuelsId: boolean;
    public requiredFuelsId: boolean;

    public unitsId: Array<number>;
    public disabledUnitsId: boolean;
    public requiredUnitsId: boolean;

    public impactContractsId: Array<number>;
    public disabledImpactContractsId: boolean;
    public requiredImpactContractsId: boolean;

    public realsCcdvId: Array<number>;
    public disabledRealsCcdvId: boolean;
    public requiredRealsCcdvId: boolean;

    public toleranceBandsId: Array<number>;
    public disabledToleranceBandsId: boolean;
    public requiredToleranceBandsId: boolean;

    public marketTypesId: Array<number>;
    public disabledMarketTypesId: boolean;
    public requiredMarketTypesId: boolean;

    public mwOffered: number;
    public disabledMwOffered: boolean;
    public requiredMwOffered: boolean;

    public relatedServicesId: Array<number>;
    public disabledRelatedServicesId: boolean;
    public requiredRelatedServicesId: boolean;

    public licenseNumber: string;
    public disabledLicenseNumber: boolean;
    public requiredLicenseNumber: boolean;

    public conceptoLicencia: string;
    public disabledConceptoLicencia: boolean;
    public requiredConceptoLicencia: boolean;

    public equipmentId: Array<number>;
    public disabledEquipmentId: boolean;
    public requiredEquipmentId: boolean;

    public initialCharge: number;
    public disabledInitialCharge: boolean;
    public requiredInitialCharge: boolean;

    public finalCharge: number;
    public disabledFinalCharge: boolean;
    public requiredFinalCharge: boolean;

    public mwPowerLoss: number;
    public disabledMwPowerLoss: boolean;
    public requireddMwPowerLoss: boolean;

    public workOrderId: string;
    public disabledWorkOrderId: boolean;
    public requiredWorkOrderId: boolean;

    public billingAffects: boolean;

    public plantOperatorOpened: string;
    public disabledPlantOperatorOpened: boolean;
    public requiredPlantOperatorOpened: boolean;

    public plantOperatorClosed: string;
    public disabledPlantOperatorClosed: boolean;
    public requiredPlantOperatorClosed: boolean;

    public cenaceOperatorOpened: string;
    public disabledCenaceOperatorOpened: boolean;
    public requiredCenaceOperatorOpened: boolean;

    public cenaceOperatorClosed: string;
    public disabledCenaceOperatorClosed: boolean;
    public requiredCenaceOperatorClosed: boolean;

    public sourceEventId: Array<number>;
    public disabledSourceEventId: boolean;
    public requiredSourceEventId: boolean;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
