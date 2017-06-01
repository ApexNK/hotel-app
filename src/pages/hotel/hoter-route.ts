import { ItemDetailPage } from './hotel-detail/item-detail';
import { ListMasterPage } from './hotel-list/list-master';
import { RoomListPage } from  './room-list/room-list';
import { MapPage} from './map/map';

export const HotelRoutes = [
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
    component: MapPage,
    segment: 'HotelMapPage',
    name: 'TabsPage.HotelMapPage'
  }
];
