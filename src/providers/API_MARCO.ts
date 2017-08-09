export const LOGIN_KEY = 'mem-0004';   // 登录
export const VALID_KEY = 'mem-0003';  // 获取验证码
export const RECHARGE = 'money-czorder'; // 充值
export const MINE = 'mem-myinfo'; // 个人信息
export const ACCOUNT_DETAIL = 'mem-accountinfo';// 账号明细
export const PERSON_INFO = 'mem-personinfo'; // 个人信息查询

export const HOTEL_LIST = 'flat-0003';
export const HOTEL_DETAIL = 'flat-0002';
export const ROOM_DETAIL = 'flat-0001';
export const AREA_LIST = 'common-0001';
export const MAP_HOTEL_LIST = 'flat-0004'; //地图公寓列表

export const ORDER_ROOM = 'orders-0002'; // 房间预订
export const ORDER_PAY = 'orders-0003'; // 订单支付
export const ORDER_CANCEL = 'orders-0004';//申请退订
export const LEAVE_ROOM = 'orders-0005';//申请退房
export const ORDER_DETAIL = 'orders-0006'; //订单详情
export const ORDER_LIST = 'orders-0001'; //订单列表
export const ORDER_CANCEL_UNPAY = 'orders-0008'; //订单取消
export declare type OrderType = 1|2|3|4|5;
export const ORDER_STATE_ENUM: {
  [key:string]: OrderType
} = {
  WAIT_PAY: 1,
  WAIT_USE: 2,
  USING: 3,
  COMPLETED: 4,
  REVOKED: 5
};

export const KEY_LIST = 'orders-0007';// 钥匙查询
export const APPLY_AUDIT = 'mem-idaudit'; // 审核提交
export const QUERY_AUDIT = 'mem-idauditQuery'; // 审核提交
export const SYSTEM_INFORMATION = 'mem-messageQuery';
export const SYSTEM_INFORDETAIL = 'mem-messageRead';

export const Coupon = 'coupons-0001';// 优惠券查询
export const APPLY_FOR_REFUND = 'money-applyForRefund';// 优惠券查询

export const UPDATE_HEAD_ICON = 'mem-headIcon';// 头像更新
