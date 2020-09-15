import {Deserializable} from '../../compliance/models/deserializable';

export class BinnacleEventConfigurationDTO implements Deserializable {
    public binnacleEventConfigurationID: number;

    public eventsClassificationId: number;
    public eventsId: number;

    public powerMw: number;
    public disabledPowerMw: boolean;
    public requiredPowerMw: boolean;
    public powerMwLimitLower: number;
    public powerMwLimitUpper: number;

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
    public mwOfferedLimitLower: number;
    public mwOfferedLimitUpper: number;

    public relatedServicesId: Array<number>;
    public disabledRelatedServicesId: boolean;
    public requiredRelatedServicesId: boolean;

    public licenseNumber: string;
    public disabledLicenseNumber: boolean;
    public requiredLicenseNumber: boolean;

    public equipmentId: Array<number>;
    public disabledEquipmentId: boolean;
    public requiredEquipmentId: boolean;

    public initialCharge: number;
    public disabledInitialCharge: boolean;
    public requiredInitialCharge: boolean;
    public initialChargeLimitLower: number;
    public initialChargeLimitUpper: number;

    public finalCharge: number;
    public disabledFinalCharge: boolean;
    public requiredFinalCharge: boolean;
    public finalChargeLimitLower: number;
    public finalChargeLimitUpper: number;

    public mwPowerLoss: number;
    public disabledMwPowerLoss: boolean;
    public requiredMwPowerLoss: boolean;
    public mwPowerLossLimitLower: number;
    public mwPowerLossLimitUpper: number;

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

    public licenseDescription: string;
    public disabledLicenseDescription: boolean;
    public requiredLicenseDescription: boolean;

    public user: string;
    public dateUpdated: string;
    public dateModification: Date;
    public status: boolean;
    public nameStatus: string;

    public disabledFile: boolean;
    public disabledObsComment: boolean;

    public statusElement: boolean;

    public prioritySplice: number;
    public availabilityId: Array<number>;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
