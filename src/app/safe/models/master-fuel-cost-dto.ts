import {Deserializable} from '../../compliance/models/deserializable';
import {YearMountDTO} from './year-mount-dto';
import {MaestroOpcionDTO} from '../../compliance/models/maestro-opcion-dto';
import {FuelCostDTO} from './fuel-cost-dto';
import {BearerDTO} from './bearer-dto';

export class MasterFuelCostDTO implements Deserializable {

    public masterFuelCostId: number;
    public commercialDate: Date;
    public yearMountId: number;
    public yearMountDTO: YearMountDTO;
    public sourceId: number;
    public source: string;
    public sourceDTO: MaestroOpcionDTO;
    public m3: FuelCostDTO;
    public usa: FuelCostDTO;
    public adjustment: FuelCostDTO;
    public adjustments: Array<FuelCostDTO>;
    public group: string;
    public bearers: Array<BearerDTO>;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
