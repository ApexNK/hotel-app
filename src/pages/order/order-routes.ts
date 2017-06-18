import {OrderListPage} from './order-list/order-list';
import {ReservationPage} from './reservation/reservation';
export const OrderRoutes = [
  {
    component: OrderListPage,
    segment: 'OrderListPage'
  },
  {
    component: ReservationPage,
    segment: 'ReservationPage',
    name: 'ReservationPage'
  }
];
