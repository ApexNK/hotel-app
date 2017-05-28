import { ItemDetailPage} from './item-detail/item-detail';
import { ItemCreatePage} from './item-create/item-create';
import { KeySearchPage } from './key-search/key-search';
import { ListMasterPage } from './room-master/list-master';
import { LoginPage } from './login/login';
import { SearchPage } from './search/search';
import { SettingsPage } from './settings/settings';
import { SignupPage } from './signup/signup';
import { TabsPage } from './tabs/tabs';
import { TutorialPage } from './tutorial/tutorial';
import { WelcomePage } from './welcome/welcome';
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
                component: ItemDetailPage,
                segment: 'ItemDetailPage',
                name: 'TabsPage.ItemDetailPage'
            },
            {
                component: ItemCreatePage,
                segment: 'ItemCreatePage',
                name: 'TabsPage.ItemCreatePage'
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
                component: SearchPage,
                segment: 'SearchPage'
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