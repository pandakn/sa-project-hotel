import { AdminInterface } from "../models/IAdmins";
import { ExtraBedInterface } from "./IExtraBed";
import { ExtraServiceInterface } from "./IExtraService";
import { BookingInterface } from "../modelsBooking/IBooking";

export interface CheckInInterface {
    ID?: number,
    CheckInDate?: Date,
    ExtraBedID?: number,
    ExtraBed?: ExtraBedInterface,
    ExtraServiceID?: number,
    ExtraService?: ExtraServiceInterface,
    AdminID?: number,
    Admin?: AdminInterface,
    BookingID?: number,
    Booking?: BookingInterface,
}