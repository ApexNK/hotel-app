import {OrderListPage} from './order-list/order-list';
import {ReservationPage} from './reservation/reservation';
import {OrderPayPage} from './order-pay/order-pay';
export const OrderRoutes = [
  {
    component: OrderListPage,
    segment: 'OrderListPage'
  },
  {
    component: ReservationPage,
    segment: 'ReservationPage',
    name: 'ReservationPage'
  },
  {
    component: OrderPayPage,
    segment: 'OrderPayPage',
    name: 'OrderPayPage'
  }
];
