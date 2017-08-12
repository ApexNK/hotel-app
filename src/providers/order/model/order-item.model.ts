export interface OrderItem {
  ddbh: string; //订单标号
  gymc: string; //公寓名称
  gydz: string; // 公寓地址
  fjbh: string; // 房间编号
  sslc:number // 所属楼层
  ddje:number // 订单金额
  rzkssj:string ;// 入住开始时间
  rzjssj:string; //入住结束时间
  createtime:string; // 订单时间
  hdje:number;//优惠券抵扣
  sjje:number;//实付款
  yjzt: string;// 交易状态 1 待支付 2 交易成功 3交易失败
  gyslt:string;//公寓缩略图
  zkje: number; //折扣金额
}
