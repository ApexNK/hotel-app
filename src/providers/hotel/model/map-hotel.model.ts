/**
 * Created by jinggk on 2017/7/19.
 */
export interface MapHotelListQuery {
  beginDate: string;
  endDate: string;
  distance: string;
  longitude: number;
  latitude: number;
  queryString: string;
}
export interface MapQueryResult {
  availableRooms: number;
  gymc: string;
  id: number;
  latitude: number;
  longitude: number;
  minPrice: number;
}
