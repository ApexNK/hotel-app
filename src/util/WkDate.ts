export class WkDate {
  public static toDouble = (n) => n < 10 ? `0${n}` : n.toString();
  public static getToday = () => {
    const now = new Date();
    return WkDate.toStringDate(now);
  };
  public static getTomorrow = () => {
    return WkDate.getFutureDay(1);
  };
  public static getFutureDay = (n:number) => {
    const now = new Date();
    const future = new Date(new Date(now.getTime() + 60 * 60 * 1000 * 24 * n));
    return WkDate.toStringDate(future);
  };
  public static toStringDate(time: Date) {
    return `${time.getFullYear()}-${WkDate.toDouble(time.getMonth() + 1)}-${WkDate.toDouble(time.getDate())}`;
  };
}
