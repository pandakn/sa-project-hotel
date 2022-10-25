import { AdminInterface } from "../models/IAdmins";
import { BookingInterface } from "../modelsBooking/IBooking";
import { FineInterface } from "./IFine";

export interface CheckOutInterface{
    ID?: number,
    Admin?: string,
    AdminID?: AdminInterface,

    Booking?: BookingInterface,
    BookingID?: number,
    
    Fine?: number,
    FineID?: FineInterface,
    CheckOutTime?: Date,
    Price?: Float32Array 
}