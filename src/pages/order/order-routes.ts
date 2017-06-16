import {OrderListPage} from './order-list/order-list';
import {OrderPayPage} from './order-pay/order-pay';
export const OrderRoutes = [
  {
    component: OrderListPage,
    segment: 'OrderListPage'
  },
  {
    component: OrderPayPage,
    segment: 'OrderPayPage',
    name: 'OrderPayPage'
  }
];
