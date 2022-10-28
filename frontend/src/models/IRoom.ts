import { RoomTypesInterface } from "./IRoomTypes";
import { RoomZonesInterface } from "./IRoomZones";
import {AdminInterface} from "./IAdmins";

export interface RoomsInterface {
  ID?: number,      // ใส่ ? เพื่อบอกว่า field นั้นเป็น optional
  RoomNumber?: string,
  RoomZoneID?: number,
  RoomZone?: RoomZonesInterface,
  RoomTypeID?: number,
  RoomType?: RoomTypesInterface,
  AdminID?:number,
  Admin?: AdminInterface,
  Status?: number,
}
