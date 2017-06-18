import { KeyRoutes } from './key/key-routes';
import { UserRoutes } from './user/user-routes';
import { OrderRoutes } from './order/order-routes';
import { TabsPage } from './tabs/tabs';

export interface IonicPageMetadata {
    component: any;
    name?: string;
    segment?: string;
    defaultHistory?: string[];
    priority?: string;
}
export function getRouter (): {links: IonicPageMetadata[]} {
    return {
        links: [
            {
              component: TabsPage,
              segment: '/'
            },
            {
                component: TabsPage,
                segment: 'TabsPage'
            },
            ...KeyRoutes,
            ...UserRoutes,
            ...OrderRoutes
        ]
    };
}
