import { CatalogOrder } from './CatalogOrder';

export class CatalogOrderFind {
    product: Array<CatalogOrder> = [
        {
            catalog: 'typeProduct',
            active: 1,
            order: 1
        },
        {
            catalog: 'sys',
            active: 1,
            order: 1
        }
    ];
    client: Array<CatalogOrder> = [
        {
            catalog: 'bank',
            active: 1,
            order: 1
        },
        {
            catalog: 'country',
            active: 1,
            order: 1
        },
        {
            catalog: 'paymentCondition',
            active: 1,
            order: 1
        },
        {
            catalog: 'paymentMethod',
            active: 1,
            order: 1
        },
        {
            catalog: 'typeClient',
            active: 1,
            order: 1
        },
        {
            catalog: 'typePerson',
            active: 1,
            order: 1
        }
    ];
    plant: Array<CatalogOrder> = [
        {
            catalog: 'bank',
            active: 1,
            order: 1
        },
        {
            catalog: 'country',
            active: 1,
            order: 1
        },
        {
            catalog: 'typePerson',
            active: 1,
            order: 1
        }
    ];
    invoice: Array<CatalogOrder> = [
        {
            catalog: 'paymentCondition',
            active: 1,
            order: 1
        },
        {
            catalog: 'money',
            active: 1,
            order: 1
        },
        {
            catalog: 'sys',
            active: 1,
            order: 1
        }
    ];
}
