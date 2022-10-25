import { RoomsInterface } from "../models/IRoom"

export interface BookingInterface{
    ID?: number,
    Room?: RoomsInterface,
    RoomID?: number,
    RegisterID?: number,
    FromDate?: Date,
    ToDate?: Date,
    NumberOfGuests?: number,
    BookingStatus?: string,
    PaymentID?: number
}