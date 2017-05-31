import { ItemDetailPage} from './hotel/hotel-detail/item-detail';

import { KeySearchPage } from './key/key-search/key-search';
import { ListMasterPage } from './hotel/hotel-list/list-master';
import { RoomListPage } from './hotel/room-list/room-list';
import { LoginPage } from './user/login/login';
import { OrderListPage } from './order/order-list/order-list';
import { SettingsPage } from './user/settings/settings';
import { SignupPage } from './user/signup/signup';
import { TabsPage } from './tabs/tabs';
import { TutorialPage } from './user/tutorial/tutorial';
import { WelcomePage } from './user/welcome/welcome';
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
                segment: 'TabsPage'
            },
            {
                component: ListMasterPage,
                segment: 'ListMasterPage',
                name: 'TabsPage.ListMasterPage'
            },
            {
              component: RoomListPage,
              segment: 'RoomListPage',
              name: 'TabsPage.RoomListPage'
            },
            {
                component: ItemDetailPage,
                segment: 'ItemDetailPage',
                name: 'TabsPage.ItemDetailPage'
            },
            {
                component: KeySearchPage,
                segment: 'KeySearchPage',
                name: 'TabsPage.KeySearchPage'
            },
            {
                component: SettingsPage,
                segment: 'SettingsPage' ,
                name: 'TabsPage.SettingsPage'
            },
            {
                component: LoginPage,
                segment: 'LoginPage'
            },
            {
                component: OrderListPage,
                segment: 'OrderListPage'
            },
            {
                component: SignupPage,
                segment: 'SignupPage'
            },
            {
                component: TutorialPage,
                segment: 'TutorialPage'
            },
            {
                component: WelcomePage,
                segment: 'WelcomePage'
            }
        ]
    };
}
