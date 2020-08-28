import {Deserializable} from '../../compliance/models/deserializable';
import {YearMountDTO} from './year-mount-dto';
import {MaestroOpcionDTO} from '../../compliance/models/maestro-opcion-dto';
import {FuelCostDTO} from './fuel-cost-dto';

export class MasterFuelCostDTO implements Deserializable {

    private masterFuelCostId: number;
    private commercialDate: Date;
    private yearMountId: number;
    private yearMountDTO: YearMountDTO;
    private sourceId: number;
    private source: string;
    private sourceDTO: MaestroOpcionDTO;
    private m3: FuelCostDTO;
    private usa: FuelCostDTO;
    private adjustments: Array<FuelCostDTO>;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
