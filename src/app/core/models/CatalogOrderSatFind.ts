import { CatalogOrderSat } from './CatalogOrderSat';

export class CatalogOrderSatFind {
    product: Array<CatalogOrderSat> = [
        {
            catalog: 'product',
            active: 1,
            order: 1
        },
        {
            catalog: 'rateIva',
            active: 1,
            order: 1
        }
    ];
    client: Array<CatalogOrderSat> = [
        {
            catalog: 'useCfdi',
            active: 1,
            order: 1
        },
        {
            catalog: 'paymentMethod',
            active: 1,
            order: 1
        },
        {
            catalog: 'paymentWay',
            active: 1,
            order: 1
        }
    ];
    invoice: Array<CatalogOrderSat> = [
        {
            catalog: 'useCfdi',
            active: 1,
            order: 1
        },
        {
            catalog: 'paymentMethod',
            active: 1,
            order: 1
        },
        {
            catalog: 'paymentWay',
            active: 1,
            order: 1
        },
        {
            catalog: 'typeRelation',
            active: 1,
            order: 1
        },
        {
            catalog: 'rateIva',
            active: 1,
            order: 1
        }
    ];
}