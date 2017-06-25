export interface HotelListQuery {
  "beginDate"?:string;
  "endDate"?:string;
  "distance"?:number;
  "longitude"?: number;
  "latitude"?: number;
  "queryString"?:string;
  "pageNo"?: number;
  "pageSize"?: number;
  "areaCode"?: string
}
